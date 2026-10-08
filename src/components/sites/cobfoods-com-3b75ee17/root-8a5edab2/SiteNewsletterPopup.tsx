"use client";

/* eslint-disable @next/next/no-img-element */
import { useCallback, useRef, useState } from "react";
import { Btn } from "@/components/sites/cobfoods-com-3b75ee17/shared/Btn";
import { useEmitter } from "@/components/sites/cobfoods-com-3b75ee17/shared/hooks";
import { CloseIcon, CtaOvalBg, FlowerSmallBg, StarIcon } from "@/components/sites/cobfoods-com-3b75ee17/shared/icons";
import { SplitText } from "@/components/sites/cobfoods-com-3b75ee17/shared/SplitText";
import { NewsletterForm } from "./NewsletterForm";

const CLOSED = "closed";

/**
 * Port of the theme's SiteNewsletter module (`zl`): the modal opens once the page has been
 * scrolled past `data-minimum-scroll-distance` unless the user already closed it (preference kept
 * in localStorage under `data-cookie-name`). `[aria-controls="site-newsletter"]` elements and the
 * "SiteNewsletter.close" event close it; visibility is `aria-hidden` (CSS handles the animation).
 */
export function SiteNewsletterPopup() {
  const elRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);
  const [visible, setVisible] = useState(false);

  const cookieName = () => elRef.current?.dataset.cookieName ?? "cob-newsletter-modal-launch";

  const setVisibility = useCallback((v: boolean) => {
    if (visibleRef.current === v) return;
    visibleRef.current = v;
    setVisible(v);
  }, []);

  const userPreference = (): string | undefined => {
    try {
      const raw = localStorage.getItem(cookieName());
      return raw ? (JSON.parse(raw) as { value?: string } | null)?.value : undefined;
    } catch {
      return undefined;
    }
  };

  const saveUserPreference = () => {
    try {
      localStorage.setItem(cookieName(), JSON.stringify({ value: CLOSED, host: window.location.host }));
    } catch {
      /* storage unavailable */
    }
  };

  const handleTriggers = () => {
    if (!visibleRef.current) return;
    setVisibility(false);
    saveUserPreference();
  };

  useEmitter("SiteScroll.scroll", ({ y }: { y: number }) => {
    const minDistance = Number(elRef.current?.dataset.minimumScrollDistance ?? 600);
    if (y > minDistance && userPreference() !== CLOSED) setVisibility(true);
  });
  useEmitter("SiteNewsletter.saveUserPreference", saveUserPreference);
  useEmitter("SiteNewsletter.close", handleTriggers);

  return (
    <div id="shopify-section-site-newsletter" className="shopify-section">
      <div
        ref={elRef}
        id="site-newsletter"
        className="site-newsletter d-flex flex-column align-items-center justify-content-center position-fixed t-0 l-0 w-100 h-100 z-9000"
        data-ui="site-newsletter"
        data-cookie-duration="14"
        data-cookie-name="cob-newsletter-modal-launch"
        data-minimum-scroll-distance="600"
        aria-hidden={visible ? "false" : "true"}
      >
        <div className="site-newsletter__wrap d-flex flex-column position-relative z-1000">
          <Btn
            className="site-newsletter__closeBtn position-absolute z-2000 --close"
            behavior="close"
            aria-controls="site-newsletter"
            aria-label="✕"
            bg={<FlowerSmallBg />}
            label="✕"
            icon={<CloseIcon />}
            iconClass="--icon-close"
            onClick={handleTriggers}
          />
          <header className="site-newsletter__header position-relative color-white">
            <SplitText
              as="h3"
              className="site-newsletter__title position-relative z-1000 d-flex justify-content-center m-0 fz-24 fz-md-48 lh-none tt-uppercase"
              splitting=""
              data-text-animation="slidein-by-words"
            >
              Subscribe to our newsletter and get 15% off your first order
            </SplitText>
            <img
              src="/sites/cobfoods-com-3b75ee17/root-8a5edab2/images/COB_R2_coloring-16_1800x.jpg"
              alt=""
              width="1201"
              height="1800"
              className="site-newsletter_img image-as-background pointer-events-none"
            />
          </header>
          <div className="site-newsletter__percentOff position-absolute z-1000 pointer-events-none">
            <div className="site-newsletter__percentOff__wrap position-relative d-flex flex-column align-items-center justify-content-center">
              <h3 className="site-newsletter__percentOff__title m-0 fz-24 fz-md-48 fz-xl-54 lh-none ta-center position-relative z-1000 color-burgundy">
                15%
              </h3>
              <svg id="svg-puff" xmlns="http://www.w3.org/2000/svg" width="403" height="376" fill="none" viewBox="0 0 403 376">
                <path
                  fill="currentColor"
                  d="M403 187.464c0-39.726-32.125-71.927-71.751-71.927-.363 0-.713.048-1.072.054 9.263-12.116 14.827-27.222 14.827-43.663C345.004 32.204 312.879 0 273.253 0c-29.349 0-54.543 17.685-65.659 42.984C196.478 17.684 171.284 0 141.935 0c-39.626 0-71.751 32.204-71.751 71.928 0 17.063 5.955 32.714 15.857 45.046a71.771 71.771 0 0 0-14.29-1.437C32.125 115.537 0 147.741 0 187.464c0 39.724 32.125 71.925 71.751 71.925 5.288 0 10.427-.612 15.387-1.699-10.563 12.527-16.957 28.698-16.957 46.386 0 39.723 32.125 71.924 71.751 71.924 29.349 0 54.542-17.685 65.659-42.984C218.707 358.315 243.901 376 273.25 376c39.626 0 71.751-32.204 71.751-71.924 0-16.946-5.882-32.488-15.66-44.779.639.015 1.262.095 1.904.095 39.627 0 71.752-32.204 71.752-71.924l.003-.004Z"
                />
              </svg>
            </div>
          </div>
          <div className="site-newsletter__star position-absolute z-1000 pointer-events-none">
            <span className="site-newsletter__star__wrap d-block color-yellow">
              <StarIcon id="svg-star" />
            </span>
          </div>
          <footer className="site-newsletter__footer">
            <NewsletterForm
              action="."
              className="site-newsletter__form newsletter position-relative"
              method="POST"
              data-module="newsletter"
              data-newsletter=""
            >
              <div className="newsletter__wrap">
                <p className="site-newsletter__text fz-14 fz-md-20 ta-center m-0 mb-20 mb-md-30">
                  Plus, get the inside scoop on upcoming sales, new products, recipes &amp; more!
                </p>
                <div className="d-flex align-items-center justify-content-center">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    className="site-newsletter__input bg-color-beige w-100 fz-14 fz-md-16 fz-lg-18"
                  />
                  <input type="hidden" name="listid" value="Txctfn" />{" "}
                  <Btn
                    className="site-newsletter__submitBtn fz-12 fz-lg-18 ml-10 ml-md-30 --cta --cta-oval"
                    behavior="cta"
                    type="submit"
                    aria-label="Join now"
                    bg={<CtaOvalBg />}
                    label="Join now"
                  />
                </div>
              </div>
              <div className="newsletter__loading" aria-hidden="true" />
              <div
                className="newsletter__message"
                aria-hidden="true"
                data-message="Use code <strong>POPTOIT15</strong> for 15% OFF!"
              />
            </NewsletterForm>
          </footer>
        </div>
        <div
          className="site-newsletter__bg position-fixed t-0 l-0 w-100 h-100 z-0"
          aria-controls="site-newsletter"
          onClick={handleTriggers}
        />
      </div>
    </div>
  );
}
