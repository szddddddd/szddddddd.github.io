# Pipeline Summary

- **Problem**: GaussianGPT may change its production target-column distribution solely because the same physical prompt is re-encoded under a different local window origin.
- **Final method thesis**: Push the complete token/EOS distribution through the default production parser into a shared physical `{z0...z19, EXIT}` event space, and distill same-state chart counterfactuals to remove origin-induced event jumps with unchanged inference.
- **Final verdict**: READY for experiment planning only; empirical acceptance unvalidated
- **Date**: 2026-07-16
- **Review**: same-family provisional; no GPU experiments

## Planning Gate

- **Dominant contribution**: production-grammar-aligned counterfactual chart pairing.
- **Optional supporting contribution**: frozen origin-change diagnostic; not a second method.
- **Rejected complexity**: different-window consistency, arbitrary order, equivariant architecture, memory/cache, consensus, seam refiner, new tokenizer/head.
- **Central frontier primitive**: absent by design; parameter-free distribution distillation is sufficient.
- **Remaining reviewer concerns**: G1 real pair coverage, G2 frozen effect/localization, G3 feature materiality, all explicitly delegated to experiment gates.

## Final Deliverables

- Proposal: `refine-logs/FINAL_PROPOSAL.md`
- Review summary: `refine-logs/REVIEW_SUMMARY.md`
- Refinement report: `refine-logs/REFINEMENT_REPORT.md`
- Experiment plan: `refine-logs/EXPERIMENT_PLAN.md`
- Experiment tracker: `refine-logs/EXPERIMENT_TRACKER.md`
- Research contract: `idea-stage/docs/research_contract.md`
- Static audit: `idea-stage/STATIC_PREMISE_AUDIT.md`

## Contribution Snapshot

- Zero new trainable parameters.
- Complete 8001-outcome probability mass is preserved in a 21-event production action space.
- Same physical evidence and target are fixed; only legal chart origin changes.
- Inference remains the original single-chart GaussianGPT sampler.

## Must-Prove Claims

1. Real origin changes create material, localized chart-only event jumps.
2. Semantic chart consistency beats origin augmentation and same-chart R-Drop.
3. Removing the jump improves 4/8/12 m generation without chunk/diversity regression or inference tricks.

## First Runs to Launch

1. R001 exact default-parser property test — CPU.
2. R002 verbatim rollout pair-coverage scan — CPU.
3. R003 frozen counterfactual chart audit — 2–6 GPUh, only if R001/R002 pass.

## Main Risks

- **Real pair coverage too low**: kill; never truncate prompts.
- **Frozen chart effect near noise**: kill before fine-tuning.
- **R-Drop matches gains**: reject method novelty as generic smoothing.
- **No origin-localized long-scene effect**: reject causal story.

## Next Action

Acquire/checksum official checkpoint and tokenized rollout data, then execute R001–R003. No training should begin before G1/G2 pass.
