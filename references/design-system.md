# Launch Labs visual system and deck spec

The look comes from the NU Launch Labs "Join a team" email. Every showcase deck uses it so the event reads as one program.

## Tokens

| Token | Hex | Use |
|---|---|---|
| black | `0E0C0D` | Header band, headlines, "working" components, demo slide background |
| red | `B82B35` | Rule under the header, eyebrows, diamonds, card top edges, stat values, CTA bar |
| card | `F7F7F9` | Card fill |
| text | `3A393D` | Body text |
| muted | `6E6D73` | Captions, footers, source lines |

Typeface: Arial (bold for headlines; Helvetica-like and safe on every machine). Canvas: 16:9 wide (13.33 × 7.5 in).

## Motifs (these are the brand; keep them)
- Black header band with the logo, a red rule beneath it.
- Red, uppercase, letter-spaced **eyebrow** above every title ("WHAT WE BUILT", "TRACK ONE · INNOVATION TEAM").
- Heavy black headline. Hero slides center it; content slides left-align it.
- Light-grey **cards with a red top edge**; a grey edge marks the "considered / not chosen" side.
- **Red diamond** (◆) bullets, never round bullets.
- Full-width **red CTA bar** with white bold text and an arrow.
- **BUILD ◆ GROW ◆ CONNECT** footer on the cover and closing slides.

The builder handles all of this. Teams supply content, not styling.

## Spec format

```json
{
  "meta": { "title": "…", "team": "Team name · Innovation Team", "event": "Launch Lab Showcase · Fall 2026", "logo": "optional/path/to/logo.png" },
  "slides": [ { "type": "cover", "…": "…", "notes": "speaker notes" } ]
}
```

Every slide accepts `notes` (speaker notes). Content slides take `eyebrow` and `title`.

| type | fields | notes |
|---|---|---|
| `cover` | `eyebrow`, `title`, `subtitle`, `byline` | Black hero band + centered title |
| `statement` | `eyebrow`, `title`, `body` | One big centered sentence: problem, research question |
| `bullets` | `bullets[]`, optional `aside {eyebrow,title,body,bullets[]}` | ≤5 bullets, each ≤ ~20 words |
| `cards` | optional `intro`, `cards[1–4] {eyebrow,title,body,bullets[],muted}` | `muted: true` gives a grey top edge |
| `compare` | `left`, `right` `{label,title,points[],body}`, `verdict` | Right side is the chosen option (red edge) |
| `architecture` | `layers[] {label, nodes[] {name, detail, status}}`, `caption` | `status`: `built` (black), `partial` (grey + red edge), `stub` (dashed). ≤4 layers, ≤4 nodes per layer |
| `demo` | `eyebrow`, `title`, `steps[]`, `fallback` | Black slide; 3–5 steps |
| `metrics` | `stats[1–4] {value,label,context}`, `footnote` | `footnote` = method and baseline. Keep `value` short ("2.8 min") |
| `chart` | `chart {type: bar/line, categories[], series[] {name, values[]}, yTitle, format, horizontal, min, max}`, `takeaway`, `points[]`, `footnote` | Native, editable PowerPoint chart. Bars start at 0 unless `min` is set; only zoom the axis with a stated reason |
| `milestones` | `rows[] {milestone, criterion, result, status}` | `status`: `pass` / `fail` (criterion missed) / `stop` (team chose to stop) / `partial` / `pending`; ≤6 rows |
| `team` | `members[] {name, role, built, skills}`, `openRoles[]`, `asks[]` | ≤4 members per row, two rows max. Red strip shows roles and asks |
| `closing` | `eyebrow`, `title`, `body`, `cta`, `contacts[]` | Mirrors the cover |

## Fitting text
The builder shrinks text within limits (body never below 11–14 pt). If a slide still overflows in the render, the content is too long. Cut words or split the slide; don't fight the layout.
