import { useEffect, useState, type CSSProperties, type SVGProps } from "react";
import DOMPurify from "dompurify";

type CustomSvgProps = {
  source: string;
  // Sets both width and height and prevents flex-shrink from crushing the
  // icon, regardless of whatever size the source SVG file happens to carry.
  size?: number | string;
} & SVGProps<SVGSVGElement>;

type ParsedSvg = {
  attributes: Record<string, string>;
  innerHTML: string;
};

const cache = new Map<string, ParsedSvg>();

export const CustomSvg = ({ source, size, style, ...rest }: CustomSvgProps) => {
  // Keyed by source, so a stale result is never shown after `source` changes.
  const [loaded, setLoaded] = useState<{
    source: string;
    svg: ParsedSvg;
  } | null>(null);
  const parsed =
    loaded?.source === source ? loaded.svg : (cache.get(source) ?? null);

  useEffect(() => {
    if (cache.has(source)) return;

    let abort = false;
    (async () => {
      try {
        const res = await fetch(source);
        if (!res.ok) throw new Error(`Failed to fetch SVG: ${res.status}`);
        const text = await res.text();
        const result = parseSvg(text);
        if (!result) throw new Error("Response did not contain a valid <svg>");
        if (!abort) {
          cache.set(source, result);
          setLoaded({ source, svg: result });
        }
      } catch (e) {
        if (!abort) console.error(`Error loading SVG from ${source}:`, e);
      }
    })();

    return () => {
      abort = true;
    };
  }, [source]);

  if (!parsed) return null;

  const sizeStyle: CSSProperties | undefined =
    size !== undefined
      ? { width: size, height: size, flexShrink: 0 }
      : undefined;

  return (
    <svg
      {...(parsed.attributes as unknown as SVGProps<SVGSVGElement>)}
      {...rest}
      style={{ ...sizeStyle, ...style }}
      dangerouslySetInnerHTML={{ __html: parsed.innerHTML }}
    />
  );
};

// Sanitizes fetched SVG markup with DOMPurify's SVG allowlist before it gets
// rendered via dangerouslySetInnerHTML, then splits it into the outer <svg>'s
// attributes (spreadable as props) and its inner content.
function parseSvg(raw: string): ParsedSvg | null {
  const clean = DOMPurify.sanitize(raw, {
    USE_PROFILES: { svg: true, svgFilters: true },
  });

  const doc = new DOMParser().parseFromString(clean, "image/svg+xml");
  if (doc.querySelector("parsererror")) return null;

  const svg = doc.querySelector("svg");
  if (!svg) return null;

  const attributes: Record<string, string> = {};
  for (const attr of Array.from(svg.attributes)) {
    if (attr.name.startsWith("xmlns")) continue;
    const name =
      attr.name === "class"
        ? "className"
        : attr.name.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    attributes[name] = attr.value;
  }

  return { attributes, innerHTML: svg.innerHTML };
}
