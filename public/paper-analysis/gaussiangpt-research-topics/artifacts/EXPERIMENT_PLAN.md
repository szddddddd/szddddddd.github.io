# Experiment Plan

- **Problem**: GaussianGPT 的 production sliding-window outpainting 可能仅因 local window origin 改变而产生不同的 target-column conditional，进而积累为 seam、远距离退化和方向偏置。
- **Method thesis**: 对固定物理 prompt/target 的合法 chart counterfactuals，将完整 token 概率无损推送到共同 `{z0...z19, EXIT}` 事件空间，并训练 away origin-induced event jumps；架构和推理不变。
- **Date**: 2026-07-16
- **Current evidence**: only deterministic static G0 evidence; no GPU/model result
- **Review status**: same-family provisional; proposal READY for experiment planning, empirical acceptance unvalidated

## Claim Map

| Claim | Why it matters | Minimum convincing evidence | Linked blocks |
|---|---|---|---|
| C1 — Production origin changes create a material chart-only failure, and chart-event consistency removes it | This is the anchored mechanism claim; without it the method is just generic regularization | Adequate verbatim-prompt pair coverage; frozen chart intervention above replay/dropout noise and localized to origin changes; trained method beats origin augmentation and R-Drop on held-out event jump | B0, B1, B2 |
| C2 — Removing chart-only event jumps improves long-scene quality without inference changes or chunk/diversity regression | Converts the diagnostic into a top-venue scene-generation contribution | At >=3 seeds, significant reductions in origin-switch seam excess and distance-KID slope, mandatory x/y analysis, unchanged sampler and predeclared chunk-quality margins | B3, B4 |

### Anti-claims to rule out

- Gains come only from two forward passes, paired CE, dropout smoothing, or ordinary origin augmentation.
- The method improves synthetic chart metrics but not real origin-change states.
- `EXIT` aggregation hides probability differences that matter to the parser.
- Feature KL or a larger stack is necessary; the minimal event-only route should be preferred if it suffices.
- Improvements require consensus/reranking or change the inference budget.

## Paper Storyline

- **Main paper must prove**:
  1. the exact production grammar admits enough real same-state chart counterfactuals;
  2. frozen GaussianGPT exhibits origin-localized event/sample jumps;
  3. the zero-parameter training signal beats matched-compute augmentation and R-Drop;
  4. unchanged inference improves 4/8/12 m generation with no chunk/diversity regression.
- **Appendix can support**: pair coverage stratification, K/lambda sweeps, feature gate, shift direction/magnitude, optional ScanNet++ transfer, grouped/no-empty exploratory audit.
- **Experiments intentionally cut**: multi-order training, new RoPE/equivariant architecture, KV/cache/memory, consensus decoding, new tokenizer, coarse-to-fine planner, generic seam refiner.
- **Frontier necessity block**: cut. No LLM/VLM/diffusion/RL component is central; forcing one would weaken the method.

## Experimental Protocol Shared Across Blocks

### Code and model provenance

- GaussianGPT repository commit: `e3be826` on clean `main` at audit time.
- Acquire the official scene checkpoint and record checksum/config; no checkpoint is currently local.
- Freeze VQ-VAE/decoder for every arm.
- Use the default single-column large-scene semantics first: `no_empty_columns=false`, `resample_empty_columns=true`, `chunk_order=xyz`.
- Do not silently include grouped/no-empty variants in the main claim.

### Data

- Primary: 3D-FRONT train/validation split used by GaussianGPT, with cached `{global coords, feature_ids}` and reproducible production/GT-simulated rollout states.
- Long-scene: use the paper's large-scene generation protocol and fixed scene seeds, with 4 m, 8 m and 12 m extents.
- Secondary/optional: ScanNet++ only after C1/C2 pass; no result there can rescue a failed primary premise.

### Statistics

- Use common random numbers for chart counterfactual samples and matched generation seeds across systems.
- Report median, mean, bootstrap 95% CI and per-scene distributions for primary metrics.
- For origin localization, fit a mixed-effects or paired regression with `method`, `origin_change`, and their interaction; scene is a random intercept, with matching/controls for context length, occupancy and target distance.
- Pre-register two primary long-scene endpoints: origin-switch seam excess and distance-KID slope. Correct their p-values with Holm; other metrics are secondary.
- Three independent fine-tuning seeds for any result entering the main paper.

## Experiment Blocks

### B0 — Grammar and Real-Pair Premise Gates

- **Claim tested**: C1 prerequisite — the method's counterfactual state/action interface exists in production data.
- **Why this block exists**: prevents spending GPU budget on a mathematically correct but irrelevant pairing task.
- **Dataset / task**: exact default parser property tests; then verbatim 3D-FRONT validation rollout prompts `(H,T)`.
- **Compared systems**: no learned systems; zero shift, legal nonzero shifts, deliberately invalid shifts, optional truncated-prompt diagnostic only as a negative control.
- **Metrics**:
  - parser property-test pass count and probability-mass conservation;
  - fraction of non-bootstrap origin-change states with >=1 nonzero legal pair;
  - legal-origin count/state, shift direction/magnitude;
  - pair coverage by context length, occupied rows, target distance and scene type;
  - standardized differences between covered and uncovered states.
- **Setup**: no prompt row may be removed for the main coverage number; exact token/config checksums recorded.
- **Success criterion**:
  - G0 exhaustive property tests pass;
  - ≥20% eligible origin-change states have a nonzero pair;
  - ≥10k paired states in validation;
  - covered/uncovered context-length and occupancy standardized differences <=0.25 after a predeclared reweighting analysis.
- **Failure interpretation**: kill C01; do not relax to support intersection or prompt truncation.
- **Table / figure target**: Main paper Table 1 (premise/coverage); pair diagram in Method Figure 2; detailed strata in appendix.
- **Priority**: MUST-RUN.

### B1 — Frozen Counterfactual Causal Audit

- **Claim tested**: C1 — a chart-only intervention causes a material production event/sample jump localized at real origin changes.
- **Why this block exists**: establishes the failure before any training and separates it from generic exposure bias.
- **Dataset / task**: B0-passing validation states; exact replay, same-chart dropout, legal alternate origin, evidence-changed negative pairs.
- **Compared systems**: one frozen official GaussianGPT checkpoint only.
- **Metrics**:
  - 21-way event JS/KL and target event NLL variance;
  - coupled-sampling divergence under identical uniform random variates;
  - optional feature JS and exact top-1 disagreement;
  - origin-switch-localized latent seam score;
  - excess event/seam jump at origin-change vs matched stable steps.
- **Setup**: temperature/top-p identical; no retry temperature change inside the one-step intervention; 10k+ paired states if available.
- **Success criterion**:
  - median chart event JS >=5× exact replay noise;
  - origin-change states show >=25% excess matched JS over stable states with CI excluding zero;
  - coupled-sample divergence is nontrivial and correlates with next-column seam anomaly;
  - feature loss is enabled only if feature JS >=2× replay noise and contributes materially.
- **Failure interpretation**: kill before training; a null result is valuable and rules out C01.
- **Table / figure target**: Main paper Figure 3 (counterfactual distributions and origin-change localization); Table 1 gate status.
- **Priority**: MUST-RUN.

### B2 — Matched-Compute Method Isolation

- **Claim tested**: C1 and anti-claims — semantic chart pairing, not generic smoothing or extra compute, removes the failure.
- **Why this block exists**: isolates the exact contribution.
- **Dataset / split / task**: 3D-FRONT training; held-out validation chart pairs and standard chunk generation.
- **Compared systems**:
  1. official checkpoint / standard matched-duration fine-tune;
  2. paired column CE + origin augmentation;
  3. same-chart R-Drop with matched forward count;
  4. chart-event consistency;
  5. event+feature only if G3 passes.
- **Metrics**:
  - primary: held-out event JS, target event NLL, origin-change coupled-sample divergence;
  - secondary: chunk FID/KID, geometry COV/MMD, entropy, pairwise diversity, training throughput and peak memory.
- **Setup**:
  - pilot one seed on a fixed subset, then 3 seeds full data;
  - VQ-VAE frozen; same optimizer, update count, paired batch count and lm-head evaluations;
  - default K=32, single-gradient alternating direction; lambda/beta selected on validation event JS subject to no-degradation constraints.
- **Success criterion**:
  - chart method materially beats both augmentation and R-Drop on event JS/NLL with CIs excluding zero;
  - relative FID/KID degradation <=3%, COV decrease <=2 points, diversity decrease <=5%;
  - feature variant is retained only if it adds significant gain over event-only.
- **Failure interpretation**:
  - R-Drop tie => generic regularization, novelty rejected;
  - augmentation tie => paired semantics unnecessary;
  - quality/diversity loss => method fails even if chart JS improves.
- **Table / figure target**: Main paper Table 2 (method isolation), small training-cost column; appendix hyperparameters.
- **Priority**: MUST-RUN.

### B3 — Main Long-Scene Anchor Result

- **Claim tested**: C2 — eliminating chart-event jumps improves scene growth with unchanged inference.
- **Why this block exists**: this is the paper's actual application payoff.
- **Dataset / task**: 3D-FRONT large-scene generation at 4 m, 8 m, 12 m; x- and y-oriented growth; common scene seeds.
- **Compared systems**: official GaussianGPT, origin augmentation, R-Drop, chart-event consistency; feature variant only if B2 retains it.
- **Metrics**:
  - primary 1: origin-switch seam excess, defined from standardized occupancy-connectivity deficit plus adjacent LFQ/decoded-feature jump relative to matched stable boundaries;
  - primary 2: distance-binned normalized KID slope from seed;
  - mandatory secondary: `|KID_x-KID_y|`, empty-column/retry rate, geometry COV/MMD where applicable, total wall-clock and peak memory;
  - chunk FID/KID/diversity repeated as safety metrics.
- **Setup**: >=3 model seeds; same sampling temperature/top-p and common generation seeds; no consensus/reranking; stage extents to stop early on failure.
- **Success criterion**:
  - ≥15% reduction in origin-switch seam excess vs both augmentation and R-Drop;
  - ≥10% reduction in distance-KID slope, CI excluding zero;
  - if baseline x/y gap is significant, >=20% relative reduction;
  - no predeclared chunk/diversity regression and negligible inference overhead.
- **Failure interpretation**:
  - improvement not localized to origin switches => causal story fails;
  - only 4 m gain => insufficient long-horizon evidence;
  - x/y gap persists => report incomplete success; fixed xyz factorization remains a separate limitation.
- **Table / figure target**: Main paper Table 3; distance curves and spatial heatmaps in Figure 4; qualitative boundary crops in Figure 5.
- **Priority**: MUST-RUN.

### B4 — Simplicity, Robustness and Failure Envelope

- **Claim tested**: C2 supporting claim — the minimal event-only method is sufficient and its limits are understood.
- **Why this block exists**: defends elegance without adding a second contribution.
- **Dataset / task**: validation pairs, chunk generation, selected 8/12 m scenes; optional ScanNet++ after primary success.
- **Compared variants**:
  - event-only vs event+feature if G3 passes;
  - K in {16,32,64}; lambda/beta low/medium/high;
  - small vs larger legal shifts; x vs y directions;
  - default single-column vs optional configs only as an appendix scope audit.
- **Metrics**: event JS, long-scene primary endpoints, compute, entropy/diversity, pair coverage.
- **Success criterion**: K=32 event-only should lie on or near the Pareto frontier; extra components should not be required for the main result.
- **Failure interpretation**: if only a complex variant works, revise the simplicity claim before paper writing.
- **Table / figure target**: compact main ablation row; full sweeps and failures in appendix.
- **Priority**: MUST-RUN for event-only/feature decision; NICE-TO-HAVE for ScanNet++ and optional parser variants.

## Run Order and Milestones

| Milestone | Goal | Runs | Decision gate | Estimated cost | Main risk |
|---|---|---|---|---|---|
| M0 — deterministic sanity | exact parser semantics and tooling | R000–R002 | G0/G1 pass; otherwise stop project | 2–4 CPU days, 0 GPUh | real prompts admit too few shifts |
| M1 — frozen premise | prove chart-only failure exists and localizes | R003 | G2 pass; feature G3 decision | 2–6 GPUh | signal near replay noise |
| M2 — implementation sanity | memory, gradients, overfit and metric correctness | R004–R006 | selected-slot path fits budget; one-batch losses behave | 2–8 GPUh | logsumexp/mask bug or memory overhead |
| M3 — single-seed decision | compare four core arms cheaply | R010–R014 | chart method beats augmentation/R-Drop without chunk regression | 40–90 GPUh | generic regularization explains gains |
| M4 — full method evidence | 3-seed full-data isolation | R020–R024 | C1 confirmed with statistics | 160–280 GPUh | variance or training instability |
| M5 — long-scene anchor | 4/8/12 m unchanged-inference evaluation | R030–R032 | C2 thresholds pass | 100–220 GPUh | evaluation wall-clock dominates |
| M6 — polish | ablations, failure cases, optional transfer | R040–R050 | paper completeness only; cannot rescue failed C1/C2 | 20–80 GPUh | scope creep |

## First Three Runs to Launch

1. **R001 — Exact production parser property test**: compare `A_o` with every actual token/EOS transition in the default single-column path; CPU only.
2. **R002 — Verbatim rollout pair coverage scan**: no prompt truncation; produce coverage/bias table and G1 decision; CPU only.
3. **R003 — Frozen counterfactual audit**: chart-only intervention with common random numbers, G2/G3 decision; first GPU run, only after R001/R002 pass.

## Compute and Data Budget

- **Gate-only budget**: 0 GPUh for R001/R002; 2–6 GPUh for R003.
- **Minimum go/no-go pilot through M3**: approximately 45–105 GPUh.
- **Full must-run paper program**: approximately 300–550 GPUh, dominated by 3-seed fine-tuning and 12 m sampling.
- **Nice-to-have appendix/ScanNet++**: additional 20–100 GPUh.
- **Data preparation**: official checkpoint, tokenized full-scene payloads, production rollout-state exporter, stable large-scene evaluator.
- **Human evaluation**: none required.
- **Biggest bottleneck**: large-scene generation wall-clock; use staged extents and kill gates before 12 m.

## Risks and Mitigations

- **Low real pair coverage**: stop; do not truncate prompts or expand to different evidence.
- **Parser mapping bug**: exhaustive property tests against real state transitions before any forward pass.
- **No frozen effect**: stop before fine-tuning.
- **R-Drop/augmentation tie**: reject novelty and document negative result.
- **Feature signal absent**: event-only final method.
- **Expensive long-scene evaluation**: 4 m pilot → 8 m → 12 m only after thresholds; common seeds and paired statistics reduce required sample count.
- **Metric confounding**: primary causal metric localized at origin switches; x/y gap and global KID remain required but secondary to the mechanism test.
- **Optional config mismatch**: scope paper to default parser; optional variants are appendix audits, not hidden assumptions.

## Final Checklist

- ☑ Problem Anchor and claims are frozen.
- ☑ Main paper blocks are compact and claim-driven.
- ☑ Novelty is isolated against augmentation and R-Drop.
- ☑ Simplicity is defended with event-only gating and no extra modules.
- ☑ Frontier-model component is explicitly absent and not forced.
- ☑ Nice-to-have runs are separated from must-run runs.
- ☑ Kill gates precede expensive training and 12 m generation.
- ☐ Official checkpoint/data acquired and checksummed.
- ☐ G1/G2/G3 empirical gates executed.
- ☐ No GPU work has been run in the current discovery task.
