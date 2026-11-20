# For officers, judges and sponsors

This page explains what the showcase format asks of teams and why, and how it can be judged. It also lists the decisions officers still need to make. The team-facing guide is [template/README.md](../template/README.md).

> **Status: proposed (Fall 2026).** Everything on this page is a proposal from Launch Lab operations for the chair and officers to accept, change or reject. The rubric in particular is a starting point for judges, not an adopted standard.

## The problem the format solves

The showcase has three audiences who want different things from the same ten minutes:

| Audience | What they need from each team |
|---|---|
| **Faculty judges** | Enough technical depth to judge whether the work is sound, and a fair basis for comparing teams |
| **Sponsors and recruiters** | Who did what, and what each person is good at |
| **Students** | What's possible in a semester, and which teams they might join |

Launch Lab is new, so these are expected risks rather than lessons from past events: free-form decks tend to serve these audiences unevenly. Each team picks its own emphasis, often toward pitching the idea, so judges end up comparing different things. Progress against the semester plan can go unchecked, failures can stay hidden, and individual contributions blur into "the team".

The format proposes three commitments:

1. **A final review, not a pitch.** Ideas were accepted at intake, so the deck spends its time on what was built or tested, whether it works, and what didn't.
2. **Closing the intake loop.** Each team reports its intake milestones as passed, missed, stopped, partial or pending ([definitions](glossary.md#milestone)). This gives judges a shared measure of execution and makes the intake proposal matter.
3. **Making people visible.** Contributions are named per person, and each deck ends with open roles and specific asks. That is what sponsors and recruiters come for.

## What every team presents

The same questions, in the same order: *What is it? → Why does it matter? → How does it work? → Does it work? → Did you do what you planned? → What's wrong with it? → Who did it? → What's next?*

The slide-by-slide breakdown, with the reasoning for each slide, is in the [team guide](../template/README.md#3-why-the-deck-is-in-this-order).

## Proposed scoring rubric

Judges score six criteria from 1 to 5. Each criterion maps to specific slides, so judges know where to look. The criteria are the same for both tracks; only the slides differ.

| Criterion | Weight | Innovation slides | Research slides | A 5 looks like |
|---|---|---|---|---|
| **Clarity of problem or question** | 10% | Cover, The problem | Cover, Research question, Prior work | A specific user or a falsifiable question, with evidence it matters |
| **Technical soundness** | 25% | What we built, Key technical decision | Hypotheses, Method, Data and testbed | A clear mechanism, defensible choices, data handled carefully |
| **Evidence** | 20% | Demo, Evidence | Walkthrough, Results | The work is shown running, live or as a recording with a stated reason; numbers have a method, a baseline and a sample size |
| **Execution against the intake plan** | 15% | Milestones | Milestones | Ambitious milestones met, or a well-reasoned STOPPED decision. MISSED milestones lower this score |
| **Rigor and honesty** | 15% | Honest limits, Milestones | Threats to validity, Milestones | Unbuilt parts, misses and limits named by the team itself; the milestone report matches the intake proposal |
| **Communication and contribution** | 15% | Whole talk, Team | Whole talk, Team | Fits the time; answers questions directly, including "we don't know"; each person's contribution is clear |

**Why these weights.** Just under half the score (soundness 25% + evidence 20%) asks whether the work is good. Thirty percent (execution 15% + honesty 15%) asks how the semester went against the team's own plan. Execution and honesty are scored separately so a team can't make up for missing everything by reporting it well, and a team that hit its milestones still has to name its limits. The last 25% (clarity 10% + communication and contribution 15%) covers whether the audience understood the work and who did it. Clarity is weighted lightest because the problem or question was already vetted at intake. These weights are a starting proposal for officers to adjust.

Notes for judges:

- **A negative research result can still score 5** on Evidence and on Rigor if it's clearly shown and well understood. It affects Execution only if a milestone was missed.
- **STOPPED is not MISSED.** Ending a line of work on good evidence is a decision; judge the reasoning under Execution.
- **A recorded walkthrough is not penalized** when the team states why it couldn't run live (restricted data, long runs, hardware).
- **Don't score market size.** It isn't part of the format, because ideas were vetted at intake.

## Fairness

**Between tracks.** Both tracks get the same slot, answer the same eight questions, and are scored on the same criteria. Research decks have more, shorter slides because a question, prior work, method and data need setting up before results mean anything. Innovation decks get a longer demo because a working product is their main evidence.

**Between AI and manual teams.** The Claude skill and the fill-in template produce the same slides in the same style. The skill adds preparation: a judge-style question pass, a demo run-sheet and practice answers. Manual teams get equivalent preparation through the team guide: the same [judge questions](../references/judge-questions.md), the same adapting rules, and a checklist. Under the proposed rubric, judges score the deck and the talk, not the tool. Whether teams must disclose AI use is an open decision below.

**Access to AI.** The Claude skill needs a Claude account with skills enabled, which not every student has or wants to pay for. That's why the manual path is designed to be complete on its own: everything the skill uses (slide order, judge questions, adapting rules, checklist) is in the team guide. If officers want to remove any advantage, they could run one shared practice-Q&A session for all teams before the showcase.

**Across project types.** The template assumes empirical work, but the [adapting rules](../template/README.md#4-adapting-the-template-to-your-project) cover qualitative, theory and systems research, teams with no users yet, projects without a live demo, stopped projects and solo teams.

## What the format asks officers to provide

- **Each team's intake proposal**, so teams can copy their milestones word for word. Teams whose proposals had no pass criteria are told to state their original goal and mark it "criterion added for review".
- **The official logo file**, added to the repository at `assets/logo.png`. Until then decks show a text wordmark.
- **Event logistics**: the date, room, slot order, and Q&A length.

## Open decisions

All of these belong to the chair and officers, and all are needed **before the format is announced to teams**.

| # | Decision | Options |
|---|---|---|
| 1 | **Required or recommended** | Required for all teams / recommended / required only for the milestones and team slides |
| 2 | **Slot and Q&A length** | Is 10 minutes a hard cutoff, and how long is Q&A? |
| 3 | **Rubric** | Adopt as proposed / adjust criteria or weights / leave scoring to judges |
| 4 | **What judges receive beforehand** | Intake proposals / decks / nothing |
| 5 | **What sponsors and recruiters receive** | Decks after the event with each team's permission / a one-page summary / nothing |
| 6 | **AI disclosure** | Whether teams must say if they used the Claude skill |
| 7 | **Name** | "Launch Lab" or "Launch Labs" in all materials |
| 8 | **Maintainer** | Confirm Hung-Ju Lin (operations) or appoint someone else |
| 9 | **Versioning** | Review after each showcase and tag by semester, or another process |

## Ownership and changes (proposed)

- **Author and proposed maintainer:** Hung-Ju Lin, Launch Lab operations (decision 8).
- **Proposed process:** review the format after each showcase using judge and team feedback, and version it by semester (decision 9).
- **Feedback:** a GitHub issue on this repository, or any officer.
- **Keeping versions in sync:** the templates are generated from the same source as the Claude skill (`template/src/*.json` and `scripts/build_deck.js`), so a change to one updates both.
