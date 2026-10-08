# SiteChrome Specification (alert bar, header, big logo, cart drawer, transition overlay)

## Overview
- **Target files:** `src/components/sites/cobfoods-com-3b75ee17/root-8a5edab2/SiteAlert.tsx`,
  `.../SiteHeader.tsx` (header + spacer + `.site-logo`), `.../SiteCart.tsx`, `.../SiteTransition.tsx`
- **Source markup:** `docs/research/cobfoods-com-3b75ee17/root-8a5edab2/markup/site-alert.jsx.txt`,
  `site-header.jsx.txt`, `site-logo.jsx.txt`, `site-cart.jsx.txt`, `site-transition.jsx.txt`
- **Original JS:** `raw/js/632698-data-site-alert.js` (SiteAlert), `raw/js/635703-data-site-cart.js` (SiteCart)
- **Screenshots:** `docs/design-references/cobfoods-com-3b75ee17/root-8a5edab2/desktop/d-00000.png` (top state),
  `desktop/d-00800.png` (scrolled down: header buttons + logo hidden, alert stays), `desktop/menu-open.png`,
  `states/cart-open.png`, `mobile/m-00000.png`
- **Interaction model:** scroll-driven visibility (pure CSS from body classes set by the scroll engine) + click (menu/cart).

## DOM Structure
Order in the page (siblings inside the scroll container, before `<main>`):
1. `div.site-alert__container.position-fixed.t-0 …` > `div.site-alert[data-site-alert]` > bg + `.site-alert__wrap` grid:
   center `.site-alert__alert` ("TRY OUR NEW CORN FREE CHIPS - <a>SHOP NOW</a>"), right `.site-alert__nav`
   with `.btn --link --link-no-underline` "SEARCH" (SearchIcon, `--icon-search`) and "ACCOUNT & SUBSCRIPTIONS" (AccountIcon, `--icon-account`).
2. `div#shopify-section-site-header.shopify-section.section-header` > `header#site-header.site-header.position-fixed.z-8000…`
   > `.site-header__wrap` with: MENU button (`.site-header__menuBtn`, aria-controls="site-nav"; green 102×95 flower
   bg svg + two letter wraps "MENU" (--closed) / "CLOSE" (--opened), one `<span class="site-header__menuBtn__letter">` per letter),
   SHOP NOW `.btn.site-header__shopBtn --sharing --sharing-inverted` (FlowerLargeBg, label `Shop<br/>now`, behavior "sharing"),
   CART button (`.site-header__cartBtn` aria-controls="site-cart"; letters CART / CLOSE (+ color-pink), cart count bubble
   `.site-header__cartCount.--empty`), account circle `.btn.site-header__accountBtn d-inline-flex d-lg-none --circle --circle-account-circle` (UserIcon, `--icon-user`).
   Then sibling `div.site-header__spacer.w-100.visibility-hidden[data-scroll-section]`.
3. `div.site-logo.position-fixed.z-7000` > `a` > big "Cob" logo svg (from site-logo markup).
4. `div#site-cart.site-cart.position-fixed.z-6000[data-site-cart][aria-hidden="true"]` > `.site-cart__backdrop` + `.site-cart__container`
   (scalloped cream drawer). Container content (the original fetches `/?view=cart`; empty state is):
   `<div class="ta-center site-cart__empty ff-heading fz-lg-32 m-0 tt-uppercase">Your cart is empty.</div>`
5. `div.site-transition …` (static, visibility hidden).

## Computed Styles (verification values from getComputedStyle, 1440px)
- Alert: height 40px, bg yellow #ffde17, text Subtil Grotesk 15px uppercase burgundy rgb(59,0,23); nav labels Obviously.
- MENU pill: 144×94, yellow, rotate(-9.69deg) (matrix(0.9857,-0.1683,…)), Obviously 40px/46px; at x=23,y=85.
- SHOP NOW flower: 108×101 at x=1172,y=82, rotate(-5deg), Obviously 24px yellow text on burgundy.
- CART oval: 99×65, burgundy bg, Obviously 24px yellow, rotate(4.86deg).
- All of the above come from site.css — do not hand-code them.

## States & Behaviors
### Hide on scroll (CSS only — already in site.css)
- Trigger: body classes from the scroll engine. `body.--js-scroll-min.--js-scroll-down` → `.site-header__wrap{opacity:.0001}` (transition opacity .35s linear) and buttons pointer-events none; scrolling up shows them again.
  `.site-logo` hidden when `--js-scroll-min` (desktop). Nothing to implement beyond correct markup.
### Menu button
- Click → `emitter.emit("SiteNav.toggle")` (SiteNav component owns open state, sets `body.--js-site-nav-opened`,
  `aria-expanded`, `is-active` on all `[aria-controls="site-nav"]` triggers). Letter fly-out/in, green flower scale-in and
  rotation are CSS keyed on `body.--js-site-nav-opened`. Hover: rotate -9.69° → 3.6° (CSS).
### Cart drawer (port of SiteCart)
- Triggers: elements with `aria-controls="site-cart"` (cart button, backdrop if it has it) and `emitter` event `"SiteCart.toggle"`.
- open(): body add `--js-site-cart-opened`; emit `"SiteScroll.stop"` and `"SiteCart.open"`; triggers get `aria-expanded="true"` + `is-active`;
  `#site-cart` aria-hidden="false" and class `--js-anim-playing`.
- close(): reverse; emit `"SiteCart.close"`; on container `transitionend` remove `--js-anim-playing` and emit `"SiteScroll.start"`.
- Escape closes. Listen to `"SiteNav.open"` → close. Clicking the backdrop closes.
- Cart count stays `--empty` (no backend).
### Site alert ticker (port of SiteAlert)
- On mount + resize: if `.site-alert__alert` width > `.site-alert__wrap` width → append a clone of the alert text into the wrap
  and add class `--js-ticker` to `.site-alert` (CSS `tickerText` 15s marquee); else remove clone/class. (Happens on mobile.)
- Nav-open color swap is CSS.
### Hover states
- `.btn --link` links: CSS. SHOP NOW: `behavior="sharing"` (flower spins). Cart label hover rotates (CSS).

## Assets
- Logo/flower SVGs inline in markup. Icons from `shared/icons`.

## Text Content (verbatim)
"TRY OUR NEW CORN FREE CHIPS - " + link "SHOP NOW" (href "/products/tortilla-chip-6-pack" — use markup href), "Search", "Account & Subscriptions", "MENU", "CLOSE", "Shop now", "CART", "Your cart is empty."

## Responsive Behavior
- ≥992px: big logo top-left behind MENU pill; alert 40px with right nav.
- <992px: alert 30px (marquee when overflowing), small logo + pills in a row, account circle visible (d-lg-none).
All handled by site.css given the original classes.
