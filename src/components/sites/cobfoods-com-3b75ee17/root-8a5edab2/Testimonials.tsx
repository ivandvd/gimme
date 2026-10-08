"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import { TextTicker } from "@/components/sites/cobfoods-com-3b75ee17/shared/TextTicker";
import { viewport } from "@/components/sites/cobfoods-com-3b75ee17/shared/device";

interface Testimonial {
  text: string;
  credit: string;
  color: "pink" | "green" | "blue" | "yellow";
  index: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    text: "My daughter has a corn allergy and I have yet to find a single brand where ALL flavors are corn-free until Cob. My daughter and I are SO excited. Each flavor is better than the last.",
    credit: "Dan S.",
    color: "pink",
    index: 0,
  },
  {
    text: "Cob is absolutely AMAZING - I feel like it’s got this nuttiness to it that is even better than corn, my kids are obsessed and it’s totally toddler safe! We’ll be subscribing for sure.",
    credit: "Allie K.",
    color: "green",
    index: 1,
  },
  {
    text: "I’ve always loved popcorn, but hate that it gets stuck in my teeth so it’s never been my go-to snack at the office. Cob is perfect because it literally tastes JUST like popcorn, except it doesn’t get stuck in my teeth.",
    credit: "Emily B.",
    color: "blue",
    index: 2,
  },
  {
    text: "Ok so I literally don’t know how I’ve lived without cacio e pepe flavored popcorn until now. O.M.G. this is freaking amazing. It tastes exactly like the pasta!!!!! You just have to try this flavor.",
    credit: "Kendall F.",
    color: "yellow",
    index: 3,
  },
  {
    text: "My son tried Cob at camp and told me I needed to buy it. I honestly think I’ve eaten more of the bags than he has lol. This stuff is seriously addictive. Can’t even decide which flavor is our favorite because they’re just that good.",
    credit: "Stephanie B.",
    color: "blue",
    index: 0,
  },
];

function TestimonialCard({ t, extraClass }: { t: Testimonial; extraClass: string }) {
  return (
    <aside
      className={`pb-row-testimonials__testimonial d-flex flex-column justify-content-center align-items-center ${extraClass}`}
    >
      <blockquote className="pb-row-testimonials__testimonial__text ta-center m-0 ff-heading tt-uppercase lh-none fz-20 fz-md-28 fz-xl-32">
        {/* The source text is wrapped in whitespace, which renders as a space inside the CSS quote marks. */}
        {` ${t.text} `}
      </blockquote>
      <figcaption className="pb-row-testimonials__testimonial__credit fz-14 fz-md-18 fz-xl-20 lh-none tt-uppercase mt-20 mt-md-60">
        {t.credit}
      </figcaption>
    </aside>
  );
}

/** Below this width the theme (`La._onResize`) creates the Swiper; at/above it destroys it. */
const SLIDER_BREAKPOINT = 768;

/**
 * Section 13 — "20,000+ happy Cobstomers."
 * Desktop: JS text-ticker of testimonial cards (paused on hover).
 * <768px: `.pb-row-testimonials__slider` becomes a looping Swiper (port of the theme's `La`).
 */
export function TestimonialsSection() {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rowRef.current;
    if (!root) return;
    const slider = root.querySelector<HTMLElement>(".pb-row-testimonials__slider");
    const paginationEl = root.querySelector<HTMLElement>(".swiper-pagination");
    let swiper: Swiper | null = null;

    const createSlider = () => {
      if (swiper || !slider) return;
      swiper = new Swiper(slider, {
        modules: [Pagination],
        centeredSlides: false,
        freeMode: false,
        loop: true,
        slidesPerView: "auto",
        slidesOffsetAfter: 16,
        slidesOffsetBefore: 16,
        pagination: { el: paginationEl, type: "bullets" },
        spaceBetween: 16,
        speed: 450,
      });
    };
    const deleteSlider = () => {
      if (swiper) {
        swiper.destroy();
        swiper = null;
      }
    };
    const onResize = () => {
      if (viewport().width < SLIDER_BREAKPOINT) createSlider();
      else deleteSlider();
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      deleteSlider();
    };
  }, []);

  return (
    <section id="shopify-section-template--18900032094380__16546362357aa0a6fa" className="shopify-section section">
      <div
        className="pb-row-wrapper pt-50 pb-60 pt-lg-170 pb-lg-150 mt-0 mb-0 mt-lg-0 mb-lg-0 "
        data-scroll-section=""
        data-module-delay=""
        style={{ "--zindex": "0" } as CSSProperties}
      >
        <div
          ref={rowRef}
          id="pb-row-testimonials-template--18900032094380__16546362357aa0a6fa"
          className="pb-row pb-row-testimonials "
          data-module="pb-row-testimonials"
        >
          <h2 className="pb-row-testimonials__title container-fluid tt-uppercase fw-400 fz-32 fz-md-64 lh-none m-0 mb-30 mb-md-70 ta-center">
            20,000+ HAPPY COBSTOMERS.
          </h2>
          <TextTicker
            className="d-flex flex-nowrap align-items-center overflow-hidden --direction-both pb-row-testimonials__tickerWrap"
            pauseOnHover
          >
            <div className="pb-row-testimonials__ticker d-flex">
              {TESTIMONIALS.map((t) => (
                <TestimonialCard
                  key={t.credit}
                  t={t}
                  extraClass={`ml-5 mr-5 ml-md-20 mr-md-20 bg-color-${t.color} --index-${t.index}`}
                />
              ))}
            </div>
          </TextTicker>
          <div className="pb-row-testimonials__slider swiper d-md-none">
            <div className="swiper-wrapper">
              {TESTIMONIALS.map((t) => (
                <TestimonialCard key={t.credit} t={t} extraClass={`bg-color-${t.color} --index-${t.index} swiper-slide`} />
              ))}
            </div>
            <div className="pb-row-testimonials__pagination swiper-pagination" />
          </div>
        </div>
      </div>
    </section>
  );
}
