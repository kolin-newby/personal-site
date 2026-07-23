import { TypingDisplay } from "@/components/typing-display";
import ParticleField from "@/components/particle-field";
import { useGetIntroduction } from "@/hooks/useGetIntroduction";

type Props = {
  className?: string;
  touch?: boolean;
};

const HomePage = ({ className = "", touch }: Props) => {
  const { data, isError, error } = useGetIntroduction();

  if (isError) console.error(`Error fetching introduction: ${error}`);

  return (
    <div
      className={`w-full h-screen overflow-hidden relative ${className}`}
      id="home"
    >
      <ParticleField
        followMode={!touch}
        lum="50%"
        maxParticlesFollowMode={100}
        className="absolute top-0 left-0 w-full h-full z-0"
        color
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
              {data?.introduction?.heading ?? ""}
            </span>
            <TypingDisplay
              typingTerms={
                data?.introduction?.typingTerms?.map(
                  (term) => term.name ?? "",
                ) ?? []
              }
            />
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
