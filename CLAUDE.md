# Portfolio — Content Guardrails

Guidance for writing and publishing new blog posts on this site. Grounded in real Google Search Console performance data reviewed 2026-07-26, not guesswork.

## Where posts live (mechanical)

- Each post is its own file: `lib/posts/<slug>.ts`, exporting a default object matching the `BlogPost` type in `lib/blog.ts`.
- Wire every new post into `lib/blog.ts`: add the import at the top, add the variable to the `blogPosts` array. The sitemap (`app/sitemap.ts`) and blog listing pick it up automatically — nothing else needs touching.
- `slug` field must match the filename exactly, kebab-case.
- `id`: next unused integer as a string — check the highest existing `id:` across `lib/posts/*.ts` first, don't reuse one.
- Run `npx tsc --noEmit -p .` before considering the post done.

## What actually performs — the top 4 posts by clicks/impressions (28-day GSC window, checked 2026-07-26)

1. `multi-user-role-authorization-enums-aspnetcore` — 4 clicks / 411 impressions
2. `swagger-unit-testing-bearer-token-csharp-dotnet` — 4 clicks / 332 impressions
3. `building-reusable-components-nextjs` — 3 clicks / 486 impressions
4. `2fa-qr-code-totp-aspnetcore-csharp` — 2 clicks / 143 impressions

**All four are pure "how to implement X" reference/tutorial posts — none of them are the incident/war-story style posts** (e.g. "DLL Deployment Failed," "Migrating a Domain from Tucows," "SQL Video Cleanup"). Those war-story posts are fine as supporting content and read well, but none of them are proven traffic performers. When picking the angle for a new post, default to "how to implement X," not "here's an incident that happened to me."

Three of the four are ASP.NET Core / .NET auth-and-security topics; the Next.js post is the only frontend post in the top 4. That's a hypothesis worth acting on (write more .NET auth/security tutorials), not a hard rule — it's 4 data points. Re-check this once more posts have had a few months to accumulate impressions.

## The formula, extracted from all 4 top posts — follow this structure by default

1. **Title**: `How to [specific verb] [specific thing] in/with [named framework]`. Name the exact technology (ASP.NET Core, Next.js, .NET) — never a vague category. This is what makes the title match a literal search query.
2. **Excerpt**: exactly two sentences.
   - Sentence 1 states the concrete pain/failure mode — what actually breaks ("every request returns 401," "access rules scattered across if statements"), not an abstract concern.
   - Sentence 2 starts with "Here is..." and promises a specific, complete deliverable ("the full setup that handles both correctly," "a complete, copy-paste walkthrough").
3. **Opening H2**: frames *why this matters* — "Why X Belongs in Every Serious Application," "The Problem With Ad-Hoc Y" — not a throat-clearing intro paragraph. Establish the cost of getting it wrong before showing how to get it right.
4. **Body**: numbered `Step N — [action]` H3s (or clearly sequential H2s) that build in the order a real implementation happens. Every step gets a **complete, runnable code block** — a full class/method, not a fragment. Code comments explain *why* (`// must come before UseAuthorization`), never *what*.
5. **Closing synthesis H2** near the end that zooms out: "Putting It All Together," "Why This Setup Pays Off," "Security Notes Worth Highlighting." This is where the post earns trust by showing you understand the tradeoffs, not just the steps.
6. **Implementation checklist**: a skimmable bulleted list near the very end summarizing every decision point. Include this for anything over ~7 min read.
7. **Closing paragraph — always three parts, in this order, every time:**
   - 1–2 contextual links to *related existing posts on this site*, named specifically ("For the JWT layer this sits on top of, see the post on JWT authentication in C#") — never a bare "read more."
   - One link to the single most relevant `/services/<slug>` page. Check `app/services/` for what actually exists before linking — don't invent a slug.
   - A `/contact` link.

   This closing formula is in all 4 top performers without exception, and it's also how the site's internal-link graph gets built — service pages with weak internal linking have historically ended up in Google's "Crawled — currently not indexed" bucket (see `services/react-nextjs-development` and `services/fullstack-web-development` history). Don't skip this step.
8. **Tags**: 5–7 tags — the primary language/framework, the specific feature, and one broader category (e.g. `.NET`, `Authorization`, `Backend`). Avoid generic single-word tags with nothing else backing them up.
9. **Read time**: the top 4 run 5–10 min. Don't pad for length, but don't ship something thin either — the checklist/synthesis section is what makes a longer read earn its keep.
10. **Voice**: short, declarative sentences. Confident, no hedging ("Store the integer, display the name," not "you might want to consider storing the integer"). One line near the end stating you apply this pattern on real client work — it's what makes the CTA that follows feel earned instead of bolted on.

## Before publishing a new post

- [ ] Title follows `How to X in/with [named framework]` (or there's a clear reason not to)
- [ ] Excerpt is exactly 2 sentences: concrete pain, then "Here is..." promise
- [ ] Opens with a "why this matters" H2, not a generic intro
- [ ] Every code block is complete and runnable, not a fragment
- [ ] Closing paragraph links, in order: related post(s) → relevant `/services/` page → `/contact`
- [ ] Added to `lib/blog.ts` (import + array entry)
- [ ] `npx tsc --noEmit -p .` passes
- [ ] After pushing, add the new post's URL to the GSC indexing tracker — new posts sit un-indexed for weeks otherwise (see project memory on indexing backlog)
