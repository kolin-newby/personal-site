import React, { useMemo, useEffect, useState, useRef } from "react";
import { usePageVisible } from "../common/use-page-visible";
import { useInViewport } from "../common/use-in-viewport";

const TextHighlighterContainer = ({
  children,
  terms,
  colors = ["#FFF176", "#A5D6A7", "#81D4FA", "#FFAB91", "#F8BBD0"],
  caseSensitive = false,
  wholeWord = true,
  perWordFillSec = 0.9,
  gapSec = 0.1,
  holdAfterAllSec = 0.4,
  fadeSec = 0.6,
  autoLoop = true,
  className = "",
  pauseWhenOffScreen = true,
}) => {
  if (!terms || terms.length === 0) return <>{children}</>;

  const containerRef = useRef(null);
  const inView = useInViewport(containerRef, { threshold: 0.1 });
  const pageVisible = usePageVisible();
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const shouldRun =
    !prefersReducedMotion && (!pauseWhenOffScreen || (inView && pageVisible));

  const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const makeTermRegex = (terms, { wholeWord, caseSensitive }) => {
    const nonEmpty = (terms || []).filter(Boolean);
    if (nonEmpty.length === 0)
      return { source: "", flags: "", sortedTerms: [] };
    const sortedTerms = [...nonEmpty].sort((a, b) => b.length - a.length);
    const escaped = sortedTerms.map(escapeRegex);
    const WORD = "[\\p{L}\\p{N}_’'-]";
    const wrapped = escaped.map((t) =>
      wholeWord ? `(?<!${WORD})(${t})(?!${WORD})` : `(${t})`
    );
    const source = wrapped.join("|");
    const flags = "gu" + (caseSensitive ? "" : "i");
    return { source, flags, sortedTerms };
  };

  const config = useMemo(() => {
    const cfg = makeTermRegex(terms, { wholeWord, caseSensitive });
    const sortedTermsNorm = cfg.sortedTerms.map((t) =>
      caseSensitive ? t : t.toLowerCase()
    );
    return { ...cfg, sortedTermsNorm };
  }, [terms, caseSensitive, wholeWord]);

  const totalMatches = useMemo(() => {
    if (!shouldRun || !config.source) return 0;
    const countInString = (str) => {
      let c = 0;
      const re = new RegExp(config.source, config.flags);
      while (re.exec(str) !== null) c++;
      return c;
    };
    const walk = (node) => {
      if (typeof node === "string") return countInString(node);
      if (typeof node === "number") return countInString(String(node));
      if (Array.isArray(node)) return node.reduce((a, n) => a + walk(n), 0);
      if (React.isValidElement(node)) return walk(node.props?.children);
      return 0;
    };
    return walk(children);
  }, [children, config, shouldRun]);

  const lastFinish =
    totalMatches > 0
      ? (totalMatches - 1) * (perWordFillSec + gapSec) + perWordFillSec
      : 0;
  const loopSec = lastFinish + holdAfterAllSec + fadeSec;

  const [cycle, setCycle] = useState(0);

  const prevActiveRef = useRef(shouldRun);

  useEffect(() => {
    if (shouldRun && !prevActiveRef.current) {
      setCycle((c) => c + 1);
    }
    prevActiveRef.current = shouldRun;
  }, [shouldRun]);

  useEffect(() => {
    if (!autoLoop || !shouldRun || loopSec <= 0) return;
    const id = setInterval(() => setCycle((c) => c + 1), loopSec * 1000);
    return () => clearInterval(id);
  }, [autoLoop, loopSec, shouldRun]);

  let order = 0;
  const renderHighlighted = (node) => {
    if (!config.source) return node;

    if (typeof node === "string" || typeof node === "number") {
      const text = String(node);
      if (!text) return node;

      const out = [];
      const re = new RegExp(config.source, config.flags);
      let lastIdx = 0;
      let m;

      while ((m = re.exec(text)) !== null) {
        const start = m.index;
        const end = start + m[0].length;
        if (start > lastIdx) out.push(text.slice(lastIdx, start));

        const matched = m[0];
        const key = caseSensitive ? matched : matched.toLowerCase();
        const termIndex = config.sortedTermsNorm.findIndex((t) => t === key);
        const color = colors[(termIndex >= 0 ? termIndex : 0) % colors.length];

        const delaySec = order * (perWordFillSec + gapSec);

        const rng = mulberryHash(order + 7);
        const bodySkewDeg = `${(rng() * 50 - 25).toFixed(2)}deg`;
        const tiltDeg = `${(rng() * 6 - 3).toFixed(2)}deg`;
        const jitterY = `${(rng() * 2 - 1) * 0.12}em`;

        out.push(
          <span
            key={`hl-${cycle}-${order}-${start}`}
            className="hl-mark relative inline-block"
            style={{
              "--loopSec": `${loopSec}s`,
              "--fadeSec": `${fadeSec}s`,
              "--fillSec": `${perWordFillSec}s`,
              "--delay": `${delaySec}s`,
              "--hlColor": color,
              "--bodySkewDeg": bodySkewDeg,
              "--globalTiltDeg": tiltDeg,
              "--jitterY": jitterY,
            }}
          >
            <span className="relative z-1">{matched}</span>
          </span>
        );

        order++;
        lastIdx = end;
      }

      if (lastIdx < text.length) out.push(text.slice(lastIdx));
      return out.length ? out : node;
    }

    if (Array.isArray(node)) {
      return node.map((n, i) => (
        <React.Fragment key={`${cycle}-frag-${i}`}>
          {renderHighlighted(n)}
        </React.Fragment>
      ));
    }

    if (React.isValidElement(node)) {
      const child = node.props?.children;
      if (child == null) return node;
      const newChildren = renderHighlighted(child);
      return React.cloneElement(
        node,
        { key: `${cycle}-${node.key ?? "k"}` },
        newChildren
      );
    }

    return node;
  };

  return (
    <div
      ref={containerRef}
      className={`hl-root relative leading-normal ${
        shouldRun ? "" : "hl-paused"
      } ${className}`}
    >
      {renderHighlighted(children)}
    </div>
  );
};

const mulberryHash = (seed) => {
  let t = Math.imul(seed ^ 0x6d2b79f5, 1);
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

export default TextHighlighterContainer;
