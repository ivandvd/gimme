# PartnersNutrition Specification (section 10 "Popped on" logo ticker, section 12 nutrition chart)

## Overview
- **Target file:** `src/components/sites/cobfoods-com-3b75ee17/root-8a5edab2/PartnersNutrition.tsx` exporting `PartnersSection` and `NutritionChartSection`
- **Source markup:** `docs/research/cobfoods-com-3b75ee17/root-8a5edab2/markup/10-1654623446c3148947.jsx.txt`, `markup/12-pb_row_nutrition_chart_hWp8kL.jsx.txt`
- **Screenshots:** `desktop/d-08000.png` (logos row "POPPED ON"), `desktop/d-09600.png`, `desktop/d-10400.png` (chart), mobile `m-05600.png`, `m-06300.png`
- **Interaction model:** partners = time + wheel driven JS marquee; nutrition = static with scroll reveals.

## DOM Structure / Behaviors
### Partners (10)
Port 1:1 except the ticker element: replace the original `div.text-ticker …[data-module="text-ticker"]` and its single `.text-ticker__text` with
`<TextTicker className="d-flex flex-nowrap align-items-center overflow-hidden --direction-both pb-row-partners__ticker mt-20 mt-lg-40">`
whose children are the `.pb-row-partners__tickerContent` div (7 logo figures: bon-appetit, food-wine, fast-company, BusinessInsider, forbes, substack/SNAXSHOT, eating-well,
each `figure.pb-row-partners__col` with `--index` and `img.pb-row-partners__logo`). Drop the junk `aria-label` of the original `.text-ticker__text`.
TextTicker duplicates the content to fill the width and scrolls it leftwards (~0.08% of a copy per frame), wheel scrolling speeds it up / reverses it.
Header: `h4.pb-row-partners__subtitle` "POPPED ON".
### Nutrition chart (12)
Port 1:1: header with `h1.pb-row-nutrition-chart__title` as `SplitText as="h1"` (keep `data-scroll`, `data-scroll-target="#pb-row-nutrition-chart-template--18900032094380__pb_row_nutrition_chart_hWp8kL .pb-row-nutrition-chart__header"`,
`data-text-animation="slidein-by-lines"`, aria-label) with text "SORGHUM > EVERYTHING ELSE" (the ">" must render as text), paragraph, chart `<img>` (`COB_Site_Chart_1_1800x.png`)
— the markup may contain two images (desktop/mobile variants via d-none classes); keep both. Keep the element ids used by scroll targets.

## Computed Styles (verification, 1440px)
- "POPPED ON" Subtil Grotesk 14px uppercase; logos 42px tall (widths 107–260px).
- Nutrition title Obviously 64px/64px 700 uppercase; text Subtil Grotesk 20px/30px; chart 863×895.

## Responsive Behavior
CSS-driven. On touch devices TextTicker switches to CSS mode automatically.
