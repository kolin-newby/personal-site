const Home = ({ className = "" }) => {
  return (
    <div
      className={`w-full h-screen overflow-y-auto overflow-x-hidden relative ${className}`}
    >
      <div className={"absolute inset-0 w-full h-full"} />
      <div
        className={
          "absolute flex items-center justify-center inset-0 w-full h-full"
        }
      >
        <div className={"flex rounded-full h-30 w-30 bg-red-500"} />
      </div>
      <div id={"home"} className={"relative w-full h-screen"}>
        <div id={"wrapper relative h-full"}>
          <canvas
            id={"homePage"}
            className={"absolute inset-0 dark:effect-color-light"}
          />
          <div
            className={
              "absolute inset-0 flex flex-col text-5xl lg:text-6xl 2xl:text-7xl font-bold bg-clip-text bg-transparent pointer-events-none " +
              "items-center justify-center space-y-1"
            }
          >
            <div className={"flex text-center rounded-2xl relative px-4 py-3"}>
              Hi, I'm Kolin
              <br />
            </div>
            <span>
              <div
                className="typewrite "
                data-period="2000"
                data-store='[ "Developer", "Climber", "Designer", "Backpacker", "Outdoor Enthusiast", "Software Engineer", "Amateur Photographer" ]'
              >
                <span className="wrap"></span>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
