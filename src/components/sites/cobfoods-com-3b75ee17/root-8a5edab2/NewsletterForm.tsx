"use client";

import { useEffect, useRef, type FormEvent, type FormHTMLAttributes, type ReactNode } from "react";
import { emitter } from "@/components/sites/cobfoods-com-3b75ee17/shared/emitter";

const SUBMITTING = "--submitting";
const ERROR = "--error";
const SUCCESS = "--success";
const ERROR_MESSAGE = "An error occured, try again later.";
/** Stand-in for the network round-trip of the original POST. */
const FAKE_REQUEST_MS = 600;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const messageHtml = (msg: string) => `<h4 class="tt-uppercase m-0 lh-none fz-18 ff-body fw-400">${msg}</h4>`;

interface NewsletterFormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, "className" | "onSubmit"> {
  className: string;
  /** The popup form also closes the site newsletter once the preference has been saved. */
  closeOnSuccess?: boolean;
  children: ReactNode;
  [dataAttr: `data-${string}`]: string | undefined;
}

/**
 * Port of the theme's "newsletter" module (`dr`). The original serialises the form and POSTs it
 * to an external API; the clone has no backend, so a successful response is simulated:
 *  - submit → form gets `--submitting`
 *  - ~600ms later → `--submitting` removed, `--success` added, `.newsletter__message` gets the
 *    `data-message` text, and 1.5s after that "SiteNewsletter.saveUserPreference" is emitted
 *    (plus "SiteNewsletter.close" for the popup form).
 *  - invalid email → `--error` + generic error message, `--error` removed after 5s.
 */
export function NewsletterForm({ className, closeOnSuccess = false, children, ...rest }: NewsletterFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach(clearTimeout);
  }, []);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const messageEl = form.querySelector<HTMLElement>(".newsletter__message");
    const email = String(new FormData(form).get("email") ?? "").trim();

    timers.current.forEach(clearTimeout);
    timers.current = [];
    form.classList.remove(ERROR);
    form.classList.add(SUBMITTING);

    later(() => {
      form.classList.remove(SUBMITTING);
      if (!EMAIL_RE.test(email)) {
        form.classList.add(ERROR);
        if (messageEl) messageEl.innerHTML = messageHtml(ERROR_MESSAGE);
        later(() => form.classList.remove(ERROR), 5000);
        return;
      }
      form.classList.add(SUCCESS);
      if (messageEl) messageEl.innerHTML = messageHtml(messageEl.dataset.message ?? "");
      emitter.emit("DataLayer.form_submit", "newsletter");
      later(() => {
        emitter.emit("SiteNewsletter.saveUserPreference");
        if (closeOnSuccess) emitter.emit("SiteNewsletter.close");
      }, 1500);
    }, FAKE_REQUEST_MS);
  };

  return (
    <form ref={formRef} className={className} onSubmit={onSubmit} {...rest}>
      {children}
    </form>
  );
}
