import { TypingDisplay } from "@/components/typing-display";
import ParticleField from "@/components/particle-field";
import type { GetSiteDataQuery } from "@/generated/graphql";

type Props = {
  className?: string;
  touch?: boolean;
  data?: GetSiteDataQuery | undefined;
};

const HomePage = ({ className = "", touch, data }: Props) => {
  const { introduction } = data ?? {};

  return (
    <section
      className={`w-full overflow-hidden relative h-dvh ${touch ? "pt-(--mobile-navbar-height)" : "pt-(--navbar-height)"} ${className}`}
      id="home"
    >
      <ParticleField
        followMode={!touch}
        lum="50%"
        className="absolute top-0 left-0 w-full h-full z-0"
        color
        particleDensity={20}
      />
      <div className={"relative w-full h-screen pointer-events-none"}>
        <div className={"wrapper relative h-full"}>
          <canvas
            id={"homePage"}
            className={"absolute inset-0 dark:effect-color-light"}
          />
          <h1
            className={
              "absolute inset-0 flex flex-col text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-bold bg-clip-text bg-transparent pointer-events-none " +
              "items-center justify-center space-y-1"
            }
          >
            <span className={"flex text-center rounded-2xl relative px-4 py-3"}>
              {introduction?.heading ?? ""}
            </span>
            <TypingDisplay
              typingTerms={
                introduction?.typingTerms?.map((term) => term.name ?? "") ?? []
              }
            />
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
