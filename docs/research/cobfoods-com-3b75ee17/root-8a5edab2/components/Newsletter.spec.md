# Newsletter Specification (section 15 newsletter row + site newsletter popup)

## Overview
- **Target files:** `src/components/sites/cobfoods-com-3b75ee17/root-8a5edab2/NewsletterRow.tsx` (export `NewsletterSection`),
  `.../SiteNewsletterPopup.tsx` (export `SiteNewsletterPopup`), `.../NewsletterForm.tsx` (shared form behavior used by both)
- **Source markup:** `docs/research/cobfoods-com-3b75ee17/root-8a5edab2/markup/15-165460923883509df4.jsx.txt` and `markup/site-newsletter.jsx.txt`
  (root `div#shopify-section-site-newsletter` > `div#site-newsletter.site-newsletter …[aria-hidden="true"]` with data-cookie-name, data-cookie-duration, data-minimum-scroll-distance)
- **Original JS:** `raw/js/461767-node_modulesform-serializeindexjs.js` (Newsletter form `dr`), `raw/js/652652-site-newsletter.js` (SiteNewsletter `zl`)
- **Screenshots:** `desktop/d-12000.png` (row: "TINY GRAIN. BIG INBOX ENERGY. GET 15% OFF YOUR FIRST ORDER.", email field, oval SIGN UP, two flower-masked photos, green & yellow stars),
  popup: `states/newsletter-popup.png`, `states/newsletter-popup-mobile.png` — appears once scrollY > 600 (data-minimum-scroll-distance), cookie name `cob-newsletter-modal-launch`. Description: centered card 600px wide, rounded 40px, top half photo
  (`COB_R2_coloring-16_1800x.jpg`) with white Obviously title "SUBSCRIBE TO OUR NEWSLETTER AND GET 15% OFF YOUR FIRST ORDER", orange flower badge "15%" top-left,
  yellow star right, burgundy flower close button (×) top-right, bottom cream half: "Plus, get the inside scoop on upcoming sales, new products, recipes & more!",
  pill email input + flower "JOIN NOW" button; dark translucent backdrop over the page. Mobile `m-08400.png`.
- **Interaction model:** row = static + scroll timeline/parallax; popup = scroll-triggered (distance) + click to close.

## DOM Structure
- Row (15): port 1:1. Decoration images `.pb-row-newsletter__decorationImg__box …[data-scroll][data-scroll-call="timeline"][data-timeline=…][data-timeline-native=""][data-scroll-target="#pb-row-newsletter-…"]`
  (the engine runs the timeline: rotate 0→±10deg, scale 1→1.125 with scroll), each image clipped by `svg.svg-mask` with `<use href="#svg-puff-mask-…-path">`;
  stars `.pb-row-newsletter__star --star-1|--star-2 … [data-scroll-speed][data-scroll-position="elementTop"]` with `StarIcon`-equivalent svg from markup;
  form `form.newsletter …` with email input, hidden fields, `.newsletter__loading`, `.newsletter__message[data-message]`, submit `Btn` `--cta --cta-oval` (behavior "cta", `CtaOvalBg`, label "Sign Up").
  Keep `data-scroll-speed`/`data-scroll-position`/offset attributes exactly; ids used as scroll targets must exist.
- Popup: port 1:1 including bg backdrop element with `aria-controls="site-newsletter"` triggers if present, close button (`--close`, behavior "close", `CloseIcon`), the title
  rendered with `SplitText as="h3" splitting="" data-text-animation="slidein-by-words"` (classes from markup), image, badge, star svgs, form (`--cta-oval` "Join now").

## States & Behaviors
### NewsletterForm (port of `dr`) — NO network request (clone has no backend):
on submit: preventDefault; add `--submitting`; after ~600ms simulate success: remove `--submitting`, add `--success`, set message element innerHTML to
`<h4 class="tt-uppercase m-0 lh-none fz-18 ff-body fw-400">{messageEl.dataset.message}</h4>`; after 1500ms emit `"SiteNewsletter.saveUserPreference"` (popup form also emits `"SiteNewsletter.close"`).
(Original posts to an external API; on error it shows "An error occured, try again later." with `--error` for 5s — implement the error path only for an empty/invalid email
if the input has no native `required` validation.)
### SiteNewsletterPopup (port of `zl`):
- Read `data-cookie-name`, `data-minimum-scroll-distance` from the element (values in markup).
- `useEmitter("SiteScroll.scroll", ({y}) => …)`: if `y > minimumScrollDistance` and `localStorage[cookieName]` value is not `"closed"` → visible
  (`aria-hidden="false"`); CSS animates it in. Wrap localStorage access in try/catch.
- Close triggers: elements `[aria-controls="site-newsletter"]` inside the popup and emitter `"SiteNewsletter.close"` → if visible: hide (`aria-hidden="true"`) and save preference
  `localStorage.setItem(cookieName, JSON.stringify({ value: "closed", host: location.host }))`. Also handle `"SiteNewsletter.saveUserPreference"`.

## Computed Styles (verification, 1440px)
Row title Obviously 64px/64px 700 uppercase centered; input pill ~395×70 cream (#f2efc9-ish) border; SIGN UP oval burgundy, yellow Obviously 18px.

## Responsive Behavior
CSS-driven.
