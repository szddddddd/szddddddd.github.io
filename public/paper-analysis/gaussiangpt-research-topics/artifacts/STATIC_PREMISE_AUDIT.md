# C01 Static Premise Audit

- **Date**: 2026-07-16
- **Scope**: deterministic CPU/code audit only
- **GPU**: not used
- **Checkpoint/data**: unavailable locally; no empirical gauge-effect or real pair-coverage claim is made

## What was verified

1. GaussianGPT's scene position vocabulary is 8000 = 20³ and the default large-scene configuration has `no_empty_columns: false`, `resample_empty_columns: true`.
2. The single-column parser accepts rows only while decoded `(x,y)` equals the target local column and stops on the first different `(x,y)`; grouped parsing uses the same boundary semantics.
3. A deterministic pushforward from the complete position-token/EOS action space to `{z=0,...,19, EXIT}` is lossless at the event level:
   - exactly 20 tokens map one-to-one to target-column z events;
   - the other 7980 position tokens plus EOS map to EXIT;
   - all 8001 outcomes are counted, with no support intersection or renormalization.
4. For synthetic contexts with margin, constant integer xy translations preserve xyz lexicographic order because row-major token rank changes by a constant.
5. Exhaustive enumeration of a synthetic context/target checked 48 nonzero legal xy chart translations. In every pair:
   - context order was preserved;
   - target z-event labels were bijective;
   - the 21-event partition was complete;
   - after the model's strict monotonic position rule, the remaining physical target-z event support matched across charts.

## Deterministic output

```text
side=20
position_vocab=8000
nonzero_translation_pairs_checked=48
event_partition_size=21
target_token_mass=20
exit_token_mass_including_eos=7981
order_preserved=True
monotonic_target_event_support_preserved=True
default_no_empty_columns=False
```

## What remains unverified

- The fraction of verbatim real rollout prompts that admit any nonzero alternative origin.
- Parser equivalence under every optional `no_empty_columns` / grouped-column configuration; the primary proposal is scoped first to the default `no_empty_columns=false` setting.
- Frozen-checkpoint event/feature disagreement and whether it exceeds replay/dropout noise.
- Localization of disagreement at real origin-change steps.
- Any quality, diversity, seam, KID, COV/MMD, speed or memory effect.

## Gate decision

The event-space construction is not ruled out by grammar: a nontrivial, complete and non-renormalized chart mapping exists in the default single-column semantics. C01 therefore remains eligible for a real pair-coverage audit. It is **not empirically validated** and must be killed if real rollout coverage or frozen effect size is negligible.
