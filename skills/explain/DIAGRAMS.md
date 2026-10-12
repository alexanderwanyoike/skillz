# Diagrams that stay readable

The user's hard rule is that every diagram must be fully readable in light and dark mode, on desktop and on a phone.

## Never use the platform's mermaid

Artifacts render `<pre class="mermaid">` natively. That renderer scales every diagram down to the column width and uses mermaid's default colours:
- A 1,050px sequence diagram in a 600px column shrinks 16px labels to about 9px.
- The default colours ignore dark mode.

So never write `pre.mermaid`. Use the template's renderer.

## How the template renders

- **Markup:** put the source in `<script type="text/x-mermaid">`, where `-->` and `<br>` need no escaping. Follow it with `<div class="mermaid-out" role="img" aria-label="...">`. Both go inside `.diagram`, in a `figure` with a `figcaption`.
- **Renderer:** the script at the end of template.html loads mermaid 11.4.1 from jsDelivr. It renders at natural size (`useMaxWidth: false`) with 16px text, using `theme: "base"` coloured from the page tokens. It re-renders when the theme changes, and shows the source as plain text if mermaid fails.
- **Colours:** in the source, these placeholders are replaced with token colours:
  - `{{hot}}`: amber, the problem
  - `{{add}}`: green, the fix
  - `{{del}}`: red, something removed

  Examples: `classDef hot stroke:{{hot}},stroke-width:3px` and `classDef gone stroke:{{del}},stroke-dasharray:6 4`.
- **Width:** prose is capped at 72ch, but figures, code and tables use the full column, about 780px usable on desktop.

## Size budget

Every diagram must fit the column at natural size on desktop: **at most 760px wide**. On phones, a wider diagram scrolls sideways inside its own box, and the text never shrinks. If a diagram is too wide, restructure it; never scale it:

- **Direction:** prefer `flowchart TD`. Use LR only for 3 or 4 short nodes.
- **Labels:** break them with `<br>` at about 28 characters per line, and move detail into the caption.
- **Edge labels:** drop them, and explain the arrow styles in the caption instead.
- **Subgraphs:** mermaid ignores a subgraph's `direction` when its nodes link outside it.
- **Disconnected parts** sit side by side. Stack them with an invisible link: `A ~~~ B`.
- **Sequence diagrams:**
  - at most 4 or 5 participants, with short aliases (`participant F as Frontend`)
  - messages under about 20 characters per line, with the detail in the caption
  - the template already sets actor width 110 and actor margin 40
- **Size:** if a diagram has more than about 10 nodes, split it into two.
- **Subgraphs with outside sources** spread the layout wide: one with three outside nodes pointing into it measured 842px. Drop the subgraph and name the module in each node's label, or split the diagram.
- **Estimates are not measurements.** A draft estimated at 600 to 650px measured 901px. Always run the check below, even when the diagram was designed to the budget.

## Meaning

- **Never rely on colour alone.** Mark a highlight with a thick border and something removed with a dashed line, and say so in the caption.
- **Captions** say what to look at, and spell out every short alias.
- **Numbering:** `autonumber` in a sequence diagram lets the caption refer to steps by number.

## Check (before publishing, and after any diagram edit)

Run the bundled checker on the filled page. It needs Node 18+ and an installed Chrome, Chromium or Edge (set `CHROME_PATH` if it is not on the `PATH`):

```bash
node <skill-dir>/scripts/check-diagrams.mjs <page>.html
```

It renders the page headlessly at 1140px and 390px wide and prints `PASS`, or `FAIL` with one line per problem:

- a diagram fell back to its source text (a mermaid syntax error)
- a diagram is wider than the usable column on desktop
- the page scrolls sideways on desktop or at phone width
- a diagram's label contrast is under 4.5:1 in light or dark mode

Exit code 0 is a pass, 1 a failure and 2 means the check could not run. Fix every failure and run it again. Screenshots are too scaled down to judge text size, so trust the measurements.
