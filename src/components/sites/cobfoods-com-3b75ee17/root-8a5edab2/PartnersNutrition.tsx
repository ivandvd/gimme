/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";
import { SplitText } from "@/components/sites/cobfoods-com-3b75ee17/shared/SplitText";
import { TextTicker } from "@/components/sites/cobfoods-com-3b75ee17/shared/TextTicker";

const IMG = "/sites/cobfoods-com-3b75ee17/root-8a5edab2/images";

interface Partner {
  src: string;
  width: number;
  height: number;
}

const PARTNERS: Partner[] = [
  { src: `${IMG}/bon-appetit_576x.png`, width: 396, height: 85 },
  { src: `${IMG}/food-wine_576x.png`, width: 457, height: 102 },
  { src: `${IMG}/fast-company_576x.png`, width: 440, height: 71 },
  { src: `${IMG}/BusinessInsider_Logo-CobBrown_1_1800x.png`, width: 3840, height: 1307 },
  { src: `${IMG}/forbes_576x.png`, width: 254, height: 71 },
  {
    src: `${IMG}/https___substack-post-media.s3.amazonaws.com_public_images_1920x1080_6de8463f-ccab-4fff-9061-5f38e155569f_576x.png`,
    width: 369,
    height: 72,
  },
  { src: `${IMG}/eating-well_576x.png`, width: 259, height: 102 },
];

/** Section 10: "Popped on" press logos marquee. */
export function PartnersSection() {
  return (
    <section id="shopify-section-template--18900032094380__1654623446c3148947" className="shopify-section section">
      <div
        className="pb-row-wrapper pt-40 pb-60 pt-lg-150 pb-lg-170 mt-0 mb-0 mt-lg-0 mb-lg-0 "
        data-scroll-section=""
        data-module-delay=""
        style={{ "--zindex": "0" } as CSSProperties}
      >
        <div
          id="pb-row-partners-template--18900032094380__1654623446c3148947"
          className="pb-row pb-row-partners container-fluid --layout-ticker "
          data-scroll=""
          data-scroll-offset="100px,0"
        >
          <header className="pb-row-partners__header ta-center">
            <h4 className="pb-row-partners__subtitle fz-14 ff-body fw-400 tt-uppercase m-0">POPPED ON</h4>
          </header>
          <TextTicker className="d-flex flex-nowrap align-items-center overflow-hidden --direction-both pb-row-partners__ticker mt-20 mt-lg-40">
            <div className="pb-row-partners__tickerContent d-flex flex-nowrap">
              {PARTNERS.map((p, i) => (
                <figure
                  key={p.src}
                  className="pb-row-partners__col position-relative d-flex justify-content-center align-items-center overflow-hidden"
                  style={{ "--index": String(i + 1) } as CSSProperties}
                >
                  <div className="pb-row-partners__logoWrap ">
                    <img
                      src={p.src}
                      alt=""
                      width={p.width}
                      height={p.height}
                      className="pb-row-partners__logo w-100 h-100 object-fit-contain"
                    />
                  </div>
                </figure>
              ))}
            </div>
          </TextTicker>
        </div>
      </div>
    </section>
  );
}

/** Section 12: "Sorghum > everything else" nutrition chart. */
export function NutritionChartSection() {
  return (
    <section
      id="shopify-section-template--18900032094380__pb_row_nutrition_chart_hWp8kL"
      className="shopify-section layout-pb-row-nutrition-chart"
    >
      <div
        className="pb-row-wrapper pt-60 pb-30 pt-lg-100 pb-lg-60 mt-0 mb-0 mt-lg-0 mb-lg-0 "
        data-scroll-section=""
        data-module-delay=""
        style={{ "--zindex": "0" } as CSSProperties}
      >
        <div
          id="pb-row-nutrition-chart-template--18900032094380__pb_row_nutrition_chart_hWp8kL"
          className="pb-row pb-row-nutrition-chart container-fluid d-grid grid-gap-30 ta-center "
        >
          <header
            className="pb-row-nutrition-chart__header d-flex flex-column align-items-center grid-gap-20"
            data-scroll=""
            data-scroll-offset="100px,0"
          >
            <SplitText
              as="h1"
              className="pb-row-nutrition-chart__title fz-32 fz-md-64 lh-none tt-uppercase m-0 justify-content-center"
              splitting="wordsMask"
              data-scroll=""
              data-scroll-target="#pb-row-nutrition-chart-template--18900032094380__pb_row_nutrition_chart_hWp8kL .pb-row-nutrition-chart__header"
              data-text-animation="slidein-by-lines"
              aria-label="SORGHUM > EVERYTHING ELSE"
            >
              {"SORGHUM > EVERYTHING ELSE"}
            </SplitText>
            <p className="pb-row-nutrition-chart__text m-0 fz-16 fz-lg-20 lh-relaxed lh-lg-chill">
              The mighty little grain with championship stats. Nutrient-packed, clean, and serving serious flavor.
            </p>
          </header>
          <figure className="pb-row-nutrition-chart__imgWrap position-relative" data-scroll="" data-scroll-offset="100px,0">
            <div className="pb-row-nutrition-chart__imgWrapBg d-none d-xl-block position-absolute t-0 l-0 w-100 h-100" />
            <img
              src={`${IMG}/COB_Site_Chart_1_1800x.png`}
              alt=""
              width={1976}
              height={2048}
              className="pb-row-nutrition-chart__img img-fluid position-relative z-1000 d-md-none"
            />{" "}
            <img
              src={`${IMG}/COB_Site_Chart_1_1800x.png`}
              alt=""
              width={1976}
              height={2048}
              className="pb-row-nutrition-chart__img img-fluid position-relative z-1000 d-none d-md-block"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
