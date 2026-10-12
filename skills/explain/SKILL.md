---
name: explain
description: Turns a pull request, branch, commit or area of code into a published HTML explainer page covering what happened before, what changes, how it works, a code walkthrough, trade-offs, further reading and analogies, with fully readable mermaid diagrams. Use when the user asks to explain a PR or change ("I don't understand PR 398", "explain this change", "walk me through X") or types /explain.
---

# explain

One self-contained HTML page that teaches a change to the reader: a lead developer who did not write it and wants to understand it properly.

## Inputs

- **PR number:** run `gh pr view N --json title,body,files,commits,baseRefName` and `gh pr diff N`.
- **Branch or commit:** run `git diff <base>...<branch>` or `git show <sha>`.
- **Code area with no change:** use the same page, but rename "Before the change" to "What it is" and "What the change does" to "What it does". Drop sections that do not apply.

## Workflow

- [ ] **1. Research before writing.** Read the diff top to bottom. Open the surrounding code for every claim you will make: callers, invariants, ordering. Use these commands:
  - `git log -S '<symbol>' --format='%h %ad %s' --date=short` shows how the code got in.
  - `git grep -n '<symbol>' <sha>` finds every caller.
  - The full head SHA is needed for permalinks.

  In zsh, write `"${ref}:path"`, never `$ref:path`.
- [ ] **2. Plan the diagrams** with [DIAGRAMS.md](DIAGRAMS.md):
  - An architecture change gets a mermaid structure diagram plus before and after flows.
  - A timing problem gets a sequence diagram.
  - A behaviour change gets a before/after table.
- [ ] **3. Build the page.** Copy [template.html](template.html) to `<topic>-explained.html` in a working folder: your scratchpad or temp directory if the agent has one, otherwise a gitignored folder of the project such as `.notes/`. Fill in every `{{...}}` placeholder, and give the `<title>` a name for the problem (for example "The Double Frontend Build"). Edit content only; keep the template's CSS and renderer script as they are.
- [ ] **4. Check the diagrams:** run `node scripts/check-diagrams.mjs <page>.html` from this skill's folder (details in [DIAGRAMS.md](DIAGRAMS.md#check-before-publishing-and-after-any-diagram-edit)). Fix every failure and run it again until it prints `PASS`.
- [ ] **5. Publish** with whatever the agent has:
  - **A page-publishing tool**, such as claude.ai's Artifact tool: publish the file with it. For Artifact, call `action: "quickstart"` with `intent: "other"` first (the tool requires it), then publish with `icon: "code"` and a one-sentence `description`. To update, republish the same path.
  - **No publishing tool:** the HTML file is the deliverable. Move it wherever the user asked, otherwise leave it in the working folder, and open it in their browser when they work locally (`open` on macOS, `xdg-open` on Linux, `start` on Windows).
- [ ] **6. Reply** with the link or file path, a summary of the change in 3 to 5 lines, and anything you noticed that is out of scope. Offer follow-up fixes; do not start them.

## Sections, in order

1. **In one minute:** a `dl` of The bug, The cause, The fix and Proof. For features, use The gap, The idea, The change and Proof.
2. **Analogy:** one everyday scene that maps onto the mechanism one-to-one, odd details included. For example, "the pastry chef bins the first cake" stood for `os.RemoveAll(dist)`. Add an analogy panel elsewhere only where a mechanism needs one, such as a pattern or a test trick. Use at most 3 panels.
3. **Before the change:** how it worked, with a diagram. Show what the user would have seen, using real log and error strings from the code. Then the costs, and a timeline of how it got in, taken from git history.
4. **What the change does:** an after diagram and a before/after table. Include rows that stay unchanged.
5. **How it works:** the mechanism or language feature behind the fix, explained from zero, with a structure diagram.
6. **Code walkthrough:** 3 to 6 numbered stops in call order, saying which stops change.
   - Each stop has a file header linking to `blob/<full sha>/<path>#Lx-Ly`.
   - Trim snippets, writing `...` for omitted lines. Use `.hl` for the key call and `.add`, `.del` and `.ctx` for diff lines.
   - Follow each snippet with 1 to 3 sentences or numbered notes.
   - Always walk through the new test.
7. **Trade-offs:** cards labelled Cost, Alternative, Neutral, Process or "Noticed, not in scope". Be candid about dead code left behind, guards that are only tests, and alternatives not taken and why.
8. **Further learning:** 5 to 9 links:
   - the spec or official docs for the mechanism
   - the canonical article on the pattern
   - docs for the tools used
   - the project's own docs
   - the PR itself

   Only use URLs you are confident exist.

## Accuracy

- Every number, line range, date, message string and SHA comes from the repo or from command output. Never invent timings or sizes; write `<size>` when unknown.
- Before linking a line range, check it with `git show "<sha>:<path>" | sed -n 'X,Yp'`.
- Name things the way the code does, then explain them in plain words on first use.

## Writing

Follow the writing rules in the project's agent instructions (AGENTS.md, CLAUDE.md, GEMINI.md or similar). Whatever they say, never use the em dash; run `grep -c $'\u2014' <file>` before publishing, and it must print 0. Write plain, direct sentences. Explain jargon once and skip filler.
