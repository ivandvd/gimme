/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Btn } from "@/components/sites/cobfoods-com-3b75ee17/shared/Btn";
import { ArrowLeftIcon, ArrowRightIcon, FlowerSmallBg } from "@/components/sites/cobfoods-com-3b75ee17/shared/icons";
import { isTouchDevice } from "@/components/sites/cobfoods-com-3b75ee17/shared/device";

const BASE = "/sites/cobfoods-com-3b75ee17/root-8a5edab2";

interface UgcCard {
  previewSrc?: string;
  poster: string;
  alt: string;
  video: string;
}

const CARDS: UgcCard[] = [
  {
    previewSrc:
      "/sites/cobfoods-com-3b75ee17/root-8a5edab2/videos/ugc-preview-107dbbb2.mp4",
    poster: `${BASE}/images/ugc-aaron.jpg`,
    alt: "Aaron",
    video: `${BASE}/videos/ugc-aaron.mp4`,
  },
  {
    previewSrc:
      "/sites/cobfoods-com-3b75ee17/root-8a5edab2/videos/ugc-tss.mp4",
    poster: `${BASE}/images/Screenshot_2026-07-02_125659.png`,
    alt: "TSS 2",
    video: `${BASE}/videos/ugc-tss.mp4`,
  },
  {
    previewSrc:
      "/sites/cobfoods-com-3b75ee17/root-8a5edab2/videos/ugc-preview-94f6268e.mp4",
    poster: `${BASE}/images/ugc-taylor.jpg`,
    alt: "Taylor",
    video: `${BASE}/videos/ugc-taylor.mp4`,
  },
];

/**
 * Port of the theme's video card (`Ga`). Returns { stopAll, destroy }.
 * `stopAllCards` is the shared "videoCard:stopAll" bus.
 */
function attachVideoCard(el: HTMLElement, index: number, stopAllCards: () => void) {
  (el.closest(".swiper-slide") as HTMLElement | null)?.style.setProperty("--index", String(index));
  const previewVideo = el.querySelector<HTMLVideoElement>(".pb-row-ugc-content__card__previewVideo");
  const video = el.querySelector<HTMLVideoElement>(".pb-row-ugc-content__card__video");
  const playBtn = el.querySelector<HTMLButtonElement>(".pb-row-ugc-content__card__playBtn");
  const progress = el.querySelector<HTMLProgressElement>(".pb-row-ugc-content__card__progress");
  let rafId = 0;

  // React's `muted` prop is not reliably reflected; enforce it.
  if (previewVideo) previewVideo.muted = true;
  if (video) video.muted = true;

  const tickProgress = () => {
    if (!video || !progress) return;
    const { currentTime, duration } = video;
    if (duration > 0) progress.value = (currentTime / duration) * 100;
    rafId = requestAnimationFrame(tickProgress);
  };
  const startProgress = () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(tickProgress);
  };
  const stopProgress = () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
    if (progress) progress.value = 0;
  };
  const stopVideo = () => {
    stopProgress();
    if (video) {
      video.pause();
      video.muted = true;
      video.currentTime = 0;
    }
    el.classList.remove("--playing");
  };
  const stopPreview = () => {
    if (previewVideo && !previewVideo.paused) previewVideo.pause();
    el.classList.remove("--previewing");
  };
  const stopAll = () => {
    stopPreview();
    stopVideo();
  };

  const onPlayClick = () => {
    stopAllCards();
    if (!video) return;
    video.muted = false;
    el.classList.add("--playing");
    video.play().catch(() => {});
    startProgress();
  };
  const onVideoClick = () => {
    if (el.classList.contains("--playing")) stopVideo();
  };
  const onVideoEnded = () => stopVideo();
  const onMouseEnter = () => {
    if (el.classList.contains("--playing") || !previewVideo) return;
    if (!previewVideo.getAttribute("src") && el.dataset.previewSrc) previewVideo.src = el.dataset.previewSrc;
    el.classList.add("--previewing");
    previewVideo.play().catch(() => {});
  };
  const onMouseLeave = () => {
    if (!el.classList.contains("--playing")) stopPreview();
  };

  const touch = isTouchDevice();
  playBtn?.addEventListener("click", onPlayClick);
  video?.addEventListener("click", onVideoClick);
  video?.addEventListener("ended", onVideoEnded);
  if (!touch) {
    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", onMouseLeave);
  }

  const destroy = () => {
    playBtn?.removeEventListener("click", onPlayClick);
    video?.removeEventListener("click", onVideoClick);
    video?.removeEventListener("ended", onVideoEnded);
    if (!touch) {
      el.removeEventListener("mouseenter", onMouseEnter);
      el.removeEventListener("mouseleave", onMouseLeave);
    }
    stopAll();
  };
  return { stopAll, destroy };
}

/** Section 03: "Join the 20,000+ Cobstomers" UGC video slider (theme module `ja`). */
export function UgcContentSection() {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rowRef.current;
    if (!root) return;
    const slider = root.querySelector<HTMLElement>(".pb-row-ugc-content__slider");
    const prevBtn = root.querySelector<HTMLElement>(".pb-row-ugc-content__prevBtn");
    const nextBtn = root.querySelector<HTMLElement>(".pb-row-ugc-content__nextBtn");
    const paginationEl = root.querySelector<HTMLElement>(".pb-row-ugc-content__pagination");

    const cards: ReturnType<typeof attachVideoCard>[] = [];
    const stopAllCards = () => cards.forEach((c) => c.stopAll());

    if (!slider) return;
    const swiper = new Swiper(slider, {
      modules: [Navigation, Pagination],
      speed: 500,
      slidesPerView: 1,
      spaceBetween: 0,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      navigation: { nextEl: nextBtn, prevEl: prevBtn },
      pagination: { el: paginationEl, type: "bullets", clickable: true },
      breakpoints: {
        768: { rewind: true, slidesPerView: "auto", spaceBetween: 10 },
        1024: { spaceBetween: 20, rewind: true, slidesPerView: "auto" },
      },
      on: { slideChange: stopAllCards },
    });

    root.querySelectorAll<HTMLElement>(".pb-row-ugc-content__card").forEach((el, i) => {
      cards.push(attachVideoCard(el, i, stopAllCards));
    });

    return () => {
      cards.forEach((c) => c.destroy());
      cards.length = 0;
      swiper.destroy();
    };
  }, []);

  return (
    <section
      id="shopify-section-template--18900032094380__pb_row_ugc_content_nPD9xJ"
      className="shopify-section layout-pb-row-ugc-content"
    >
      <div
        className="pb-row-wrapper pt-60 pb-90 pt-lg-80 pb-lg-180 mt-0 mb-0 mt-lg-0 mb-lg-0 "
        data-scroll-section=""
        data-module-delay=""
        style={{ "--zindex": "0" } as CSSProperties}
      >
        <div
          ref={rowRef}
          id="pb-row-ugc-content-template--18900032094380__pb_row_ugc_content_nPD9xJ"
          className="pb-row pb-row-ugc-content"
          data-module="pb-row-ugc-content"
        >
          <header
            className="pb-row-ugc-content__header container-fluid d-flex align-items-center flex-column grid-gap-20 grid-gap-lg-40 ta-center mb-20 mb-lg-60"
            data-scroll=""
            data-scroll-offset="100px,0"
          >
            <div className="pb-row-ugc-content__rating d-flex align-items-center justify-content-center grid-gap-10">
              <svg id="svg-star-ratings" width="86" height="19" viewBox="0 0 86 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.01006 0.702513C8.3018 -0.234418 9.62788 -0.234418 9.91963 0.702513L11.3279 5.22533C11.4581 5.6433 11.845 5.92803 12.2827 5.92803H16.9277C17.8861 5.92803 18.2956 7.1459 17.5319 7.72491L13.7018 10.6286C13.3661 10.8831 13.2259 11.3206 13.3511 11.7228L14.7966 16.365C15.0859 17.2939 14.013 18.047 13.2377 17.4592L9.56898 14.6778C9.21175 14.407 8.71794 14.407 8.3607 14.6778L4.69196 17.4592C3.91672 18.047 2.84381 17.2939 3.13304 16.365L4.57855 11.7228C4.70378 11.3206 4.56357 10.8831 4.22791 10.6286L0.397837 7.72491C-0.365883 7.14591 0.0435855 5.92803 1.00197 5.92803H5.64696C6.08472 5.92803 6.47159 5.6433 6.60174 5.22533L8.01006 0.702513Z" fill="currentColor" />
                <path d="M53.0101 0.702513C53.3018 -0.234418 54.6279 -0.234418 54.9196 0.702513L56.3279 5.22533C56.4581 5.6433 56.845 5.92803 57.2827 5.92803H61.9277C62.8861 5.92803 63.2956 7.1459 62.5319 7.72491L58.7018 10.6286C58.3661 10.8831 58.2259 11.3206 58.3511 11.7228L59.7966 16.365C60.0859 17.2939 59.013 18.047 58.2377 17.4592L54.569 14.6778C54.2118 14.407 53.7179 14.407 53.3607 14.6778L49.692 17.4592C48.9167 18.047 47.8438 17.2939 48.133 16.365L49.5786 11.7228C49.7038 11.3206 49.5636 10.8831 49.2279 10.6286L45.3978 7.72491C44.6341 7.14591 45.0436 5.92803 46.002 5.92803H50.647C51.0847 5.92803 51.4716 5.6433 51.6017 5.22533L53.0101 0.702513Z" fill="currentColor" />
                <path d="M29.315 0.894849C29.4849 -0.0716422 30.8001 -0.240793 31.209 0.65127L33.1827 4.9575C33.3651 5.35545 33.7852 5.58851 34.2194 5.53267L38.8264 4.94017C39.777 4.81792 40.3384 5.97362 39.6548 6.64531L36.2264 10.0138C35.926 10.3091 35.8427 10.7609 36.0182 11.1438L38.0441 15.5638C38.4494 16.4481 37.4813 17.3319 36.6374 16.8479L32.6439 14.5572C32.255 14.3341 31.7652 14.3971 31.4455 14.7113L28.1615 17.9379C27.4676 18.6197 26.3073 18.0097 26.4757 17.0515L27.3173 12.2628C27.3902 11.8479 27.1953 11.4319 26.8299 11.2223L22.6608 8.83087C21.8294 8.35402 22.0802 7.09386 23.0308 6.97161L27.6378 6.37911C28.072 6.32327 28.4194 5.99151 28.4951 5.56036L29.315 0.894849Z" fill="currentColor" />
                <path d="M76.054 0.927708C76.4136 0.0146667 77.7361 0.11181 77.9584 1.06759L79.0316 5.68143C79.1308 6.1078 79.4958 6.42011 79.9324 6.45218L84.5649 6.79245C85.5207 6.86266 85.8398 8.10726 85.0358 8.62876L81.0033 11.2441C80.6499 11.4733 80.478 11.8994 80.5734 12.3096L81.675 17.0453C81.8954 17.9929 80.7702 18.6653 80.0401 18.0224L76.5849 14.9797C76.2485 14.6834 75.756 14.6472 75.3799 14.8912L71.5173 17.3963C70.7011 17.9257 69.6862 17.0961 70.0427 16.1909L71.8244 11.667C71.9788 11.2751 71.871 10.8284 71.5548 10.5501L67.9478 7.3736C67.2285 6.7402 67.7261 5.55559 68.6819 5.6258L73.3144 5.96607C73.751 5.99814 74.1577 5.74251 74.3181 5.3352L76.054 0.927708Z" fill="currentColor" />
              </svg>
              <span className="pb-row-ugc-content__ratingCount m-0 fz-16 fz-lg-20 tt-uppercase overflow-hidden ff-heading">
                600+ reviews
              </span>
            </div>
            <h2 className="pb-row-ugc-content__title ff-heading tt-uppercase lh-none m-0 fz-lg-64">
              JOIN THE <strong>20,000+</strong> COBSTOMERS
            </h2>
            <div className="pb-row-ugc-content__description wysiwyg fz-16 fz-lg-24">
              <p>
                Real stories from real food lovers. Watch the videos below to find out why our community chooses COB
                Foods for fresh, high-quality, and delicious ingredients every single day.
              </p>
            </div>
          </header>
          <div
            className="pb-row-ugc-content__sliderWrap d-flex flex-column align-items-center position-relative pl-60 pr-60 p-lg-0"
            data-scroll=""
            data-scroll-offset="100px,0"
          >
            <div className="pb-row-ugc-content__slider swiper w-100">
              <div className="swiper-wrapper">
                {CARDS.map((card, i) => (
                  <div
                    key={card.video}
                    className="pb-row-ugc-content__slide swiper-slide"
                    style={{ "--index": String(i) } as CSSProperties}
                  >
                    <div
                      className="pb-row-ugc-content__card position-relative overflow-hidden"
                      data-preview-src={card.previewSrc}
                    >
                      <figure className="pb-row-ugc-content__card__thumbnail position-absolute t-0 l-0 w-100 h-100 m-0 p-0">
                        <img
                          src={card.poster}
                          alt={card.alt}
                          loading="lazy"
                          className="pb-row-ugc-content__card__thumbnailImg image-as-background"
                        />
                      </figure>
                      <video className="pb-row-ugc-content__card__previewVideo w-100 h-100" muted playsInline preload="none" loop />
                      <video
                        className="pb-row-ugc-content__card__video w-100 h-100"
                        src={card.video}
                        poster={card.poster}
                        muted
                        playsInline
                        preload="none"
                        aria-label={card.alt}
                      />
                      <progress className="pb-row-ugc-content__card__progress position-absolute" value="0" max="100" aria-hidden="true" />{" "}
                      <button className="pb-row-ugc-content__card__playBtn position-absolute" aria-label="Play video" type="button">
                        <svg
                          className="pb-row-ugc-content__card__playIcon"
                          width="74"
                          height="42"
                          viewBox="0 0 74 42"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="74" height="41.1111" rx="2.05556" fill="black" fillOpacity="0.7" />
                          <path d="M28.2637 10.2778L47.7915 20.5556L28.2637 30.8334V10.2778Z" fill="white" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <nav className="pb-row-ugc-content__controls d-flex align-items-center justify-content-between pointer-events-none position-absolute t-0 l-0 w-100 pl-40 pr-40 pl-lg-50 pr-lg-50">
              <Btn
                className="pb-row-ugc-content__prevBtn pointer-events-all --close --close-yellow"
                aria-label=""
                behavior="close"
                bg={<FlowerSmallBg />}
                icon={<ArrowLeftIcon />}
                iconClass="--icon-arrow-left"
              />{" "}
              <Btn
                className="pb-row-ugc-content__nextBtn pointer-events-all --close --close-yellow"
                aria-label=""
                behavior="close"
                bg={<FlowerSmallBg />}
                icon={<ArrowRightIcon />}
                iconClass="--icon-arrow-right"
              />
            </nav>
            <div className="pb-row-ugc-content__pagination swiper-pagination mt-10 mt-lg-30 z-10" />
          </div>
          <div className="pb-row-ugc-content__disclaimerWrapper container-fluid d-flex justify-content-center">
            <p className="pb-row-ugc-content__disclaimer ta-center fz-12 fz-lg-14 m-0 mt-10 mt-lg-20">
              Testimonials featured in videos or other promotional materials may include individuals who have received
              compensation, free product, or other incentives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
