# Team guide: building your showcase deck

This guide is for project teams preparing for the Launch Lab showcase. It explains what the showcase is, why the deck is built this way, and what goes on every slide. You don't need AI to follow it.

**Downloads**

| Track | Template | Preview |
|---|---|---|
| Track One · **Innovation Team** (idea → working demo) | [Innovation template (.pptx)](Launch-Lab-Showcase-Innovation-Template.pptx) | [PDF](Launch-Lab-Showcase-Innovation-Template.pdf) |
| Track Two · **Research Team** (question → findings) | [Research template (.pptx)](Launch-Lab-Showcase-Research-Template.pptx) | [PDF](Launch-Lab-Showcase-Research-Template.pdf) |

Not sure which track you're in? It's the track your team applied under. Your intake proposal or your team lead will know.

---

## 1. What the showcase is

At the end of the semester, every Launch Lab team gets one slot to present to:

- **Faculty judges**, who want to know whether the work is sound: what you built or tested, whether it works, and whether the claims hold up.
- **Sponsors and recruiters**, who want to know who did what, and what each person is good at.
- **Other students**, who want to see what's possible and may want to join your team next semester.

The basics:

- **Format:** about **10 minutes including a demo or walkthrough**, then questions. The slide timings below add up to about 9.5 minutes.
- **Date, room and Q&A length:** set by the officers for each event; ask your team lead.
- **How you're judged:** a [proposed rubric](../docs/for-officers-and-judges.md#proposed-scoring-rubric) scores clarity, technical soundness, evidence, execution against your intake plan, honesty, and communication. Check with your officers whether it has been adopted.

> This format is a proposed standard. If your officers have told you to use it, follow them; otherwise it's a recommendation.

The most important thing to understand: **the showcase is a final review, not an idea pitch.** Your idea was already accepted at the start of the semester. Nobody needs to be convinced it's a good idea. The judges want to see what you did with it. That is why the template spends most of its time on how the thing works, what the evidence shows, and what didn't work, and almost none on market size or vision.

## 2. Your intake proposal and milestones

At the start of the semester, your team submitted an **intake proposal**: the plan Launch Lab reviewed when it accepted your project. It usually covers four things:

| Part | What it says |
|---|---|
| **Project** | The problem, prior work, your approach, scope and risks |
| **Resources** | What you needed: data, compute, credits, a mentor, a faculty sponsor |
| **Milestones** | Checkpoints for the semester, each with a **pass criterion**: a concrete test of whether you hit it ("live data for 2 halls by week 4") |
| **Team** | Members, skill gaps, open roles |

The showcase closes that loop. The milestones slide reports each milestone as one of:

| Status | Meaning |
|---|---|
| **PASSED** | You met the pass criterion |
| **MISSED** | You tried and didn't meet it |
| **STOPPED** | You deliberately ended this line of work (for example, early results showed it wouldn't work). That's a decision, not a failure, so it's grey rather than red |
| **PARTIAL** | Partly met. Say what's done |
| **PENDING** | The result isn't knowable yet because it depends on something outside your control (an approval, a dataset release). Say what you're waiting for |

### If your intake proposal has no pass criteria

If your proposal states goals rather than testable criteria, that's fine. Write down the goal as you understood it at the start of the semester, mark it *"criterion added for review"*, and report honestly against it. Don't rewrite your goals to match what happened. Judges notice, and an honest miss counts for more than a quiet rewrite.

## 3. Why the deck is in this order

Both templates follow the order of the questions a judge asks in their head:

> **What is it? → Why does it matter? → How does it work? → Does it actually work? → Did you do what you planned? → What's wrong with it? → Who did it? → What's next?**

Each slide answers one of those questions, in that order. Two choices that may look odd:

- **The demo comes before the numbers.** Showing makes the project concrete. The numbers then prove the demo wasn't a lucky run.
- **Milestones come near the end.** The milestones table is a verdict on the semester, and it only means something after the audience has seen the work. It's short because a table is quick to read.

### Slide by slide

In both templates, **slide 1 is a guide for your team; delete it before presenting.** The numbers below match the slide numbers in the files.

#### Innovation template

| # | Slide | Time | What goes on it | Why it's there |
|---|---|---|---|---|
| 2 | **Cover** | 0:20 | Project name and one plain sentence: what it does, for whom | If the audience can't say what you built after 20 seconds, the rest of the talk is wasted |
| 3 | **The problem** | 0:45 | Who exactly has the pain, how they cope today, how you know (interviews, survey size) | Judges need to know why the thing should exist. "How you know" separates a real problem from a guess |
| 4 | **What we built** | 1:15 | The system's parts and how data flows between them, each marked working, partial or not built yet | This is the core of a final review. Marking unbuilt parts yourself is what earns trust; judges will find them anyway |
| 5 | **Key technical decision** | 0:45 | The hardest choice you made, the option you rejected, and the evidence that decided it | Shows engineering judgment, not just output. It's often the slide judges remember |
| 6 | **Live demo** | 2:30 | 3–5 steps of a real user doing a real task, plus a backup if the live demo fails | Seeing it run is the strongest evidence a project can show. The backup is there because live demos fail |
| 7 | **Evidence** | 1:00 | Your key numbers (performance, usage or validation, engineering), each with how it was measured and what it's compared to | Proves the demo wasn't luck. "No users yet" is an honest answer; say what you tested instead |
| 8 | **Milestones** | 0:45 | Each intake milestone: criterion, what happened, status | Did you do what you said you'd do? |
| 9 | **Honest limits** | 0:45 | What broke, known limits, what users told you that changed the plan | Teams that name their own weak spots are trusted more than teams that hide them |
| 10 | **Team** | 0:45 | Who built which part, skills shown, open roles, specific asks | For sponsors and recruiters. Contributions also appear throughout the talk ("Ana built this pipeline"), so this slide only collects them |
| 11 | **Next** | 0:30 | Continue, pivot or stop; the next concrete goal; what you want the audience to do | Ends the talk with a decision and a clear ask |

There's no market-size slide on purpose: the idea was accepted at intake, and the review is about the work. If sponsors care about the market for your project, answer it in Q&A or add one slide after The problem.

#### Research template

| # | Slide | Time | What goes on it | Why it's there |
|---|---|---|---|---|
| 2 | **Cover** | 0:20 | Project title and the question in plain words | Sets up the one thing the talk answers |
| 3 | **Research question** | 0:45 | One question that could come out "no", and who would act differently if it were answered | A question that can't fail can't teach anything. "Who would act differently" is why it matters |
| 4 | **Prior work and the gap** | 0:45 | The two or three closest works, and what each leaves open | Shows you know the field and that your question is new, without a literature dump |
| 5 | **Hypotheses** | 0:45 | What you expected, stated so it could fail, with the verdict up front ("H1 supported, H2 rejected") | Research talks give the answer early so the audience knows what to look for. The Results slide then proves it |
| 6 | **Method and setup** | 1:00 | The pipeline from data to result, each step marked done, partial or planned | Judges judge the method before they trust any number |
| 7 | **Data and testbed** | 0:30 | Sources, size, license or permission, and how you kept test data separate | Data problems are the most common reason results don't hold. Judges always ask |
| 8 | **Walkthrough** (live or recorded) | 2:00 | One real example run end to end, including one failure case, live or recorded | Makes the method concrete. A failure case builds more trust than three successes |
| 9 | **Results** | 1:15 | Results for each hypothesis against a baseline, with sample size and variation | The evidence for the verdict on slide 5 |
| 10 | **Threats to validity** | 0:45 | What didn't work, and what could make your conclusion wrong | Shows you understand the limits of your own claim |
| 11 | **Milestones** | 0:30 | Each intake milestone: criterion, what happened, status | Did you do what you said you'd do? |
| 12 | **Team** | 0:30 | Who ran which experiments or analysis, open roles, specific asks | For sponsors, recruiters and future teammates |
| 13 | **Contribution and next** | 0:30 | What this work adds (paper, dataset, tool), next semester, or why you're stopping | Ends on what the field gained |

**Why the two tracks differ but are fair:** both get the same 10-minute slot. Research teams have more, shorter slides because a question, its prior work, method and data all need setting up before results make sense. Innovation teams get a longer demo because a working product is their main evidence.

## 4. Adapting the template to your project

The template is the default, not a cage. Cut a slide before padding one, and keep the order.

| Situation | What to do |
|---|---|
| **Your research isn't ML or data-heavy** (qualitative, survey, theory, systems) | Data slide: describe your participants, sources or setting. Results slide: replace the chart with your key findings (quotes, themes, a proof sketch, measurements). "Baseline" means whatever you compare against: prior work, the status quo, a control |
| **No live demo possible** (long run times, restricted data, hardware) | Use a recorded walkthrough and say on the slide why it's recorded |
| **Project stopped early, or the main result is negative** | Say so on slide 2 or 3, lead with what you learned, and mark the milestone STOPPED or MISSED. A clear negative result is a real finding |
| **No users yet** (Innovation) | Replace the usage number with what you did test (user interviews, a pilot, load tests) and say so plainly |
| **Solo project** | The team slide becomes "What I built and who I'm looking for". Open roles matter more, not less |
| **Different slot length** | 5 minutes: keep Milestones and Honest limits / Threats to validity, because they carry the honesty part of the review. Innovation: drop Key technical decision and shorten the demo to about 1:30. Research: drop Prior work and Data (cover them in Q&A) and fold Hypotheses into the Research question slide. 15 minutes: add a second evidence slide or a deeper look at one component |

## 5. Prepare for questions

Judges and sponsors will ask about what you *didn't* put on the slides. [`judge-questions.md`](../references/judge-questions.md) lists the questions they're likely to ask, by topic: architecture, evidence, scope, data and ethics, users, and team. Pick the five that would hurt most for your project and rehearse short answers. Teams using the Claude skill get this step done with them; this list gives teams working by hand the same preparation.

## 6. Editing the template

- **Placeholders:** replace every `[bracket]`. Delete the first slide (the guide) and any slide you don't need.
- **Speaker notes:** every slide's notes repeat what goes there and how long to spend.
- **Adding a slide:** Home → New Slide, then pick a layout starting with **LL** (LL Title Only, LL Title and Content, LL Statement, LL Cover, LL Closing, LL Demo). Each one already has the header, logo, footer and slide number.
- **Cards and boxes:** copy and paste an existing card to add one. Four per slide at most.
- **Architecture boxes:** black = working, grey with a red top edge = partial, dashed = not built yet. To change a box's status, copy a box that already has the style you want.
- **Milestone status cells:** PASSED is black, MISSED is red, STOPPED is dark grey, PARTIAL is light grey, PENDING is white. Copy a cell of the right color.
- **Results chart:** right-click → Edit Data. Keep the axis starting at zero; a cut axis makes small differences look large.
- **Titles:** state the point, not the topic ("Error is half the baseline", not "Results"). Keep cover and closing titles to about 35 characters so they fit on one line.
- **Footer:** the team name and event line are set in View → Slide Master.
- **Google Slides / Keynote:** both open the .pptx. PowerPoint keeps the layouts most faithfully.

## 7. Style

The look is based on Launch Lab's recruitment materials, so every team's deck reads as part of one event. Please keep it: no new colors, no extra fonts.

| Element | Value |
|---|---|
| Black | `#0E0C0D` (header band, headlines, "working" boxes) |
| Red | `#B82B35` (rule, section labels, diamond bullets, stat numbers, call-to-action bar) |
| Card grey | `#F7F7F9` |
| Body text | `#3A393D` · muted text `#6E6D73` |
| Font | Arial (bold for titles) |

## 8. Checklist before you present

- [ ] Guide slide deleted, every `[bracket]` replaced
- [ ] Every number has how it was measured and what it's compared to
- [ ] The architecture or method slide shows what is **not** built or done yet
- [ ] Milestone criteria match your intake proposal, or are marked "criterion added for review"
- [ ] Demo rehearsed; the backup recording is open in another window
- [ ] The team slide says who built or ran which part
- [ ] Asks are specific ("an intro to X", "200 GPU-hours"), not "support"
- [ ] Practiced answers to the five hardest [judge questions](../references/judge-questions.md)
- [ ] Timed run-through under 10 minutes, including the demo

Unfamiliar term? See the [glossary](../docs/glossary.md).
