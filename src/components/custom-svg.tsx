import { useEffect, useState, type SVGProps } from "react";
import DOMPurify from "dompurify";

type CustomSvgProps = {
  source: string;
} & SVGProps<SVGSVGElement>;

type ParsedSvg = {
  attributes: Record<string, string>;
  innerHTML: string;
};

const cache = new Map<string, ParsedSvg>();

export const CustomSvg = ({ source, ...rest }: CustomSvgProps) => {
  const [parsed, setParsed] = useState<ParsedSvg | null>(
    () => cache.get(source) ?? null,
  );

  useEffect(() => {
    const cached = cache.get(source);
    if (cached) {
      setParsed(cached);
      return;
    }

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
          setParsed(result);
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

  return (
    <svg
      {...(parsed.attributes as unknown as SVGProps<SVGSVGElement>)}
      {...rest}
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
    attributes[attr.name] = attr.value;
  }

  return { attributes, innerHTML: svg.innerHTML };
}
