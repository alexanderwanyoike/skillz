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

The browser pane only runs scripts for files inside the session's folders.

1. Copy the page into a gitignored folder of the project, such as `.notes/`.
2. Open it with `navigate` to `file://<path>`, then `resize_window` to 1140x1000 and wait 3 seconds.
3. Run:

```js
({usable: document.querySelector('.diagram').clientWidth - 32,
  svgs: [...document.querySelectorAll('.mermaid-out svg')].map(s => Math.round(s.getBoundingClientRect().width)),
  fallbacks: document.querySelectorAll('.mermaid-fallback').length,
  pageOverflow: document.documentElement.scrollWidth > innerWidth})
```

The check passes when there are no fallbacks, every svg width is at most `usable`, and `pageOverflow` is false.

4. Check dark mode:

```js
document.documentElement.setAttribute('data-theme', 'dark');
await new Promise(r => setTimeout(r, 1500));
[...document.querySelectorAll('.mermaid-out svg')].map(svg => {
  const node = svg.querySelector('.node rect, rect.actor');
  const label = svg.querySelector('.nodeLabel, text.actor tspan');
  return {node: node && getComputedStyle(node).fill,
          text: label && (label.classList.contains('nodeLabel') ? getComputedStyle(label).color : getComputedStyle(label).fill)};
})
```

The check passes when every text colour is light and every node fill is dark.

5. Clean up: `resize_window` with `preset: "desktop"`, then delete the copy.

Screenshots in the small pane are too scaled down to judge text size, so trust the measurements. The local copy has no viewport meta, so phone-width checks there mean nothing. The published page has one.
