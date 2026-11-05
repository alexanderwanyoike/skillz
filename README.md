# skillz

Agent skills in the open [Agent Skills](https://agentskills.io) format. Each skill is a folder with a `SKILL.md`, so it works in Claude Code, Codex, Gemini CLI, Cursor, GitHub Copilot and any other agent that reads that format.

## Install

With the [`skills`](https://github.com/vercel-labs/skills) CLI, which detects your agents and installs into each one:

```bash
npx skills add alexanderwanyoike/skillz
```

Add `--skill explain` for a single skill, or `-g` to install for your user instead of the current project.

To install by hand, copy a folder from `skills/` into your agent's skills directory, for example `.claude/skills/` for Claude Code or `.agents/skills/` for Codex.

## Skills

| Skill | What it does |
|---|---|
| [and-then](skills/and-then) | Finishes a requested build, then invents and implements a specified number of extra features autonomously. |
| [explain](skills/explain) | Turns a pull request, branch, commit or area of code into a single HTML explainer page: a one-minute summary, an analogy, before and after diagrams, how the mechanism works, a code walkthrough with permalinks, trade-offs and further reading. |

### and-then

Ask your agent something like "build me a todo list app /and-then 3". It finishes the original brief, then chooses, implements and verifies three extra features. Additions can be independent or follow a promising earlier idea.

The count excludes the original brief and defaults to three when omitted. The skill follows the project's existing constraints and contribution workflow.

### explain

Ask your agent something like "explain PR 398", "walk me through this branch" or `/explain`.

- The page comes from a fixed template, so every explainer has the same layout and works in light and dark mode on desktop and phone.
- Diagrams are mermaid, rendered at natural size and coloured from the page theme, so labels never shrink to fit the column.
- `scripts/check-diagrams.mjs` renders the page in headless Chrome and fails on diagrams that are too wide, broken, low-contrast or that make the page scroll sideways. It has no npm dependencies.
- Agents with a page-publishing tool, such as claude.ai Artifacts, publish the page. Any other agent hands you the HTML file and opens it in your browser.

Requirements: git, the `gh` CLI for pull requests, and Node 18+ with Chrome, Chromium or Edge for the diagram check.

## License

[MIT](LICENSE)
