# Launch Lab Showcase — presentation templates

Ready-to-fill PowerPoint templates for the end-of-semester showcase. You don't need AI to use them: download one, replace every `[bracket]`, delete the slides you don't need, and present.

| Track | Download | Preview |
|---|---|---|
| **Track One · Innovation Teams** (idea → demo) | [Launch-Lab-Showcase-Innovation-Template.pptx](Launch-Lab-Showcase-Innovation-Template.pptx) | [PDF](Launch-Lab-Showcase-Innovation-Template.pdf) |
| **Track Two · Research Teams** (question → findings) | [Launch-Lab-Showcase-Research-Template.pptx](Launch-Lab-Showcase-Research-Template.pptx) | [PDF](Launch-Lab-Showcase-Research-Template.pdf) |

The files open in PowerPoint, Keynote and Google Slides (File → Import slides, or upload the .pptx to Drive). PowerPoint keeps the layouts best.

## What the showcase is

The showcase is a **final review**, not an idea pitch. Judges accepted your idea at intake. Now they want to know what you built, whether it works, and whether you hit the milestones you set. Faculty, sponsors and recruiters are all in the room, so every deck also shows **who built what**.

- **Slot:** about 10 minutes including a live demo, then Q&A
- **Length:** 10–12 slides, about 1–1.5 minutes per slide, plus 2–3 minutes of demo
- **The first slide** of each template is a guide for your team. Delete it before presenting.

## Slide by slide

### Innovation template

| # | Slide | Time | What it must answer |
|---|---|---|---|
| 1 | Cover | 0:20 | What it is, in one literal sentence |
| 2 | The problem | 0:45 | Who hurts, how they cope today, how you know (give n) |
| 3 | What we built | 1:15 | Components and data flow: working / partial / not built yet |
| 4 | Key technical decision | 0:45 | Hardest choice, the option you rejected, the evidence |
| 5 | Live demo | 2:30 | A real task in 3–5 steps, with a named backup |
| 6 | Evidence | 1:00 | Numbers with method and baseline |
| 7 | Milestones | 0:45 | Each intake milestone: criterion, outcome, status |
| 8 | Honest limits | 0:45 | What broke and what you learned |
| 9 | Team | 0:45 | Who built what, open roles, specific asks |
| 10 | Next | 0:30 | Continue, pivot or stop, and your call to action |

### Research template

| # | Slide | Time | What it must answer |
|---|---|---|---|
| 1 | Cover | 0:20 | The question in plain words |
| 2 | Research question | 0:45 | One falsifiable question and why it matters |
| 3 | Prior work and the gap | 0:45 | Three closest works and what each leaves open |
| 4 | Hypotheses | 0:45 | H1–H3 stated so they can fail, with the verdict up front |
| 5 | Method and setup | 1:00 | Pipeline from data to result; done / partial / planned |
| 6 | Data and testbed | 0:30 | Sources, size, license, leakage controls |
| 7 | Live walkthrough | 2:00 | One example end to end, including a failure case |
| 8 | Results | 1:15 | Results vs. baseline with n and variance |
| 9 | Threats to validity | 0:45 | Negative results and what could make you wrong |
| 10 | Milestones | 0:30 | Gates passed or missed |
| 11 | Team | 0:30 | Who ran what, open roles, specific asks |
| 12 | Contribution and next | 0:30 | Paper / dataset / tool, next semester, call to action |

Each slide's speaker notes repeat what goes there and how long to spend on it.

## Editing tips

- **Add a slide:** Home → New Slide, then pick a layout whose name starts with **LL**: LL Title Only, LL Title and Content, LL Statement, LL Cover, LL Closing, LL Demo. Each one already has the header band, logo, footer and slide number.
- **Cards and boxes:** copy and paste an existing card to add one. Keep about 4 cards per slide at most.
- **Architecture boxes:** black = working, grey with a red top edge = partial, dashed = not built yet. To change a box's status, copy a box that already has the style you want.
- **Milestone status:** PASSED (black), MISSED or STOPPED (red), PARTIAL (grey), PENDING (white). Recolor a cell to match.
- **Results chart:** right-click the chart → Edit Data. Keep the axis starting at zero unless you say why.
- **Headings:** keep cover and closing titles short (about 35 characters) so they stay on one line.
- **Footer:** the team name and event line are in the slide layout. Change them in View → Slide Master.

## Style rules

| Element | Value |
|---|---|
| Black | `#0E0C0D` (header band, headlines, "working" boxes) |
| Red | `#B82B35` (rule, section labels, diamonds, stat numbers, call-to-action bar) |
| Card grey | `#F7F7F9` |
| Body text | `#3A393D` |
| Muted text | `#6E6D73` |
| Font | Arial (bold for titles) |

- Red, uppercase, letter-spaced **section label** above each title
- **Titles state the point** ("Error is half the baseline"), not the topic ("Results")
- Red **◆ diamond** bullets, not round ones
- No new colors and no extra fonts, so every team's deck looks like part of one event

## Before you present: checklist

- [ ] Every `[bracket]` replaced, and the guide slide deleted
- [ ] Every number has its method and baseline (dataset, n, time period)
- [ ] The architecture slide shows what is **not** built yet
- [ ] Milestone criteria copied word for word from your intake proposal
- [ ] Demo rehearsed, with the backup recording open in another window
- [ ] Team slide says who built which part
- [ ] Asks are specific ("intro to X", "200 GPU-hours"), not "support"
- [ ] Timed run-through under 10 minutes, including the demo

## Using AI instead

The same format is also a Claude skill. It interviews your team, runs a judge-style technical review, and builds the deck for you. See the [repository README](../README.md).

---

*Regenerate these files from `template/src/*.json` with `node scripts/build_deck.js template/src/innovation.json template/Launch-Lab-Showcase-Innovation-Template.pptx`.*
