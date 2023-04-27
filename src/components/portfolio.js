export default function Portfolio({darkMode}) {


    return(
        <div id="port" className="flex flex-grow flex-col min-h-screen my-10 justify-center">
            <span className="flex text-4xl font-bold w-full justify-center">Some of my best work...</span>
            <div className="grid grid-cols-2 m-10 gap-5 overflow-y-auto h-5/6">
                <div className="col-span-1 rounded-lg">
                    <img />
                </div>
                <div className="col-span-1 rounded-lg"></div>
            </div>
        </div>
    )
}