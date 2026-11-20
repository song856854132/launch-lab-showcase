# Launch Lab Showcase Kit

A shared presentation format for the **Launch Lab end-of-semester showcase**, the event where every project team presents what it built or found to faculty judges, sponsors, recruiters and other students.

The kit has two parts:

1. **Fill-in PowerPoint templates**, one per track, that anyone can use without AI.
2. **A Claude skill** that interviews a team, asks judge-style questions, and builds the same deck for them.

> **Status: proposed standard (Fall 2026).** This is proposed by Launch Lab operations and is pending the chair's approval. If your officers have told you to use it, follow them; otherwise treat it as a recommended format, not a requirement. See [Status and ownership](#status-and-ownership).

---

## Why this exists

[Launch Lab](docs/glossary.md#launch-lab) is a Khoury College graduate-student club where teams run one-semester projects in two [tracks](docs/glossary.md#track): **Innovation** (startup-style, idea → working demo) and **Research** (question → findings). Each team starts the semester with an [intake proposal](docs/glossary.md#intake-proposal) that sets out its plan and [milestones](docs/glossary.md#milestone). The semester ends at the showcase.

Launch Lab hasn't held enough showcases to have a track record. These are the risks the format is designed against, the ones that commonly come up when many teams present free-form decks:

| Risk | What can happen | What the format does |
|---|---|---|
| **Every deck has a different shape** | Judges can't compare teams fairly; each talk spends time on different things | Every team answers the same questions in the same order, so judges score like against like |
| **Decks pitch the idea instead of reporting the work** | Ten minutes of vision, one minute of "here's a screenshot" | The idea was already accepted at intake. The deck spends its time on what was built, whether it works, and what didn't |
| **The semester plan is forgotten** | Nobody checks whether the team did what it said it would | A milestones slide reports each intake milestone as passed, missed, stopped, partial or pending |
| **Failures get hidden** | Polished demos, no limits, and judges lose trust | Dedicated slides for limits and negative results. An honest "this didn't work" counts as a finding |
| **Sponsors and recruiters can't tell who did what** | "Team of four passionate engineers" | A team slide naming who built each part, the open roles, and specific asks |
| **Every deck in its own style** | The event feels like a string of separate events | One visual style, based on Launch Lab's recruitment materials |

The showcase is where a semester of work becomes visible, both the projects and the people. The format is built so both come through.

---

## Start here

**If you're on a project team:**

1. **Find your intake proposal.** Your team lead has it; it's the plan your team submitted at the start of the semester. You'll report against its milestones. ([No intake proposal or no pass criteria?](template/README.md#if-your-intake-proposal-has-no-pass-criteria))
2. **Pick your track template:**
   - Innovation Team: [template (.pptx)](template/Launch-Lab-Showcase-Innovation-Template.pptx) · [preview (PDF)](template/Launch-Lab-Showcase-Innovation-Template.pdf)
   - Research Team: [template (.pptx)](template/Launch-Lab-Showcase-Research-Template.pptx) · [preview (PDF)](template/Launch-Lab-Showcase-Research-Template.pdf)
3. **Read the [team guide](template/README.md).** It explains why each slide exists, what to put on it, how to adapt it to your project, and what judges will ask.

**If you're a judge, an officer or a sponsor:** read [For officers, judges and sponsors](docs/for-officers-and-judges.md). It covers what the format asks of teams, a proposed scoring rubric mapped to the slides, fairness between tracks, and the open decisions.

**Unfamiliar term?** See the [glossary](docs/glossary.md).

---

## Two ways to build your deck

| | Fill-in template | Claude skill |
|---|---|---|
| **What you do** | Download the .pptx, replace every `[bracket]`, delete what you don't need | Talk to Claude about your project; it asks questions and builds the deck |
| **What you get** | The deck | The deck, a demo run-sheet, practice Q&A answers, and a list of gaps to fill |
| **Needs** | PowerPoint, Keynote or Google Slides | A Claude account with skills enabled |
| **Judge prep** | Practice with the [judge questions](references/judge-questions.md) yourself | Claude asks you the hardest ones before building |

Both produce the same slides in the same style. Under the proposed rubric, judges score the deck and the talk, not how the deck was made. Teams that don't use AI get the same judge questions and adapting rules through the [team guide](template/README.md), so the manual path is complete on its own and nobody needs a Claude account to take part.

### Using the Claude skill

A *Claude skill* is a packaged set of instructions that teaches Claude a specific task, in this case preparing a Launch Lab showcase deck. To install it, download this repository as a ZIP (green **Code** button → **Download ZIP**) and upload it as a skill in Claude's skill settings; Claude's help pages describe the current steps. Then tell Claude something like *"We're a Launch Lab research team, help us prepare our showcase deck"* and attach your intake proposal and results.

---

## What's in this repository

| Path | What it is | Who it's for |
|---|---|---|
| [`template/`](template/) | The two fill-in .pptx templates, PDF previews, and the [team guide](template/README.md) | Teams |
| [`docs/for-officers-and-judges.md`](docs/for-officers-and-judges.md) | Why the format looks the way it does, a proposed rubric, fairness, and open decisions | Officers, judges, sponsors |
| [`docs/glossary.md`](docs/glossary.md) | Definitions of intake, track, milestone statuses, and other terms | Everyone |
| [`references/judge-questions.md`](references/judge-questions.md) | The questions judges and sponsors are likely to ask, by topic | Teams, judges |
| [`references/tracks.md`](references/tracks.md) | Slide order and timing per track, and how to adapt it (Claude's version) | Claude skill |
| [`references/design-system.md`](references/design-system.md) | Colors, motifs, and the deck-spec format the generator reads | Maintainers |
| [`SKILL.md`](SKILL.md) | The skill's instructions to Claude | Claude skill |
| [`scripts/build_deck.js`](scripts/build_deck.js) | Generator: turns a JSON deck spec into a styled .pptx | Maintainers |
| `assets/example-spec.json`, `template/src/*.json` | A worked example deck and the sources of the two templates | Maintainers |

### For maintainers: regenerating the templates

The templates are generated, so the AI and manual versions stay identical. After changing a slide's wording, the style, or the generator:

```bash
npm install pptxgenjs
node scripts/build_deck.js template/src/innovation.json template/Launch-Lab-Showcase-Innovation-Template.pptx
node scripts/build_deck.js template/src/research.json   template/Launch-Lab-Showcase-Research-Template.pptx
```

Then re-export the PDF previews (for example, open each file and choose File → Export → PDF).

---

## Status and ownership

- **Status:** proposed standard, pending the chair's approval. Open decisions are listed in [For officers, judges and sponsors](docs/for-officers-and-judges.md#open-decisions).
- **Author and proposed maintainer:** Hung-Ju Lin, Launch Lab operations (pending officer confirmation).
- **Proposed versioning:** review the format after each showcase and tag changes by semester (for example `fall-2026`).
- **Feedback:** open a GitHub issue on this repository or tell a Launch Lab officer.
- **Logo:** decks show a text wordmark until the official Launch Lab logo file is added at `assets/logo.png`.
