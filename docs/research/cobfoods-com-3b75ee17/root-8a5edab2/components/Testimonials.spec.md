# Testimonials Specification (section 13 — "20,000+ happy Cobstomers.")

## Overview
- **Target file:** `src/components/sites/cobfoods-com-3b75ee17/root-8a5edab2/Testimonials.tsx` (export `TestimonialsSection`)
- **Source markup:** `docs/research/cobfoods-com-3b75ee17/root-8a5edab2/markup/13-16546362357aa0a6fa.jsx.txt`
- **Original JS:** `raw/js/580160-pb-row-testimonials__slider.js` (class `La`, Swiper config `Da` below) + text-ticker
- **Screenshots:** `desktop/d-10400.png` (title + card tops), `desktop/d-11200.png` (cards: pink/green/blue rounded cards with staggered vertical offsets), mobile `m-06300.png`, `m-07000.png`
- **Interaction model:** desktop: time + wheel driven JS marquee that pauses on hover; <768px: Swiper (loop) instead.

## DOM Structure
Port 1:1. The markup contains both:
- a desktop ticker: original `div.text-ticker d-flex flex-nowrap align-items-center overflow-hidden --direction-both pb-row-testimonials__tickerWrap [data-text-ticker-pause-hover]`
  → replace with `<TextTicker className="d-flex flex-nowrap align-items-center overflow-hidden --direction-both pb-row-testimonials__tickerWrap" pauseOnHover>` whose child is the
  template content inside the original `.text-ticker__text` (the row of `figure.pb-row-testimonials__testimonial` cards with `blockquote` + `figcaption`).
  Drop the original junk aria-label.
- a mobile slider `.pb-row-testimonials__slider.swiper` (check the markup for exact structure / which one is hidden at which breakpoint via d-* classes).

## States & Behaviors
- Ticker: see TextTicker (leftward drift, wheel-reactive, paused while hovered).
- Slider (port of `La`): on mount and on resize — if `window.innerWidth < 768` create
  `new Swiper(slider, { modules:[Pagination], centeredSlides:false, freeMode:false, loop:true, slidesPerView:"auto", slidesOffsetAfter:16, slidesOffsetBefore:16,
  pagination:{ el: <this section's .swiper-pagination>, type:"bullets" }, spaceBetween:16, speed:450 })`; otherwise destroy it if it exists.
- Card colors/rotations/offsets are CSS (classes / --index vars in markup).

## Content (verbatim, 5 testimonials)
1. "My daughter has a corn allergy and I have yet to find a single brand where ALL flavors are corn-free until Cob. My daughter and I are SO excited. Each flavor is better than the last." — Dan S.
2. "Cob is absolutely AMAZING - I feel like it’s got this nuttiness to it that is even better than corn, my kids are obsessed and it’s totally toddler safe! We’ll be subscribing for sure." — Allie K.
3. "I’ve always loved popcorn, but hate that it gets stuck in my teeth so it’s never been my go-to snack at the office. Cob is perfect because it literally tastes JUST like popcorn, except it doesn’t get stuck in my teeth." — Emily B.
4. "Ok so I literally don’t know how I’ve lived without cacio e pepe flavored popcorn until now. O.M.G. this is freaking amazing. It tastes exactly like the pasta!!!!! You just have to try this flavor." — Kendall F.
5. "My son tried Cob at camp and told me I needed to buy it. I honestly think I’ve eaten more of the bags than he has lol. This stuff is seriously addictive. Can’t even decide which flavor is our favorite because they’re just that good." — Stephanie B.
(Use the markup's exact characters, including the `" … "` quote rendering.)

## Computed Styles (verification, 1440px)
Title Obviously 64px/64px uppercase; quotes Obviously 32px/32px uppercase centered; credits Subtil Grotesk 20px uppercase; cards ~518px wide, radius ~30px,
colors pink #ef98c1 / green #9aca3c / blue #8dc6ef.

## Responsive Behavior
<768px: swiper with 16px gaps/offsets, ticker paused via CSS. ≥768px: ticker.
