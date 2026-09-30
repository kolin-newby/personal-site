import { TypingDisplay } from "@/components/typing-display";
import ParticleField from "@/components/particle-field";
import type { GetSiteDataQuery } from "@/generated/graphql";

type Props = {
  touch?: boolean;
  data?: GetSiteDataQuery | undefined;
};

const HomePage = ({ touch, data }: Props) => {
  const { introduction } = data ?? {};

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
        <h1
          className={
            "pointer-events-none absolute inset-0 flex flex-col text-4xl font-bold sm:text-5xl lg:text-6xl 2xl:text-7xl " +
            "items-center justify-center space-y-1"
          }
        >
          <span className={"relative flex rounded-2xl px-4 py-3 text-center"}>
            {introduction?.heading ?? ""}
          </span>
          <TypingDisplay
            typingTerms={
              introduction?.typingTerms?.map((term) => term.name ?? "") ?? []
            }
          />
        </h1>
      </div>
    </section>
  );
};

export default HomePage;
