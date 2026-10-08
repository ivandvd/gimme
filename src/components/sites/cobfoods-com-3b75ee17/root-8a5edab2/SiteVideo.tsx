"use client";

/**
 * Port of the theme's SiteVideo UI module (`Zl`): a fullscreen video modal.
 *  - Opens on emitter "SiteVideo.play" (url) or a click on any `[data-site-video-url]` element.
 *  - Closes on emitter "SiteVideo.stop", Escape, or the close button.
 *  - Open: `--js-animate-in` on the next frame; the video starts once the close button's
 *    `transform` transition ends. Close: `--js-animate-out`; when `.site-video__bg` finishes its
 *    `opacity` transition the modal is hidden again and "SiteVideo.stopped" is emitted.
 */
import { useEffect, useRef } from "react";
import { Btn } from "@/components/sites/cobfoods-com-3b75ee17/shared/Btn";
import { CloseIcon, FlowerSmallBg } from "@/components/sites/cobfoods-com-3b75ee17/shared/icons";
import { emitter } from "@/components/sites/cobfoods-com-3b75ee17/shared/emitter";

const ANIMATE_IN = "--js-animate-in";
const ANIMATE_OUT = "--js-animate-out";

export function SiteVideo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const bg = el.querySelector<HTMLElement>(".site-video__bg");
    const video = el.querySelector<HTMLVideoElement>(".site-video__video");
    const closeBtn = el.querySelector<HTMLElement>(".site-video__close");
    if (!bg || !video || !closeBtn) return;

    let opened = false;
    let playing = false;

    const onPlayReady = (e: TransitionEvent) => {
      if (e.target !== closeBtn || e.propertyName !== "transform" || !opened) return;
      closeBtn.removeEventListener("transitionend", onPlayReady);
      void video.play().catch(() => {});
      playing = true;
    };

    const onCloseComplete = (e: TransitionEvent) => {
      if (e.target !== bg || e.propertyName !== "opacity" || opened) return;
      bg.removeEventListener("transitionend", onCloseComplete);
      el.setAttribute("aria-hidden", "true");
      el.classList.remove(ANIMATE_IN, ANIMATE_OUT);
      playing = false;
      emitter.emit("SiteVideo.stopped");
    };

    const play = (url: string) => {
      if (opened) {
        video.src = url;
        video.load();
        void video.play().catch(() => {});
        return;
      }
      opened = true;
      emitter.emit("SiteScroll.stop", true);
      emitter.emit("Video.pauseAll");
      bg.removeEventListener("transitionend", onCloseComplete);
      closeBtn.removeEventListener("transitionend", onPlayReady);
      el.classList.remove(ANIMATE_OUT);
      el.setAttribute("aria-hidden", "false");
      video.src = url;
      video.load();
      closeBtn.addEventListener("transitionend", onPlayReady);
      requestAnimationFrame(() => el.classList.add(ANIMATE_IN));
    };

    const close = () => {
      if (!opened) return;
      opened = false;
      if (playing) video.pause();
      playing = false;
      emitter.emit("Video.resumeAll");
      emitter.emit("SiteScroll.start");
      bg.removeEventListener("transitionend", onCloseComplete);
      closeBtn.removeEventListener("transitionend", onPlayReady);
      bg.addEventListener("transitionend", onCloseComplete);
      el.classList.add(ANIMATE_OUT);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (opened && (e.key === "Escape" || e.key === "Esc")) close();
    };

    // Delegated equivalent of binding click on every `[data-site-video-url]` element.
    const onDocumentClick = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target.closest<HTMLElement>("[data-site-video-url]") : null;
      if (!target) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      const url = target.dataset.siteVideoUrl;
      if (url) play(url);
    };

    const onPlay = (url: string) => play(url);
    emitter.on("SiteVideo.play", onPlay);
    emitter.on("SiteVideo.stop", close);
    window.addEventListener("keydown", onKeyDown);
    closeBtn.addEventListener("click", close);
    document.addEventListener("click", onDocumentClick, true);

    return () => {
      emitter.off("SiteVideo.play", onPlay);
      emitter.off("SiteVideo.stop", close);
      window.removeEventListener("keydown", onKeyDown);
      closeBtn.removeEventListener("click", close);
      document.removeEventListener("click", onDocumentClick, true);
      close();
      bg.removeEventListener("transitionend", onCloseComplete);
      closeBtn.removeEventListener("transitionend", onPlayReady);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="site-video position-fixed z-9000 t-0 l-0 w-100 vh-100 d-grid align-items-center overflow-hidden"
      data-ui="site-video"
      aria-hidden="true"
    >
      <div className="site-video__bg position-absolute t-0 l-0 w-100 h-100 bg-color-primary" aria-hidden="true" />
      <div className="site-video__container justify-self-center w-100 position-relative">
        <div className="site-video__videoWrap position-absolute t-0 l-0 w-100 h-100 overflow-clip bg-color-black">
          <video
            className="site-video__video position-absolute t-0 l-0 w-100 h-100"
            controls
            autoPlay
            playsInline
            disableRemotePlayback
          />
        </div>
      </div>
      <div className="site-video__closeWrap justify-self-center w-100 position-relative pointer-events-none">
        <Btn
          className="site-video__close position-absolute pointer-events-all --close --close-yellow"
          aria-label="Stop Video"
          behavior="close"
          bg={<FlowerSmallBg />}
          label="Stop Video"
          icon={<CloseIcon />}
          iconClass="--icon-close"
        />
      </div>
    </div>
  );
}
