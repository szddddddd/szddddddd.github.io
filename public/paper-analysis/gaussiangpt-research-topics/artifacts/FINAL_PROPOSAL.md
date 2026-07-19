# 研究方案：面向 GaussianGPT 的坐标图一致列事件（Chart-Consistent Column Events）

## 问题锚点（Problem Anchor）

- **根本问题（Bottom-line problem）**：GaussianGPT 在滑窗式大场景生成中，会把物理上相同的稀疏高斯（Gaussian）上下文编码到不同的分块相对坐标图（chunk-relative coordinate charts）。如果预测仅因局部坐标图（local chart）改变而变化，这种干扰依赖（nuisance dependence）会累积为接缝（seam）、方向偏置与远距离退化。
- **必须解决的瓶颈（Must-solve bottleneck）**：在物理证据、预测事件、因果顺序与全局合法支撑集（support）完全相同时，消除仅由局部坐标重新嵌入（re-embedding）造成的下一位置（next-position）与特征条件分布差异。
- **非目标（Non-goals）**：不研究任意顺序或随机顺序生成；不宣称一般 SE(3) 等变性（equivariance）；不约束证据或合法支撑集不同的窗口；不增加全局记忆（memory）、由粗到细规划器（coarse-to-fine planner）、缓存传输（cache transport）、共识解码（consensus decoding）、接缝修复器（seam refiner）或新分词器（tokenizer）。
- **约束（Constraints）**：基于本地 GaussianGPT 论文与代码；冻结 VQ-VAE/解码器（decoder）；不新增人工标注；本轮不运行 GPU；后续以 3D-FRONT 为主、ScanNet++ 为迁移验证；方法必须保持现有推理接口，并达到 CVPR/ICCV/ECCV 级可证伪标准。
- **成功条件（Success condition）**：(1) 能构造非平凡且通过机械断言的支撑集等价坐标图配对（support-equivalent chart pairs）；(2) 冻结检查点（checkpoint）在这些配对上存在显著、可复现且与长程失稳相关的规范不一致（gauge disagreement）；(3) 单一一致性目标（consistency objective）相比原点增强（origin augmentation）与等算力自蒸馏（self-distillation），更能降低留出坐标图不一致、接缝、距离分箱 KID（distance-binned KID）和 x/y 差异；(4) 不使用共识解码时，单分块质量与多样性不显著下降。

## 核心论点（Executive Thesis）

GaussianGPT 的生产级外扩解析器（production outpainting parser）真正消费的空间事件，并不是完整的 8000 类局部位置 ID，而是“目标全局列（column）中的下一个 z 行（row）”或“离开该列”。本方案将每个坐标图的完整词元（token）概率无损推送到共同物理事件空间 `{z0,...,z19, EXIT}`，随后在固定物理提示/目标（prompt/target）、只改变合法窗口原点（window origin）的反事实配对（counterfactual pairs）上对齐条件分布。

方法不增加参数，不修改分词器/解码器/词表/解析器，也不改变推理。核心贡献不是通用 KL 散度，而是一个与生产语法（production grammar）一致的“同状态、同动作空间”坐标图反事实接口（same-state/same-action-space chart counterfactual interface）。

## 基线为何可能失败（Why the Baseline Can Fail）

同一全局上下文行（context row）在不同窗口原点下，会得到不同的局部位置词元与三维旋转位置编码坐标（3D RoPE coordinate）。RoPE 的相对结构无法消除类别词元嵌入（categorical token embedding）、输出头（output head）和非线性隐藏状态对局部坐标图的依赖。当前全序列教师强制交叉熵（full-sequence teacher-forced CE）让每种编码独立拟合独热目标（one-hot target），却不要求完整的解析器消费条件分布（parser-consumed conditional）保持一致。

简单替代方案并不足够：

- 原点增强不约束非目标概率质量；
- R-Drop 只平滑同一坐标图；
- 随机/多顺序（random/multi-order）会改变因果因子分解（factorization），且已被 RandAR、RAR、MAR-3D 等工作覆盖；
- 重叠窗口一致性（overlap-window consistency）比较的是不同证据，目标本身并不成立；
- 记忆/缓存/由粗到细方法不能修复相同证据下的坐标图干扰。

## 方法（Method）

### 1. 生产状态与合法坐标图配对（Production State and Legal Chart Pair）

将一个状态写为 `(H,T)`：

- `H`：生产提示中逐字保留（verbatim）的全局已占用上下文行及 LFQ 特征 ID，维持原始 xyz 顺序；
- `T=(x,y)`：物理目标列。

枚举两个不同原点 `o_a,o_b`，要求 `H` 的全部行以及所有 `(T,z)` 均可映射进 20×20×20 画布（canvas）。两条分支只重写局部坐标，不添加、删除或截断任何证据。

配对编译器（pair compiler）对每个样本执行机械断言：

- 全局 H/T/特征完全一致；
- 词元槽位模式（token-slot pattern）与长度一致；
- 局部/全局映射为双射；
- xyz 顺序保持不变；
- 目标 z 与特征标签一致；
- 解析器的“离开目标列”语义一致。

### 2. 完整词元到事件的推送（Complete Token-to-Event Pushforward）

首篇论文的范围限定为仓库默认大场景配置：单列逐词元路径（single-column tokenwise path），`no_empty_columns=false`、`resample_empty_columns=true`。

施加现有槽位/单调约束（slot/monotonic constraints）后，令 `r_o(v|h)` 表示位置/EOS 词元分布。定义确定性映射 `A_o`：

- 若词元 `v` 解码到目标局部 `(x,y)` 的高度 z，则 `A_o(v)=z`；
- EOS 或任何其他合法位置词元都映射为 `EXIT`。

事件概率为：

`p_o(e|h)=sum_{v:A_o(v)=e} r_o(v|h)`，其中 `e in {z0,...,z19,EXIT}`。

实现采用 `logsumexp`。8000 个位置结果与 EOS 全部计入，不使用支撑集交集、不截断，也不重新归一化。该事件精确对应 `_accept_sparse_rows_for_target` 的状态转移：接受目标 xy 行，其他位置/结束事件则终止本次列尝试（column attempt）。

### 3. 反事实一致性（Counterfactual Consistency）

在教师强制目标列上抽样 `K=32` 个匹配位置槽位（matched position slots），使用交替单向停止梯度 KL 散度（stop-gradient KL）：

`L_event(a->b)=KL(sg(p_a)||p_b)`。

小批次（minibatch）交替使用 `a->b` 与 `b->a`，因此在期望意义上对称，但每次只保留一个梯度图。

对于已占用目标，强制输入坐标图特定的位置词元，再读取 LFQ 特征分布。仅当冻结审计表明特征 JS 散度至少为重放噪声的 2 倍，且与接缝/事件失效存在实质关联时，才启用 `L_feat`；否则最终方法采用仅事件版本（event-only）。

### 4. 训练目标（Training Objective）

保留标准全序列交叉熵，并增加配对列辅助批次（paired column auxiliary batch）：

`L_pair = 0.5(L_colCE_a+L_colCE_b) + lambda_e L_event + I_feat lambda_f L_feat`

`L = L_fullCE + beta L_pair`。

`L_colCE` 同时监督解析器事件（下一 z 或 EXIT）与普通特征交叉熵。对照方法包括：

- **原点增强（origin augmentation）**：使用相同的配对列/事件交叉熵，但一致性权重为 0；
- **同坐标图 R-Drop（same-chart R-Drop）**：在同一坐标图上做两次随机前向传播，并匹配前向次数；
- **证据改变负对照（evidence-changed negative control）**：证明不同条件证据不应被强制对齐。

### 5. 高效接口（Efficient Interface）

- 前向传播只返回 K 个选定隐藏状态（selected hidden states）；共享语言模型头（lm head）仅作用于这些状态。
- 对位置槽位，收集 20 个目标 z 的 logits；`EXIT` 使用 EOS 与其他合法位置 logits 的 `logsumexp`。
- 直接在 21 类对数概率空间中计算 KL 散度。
- 配对序列只包含逐字上下文和一个教师强制目标列，不保留两条 16k×词表 logits 计算图。
- 一条分支作为无梯度教师（no-grad teacher），另一条作为学生；下一小批次交换方向。

### 6. 形式化范围（Formal Scope）

理论对象是解析器诱导的目标列标记过程（parser-induced target-column marked process）。如果每个可达配对历史上的事件/标记条件分布相同，则由概率链式法则可得诱导列分布相同；两种坐标图诱导列分布之间的 KL，可分解为匹配历史上逐步条件 KL 的期望。

训练目标只是基于真值/滚动采样历史（GT/rollout sampled histories）的蒙特卡洛替代量（Monte Carlo surrogate）。本文不声称：

- 整场景联合分布完全规范不变（gauge-invariant）；
- 对支撑集外分支（off-support branches）提供保证；
- 任意顺序不变性；
- 一般 SE(3) 等变性。

### 7. 推理（Inference）

推理完全不变。只运行一次原始 GaussianGPT 采样器；不使用第二坐标图、重排序、共识或额外解码器。

## 已有静态证据（Static Evidence Already Available）

确定性的 CPU/代码审计已验证：

- 场景位置词表大小为 `8000=20³`；
- 默认 `no_empty_columns=false`；
- 完整动作空间无损划分为 20 个 z 事件和 `EXIT`：20 个目标词元、7980 个其他位置词元，再加 EOS；
- 在一个仿生产合成上下文上，48 个非零合法 xy 平移均保持 xyz 顺序；
- 施加严格单调规则后，两种坐标图中剩余的目标 z 事件支撑集相同。

这些结果只证明定义自洽且非平凡。由于没有检查点/数据，尚未证明真实配对覆盖率、冻结模型不一致或质量提升。

## 预注册门槛（Preregistered Gates）

| 门槛（Gate） | 测试（Test） | 通过标准（Pass criterion） | 失败动作（Failure action） |
|---|---|---|---|
| G0 解析器等价性（Parser equivalence） | 针对精确默认解析器的穷举属性测试 | 每个合法词元/EOS 都产生相同的 `A_o` 事件和解析器转移；概率和为 1 | 修复定义，或在使用模型前终止 |
| G1 真实配对覆盖率（Real pair coverage） | 只使用逐字保留的验证集滚动状态 | 至少 20% 的非自举原点切换目标状态具有非零配对；状态数至少 10k；计划重加权后，已覆盖/未覆盖状态的上下文长度和占用率标准化差异不超过 0.25 | 终止；绝不截断提示 |
| G2 冻结坐标图效应（Frozen chart effect） | 重放/丢弃/坐标图干预 | 事件 JS 中位数至少为重放噪声的 5 倍；原点切换状态相对稳定状态的匹配 JS 至少高 25%；耦合采样分歧不可忽略 | 微调前终止 |
| G3 特征实质性（Feature materiality） | 同目标特征审计 | 特征 JS 至少为重放噪声的 2 倍，并与失效具有实质关联 | 否则删除特征损失 |

## 论断驱动的证据计划（Claim-Driven Evidence Plan）

### 论断 1：真实原点切换暴露纯坐标图事件跳变

- 提取逐字保留的 `(H,T)` 滚动状态。
- 固定 H、T、模型、温度和随机均匀变量，只干预合法原点。
- 比较事件 JS、目标 NLL、耦合采样分歧和下一列接缝。
- 将真实运行按原点切换与原点稳定步骤分层，并匹配上下文长度、占用率与目标距离。

若 G1/G2 失败，立即终止。

### 论断 2：语义坐标图配对优于通用正则化

等算力实验分支：

1. 标准微调；
2. 原点增强；
3. 同坐标图 R-Drop；
4. 坐标图—事件一致性；
5. 仅在 G3 通过时加入事件+特征。

指标包括留出事件 JS/NLL、分块 FID/KID/COV/MMD、熵和两两多样性。预注册的不退化边界为：FID/KID 相对退化不超过 3%，COV 下降不超过 2 个百分点，多样性下降不超过 5%。

### 论断 3：消除坐标图跳变可改善长场景生成

- 生成 4/8/12 m 场景，至少使用 3 个随机种子，推理过程不变。
- 主要标准：相较增强和 R-Drop，原点切换局部化接缝跳变至少降低 15%，距离—KID 斜率至少降低 10%，且置信区间不含 0。
- 强制次要标准：完整报告 `|KID_x-KID_y|`；若基线方向差异显著，目标为相对降低至少 20%。
- 如果改进不集中于原点切换、依赖共识解码，或损害分块质量/多样性，则否定因果论断。

## 失效模式（Failure Modes）

- 真实配对不足：终止 C01。
- 冻结效应接近噪声：训练前终止。
- R-Drop 与方法持平：结论为通用平滑，否定方法新颖性。
- `EXIT` 聚合抹除全部信号：终止解析器层论点；不得退回支撑集交集 KL。
- 特征信号弱：删除特征损失。
- 只有全局质量变化、没有原点定位：否定因果机制。
- 基线 x/y 差异显著但改进后不变：成功条件不完整，应如实报告。

## 新颖性边界（Novelty Boundary）

不得宣称首个等变模型、首个分块一致性方法、首个随机顺序三维自回归（3D AR）或首个长场景生成器。暂定的增量贡献为：

> 固定物理证据和解析器消费的动作语义，只改变局部坐标图；将完整稀疏词元分布推送到共同物理列事件空间，并通过训练消除被隔离出的窗口原点依赖。

深度查新状态仍为“部分成立/暂定（PARTIAL / provisional）”；没有检索到 2024–2026 年的完全相同工作并不能构成证明。

## 实现与算力（Implementation and Compute）

- G0/G1 编译器与覆盖率报告：CPU，2–4 天。
- G2/G3 冻结审计：获得检查点和词元化滚动状态后，预计 2–6 GPU 小时。
- 训练前先做单批次选定槽位内存/吞吐基准。
- 最小微调：每个实验分支 12–30 GPU 小时。
- 完整 3 种子/长场景矩阵：约 200–500 GPU 小时，并置于各项门槛之后分阶段执行。
- 当前任务未启动任何 GPU 作业。

## 首先运行的三项实验（First Three Runs）

1. **G1 真实提示配对覆盖扫描（real-prompt pair coverage scan）**——仅使用 CPU；若覆盖率或偏差不合格则终止。
2. **G2 冻结反事实审计（frozen counterfactual audit）**——固定 H/T/随机性，只做坐标图干预；若效应处于噪声水平或无法定位则终止。
3. **选定槽位微基准 + 最小等算力试验（selected-slot microbenchmark + minimal matched-compute pilot）**——仅在 G1/G2 通过后执行；比较增强、R-Drop 和事件一致性。

## 当前状态（Current Status）

- 方法方案：已可进入实验规划（READY）。
- 静态解析器构造：默认合成单列设置下部分通过 G0。
- 经验性方法验证：尚未开始。
- 论文接收可能性：尚未验证。
- 评审独立性：同模型家族（same-family）。
- 接受状态：暂定（provisional）。
