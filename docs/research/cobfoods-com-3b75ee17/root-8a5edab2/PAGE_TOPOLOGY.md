# cobfoods.com — Page topology (desktop 1440px, document height ≈ 13,490px)

```
body.index.--site-alert-activated.--logo-retracted
├─ .site-loader                    fixed overlay, removed after boot          [SiteRuntime]
├─ .site-transition                fixed, visibility hidden (page transitions) [SiteChrome]
├─ div > div[data-scroll-container]
│  ├─ .site-alert__container       fixed top bar, z above header              [SiteAlert]
│  ├─ #shopify-section-site-header header.site-header (fixed, 100vh, pointer-events none) + spacer   [SiteHeader]
│  ├─ .site-logo                   fixed big "Cob" logo, z 7000              [SiteHeader]
│  ├─ #site-cart                   fixed drawer, z 6000                       [SiteCart]
│  ├─ #shopify-section-site-nav    #site-nav fixed overlay, z 7000            [SiteNav]
│  ├─ #shopify-section-site-newsletter  #site-newsletter popup (fixed, z 9000) [SiteNewsletterPopup]
│  ├─ main
│  │  ├─ 00 hero slider (chips) + video + "Snack like Novak" footer  top 0     h 2280  [HeroSlider variant=chips]
│  │  ├─ 01 hero slider (tins)                                     top 2280  h 895   [HeroSlider variant=tins]
│  │  ├─ 02 featured products                                       top 3175  h 1493  [FeaturedProducts]
│  │  ├─ 03 ugc content                                             top 4668  h 1229  [UgcContent]
│  │  ├─ 04 scallop (burgundy, height 0 wrapper)                                       [ScallopRow]
│  │  ├─ 05 sorghum                                                 top 5897  h 1144  [Sorghum]
│  │  ├─ 06 scallop (green)                                                            [ScallopRow]
│  │  ├─ 07 text simple                                             top 7041  h 703   [TextSimple]
│  │  ├─ 08 scallop (green, inset, bottom)                                             [ScallopRow]
│  │  ├─ 09 medias (parallax photo)                                 top 7744  h 822   [Medias]
│  │  ├─ 10 partners ticker                                         top 8565  h 420   [Partners]
│  │  ├─ 11 featured posts (recipes slider)                         top 8985  h 698   [FeaturedPosts]
│  │  ├─ 12 nutrition chart                                         top 9683  h 1269  [NutritionChart]
│  │  ├─ 13 testimonials ticker                                     top 10952 h 982   [Testimonials]
│  │  ├─ 14 instagram feed app block (renders nothing)              — skipped —
│  │  └─ 15 newsletter                                              top 12024 h 607   [NewsletterRow]
│  └─ #shopify-section-site-footer footer.site-footer              top 12761 h 789   [SiteFooter]
├─ .site-video                     fixed video modal (z 9000), hidden         [SiteVideo]
└─ svg.site-svg-masks              clip paths for puff-shaped images          [SvgMasks]
```

Interaction models: hero sliders/recipes/UGC = click (Swiper); partners/testimonials = time + wheel
(JS ticker); scallops/videos/reveals = scroll calls; header = scroll direction; nav/cart/popup = click.
Layering: alert bar & header float above all content; nav (z 7000) covers page; popup + video modal z 9000;
loader/transition z 10000.
