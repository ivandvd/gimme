"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Btn } from "@/components/sites/cobfoods-com-3b75ee17/shared/Btn";
import { useScrollCall } from "@/components/sites/cobfoods-com-3b75ee17/shared/hooks";
import { ENTER, EXIT } from "@/components/sites/cobfoods-com-3b75ee17/shared/site-scroll";
import { SplitText } from "@/components/sites/cobfoods-com-3b75ee17/shared/SplitText";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CtaMediumBg,
  FlowerSmallBg,
} from "@/components/sites/cobfoods-com-3b75ee17/shared/icons";

/**
 * Port of the theme's `pb-row-hero-slider` section + module (class `sa`).
 *
 * Swiper runs with `virtualTranslate: true`, so it never moves the wrapper: every visual
 * transition (bg cross-fade, media clip-path wipe, content slide-up) is CSS keyed on
 * `.swiper-slide-active` and the row's `is-forward` / `is-backward` direction class.
 * The slide DOM is rendered once and then owned by Swiper (classes, inline widths, aria);
 * nothing here keeps slide state in React.
 */
export interface HeroSlide {
  /** CSS custom properties on the slide: --slide-bg, --slide-text, --color-highlight, --color-title… */
  vars: Record<string, string>;
  /** Optional subtitle content (e.g. <strong>20,000+</strong> COBSTOMERS). */
  subtitle?: ReactNode;
  titleTag: "h1" | "h2";
  title: ReactNode;
  titleLabel: string;
  /** Rich text (paragraphs) rendered inside `.wysiwyg`. */
  text: ReactNode;
  cta: { href: string; label: string };
  image: { src: string; width: number; height: number };
}

export interface HeroSliderProps {
  /** Shopify section id, e.g. "template--18900032094380__pb_row_hero_slider_hpQjUJ". */
  sectionKey: string;
  /** Extra classes on `.pb-row-hero-slider` (e.g. "--is-first"). */
  rowClassName?: string;
  autoplay?: boolean;
  autoplaySpeed?: number;
  /** Row inline style (--footer-text-color / --footer-bg-color). */
  rowStyle?: Record<string, string>;
  /** data-scroll-offset on the `.swiper` element, if any. */
  sliderScrollOffset?: string;
  slides: HeroSlide[];
  /** Rendered after `.pb-row-hero-slider__titleInviewSelector` (video + footer on the first hero). */
  children?: ReactNode;
}

type Direction = "forward" | "backward";

export function HeroSlider({
  sectionKey,
  rowClassName,
  autoplay = false,
  autoplaySpeed = 5000,
  rowStyle,
  sliderScrollOffset,
  slides,
  children,
}: HeroSliderProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<Swiper | null>(null);
  const autoplayRef = useRef(autoplay);

  useEffect(() => {
    autoplayRef.current = autoplay;
  }, [autoplay]);

  useEffect(() => {
    const row = rowRef.current;
    const sliderEl = sliderRef.current;
    if (!row || !sliderEl) return;
    const prevBtn = row.querySelector<HTMLElement>(".pb-row-hero-slider__prevBtn");
    const nextBtn = row.querySelector<HTMLElement>(".pb-row-hero-slider__nextBtn");
    const paginationEl = row.querySelector<HTMLElement>(".pb-row-hero-slider__pagination");

    const setDirection = (dir: Direction) => {
      row.classList.remove("is-forward", "is-backward");
      row.classList.add(`is-${dir}`);
    };

    const onSlideChange = (swiper: Swiper) => {
      row.style.setProperty("--module-delay", "0ms");
      const active = swiper.slides[swiper.activeIndex];
      const title = active?.querySelector(".pb-row-hero-slider__slide__title") ?? null;
      title?.classList.add("is-inview");
      sliderEl.querySelectorAll(".pb-row-hero-slider__slide__title").forEach((t) => {
        if (t !== title) t.classList.remove("is-inview");
      });
    };

    const onBeforeTransitionStart = (swiper: Swiper) => {
      // Background videos inside slides (none on this page; kept generic like the theme).
      swiper.slides.forEach((slide, i) => {
        const video = slide.querySelector<HTMLVideoElement>(".pb-row-hero-slider__slide__bgVideo");
        if (!video) return;
        if (i === swiper.activeIndex) video.play().catch(() => {});
        else video.pause();
      });
    };

    const onTouchMove = (swiper: Swiper) => {
      const s = swiper as Swiper & { previousTranslate: number };
      setDirection(s.translate < s.previousTranslate ? "forward" : "backward");
    };

    const enabled = autoplayRef.current;
    const swiper = new Swiper(sliderEl, {
      modules: [Navigation, Pagination, Autoplay],
      loop: false,
      speed: 750,
      navigation: { nextEl: nextBtn, prevEl: prevBtn },
      pagination: { el: paginationEl, type: "bullets", clickable: true },
      on: {
        beforeTransitionStart: onBeforeTransitionStart,
        slideChange: onSlideChange,
        init: onSlideChange,
        touchMove: onTouchMove,
      },
      autoplay: enabled ? { delay: autoplaySpeed, disableOnInteraction: false, waitForTransition: true } : false,
      virtualTranslate: true,
    });
    if (enabled) swiper.autoplay.stop();
    swiperRef.current = swiper;
    row.style.setProperty("--swiper-speed", `${swiper.params.speed}ms`);
    setDirection("forward");

    const onNext = () => setDirection("forward");
    const onPrev = () => setDirection("backward");
    nextBtn?.addEventListener("click", onNext);
    prevBtn?.addEventListener("click", onPrev);

    return () => {
      nextBtn?.removeEventListener("click", onNext);
      prevBtn?.removeEventListener("click", onPrev);
      swiper.destroy();
      swiperRef.current = null;
    };
  }, [autoplaySpeed]);

  // Autoplay runs only while the slider is in view (theme's `SiteScroll.pb-row-hero-slider`).
  useScrollCall(sliderRef, "pb-row-hero-slider", (state) => {
    const swiper = swiperRef.current;
    if (!autoplayRef.current || !swiper || swiper.destroyed) return;
    if (state === ENTER) swiper.autoplay.start();
    else if (state === EXIT) swiper.autoplay.stop();
  });

  return (
    <section id={`shopify-section-${sectionKey}`} className="shopify-section layout-pb-row-hero-slider">
      <div
        className="pb-row-wrapper pt-0 pb-0 pt-lg-0 pb-lg-0 mt-0 mb-0 mt-lg-0 mb-lg-0 "
        data-scroll-section=""
        data-module-delay=""
        style={{ "--zindex": "0" } as CSSProperties}
      >
        <div
          ref={rowRef}
          id={`pb-row-hero-slider-${sectionKey}`}
          className={`pb-row pb-row-hero-slider d-grid${rowClassName ? ` ${rowClassName}` : ""}`}
          data-module="pb-row-hero-slider"
          data-module-delay=""
          data-autoplay={autoplay ? "true" : "false"}
          data-autoplay-speed={String(autoplaySpeed)}
          data-scroll=""
          style={rowStyle as CSSProperties | undefined}
        >
          <div
            ref={sliderRef}
            className="pb-row-hero-slider__slider swiper"
            data-scroll=""
            data-scroll-call="pb-row-hero-slider"
            data-scroll-repeat=""
            data-scroll-offset={sliderScrollOffset}
          >
            <div className="swiper-wrapper">
              {slides.map((slide, i) => (
                <div
                  key={i}
                  className={`pb-row-hero-slider__slide swiper-slide d-grid grid-column-lg-2${i === 0 ? " --is-first" : ""}`}
                  style={slide.vars as CSSProperties}
                >
                  <div className="pb-row-hero-slider__slide__content d-flex flex-column ta-center ta-lg-left grid-gap-20 pb-30 pl-30 pr-30 pl-lg-70 pl-xxxl-90 pr-lg-30 pr-xxxl-90">
                    {slide.subtitle && (
                      <p className="pb-row-hero-slider__slide__subtitle tt-uppercase fz-14 fz-lg-20 ff-heading fw-500 m-0">
                        {slide.subtitle}
                      </p>
                    )}
                    <div className="pb-row-hero-slider__slide__titleWrap position-relative">
                      <SplitText
                        as={slide.titleTag}
                        className="pb-row-hero-slider__slide__title ff-heading tt-uppercase fz-40 fz-md-64 fz-lg-80 fz-xxl-92 lh-none m-0"
                        splitting="wordsMask"
                        data-text-animation="slidein-by-lines"
                        data-scroll=""
                        data-scroll-target=".pb-row-hero-slider__titleInviewSelector"
                        aria-label={slide.titleLabel}
                      >
                        {slide.title}
                      </SplitText>
                    </div>
                    <div className="pb-row-hero-slider__slide__text fz-14 fz-lg-20 fz-xl-24 wysiwyg fw-500">{slide.text}</div>
                    <div className="pb-row-hero-slider__slide__ctaWrap mt-lg-30">
                      <Btn
                        href={slide.cta.href}
                        className="pb-row-hero-slider__slide__cta --cta --cta-medium"
                        behavior="cta"
                        bg={<CtaMediumBg />}
                        label={slide.cta.label}
                        aria-label={slide.cta.label}
                      />
                    </div>
                  </div>
                  <div className="pb-row-hero-slider__slide__media position-relative overflow-hidden">
                    <figure className="pb-row-hero-slider__slide__bgImage position-absolute t-0 l-0 w-100 h-100 m-0 p-0">
                      <img
                        src={slide.image.src}
                        alt=""
                        width={slide.image.width}
                        height={slide.image.height}
                        className="pb-row-hero-slider__slide__bgImg image-as-background"
                      />
                    </figure>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <nav className="pb-row-hero-slider__controls d-grid pointer-events-none">
            <Btn
              className="pb-row-hero-slider__prevBtn pointer-events-all --close --close-yellow"
              behavior="close"
              bg={<FlowerSmallBg />}
              icon={<ArrowLeftIcon />}
              iconClass="--icon-arrow-left"
              aria-label=""
            />{" "}
            <Btn
              className="pb-row-hero-slider__nextBtn pointer-events-all --close --close-yellow"
              behavior="close"
              bg={<FlowerSmallBg />}
              icon={<ArrowRightIcon />}
              iconClass="--icon-arrow-right"
              aria-label=""
            />
            <div className="pb-row-hero-slider__pagination swiper-pagination pointer-events-all" />
          </nav>
          <div className="pb-row-hero-slider__titleInviewSelector d-none" />
          {children}
        </div>
      </div>
    </section>
  );
}
