// Netlify's image CDN resizes CMS images on the fly and serves them as
// AVIF/WebP where the browser supports it. It only exists on Netlify, so it's
// switched on by VITE_IMAGE_CDN in netlify.toml; elsewhere (dev, preview) the
// original image is used.
const useImageCdn = import.meta.env.VITE_IMAGE_CDN === "true";

const srcSetWidths = [640, 1280, 1920];

const resized = (url: string, width: number) =>
  `/.netlify/images?url=${encodeURIComponent(url)}&w=${width}`;

// `src` and `srcSet` for an <img>, letting the browser pick the smallest
// width that fills it (going by the <img>'s `sizes`).
export const responsiveImage = (url: string) =>
  useImageCdn
    ? {
        src: resized(url, srcSetWidths[1]!),
        srcSet: srcSetWidths.map((w) => `${resized(url, w)} ${w}w`).join(", ")
      }
    : { src: url };
