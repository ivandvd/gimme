"use client";

import type { MouseEvent } from "react";
import { Btn } from "@/components/sites/cobfoods-com-3b75ee17/shared/Btn";
import { emitter } from "@/components/sites/cobfoods-com-3b75ee17/shared/emitter";
import { FlowerLargeBg, UserIcon } from "@/components/sites/cobfoods-com-3b75ee17/shared/icons";

const MENU_BG_PATH =
  "M101.536 47.009C101.538 44.6503 101.075 42.3144 100.173 40.1348C99.2706 37.9552 97.9476 35.9746 96.2794 34.3061C94.6112 32.6377 92.6303 31.3142 90.4501 30.4112C88.2698 29.5081 85.9328 29.0434 83.5727 29.0434C83.4822 29.0434 83.3916 29.0434 83.3054 29.0434C84.8581 27.029 85.9648 24.7078 86.552 22.2336C87.1391 19.7594 87.1934 17.1888 86.7113 14.692C86.2291 12.1953 85.2215 9.8295 83.7552 7.75141C82.2889 5.67332 80.3974 3.93041 78.2061 2.6382C76.0148 1.34598 73.5737 0.533974 71.0446 0.255989C68.5155 -0.0219967 65.9562 0.240392 63.5363 1.02576C61.1163 1.81113 58.891 3.10154 57.0079 4.81147C55.1247 6.52141 53.6267 8.61181 52.6131 10.9441C51.5896 8.59592 50.0751 6.49382 48.1713 4.7791C46.2675 3.06437 44.0185 1.77674 41.5754 1.00271C39.1324 0.228676 36.5519 -0.0138162 34.0073 0.291523C31.4627 0.596862 29.013 1.44295 26.8227 2.77296C24.6324 4.10296 22.7524 5.88607 21.3088 8.00246C19.8653 10.1189 18.8917 12.5195 18.4535 15.0431C18.0153 17.5667 18.1226 20.1549 18.7683 22.6336C19.414 25.1123 20.583 27.4242 22.1968 29.414C19.574 28.8773 16.8644 28.9332 14.266 29.5775C11.6676 30.2218 9.2461 31.4382 7.17853 33.1379C5.11095 34.8376 3.44955 36.9776 2.31578 39.4014C1.18201 41.8252 0.604534 44.4715 0.625554 47.147C0.646574 49.8225 1.26557 52.4595 2.43728 54.8652C3.60899 57.2709 5.30381 59.3845 7.39783 61.0516C9.49186 62.7186 11.9322 63.8969 14.5404 64.5004C17.1486 65.1038 19.8587 65.1171 22.4728 64.5394C20.7997 66.5036 19.5699 68.8052 18.8672 71.2873C18.1645 73.7694 18.0055 76.3738 18.4008 78.9229C18.7962 81.472 19.7367 83.906 21.1583 86.059C22.5799 88.2121 24.4491 90.0336 26.6387 91.3994C28.8283 92.7653 31.2868 93.6434 33.8466 93.974C36.4064 94.3046 39.0074 94.0798 41.4725 93.3151C43.9375 92.5503 46.2087 91.2635 48.1312 89.5423C50.0537 87.8211 51.5824 85.706 52.6131 83.341C53.6377 85.682 55.1505 87.7774 57.0505 89.487C58.9506 91.1967 61.1939 92.4812 63.6306 93.2547C66.0673 94.0282 68.6412 94.2728 71.1801 93.9722C73.719 93.6716 76.1644 92.8327 78.3528 91.5116C80.5412 90.1905 82.4221 88.4176 83.8698 86.3116C85.3175 84.2056 86.2986 81.8149 86.7474 79.2995C87.1963 76.784 87.1026 74.2018 86.4725 71.7255C85.8425 69.2491 84.6907 66.9358 83.0941 64.9401C83.2536 64.9401 83.4089 64.9617 83.5727 64.9617C88.337 64.9617 92.906 63.0702 96.2748 59.7035C99.6436 56.3367 101.536 51.7703 101.536 47.009Z";

const LOGO_COB_PATH =
  "M214.248 86.9202C185.824 86.9202 161.914 127.533 154.927 182.651C146.692 228.03 128.869 244.416 115.4 250.185C86.7995 259.746 56.5559 237.746 51.8436 162.021C43.4996 27.659 93.0098 23.6751 93.0098 23.6751C93.0098 23.6751 119.29 19.5274 121.043 60.6952C123.676 122.661 74.6194 132.368 74.6194 132.368C74.6194 132.368 93.5274 154.299 129.418 148.758C150.015 145.571 170.662 126.426 166.331 79.6719C158.745 -2.20386 95.9062 0.0043191 95.9062 0.0043191C36.513 1.33833 0 66.0403 0 169.06C0 260.215 31.996 345.009 83.4038 345.009C129.387 345.009 151.096 294.963 156.244 258.334C164.588 308.79 187.404 345.009 214.248 345.009C248.155 345.009 275.643 287.236 275.643 215.969C275.643 144.702 248.155 86.9202 214.248 86.9202ZM214.248 228.294C200.37 228.294 189.12 204.646 189.12 175.48C189.12 146.313 200.37 122.665 214.248 122.665C228.126 122.665 239.38 146.309 239.38 175.48C239.38 204.65 228.126 228.294 214.248 228.294Z";

const LOGO_B_PATH =
  "M370.605 86.9205C348.36 85.459 333.665 101.9 330.46 110.373V17.7202H284.241V345H330.46V298.856C338.482 327.061 351.715 345 370.605 345C404.512 345 432 287.228 432 215.96C432 144.693 404.998 89.1834 370.605 86.9205ZM357.222 228.294C342.436 228.294 330.437 204.646 330.437 175.48C330.437 146.314 342.422 122.666 357.222 122.666C372.021 122.666 384.006 146.309 384.006 175.48C384.006 204.651 372.021 228.294 357.222 228.294Z";

function Letters({ word, className }: { word: string; className: string }) {
  return (
    <>
      {word.split("").map((letter, i) => (
        <span key={i} className={className}>
          {letter}
        </span>
      ))}
    </>
  );
}

/**
 * `#shopify-section-site-header` (fixed header: MENU pill, SHOP NOW flower, CART oval, mobile
 * account circle) followed by the big fixed "Cob" `.site-logo`. Hide-on-scroll is pure CSS driven
 * by the body classes the scroll engine sets. MENU emits `SiteNav.toggle` (SiteNav owns state);
 * the CART button is picked up by SiteCart through its `aria-controls="site-cart"`.
 */
export function SiteHeader() {
  const onMenuClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    emitter.emit("SiteNav.toggle");
  };

  return (
    <>
      <div id="shopify-section-site-header" className="shopify-section section-header">
        <header
          className="site-header position-fixed z-8000 t-0 l-0 w-100 vh-100 pointer-events-none overflow-hidden"
          id="site-header"
        >
          <div className="site-header__wrap d-flex align-items-center justify-content-between align-items-start w-100">
            <button
              className="site-header__menuBtn position-relative ff-heading fz-14 fz-lg-40 tt-uppercase bg-color-yellow color-burgundy pointer-events-all overflow-hidden"
              type="button"
              aria-label="Menu"
              aria-controls="site-nav"
              aria-expanded="false"
              onClick={onMenuClick}
            >
              <span className="site-header__menuBtn__bg position-absolute t-0 l-0 w-100 h-100 color-green">
                <svg width="102" height="95" viewBox="0 0 102 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d={MENU_BG_PATH} fill="currentColor" />
                </svg>
              </span>{" "}
              <span className="site-header__menuBtn__letterWrap w-100 h-100 d-flex align-items-center justify-content-center --closed">
                <Letters word="MENU" className="site-header__menuBtn__letter" />
              </span>{" "}
              <span className="site-header__menuBtn__letterWrap position-absolute t-0 l-0 w-100 h-100 d-flex align-items-center justify-content-center --opened">
                <Letters word="CLOSE" className="site-header__menuBtn__letter" />
              </span>
            </button>{" "}
            <Btn
              href="/collections/all"
              className="site-header__shopBtn pointer-events-all fz-12 fz-lg-24 ml-auto mr-10 mr-lg-20 --sharing --sharing-inverted"
              aria-label="Shop<br/>now"
              behavior="sharing"
              bg={<FlowerLargeBg />}
              label={
                <>
                  Shop
                  <br />
                  now
                </>
              }
            />{" "}
            <button
              className="site-header__cartBtn position-relative ff-heading pointer-events-all"
              type="button"
              aria-label="Cart"
              aria-controls="site-cart"
              aria-expanded="false"
            >
              <span
                className="site-header__cartLabel position-relative d-block fz-14 fz-lg-24 tt-uppercase color-yellow bg-color-burgundy overflow-hidden"
                aria-hidden="true"
              >
                <span className="site-header__cartLabel__letterWrap w-100 h-100 d-flex align-items-center justify-content-center --closed">
                  <Letters word="CART" className="site-header__cartLabel__letter" />
                </span>{" "}
                <span className="site-header__cartLabel__letterWrap position-absolute t-0 l-0 w-100 h-100 d-flex align-items-center justify-content-center --opened color-pink">
                  <Letters word="CLOSE" className="site-header__cartLabel__letter" />
                </span>
              </span>{" "}
              <span className="site-header__cartCountWrap d-block position-absolute t-0 r-0">
                <span
                  className="site-header__cartCount position-relative fz-12 fz-lg-base color-burgundy d-flex align-items-center justify-content-center --empty"
                  aria-hidden="true"
                  data-cart-counter=""
                >
                  <span />
                </span>
              </span>
            </button>{" "}
            <Btn
              href="/a/account/login"
              className="site-header__accountBtn d-inline-flex d-lg-none pointer-events-all ml-10 --circle --circle-account-circle"
              aria-label="Account"
              label="Account"
              icon={<UserIcon />}
              iconClass="--icon-user"
            />
          </div>
        </header>
        <div className="site-header__spacer w-100 visibility-hidden" data-scroll-section="" aria-hidden="true" />
      </div>
      <div className="site-logo position-fixed z-7000">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- original markup uses a plain link */}
        <a href="/">
          <figure className="site-logo__logo">
            <svg width="432" height="345" viewBox="0 0 432 345" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_42_1029)">
                <path d={LOGO_COB_PATH} fill="currentColor" />
                <path d={LOGO_B_PATH} fill="currentColor" />
              </g>
              <defs>
                <clipPath id="clip0_42_1029">
                  <rect width="432" height="345" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </figure>
        </a>
      </div>
    </>
  );
}
