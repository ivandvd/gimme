# FeaturedProducts Specification (section 02 — "Corn-free snacks made with ancient supergrain popped sorghum")

## Overview
- **Target file:** `src/components/sites/cobfoods-com-3b75ee17/root-8a5edab2/FeaturedProducts.tsx` (export `FeaturedProductsSection`)
- **Source markup:** `docs/research/cobfoods-com-3b75ee17/root-8a5edab2/markup/02-1654699522c2b4e23c.jsx.txt`
- **Original JS:** module `PbRowFeaturedProducts` (`$s`): on start it moves `.pb-row-featured-products__subtitle.pill` into
  `.pb-row-featured-products__title` as its FIRST child (after Splitting ran, so the pill text is not split).
- **Screenshots:** `desktop/d-03200.png`, `desktop/d-04000.png`, `states/products-default.png`, `states/products-hover-2.png`,
  `mobile/m-02100.png`, `mobile/m-02800.png`
- **Interaction model:** static + scroll reveals + parallax popcorn + CSS hover on cards.

## DOM Structure
Port the markup 1:1. Key parts:
- Header: `h2.pb-row-featured-products__title …` → `SplitText as="h2"` with the markup's classes and attributes
  (`data-scroll data-scroll-offset="200px,0" data-text-animation="slidein-by-lines"`), children = the title content
  ("Corn-free ", green star span with `StarIcon id="svg-star"` — keep the wrapping span classes —, `<br/>`, "SNACKS", popcorn `<img>`, "made with ", `<br/>`,
  "ancient supergrain", `<br/>`, "popped sorghum") and `leading={<pill span …>}` = the `span.pill … pb-row-featured-products__subtitle …`
  ("Subscribe & Save 20%") so it renders as the first child, unsplit (do NOT also render it where the markup has it).
- The two popcorn group `<img>`s keep `data-scroll data-scroll-speed="1"` / `"-1"` (parallax handled by the engine).
- "SHOP ALL" CTA: `Btn href="/collections/all" className="pb-row-featured-products__cta order-3 d-none d-md-flex align-self-center --cta --cta-medium" behavior="cta" bg={<CtaMediumBg/>} label="Shop all" aria-label="Shop all"`.
  (Also any mobile duplicate CTA in the markup — port all.)
- Product grid: 4 × `.product-preview-compact` cards: image wrap with main bag image + `.product-preview-compact__imgHover` rollover image,
  type "Popped Sorghum", title `<span class="d-inline">…</span>`, CTA `--cta --cta-medium --cta-inverted` "Shop Now". Map from a data array.

## States & Behaviors
- Card hover (CSS, already in site.css): rollover image fades in (opacity .2s) and scales 1.1 → 1 (.95s cubic-bezier(.215,.61,.355,1)); title gets an underline (background-size). CTA circles orbit (Btn).
- Reveals: title words slide up by line on `is-inview`; cards fade/slide per site.css.
- Parallax: popcorn groups move ±0.1px per scrolled px relative to viewport center (engine).

## Per-item Content
1. Olive Oil Pink Salt — `Cob_Popped-1oz_Renderings_OOPS-Front-1-1_1800x.png` / hover `OOPS_Rollover_1800x.png`
2. Seriously Cheesy — `…-Front-3-1_1800x.png` / `COB_R2_coloring-18-SeriouslyCheesy_1800x.jpg`
3. Cacio E Pepe — `…-Front-2-1_1800x.png` / `CEP_Rollover_1800x.png`
4. Mediterranean Herb — `…-Front-4-1_1800x.png` / `MedHerb_Rollover_1800x.png`
(hrefs, alts and exact classes from the markup).

## Computed Styles (verification, 1440px)
- Title Subtil Grotesk 100px/90px uppercase burgundy, centered; pill Obviously 24px yellow bg rotated.
- Card image 349×465 (hover image 384×511), type 14px uppercase, title Obviously 36px/36px 700.

## Responsive Behavior
<768px: 2×2 grid, title 28px, SHOP ALL hidden (d-none d-md-flex). All CSS.
