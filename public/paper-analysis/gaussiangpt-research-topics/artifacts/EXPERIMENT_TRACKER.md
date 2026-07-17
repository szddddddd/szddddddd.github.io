# Experiment Tracker

**Current policy**: no GPU experiments were launched in this idea-discovery run. `DONE` is used only for the completed deterministic static audit.

| Run ID | Milestone | Purpose | System / variant | Split / task | Key metrics | Priority | Status | Notes |
|---|---|---|---|---|---|---|---|---|
| R000 | M0 | synthetic static audit | deterministic mirror | synthetic 20³ grammar | event partition, order/support | MUST | DONE | `idea-stage/STATIC_PREMISE_AUDIT.md`; partial G0 only |
| R001 | M0 | exact parser property test | real default parser + `A_o` | exhaustive token/EOS transitions | transition equality, mass=1 | MUST | TODO | CPU; first future run |
| R002 | M0 | real pair coverage | verbatim production prompts | 3D-FRONT val rollouts | coverage, origins/state, bias strata | MUST | TODO | CPU; no truncation; G1 |
| R003 | M1 | frozen chart effect | official GaussianGPT checkpoint | paired val states | event JS, NLL, coupled divergence, localization | MUST | TODO | first GPU run; only after R001/R002; G2/G3 |
| R004 | M2 | selected-slot microbenchmark | proposed interface | one production batch | peak memory, tokens/s, numerical equality | MUST | TODO | compare full-logit reference on tiny batch |
| R005 | M2 | loss correctness / tiny overfit | event-only | tiny train subset | CE/KL convergence, no NaN | MUST | TODO | no quality claim |
| R006 | M2 | metric reproducibility | baseline replay | fixed seeds | event JS noise, seam metric variance | MUST | TODO | freezes thresholds/tooling |
| R010 | M3 | single-seed control | standard matched-duration fine-tune | train subset / val | event JS, chunk metrics | MUST | TODO | baseline family 1 |
| R011 | M3 | single-seed control | origin augmentation | same | event JS, chunk metrics | MUST | TODO | matched paired CE |
| R012 | M3 | single-seed control | same-chart R-Drop | same | event JS, chunk metrics | MUST | TODO | matched forward count |
| R013 | M3 | single-seed main | chart-event consistency | same | event JS/NLL, chunk metrics | MUST | TODO | core decision |
| R014 | M3 | feature gate variant | event+feature consistency | same | delta over R013 | CONDITIONAL | TODO | run only if G3 passes |
| R020 | M4 | 3-seed baseline | standard fine-tune | full 3D-FRONT | all B2 metrics | MUST | TODO | seed 1–3 |
| R021 | M4 | 3-seed baseline | origin augmentation | full 3D-FRONT | all B2 metrics | MUST | TODO | seed 1–3 |
| R022 | M4 | 3-seed baseline | R-Drop | full 3D-FRONT | all B2 metrics | MUST | TODO | seed 1–3 |
| R023 | M4 | 3-seed main | chart-event consistency | full 3D-FRONT | all B2 metrics | MUST | TODO | seed 1–3 |
| R024 | M4 | retained feature variant | event+feature | full 3D-FRONT | all B2 metrics | CONDITIONAL | TODO | only if R014 wins |
| R030 | M5 | short scene growth | retained systems | 4 m x/y | seam excess, KID slope, x/y gap | MUST | TODO | gate before longer scenes |
| R031 | M5 | medium scene growth | retained systems | 8 m x/y | same | MUST | TODO | run only if R030 passes |
| R032 | M5 | long scene growth | retained systems | 12 m x/y | same, wall-clock | MUST | TODO | run only if R031 passes |
| R040 | M6 | simplicity sweep | K=16/32/64, lambda/beta | val + selected scenes | Pareto, stability | MUST | TODO | compact ablation |
| R041 | M6 | chart coverage analysis | shift magnitude/direction | val pairs | effect heterogeneity | MUST | TODO | appendix/detail |
| R042 | M6 | optional parser audit | grouped/no-empty configs | property test only | semantic equivalence | NICE | TODO | outside main scope |
| R050 | M6 | real-scan transfer | retained model | ScanNet++ | completion/quality diagnostics | NICE | TODO | cannot rescue primary failure |
