# Publication and approval

## Discover the actual publishing path

Prefer authenticated, purpose-built connected publishing tools when available. A tool that can search or read a platform does not necessarily support publishing. Inspect the supported action, target account, upload flow, visibility options and result verification before offering to publish there.

If a required capability is missing, use available plugin discovery before claiming no integration exists or proposing manual work. A scheduler may provide a suitable path if it supports the user's destination and account type. Do not install, connect, purchase or change permissions merely to prepare a batch. Explain only the connection or action actually needed and continue independent work.

If a suitable connector is insufficient, use an available browser workflow under its applicable browser skill and tool contracts. Verify the signed-in identity and the target profile, Page or channel. Do not bypass authentication or platform restrictions. Ask the user to complete interactive login when needed without requesting their password or tokens in chat.

Do not hardcode endpoints, assumed connected accounts or publishing support for personal profiles, Pages, professional accounts or channels. Verify the selected account type. For integrations under development, treat unverified capabilities as pending rather than implemented.

## Approval must name a concrete package

The review package should make these facts unambiguous for each entry:

| Field | Required meaning |
| --- | --- |
| Entry and revision | A stable local identifier for the exact version being reviewed. |
| Destination | Platform and confirmed account identity. |
| Content | Exact copy, title, description and attachment order as applicable. |
| Media | Previewed final files and their revisions, including covers or thumbnails. |
| Publication settings | Visibility or audience and any meaningful platform-specific setting. |
| Action and timing | Publish now, upload a private draft, or schedule at a stated date, time and timezone. |
| Status | Ready for approval or the specific unresolved item. |

Use already confirmed defaults rather than repeatedly asking about routine settings. If visibility is not established, propose public visibility explicitly in the package for the user's approval. Do not select meaningful settings such as a video audience classification or paid partnership declaration without a factual basis; ask only if necessary.

An approval can cover the ready entries together. An entry blocked by an unresolved account or missing final media is not approved merely because the user approves the rest. If the user explicitly approves an exact entry despite a temporary connection problem, that approval can persist while the unchanged action is resumed; recheck timing and state first.

Examples:

- "Looks good, post them" after an unambiguous package approves that package's ready entries and stated action.
- "Only X and LinkedIn" approves only those reviewed entries if the reply clearly instructs publication.
- "Nice" or "great idea" alone is not an instruction to publish. Ask the short final publication question.
- "Change the last line, then post" requests a revised version. Show the changed entry and ask approval of the resulting copy before sending it. Do not reopen approval for unrelated unchanged entries.
- "Replace the last line with 'The PR is ready for feedback' and post them" authorizes that exact text correction to an otherwise reviewed package. Apply only that deterministic correction and proceed without another permission question. If the edit leaves ambiguity or needs creative rewriting, resolve the affected entry first.
- "Schedule for tomorrow" needs a resolved time and timezone before scheduling. A missing time is not permission to choose an arbitrary one.

Approval belongs to the reviewed artifact, including any explicitly authorized exact text correction, not to the skill, project or platform forever. Other later changes to an approved entry require review of that entry. Do not silently append hashtags, alter crops or replace thumbnails during publication.

## Execute and verify

1. Reconcile approvals with the latest package and asset files. Check that the account and timing still match. Do not substitute a different account if the selected one is unavailable.
2. Complete the approved upload and publication or scheduling operation. Private drafts and unpublished uploads still leave the local machine and need authorization. Do not enable automatic cross-posting to additional destinations.
3. Retain receipts as each action completes: account, entry revision, remote post or job ID, status and URL when available. Keep secrets out of the record.
4. Verify via a remote read, platform receipt or published page. Confirm destination, media, visibility and state. Report scheduled, processing and live states accurately. A local draft, successful upload or queued job does not establish a live post.
5. For an error or timeout, check remote state before retrying. Use supported idempotency or documented recovery. If the result cannot be determined, mark the entry unknown and stop retrying that entry to avoid duplicates; continue independently approved entries where possible.
6. Report each result separately with live links, confirmed schedule details, remaining processing or the actual failure and next action. Keep successful entries intact rather than reposting the whole batch after one failure.

Do not delete or replace a live post to recover an error without authorization. Scheduling approval is for the listed posts and times; it does not authorize a recurring automation. Return for approval before later edits or a new campaign.

## Resume without surprises

Use a small local campaign record, not a new service or database. Record the package revision, exact approved content and asset references, the user's approval scope and per-entry remote receipts. File hashes can help detect replacement of an approved asset where appropriate. A local status such as approved is a convenience, not evidence of consent without the corresponding user instruction.

On resuming after interruption, inspect both the conversation and record, then verify outstanding remote jobs or posts before taking action. If approval or delivery cannot be established, ask only about the unresolved entry. If a scheduled time has passed or the factual claim has become stale, present the proposed timing or content adjustment for approval.
