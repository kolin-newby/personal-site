import React, { useMemo, useEffect, useState, useRef } from "react";
import { useShouldAnimate } from "../common/use-should-animate";

type Props = {
  children: React.ReactNode;
  terms: string[] | undefined;
  caseSensitive?: boolean;
  perWordFillSec?: number;
  holdAfterAllSec?: number;
  className?: string;
  manualPause?: boolean;
};

const COLORS = ["#FFF176", "#A5D6A7", "#81D4FA", "#FFAB91", "#F8BBD0"];
// Pause between one word finishing and the next starting, in s.
const GAP_SEC = 0.1;
const FADE_SEC = 0.6;

const escapeRegex = (s: string): string =>
  s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const makeTermRegex = (
  terms: string[],
  caseSensitive: boolean
): { source: string; flags: string; sortedTerms: string[] } => {
  const nonEmpty = (terms || []).filter(Boolean);
  if (nonEmpty.length === 0) return { source: "", flags: "", sortedTerms: [] };
  const sortedTerms = [...nonEmpty].sort((a, b) => b.length - a.length);
  const escaped = sortedTerms.map(escapeRegex);
  const WORD = "[\\p{L}\\p{N}_''-]";
  // Whole words only.
  const wrapped = escaped.map((t) => `(?<!${WORD})(${t})(?!${WORD})`);
  const source = wrapped.join("|");
  const flags = "gu" + (caseSensitive ? "" : "i");
  return { source, flags, sortedTerms };
};

const TextHighlighterContainer = ({
  children,
  terms,
  caseSensitive = false,
  perWordFillSec = 0.9,
  holdAfterAllSec = 0.4,
  className = "",
  manualPause = false
}: Props) => {
  const hasTerms = !!terms && terms.length > 0;

  const containerRef = useRef<HTMLDivElement>(null);
  const shouldRun =
    useShouldAnimate(containerRef, { threshold: 0.1 }) && !manualPause;

  const config = useMemo(() => {
    const cfg = makeTermRegex(terms ?? [], caseSensitive);
    const sortedTermsNorm = cfg.sortedTerms.map((t) =>
      caseSensitive ? t : t.toLowerCase()
    );
    return { ...cfg, sortedTermsNorm };
  }, [terms, caseSensitive]);

  const totalMatches = useMemo(() => {
    if (!shouldRun || !config.source) return 0;
    const countInString = (str: string): number => {
      let c = 0;
      const re = new RegExp(config.source, config.flags);
      while (re.exec(str) !== null) c++;
      return c;
    };
    const walk = (node: React.ReactNode): number => {
      if (typeof node === "string") return countInString(node);
      if (typeof node === "number") return countInString(String(node));
      if (Array.isArray(node))
        return node.reduce((a: number, n: React.ReactNode) => a + walk(n), 0);
      if (React.isValidElement(node))
        return walk((node.props as { children?: React.ReactNode }).children);
      return 0;
    };
    return walk(children);
  }, [children, config, shouldRun]);

  const lastFinish =
    totalMatches > 0
      ? (totalMatches - 1) * (perWordFillSec + GAP_SEC) + perWordFillSec
      : 0;
  const loopSec = lastFinish + holdAfterAllSec + FADE_SEC;

  const [cycle, setCycle] = useState(0);

  const prevActiveRef = useRef<boolean>(shouldRun);

  useEffect(() => {
    if (shouldRun && !prevActiveRef.current) {
      setCycle((c) => c + 1);
    }
    prevActiveRef.current = shouldRun;
  }, [shouldRun]);

  useEffect(() => {
    if (!shouldRun || loopSec <= 0) return;
    const id = setInterval(() => setCycle((c) => c + 1), loopSec * 1000);
    return () => clearInterval(id);
  }, [loopSec, shouldRun]);

  let order = 0;
  const renderHighlighted = (node: React.ReactNode): React.ReactNode => {
    if (!config.source) return node;

    if (typeof node === "string" || typeof node === "number") {
      const text = String(node);
      if (!text) return node;

      const out: React.ReactNode[] = [];
      const re = new RegExp(config.source, config.flags);
      let lastIdx = 0;
      let m: RegExpExecArray | null;

      while ((m = re.exec(text)) !== null) {
        const start = m.index;
        const end = start + m[0].length;
        if (start > lastIdx) out.push(text.slice(lastIdx, start));

        const matched = m[0];
        const key = caseSensitive ? matched : matched.toLowerCase();
        const termIndex = config.sortedTermsNorm.findIndex((t) => t === key);
        const color = COLORS[(termIndex >= 0 ? termIndex : 0) % COLORS.length];

        const delaySec = order * (perWordFillSec + GAP_SEC);

        const rng = mulberryHash(order + 7);
        const bodySkewDeg = `${(rng() * 50 - 25).toFixed(2)}deg`;
        const tiltDeg = `${(rng() * 6 - 3).toFixed(2)}deg`;
        const jitterY = `${(rng() * 2 - 1) * 0.12}em`;

        out.push(
          <span
            key={`hl-${cycle}-${order}-${start}`}
            className="hl-mark relative inline-block"
            style={
              {
                "--loopSec": `${loopSec}s`,
                "--fadeSec": `${FADE_SEC}s`,
                "--fillSec": `${perWordFillSec}s`,
                "--delay": `${delaySec}s`,
                "--hlColor": color,
                "--bodySkewDeg": bodySkewDeg,
                "--globalTiltDeg": tiltDeg,
                "--jitterY": jitterY
              } as React.CSSProperties
            }
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
      const child = (node.props as { children?: React.ReactNode }).children;
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

  if (!hasTerms) return <>{children}</>;

  return (
    <div
      ref={containerRef}
      className={`relative leading-normal ${
        shouldRun ? "" : "hl-paused"
      } ${className}`}
    >
      {renderHighlighted(children)}
    </div>
  );
};

const mulberryHash = (seed: number): (() => number) => {
  let t = Math.imul(seed ^ 0x6d2b79f5, 1);
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

export default TextHighlighterContainer;
