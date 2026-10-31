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
| [explain](skills/explain) | Turns a pull request, branch, commit or area of code into a single HTML explainer page: a one-minute summary, an analogy, before and after diagrams, how the mechanism works, a code walkthrough with permalinks, trade-offs and further reading. |
| [post-on-socials](skills/post-on-socials) | Turns project updates into platform-specific posts and finished media previews, then publishes only the versions you approve. |

### explain

Ask your agent something like "explain PR 398", "walk me through this branch" or `/explain`.

- The page comes from a fixed template, so every explainer has the same layout and works in light and dark mode on desktop and phone.
- Diagrams are mermaid, rendered at natural size and coloured from the page theme, so labels never shrink to fit the column.
- `scripts/check-diagrams.mjs` renders the page in headless Chrome and fails on diagrams that are too wide, broken, low-contrast or that make the page scroll sideways. It has no npm dependencies.
- Agents with a page-publishing tool, such as claude.ai Artifacts, publish the page. Any other agent hands you the HTML file and opens it in your browser.

Requirements: git, the `gh` CLI for pull requests, and Node 18+ with Chrome, Chromium or Edge for the diagram check.

### post-on-socials

Ask your agent to "post this project update on socials", or invoke `/post-on-socials` or `$post-on-socials`.

- Reuses the coding context to prepare copy and media for X, LinkedIn, TikTok, Facebook, Instagram, YouTube Shorts and YouTube.
- Uses available capture, image generation and video tools, including Prezi, Forgecut and Clipforge where supported.
- Shows the actual posts and media for approval before publishing, then verifies and returns per-platform results.

Requirements: access to the project context and suitable media tools. Publishing requires authenticated tools or browser access to the selected social accounts. Creating or installing the skill does not connect those accounts or authorize posting.

## License

[MIT](LICENSE)
