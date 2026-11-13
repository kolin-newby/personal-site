const SITE_URL = "https://kolinnewby.dev";

type Props = {
  title: string;
  description: string;
  // Path as Netlify serves it: it redirects /portfolio to /portfolio/.
  path: string;
};

// The tags that differ per page. React hoists them into <head>; the shared
// ones (og:image, twitter:card, …) are in the Layout in src/root.tsx.
export const PageMeta = ({ title, description, path }: Props) => {
  const url = `${SITE_URL}${path}`;
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
    </>
  );
};
