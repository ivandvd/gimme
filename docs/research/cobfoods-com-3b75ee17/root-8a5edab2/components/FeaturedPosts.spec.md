# FeaturedPosts Specification (section 11 — "Our fave recipes" slider)

## Overview
- **Target file:** `src/components/sites/cobfoods-com-3b75ee17/root-8a5edab2/FeaturedPosts.tsx` (export `FeaturedPostsSection`)
- **Source markup:** `docs/research/cobfoods-com-3b75ee17/root-8a5edab2/markup/11-pb_row_featured_posts_nxdeU8.jsx.txt`
- **Original JS:** `raw/js/558662-pb-row-featured-posts__slider.js` (class `Ns`)
- **Screenshots:** `desktop/d-08800.png`, `states/recipes-hover-next.png` (pink flower arrow hovered), `states/recipes-page2.png`, mobile `m-05600.png`
- **Interaction model:** click-driven Swiper (arrows + pagination), touch swipe.

## DOM Structure
Port 1:1: title h2 "Our fave recipes"; `.pb-row-featured-posts__slider.swiper` > `.swiper-wrapper` > 6 slides each an `article/.post-preview`
linking to the post, with a flower-masked image: the markup contains an `<svg class="svg-mask position-absolute t-0 l-0 pointer-events-none">`
using `<use href="#svg-puff-mask-shape-a-path">` (the clip paths live in the page-level `SvgMasks`), the `<img>`, title `.btn__label`-styled span,
"Get cooking" `p.post-preview__more`. Prev/next buttons `--close --close-pink` (behavior "close", `FlowerSmallBg`, arrow icons) and pagination.
Keep every class, `clipPathUnits`, `href`/`xlinkHref` exactly as in the markup.

## States & Behaviors
`new Swiper(slider, { modules:[Navigation, Pagination], navigation:{ nextEl: ".pb-row-featured-posts__nextBtn", prevEl: ".pb-row-featured-posts__prevBtn" },
pagination:{ clickable:true, el: ".pb-row-featured-posts__pagination" }, slidesPerGroup:1, slidesPerView:1, slidesOffsetAfter:0, slidesOffsetBefore:0,
spaceBetween:0, speed:650, breakpoints:{ 768:{ slidesPerGroup:2, slidesPerView:2, spaceBetween:60 }, 1200:{ slidesPerGroup:2, slidesPerView:2, spaceBetween:105 } } })`
— pass the element refs (scoped to this section) rather than global selectors. Destroy with `destroy(true, false)` on unmount.
Hover on a post: image/title effects are CSS. Arrow hover: flower spin (Btn behavior "close"); disabled arrow at the ends is CSS (`swiper-button-disabled`).

## Content (from markup)
1. 3 Corn-Free Valentine's Day Treats — IMG_7827…_1800x.jpg
2. 4 Winning Super Bowl Snacks — IMG_7202_1800x.jpg
3. Cob Crispy Treats — COB-7848…_576x.jpg
4. Behind the label: What does “All Natural” REALLY Mean? — COB_BLOGUE01_1800x.jpg
5. 4 Deliciously Festive Corn-Free Cookie Recipes — food-photographer-jennifer-pallian…_1800x.jpg
6. 12 Tasty Corn-Free Snacks to Pack on Your Next Roadtrip — frank-van-hulst…_1800x.jpg
All with "Get cooking".

## Computed Styles (verification, 1440px)
Title Obviously 64px/64px uppercase; post titles Obviously 32px/32px 700; "Get cooking" Subtil Grotesk 16px uppercase; images 566×441 masked to a puff/flower shape.

## Responsive Behavior
<768px: 1 slide per view; 768–1199: 2 per view gap 60; ≥1200: gap 105.
