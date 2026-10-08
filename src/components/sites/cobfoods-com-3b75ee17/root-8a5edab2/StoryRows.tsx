/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";
import { Btn } from "@/components/sites/cobfoods-com-3b75ee17/shared/Btn";
import { CtaMediumBg } from "@/components/sites/cobfoods-com-3b75ee17/shared/icons";
import { Scallop } from "@/components/sites/cobfoods-com-3b75ee17/shared/Scallop";

const IMG = "/sites/cobfoods-com-3b75ee17/root-8a5edab2/images";
const SECTION_PREFIX = "shopify-section-template--18900032094380__";

/* ------------------------------------------------------------------ */
/* Scallop rows (04 / 06 / 08)                                         */
/* ------------------------------------------------------------------ */

const SCALLOP_UP = "--orientation-up --position-top --animation-left pb-row-scallop";

/** 04 — burgundy scallop above the Sorghum row. */
export function ScallopRowBurgundy() {
  return (
    <section id={`${SECTION_PREFIX}pb_row_scallop_YAXjzb`} className="shopify-section layout-pb-row-scallop">
      <Scallop className={SCALLOP_UP} color="#3b0017" animation="left" />
    </section>
  );
}

/** 06 — green scallop above the Text simple row. */
export function ScallopRowGreen() {
  return (
    <section id={`${SECTION_PREFIX}pb_row_scallop_hVnRpF`} className="shopify-section layout-pb-row-scallop">
      <Scallop className={SCALLOP_UP} color="#a3ce45" animation="left" />
    </section>
  );
}

/** 08 — inset green scallop hanging over the top of the Medias photo. */
export function ScallopRowInset() {
  return (
    <section id={`${SECTION_PREFIX}pb_row_scallop_PU49yE`} className="shopify-section layout-pb-row-scallop">
      <Scallop
        className="--orientation-down --position-bottom --animation-right --inset pb-row-scallop"
        color="#a3ce45"
        animation="right"
      />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 05 — Sorghum                                                        */
/* ------------------------------------------------------------------ */

interface SorghumColumn {
  icon: string;
  width: number;
  height: number;
  title: string;
  text: string;
}

const SORGHUM_COLUMNS: SorghumColumn[] = [
  {
    icon: `${IMG}/sorghum-icon-1_576x.png`,
    width: 184,
    height: 194,
    title: "GUT-FRIENDLY",
    text: "Prebiotic fiber supports good bacteria & digestion",
  },
  {
    icon: `${IMG}/sorghum-icon-2_576x.png`,
    width: 204,
    height: 198,
    title: "NUTRIENT-RICH",
    text: "Sustained energy with no crash",
  },
  {
    icon: `${IMG}/sorghum-icon-3_576x.png`,
    width: 224,
    height: 156,
    title: "FULLER, LONGER",
    text: "Can naturally boost GLP-1",
  },
  {
    icon: `${IMG}/sorghum-icon-4_576x.png`,
    width: 188,
    height: 194,
    title: "PACKED WITH ANTIOXIDANTS",
    text: "Anti-inflammatory polyphenols at work",
  },
];

export function SorghumSection() {
  return (
    <section id={`${SECTION_PREFIX}pb_row_sorghum_NawiXz`} className="shopify-section layout-pb-row-sorghum">
      <div
        className="pb-row-wrapper pt-0 pb-90 pt-lg-100 pb-lg-200 mt-0 mb-0 mt-lg-0 mb-lg-0  --has-text-color --has-bg"
        data-scroll-section=""
        data-module-delay=""
        style={{ "--zindex": "0", "--text-color": "#a3ce45", "--bg-color": "#3b0017" } as CSSProperties}
      >
        <div
          id=""
          className="pb-row pb-row-sorghum container-fluid d-grid grid-gap-20 align-items-center "
          data-scroll=""
          data-scroll-offset="100px,0"
          style={{ "--accent-color": "#fcfbe4" } as CSSProperties}
        >
          <header className="pb-row-sorghum__header d-flex flex-column grid-gap-20 grid-gap-lg-30 w-100 ta-center position-relative">
            <p className="pb-row-sorghum__subtitle fz-24 fz-lg-36 ff-heading lh-none m-0 position-relative">
              MEET SORGHUM
            </p>
            <h2 className="pb-row-sorghum__title ff-heading m-0 position-relative" aria-label="THE GRAIN|WITH GAME">
              <span className="d-block">THE GRAIN</span>{" "}
              <span className="d-block">WITH GAME</span>
            </h2>
          </header>
          <div className="pb-row-sorghum__columns w-100 d-grid grid-column-md-2 grid-gap-20">
            {SORGHUM_COLUMNS.map((col, i) => (
              <div
                key={col.title}
                className="pb-row-sorghum__column d-grid grid-gap-10 grid-gap-lg-20 align-items-start"
                style={{ "--index": String(i) } as CSSProperties}
              >
                <figure className="pb-row-sorghum__columnIcon m-0 p-0">
                  <img
                    src={col.icon}
                    alt=""
                    width={col.width}
                    height={col.height}
                    className="pb-row-sorghum__columnIconImg"
                  />
                </figure>
                <h3 className="pb-row-sorghum__columnTitle fz-20 fz-lg-36 lh-none tt-uppercase m-0">{col.title}</h3>
                <div className="pb-row-sorghum__columnText fz-16 fz-lg-24 lh-relaxed wysiwyg">
                  <p>{col.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 07 — Text simple                                                    */
/* ------------------------------------------------------------------ */

/** The theme emits a bare `attributes` attribute on the links nav; kept for 1:1 markup. */
const NAV_ATTRS = { attributes: "" } as Record<string, string>;

export function TextSimpleSection() {
  return (
    <section id={`${SECTION_PREFIX}pb_row_text_simple_R3dPCF`} className="shopify-section section">
      <div
        className="pb-row-wrapper pt-50 pb-50 pt-lg-80 pb-lg-90 mt-0 mb-0 mt-lg-0 mb-lg-0  --has-text-color --has-bg"
        data-scroll-section=""
        data-module-delay=""
        style={{ "--zindex": "0", "--text-color": "#3b0017", "--bg-color": "#a3ce45" } as CSSProperties}
      >
        <div
          id=""
          className="pb-row pb-row-text-simple container-fluid d-grid grid-gap-20 --text-align-center --text-size-large --width-default --position-center  "
          data-scroll=""
          data-scroll-offset="100px,0"
        >
          <header className="pb-row-text-simple__header d-flex flex-column grid-gap-30">
            <h2 className="pb-row-text-simple__title ff-heading fz-24 fz-lg-36 fw-400 lh-none m-0">
              NOVAK DJOKOVIC &amp; A MOM ON A MISSION WALK INTO A SORGHUM FIELD
            </h2>
          </header>
          <aside className="pb-row-text-simple__content d-flex flex-column grid-gap-20">
            <div className="pb-row-text-simple__text fz-16 fz-lg-20 lh-relaxed lh-lg-chill wysiwyg">
              <p>
                Tennis legend, Novak Djokovic, fueled by a <strong>gluten-free</strong> diet, saw the future in this
                mighty little grain. Jess, a mom of kids with <strong>corn allergies</strong>, found the ingredient her
                family had been missing. Now, they{"’"}re bringing <strong>nutritional powerhouse sorghum</strong>{" "}
                into the spotlight{"—"}clean, craveable, and welcome on every table.
              </p>
            </div>
            <nav
              className="links-nav d-flex pb-row-text-simple__buttons --layout-horizontal--layout-mobile-horizontal"
              data-scroll=""
              {...NAV_ATTRS}
            >
              <Btn
                href="/pages/our-story"
                className="links-nav__link --cta --cta-inverted"
                style={{ "--index": "1" } as CSSProperties}
                aria-label="OUR STORY"
                behavior="cta"
                bg={<CtaMediumBg />}
                label="OUR STORY"
              />
            </nav>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 09 — Medias (full-width parallax photo)                             */
/* ------------------------------------------------------------------ */

const MEDIAS_ID = "pb-row-medias-template--18900032094380__pb_row_medias_aTG8fV";

export function MediasSection() {
  return (
    <section id={`${SECTION_PREFIX}pb_row_medias_aTG8fV`} className="shopify-section section">
      <div
        className="pb-row-wrapper pt-0 pb-0 pt-lg-0 pb-lg-0 mt-0 mb-0 mt-lg-0 mb-lg-0 "
        data-scroll-section=""
        data-module-delay=""
        style={{ "--zindex": "0" } as CSSProperties}
      >
        <div id={MEDIAS_ID} className="pb-row pb-row-medias  --layout-grid-1">
          <div className="pb-row-medias__grid d-grid grid-gap-20 grid-gap-lg-20 --fullwidth">
            <figure className="pb-row-medias__media" data-scroll="" data-scroll-offset="100px,0">
              <div id={`${MEDIAS_ID}-1`} className="pb-row-medias__box box box-widescreen overflow-hidden">
                <div
                  className="pb-row-medias__parallax position-absolute t-0 l-0 r-0 b-0"
                  data-scroll=""
                  data-scroll-target={`#${MEDIAS_ID}-1`}
                  data-scroll-speed="0.5"
                >
                  <img
                    src={`${IMG}/COB-R2-coloring-21-2_c_1800x.jpg`}
                    alt=""
                    width={1334}
                    height={2000}
                    className="pb-row-medias__img image-as-background"
                  />
                </div>
              </div>
              <figcaption className="pb-row-medias__caption d-block ff-body fz-12 lh-none m-0 mt-10 mt-lg-20 p-0 pl-lg-30 pr-lg-20" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
