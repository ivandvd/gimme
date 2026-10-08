"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";

/**
 * Port of Splitting.js as configured by the theme (`data-splitting="wordsMask"` or `""`):
 * every word of every text node — including text inside nested inline elements such as
 * <strong> — becomes
 *   <span class="word" data-word="…" style="--word-index:n; --line-index:l"><span class="wordText">…</span></span>
 * separated by <span class="whitespace"> </span>. Non-text children (<br>, <img>, icon spans)
 * are kept untouched. The container gets "words lines wordsMask splitting" and
 * --word-total / --line-total / --wordsMask-total, exactly like the original runtime output.
 *
 * Line indices depend on layout, so they are measured after mount (and on resize) the same
 * way Splitting's "lines" plugin does: words are grouped by their offsetTop.
 */
type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";

interface SplitTextProps extends HTMLAttributes<HTMLElement> {
  as?: Tag;
  children: ReactNode;
  /** Value of data-splitting; "wordsMask" for most titles, "" for the newsletter popup. */
  splitting?: string;
  [dataAttr: `data-${string}`]: string | undefined;
}

function splitNode(node: ReactNode, counter: { i: number }, keyPrefix: string): ReactNode {
  if (typeof node === "string" || typeof node === "number") {
    const text = String(node);
    const parts = text.split(/(\s+)/).filter((p) => p !== "");
    return parts.map((part, j) => {
      if (/^\s+$/.test(part)) {
        return (
          <span key={`${keyPrefix}-w${j}`} className="whitespace">
            {" "}
          </span>
        );
      }
      const index = counter.i++;
      return (
        <span
          key={`${keyPrefix}-w${j}`}
          className="word"
          data-word={part}
          style={{ "--word-index": index, "--line-index": 0 } as CSSProperties}
        >
          <span className="wordText">{part}</span>
        </span>
      );
    });
  }
  if (Array.isArray(node)) return node.map((n, j) => splitNode(n, counter, `${keyPrefix}-${j}`));
  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    const kids = el.props.children;
    if (kids === undefined || el.type === "svg" || el.type === "img" || el.type === "br") return node;
    const hasText = Children.toArray(kids).some((k) => typeof k === "string" || typeof k === "number" || isValidElement(k));
    if (!hasText) return node;
    return cloneElement(el, undefined, splitNode(Children.toArray(kids), counter, `${keyPrefix}-e`));
  }
  return node;
}

export function SplitText({ as: Tag = "h2", className = "", splitting = "wordsMask", children, style, ...rest }: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const counter = { i: 0 };
  const split = splitNode(Children.toArray(children), counter, "s");
  const wordTotal = counter.i;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const words = Array.from(el.querySelectorAll<HTMLElement>(".word"));
      let line = -1;
      let lastTop: number | null = null;
      words.forEach((w) => {
        const top = w.offsetTop;
        if (lastTop === null || Math.abs(top - lastTop) > 1) {
          line++;
          lastTop = top;
        }
        w.style.setProperty("--line-index", String(line));
      });
      el.style.setProperty("--line-total", String(line + 1));
    };
    measure();
    document.fonts?.ready.then(measure);
    let width = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === width) return;
      width = window.innerWidth;
      measure();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={`${className} words lines wordsMask splitting`.trim()}
      data-splitting={splitting}
      style={{ ...style, "--word-total": wordTotal, "--line-total": 1, "--wordsMask-total": 0 } as CSSProperties}
      {...rest}
    >
      {split}
    </Tag>
  );
}
