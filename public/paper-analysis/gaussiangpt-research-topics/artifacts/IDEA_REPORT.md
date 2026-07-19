# GaussianGPT 可发表改进方向：研究创意发现报告（Idea Discovery Report）

- **研究方向（Direction）**：基于 GaussianGPT 寻找可发表的改进方向
- **参考论文（Reference）**：[GaussianGPT：迈向自回归三维高斯场景生成（Towards Autoregressive 3D Gaussian Scene Generation）](https://arxiv.org/abs/2603.26661)，arXiv:2603.26661v2 / ECCV 2026 仓库状态
- **本地材料（Local materials）**：`2603.26661v2.pdf`、`GaussianGPT/`
- **日期（Date）**：2026-07-16
- **流程（Pipeline）**：文献研究（research-lit）→ 创意生成（idea-creator）→ 新颖性检查（novelty-check）→ 研究评审（research-review）→ 研究精炼流程（research-refine-pipeline）
- **检索截止日期（Retrieval cutoff）**：2026-07-16
- **创意数量（Ideas）**：12 个机械去重候选 → 12 个新评审团评分候选 → 3 个深度查新候选 → 0 个 GPU 试验 → 1 个完整精炼方案
- **可信度说明（Assurance）**：已达到会议级实验规划详细度；所有模型家族评审均为同模型家族（`same-family`），所有新颖性/接收判断均为暂定（`provisional`）
- **GPU 实验（GPU experiments）**：**无**——按用户要求明确跳过

## 执行摘要（Executive Summary）

推荐主线是 **C01：面向 GaussianGPT 的坐标图一致列事件（Chart-Consistent Column Events）**。它不再研究宽泛的“不同滑窗一致性”，而是固定完全相同的物理生产提示（production prompt）与目标列（target column），只改变合法局部窗口原点（local window origin）；随后把 GaussianGPT 的完整位置/EOS 词元（position/EOS token）概率无损映射到共同 `{z0,...,z19, EXIT}` 事件空间，并对齐两个坐标图（chart）的条件分布。

它优先于其他方向的原因：

1. **直接命中论文/代码暴露的失效（failure）**：大场景质量随距离退化、x/y 明显不对称，而代码会在每个窗口中将同一全局体素（voxel）重写为新的局部位置 ID。
2. **方法足够小**：零新增参数，冻结 VQ-VAE/解码器（decoder），不增加记忆（memory）、规划器（planner）、新预测头（new head）、共识机制（consensus）或额外推理轮次（inference pass）。
3. **最容易被严谨证伪**：真实提示配对覆盖率（prompt pair coverage）、冻结模型坐标图效应（chart effect）、原点切换定位（origin-change localization）中任一项失败都立即终止。
4. **静态定义已通过第一道检查**：CPU 审计（audit）验证了 48 个非零合成平移（synthetic translations）、完整的 8001→21 事件划分（event partition）、顺序保持和单调目标事件支撑集（monotonic target-event support）；但由于没有检查点/数据，尚无真实配对覆盖率或模型效果证据。
5. **评审意见已收敛**：新评审团（fresh jury）排名第 1；前三名严苛评审（Top-3 brutal review）只允许该方向进入精炼；研究精炼评分从 6.30→8.15→9.05，最终仅判定“可进入实验规划”，不代表论文方法已获验证。

备选：

- **C02 三状态概率高斯补全（Tri-State Probabilistic Gaussian Completion）**：问题重要，但 AutoSDF、ShapeFormer、Probabilistic Implicit Scene Completion、CompleteSplat、GaussFiller 等近邻工作密集；只有“任意射线条件下严格保持观测一致的高斯场景后验（Gaussian scene posterior）”暂时保留新颖性。
- **C06 基座兼容的渲染归因稀疏例外（Base-Compatible Render-Attributed Sparse Exceptions）**：只能先做预言机实验（oracle）；如果完整计费的 10% 词元预算不能追回至少 70% 的 PSNR/LPIPS 分词器差距（tokenizer gap），立即停止。

最先执行的三个未来运行（runs）：

1. R001：默认解析器（default parser）与 `A_o` 的精确属性测试（exact property test），使用 CPU。
2. R002：逐字保留滚动提示的配对覆盖扫描（verbatim rollout prompt pair-coverage scan），使用 CPU；禁止截断提示。
3. R003：冻结检查点的纯坐标图反事实审计（chart-only counterfactual audit），耗时 2–6 GPUh，仅在 R001/R002 通过后运行。

## 证据边界（Evidence Boundary）

本报告没有下列证据：

- 没有检查点前向传播（checkpoint forward）；
- 没有分词器/GPT 微调（tokenizer/GPT fine-tune）；
- 没有 FID/KID/COV/MMD/多样性（diversity）新结果；
- 没有 4/8/12 m 新场景；
- 没有速度或显存改进；
- 没有跨模型/外部独立审稿。

因此，`READY` 仅表示方法与实验交接文档已经足够具体；**经验性可接受度仍未验证（empirical acceptance remains unvalidated）**。

## GaussianGPT 基线审计（Baseline Audit）

### 论文层事实（Paper-level facts）

- 2.5 cm 高斯网格（Gaussian grid）经三级稀疏卷积神经网络（3-stage sparse CNN）压缩为 20 cm 潜变量（latent）；平均约有 3.2k 个已占用潜变量（occupied latents），每个位置+特征使用两个词元。
- 采用固定 xyz 序列化（serialization）、GPT-2-medium、16,384 上下文长度（context）和 3D/4D RoPE。
- 在 3D-FRONT 上，外观/布局（appearance/layout）优于 L3DG，但无条件几何 COV/MMD 较弱。
- A100 无条件推理 78.1 s，对比 L3DG 23.8 s；峰值显存约 3.2–3.4×。
- 12 m × 12 m 场景约 6000 s/GH200；随 seed 距离退化，x 方向显著差于 y。
- 分词器率失真（tokenizer rate-distortion）明显：约 53k/14k/3.2k 个潜变量分别对应 PSNR 24.34/23.73/21.11。
- ScanNet++ 只提供定性结果（qualitative），并指出高频细节丢失以及缺失/未观测（missing/unobserved）区域表达不足。

### 代码层事实（Code-level facts）

- 审计时仓库在提交 `e3be826` 上保持干净；59 个 Python 文件通过了无需导入的抽象语法树解析（import-free AST parsing）；没有测试/持续集成（CI）或本地检查点。
- 当前环境未安装 PyTorch，因此没有运行张量级 CPU 冒烟测试（tensor CPU smoke test）。
- `generate_scene.py` 会重建局部提示，并对每个列/组执行完整预填充（prefill）；稀疏 RoPE 在每一步重建前缀位置索引。
- 默认大场景配置为 `no_empty_columns=false`、`resample_empty_columns=true`，最多重试 5 次。
- 单列解析器接受目标局部 xy 上的行，并在遇到第一个其他 xy/结束事件时停止。
- 词元化载荷保留 `{coords, feature_ids}`；采样器暴露 logits 处理器和返回 logits 的干预钩子。
- 本次创意发现流程没有修改 GaussianGPT 仓库。

详细参考摘要见 `idea-stage/REF_PAPER_SUMMARY.md`。

## 文献版图（Literature Landscape）

### 1. 顺序与因子分解（Order and factorization）

- [RandAR](https://arxiv.org/abs/2412.01827) 已支持带位置指令的随机顺序、仅解码器视觉生成（random-order decoder-only visual generation）。
- [MAR-3D](https://arxiv.org/abs/2503.20519) 使用随机掩码自回归去噪（random masked autoregressive denoising）生成高分辨率三维内容。
- [G3PT](https://arxiv.org/abs/2409.06322)、SAR3D 和 [VAR-3D](https://arxiv.org/abs/2602.13818) 已覆盖跨尺度/多尺度/视角感知三维自回归（cross-scale/multiscale/view-aware 3D autoregression）。
- [PointNSP](https://openaccess.thecvf.com/content/CVPR2026/html/Meng_PointNSP_Autoregressive_3D_Point_Cloud_Generation_with_Next-Scale_Level-of-Detail_Prediction_CVPR_2026_paper.html) 进一步削弱了宽泛的排列/顺序新颖性论断。

**含义（Implication）**：随机、任意、掩码、多尺度或简单切换轴的顺序都不能成为主要贡献。C01 只有在固定证据与动作语义、仅改变坐标图时才能保留新颖性。

### 2. 长时程场景扩展与记忆（Long-horizon scene growth and memory）

- [WorldGrow](https://arxiv.org/abs/2510.21682) 使用分块修补（block inpainting）和由粗到细生成处理无限三维世界。
- [WorldExplorer](https://arxiv.org/abs/2506.01799)、[Stream3D](https://arxiv.org/abs/2605.21472)、[Captain Safari](https://arxiv.org/abs/2511.22815) 和 [LongStream](https://arxiv.org/abs/2602.13172) 已覆盖可导航世界生成、证据/位姿对齐记忆（evidential/pose-aligned memory）与缓存一致的流式几何（cache-consistent streaming geometry）。
- [BAgger](https://arxiv.org/abs/2512.12080) 使用纠正滚动（corrective rollouts）直接处理长时程自回归暴露偏差。

**含义**：通用记忆、粗粒度规划和自滚动纠正被列入主要创新禁区。

### 3. 自适应词元化与率失真（Adaptive tokenization and rate-distortion）

- [SuperVoxelGPT](https://arxiv.org/abs/2605.29655) 提供自适应有序三维超体素（adaptive ordered 3D supervoxels）。
- [CodecSplat](https://arxiv.org/abs/2605.25563)、F4Splat、SplatWeaver、Differentiable Gaussian Hierarchies 及高斯压缩工作已密集覆盖率失真与自适应分配。
- [Can3Tok](https://arxiv.org/abs/2508.01464) 和 [Native and Compact Structured Latents](https://arxiv.org/abs/2512.14692) 已覆盖场景级/结构化三维潜变量设计。

**含义**：C06 只能主张固定基座兼容性与稀疏渲染归因增强流，不能主张首个自适应词元化或残差编码。

### 4. 部分观测与补全（Partial observation and completion）

- AutoSDF 与 ShapeFormer 已支持任意空间条件/部分输入。
- Probabilistic Implicit Scene Completion 对多模态大场景补全进行建模。
- [CompleteSplat](https://arxiv.org/abs/2508.21542) 可从单张图像生成多样化的完整高斯泼溅表示；GaussFiller、GSCompleter 和 PanoPlane 进一步使近期高斯补全方向变得拥挤。

**含义**：已占用/自由/未知（O/F/U）状态、任意掩码和多样性各自都不新。C02 必须提出具有严格观测保持与适当评分（proper scoring）的物理约束高斯后验。

### 5. 解码与采样效率（Decoding and sampling efficiency）

- [FlashAR](https://arxiv.org/abs/2605.09430) 和 [Parallel Jacobi Decoding](https://arxiv.org/abs/2606.05703) 已覆盖后训练与并行自回归加速。
- [Entropy-Guided k-Guard Sampling](https://arxiv.org/abs/2601.19488) 已覆盖简单的熵自适应候选预算。

**含义**：并行解码或仅依据熵的分支不是清晰的 GaussianGPT 论文主线。

## 生成前禁区清单（Pre-Generation Banlist）

| 宽泛方向（Broad direction） | 不能作为主要贡献的原因 |
|---|---|
| 随机/任意顺序 | RandAR/RAR/PARD |
| 掩码/随机顺序三维生成 | MAR-3D |
| 多尺度/由粗到细 | G3PT/SAR3D/VAR-3D/WorldGrow |
| 自适应三维词元单元 | SuperVoxelGPT |
| 通用自适应视觉词元 | DPAR/EVATok/AdapTok |
| 仅依据熵的采样 | ENkG |
| 通用并行解码 | FlashAR/Parallel Jacobi |
| 通用长期记忆 | LongStream/WorldExplorer/Stream3D/Captain Safari |
| 通用滚动纠正 | BAgger |
| 仅场景级高斯潜变量 | Can3Tok |
| 仅紧凑/原生三维潜变量 | Structured/Native Compact Latents |
| 仅自适应高斯分配 | F4Splat/SplatWeaver/hierarchies |
| 通用部分高斯补全 | CompleteSplat/GaussFiller/GSCompleter |
| 通用不确定性或压缩 | uncertainty GS / CodecSplat |

## 新评审团排名（Fresh-Jury Ranking）

评分范围为 1–5；评审风险 5 表示最高。加权总分来自新评审团，而非实验数据。

| 排名 | ID | 创意（Idea） | 新颖性 | 问题杠杆 | 简洁性 | 可证伪性 | 可行性 | 评审风险 | 总分 / 100 | 评审结论 |
|---:|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | C01 | 同证据规范一致性（Same-Evidence Gauge Consistency） | 4 | 5 | 4 | 5 | 4 | 4 | 81 | 推荐，论断须收窄 |
| 2 | C02 | 三状态概率补全（Tri-State Probabilistic Completion） | 3 | 5 | 4 | 5 | 3 | 4 | 74 | 备选 |
| 3 | C06 | 渲染归因稀疏例外（Render-Attributed Sparse Exceptions） | 3 | 4 | 4 | 5 | 3 | 4 | — | 备选；先做预言机实验 |
| 4 | C03 | 精确空间生存过程（Exact Spatial Survival） | 2 | 4 | 4 | 5 | 3 | 5 | — | 终止独立方向；仅保留 CPU 证明 |
| 5 | C08 | 方向条件多顺序（Direction-Conditioned Multi-Order） | 2 | 4 | 3 | 5 | 4 | 5 | — | 并入 C01 消融 |
| 6 | C12 | 度量等变 RoPE（Metric-Equivariant RoPE） | 3 | 3 | 3 | 4 | 3 | 4 | — | 并入 C01 范围/消融 |
| 7 | C09 | 几何—外观编码（Geometry–Appearance Codes） | 2 | 3 | 4 | 4 | 3 | 4 | — | 作为 C06 的分词器基线 |
| 8 | C04 | RoPE 传输 KV（RoPE-Transported KV） | 2 | 5 | 2 | 5 | 1 | 5 | — | 当前架构下解析论断不成立 |
| 9 | C11 | 集合感知体素干（Set-Aware Voxel Stem） | 2 | 3 | 3 | 5 | 4 | 5 | — | 早期碰撞终止门槛 |
| 10 | C05 | 坐标稀疏 KV（Coordinate Sparse KV） | 2 | 4 | 3 | 3 | 3 | 5 | — | 仅作为系统基线 |
| 11 | C07 | 渐进残差 LFQ（Progressive Residual-LFQ） | 1 | 3 | 4 | 5 | 4 | 5 | — | 并入 C06 |
| 12 | C10 | LFQ 比特预测（LFQ Bit Prediction） | 1 | 2 | 4 | 5 | 5 | 5 | — | 终止独立方向 |

完整的机械去重候选池见 `.aris/traces/idea-creator/2026-07-16_run01/candidate_pool.md`。

## 推荐创意（Recommended Ideas）

### 创意 1 — 面向 GaussianGPT 的坐标图一致列事件（Chart-Consistent Column Events）— 推荐

- **方法（Method）**：
  1. 提取逐字保留的生产状态 `(H,T)`，固定全局上下文行和目标列。
  2. 在两个合法局部原点下重新编码相同 H/T，不改变证据或顺序。
  3. 将全部 8000 个位置结果与 EOS 推送到共同解析器事件空间 `{z0...z19, EXIT}`，不丢弃任何概率质量。
  4. 使用选定槽位停止梯度 KL（selected-slot stop-gradient KL）训练匹配事件分布；架构与推理保持不变。
- **假设（Hypothesis）**：纯坐标图事件跳变是原点切换接缝与长场景漂移的因果贡献因素。
- **最小实验（Minimum experiment）**：先运行 R001/R002 CPU 门槛，再运行冻结的 R003；真实覆盖率和冻结效应未通过时不得微调。
- **预期成功（Expected success）**：方法优于原点增强和 R-Drop；接缝超额至少降低 15%、KID 斜率至少降低 10%，且分块质量/多样性不退化。
- **新颖性（Novelty）**：前三名评审中约为 7/10；论断级结论为“部分成立/暂定（`PARTIAL / provisional`）”。最接近的概念包括全景裁剪一致性、SyncTweedies、群等变位置方法、RandAR/MAR-3D 和 LongStream，但尚未发现包含全部条件的完全相同工作。
- **可行性（Feasibility）**：通过 G0 后较高；零新增参数、K 个选定槽位、单梯度分支。真实配对覆盖率仍未知。
- **风险（Risk）**：中高（MEDIUM-HIGH）。如果 G1/G2 失败，可在训练前直接终止。
- **贡献类型（Contribution type）**：方法 + 因果诊断。
- **试验结果（Pilot result）**：`已跳过——用户要求不使用 GPU`。
- **最强反对意见（Strongest objection）**：改变原点通常也会改变物理支撑集/证据；精炼后方法之所以成立，是因为它固定逐字 H/T，并使用解析器消费的动作语义，而不是直接比较原始重叠窗口。
- **执行理由（Why do it）**：在所有创意中，该方向具有记录最清楚的失效、最小的干预和最强的终止逻辑。

#### 静态 G0 结果（Static G0 result）

`idea-stage/STATIC_PREMISE_AUDIT.md` 只验证合成/默认语法构造，不能证明模型失效或质量增益。

#### 精炼方法状态（Refined method status）

- 研究精炼评分：6.30 → 8.15 → 9.05。
- 最终结论：仅表示已可进入实验规划（READY）。
- 清理后的方案：`refine-logs/FINAL_PROPOSAL.md`。
- 实验计划：`refine-logs/EXPERIMENT_PLAN.md`。

### 创意 2 — 三状态概率高斯补全（Tri-State Probabilistic Gaussian Completion）— 备选

- **方法**：
  1. 将任意 RGB-D/射线观测编译为“已观测占用 / 已观测自由 / 未知”（observed occupied / observed free / unknown）三种状态。
  2. 直接复制已观测占用区域，对已知自由空间赋予零后验支撑，只采样未知占用与特征。
  3. 使用排列不变观测编译器（permutation-invariant observation compiler）与适当评分校准（proper-scoring calibration）；解码后仍保持观测。
  4. 评估真实多视图射线掩码，而不是仅使用前缀/包围盒掩码。
- **假设**：物理三状态后验语义相较硬掩码，能改善未知区域的校准与覆盖率。
- **最小实验**：先比较部分视图与完整场景中可见体素 LFQ 的精确匹配；如果不泄漏真值（GT）就无法辨识直接复制结果，则终止原始 RGB-D 表述。
- **预期成功**：在未知区域 NLL、Brier 分数、能量分数（energy score）、COV/MMD 和多样性上优于 AutoSDF 类任意查询及仅硬掩码方法，而不只是减少自由空间违规。
- **新颖性**：部分成立（`PARTIAL`），约 5–6/10。任意条件与 O/F/U 语义并不新；严格的场景级高斯后验是唯一暂时保留的增量。
- **可行性**：中等；无需新标签，但部分观测编码和输出级保持并不简单。
- **风险**：高（HIGH）。真值潜变量泄漏和观测编码不匹配都属于致命问题。
- **贡献类型**：条件生成方法 + 校准协议。
- **试验结果**：`已跳过——用户要求不使用 GPU`。
- **最强反对意见**：除非未知区域的适当评分有实质提升，否则 AutoSDF + OctoMap 语义 + CompleteSplat 很可能只是显而易见的组合。
- **备选启动条件**：仅在 C01 被终止，且可见潜变量可辨识性门槛在无真值泄漏下通过时启动。

### 创意 3 — 基座兼容的渲染归因稀疏例外（Base-Compatible Render-Attributed Sparse Exceptions）— 备选 / 仅预言机实验

- **方法**：
  1. 逐字节冻结现有 20 cm 基础晶格、LFQ、解码器和基础词元流。
  2. 使用可见性归一化的多视图边际渲染失真（visibility-normalized multi-view marginal render distortion）识别稀疏例外支撑集。
  3. 以完整基础流为条件，生成例外坐标和残差 LFQ 编码。
  4. 在严格不超过 10% 的增强预算中完整计入坐标/分隔符/END/熵成本；该增强层可被丢弃。
- **假设**：分词器失真足够集中，因此稀疏增强可追回浅层分词器的大部分质量。
- **最小实验**：不使用 GPT，在完整成本的 1/2.5/5/10/20% 预算下做预言机实验，对比随机选择、潜变量幅度、SuperVoxel/F4Splat 显著性及同位置 RVQ。
- **预期成功**：在 10% 预算下，针对新视角同时追回至少 70% 的 PSNR 和 LPIPS 差距；学习得到的支撑集达到至少 85% 的预言机增益。
- **新颖性**：当前为部分成立（`PARTIAL`），约 5.5/10。宽泛的可扩展/残差编码并不新；固定基座的生成式例外通道是暂定增量。
- **可行性**：中低；需要修改自编码器（AE）残差路径和 GPT 语法。
- **风险**：高。仅根据基础流可能无法预测预言机支撑集。
- **贡献类型**：分词器/率失真方法。
- **试验结果**：`已跳过——用户要求不使用 GPU`。
- **最强反对意见**：PRIMU/GaussianPOP 归因 + top-k RVQ，或 SuperVoxelGPT/F4Splat 式分配，可能已经能够完整解释该方案。
- **备选启动条件**：仅在 C01/C02 均被终止且严格预言机门槛通过后启动。

## 其余排序创意（Remaining Ranked Ideas）

### C03 — 精确标记空间生存 GaussianGPT（Exact Marked Spatial Survival GaussianGPT）

- **方法**：精确零连续段/范围生存（zero-run/extent survival）→ 列计数/子集 → 高斯特征标记；使用免重试似然。
- **假设**：改变温度的重试会造成密度/范围偏差，并损害几何覆盖率。
- **最小实验**：训练前使用 CPU 完成解析/蒙特卡洛采样器偏差证明。
- **相关工作（Prior work）**：ShapeFormer、VoxelDNN/MSVoxelDNN、OctSqueeze/OctAttention、ACNP 子节点计数、占用→属性压缩、点过程（point processes）。
- **可行性**：中等；需修改语法/损失/采样器。
- **静态结论（Static verdict）**：除非精确偏差证明和场景尺度生存增量同时成立，否则终止独立方向。
- **试验（Pilot）**：已跳过；未使用 GPU。

### C08 — 方向条件多顺序（Direction-Conditioned Multi-Order）

- **方法**：有限轴遍历族、顺序指令、前沿对齐选择、跨顺序蒸馏。
- **假设**：固定 xyz 会造成方向性 KID 差异。
- **最小实验**：在六个方向上比较 xyz、增强和指令方法。
- **相关工作**：RandAR/RAR/MAR-3D 以及固定 Z/Hilbert 顺序使独立新颖性较弱。
- **可行性**：高。
- **结论**：仅并入 C01 消融；不能成为论文主线。
- **试验**：已跳过。

### C12 — 重力对齐度量 RoPE（Gravity-Aligned Metric RoPE）

- **方法**：重力对齐、度量坐标相位、偏航一致性（yaw consistency）、弱曼哈顿方向词元。
- **假设**：固定数据集坐标轴会损害 ScanNet++ 和方向稳健性。
- **最小实验**：连续偏航交叉熵/补全和方向 KID。
- **相关工作**：SE(2)/SE(3) 等变 Transformer、坐标 RoPE、规范化（canonicalization）。
- **可行性**：中等；类别位置词元仍会泄漏规范信息（gauge）。
- **结论**：作为 C01 的范围/消融，不独立成篇。
- **试验**：已跳过。

### C09 — 几何—外观逐级编码（Geometry–Appearance Successive Codes）

- **方法**：共享干网络，先使用几何 LFQ，再可选使用外观 LFQ；匹配词元预算。
- **假设**：单代码本（codebook）会造成几何与感知目标竞争。
- **最小实验**：等词元预算下比较 COV/MMD、FID/KID，并进行泄漏审计。
- **相关工作**：解耦/因子化编码、Can3Tok 和结构化潜变量。
- **可行性**：中等；需要完整重训 AE+GPT。
- **结论**：作为 C06 的基线，不构成独立论断。
- **试验**：已跳过。

### C04 — RoPE 传输的持久 KV（RoPE-Transported Persistent KV）

- **方法**：原点移动时对缓存键做相位旋转、使用体素索引持久缓存，并刷新/蒸馏。
- **假设**：避免重复预填充和 6000 秒的大场景运行时间。
- **最小实验**：logit 等价性与缓存复用审计。
- **致命缺陷（Fatal flaw）**：局部位置词元嵌入会改变内容隐藏状态和值；RoPE 相位传输无法修复这些变化。
- **可行性**：在当前架构中较低。
- **结论**：否定解析等价性；学习式近似缓存归入 C05 基线。
- **试验**：已跳过。

### C11 — 集合感知体素干 + 混合解码（Set-Aware Voxel Stem + Mixture Decode）

- **方法**：使用不透明度感知集合池化替代 `RANDOM_SUBSAMPLE`；对碰撞体素使用 1–3 个分量。
- **假设**：真实扫描细节丢失来自体素内部碰撞。
- **最小实验**：统计碰撞直方图；若超过 95% 的已占用体素为单元素，则终止。
- **相关工作**：DeepSets/PointNet/混合解码器均为标准方法。
- **可行性**：若碰撞确实存在，则为中高。
- **结论**：设置早期终止门槛；最多作为 C06 的辅助模块。
- **试验**：已跳过。

### C05 — 前沿地标坐标 KV（Frontier-Landmark Coordinate KV）

- **方法**：局部三维 KV 加压缩远程地标，通过体素坐标选择。
- **假设**：以较低内存提供更大物理上下文，可改善远距离质量。
- **最小实验**：与更大分块在相同成本/内存下比较，不能只匹配 FLOPs。
- **相关工作**：稀疏/局部注意力、八叉树 Transformer、LongStream、流式记忆。
- **可行性**：中等，但内核风险高。
- **结论**：作为系统基线，不独立成篇。
- **试验**：已跳过。

### C07 — 渐进残差 LFQ 停止（Progressive Residual-LFQ Stop）

- **方法**：每个体素使用可变的 1–3 个残差 LFQ 编码，并学习停止位置。
- **假设**：平均不超过 1.5 个编码即可接近 3 编码质量。
- **最小实验**：固定 1/2/3 编码与学习式停止比较，完整计入控制符成本。
- **相关工作**：残差 VQ/LFQ 与学习深度已经成熟；仓库已实现 ResidualLFQ。
- **可行性**：高。
- **结论**：并入 C06；不具备独立新颖性。
- **试验**：已跳过。

### C10 — LFQ 比特结构化预测（LFQ Bit-Structured Prediction）

- **方法**：预测 12 个 LFQ 符号比特/半字节，而不是 4096 类分类。
- **假设**：结构化错误可改善长尾样本效率。
- **最小实验**：在匹配 FLOPs 下评估精确编码、解码均方误差（MSE）、校准和 FID/KID。
- **相关工作**：二值潜变量、逐比特自回归、乘积码。
- **可行性**：高；只训练预测头的试验可能不超过 2 GPUh。
- **结论**：终止独立方向；仅缩小预测头不能构成论文贡献。
- **试验**：已跳过。

## 已淘汰/暂缓方向（Eliminated / Withheld Directions）

| 方向（Direction） | 决策（Decision） | 原因（Reason） |
|---|---|---|
| 自滚动纠正训练/修复（self-rollout corrective training / repair） | 终止 | BAgger 已直接覆盖该机制；仅加入空间破坏不足以形成增量 |
| 通用持久全局记忆 | 终止 | LongStream/Stream3D/WorldExplorer/Captain Safari 已使方向拥挤 |
| 先规划后泼溅的由粗到细方法（plan-then-splat coarse-to-fine） | 终止 | WorldGrow 和多尺度三维自回归已直接覆盖 |
| 熵分支（entropy branching） | 终止 | 与 ENkG 机制直接重合 |
| 拓扑验证器/重排序 | 仅作基线 | 除非与分布训练论断绑定，否则只是解码工程 |
| 自适应高斯分配/修复器 | 终止 | F4Splat/SplatWeaver/层次方法/后修复器已使方向拥挤 |

## 深度新颖性核验（Deep Novelty Verification）

### C01 论断级结果（claim-level result）

| 论断（Claim） | 结论（Verdict） | 边界（Boundary） |
|---|---|---|
| 宽泛的规范/等变原则（gauge/equivariant principle） | 部分成立 | 群/SE(3) 等变性已经广为人知 |
| 相同证据、不同局部原点、全局重映射位置 + 同目标特征预测一致性 | 暂定新颖（NOVEL — provisional） | 尚未发现完全相同的场景级稀疏高斯自回归条件组合 |
| 任意顺序/序列化不变性 | 不新颖 | RandAR/RAR/MAR-3D/PARD |
| 宽泛分块/窗口一致性 | 部分成立 | 已有全景/裁剪/同步扩散先例 |
| 接缝/漂移改善 | 部分成立 | 问题已知；必须证明坐标图的因果归因 |

致命条件：如果同期工作同时包含场景级稀疏高斯自回归、相同 H/T、不同合法原点、完整全局动作重映射、位置/特征条件对齐、不匹配不同证据以及长场景验证，则核心新颖性将被否定。

### C02 论断级结果

- O/F/U 语义：部分成立，但不新。
- 任意集合条件：不新。
- 多模态校准补全：部分成立。
- 严格任意射线、保持观测的高斯场景后验：暂时保留的论断。

### C06 论断级结果

- 渲染归因（render attribution）：部分成立；近邻包括 PRIMU/GaussianPOP/F4Splat。
- 基础/增强编码：宽泛意义上不新。
- 固定不变基座 + 稀疏生成式例外流：部分成立且为暂定。
- 10%/70% 结果：目前只是一项潜在经验发现，尚非证据。

查新轨迹见 `.aris/traces/novelty-check/2026-07-16_run01/`。

## 外部批判性评审与精炼（External Critical Review and Refinement）

### 前三名严苛评审（Top-3 brutal review）

| 候选（Candidate） | 重要性（Significance） | 新颖性（Novelty） | 可靠性（Soundness） | 可行性（Feasibility） | 当前投稿状态总评 |
|---|---:|---:|---:|---:|---:|
| C01 | 8 | 7 | 6 | 8 | 4/10：前提审计前弱拒（Weak Reject） |
| C02 | 8 | 5 | 5 | 6 | 3/10：拒稿（Reject） |
| C06 | 7 | 5 | 5 | 5 | 3/10：拒稿（Reject） |

评审只选择一条主线：C01。C02 需要通过无泄漏的可见编码可辨识性门槛；C06 需要通过严格预言机门槛。

### 研究精炼演化（Research-refine evolution）

| 轮次（Round） | 分数（Score） | 结论（Verdict） | 主要修正（Main resolution） |
|---:|---:|---|---|
| 1 | 6.30 | 修订（REVISE） | 活动域掩码（active-domain mask）无效；必须使用生产解析器语义 |
| 2 | 8.15 | 修订（REVISE） | 将完整词元概率质量推送到 z/EXIT；方法与因果接口闭合 |
| 3 | 9.05 | 仅可进入规划（READY for planning only） | CPU G0、精确范围、预注册 G1–G3、无经验性夸大 |

`校准（CALIBRATION）：无`。没有可用的人工精选审美锚点（curated taste anchors）。

## 精炼后的 C01 快照（Refined C01 Snapshot）

### 精确贡献（Exact contribution）

> 固定物理证据和解析器消费的动作语义，只改变局部坐标图；将完整稀疏词元分布推送到共同物理列事件空间，并通过训练消除被隔离出的窗口原点依赖。

### 生产事件映射（Production event map）

```text
8000 个位置词元 + EOS
        |
        | 目标局部 xy 且 z=0..19
        +--------------------------> 20 个 z 事件
        |
        | 所有其他合法位置或 EOS
        +--------------------------> EXIT
```

### 门槛（Gates）

- G0 解析器等价性：合成/静态设置部分通过；精确生产属性测试待完成。
- G1 真实配对覆盖率：待完成；若不足则终止。
- G2 冻结坐标图效应/定位：待完成；若处于噪声水平，则微调前终止。
- G3 特征实质性：待完成；若信号弱则删除特征损失。

### 实验模块（Experiment blocks）

1. 语法与真实配对前提门槛。
2. 冻结因果审计。
3. 等算力方法隔离。
4. 4/8/12 m 长场景锚定结果。
5. 最小性/稳健性/失效边界。

### 精炼产物（Refined artifacts）

- 完整方案：`refine-logs/FINAL_PROPOSAL.md`。
- 完整计划：`refine-logs/EXPERIMENT_PLAN.md`。
- 跟踪器：`refine-logs/EXPERIMENT_TRACKER.md`。

## 算力与执行（Compute and Execution）

- R001/R002：仅使用 CPU。
- R003 冻结审计：获取检查点/数据后耗时 2–6 GPUh。
- 到单种子比较为止的最低继续/停止试验：45–105 GPUh。
- 完整论文实验计划：300–550 GPUh；可选附录/ScanNet++ 额外需要 20–100 GPUh。
- 主要成本：12 m 场景生成；按 4 m→8 m→12 m 分阶段执行，并设置硬终止条件。

## 研究契约（Research Contract）

当前创意契约位于 `idea-stage/docs/research_contract.md`。其中只包含入选创意、论断、门槛、决策和用于恢复会话的下一步指针。

## 检索与可信度说明（Retrieval and Assurance Notes）

- 检索覆盖截至 2026-07-16 的 arXiv、CVF/CVPR 2026 页面、OpenAlex、DOI/Crossref 及本地论文/代码。
- Semantic Scholar 返回 429；Exa 缺少 API 密钥；arXiv/OpenAlex 对部分后续请求限流；DBLP 的一条路径出现 SSL EOF。
- 通过直接访问 arXiv/CVF/DOI 和本地证据缓解了这些失败，但因此不能宣称已经穷尽所有新颖性证据。
- 每条评审路线均使用 OpenAI 同模型家族的 Codex 智能体。因此 `acceptance_status` 只能是暂定，从未被标记为已接收。

## 最终建议（Final Recommendation）

只推进 **C01**，并严格按照门槛顺序执行。不要并行推进 C02/C06；如果 G1/G2 失败，也不要通过增加模块来挽救 C01。最有价值的近期结果可能是负结果：如果真实配对覆盖率或冻结坐标图效应可忽略，应尽早停止，并切换到通过自身门槛的备选方向。

## 后续步骤（Next Steps）

- ☐ R001 精确解析器属性测试（CPU）
- ☐ R002 逐字滚动提示配对覆盖率（CPU）
- ☐ 获取官方检查点与词元化滚动数据并记录校验和
- ☐ R003 冻结反事实审计（首个 GPU 运行）
- ☐ 仅在 G1/G2 通过后：等算力试验
- ☐ 获得正面证据后：完整多种子与长场景实验计划

本报告生成任务未运行任何 GPU 实验。

## 已发布的 Markdown 附件（Published Markdown Artifacts）

- [完整研究创意发现报告（Idea Discovery Report）](/paper-analysis/gaussiangpt-research-topics/artifacts/IDEA_REPORT.md)
- [Top 1 精炼研究方案](/paper-analysis/gaussiangpt-research-topics/artifacts/FINAL_PROPOSAL.md)
- [论断驱动实验计划（Claim-driven Experiment Plan）](/paper-analysis/gaussiangpt-research-topics/artifacts/EXPERIMENT_PLAN.md)
- [实验跟踪器（Experiment Tracker）](/paper-analysis/gaussiangpt-research-topics/artifacts/EXPERIMENT_TRACKER.md)
- [研究流程摘要（Pipeline Summary）](/paper-analysis/gaussiangpt-research-topics/artifacts/PIPELINE_SUMMARY.md)
- [静态前提审计（Static Premise Audit）](/paper-analysis/gaussiangpt-research-topics/artifacts/STATIC_PREMISE_AUDIT.md)
- [研究契约（Research Contract）](/paper-analysis/gaussiangpt-research-topics/artifacts/research_contract.md)
