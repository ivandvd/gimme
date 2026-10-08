"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, type CSSProperties } from "react";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Btn } from "@/components/sites/cobfoods-com-3b75ee17/shared/Btn";
import { ArrowLeftIcon, ArrowRightIcon, FlowerSmallBg } from "@/components/sites/cobfoods-com-3b75ee17/shared/icons";

const IMG = "/sites/cobfoods-com-3b75ee17/root-8a5edab2/images";

interface Post {
  id: string;
  href: string;
  title: string;
  img: string;
  alt: string;
  width: string;
  height: string;
}

const POSTS: Post[] = [
  {
    id: "560944611500",
    href: "/blogs/news/3-corn-free-valentines-day-treats",
    title: "3 Corn-Free Valentine's Day Treats",
    img: `${IMG}/IMG_7827_f136faee-0761-4a7a-bc62-2c50f405995a_1800x.jpg`,
    alt: "A woman's hand holding a homemade crispy chocolate bar",
    width: "4284",
    height: "5712",
  },
  {
    id: "560960536748",
    href: "/blogs/news/super-bowl-snacks",
    title: "4 Winning Super Bowl Snacks",
    img: `${IMG}/IMG_7202_1800x.jpg`,
    alt: "A bowl of chili next to a bag of white cheddar popcorn",
    width: "4284",
    height: "5712",
  },
  {
    id: "560862527660",
    href: "/blogs/news/cob-crispy-treats",
    title: "Cob Crispy Treats",
    img: `${IMG}/COB-7848_520x500_b8cc295a-07b9-42cd-a2c8-883538b14c12_576x.jpg`,
    alt: "Woman's hand reaching into a bowl of popcorn on a kitchen table with other ingredients",
    width: "520",
    height: "374",
  },
  {
    id: "560044769452",
    href: "/blogs/news/what-does-all-natural-really-mean",
    title: "Behind the label: What does “All Natural” REALLY Mean?",
    img: `${IMG}/COB_BLOGUE01_1800x.jpg`,
    alt: "Cut citrus and pomegranates ",
    width: "1920",
    height: "1272",
  },
  {
    id: "560741843116",
    href: "/blogs/news/4-deliciously-festive-corn-free-cookie-recipes",
    title: "4 Deliciously Festive Corn-Free Cookie Recipes",
    img: `${IMG}/food-photographer-jennifer-pallian-XI_EJ7mtqZ8-unsplash_1800x.jpg`,
    alt: "Gingerbread men and other holiday cookies on decorative plates",
    width: "3614",
    height: "4518",
  },
  {
    id: "560705437868",
    href: "/blogs/news/12-tasty-corn-free-snacks-to-pack-on-your-next-roadtrip",
    title: "12 Tasty Corn-Free Snacks to Pack on Your Next Roadtrip",
    img: `${IMG}/frank-van-hulst-e8EKuVR8pt4-unsplash_1800x.jpg`,
    alt: "A yellow and white sprinter van is parked by the coast",
    width: "3993",
    height: "2662",
  },
];

function PostPreview({ post }: { post: Post }) {
  const maskId = `post-preview-image-${post.id}`;
  return (
    <article
      className="post-preview position-relative ta-center --slider pb-row-featured-posts__postPreview"
      data-scroll=""
      data-scroll-offset="100px,0"
    >
      <a
        href={post.href}
        className="post-preview__link btn --link --link-underline-hover td-none d-flex flex-column w-100"
      >
        <h3 className="post-preview__title tt-uppercase lh-none m-0 fz-20 fz-md-24 fz-lg-32 order-2">
          <span className="btn__label">{post.title}</span>
        </h3>
        <figure
          className="post-preview__image position-relative box box-landscape masked-img w-100 mb-20 mb-lg-40 order-1"
          style={{ "--mask": `url(#${maskId})` } as CSSProperties}
        >
          <div className="post-preview__imageWrap box-content">
            <img
              src={post.img}
              alt={post.alt}
              width={post.width}
              height={post.height}
              className="post-preview__img image-as-background"
            />
            <svg
              width="0"
              height="0"
              className="svg-mask position-absolute t-0 l-0 pointer-events-none "
              preserveAspectRatio="none"
            >
              <clipPath id={maskId} clipPathUnits="objectBoundingBox">
                <use className="svg-mask-path" href="#svg-puff-mask-shape-a-path" />
              </clipPath>
            </svg>
          </div>
        </figure>
        <p className="post-preview__more tt-uppercase color-purple fz-12 fz-lg-16 lh-none p-0 m-0 mt-10 mt-lg-20 order-3">
          Get cooking
        </p>
      </a>
    </article>
  );
}

/** Section 11 — "Our fave recipes" slider (theme module `pb-row-featured-posts`, class `Ns`). */
export function FeaturedPostsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const nextEl = slider.querySelector<HTMLElement>(".pb-row-featured-posts__nextBtn");
    const prevEl = slider.querySelector<HTMLElement>(".pb-row-featured-posts__prevBtn");
    const paginationEl = slider.querySelector<HTMLElement>(".pb-row-featured-posts__pagination");
    const swiper = new Swiper(slider, {
      modules: [Navigation, Pagination],
      navigation: { nextEl, prevEl },
      pagination: { clickable: true, el: paginationEl },
      slidesPerGroup: 1,
      slidesPerView: 1,
      slidesOffsetAfter: 0,
      slidesOffsetBefore: 0,
      spaceBetween: 0,
      speed: 650,
      breakpoints: {
        768: { slidesPerGroup: 2, slidesPerView: 2, spaceBetween: 60 },
        1200: { slidesPerGroup: 2, slidesPerView: 2, spaceBetween: 105 },
      },
    });
    return () => {
      swiper.destroy(true, false);
    };
  }, []);

  return (
    <section
      id="shopify-section-template--18900032094380__pb_row_featured_posts_nxdeU8"
      className="shopify-section layout-pb-row-featured-posts"
    >
      <div
        className="pb-row-wrapper pt-0 pb-0 pt-lg-0 pb-lg-0 mt-0 mb-0 mt-lg-0 mb-lg-0 position-relative overflow-hidden"
        data-scroll-section=""
        data-module-delay=""
        style={{ "--zindex": "0" } as CSSProperties}
      >
        <div
          id="pb-row-featured-posts-template--18900032094380__pb_row_featured_posts_nxdeU8"
          className="pb-row pb-row-featured-posts d-flex flex-column grid-gap-40 "
          data-module="pb-row-featured-posts"
        >
          <header className="pb-row-featured-posts__header container-fluid">
            <h2
              className="pb-row-featured-posts__title w-100 fz-32 fz-md-64 fw-400 lh-none ta-center tt-uppercase m-0"
              aria-label="Our fave recipes"
            >
              Our fave recipes
            </h2>
          </header>
          <div ref={sliderRef} className="pb-row-featured-posts__slider w-100 swiper">
            <ol className="swiper-wrapper list-none m-0 p-0">
              {POSTS.map((post) => (
                <li key={post.id} className="pb-row-featured-posts__slide swiper-slide">
                  <PostPreview post={post} />
                </li>
              ))}
            </ol>
            <div className="pb-row-featured-posts__pagination swiper-pagination" />
            <Btn
              className="pb-row-featured-posts__prevBtn position-absolute l-0 ml-30 --close --close-pink"
              behavior="close"
              bg={<FlowerSmallBg />}
              icon={<ArrowLeftIcon />}
              iconClass="--icon-arrow-left"
              aria-label=""
            />{" "}
            <Btn
              className="pb-row-featured-posts__nextBtn position-absolute r-0 mr-30 --close --close-pink"
              behavior="close"
              bg={<FlowerSmallBg />}
              icon={<ArrowRightIcon />}
              iconClass="--icon-arrow-right"
              aria-label=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
