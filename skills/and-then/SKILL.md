---
name: and-then
description: Finishes a requested build, then autonomously invents and implements a specified number of extra features. Use when the user invokes /and-then or $and-then, or explicitly asks for a number of agent-chosen additions after the original task.
license: MIT
---

# And Then

Finish the user's brief. Then decide what else would make it interesting or useful, and build it.

## Invocation

`Build me a todo list app /and-then 3` means complete the todo app, then invent and implement three extra features without asking the user to choose them.

- The number counts completed extra features, excluding the original brief. Default to three when no count is supplied.
- Zero means finish the original brief without extras. If the count is negative, fractional or unclear, resolve it before starting extras.
- Treat an attached invocation as a modifier of that build. When invoked on its own, use the current task; ask what to extend if there is no clear task.
- An examples-only or brainstorming request stays examples-only. Discussing `/and-then 20` does not itself authorise implementation.

## Workflow

1. **Finish the original brief.** Read the project and its instructions, implement the requested behaviour and verify it before starting extras. Required behaviour, bug fixes, tests and necessary setup belong to this stage and do not count as additions.
2. **Choose an addition.** Use the original purpose, the current product and what you learn while using it. Choose a concrete capability the user can experience, with a clear way to verify it. Do not ask the user to select from a menu or approve routine feature choices.
3. **Build and verify it.** Implement the feature fully, exercise its intended behaviour and follow the project's testing and contribution workflow. Supporting refactors, tests and documentation are part of that feature, not extra counts. Count it only when it works.
4. **Choose again until the count is met.** Reconsider the next feature using what you have learned. Keep track of completed additions so work is neither skipped nor double-counted.

## Choosing Features

Features can be independent or build on earlier additions. Chaining is a choice, not a requirement. Follow a promising idea when it adds value; return to the original brief when another direction is more interesting.

Prefer additions that make the product more useful, pleasant or distinctive. Playful features are welcome when they fit the product. Keep each addition proportionate to the original build and requested count.

For example, a todo app might gain recurring tasks, keyboard shortcuts and saved filters as independent additions. Alternatively, due dates could lead to reminders, with keyboard shortcuts as the third addition. These are examples, not a prescribed feature list.

Count coherent capabilities, not implementation steps. Adding a database table, its API and its button is one feature. Do not pad the count by splitting a feature into fragments or adding scaffolding with no usable behaviour.

## Boundaries

The invocation authorises agent-chosen features. It does not override the user's constraints or the project's instructions, or grant permission to spend money, publish, contact others, access new accounts or make destructive changes.

If a candidate needs unavailable access or extra permission, choose another feasible addition. If a completed feature makes a later idea unnecessary, choose a different idea rather than forcing a chain.

If you cannot reach the requested count within the available constraints, preserve the working result and report the completed count and concrete blocker. Do not claim unfinished work as completed or silently reduce the count.

## Handoff

Report the original task's outcome, the numbered additions and what was actually verified. Include the project's required delivery artifacts and state any unfinished work plainly.
