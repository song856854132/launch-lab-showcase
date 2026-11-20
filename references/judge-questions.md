# Judge pass: technical review questions

Use these to pressure-test the draft before building slides. Pick the 3–5 that hit hardest for this project and ask the team. Everything else becomes Q&A prep. A good question names the specific component or number it's probing.

## Architecture and engineering
- Which parts run end-to-end today, and which are mocked, hard-coded or manual? (Must match the architecture slide's working/partial/stubbed labels.)
- What is the hardest technical problem you solved, and what did you try first that failed?
- Why this design over the obvious alternative? What evidence decided it?
- Where does it break first: more users, more data, adversarial input, a dependency going down?
- How is it tested? Unit, integration, load or evaluation harness? Could a stranger reproduce your setup from the repo?
- What did you build yourselves, and what is a library, API or template?

## Evidence and evaluation
- What is the baseline, and how much do you beat it by? Is the gap bigger than run-to-run noise?
- How was each number measured (dataset, n, time window)? Is the test data separate from what you tuned on?
- For users or interviews: how were they recruited, and what does that bias?
- Is there any result that surprised you or went against your hypothesis?
- (Research) Which hypothesis is weakest, and what result would falsify it?
- (Research) What are the threats to validity: leakage, small n, one dataset, benchmark artifacts?

## Scope and milestones
- Which intake milestones passed, which stopped, and what did a stop teach you?
- What did you cut from the original scope, and why?
- What would you do differently if you restarted the semester?

## Data, security and ethics
- Where does the data come from, who owns it, and are you allowed to use it this way (license, IRB, terms of service)?
- What personal or sensitive data does it touch, and how is it protected?
- How could it be misused or fail in a way that hurts someone?
- For LLM/ML systems: how do you handle hallucination, prompt injection or poisoned inputs?

## Innovation track: users and viability
- Who specifically has used it, and what did they do with it? Not "would use", but did use.
- What do people use today instead, and why would they switch?
- Why hasn't an existing tool or a big company done this already?
- What happens next semester: continue, apply to IDEA, open-source, or stop?

## Sponsors and recruiters (talent questions)
- Who built which part? Could each person explain their component in depth?
- What skill did each person level up this semester?
- What are you looking for: teammates, a mentor, data, compute, internships?

## Red flags to fix before the event
- A metric with no method or baseline
- An architecture diagram with no stubbed parts in a one-semester project (rarely true)
- "AI-powered", "platform", "ecosystem" without a concrete mechanism
- A demo with no fallback
- A team slide that lists names but not contributions
- Asks that are vague ("support", "resources")
