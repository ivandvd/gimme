/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";
import { Btn } from "@/components/sites/cobfoods-com-3b75ee17/shared/Btn";
import { CtaMediumBg, StarIcon } from "@/components/sites/cobfoods-com-3b75ee17/shared/icons";
import { SplitText } from "@/components/sites/cobfoods-com-3b75ee17/shared/SplitText";

const IMG = "/sites/cobfoods-com-3b75ee17/root-8a5edab2/images";
const THEME = "/sites/cobfoods-com-3b75ee17/shared/theme";

interface Product {
  href: string;
  title: string;
  img: string;
  hoverImg: string;
}

const PRODUCTS: Product[] = [
  {
    href: "/products/olive-oil-sea-salt",
    title: "Olive Oil Pink Salt",
    img: `${IMG}/Cob_Popped-1oz_Renderings_OOPS-Front-1-1_1800x.png`,
    hoverImg: `${IMG}/OOPS_Rollover_1800x.png`,
  },
  {
    href: "/products/seriously-cheesy",
    title: "Seriously Cheesy",
    img: `${IMG}/Cob_Popped-1oz_Renderings_OOPS-Front-3-1_1800x.png`,
    hoverImg: `${IMG}/COB_R2_coloring-18-SeriouslyCheesy_1800x.jpg`,
  },
  {
    href: "/products/cacio-e-pepe",
    title: "Cacio E Pepe",
    img: `${IMG}/Cob_Popped-1oz_Renderings_OOPS-Front-2-1_1800x.png`,
    hoverImg: `${IMG}/CEP_Rollover_1800x.png`,
  },
  {
    href: "/products/mediterranean-herbs",
    title: "Mediterranean Herb",
    img: `${IMG}/Cob_Popped-1oz_Renderings_OOPS-Front-4-1_1800x.png`,
    hoverImg: `${IMG}/MedHerb_Rollover_1800x.png`,
  },
];

/**
 * The theme's PbRowFeaturedProducts module moves the subtitle pill into the title as its
 * first child after Splitting has run, so it is rendered as SplitText's unsplit `leading`.
 */
const SUBTITLE_PILL = (
  <span
    className="pill m-0 pb-row-featured-products__subtitle order-1 d-inline-block mr-5 mr-md-20 fz-14"
    aria-label="Subscribe & Save 20%"
  >
    <span className="pill__content__wrap d-inline-block">
      <span className="pill__content d-inline-flex align-items-center justify-content-center ff-body fw-400 tt-uppercase lh-none bg-color-yellow color-primary">
        Subscribe & Save 20%
      </span>
    </span>
  </span>
);

function ProductPreviewCompact({ product }: { product: Product }) {
  return (
    <article className="product-preview-compact ta-center overflow-hidden  --with-cta" data-scroll="" data-scroll-offset="100px,0">
      <a href={product.href} className="product-preview-compact__link position-relative d-flex flex-column td-none">
        <div className="product-preview-compact__imgWrap box box-portrait overflow-hidden pointer">
          <img src={product.img} alt="" className="product-preview-compact__img image-as-background object-fit-contain" />
          <figure className="product-preview-compact__imgHoverWrap position-absolute t-0 l-0 w-100 h-100 z-2000 pointer-events-none">
            <img src={product.hoverImg} alt="" className="product-preview-compact__imgHover image-as-background" />
          </figure>
        </div>
        <div className="product-preview-compact__content ta-center">
          <p className="product-preview-compact__type fz-12 fz-md-14 tt-uppercase mt-0 mb-5 lh-none">Popped Sorghum</p>
          <h3 className="product-preview-compact__title fz-20 fz-md-36 lh-none tt-uppercase m-0">
            <span className="d-inline">{product.title}</span>
          </h3>
          <Btn
            className="product-preview__cta mt-10 mt-lg-20 ml-auto mr-auto --cta --cta-medium --cta-inverted"
            behavior="cta"
            bg={<CtaMediumBg />}
            label="Shop Now"
            aria-label="Shop Now"
          />
        </div>
      </a>
    </article>
  );
}

export function FeaturedProductsSection() {
  return (
    <section id="shopify-section-template--18900032094380__1654699522c2b4e23c" className="shopify-section section">
      <div
        className="pb-row-wrapper pt-50 pb-100 pt-lg-140 pb-lg-150 mt-0 mb-0 mt-lg-0 mb-lg-0 position-relative overflow-hidden"
        data-scroll-section=""
        data-module-delay=""
        style={{ "--zindex": "0" } as CSSProperties}
      >
        <div
          id="pb-row-featured-products-template--18900032094380__1654699522c2b4e23c"
          className="pb-row pb-row-featured-products "
          data-module="pb-row-featured-products"
          data-pb-row-featured-products=""
        >
          <header
            className="pb-row-featured-products__header container-fluid d-flex flex-wrap align-items-center justify-content-center mb-30 mb-md-60 --has-title"
            data-scroll=""
            data-scroll-offset="200px,0"
          >
            <SplitText
              as="h2"
              className="pb-row-featured-products__title fz-28 fz-md-64 fz-xl-100 ff-body fw-400 tt-uppercase lh-none m-0 mb-30 mb-md-40 order-2 ta-center w-100"
              splitting="wordsMask"
              leading={SUBTITLE_PILL}
              data-scroll=""
              data-scroll-offset="200px,0"
              data-text-animation="slidein-by-lines"
            >
              Corn-free{" "}
              <span className="pb-row-featured-products__title__star color-green d-inline-block" aria-hidden="true">
                <StarIcon id="svg-star" />
              </span>
              <br />
              SNACKS
              <img
                className="pb-row-featured-products__title__pop d-inline-block"
                src={`${THEME}/popcorn-item.png`}
                alt=""
                height="240"
                width="240"
                loading="lazy"
                aria-hidden="true"
              />
              made with <br />
              ancient supergrain
              <br />
              popped sorghum
            </SplitText>{" "}
            <img
              src={`${THEME}/popcorn-group-1.png`}
              className="pb-row-featured-products__pop-group --group-1 position-absolute l-0 pointer-events-none"
              alt=""
              height="524"
              width="655"
              loading="lazy"
              aria-hidden="true"
              data-scroll=""
              data-scroll-speed="1"
            />{" "}
            <img
              src={`${THEME}/popcorn-group-2.png`}
              className="pb-row-featured-products__pop-group --group-2 position-absolute t-0 r-0 pointer-events-none"
              alt=""
              height="561"
              width="655"
              loading="lazy"
              aria-hidden="true"
              data-scroll=""
              data-scroll-speed="-1"
            />{" "}
            <Btn
              href="/collections/all"
              className="pb-row-featured-products__cta order-3 d-none d-md-flex align-self-center --cta --cta-medium"
              behavior="cta"
              bg={<CtaMediumBg />}
              label="Shop all"
              aria-label="Shop all"
            />
          </header>
          <div className="pb-row-featured-products__gridWrap position-relative ">
            <div
              className="pb-row-featured-products__grid container-fluid d-grid grid-gap-20 grid-gap-md-30 grid-column-2 grid-column-xl-4 pb-lg-50 "
              style={{ "--pb": "100", "--pb-lg": "150" } as CSSProperties}
            >
              {PRODUCTS.map((product) => (
                <ProductPreviewCompact key={product.href} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
