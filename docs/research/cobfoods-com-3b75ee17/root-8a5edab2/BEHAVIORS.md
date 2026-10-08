# cobfoods.com — Behavior bible

Source: live site inspected 2026-10-08 with Playwright (1440×900, 768×1024, 390×844), the theme's
`style.css` (t/12) and `app.bundle.js` (MILL3 "windmill" theme). Module source excerpts live in
`raw/js/*.js` (named `<bundle offset>-<first selector>.js`).

## Global

| Behavior | Trigger | Detail |
|---|---|---|
| Page loader | load | `.site-loader` (pale yellow, z 10000) covers the page; once fonts are ready the first-viewport `[data-module-delay]` elements get `--module-delay` 0/350/700ms…, loader fades opacity 1→0 in 250ms linear and is removed, then the scroll engine starts. |
| Smooth wheel | wheel (non-touch UA) | Native scroll, but wheel deltas are intercepted: target += −wheelDeltaY × (Windows 1 : others 0.4; Firefox ×2.25 non-Windows) and window.scrollTo lerps toward it at 0.1/frame (60fps-normalised). Touch UAs: plain native. `html.has-scroll-smooth` vs `has-scroll-native`. |
| Reveal on scroll | `[data-scroll]` enters viewport | adds `is-inview` (Locomotive-v4 semantics: `data-scroll-offset="top,bottom"`, `data-scroll-target`, `data-scroll-repeat` (empty = true)). All reveal transitions are CSS in the original stylesheet keyed on `html.has-scroll-init … [data-scroll].is-inview`. |
| Scroll calls | enter/exit | `data-scroll-call="x"` emits `SiteScroll.x` ("enter"/"exit"). Used by: scallop (start/stop wave), video (play/pause), text-ticker (animate only in view), pb-row-hero-slider (autoplay — disabled on this page), timeline, svg-animated, site-footer. |
| Parallax | scroll | `data-scroll-speed=s`: translateY = (scrollY + vh/2 − elementMiddle) × −0.1s, written as matrix3d, only while in view. `data-scroll-position="top"` uses scrollY × −0.1s. |
| Timeline | scroll | newsletter flower images: `data-timeline="{'rotate':[±10],'scale':[1.125]}"` seeked by progress `1 − clamp(0,r,bottom−scrollY)/r`, `r = min(bottom, vh + bottom − top)`. Disabled on touch (`data-timeline-native=""`). |
| Body scroll classes | scroll | `--js-scroll-down` / `--js-scroll-up` (direction), `--js-scroll-min` when scrollY > 200. Header buttons fade (opacity .0001, .35s linear) when `--js-scroll-min.--js-scroll-down`; reappear on scroll up. Big logo (`.site-logo`) hides whenever `--js-scroll-min` (desktop). |
| Site alert | always | Fixed yellow bar (40px desktop / 30px mobile) "TRY OUR NEW CORN FREE CHIPS - SHOP NOW" + Search / Account links (desktop). When the text overflows (mobile) it gets `--js-ticker` → CSS `tickerText` 15s marquee. Turns burgundy with yellow text when the nav opens. |
| Newsletter popup | scrollY > `data-minimum-scroll-distance` | `#site-newsletter` aria-hidden false → modal "SUBSCRIBE TO OUR NEWSLETTER AND GET 15% OFF YOUR FIRST ORDER" (image, 15% badge, star). Close/submit stores `localStorage[cookieName] = {value:"closed"}` and never shows again. |
| Hover: CTA pills | hover (desktop) | scalloped pill: 24 circles orbit the outline (30s/loop; oval 8 circles 10s/loop), paused on leave. |
| Hover: flower buttons | hover | prev/next/close flower bg spins (velocity ramps to 1°/frame), eases to next multiple of 60° on leave. |
| Hover: social icons | hover (desktop) | sparkles (4 colored 4-point stars) pop above the icon every 750ms. |
| Hover: menu/cart labels | hover | MENU pill rotates −9.69° → 3.6°; CART label 4.86° → −4.86° (0.4s ease). |

## Header / nav
- MENU click: `body.--js-site-nav-opened`, `html.--js-scrollbar-hidden`; nav yellow panel wipes in with scallop edges, giant links "Products / Merch / Our Story / Contact / FAQ", MY ACCOUNT, email + socials, blue flower decorations that drift with the mouse (raf). MENU letters fly out and CLOSE letters fly in (CSS). Esc closes. Scroll position restored on close.
- CART click: opens `#site-cart` drawer (empty-cart state).

## Sections (top → bottom)
1. **Hero slider #1** (`pb-row-hero-slider`, click-driven Swiper, speed 750, no autoplay, `virtualTranslate` — slides cross-fade/clip via CSS keyed on `swiper-slide-active` + `is-forward/is-backward`). 3 slides (orange/pink/orange bg, product images right). Prev/next flower arrows (yellow), flower-bullet pagination. Title words slide up by line when the slide becomes active. Footer: full-width autoplay muted loop video (Novak with popcorn) that plays only in view; yellow footer with animated scallop top edge (translateY 50%→0 on reveal), "SNACK LIKE [tennis player] NOVAK" + paragraph + pink CTA + green star.
2. **Hero slider #2** (same module): 3 tin slides (Game. Set. Snack. / A pop of joy / Now playing Cob Theater).
3. **Featured products**: giant Subtil Grotesk title "CORN-FREE ★ SNACKS 🍿 MADE WITH ANCIENT SUPERGRAIN POPPED SORGHUM" with "Subscribe & Save 20%" pill moved into the title; popcorn group images with parallax (speed ±1); 4 product cards — bag image, hover swaps to lifestyle "rollover" image; type, title, yellow CTA.
4. **UGC content**: rating stars "600+ REVIEWS", "JOIN THE 20,000+ COBSTOMERS", text, 3 vertical video cards (hover = muted preview video, click play = unmuted full video with progress bar; one playing at a time), Swiper on mobile, disclaimer.
5. Scallop (burgundy) → **Sorghum** (burgundy bg, green "THE GRAIN WITH GAME", 4 benefit columns).
6. Scallop (green) → **Text simple** (green bg, title, rich text, yellow CTA "OUR STORY").
7. Scallop (inset, green, bottom) → **Medias** (full-width photo, parallax speed 0.5, top edge cut by the scallop).
8. **Partners** "POPPED ON" logo marquee (JS ticker, wheel-reactive).
9. **Featured posts** "OUR FAVE RECIPES": Swiper (speed 650; 2 per view ≥768 with 60/105px gap), flower-masked images, pink flower arrows.
10. **Nutrition chart**: "SORGHUM > EVERYTHING ELSE" + chart image.
11. **Testimonials**: "20,000+ HAPPY COBSTOMERS." + colored rounded cards in a JS ticker (pause on hover); Swiper (loop, auto width) under 768px.
12. **Newsletter**: "TINY GRAIN. BIG INBOX ENERGY. GET 15% OFF YOUR FIRST ORDER." email + oval "SIGN UP"; two flower-masked photos rotating/scaling with scroll; green/yellow stars with parallax.
13. **Footer**: pink, rotating "SORGHUM SUPERGRAIN" badge, giant Cob logo, link columns, burgundy scallop band, email + socials, legal links, payment icons. Adds `body.--js-site-footer-visible` while in view.

## Responsive
- ≥992px: two-column hero slides (text left / media right), header MENU/SHOP NOW/CART bubbles + big logo.
- <992px: hero stacks (text top, media below), small header (logo, MENU, SHOP NOW, CART, account circle), alert ticker.
- <768px: product grid 2×2, UGC swiper, testimonials swiper, scallops use 5 bumps.
