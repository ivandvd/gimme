# HeroSlider Specification (sections 00 "chips" and 01 "tins")

## Overview
- **Target files:** `src/components/sites/cobfoods-com-3b75ee17/root-8a5edab2/HeroSlider.tsx` (generic `pb-row-hero-slider` module)
  and `.../HeroSections.tsx` exporting `HeroChipsSection` (section 00, includes the video + "Snack like Novak" footer) and
  `HeroTinsSection` (section 01) with the real content.
- **Source markup:** `docs/research/cobfoods-com-3b75ee17/root-8a5edab2/markup/00-pb_row_hero_slider_hpQjUJ.jsx.txt`,
  `01-pb_row_hero_slider_BtYcDM.jsx.txt` (each is the whole `<section class="shopify-section layout-pb-row-hero-slider">`).
- **Original JS:** `raw/js/565423-pb-row-hero-slider__slider.js` (class `sa`) and `raw/js/562598-anon.js` (video helper `Qs`: play/pause).
- **Screenshots:** `desktop/d-00000.png`, `states/hero1-transition-350ms.png` (mid-transition: new media wipes in from the right
  via clip-path, bg color cross-fades), `states/hero1-slide2.png`, `states/hero1-slide3.png`, `desktop/d-00800.png` (video),
  `desktop/d-01600.png` (Snack like Novak footer), `states/hero2-slide1.png`, `states/hero2-slide2.png`, `states/hero2-slide3.png`,
  `desktop/d-02400.png`, `mobile/m-00000.png`, `mobile/m-00700.png`, `mobile/m-01400.png`
- **Interaction model:** click-driven (prev/next flower buttons + flower pagination bullets, touch swipe). No autoplay on this page
  (`data-autoplay="false"`). Footer video: scroll-driven play/pause.

## DOM Structure (keep exactly as markup)
`section.shopify-section` > `div.pb-row-wrapper[data-scroll-section][data-module-delay]` (style `--zindex: 0`) >
`div#pb-row-hero-slider-….pb-row.pb-row-hero-slider.d-grid --is-first[data-scroll][data-autoplay][data-autoplay-speed]`
(style `--footer-text-color/--footer-bg-color` on 00) containing:
- `.pb-row-hero-slider__slider.swiper[data-scroll][data-scroll-call="pb-row-hero-slider"][data-scroll-repeat]` > `.swiper-wrapper` >
  3 × `.pb-row-hero-slider__slide.swiper-slide.d-grid.grid-column-lg-2` (style `--slide-bg`, `--slide-text`, `--color-highlight`; first also `--is-first`):
  - `.pb-row-hero-slider__slide__content` (subtitle `<p>` with `<strong>20,000+</strong> COBSTOMERS` — only slides of section 00;
    title wrap + title (h1 in 00, h2 in 01) as **SplitText** with `data-splitting="wordsMask" data-text-animation="slidein-by-lines" data-scroll=""
    data-scroll-target=".pb-row-hero-slider__titleInviewSelector"` + aria-label; text `.wysiwyg`; CTA `Btn` `--cta --cta-medium` behavior "cta" with `CtaMediumBg`)
  - `.pb-row-hero-slider__slide__media` > `figure.pb-row-hero-slider__slide__bgImage` > `img.pb-row-hero-slider__slide__bgImg.image-as-background`
- `nav.pb-row-hero-slider__controls` > prev `Btn` (`pb-row-hero-slider__prevBtn pointer-events-all --close --close-yellow`, behavior "close",
  bg `FlowerSmallBg`, icon `ArrowLeftIcon` iconClass `--icon-arrow-left`, aria-label ""), next (same with arrow right),
  `div.pb-row-hero-slider__pagination.swiper-pagination.pointer-events-all` (Swiper fills bullets).
- `div.pb-row-hero-slider__titleInviewSelector.d-none` (scroll target for the titles).
- Section 00 only: `div.pb-row-hero-slider__imgWrap.overflow-hidden` > `video.w-100.pb-row-hero-slider__video.video-as-background`
  (data-src → `/sites/cobfoods-com-3b75ee17/root-8a5edab2/videos/hero-novak.mp4`, width 1440 height 740, muted autoPlay loop playsInline,
  disableremoteplayback, `data-scroll data-scroll-call="video" data-scroll-repeat="true"`), then
  `footer.pb-row-hero-slider__footer.container-fluid … bg-color-primary[data-scroll]` containing a `<Scallop className="--orientation-up --position-top --animation-right pb-row-hero-slider__footer__scallop color-primary" animation="right"
  scrollTarget="#pb-row-hero-slider-template--18900032094380__pb_row_hero_slider_hpQjUJ .pb-row-hero-slider__footer" scrollOffset="-200px,0" />`,
  h2 "SNACK LIKE <span.pb-row-hero-slider__footer__tennis><img icon-tennis.png/></span>NOVAK", paragraph, pink CTA (`--cta --cta-medium --cta-pink`),
  `.pb-row-hero-slider__footer__star.color-yellow` with `<StarIcon id="svg-star" />`.

## States & Behaviors
### Slider (port of `sa`)
- On mount create Swiper on `.pb-row-hero-slider__slider`:
  `new Swiper(slider, { modules: [Navigation, Pagination], loop: false, speed: 750, navigation: { nextEl, prevEl }, pagination: { el: paginationEl, type: "bullets", clickable: true }, virtualTranslate: true, on: { beforeTransitionStart, slideChange, init: slideChange, touchMove } })`.
  `virtualTranslate` means Swiper does not move the wrapper — all motion is CSS: active slide content fades in (`opacity var(--swiper-speed) linear`),
  media reveals with `clip-path: inset(0 0 0 100%) → inset(0 0 0 0)` (750ms cubic-bezier(.77,0,.175,1)), subtitle/text/CTA slide up after.
- Set `--swiper-speed: 750ms` on the `.pb-row-hero-slider` element (style).
- Direction class on the `.pb-row-hero-slider` element: `is-forward` initially; next click → `is-forward`, prev click → `is-backward`;
  on touchMove: `swiper.translate < swiper.previousTranslate ? "forward" : "backward"`. (Remove the other class.)
- slideChange (and init): set `--module-delay: 0ms` on the element; add `is-inview` to the active slide's `.pb-row-hero-slider__slide__title`
  and remove it from all other slide titles (so the word slide-up replays per slide).
- beforeTransitionStart: play the active slide's `.pb-row-hero-slider__slide__bgVideo` (none on this page) and pause others — keep the hook generic.
- Autoplay only if `data-autoplay="true"` (not on this page); if enabled it starts/stops on the `pb-row-hero-slider` scroll call.
- IMPORTANT: Swiper adds classes (`swiper-initialized`, `swiper-slide-active`, …) and inline widths to DOM nodes React rendered. Render the slides once
  (no state that re-renders slide markup) so React never fights Swiper. Destroy Swiper on unmount.
### Footer video (port of `Video`/`Qs`)
- On mount set `video.src = data-src`. `useScrollCall(videoRef, "video", s => s === "enter" ? play() : pause())`; play() guards with a pending promise like the original.
### Reveal animations
- Title words, footer scallop slide (translateY 50% → 0, 1.15s), footer text etc. are CSS keyed on `is-inview` from the scroll engine. Nothing to code.

## Per-State Content
Section 00 (chips) slides (bg / title / image):
1. `#f79054` "THE CHIP THAT CHANGES THE GAME" — `20260324_COB_ABatz_Capture_0372_v2_7_1800x.jpg`
2. `#ef98c1` "NEW NO. 1 FULLY LOADED CHIP" — `20260324_COB_ABatz_Capture_0372_v2_7_1800x.png`
3. `#f79054` "THE NEW NO. 1 BOUGIE BITE" — `20260324_COB_ABatz_Capture_0907_v1_3_1800x.jpg`
All: subtitle "20,000+ COBSTOMERS", text "Introducing Our Corn-Free Tortilla Chips.", CTA "Shop now" → /products/tortilla-chip-6-pack.
Section 01 (tins): "GAME. SET. <br/> SNACK." / "A POP OF JOY" / "<strong>Now playing</strong><br/> COB THEATER" — texts and images per markup.
(Take every value from the markup files — they are authoritative.)

## Computed Styles (verification, 1440px)
- Slide content padding-left 70px, title Obviously 64px/58.88px 700 uppercase burgundy; text Subtil Grotesk 24px/36px 500.
- Section 00 height 2280px (895 slider + video + footer), section 01 895px. Media column 713×895.
- Footer: yellow #ffde17 bg, "SNACK LIKE NOVAK" Obviously 64px/80px, paragraph Subtil Grotesk 48px/48px.

## Responsive Behavior
<992px: slide stacks (content on top centered, media below), arrows over the media; all CSS.
