import { TypingDisplay } from "@/components/typing-display";
import ParticleField from "@/components/particle-field";
import type { GetSiteDataQuery } from "@/generated/graphql";

type Props = {
  touch?: boolean;
  data?: GetSiteDataQuery | undefined;
};

const HomePage = ({ touch, data }: Props) => {
  const { introduction } = data ?? {};
  const typingTerms =
    introduction?.typingTerms?.map((term) => term.name ?? "") ?? [];

  return (
    <section
      className="relative h-dvh w-full snap-start overflow-hidden"
      id="home"
    >
      <ParticleField
        followMode={!touch}
        lum="50%"
        className="absolute top-0 left-0 z-0 h-full w-full"
        color
        particleDensity={20}
      />
      <div className={"pointer-events-none relative h-full w-full"}>
        <div
          className={
            "pointer-events-none absolute inset-0 flex flex-col text-4xl font-bold sm:text-5xl lg:text-6xl 2xl:text-7xl " +
            "items-center justify-center space-y-1"
          }
        >
          <h1 className={"relative flex rounded-2xl px-4 py-3 text-center"}>
            {introduction?.heading ?? ""}
          </h1>
          <TypingDisplay typingTerms={typingTerms} />
          {/* The animation is hidden from screen readers, so this reads its
              words out instead. */}
          <p className="sr-only">{typingTerms.join(", ")}</p>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
