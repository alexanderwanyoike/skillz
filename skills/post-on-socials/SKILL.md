---
name: post-on-socials
description: "Turns project work into platform-specific social posts and finished media previews, then publishes the versions the user approves. Use when the user asks to share a coding update, post on socials, prepare a project announcement, or invokes /post-on-socials or $post-on-socials. Finishing coding work alone does not authorize a social campaign."
license: MIT
---

# Post on socials

Make sharing a finished project update easy: reuse the coding context, prepare the copy and media, show the actual result, and publish only what the user approves. Own the preparation and tool choices; keep the user involved in meaningful creative decisions and final approval.

## Start from the work

- Reuse the conversation, relevant diffs, PR, release notes, verification results and existing assets. Do not ask the user to brief you again on information already available.
- Identify what changed, what viewers can now do and the best concrete demonstration. Distinguish implemented, manually verified, merged, released and publicly available. An open PR is not a release.
- Cover X, LinkedIn, TikTok, Facebook, Instagram, YouTube Shorts and YouTube by default. Respect a narrower requested scope and previously confirmed account mappings. Do not invent account handles or assume personal versus project accounts.
- Propose an angle and the smallest useful asset set, then proceed with reversible preparation. A small update might need one screenshot; a demonstration might need a shared vertical video and platform-specific text. Do not manufacture a long video or seven different assets to fill a checklist.
- Show every requested destination in the review, including any recommended omission or missing asset. Let the user decide whether to skip it; do not silently drop channels.
- Ask concise, bundled questions only for information that affects the outcome and cannot be inferred: an ambiguous account, missing recording, intended audience or a creative choice with substantially different results. Continue independent preparation while waiting.

## Voice and presentation

- Write as the user, with quiet confidence, curiosity and plain language. Focus on the project and what it does. Match supplied writing examples when available.
- Use restrained visuals, readable text and concrete demonstrations. Avoid hype, boastful ownership headlines, exaggerated reactions, giant exclamation headlines and neon or grunge styling.
- Prefer a title such as "Osiris / a first look" to "MY OWN LINUX?!". Never use the Unicode U+2014 character in authored content.
- Keep claims grounded in the work. Do not invent metrics, user feedback, availability, endorsements or personal feelings. Use hashtags, mentions and calls to action only when useful and appropriate to the user's voice.

## Prepare the posts and media

Read [platforms-and-media.md](references/platforms-and-media.md) when choosing formats, adapting copy or producing assets.

- Choose and operate available tools yourself. Prefer existing screenshots and genuine demonstrations when they communicate the update well. Generate art when it contributes to the story.
- Use the user's Prezi application for Remotion slideshows and narrated sequences when available, Forgecut for video editing, and Clipforge when its actual capabilities fit. Discover the current tools and project context rather than assuming a particular integration exists.
- For narration, prepare the script, sequence and recording instructions before requesting the user's voice recording. Continue other work while it is pending. Do not substitute an artificial version of the user's voice without explicit permission.
- Finish and inspect the actual exports. Show images inline and video through a playable preview supported by the host. A script, storyboard, contact sheet or thumbnail alone is not approval of a finished video.
- Make destination-specific titles, body text, captions, alt text, descriptions, thumbnails and subtitles where relevant. Preserve the same factual story across versions.
- Reuse existing authorized account mappings. Discover publishing capabilities early enough to surface a real blocker, but keep drafting and producing assets. Do not make integration setup the user's first task when preparation can proceed.

## Present one review package

Use a concise overview with one entry per destination, followed by the exact copy and actual media previews. Include:

- A package identifier and revision, the project update and its implementation or release status.
- Each platform, confirmed account or unresolved account choice, content format, exact text, attachment filenames and revisions, and relevant cover, thumbnail, caption or subtitle options.
- The proposed action and timing: publish now, or a specific date, time and timezone for scheduling. List omissions and blockers alongside ready posts.
- Readiness per entry: ready for approval, needs narration or another asset, or blocked by a connection. Never imply that a draft or queued upload is live.

Let the user approve the entire ready batch in one response, approve selected entries or request changes. Ask a direct final question such as: "Publish package v1 to the listed accounts now, or make changes?" A request to prepare posts is not publication approval.

## Approve, publish and confirm

Read [publishing.md](references/publishing.md) before any external upload, scheduling or publication action.

- Approval binds the exact reviewed copy, media, accounts, visibility and timing. "Looks good, post them" approves an unambiguous reviewed batch. General enthusiasm, previous campaign approvals and the skill invocation do not approve a new batch.
- If a change affects copy, assets, destination, visibility or timing, show the revised affected entries and obtain approval for those versions. Keep approvals for unchanged entries. If the user supplies an exact final text replacement and explicitly says to publish it, that instruction approves the deterministic correction; do not ask again. A general rewrite request does not approve unseen wording or newly rendered media.
- Prepare local previews freely. Uploading to a platform, even as a private draft, requires authorization for that upload. An explicitly approved publication includes the uploads needed to carry it out.
- Execute only approved, ready entries using authenticated publishing tools or an appropriate authorized browser workflow. Honor tool and account access requirements. Do not repeatedly ask for permission after the user has approved the exact action.
- Track each entry through prepared, approved, submitted, processing, published, scheduled, failed or unknown. Verify the remote result and avoid duplicate retries when delivery is uncertain.
- Return per-platform live links or confirmed schedule details, plus any failures or unfinished processing. Do not claim success from an attempted action alone.
- Posting approval does not authorize replies, DMs, community management, recurring automation, paid promotion, profile edits or publication of future updates.

## Keep it easy to resume

For a multi-step campaign, keep a small local record with the review package, exact asset references, approvals and per-platform receipts. Use the project's artifact conventions or `work/socials/<package>/` for preparation and `outputs/socials/<package>/` for finished deliverables. Do not store credentials in the package or add campaign assets to a coding PR unless requested.

On resuming, reconcile the record with the conversation and remote state before sending anything. If the approved version cannot be established, show the affected preview again. Reuse confirmed preferences within their stated scope; changing the skill or unrelated configuration is not part of a posting run.
