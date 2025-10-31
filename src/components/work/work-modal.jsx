import { ChevronRight } from "lucide-react";
import IdleScrollArea from "../IdleScrollArea";
import RepoPreview from "../repo-preview";

const WorkModal = ({ open, selectedWork, setOpen, setSelectedWork }) => {
  const handleCloseClick = () => {
    setOpen(false);
    setTimeout(() => {
      setSelectedWork(null);
    }, 500);
  };

  return (
    <div
      role="dialog"
      className={`absolute top-0 left-full flex flex-col justify-evenly w-full h-full bg-gradient-to-br from-gray-100 to-gray-200`}
    >
      <div className="flex min-h-[64px]" />
      <div className="flex flex-row space-x-10">
        <button
          onClick={handleCloseClick}
          className="flex items-center justify-center p-5 shadow-inner rounded-r-lg bg-gradient-to-br from-black/10 to-gray-200/50 transition-all duration-300 basis-20 hover:basis-32"
        >
          <ChevronRight size={"44px"} className="flex" />
        </button>
        <div className="flex flex-col justify-center space-y-2">
          <h2 className="flex text-xl sm:text-3xl">{selectedWork?.title}</h2>
          <h3 className="flex text-base sm:text-xl">{selectedWork?.role}</h3>
          <div className="flex w-full h-0.5 bg-black" />
        </div>
      </div>
      <div className="flex flex-col h-full space-y-4 md:flex-row justify-evenly items-center">
        <div className="flex flex-col w-full h-max p-6 items-center justify-center text-xs sm:text-sm space-y-4 md:w-1/2">
          {selectedWork?.section1}
          {selectedWork?.section2}
        </div>
        {selectedWork?.images !== null ? (
          <>
            <div className="flex px-2 md:hidden">
              <IdleScrollArea
                axis={"x"}
                speed={25}
                idleDelay={3000}
                startDirection="forward"
                className="scrollbar-display-none flex space-x-2 max-h-[220px] min-h-[200px]"
              >
                {selectedWork?.images?.map((image, index) => (
                  <img
                    key={image + "-" + index + "-X"}
                    src={image}
                    alt={image}
                    className="flex flex-none h-[220px] object-cover rounded-lg"
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </IdleScrollArea>
            </div>
            <div className="hidden px-2 md:flex max-w-[500px] max-h-[600px]">
              <IdleScrollArea
                axis={"y"}
                speed={25}
                idleDelay={3000}
                startDirection="forward"
                className="scrollbar-display-none max-h-[500px] flex flex-col space-y-2 w-full"
              >
                {selectedWork?.images?.map((image, index) => (
                  <img
                    key={image + "-" + index + "-Y"}
                    src={image}
                    alt={image}
                    className="flex flex-none h-[250px] object-cover rounded-lg"
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </IdleScrollArea>
            </div>
          </>
        ) : (
          <RepoPreview url={"https://github.com/resurfaceio/logger-go"} />
        )}
      </div>
      <div className="flex flex-col items-center px-2">
        <IdleScrollArea
          axis="x"
          speed={35}
          idleDelay={3000}
          startDirection="forward"
          className="scrollbar-display-none flex py-2"
        >
          {selectedWork?.skills?.map((skill, index) => (
            <div className="inline-block">
              <span>{skill}</span>
              {index !== selectedWork?.skills?.length - 1 && (
                <span>&nbsp;-&nbsp;</span>
              )}
            </div>
          ))}
        </IdleScrollArea>
      </div>
    </div>
  );
};

export default WorkModal;
