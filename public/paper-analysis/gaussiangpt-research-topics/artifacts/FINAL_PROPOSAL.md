# Research Proposal: Chart-Consistent Column Events for GaussianGPT

## Problem Anchor

- **Bottom-line problem**: GaussianGPT 在滑窗式大场景生成中会把物理上相同的稀疏 Gaussian 上下文编码到不同的 chunk-relative coordinate charts；如果预测仅因 local chart 改变而改变，这种 nuisance dependence 会累积为 seam、方向偏置与远距离退化。
- **Must-solve bottleneck**: 在物理证据、预测事件、因果顺序与全局合法 support 完全相同时，消除由局部坐标 re-embedding 单独造成的 next-position 与 feature 条件分布差异。
- **Non-goals**: 不做任意顺序或随机顺序生成；不宣称一般 SE(3) 等变；不约束证据或合法 support 不同的窗口；不增加全局 memory、coarse-to-fine planner、cache transport、consensus decoding、seam refiner 或新 tokenizer。
- **Constraints**: 基于本地 GaussianGPT 论文与代码；冻结 VQ-VAE/decoder；不新增人工标注；本轮不运行 GPU；后续以 3D-FRONT 为主、ScanNet++ 为迁移验证；方法必须保持现有推理接口并达到 CVPR/ICCV/ECCV 级可证伪标准。
- **Success condition**: (1) 能构造非平凡且通过机械断言的 support-equivalent chart pairs；(2) 冻结 checkpoint 在这些 pairs 上存在显著、可复现且与长程失稳相关的 gauge disagreement；(3) 单一 consistency objective 相比 origin augmentation 与等算力 self-distillation 更能降低 held-out chart disagreement、seam、distance-binned KID 和 x/y gap；(4) 无 consensus decoding 时单 chunk 质量与多样性不显著下降。

## Executive Thesis

GaussianGPT 的 production outpainting parser 真正消费的空间事件不是完整的 8000-way local position ID，而是“目标全局 column 中的下一个 z row”或“离开该 column”。本方案把每个 chart 的完整 token 概率无损推送到共同的物理事件空间 `{z0,...,z19, EXIT}`，然后在固定物理 prompt/target、只改变合法 window origin 的 counterfactual pairs 上对齐条件分布。

方法不增加参数、不修改 tokenizer/decoder/vocabulary/parser，也不改变推理。核心贡献不是通用 KL，而是一个与 production grammar 对齐的 same-state/same-action-space chart counterfactual interface。

## Why the Baseline Can Fail

同一全局 context row 在不同 window origins 下会得到不同的 local position token 与 3D RoPE coordinate。RoPE 的相对结构不能消除 categorical token embedding、output head 与 nonlinear hidden states 对 local chart 的依赖。当前 full-sequence teacher-forced CE 让每种编码独立拟合 one-hot target，但不要求完整 parser-consumed conditional 一致。

简单替代方案不足：

- origin augmentation 不约束非 target 概率质量；
- R-Drop 只平滑同一 chart；
- random/multi-order 改变因果 factorization，并已被 RandAR/RAR/MAR-3D 等覆盖；
- overlap-window consistency 比较了不同证据，目标本身不成立；
- memory/cache/coarse-to-fine 不修复相同证据的 chart nuisance。

## Method

### 1. Production State and Legal Chart Pair

一个状态写为 `(H,T)`：

- `H`：production prompt 中 verbatim 的全局 occupied context rows 及 LFQ feature IDs，保持原 xyz order；
- `T=(x,y)`：物理目标 column。

枚举两个不同 origins `o_a,o_b`，要求 `H` 的全部 rows 以及所有 `(T,z)` 均能映入 20×20×20 canvas。两支只重写 local coordinates，不添加、删除或截断任何 evidence。

Pair compiler 对每个样本做机械断言：

- global H/T/features 完全一致；
- token-slot pattern 与长度一致；
- local/global mapping 为双射；
- xyz order 保持；
- target z 与 feature labels 一致；
- parser 的离开目标 column 语义一致。

### 2. Complete Token-to-Event Pushforward

首个 paper scope 限定为仓库默认大场景配置：single-column tokenwise path，`no_empty_columns=false`，`resample_empty_columns=true`。

在 existing slot/monotonic constraints 后，令 `r_o(v|h)` 为 position/EOS token 分布。定义确定性映射 `A_o`：

- 若 token `v` 解码到目标 local `(x,y)` 的高度 z，则 `A_o(v)=z`；
- EOS 或任何其他合法 position token 都映射为 `EXIT`。

事件概率为：

`p_o(e|h)=sum_{v:A_o(v)=e} r_o(v|h)`，`e in {z0,...,z19,EXIT}`。

实现使用 `logsumexp`。8000 个 position outcomes 与 EOS 全部被计入；没有 support intersection、截断或重新归一化。这个事件恰好对应 `_accept_sparse_rows_for_target` 的状态转移：目标 xy row 被接受，其他 position/end 终止该 column attempt。

### 3. Counterfactual Consistency

在 teacher-forced target column 上抽样 `K=32` 个 matched position slots，使用交替单向 stop-gradient KL：

`L_event(a->b)=KL(sg(p_a)||p_b)`。

minibatches 交替 `a->b` 与 `b->a`，在期望意义上对称，但只保留一个 gradient graph。

对 occupied target，强制输入 chart-specific position token 后读取 LFQ feature distribution。只有当 frozen audit 显示 feature JS 至少为 replay noise 的 2 倍且与 seam/event failure 有材料性关系时，才启用 `L_feat`；否则最终方法为 event-only。

### 4. Training Objective

保留标准 full-sequence CE，并增加 paired column auxiliary batch：

`L_pair = 0.5(L_colCE_a+L_colCE_b) + lambda_e L_event + I_feat lambda_f L_feat`

`L = L_fullCE + beta L_pair`。

`L_colCE` 监督 parser event（next z 或 EXIT）和 ordinary feature CE。对照：

- **origin augmentation**：同样 paired column/event CE，但 consistency weights 为 0；
- **same-chart R-Drop**：同一 chart 的两个 stochastic forwards，forward count 匹配；
- **evidence-changed negative control**：证明不应对齐不同 conditioning evidence。

### 5. Efficient Interface

- Forward 只返回 K 个 selected hidden states；shared lm head 仅作用于这些 states。
- 对 position slot，gather 20 个 target-z logits，EXIT 用 EOS 与其他合法 position logits 的 `logsumexp`。
- 直接在 21-way log-probability space 计算 KL。
- Paired sequence 只含 verbatim context 与一个 teacher-forced target column，不保留两条 16k×vocab logits graphs。
- 一支 no-grad teacher、一支 student，下一 minibatch 交换方向。

### 6. Formal Scope

理论对象是 parser-induced target-column marked process。若每个 reachable paired history 的 event/mark conditionals 相等，则 chain rule 给出 induced column distribution 相等；两种 chart-induced column distributions 的 KL 可分解为 matched histories 上的 expected stepwise conditional KL。

训练 objective 只是对 GT/rollout sampled histories 的 Monte Carlo surrogate。本文不声称：

- whole-scene joint 完全 gauge-invariant；
- off-support branches 得到保证；
- arbitrary order invariance；
- general SE(3) equivariance。

### 7. Inference

完全不变。只使用单次原 GaussianGPT sampler；不做第二 chart、reranking、consensus 或额外 decoder。

## Static Evidence Already Available

确定性 CPU/code audit 已验证：

- scene position vocabulary 为 8000=20³；
- 默认 `no_empty_columns=false`；
- full action space 无损分为 20 个 z events 与 EXIT：20 个 target tokens、7980 个其他 position tokens加 EOS；
- 一个 synthetic production-like context 上 48 个非零合法 xy translations 均保持 xyz order；
- strict monotonic rule 后的剩余 target-z event support 在两 chart 下相同。

这只证明定义自洽、非平凡。没有 checkpoint/data，因此没有证明 real pair coverage、frozen disagreement 或质量提升。

## Preregistered Gates

| Gate | Test | Pass criterion | Failure action |
|---|---|---|---|
| G0 Parser equivalence | exhaustive property test against exact default parser | every legal token/EOS yields the same `A_o` event and parser transition; probabilities sum to 1 | repair definition or kill before model use |
| G1 Real pair coverage | verbatim validation rollouts only | >=20% non-bootstrap origin-change target states have a nonzero pair; >=10k states; covered/uncovered context length and occupancy standardized differences <=0.25 after planned reweighting | kill; never truncate prompts |
| G2 Frozen chart effect | replay/dropout/chart intervention | median event JS >=5× replay noise; origin-change states have >=25% excess matched JS over stable states; coupled-sample divergence nontrivial | kill before fine-tuning |
| G3 Feature materiality | same-target feature audit | feature JS >=2× replay noise and materially linked to failure | otherwise delete feature loss |

## Claim-Driven Evidence Plan

### Claim 1: Real origin changes expose chart-only event jumps

- Extract verbatim `(H,T)` rollout states.
- Hold H, T, model, temperature and random uniforms fixed; intervene only on legal origin.
- Compare event JS, target NLL, coupled sample divergence and next-column seam.
- Stratify actual runs by origin-change vs origin-stable steps with matching on context length, occupancy and target distance.

Kill if G1/G2 fails.

### Claim 2: Semantic chart pairing beats generic regularization

Matched-compute arms:

1. standard fine-tune;
2. origin augmentation;
3. same-chart R-Drop;
4. chart-event consistency;
5. event+feature only if G3 passes.

Metrics: held-out event JS/NLL, chunk FID/KID/COV/MMD, entropy and pairwise diversity. Predeclared no-degradation margins: relative FID/KID <=3%, COV decrease <=2 percentage points, diversity decrease <=5%.

### Claim 3: Removing chart jumps improves long-scene generation

- Generate 4/8/12 m scenes, at least 3 seeds, unchanged inference.
- Primary: >=15% reduction in origin-switch-localized seam jump and >=10% reduction in distance-KID slope relative to both augmentation and R-Drop, confidence intervals excluding zero.
- Mandatory secondary: fully report `|KID_x-KID_y|`; when baseline directional gap is significant, target >=20% relative reduction.
- Reject causal claim if improvement is not localized to origin changes, depends on consensus, or harms chunk quality/diversity.

## Failure Modes

- No adequate real pairs: kill C01.
- Frozen effect near noise: kill before training.
- R-Drop matches: conclude generic smoothing, reject method novelty.
- EXIT aggregation erases all signal: kill parser-level thesis; do not return to intersection KL.
- Feature signal weak: delete feature loss.
- Only global quality changes, no origin localization: reject causal mechanism.
- x/y gap unchanged despite significant baseline gap: success condition is incomplete; report honestly.

## Novelty Boundary

Do not claim first equivariant model, first patch consistency, first random-order 3D AR, or first long-scene generator. The provisional delta is:

> Fix physical evidence and parser-consumed action semantics, change only the local coordinate chart, push the complete sparse-token distribution into a common physical column-event space, and train away the isolated window-origin dependence.

Deep novelty status remains `PARTIAL / provisional`; absence of an exact 2024–2026 hit is not proof.

## Implementation and Compute

- G0/G1 compiler and coverage report: CPU, 2–4 days.
- G2/G3 frozen audit: estimated 2–6 GPU-hours once checkpoint/tokenized rollouts are available.
- One-batch selected-slot memory/throughput benchmark before training.
- Minimal fine-tune: 12–30 GPU-hours per arm.
- Full 3-seed/long-scene matrix: roughly 200–500 GPU-hours, staged behind gates.
- Current run launched zero GPU jobs.

## First Three Runs

1. **G1 real-prompt pair coverage scan** — CPU only; kill on inadequate coverage/bias.
2. **G2 frozen counterfactual audit** — same H/T/randomness, chart-only intervention; kill on noise-level or non-localized effect.
3. **Selected-slot microbenchmark + minimal matched-compute pilot** — only after G1/G2; compare augmentation, R-Drop and event consistency.

## Current Status

- Method proposal: READY for experiment planning.
- Static parser construction: partial G0 pass in default synthetic single-column setting.
- Empirical method validation: not started.
- Paper acceptance: unvalidated.
- Review independence: same-family.
- Acceptance status: provisional.
