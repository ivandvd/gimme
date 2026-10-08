# StoryRows Specification (scallop rows 04/06/08, Sorghum 05, Text simple 07, Medias 09)

## Overview
- **Target file:** `src/components/sites/cobfoods-com-3b75ee17/root-8a5edab2/StoryRows.tsx` exporting
  `ScallopRowBurgundy` (04), `SorghumSection` (05), `ScallopRowGreen` (06), `TextSimpleSection` (07), `ScallopRowInset` (08), `MediasSection` (09).
- **Source markup:** `markup/04-pb_row_scallop_YAXjzb.jsx.txt`, `05-pb_row_sorghum_NawiXz.jsx.txt`, `06-pb_row_scallop_hVnRpF.jsx.txt`,
  `07-pb_row_text_simple_R3dPCF.jsx.txt`, `08-pb_row_scallop_PU49yE.jsx.txt`, `09-pb_row_medias_aTG8fV.jsx.txt`
  (all under `docs/research/cobfoods-com-3b75ee17/root-8a5edab2/`)
- **Screenshots:** `desktop/d-05600.png` (burgundy scallop + "MEET SORGHUM / THE GRAIN WITH GAME"), `desktop/d-06400.png` (benefit columns, green scallop,
  text-simple title), `desktop/d-07200.png` (text + OUR STORY CTA, scalloped top edge of the photo), `desktop/d-08000.png` (photo), mobile `m-03500.png`…`m-04900.png`
- **Interaction model:** static + scroll reveals + animated scallops + parallax photo.

## DOM Structure / Behaviors
- Scallop rows: `section.shopify-section.layout-pb-row-scallop` (CSS makes it height 0, z-index 100) containing one `<Scallop>`:
  - 04: `className="--orientation-up --position-top --animation-left pb-row-scallop" color="#3b0017" animation="left"`
  - 06: same classes, `color="#a3ce45"`
  - 08: `className="--orientation-down --position-bottom --animation-right --inset pb-row-scallop" color="#a3ce45" animation="right"`
  The waves slide continuously (4s linear) only while in view (scroll call `scallop`, repeat).
- 05 Sorghum: port 1:1 (burgundy bg `--bg-color:#3b0017`, green `--text-color:#a3ce45`, `--accent-color:#fcfbe4`), subtitle "MEET SORGHUM",
  title with two `span.d-block` lines "THE GRAIN" / "WITH GAME" (aria-label "THE GRAIN|WITH GAME"), 4 columns with icons
  (`sorghum-icon-1..4_576x.png`), titles GUT-FRIENDLY / NUTRIENT-RICH / FULLER, LONGER / PACKED WITH ANTIOXIDANTS and texts.
- 07 Text simple: green bg, title h2 "NOVAK DJOKOVIC & A MOM ON A MISSION WALK INTO A SORGHUM FIELD", rich text with `<strong>`s, CTA
  `Btn` `--cta --cta-inverted` (check exact classes in markup) behavior "cta" `CtaMediumBg`, label "OUR STORY".
- 09 Medias: full-width image `COB-R2-coloring-21-2_c_1800x.jpg` inside `.pb-row-medias__parallax[data-scroll][data-scroll-target="#pb-row-medias-…-1"][data-scroll-speed="0.5"]`
  (engine applies translateY; `html.has-scroll-smooth .pb-row-medias__parallax{top:-6%;bottom:-6%}` gives the overscan). Keep the `id` used by the scroll target.

All reveal transitions are CSS on `is-inview` (`data-scroll` + offsets already in markup).

## Computed Styles (verification, 1440px)
- Sorghum: subtitle Obviously 36px cream #fcfbe4; title Obviously 200px/180px 700 green #a3ce45; column titles 36px uppercase green; texts Subtil Grotesk 24px/36px cream.
- Text simple: title Obviously 64px/64px; body 24px/36px; CTA label Obviously 18px.
- Section heights: sorghum 1144, text simple 703, medias 822 (≈1710×1077 image).

## Responsive Behavior
CSS-driven (columns stack <768px, title 72px-ish on mobile). Scallop bump count changes with viewport (handled by Scallop).
