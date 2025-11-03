import { LoaderIcon } from "lucide-react";

const LoadingCover = ({ darkMode = false, className = "" }) => {
  return (
    <h1 className="flex flex-row space-x-2 w-full h-full items-center justify-center text-3xl">
      <span className="flex">Loading</span>
      <LoaderIcon className="flex animate-spin" size={"34px"} />
    </h1>
  );
};

export default LoadingCover;
