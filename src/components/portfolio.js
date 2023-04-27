export default function Portfolio({ darkMode }) {
  return (
    <div
      id="port"
      className="flex flex-grow flex-col min-h-screen my-10 justify-center"
    >
      <span className="flex text-4xl font-bold w-full justify-center">
        Some of my best work...
      </span>
      <div className="grid grid-cols-2 m-10 gap-5 overflow-y-auto h-full">
        <div className="col-span-1 h-96 group flex rounded-lg overflow-hidden border">
          <div className="flex w-1/3">
            <img
              className="flex h-full w-full object-cover object-left transition-all grayscale group-hover:grayscale-0 cursor-pointer"
              src="photos/Leaked_Runtime.png"
              alt="Resurface Leaked Runtime"
            />
          </div>
          <div className="flex flex-col w-1/3 py-5 justify-center items-center">
            <a
              className="flex text-xl font-bold"
              href="https://resurface.io"
              target="_blank"
              rel="noreferrer"
            >
              Resurface Labs
            </a>
            <span className="flex text-xl">API Security Startup</span>
          </div>
          <div className="flex w-1/3">
            <img
              className="flex h-full w-full object-cover object-right transition-all grayscale group-hover:grayscale-0 cursor-pointer"
              src="photos/Resurface_Search.png"
              alt="Resurface Search Page"
            />
          </div>
        </div>
        <div className="col-span-1 rounded-lg"></div>
      </div>
    </div>
  );
}
