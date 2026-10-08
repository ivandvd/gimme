# Builder rules (shared by every cobfoods.com component spec)

Project: `C:\Users\Ivan\Desktop\cobfoods-clone` — Next.js 16 App Router, React 19, TypeScript strict.
Shell: Git Bash available (use POSIX syntax) — or PowerShell.

## Styling model (critical)
- The ORIGINAL site stylesheet is loaded globally: `src/styles/sites/cobfoods-com-3b75ee17/site.css`.
  Every computed value (fonts Obviously / Subtil Grotesk, colors, spacing, breakpoints, keyframes,
  reveal transitions) comes from it. **Do not write CSS, CSS modules or Tailwind classes.** Reproduce the
  original DOM with the original class names and you get pixel-exact styling at every breakpoint.
- Tailwind class detection is disabled for `src/components/sites/**` on purpose (the theme's `mt-10`,
  `w-100`… collide with Tailwind's). Never add Tailwind utilities.
- Inline `style` only where the source markup has it (CSS custom properties like `--slide-bg`) or where a
  ported JS behavior writes styles at runtime.

## Source markup
Each spec names a `markup/<file>.jsx.txt`: the server-rendered HTML of that section, machine-converted to
JSX (className, SVG camelCase props, style objects, local asset URLs already rewritten to
`/sites/cobfoods-com-3b75ee17/...`). **Port it 1:1** — same element tree, classes, attributes and text.
- Keep `data-scroll`, `data-scroll-*`, `data-module-delay`, `aria-*`, `id`s.
- Drop `data-module` / `data-buttons` attributes from raw markup when you replace a `.btn` with the shared
  `<Btn>` (Btn writes `data-buttons` itself). Other `data-module` attributes may stay (harmless).
- Prefer data arrays + `.map()` for repeated items (slides, cards) but keep the produced DOM identical.
- `{...{ disableremoteplayback: "" }}` spreads are intentional (attribute unknown to React's TS types).
- Use plain `<img>` (not next/image). Put `/* eslint-disable @next/next/no-img-element */` at the top of files that use it.
- Links: keep the original hrefs (they point to cobfoods.com paths; that's fine for the clone).

## Shared primitives (import from `@/components/sites/cobfoods-com-3b75ee17/shared/...`)
- `Btn` (`shared/Btn`): `<Btn href? className="<classes after btn>" behavior="cta"|"close"|"sharing"|"social"|"none" bg={...} label={...} icon={...} iconClass="--icon-arrow-left" aria-label=... />`
  renders `<a|button class="btn …" data-buttons=…><span class="btn__bg">bg</span><span class="btn__label">label</span>[<span class="btn__icon {iconClass} d-inline-block">icon</span>]</a|button>`
  and attaches the hover behaviors (CTA circles orbit / flower spin / social sparkles). Any extra props
  (disabled, onClick, aria-*, data-*) pass through. Without `href` it renders `<button type="button">`.
- Icons (`shared/icons`): `ArrowLeftIcon, ArrowRightIcon, CloseIcon, SearchIcon, AccountIcon, UserIcon,
  TikTokIcon, FacebookIcon, InstagramIcon, StarIcon, FlowerSmallBg` (48×50 bg of --close buttons),
  `FlowerLargeBg` (100×93 bg of --sharing), `CtaMediumBg` (208×111 scalloped pill), `CtaOvalBg` (104×81).
- `Scallop` (`shared/Scallop`): `<Scallop className="--orientation-up --position-top --animation-left pb-row-scallop" color="#3b0017" animation="left" scrollTarget? scrollOffset? scrollDriven? ref? />`
  renders the theme's `.scallop` div + canvas, paints the wave, starts/stops its CSS animation via the
  `scallop` scroll call. For color-class driven scallops (e.g. `color-primary`) omit `color` and put the
  class in className. `scrollDriven={false}` + ref `.start()/.stop()` for manual control.
- `SplitText` (`shared/SplitText`): `<SplitText as="h2" className="…" data-scroll="" data-text-animation="slidein-by-lines" … leading={unsplitNode}>{children}</SplitText>`
  reproduces Splitting.js output (`.word > .wordText`, `.whitespace`, `--word-index`, measured `--line-index`,
  container classes `words lines wordsMask splitting`). Children may include `<strong>`, `<br />`, `<img>`, icon spans.
  Use it wherever the source markup has `data-splitting`. Pass the original classes WITHOUT
  "words lines wordsMask splitting" (it adds them).
- `TextTicker` (`shared/TextTicker`): JS marquee; `<TextTicker className="d-flex … --direction-both …" pauseOnHover>{templateContent}</TextTicker>`.
- Hooks (`shared/hooks`): `useScrollCall(ref, "callName", (state, item) => …)` where state is
  `"enter" | "exit"` (constants `ENTER`/`EXIT` in `shared/site-scroll`); `useEmitter("Event.name", handler)`.
- `emitter` (`shared/emitter`): global bus — `emitter.emit("SiteNav.toggle")`, `"SiteCart.toggle"`, etc.
- `siteScroll` (`shared/site-scroll`): engine singleton (`siteScroll.update()` after DOM changes that
  move `[data-scroll]` elements; `siteScroll.scrollTo(...)`). The engine scans `[data-scroll]` once after the
  page loader, so render all scroll elements on first render (no lazy mounting).
- `isTouchDevice()` (`shared/device`) = the theme's mobile-UA flag (`De`): hover effects are skipped on touch.
- Swiper is installed (`swiper@11`, `import Swiper from "swiper"; import { Navigation, Pagination } from "swiper/modules";`).
  Swiper's core CSS is already inside site.css — do NOT import swiper CSS files. Instantiate Swiper
  imperatively in `useEffect` on the original `.swiper` element (class names must match the theme).

## Process
1. Read your source markup file(s) and screenshots (paths in the spec) with the Read tool.
2. Write ONLY your target file(s). Do not edit shared files, `src/app/*`, or other builders' components —
   if you need a shared change, describe it in your final report instead.
3. Verify types: `cd /c/Users/Ivan/Desktop/cobfoods-clone && npx tsc --noEmit 2>&1 | grep -i "<YourFileName>"`
   must print nothing for your files (other builders work in parallel; ignore errors in their files).
   Also run `npx eslint <your files>` and fix errors.
4. Do NOT run `npm run build`, `npm run dev`, git commands, or the Playwright browser.
5. Final report: files written, exported component names + props, anything you could not reproduce.
