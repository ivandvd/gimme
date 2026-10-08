# UgcContent Specification (section 03 — "Join the 20,000+ Cobstomers" video cards)

## Overview
- **Target file:** `src/components/sites/cobfoods-com-3b75ee17/root-8a5edab2/UgcContent.tsx` (export `UgcContentSection`)
- **Source markup:** `docs/research/cobfoods-com-3b75ee17/root-8a5edab2/markup/03-pb_row_ugc_content_nPD9xJ.jsx.txt`
- **Original JS:** `raw/js/582425-pb-row-ugc-content__slider.js` + `raw/js/583974-swiper-slide.js` (classes `ja` slider, `Ga` video card)
- **Screenshots:** `desktop/d-04000.png` (header), `desktop/d-04800.png` (cards), `states/ugc-hover-1.png` (hover preview playing), `mobile/m-02800.png`, `mobile/m-03500.png`
- **Interaction model:** click (play) + hover (preview) + Swiper (navigation on small screens).

## DOM Structure
Port 1:1: header with rating stars svg + "600+ reviews", title h2 "JOIN THE <strong>20,000+</strong> COBSTOMERS", text paragraph;
`.pb-row-ugc-content__slider.swiper` > `.swiper-wrapper` > 3 slides each containing `.pb-row-ugc-content__card` (data-preview-src if present)
with poster `<img>`, `video.pb-row-ugc-content__card__previewVideo` (muted playsInline preload="none" loop, no src initially),
`video.pb-row-ugc-content__card__video` (src + poster), play button `.pb-row-ugc-content__card__playBtn` with play icon svg,
`progress.pb-row-ugc-content__card__progress` if in markup; nav prev/next (`--close` flower Btns, behavior "close") and pagination; disclaimer `<p>`.
Video sources are already rewritten to `/sites/cobfoods-com-3b75ee17/root-8a5edab2/videos/ugc-*.mp4` in the markup — keep them.

## States & Behaviors
### Slider (port of `ja`)
`new Swiper(slider, { modules:[Navigation, Pagination], speed: 500, slidesPerView: 1, spaceBetween: 0, slidesOffsetBefore: 0, slidesOffsetAfter: 0,
navigation:{ nextEl, prevEl }, pagination:{ el, type:"bullets", clickable:true },
breakpoints:{ 768:{ rewind:true, slidesPerView:"auto", spaceBetween:10 }, 1024:{ spaceBetween:20, rewind:true, slidesPerView:"auto" } },
on:{ slideChange: stopAll } })`. Each card's closest `.swiper-slide` gets `--index: i`.
### Video card (port of `Ga`), a local event bus `stopAll` shared by cards:
- Play button click: stopAll (other cards); `video.muted = false`; card class `--playing`; `video.play()`; start a raf updating
  `progress.value = currentTime / duration * 100`.
- Click on the playing video, or `ended`: stop → cancel raf, `progress.value = 0`, `video.pause()`, `muted = true`, `currentTime = 0`, remove `--playing`.
- Desktop only (not touch) hover: mouseenter (if not `--playing`): if preview video has no src and card has `data-preview-src`, set it;
  add `--previewing`; `previewVideo.play()`. mouseleave (if not playing): pause preview, remove `--previewing`.
- stopAll = stop preview + stop video on every card.
Visual states (poster hide, play icon fade, progress bar) are CSS keyed on `--playing` / `--previewing`.

## Computed Styles (verification, 1440px)
- Rating label Obviously 20px uppercase; title Obviously 64px/64px 700 with pink (#ef98c1) 900 weight "20,000+"; text Subtil Grotesk 24px/36px.
- Cards 296×527, radius ~10px, play icon 80×80; disclaimer 14px/17.5px centered.

## Responsive Behavior
<768px: 1 slide per view with pagination bullets; ≥768 auto-width slides. CSS + Swiper breakpoints.
