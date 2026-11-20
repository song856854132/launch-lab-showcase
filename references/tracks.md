# Deck spines by track

Both spines fit a ~10-minute slot with a live demo (10–12 slides). Slide types in brackets map to `build_deck.js` types. Times are speaking-time targets.

## Track One: Innovation Teams (idea → demo)

Startup-style projects. Judges ask: does it work, is it built well, does anyone want it?

| # | Slide | Type | Time | What it must answer |
|---|---|---|---|---|
| 1 | Cover: name + one-liner | `cover` | 0:20 | What is it, in one literal sentence? Eyebrow: "Track One · Innovation Team" |
| 2 | Problem and who has it | `statement` | 0:45 | Who exactly hurts, how do they cope today, how do we know (interviews, survey n)? |
| 3 | What we built | `architecture` | 1:15 | Components and data flow; which parts are working, partial, stubbed |
| 4 | Key technical decision | `compare` | 0:45 | The hardest choice, the alternative rejected, and the evidence for the choice |
| 5 | Live demo | `demo` | 2:30 | A 3–5 step scenario a user would really do; fallback named on the slide |
| 6 | Evidence | `metrics` or `chart` | 1:00 | Performance and usage numbers with method and baseline |
| 7 | Milestones vs. intake | `milestones` | 0:45 | Each intake milestone: criterion, outcome, pass/stop/partial |
| 8 | What broke / limits | `cards` | 0:45 | Failures, known limits, what users told us that changed the plan |
| 9 | Team and contributions | `team` | 0:45 | Who built what, skills shown, open roles, asks |
| 10 | Next | `closing` | 0:30 | Continue / pivot / stop, a concrete next semester or IDEA application, CTA |

Optional, if earned: a "why now" or "who else is trying" `cards` slide after #2 (competitors or existing tools, and why they fall short), and a second evidence slide. Keep market sizing to one line in the notes unless sponsors specifically care. This is a final review, not a fundraise.

## Track Two: Research Teams (question → findings)

Research-based projects. Judges ask: is the question sharp, is the method sound, do the results support the claim?

| # | Slide | Type | Time | What it must answer |
|---|---|---|---|---|
| 1 | Cover: title + question in plain words | `cover` | 0:20 | Eyebrow: "Track Two · Research Team" |
| 2 | Research question and why it matters | `statement` | 0:45 | One falsifiable question; who benefits if answered |
| 3 | Prior work and the gap | `cards` | 0:45 | 2–3 closest works, what each leaves open |
| 4 | Hypotheses / approach | `bullets` (with `aside`) | 0:45 | H1–H3 stated so they can fail |
| 5 | Method and setup | `architecture` | 1:00 | Pipeline: data → processing → model/analysis → evaluation; built vs. stubbed |
| 6 | Data and testbed | `cards` or `bullets` | 0:30 | Sources, size, licensing, splits, leakage controls |
| 7 | Live demo / walkthrough | `demo` | 2:00 | Run the artifact on one real example end-to-end; fallback named |
| 8 | Results | `chart` / `metrics` | 1:15 | Results per hypothesis vs. baseline, with n and variance |
| 9 | Threats to validity / negative results | `cards` | 0:45 | What could make this wrong; what didn't work |
| 10 | Milestones vs. intake | `milestones` | 0:30 | Gates passed or stopped |
| 11 | Team and contributions | `team` | 0:30 | Who ran which experiments, open roles, asks (mentor, data, compute) |
| 12 | Contribution and next | `closing` | 0:30 | Paper / dataset / tool release, next semester, CTA |

## Adapting

- **Early or stopped projects:** say so on slide 2 or 3, lead with what was learned, and make the stopped milestone a finding ("H2 rejected: …"). The milestones slide carries it.
- **No live demo possible** (long training run, restricted data): keep the `demo` slide as a recorded walkthrough and say why it's recorded.
- **Slot changes:** at 5 minutes, drop #4 and #8 (Innovation) or #3, #6, #10 (Research) into the notes or Q&A prep. At 15 minutes, add a second evidence slide and a deeper dive into one component.
- **Solo projects:** the team slide becomes "What I built + who I'm looking for". Open roles matter more here, not less.
