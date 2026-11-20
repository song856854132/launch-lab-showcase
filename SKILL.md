---
name: launch-lab-showcase
description: Prepare a NU / Khoury Launch Lab team for its end-of-semester showcase (final review) - pressure-test the project on technical depth and evidence, then build a ~10-minute live-demo showcase deck as a .pptx in the Launch Labs visual style (black header band, red rule, red diamond bullets), with speaker notes, a demo run-sheet and judge Q&A prep. Use whenever a Launch Lab Innovation Team or Research Team mentions the showcase, demo day, final review, final presentation or pitch deck, or asks to turn their semester's work into slides, even without the words "Launch Lab".
---

# Launch Lab Showcase Builder

Helps one Launch Lab project team turn a semester of work into a showcase presentation that holds up under technical questioning, and that shows the people in the room who built what.

## Why this is not a YC pitch

Launch Lab is a graduate-student project club at Northeastern's Khoury College. Teams run one-semester projects on a fixed cycle, with milestones and pass criteria set at intake. At the showcase, faculty judge the work, and sponsors and recruiters come to meet the people who did it. The showcase is the end of that cycle, so it differs from a startup pitch in three ways:

1. **It is a final review, not idea screening.** Judges already accepted the idea at intake. Now they want to know what was built, how it works, whether it works, and whether the team hit the milestones it set. Architecture, evidence and honest limits get the most time. Market sizing (TAM/SAM/SOM) mostly drops out.
2. **The deck closes the intake loop.** Each team entered with a one-page proposal: *Project* (problem, prior work, approach, scope, risks), *Resources* (data, compute, credits, sponsors, mentors), *Milestones* (with pass criteria), *Team* (members, skill gaps, open roles). The showcase reports against it, milestone by milestone.
3. **The people matter as much as the project.** The audience is faculty and judges (rigor), sponsors and recruiters (who is good, and at what), and students (what's possible, and maybe joining). Every deck ends with who built which part, the skills that proved, open roles, and specific asks.

A stopped milestone or a negative result is a valid showcase outcome. Present it as a finding. Hiding it is what loses credibility.

## Format defaults

- **Slot:** about 10 minutes including a demo or walkthrough, then Q&A. 10–12 slides; the per-slide timings in `references/tracks.md` add up to about 9.5 minutes.
- **Output:** a `.pptx` built with `scripts/build_deck.js` in the Launch Labs visual system (see `references/design-system.md`). Don't fall back to a generic template or a default theme; the shared look is what makes the showcase feel like one event.
- **Language:** match the team's language for the conversation; the deck is in English unless they say otherwise.

## Workflow

### 1. Intake (short, then start)

Ask only what you can't find yourself, two or three questions at a time:
- **Track:** Innovation (idea → demo) or Research (question → findings)?
- **Source material:** their intake proposal, repo or README, results, earlier decks, demo link. Read anything they attach or link before asking more.
- **Team:** names, roles, and who built which part.
- **Demo:** what they'll show live, and whether a recorded backup exists.

If the team has little written down, work from a 3–5 sentence description and mark gaps as `[TBD: …]` instead of inventing.

### 2. Evidence inventory

Before writing slides, sort what the team has into a working list:
- **Working / partial / stubbed:** each component, honestly labelled. This feeds the architecture slide, which shows all three states.
- **Measurements:** every number, with how it was measured (dataset, n, baseline, date range). A number without a method goes on the slide only with its caveat.
- **Milestones:** each intake milestone, its pass criterion, what happened, and a status of passed / missed / stopped / partial / pending (definitions in `docs/glossary.md`).
- **What broke:** failures, surprises and limits.

Never fabricate metrics, users, results or quotes. Any number you can't trace to the team goes in as `[TBD]` and is flagged in your reply.

### 3. Pick the deck spine

Read `references/tracks.md` and use the spine for their track. Adapt it to the project instead of forcing every slide; cut a slide before padding one.

### 4. Judge pass

Before building, run the technical review in `references/judge-questions.md` against the draft story. Ask the team the 3–5 hardest questions it raises, the ones a faculty judge would really ask. Either fold the answers into the deck or put them in the Q&A prep. This step separates a showcase deck from a polished brochure. Be direct but constructive: the goal is a team that isn't surprised on stage.

### 5. Build the deck

1. Write a JSON spec (slide types and fields are in `references/design-system.md`; `assets/example-spec.json` is a complete worked example). Put the talk track for every slide in `notes`.
2. Build it: `node <skill-dir>/scripts/build_deck.js spec.json <team>-showcase.pptx`. It needs `pptxgenjs` (`npm install pptxgenjs` if `require` fails).
   Every deck uses PowerPoint layouts named "LL …" (Cover, Title Only, Title and Content, Statement, Demo, Closing), so the team can add branded slides by hand later with Home > New Slide.
3. Logo: the builder uses `assets/logo.png` (or `.svg`/`.jpg`) if it exists, or `meta.logo` from the spec. Otherwise it prints a text wordmark placeholder. Don't draw or recreate the Launch Labs logo; use the official file.
4. QA: if the `pptx` skill is available, run its `validate.py` and render slides to images (its "Converting to Images" steps). Look at every slide for text overflow, overlap and leftover `[TBD]`. Fix the spec (shorter text, fewer bullets, split a slide) and rebuild. Don't hand-edit the .pptx.

### 6. Deliver

- The `.pptx`, with speaker notes on every slide.
- A **demo run-sheet**: the exact click path, the data or account it needs, timing, and the fallback (recorded video, screenshots) if live fails.
- **Q&A prep**: the 6–10 likeliest judge and sponsor questions, each with a 1–2 sentence answer drawn from the team's material.
- A list of any `[TBD]` items the team must fill before the event.

## Teams that don't want AI

Point them to the fill-in templates in `template/` (Innovation and Research .pptx, PDF previews, and `template/README.md`, the team guide with per-slide reasoning, adapting rules and checklist). Judges and officers have their own page: `docs/for-officers-and-judges.md`. They follow the same spines and style as this skill. If you change a spine or the style, regenerate the templates from `template/src/*.json` so the two stay in step.

## Writing the slides

- **Titles say the point**, not the topic: "Forecast error is half the baseline in every hall", not "Results".
- **One message per slide.** Follow the per-slide timings in `references/tracks.md`.
- **Plain, literal language.** "Predicts dining-hall waits from Wi-Fi counts" beats "AI-powered campus intelligence platform." This rule carries over from YC because it works.
- **Show the mechanism.** For a technical audience, an architecture or pipeline diagram plus one key design decision (with the alternative you rejected and why) does more than any adjective.
- **Every number has a source line** (n, dataset, baseline, period) in the slide footnote or notes.
- **Name people with their work.** "Ana built the ingestion pipeline and holdout eval" helps a recruiter. "Team of 3 passionate engineers" doesn't.
- **Asks are specific and answerable in the room:** "an intro to Dining Services' data office", not "support".
- Use the English names team members want on slides.
