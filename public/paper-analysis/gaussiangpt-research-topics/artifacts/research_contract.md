# Research Contract: Chart-Consistent Column Events for GaussianGPT

> Active working contract for the selected idea. Load this file, not the full candidate pool, when resuming implementation or experiments.

## Selected Idea

- **Description**: 对固定物理 production prompt `H` 与全局 target column `T`，构造只改变合法 local window origin 的 counterfactual chart pairs。把 GaussianGPT 的完整 position/EOS token 分布无损推送到共同 `{z0,...,z19, EXIT}` 事件空间，并用 matched event consistency 消除 origin-induced column-event jump。VQ-VAE、GPT architecture、vocabulary、parser、decoder 与 inference 均保持不变。
- **Source**: `idea-stage/IDEA_REPORT.md`, Idea #1 / C01。
- **Selection rationale**: fresh jury 排名第 1；深度查新后仅窄 claim 暂时存活；方法零新参数、直接针对论文的 x/y/远距退化与代码中的 window re-encoding；CPU static G0 显示 event mapping 自洽且非平凡；research-refine 在第 3 轮达到 9.05/10 的 experiment-handoff READY。所有判断仍为 same-family provisional，且无 GPU 证据。

## Core Claims

1. 在 verbatim production state 上，合法 window-origin chart intervention 会造成超出 replay/dropout noise 的 target-column event jump，并集中在真实 origin-change steps。
2. Production-parser-aligned chart consistency 比等算力 origin augmentation 与 same-chart R-Drop 更有效地消除该 jump，且不伤害 chunk quality/diversity。
3. 用原 sampler、无 consensus/reranking 时，减少 origin jump 会降低 long-scene seam excess、distance-KID slope，并改善可识别的 x/y degradation gap。

## Method Summary

Production state 是 `(H,T)`：`H` 为实际 prompt 中不删减的全局 occupied rows/feature IDs，`T` 为全局 target column。枚举两个能容纳相同 H/T 的不同 window origins，重编码 local position IDs。现有 single-column parser 只保留 target xy rows，遇到其他 position 或 EOS 即停止。因此，定义 `A_o` 将 20 个 target-column token 映射为 z events，将 EOS 与其他 7980 个 position tokens映射为 EXIT；所有概率质量通过 `logsumexp` 被计入。

在 K=32 个 matched slots 上，交替使用单向 stop-gradient KL 对齐 21-way event distributions。保留 full-sequence CE，并加入 paired column event CE。feature consistency 只有在 frozen G3 audit 证明材料性时才启用。推理完全不变。

## Experiment Design

- **Datasets**: 3D-FRONT official split；4/8/12 m large-scene protocol；ScanNet++ 仅作为 primary claims 通过后的 optional transfer。
- **Baselines**: official GaussianGPT / matched standard fine-tune；origin augmentation；same-chart R-Drop。
- **Primary metrics**: real pair coverage；event JS/NLL；coupled-sample divergence；origin-switch seam excess；distance-binned normalized KID slope。
- **Secondary metrics**: `|KID_x-KID_y|`、FID/KID、geometry COV/MMD、diversity、retry rate、wall-clock、memory。
- **Key hyperparameters**: K=32；xy shifts only；single-gradient alternating direction；`lambda_e`/`beta` selected on validation event JS under no-degradation constraints；feature loss gated by G3。
- **Compute budget**: G1 CPU；G2 2–6 GPUh；minimum pilot 45–105 GPUh；full must-run program 300–550 GPUh。No GPU run has started.

## Baselines

| Method | Dataset | Metric | Score | Source |
|---|---|---|---|---|
| GaussianGPT official | 3D-FRONT | paper protocol | reproduce before claims | arXiv:2603.26661v2 / local repo |
| Origin augmentation | 3D-FRONT | event JS + chunk metrics | pending | matched-compute control |
| Same-chart R-Drop | 3D-FRONT | event JS + chunk metrics | pending | matched-compute anti-claim control |

## Current Results

No model/GPU result exists. Deterministic CPU audit only:

- 48 nonzero synthetic xy chart translations checked;
- 8000 position tokens + EOS partition exactly into 20 z events + EXIT;
- xyz order and monotonic target-event support preserved in the synthetic audit.

See `idea-stage/STATIC_PREMISE_AUDIT.md`.

## Key Decisions

- Different-evidence windows are never aligned.
- No arbitrary active-domain mask or support intersection is permitted.
- Main paper is scoped to default `no_empty_columns=false` single-column semantics.
- Prompt truncation to manufacture pair coverage is forbidden.
- Generic KL is not the novelty; the counterfactual production interface is.
- G1 or G2 failure kills the idea before fine-tuning.
- G3 failure deletes feature consistency rather than adding a replacement module.
- No module may be added to rescue a failed premise.

## Next-Step Pointer

Start from `refine-logs/EXPERIMENT_PLAN.md`, run R001 → R002 → R003 in order. Do not launch training until G1 and G2 pass.

## Status

- [x] Idea selected
- [ ] Baseline reproduced
- [ ] Main method implemented
- [ ] Representative dataset results
- [ ] Full dataset results
- [ ] Ablation studies
- [ ] Paper draft
