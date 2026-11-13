import { PageMeta } from "@/components/page-meta";

const ContentPage = () => {
  return (
    <>
      <PageMeta
        title="Content | Kolin Newby"
        description="Writing and other content by Kolin Newby, a full-stack software engineer in Denver."
        path="/content/"
      />
      <section
        className="relative flex min-h-dvh w-full snap-start flex-col justify-center overflow-x-clip px-0 pt-(--nav-h) lg:px-10"
        id="content"
        aria-labelledby="content-heading"
      >
        <span>test</span>
      </section>
    </>
  );
};

export default ContentPage;
