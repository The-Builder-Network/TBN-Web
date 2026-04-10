import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const DownloadAppSection = () => {
  return (
    <section className="pt-16 pb-16 bg-primary overflow-visible mt-56">
      <div className="container">
        <div className="grid lg:grid-cols-2 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-4xl text-background font-bold mb-6">
              Download our app
            </h2>
            <p className="text-md text-muted mb-8 leading-7">
              Posting and managing your jobs is even easier with The Builder
              Network app. <br />
              Add photos and information in an instant and keep things moving
              with notifications & chat, allowing you to message tradespeople
              wherever you are. <br />
              Once the job's done, leave a rating and review straight from your
              phone.
            </p>

            <div className="flex flex-wrap gap-6 mb-4">
              {/* TODO: Replace with real app store URLs when app launches */}
              <a
                href="#"
                aria-disabled="true"
                onClick={(e) => e.preventDefault()}
                className="transition-transform hover:scale-105 opacity-75 cursor-not-allowed"
                aria-label="Get it on Google Play (coming soon)"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-12"
                />
              </a>
              <a
                href="#"
                aria-disabled="true"
                onClick={(e) => e.preventDefault()}
                className="transition-transform hover:scale-105 opacity-75 cursor-not-allowed"
                aria-label="Download on the App Store (coming soon)"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="Download on the App Store"
                  className="h-12"
                />
              </a>
            </div>
          </div>

          {/* Right Image - Phone Mockup */}
          <div className="order-1 lg:order-2 col-span-1 flex items-start justify-center z-10 lg:-mt-64 -mt-32 cursor-not-allowed pointer-events-none">
            <div className="relative lg:left-28 xl:left-40 border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
              <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
              <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
              <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
                {/* Screen Content */}
                <div className="w-full h-full bg-background flex flex-col">
                  {/* App Content */}
                  <div className="p-6 flex-1">
                    <div className="w-full bg-primary/10 h-1 rounded-full mb-6">
                      <div className="w-4/7 h-1 bg-highlight rounded-full"></div>
                    </div>

                    <div className="text-xs font-semibold text-muted-foreground mb-4 text-center">
                      STEP 4 OF 7
                    </div>

                    <h3 className="text-lg font-bold mb-6 leading-tight">
                      How many floors does the house have?*
                    </h3>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="border-2 rounded-lg p-4 flex flex-col items-center justify-center gap-2 aspect-square hover:border-primary cursor-pointer transition-colors">
                        <Home className="w-8 h-8 text-muted-foreground" />
                        <span className="text-sm font-medium">One</span>
                      </div>
                      <div className="border-2 rounded-lg p-4 flex flex-col items-center justify-center gap-2 aspect-square hover:border-primary cursor-pointer transition-colors">
                        <Home className="w-8 h-8 text-muted-foreground" />
                        <span className="text-sm font-medium">Two</span>
                      </div>
                      <div className="border-2 rounded-lg p-4 flex flex-col items-center justify-center gap-2 aspect-square hover:border-primary cursor-pointer transition-colors">
                        <Home className="w-8 h-8 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          Three or more
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-8">
                      <label className="text-sm font-bold">
                        How large is the area that needs to be plastered?
                        (optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Your content"
                        className="w-full p-3 border rounded-md text-sm bg-muted/20"
                      />
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="p-4 border-t flex gap-4">
                    <button className="flex-1 py-3 border rounded-md font-medium text-sm">
                      Previous
                    </button>
                    <button className="flex-1 py-3 bg-primary text-primary-foreground rounded-md font-medium text-sm">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadAppSection;
