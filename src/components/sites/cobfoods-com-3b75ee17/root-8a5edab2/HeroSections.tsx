"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from "react";
import { Btn } from "@/components/sites/cobfoods-com-3b75ee17/shared/Btn";
import { useScrollCall } from "@/components/sites/cobfoods-com-3b75ee17/shared/hooks";
import { CtaMediumBg, StarIcon } from "@/components/sites/cobfoods-com-3b75ee17/shared/icons";
import { Scallop } from "@/components/sites/cobfoods-com-3b75ee17/shared/Scallop";
import { ENTER } from "@/components/sites/cobfoods-com-3b75ee17/shared/site-scroll";
import { HeroSlider, type HeroSlide } from "./HeroSlider";

const IMG = "/sites/cobfoods-com-3b75ee17/root-8a5edab2/images";

const CHIPS_KEY = "template--18900032094380__pb_row_hero_slider_hpQjUJ";
const TINS_KEY = "template--18900032094380__pb_row_hero_slider_BtYcDM";

const chipsSubtitle = (
  <>
    <strong>20,000+</strong> COBSTOMERS
  </>
);
const chipsText = <p>Introducing Our Corn-Free Tortilla Chips.</p>;
const chipsCta = { href: "/products/tortilla-chip-6-pack", label: "Shop now" };

const CHIPS_SLIDES: HeroSlide[] = [
  {
    vars: { "--slide-bg": "#f79054", "--slide-text": "#3b0017", "--color-highlight": "#ffde17" },
    subtitle: chipsSubtitle,
    titleTag: "h1",
    title: "THE CHIP THAT CHANGES THE GAME",
    titleLabel: "THE CHIP THAT CHANGES THE GAME",
    text: chipsText,
    cta: chipsCta,
    image: { src: `${IMG}/20260324_COB_ABatz_Capture_0372_v2_7_1800x.jpg`, width: 1440, height: 1782 },
  },
  {
    vars: { "--slide-bg": "#ef98c1", "--slide-text": "#3b0017", "--color-highlight": "#ffde17" },
    subtitle: chipsSubtitle,
    titleTag: "h1",
    title: "NEW NO. 1 FULLY LOADED CHIP",
    titleLabel: "NEW NO. 1 FULLY LOADED CHIP",
    text: chipsText,
    cta: chipsCta,
    image: { src: `${IMG}/20260324_COB_ABatz_Capture_0372_v2_7_1800x.png`, width: 1440, height: 1782 },
  },
  {
    vars: { "--slide-bg": "#f79054", "--slide-text": "#3b0017", "--color-highlight": "#ffde17" },
    subtitle: chipsSubtitle,
    titleTag: "h1",
    title: "THE NEW NO. 1 BOUGIE BITE",
    titleLabel: "THE NEW NO. 1 BOUGIE BITE",
    text: chipsText,
    cta: chipsCta,
    image: { src: `${IMG}/20260324_COB_ABatz_Capture_0907_v1_3_1800x.jpg`, width: 1440, height: 1782 },
  },
];

const TINS_SLIDES: HeroSlide[] = [
  {
    vars: { "--slide-bg": "#F8F1DB", "--slide-text": "#3B0017", "--color-highlight": "#ffde17", "--color-title": "#3B0017" },
    titleTag: "h2",
    title: (
      <>
        GAME. SET. <br /> SNACK.
      </>
    ),
    titleLabel: "GAME. SET. \nSNACK.",
    text: (
      <>
        <p>
          All four Cob Popped Sorghum flavors plus Pink Salt Corn-Free Tortilla Chips, packed into one limited-edition tin.
        </p>
        <p>It&apos;s everything you need to bring snacks to game night.</p>
      </>
    ),
    cta: { href: "/products/game-set-snack-tin", label: "Shop now" },
    image: { src: `${IMG}/3_26_1800x.png`, width: 1194, height: 1500 },
  },
  {
    vars: { "--slide-bg": "#ef98c1", "--slide-text": "#3b0017" },
    titleTag: "h2",
    title: "A POP OF JOY",
    titleLabel: "A POP OF JOY",
    text: (
      <>
        <p>A giftable keepsake tin filled with 6 bags of Cob Popped Sorghum.</p>
        <p>Made for birthdays, thank-yous, Mother&apos;s Day, &amp; little pick-me-ups.</p>
      </>
    ),
    cta: { href: "/products/floral-tin-2026-6-pack-variety", label: "Shop now" },
    image: { src: `${IMG}/3_d5212864-0c89-4d72-b446-d2ca7b317c95_1800x.png`, width: 1440, height: 1800 },
  },
  {
    vars: { "--slide-bg": "#f8f1db", "--slide-text": "#3b0017", "--color-highlight": "#3b0017" },
    titleTag: "h2",
    title: (
      <>
        <strong>Now playing</strong>
        <br /> COB THEATER
      </>
    ),
    titleLabel: "<strong>Now playing</strong>\nCOB THEATER",
    text: (
      <>
        <p>
          A collectible keepsake tin filled with 12 bags of Cob Popped Sorghum.
          <br />
        </p>
        <p>For movie nights, hosting, and second showings.</p>
      </>
    ),
    cta: { href: "/products/the-cob-theater-tin", label: "Shop now" },
    image: { src: `${IMG}/4_6eda2655-59b5-44c4-9e30-ecf4e78477b9_1800x.png`, width: 1440, height: 1800 },
  },
];

/**
 * Port of the theme's background video helper (`Qs`): src is assigned from data-src on init,
 * playback follows the `video` scroll call. play() is not re-issued while a play() promise is
 * pending, and pause() waits for that promise before pausing.
 */
function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const action = useRef<"play" | "pause" | null>(null);
  const playPromise = useRef<Promise<void> | null>(null);

  useEffect(() => {
    const el = ref.current;
    const src = el?.dataset.src;
    if (el && src) el.setAttribute("src", src);
    return () => {
      action.current = null;
      playPromise.current = null;
    };
  }, []);

  useScrollCall(ref, "video", (state) => {
    const el = ref.current;
    if (!el) return;
    if (state === ENTER) {
      if (action.current === "play") return;
      action.current = "play";
      if (!playPromise.current) {
        playPromise.current = el
          .play()
          .catch(() => {})
          .finally(() => {
            playPromise.current = null;
          });
      }
    } else {
      if (action.current === "pause") return;
      action.current = "pause";
      if (playPromise.current) playPromise.current.then(() => ref.current?.pause());
      else el.pause();
    }
  });

  return (
    <video
      ref={ref}
      className="w-100 pb-row-hero-slider__video video-as-background"
      data-src="/sites/cobfoods-com-3b75ee17/root-8a5edab2/videos/hero-novak.mp4"
      width="1440"
      height="740"
      muted
      autoPlay
      loop
      playsInline
      {...{ disableremoteplayback: "" }}
      data-scroll=""
      data-scroll-call="video"
      data-scroll-repeat="true"
      data-module="video"
      data-video=""
    />
  );
}

/** Section 00 — corn-free tortilla chips slider + Novak video + "Snack like Novak" footer. */
export function HeroChipsSection() {
  return (
    <HeroSlider
      sectionKey={CHIPS_KEY}
      rowClassName="--is-first"
      autoplay={false}
      autoplaySpeed={5000}
      rowStyle={{ "--footer-text-color": "#3b0017", "--footer-bg-color": "#ffde17" }}
      slides={CHIPS_SLIDES}
    >
      <div className="pb-row-hero-slider__imgWrap overflow-hidden">
        <HeroVideo />
      </div>
      <footer
        className="pb-row-hero-slider__footer container-fluid d-flex flex-column align-items-center grid-gap-10 grid-gap-lg-30 position-relative pt-40 pt-lg-100 pt-xxl-120 pb-70 pb-lg-170 pb-xl-150 pb-xxl-180 bg-color-primary"
        data-scroll=""
      >
        <Scallop
          className="--orientation-up --position-top --animation-right pb-row-hero-slider__footer__scallop color-primary"
          animation="right"
          scrollTarget={`#pb-row-hero-slider-${CHIPS_KEY} .pb-row-hero-slider__footer`}
          scrollOffset="-200px,0"
        />
        <h2 className="pb-row-hero-slider__footer__subtitle fz-36 fz-lg-64 ta-center m-0">
          SNACK LIKE{" "}
          <span className="pb-row-hero-slider__footer__tennis d-inline-block position-relative" aria-hidden="true">
            <img src="/sites/cobfoods-com-3b75ee17/shared/theme/icon-tennis.png" alt="" height="237" width="323" loading="lazy" />
          </span>
          NOVAK
        </h2>
        <div className="pb-row-hero-slider__footer__text fz-24 fz-lg-48 lh-none ta-center position-relative wysiwyg">
          <p>
            The world’s greatest tennis player teamed up with the world’s greatest grain. Meet Cob, co-founded by Novak
            Djokovic and powered by sorghum: seriously delicious, incredibly nutritious.
          </p>
        </div>
        <Btn
          href="/collections/all"
          className="pb-row-hero-slider__footer__cta mt-10 --cta --cta-medium --cta-pink"
          behavior="cta"
          bg={<CtaMediumBg />}
          label="Shop now"
          aria-label="Shop now"
        />
        <div className="pb-row-hero-slider__footer__star position-absolute color-yellow pointer-events-none" aria-hidden="true">
          <StarIcon id="svg-star" />
        </div>
      </footer>
    </HeroSlider>
  );
}

/**
 * Section 01 — limited-edition tins slider. The markup carries data-autoplay="true" /
 * data-autoplay-speed="3000"; like the theme, autoplay only runs while the slider is in view.
 */
export function HeroTinsSection() {
  return (
    <HeroSlider
      sectionKey={TINS_KEY}
      autoplay
      autoplaySpeed={3000}
      rowStyle={{ "--footer-text-color": "#3b0017", "--footer-bg-color": "#ffde17" }}
      sliderScrollOffset="50%, 0"
      slides={TINS_SLIDES}
    />
  );
}
