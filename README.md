# launch-lab-showcase

A Claude skill that prepares a NU / Khoury Launch Lab project team for the end-of-semester showcase. It runs a technical review of the project, then builds a ~10-minute live-demo pitch deck (`.pptx`) in the Launch Labs visual style, with speaker notes, a demo run-sheet and judge Q&A prep.

## What's inside

| Path | Purpose |
|---|---|
| `SKILL.md` | Workflow: intake → evidence inventory → track spine → judge pass → build → deliver |
| `references/tracks.md` | Slide spines for Innovation Teams (idea → demo) and Research Teams (question → findings) |
| `references/judge-questions.md` | Technical review questions faculty, sponsors and recruiters will ask |
| `references/design-system.md` | Launch Labs colors, motifs, and the JSON deck-spec format |
| `scripts/build_deck.js` | JSON spec → `.pptx` in the Launch Labs style (needs `pptxgenjs`) |
| `assets/example-spec.json` | A complete worked example (fictional Innovation team) |

## Build a deck by hand

```bash
npm install pptxgenjs
node scripts/build_deck.js assets/example-spec.json example.pptx
```

## Logo

Put the official NU Launch Labs logo at `assets/logo.png` (or `.svg` / `.jpg`). Without it, decks use a text wordmark placeholder.
