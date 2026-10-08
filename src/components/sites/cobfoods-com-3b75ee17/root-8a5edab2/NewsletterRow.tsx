/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";
import { Btn } from "@/components/sites/cobfoods-com-3b75ee17/shared/Btn";
import { CtaOvalBg, StarIcon } from "@/components/sites/cobfoods-com-3b75ee17/shared/icons";
import { NewsletterForm } from "./NewsletterForm";

const SECTION_ID = "template--18900032094380__165460923883509df4";
const ROW_ID = `pb-row-newsletter-${SECTION_ID}`;
const IMG_BASE = "/sites/cobfoods-com-3b75ee17/root-8a5edab2/images";

/** Section 15: "Tiny grain. Big inbox energy." newsletter row. */
export function NewsletterSection() {
  return (
    <section id={`shopify-section-${SECTION_ID}`} className="shopify-section section">
      <div
        className="pb-row-wrapper pt-20 pb-0 pt-lg-70 pb-lg-0 mt-40 mb-50 mt-lg-90 mb-lg-130 position-relative"
        data-scroll-section=""
        data-module-delay=""
        style={{ "--zindex": "0" } as CSSProperties}
      >
        <div
          id={ROW_ID}
          className="pb-row pb-row-newsletter container-fluid ta-center   "
          data-scroll=""
          data-scroll-offset="200px,0"
          style={{ backgroundColor: "none" }}
        >
          <div className="pb-row-newsletter__wrapper position-relative pt-140 pb-150 pb-md-80 pt-md-80">
            <figure
              className="pb-row-newsletter__decorationImg --img-1 masked-img position-absolute l-0 t-0"
              style={{ "--mask": `url(#pb-row-newsletter-img1-${SECTION_ID})` } as CSSProperties}
            >
              <div
                className="pb-row-newsletter__decorationImg__box box box-portrait"
                data-scroll=""
                data-scroll-call="timeline"
                data-module="scroll-timeline"
                data-timeline-native=""
                data-timeline="{'rotate':[10],'scale':[1.125]}"
                data-scroll-target={`#${ROW_ID}`}
              >
                <img
                  src={`${IMG_BASE}/COB-R2-coloring-03-2_c_1800x.jpg`}
                  alt=""
                  width="1334"
                  height="2000"
                  className="pb-row-newsletter__decorationImg__img image-as-background"
                />
                <svg
                  width="0"
                  height="0"
                  className="svg-mask position-absolute t-0 l-0 pointer-events-none "
                  preserveAspectRatio="none"
                >
                  <clipPath id={`pb-row-newsletter-img1-${SECTION_ID}`} clipPathUnits="objectBoundingBox">
                    <use className="svg-mask-path" href="#svg-puff-mask-shape-a-vertical-path" />
                  </clipPath>
                </svg>
              </div>
            </figure>
            <figure
              className="pb-row-newsletter__decorationImg --img-2 masked-img position-absolute r-0 b-0"
              style={{ "--mask": `url(#pb-row-newsletter-img2-${SECTION_ID})` } as CSSProperties}
            >
              <div
                className="pb-row-newsletter__decorationImg__box box box-square"
                data-scroll=""
                data-scroll-call="timeline"
                data-module="scroll-timeline"
                data-timeline-native=""
                data-timeline="{'rotate':[-10],'scale':[1.125]}"
                data-scroll-target={`#${ROW_ID}`}
              >
                <img
                  src={`${IMG_BASE}/COB-R2-coloring-24_c_1800x.jpg`}
                  alt=""
                  width="1080"
                  height="1080"
                  className="pb-row-newsletter__decorationImg__img image-as-background"
                />
                <svg
                  width="0"
                  height="0"
                  className="svg-mask position-absolute t-0 l-0 pointer-events-none "
                  preserveAspectRatio="none"
                >
                  <clipPath id={`pb-row-newsletter-img2-${SECTION_ID}`} clipPathUnits="objectBoundingBox">
                    <use className="svg-mask-path" href="#svg-puff-mask-shape-b-path" />
                  </clipPath>
                </svg>
              </div>
            </figure>
            <header className="pb-row-newsletter__header ml-auto mr-auto position-relative z-1000">
              <h2
                className="pb-row-newsletter__title m-0 ml-auto tt-uppercase lh-none fz-32 fz-md-48 fz-lg-64"
                aria-label="TINY GRAIN. BIG INBOX ENERGY. GET 15% OFF YOUR FIRST ORDER."
              >
                TINY GRAIN. <br /> BIG INBOX ENERGY. <br /> GET 15% OFF YOUR FIRST ORDER.
              </h2>
            </header>
            <NewsletterForm
              action="."
              method="POST"
              className="pb-row-newsletter__form newsletter position-relative mt-30 mt-md-40 ml-auto mr-auto"
              data-module="newsletter"
              data-newsletter=""
            >
              <div className="newsletter__wrap">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="pb-row-newsletter__inputWrap">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      className="pb-row-newsletter__input w-100 bg-color-beige fz-16 fz-md-18"
                    />
                  </div>
                  <input type="hidden" name="listid" value="Txctfn" />{" "}
                  <Btn
                    className="pb-row-newsletter__btn ml-10 ml-md-30 --cta --cta-oval"
                    behavior="cta"
                    type="submit"
                    aria-label="Sign Up"
                    bg={<CtaOvalBg />}
                    label="Sign Up"
                  />
                </div>
              </div>
              <div className="newsletter__loading" />
              <div className="newsletter__message" data-message="Use code <strong>POPTOIT15</strong> for 15% OFF!" />
            </NewsletterForm>
            <div
              className="pb-row-newsletter__star --star-1 color-green position-absolute r-0 t-0 pointer-events-none"
              data-scroll=""
              data-scroll-speed="1"
              data-scroll-position="elementTop"
              data-scroll-offset="200px,0"
            >
              <span className="pb-row-newsletter__star__wrap d-block">
                <StarIcon id="svg-star" />
              </span>
            </div>
            <div
              className="pb-row-newsletter__star --star-2 color-yellow position-absolute l-0 b-0 pointer-events-none"
              data-scroll=""
              data-scroll-speed="-1"
              data-scroll-position="elementTop"
              data-scroll-offset="200px,0"
            >
              <span className="pb-row-newsletter__star__wrap d-block">
                <StarIcon id="svg-star" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
