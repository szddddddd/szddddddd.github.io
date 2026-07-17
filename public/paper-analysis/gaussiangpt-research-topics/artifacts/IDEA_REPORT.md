# GaussianGPT 可发表改进方向：Idea Discovery Report

- **Direction**: 基于 GaussianGPT 寻找可发表的改进方向
- **Reference**: [GaussianGPT: Towards Autoregressive 3D Gaussian Scene Generation](https://arxiv.org/abs/2603.26661), arXiv:2603.26661v2 / ECCV 2026 repository status
- **Local materials**: `2603.26661v2.pdf`, `GaussianGPT/`
- **Date**: 2026-07-16
- **Pipeline**: research-lit → idea-creator → novelty-check → research-review → research-refine-pipeline
- **Retrieval cutoff**: 2026-07-16
- **Ideas**: 12 mechanically deduplicated → 12 fresh-jury scored → 3 deep novelty checked → 0 GPU-piloted → 1 fully refined
- **Assurance**: conference-ready planning; all model-family reviews are `same-family`, all novelty/acceptance judgments are `provisional`
- **GPU experiments**: **none** — explicitly skipped per user request

## Executive Summary

推荐主线是 **C01：Chart-Consistent Column Events for GaussianGPT**。它不再做宽泛的“不同滑窗一致性”，而是固定完全相同的物理 production prompt 与 target column，只改变合法 local window origin；随后把 GaussianGPT 的完整 position/EOS token 概率无损映射到共同 `{z0,...,z19, EXIT}` 事件空间，并对齐两个 chart 的条件分布。

它优先于其他方向的原因：

1. **直接命中论文/代码暴露的 failure**：大场景随距离退化、x/y 明显不对称，而代码在每个 window 中把相同全局 voxel 重写成新的 local position ID。
2. **方法足够小**：零新参数，冻结 VQ-VAE/decoder，不增加 memory、planner、new head、consensus 或 inference pass。
3. **最容易被严谨证伪**：真实 prompt pair coverage、冻结模型 chart effect、origin-change localization 任一失败都立即 kill。
4. **静态定义已过第一道检查**：CPU audit 验证 48 个非零 synthetic translations、完整 8001→21 event partition、order 与 monotonic target-event support；但没有 checkpoint/data，因此尚无真实 pair coverage 或模型效果。
5. **审稿收敛**：fresh jury 排名第 1；Top-3 brutal review 只允许它进入 refine；research-refine 从 6.30→8.15→9.05，最终仅判定“可进入实验规划”，不代表论文已验证。

备选：

- **C02 Tri-State Probabilistic Gaussian Completion**：问题重要，但 AutoSDF、ShapeFormer、Probabilistic Implicit Scene Completion、CompleteSplat、GaussFiller 等近邻密集；只有“任意射线条件下严格观测一致的 Gaussian scene posterior”暂时存活。
- **C06 Base-Compatible Render-Attributed Sparse Exceptions**：只能先做 oracle；若完整计费 10% token 不能收回至少 70% PSNR/LPIPS tokenizer gap，立即停止。

最先做的三个未来 runs：

1. R001：default parser 与 `A_o` 的 exact property test，CPU。
2. R002：verbatim rollout prompt pair-coverage scan，CPU；禁止截断 prompt。
3. R003：冻结 checkpoint 的 chart-only counterfactual audit，2–6 GPUh，仅在 R001/R002 通过后运行。

## Evidence Boundary

本报告没有下列证据：

- 没有 checkpoint forward；
- 没有 tokenizer/GPT fine-tune；
- 没有 FID/KID/COV/MMD/diversity 新结果；
- 没有 4/8/12 m 新场景；
- 没有速度或显存改进；
- 没有跨模型/外部独立审稿。

因此：`READY` 仅指方法和实验交接文档已经足够具体；**empirical acceptance remains unvalidated**。

## GaussianGPT Baseline Audit

### Paper-level facts

- 2.5 cm Gaussian grid 经 3-stage sparse CNN 压到 20 cm latent；平均约 3.2k occupied latents，每个 position+feature 两 token。
- 固定 xyz serialization，GPT-2-medium，16,384 context，3D/4D RoPE。
- 3D-FRONT 中 appearance/layout 优于 L3DG，但无条件 geometry COV/MMD 较弱。
- A100 无条件推理 78.1 s，对比 L3DG 23.8 s；峰值显存约 3.2–3.4×。
- 12 m × 12 m 场景约 6000 s/GH200；随 seed 距离退化，x 方向显著差于 y。
- tokenizer rate-distortion 明显：约 53k/14k/3.2k latents 对应 PSNR 24.34/23.73/21.11。
- ScanNet++ 只给 qualitative，并指出高频细节丢失及 missing/unobserved 表达不足。

### Code-level facts

- Repository was clean at commit `e3be826`; 59 Python files passed import-free AST parsing; no tests/CI or local checkpoint。
- Current environment has no torch, so no tensor CPU smoke was run。
- `generate_scene.py` rebuilds local prompts and performs full prefill per column/group; sparse RoPE rebuilds prefix position indices per step。
- Default large-scene config: `no_empty_columns=false`, `resample_empty_columns=true`, max retries 5。
- Single-column parser accepts rows at target local xy and stops on the first other xy/end event。
- Tokenized payload preserves `{coords, feature_ids}`; sampler exposes logits processor and return-logit intervention hooks。
- GaussianGPT repository was not modified by this discovery workflow。

Detailed reference summary: `idea-stage/REF_PAPER_SUMMARY.md`。

## Literature Landscape

### 1. Order and factorization

- [RandAR](https://arxiv.org/abs/2412.01827) already supports random-order decoder-only visual generation with position instructions。
- [MAR-3D](https://arxiv.org/abs/2503.20519) uses random masked autoregressive denoising for high-resolution 3D generation。
- [G3PT](https://arxiv.org/abs/2409.06322), SAR3D and [VAR-3D](https://arxiv.org/abs/2602.13818) occupy cross-scale/multiscale/view-aware 3D autoregression。
- [PointNSP](https://openaccess.thecvf.com/content/CVPR2026/html/Meng_PointNSP_Autoregressive_3D_Point_Cloud_Generation_with_Next-Scale_Level-of-Detail_Prediction_CVPR_2026_paper.html) further weakens broad permutation/order novelty claims。

**Implication**: random, arbitrary, masked, multiscale or simply axis-switched order cannot be the main contribution。C01 survives only by fixing evidence and action semantics while changing coordinate chart。

### 2. Long-horizon scene growth and memory

- [WorldGrow](https://arxiv.org/abs/2510.21682) handles infinite 3D worlds with block inpainting and coarse-to-fine generation。
- [WorldExplorer](https://arxiv.org/abs/2506.01799), [Stream3D](https://arxiv.org/abs/2605.21472), [Captain Safari](https://arxiv.org/abs/2511.22815) and [LongStream](https://arxiv.org/abs/2602.13172) occupy navigable world generation, evidential/pose-aligned memory and cache-consistent streaming geometry。
- [BAgger](https://arxiv.org/abs/2512.12080) directly addresses long-horizon autoregressive exposure bias with corrective rollouts。

**Implication**: generic memory, coarse planning and self-rollout correction are banlisted as primary innovations。

### 3. Adaptive tokenization and rate-distortion

- [SuperVoxelGPT](https://arxiv.org/abs/2605.29655) provides adaptive ordered 3D supervoxels。
- [CodecSplat](https://arxiv.org/abs/2605.25563), F4Splat, SplatWeaver, Differentiable Gaussian Hierarchies and Gaussian compression work crowd rate-distortion and adaptive allocation。
- [Can3Tok](https://arxiv.org/abs/2508.01464) and [Native and Compact Structured Latents](https://arxiv.org/abs/2512.14692) occupy scene-level/structured 3D latent design。

**Implication**: C06 can only claim fixed-base compatibility plus a sparse render-attributed enhancement stream—not first adaptive tokenization or residual coding。

### 4. Partial observation and completion

- AutoSDF and ShapeFormer already support arbitrary spatial conditions/partial inputs。
- Probabilistic Implicit Scene Completion models multimodal large-scene completion。
- [CompleteSplat](https://arxiv.org/abs/2508.21542) produces diverse completed Gaussian splats from one image；GaussFiller, GSCompleter and PanoPlane further crowd recent Gaussian completion。

**Implication**: O/F/U states, arbitrary masks and diversity are individually not new。C02 needs a physically constrained Gaussian posterior with strict observed preservation and proper scoring。

### 5. Decoding and sampling efficiency

- [FlashAR](https://arxiv.org/abs/2605.09430) and [Parallel Jacobi Decoding](https://arxiv.org/abs/2606.05703) occupy post-training and parallel AR acceleration。
- [Entropy-Guided k-Guard Sampling](https://arxiv.org/abs/2601.19488) occupies simple entropy-adaptive candidate budgets。

**Implication**: parallel decoding or entropy-only branching is not a clean GaussianGPT paper thesis。

## Pre-Generation Banlist

| Broad direction | Why it is not a primary contribution |
|---|---|
| random/arbitrary order | RandAR/RAR/PARD |
| masked/random-order 3D | MAR-3D |
| multiscale/coarse-to-fine | G3PT/SAR3D/VAR-3D/WorldGrow |
| adaptive 3D token cells | SuperVoxelGPT |
| generic adaptive visual tokens | DPAR/EVATok/AdapTok |
| entropy-only sampling | ENkG |
| generic parallel decoding | FlashAR/Parallel Jacobi |
| generic long-term memory | LongStream/WorldExplorer/Stream3D/Captain Safari |
| generic rollout correction | BAgger |
| scene-level Gaussian latent alone | Can3Tok |
| compact/native 3D latent alone | Structured/Native Compact Latents |
| adaptive Gaussian allocation alone | F4Splat/SplatWeaver/hierarchies |
| generic partial Gaussian completion | CompleteSplat/GaussFiller/GSCompleter |
| generic uncertainty or compression | uncertainty GS / CodecSplat |

## Fresh-Jury Ranking

Scales are 1–5; reviewer risk 5 is highest. Weighted total is from the fresh jury, not experimental evidence。

| Rank | ID | Idea | Novelty | Problem leverage | Elegance | Falsifiability | Feasibility | Reviewer risk | Total / 100 | Jury verdict |
|---:|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | C01 | Same-Evidence Gauge Consistency | 4 | 5 | 4 | 5 | 4 | 4 | 81 | RECOMMENDED, narrow claim |
| 2 | C02 | Tri-State Probabilistic Completion | 3 | 5 | 4 | 5 | 3 | 4 | 74 | BACKUP |
| 3 | C06 | Render-Attributed Sparse Exceptions | 3 | 4 | 4 | 5 | 3 | 4 | — | BACKUP / oracle first |
| 4 | C03 | Exact Spatial Survival | 2 | 4 | 4 | 5 | 3 | 5 | — | kill standalone; CPU proof only |
| 5 | C08 | Direction-Conditioned Multi-Order | 2 | 4 | 3 | 5 | 4 | 5 | — | merge into C01 ablation |
| 6 | C12 | Metric-Equivariant RoPE | 3 | 3 | 3 | 4 | 3 | 4 | — | merge into C01 scope/ablation |
| 7 | C09 | Geometry–Appearance Codes | 2 | 3 | 4 | 4 | 3 | 4 | — | tokenizer baseline for C06 |
| 8 | C04 | RoPE-Transported KV | 2 | 5 | 2 | 5 | 1 | 5 | — | analytic claim invalid in current architecture |
| 9 | C11 | Set-Aware Voxel Stem | 2 | 3 | 3 | 5 | 4 | 5 | — | early collision kill gate |
| 10 | C05 | Coordinate Sparse KV | 2 | 4 | 3 | 3 | 3 | 5 | — | systems baseline only |
| 11 | C07 | Progressive Residual-LFQ | 1 | 3 | 4 | 5 | 4 | 5 | — | merge into C06 |
| 12 | C10 | LFQ Bit Prediction | 1 | 2 | 4 | 5 | 5 | 5 | — | kill standalone |

Full mechanically deduplicated pool: `.aris/traces/idea-creator/2026-07-16_run01/candidate_pool.md`。

## Recommended Ideas

### Idea 1 — Chart-Consistent Column Events for GaussianGPT — RECOMMENDED

- **Method**:
  1. Extract verbatim production state `(H,T)` with fixed global context rows and target column。
  2. Re-encode the same H/T under two legal local origins without changing evidence or order。
  3. Push all 8000 position outcomes plus EOS into the common parser event space `{z0...z19, EXIT}` with no discarded mass。
  4. Train matched event distributions with selected-slot stop-gradient KL; keep architecture and inference unchanged。
- **Hypothesis**: chart-only event jumps are a causal contributor to origin-switch seams and long-scene drift。
- **Minimum experiment**: R001/R002 CPU gates, then frozen R003; no fine-tune unless real coverage and frozen effect pass。
- **Expected success**: method beats origin augmentation and R-Drop; >=15% seam-excess and >=10% KID-slope reduction with no chunk/diversity regression。
- **Novelty**: approximately 7/10 in Top-3 review; claim-level result `PARTIAL / provisional`。Closest conceptual work includes panorama crop consistency, SyncTweedies, group-equivariant positional work, RandAR/MAR-3D and LongStream, but no exact full tuple was found。
- **Feasibility**: high after G0; zero new parameters, K selected slots, one gradient branch。Real pair coverage remains unknown。
- **Risk**: MEDIUM-HIGH。It can die before training if G1/G2 fails。
- **Contribution type**: method + causal diagnostic。
- **Pilot result**: `SKIPPED — user requested no GPU`。
- **Strongest objection**: a changed origin often changes physical support/evidence; the refined method survives only because it fixes verbatim H/T and uses parser-consumed action semantics, not raw window overlap。
- **Why do it**: among all ideas, this has the cleanest documented failure, smallest intervention and strongest kill logic。

#### Static G0 result

`idea-stage/STATIC_PREMISE_AUDIT.md` verifies the synthetic/default grammar construction only. It does not establish model failure or quality gain。

#### Refined method status

- Research-refine scores: 6.30 → 8.15 → 9.05。
- Final verdict: READY for experiment planning only。
- Clean proposal: `refine-logs/FINAL_PROPOSAL.md`。
- Experiment plan: `refine-logs/EXPERIMENT_PLAN.md`。

### Idea 2 — Tri-State Probabilistic Gaussian Completion — BACKUP

- **Method**:
  1. Compile arbitrary RGB-D/ray observations into observed occupied / observed free / unknown。
  2. Copy-through observed occupied, assign zero posterior support to known-free, and sample only unknown occupancy/features。
  3. Use a permutation-invariant observation compiler and proper-scoring calibration; preserve observations after decode。
  4. Evaluate real multi-view ray masks rather than prefix/box-only masks。
- **Hypothesis**: physical tri-state posterior semantics improve unknown-region calibration/coverage beyond hard masking。
- **Minimum experiment**: first compare partial-view vs full-scene visible-voxel LFQ exact match; if copy-through is not identifiable without GT leakage, kill raw-RGB-D framing。
- **Expected success**: beat AutoSDF-like arbitrary query and hard-mask-only on unknown NLL/Brier/energy score, COV/MMD and diversity—not only free-space violation。
- **Novelty**: `PARTIAL`, roughly 5–6/10。Arbitrary conditioning and O/F/U semantics are not new; strict scene-level Gaussian posterior is the only provisional delta。
- **Feasibility**: medium; no new labels, but partial observation encoding and output-level preservation are nontrivial。
- **Risk**: HIGH。GT latent leakage and observation-code mismatch are fatal。
- **Contribution type**: conditional generative method + calibration protocol。
- **Pilot result**: `SKIPPED — user requested no GPU`。
- **Strongest objection**: AutoSDF + OctoMap semantics + CompleteSplat is an obvious composition unless unknown-region proper scores improve materially。
- **Backup condition**: start only if C01 is killed and the visible-latent identifiability gate passes without GT leakage。

### Idea 3 — Base-Compatible Render-Attributed Sparse Exceptions — BACKUP / ORACLE ONLY

- **Method**:
  1. Freeze the existing 20 cm base lattice, LFQ, decoder and base token stream byte-for-byte。
  2. Use visibility-normalized multi-view marginal render distortion to identify sparse exception support。
  3. Condition on the completed base stream to generate exception coordinates and residual LFQ codes。
  4. Count coordinates/separators/END/entropy cost in a strict <=10% enhancement budget；the layer is discardable。
- **Hypothesis**: tokenizer distortion is concentrated enough that a sparse enhancement recovers most shallow-tokenizer quality。
- **Minimum experiment**: no-GPT oracle at 1/2.5/5/10/20% full cost against random, latent magnitude, SuperVoxel/F4Splat saliency and same-position RVQ。
- **Expected success**: at 10%, recover >=70% of both PSNR and LPIPS gaps on novel views; learned support reaches >=85% oracle gain。
- **Novelty**: `PARTIAL`, about 5.5/10 now。Broad scalable/residual coding is not new；fixed-base generative exception channel is the provisional delta。
- **Feasibility**: medium-low; AE residual path and GPT grammar changes required。
- **Risk**: HIGH。Oracle support may not be predictable from the base stream。
- **Contribution type**: tokenizer/rate-distortion method。
- **Pilot result**: `SKIPPED — user requested no GPU`。
- **Strongest objection**: PRIMU/GaussianPOP attribution + top-k RVQ or SuperVoxelGPT/F4Splat-style allocation may fully explain it。
- **Backup condition**: only after C01/C02 are killed and the strict oracle gate passes。

## Remaining Ranked Ideas

### C03 — Exact Marked Spatial Survival GaussianGPT

- **Method**: exact zero-run/extent survival → column count/subset → Gaussian feature marks；retry-free likelihood。
- **Hypothesis**: temperature-changing retries create density/extent bias and harm geometry coverage。
- **Minimum experiment**: CPU analytic/Monte-Carlo sampler-bias proof before training。
- **Prior work**: ShapeFormer, VoxelDNN/MSVoxelDNN, OctSqueeze/OctAttention, ACNP child-count, occupancy→attribute compression, point processes。
- **Feasibility**: medium；grammar/loss/sampler changes。
- **Static verdict**: standalone KILL unless exact bias proof and scene-scale survival delta both hold。
- **Pilot**: skipped; no GPU。

### C08 — Direction-Conditioned Multi-Order

- **Method**: finite axis traversal family, order instruction, frontier-aligned selection, cross-order distillation。
- **Hypothesis**: fixed xyz causes directional KID gap。
- **Minimum experiment**: xyz vs augmentation vs instruction on six directions。
- **Prior work**: RandAR/RAR/MAR-3D and fixed Z/Hilbert ordering make independent novelty weak。
- **Feasibility**: high。
- **Verdict**: merge as C01 ablation only；not a paper thesis。
- **Pilot**: skipped。

### C12 — Gravity-Aligned Metric RoPE

- **Method**: gravity alignment, metric coordinate phases, yaw consistency, weak Manhattan orientation token。
- **Hypothesis**: fixed dataset axes hurt ScanNet++ and directional robustness。
- **Minimum experiment**: continuous-yaw CE/completion and directional KID。
- **Prior work**: SE(2)/SE(3) equivariant transformers, coordinate RoPE, canonicalization。
- **Feasibility**: medium；categorical position tokens still leak gauge。
- **Verdict**: C01 scope/ablation, not standalone。
- **Pilot**: skipped。

### C09 — Geometry–Appearance Successive Codes

- **Method**: shared stem, geometry LFQ then optional appearance LFQ, matched token budget。
- **Hypothesis**: single codebook causes geometry/perceptual competition。
- **Minimum experiment**: equal-token COV/MMD, FID/KID and leakage audit。
- **Prior work**: disentangled/factorized codes, Can3Tok and structured latents。
- **Feasibility**: medium; full AE+GPT retraining。
- **Verdict**: baseline for C06, not independent claim。
- **Pilot**: skipped。

### C04 — RoPE-Transported Persistent KV

- **Method**: phase-rotate cached keys under origin shift, persistent voxel-indexed cache, refresh/distill。
- **Hypothesis**: avoid repeated prefill and 6000 s large-scene runtime。
- **Minimum experiment**: logit equivalence and cache reuse audit。
- **Fatal flaw**: local position token embeddings change content hidden states and values；RoPE phase transport cannot repair them。
- **Feasibility**: low in current architecture。
- **Verdict**: kill analytic equivalence；learned approximate cache belongs to C05 baseline。
- **Pilot**: skipped。

### C11 — Set-Aware Voxel Stem + Mixture Decode

- **Method**: opacity-aware set pooling instead of RANDOM_SUBSAMPLE；1–3 components for collision voxels。
- **Hypothesis**: real-scan detail loss comes from within-voxel collisions。
- **Minimum experiment**: collision histogram；kill if >95% occupied voxels are singleton。
- **Prior work**: DeepSets/PointNet/mixture decoder are standard。
- **Feasibility**: medium-high if collisions exist。
- **Verdict**: early kill gate；possible C06 auxiliary only。
- **Pilot**: skipped。

### C05 — Frontier-Landmark Coordinate KV

- **Method**: local 3D KV plus compressed remote landmarks, selected by voxel coordinates。
- **Hypothesis**: larger physical context at lower memory improves distant quality。
- **Minimum experiment**: matched cost/memory with larger chunk, not FLOPs alone。
- **Prior work**: sparse/local attention, octree transformers, LongStream, streaming memory。
- **Feasibility**: medium with high kernel risk。
- **Verdict**: systems baseline, not independent paper。
- **Pilot**: skipped。

### C07 — Progressive Residual-LFQ Stop

- **Method**: variable 1–3 residual LFQ codes per voxel with learned stop。
- **Hypothesis**: average <=1.5 codes approaches 3-code quality。
- **Minimum experiment**: fixed 1/2/3 vs learned stop, full control-symbol cost。
- **Prior work**: residual VQ/LFQ and learned depth are mature; repository already implements ResidualLFQ。
- **Feasibility**: high。
- **Verdict**: merge into C06; no standalone novelty。
- **Pilot**: skipped。

### C10 — LFQ Bit-Structured Prediction

- **Method**: predict 12 LFQ sign bits/nibbles instead of 4096-way class。
- **Hypothesis**: structured errors improve long-tail sample efficiency。
- **Minimum experiment**: exact code, decoded MSE, calibration and FID/KID at matched FLOPs。
- **Prior work**: binary latents, bitwise AR, product codes。
- **Feasibility**: high, possibly <=2 GPUh head-only pilot。
- **Verdict**: kill standalone；head-size reduction is not a paper contribution。
- **Pilot**: skipped。

## Eliminated / Withheld Directions

| Direction | Decision | Reason |
|---|---|---|
| self-rollout corrective training / repair | KILL | BAgger directly occupies the mechanism; spatial corruption alone is insufficient delta |
| generic persistent global memory | KILL | LongStream/Stream3D/WorldExplorer/Captain Safari crowded |
| plan-then-splat coarse-to-fine | KILL | WorldGrow and multiscale 3D AR are direct |
| entropy branching | KILL | ENkG direct mechanism overlap |
| topology verifier/reranking | BASELINE ONLY | decoding engineering unless tied to a distributional training claim |
| adaptive Gaussian allocation/refiner | KILL | F4Splat/SplatWeaver/hierarchies/post-refiners crowded |

## Deep Novelty Verification

### C01 claim-level result

| Claim | Verdict | Boundary |
|---|---|---|
| broad gauge/equivariant principle | PARTIAL | group/SE(3) equivariance already known |
| same evidence, different local origin, global-remapped position + same-target feature predictive consistency | NOVEL — provisional | no exact scene-level sparse Gaussian AR tuple found |
| arbitrary order/serialization invariance | NOT NOVEL | RandAR/RAR/MAR-3D/PARD |
| broad patch/window consistency | PARTIAL | panorama/crop/synchronized diffusion precedents |
| seam/drift improvement | PARTIAL | problem known; causal chart attribution must be proven |

Fatal condition: concurrent work with the full tuple—scene-level sparse Gaussian AR, same H/T, different legal origins, complete global action remap, position/feature conditional alignment, no different-evidence matching, long-scene validation—would kill the core novelty。

### C02 claim-level result

- O/F/U semantics: partial, not new。
- Arbitrary set conditioning: not new。
- Multimodal calibrated completion: partial。
- Strict arbitrary-ray, observation-preserving Gaussian scene posterior: provisional surviving claim。

### C06 claim-level result

- render attribution: partial；PRIMU/GaussianPOP/F4Splat neighbors。
- base/enhancement coding: broadly not new。
- fixed unchanged base plus sparse generative exception stream: partial provisional。
- 10%/70% result: only a potential empirical finding, not evidence yet。

Trace: `.aris/traces/novelty-check/2026-07-16_run01/`。

## External Critical Review and Refinement

### Top-3 brutal review

| Candidate | Significance | Novelty | Soundness | Feasibility | Submission-state overall |
|---|---:|---:|---:|---:|---:|
| C01 | 8 | 7 | 6 | 8 | 4/10 Weak Reject before premise audit |
| C02 | 8 | 5 | 5 | 6 | 3/10 Reject |
| C06 | 7 | 5 | 5 | 5 | 3/10 Reject |

The review selected exactly one mainline: C01。C02 requires a no-leakage visible-code identifiability gate；C06 requires the strict oracle gate。

### Research-refine evolution

| Round | Score | Verdict | Main resolution |
|---:|---:|---|---|
| 1 | 6.30 | REVISE | active-domain mask invalid；must use production parser semantics |
| 2 | 8.15 | REVISE | full token mass pushforward to z/EXIT；method and causal interface closed |
| 3 | 9.05 | READY for planning only | CPU G0, exact scope, preregistered G1–G3, no empirical overclaim |

`CALIBRATION: none`。No curated taste anchors were available。

## Refined C01 Snapshot

### Exact contribution

> Fix physical evidence and parser-consumed action semantics, change only the local coordinate chart, push the complete sparse-token distribution into a common physical column-event space, and train away the isolated window-origin dependence.

### Production event map

```text
8000 position tokens + EOS
        |
        | target local xy and z=0..19
        +--------------------------> 20 z events
        |
        | all other valid positions or EOS
        +--------------------------> EXIT
```

### Gates

- G0 parser equivalence：synthetic/static partial pass；exact production property test pending。
- G1 real pair coverage：pending；kill if inadequate。
- G2 frozen chart effect/localization：pending；kill before fine-tune if noise-level。
- G3 feature materiality：pending；delete feature loss if weak。

### Experiment blocks

1. Grammar and real-pair premise gates。
2. Frozen causal audit。
3. Matched-compute method isolation。
4. 4/8/12 m long-scene anchor result。
5. Minimality/robustness/failure envelope。

### Refined artifacts

- Full proposal: `refine-logs/FINAL_PROPOSAL.md`。
- Full plan: `refine-logs/EXPERIMENT_PLAN.md`。
- Tracker: `refine-logs/EXPERIMENT_TRACKER.md`。

## Compute and Execution

- R001/R002: CPU only。
- R003 frozen audit: 2–6 GPUh after checkpoint/data acquisition。
- Minimum go/no-go pilot through single-seed comparison: 45–105 GPUh。
- Full paper program: 300–550 GPUh；optional appendix/ScanNet++ +20–100 GPUh。
- Dominant cost: 12 m scene generation；stage 4 m→8 m→12 m with hard stops。

## Research Contract

Active idea contract: `idea-stage/docs/research_contract.md`。It contains only the selected idea, claims, gates, decisions and next-step pointer for session recovery。

## Retrieval and Assurance Notes

- Search covered arXiv, CVF/CVPR 2026 pages, OpenAlex, DOI/Crossref and local paper/code through 2026-07-16。
- Semantic Scholar returned 429; Exa lacked an API key; arXiv/OpenAlex also rate-limited some later requests; DBLP had an SSL EOF on one route。
- These failures were mitigated with direct arXiv/CVF/DOI/local evidence, but they prevent any claim of exhaustive novelty proof。
- Every reviewer route used an OpenAI same-family Codex agent. `acceptance_status` is therefore provisional, never accepted。

## Final Recommendation

Proceed with **C01 only**, in gate order。Do not parallelize C02/C06 and do not add modules to rescue C01 if G1/G2 fails。The most valuable immediate result may be negative: if real pair coverage or frozen chart effect is negligible, stop early and switch to the backup whose own gate passes。

## Next Steps

- ☐ R001 exact parser property test (CPU)
- ☐ R002 verbatim rollout pair coverage (CPU)
- ☐ Acquire/checksum official checkpoint and tokenized rollout data
- ☐ R003 frozen counterfactual audit (first GPU run)
- ☐ Only after G1/G2: matched-compute pilot
- ☐ After positive evidence: full multi-seed and long-scene program

No GPU experiment was run in this report generation task。
