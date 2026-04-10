const TradespersonFeatures = () => {
  return (
    <section className="pb-16 md:pt-24 bg-background overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-12 items-center">
          {/* Content Column */}
          <div className="col-span-5">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to find work the reliable way?
            </h2>
            <p className="text-base text-muted-foreground">
              There's lots of demand for good tradespeople but finding exactly
              the work you want when you want it isn't always easy.{" "}
              <br className="hidden md:block" />
              The Builder Network is the reliable solution, ensuring you get
              leads that are right for you.
            </p>
          </div>
          <div className="flex flex-col gap-8 col-span-3">
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
              <div className="space-y-3">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="text-xl font-bold">All the work you need</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "150,000 jobs posted every month",
                    "Whatever your trade, only get leads that match your skills",
                    "Choose your work location and only get leads where you want them",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-base text-muted-foreground"
                    >
                      <div className="mt-2 min-w-1.5 min-h-1.5 w-1.5 h-1.5 rounded-full bg-foreground" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="text-xl font-bold">You're in control</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Join for free with no commitment",
                    "Respond to leads only when it suits you",
                    "Express interest in as many jobs as you like for free. Only pay a fee when shortlisted",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-base text-muted-foreground"
                    >
                      <div className="mt-2 min-w-1.5 min-h-1.5 w-1.5 h-1.5 rounded-full bg-foreground" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 sm:col-span-2 lg:col-span-2 xl:col-span-1">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="text-xl font-bold">Grow your reputation</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Get a free profile to showcase your skills and experience",
                    "Build trust with reviews from previous customers",
                    "Boost your reputation and attract new clients",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-base text-muted-foreground"
                    >
                      <div className="mt-2 min-w-1.5 min-h-1.5 w-1.5 h-1.5 rounded-full bg-foreground" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className="col-span-2">
            <div className="relative w-full max-w-[550px] mx-auto lg:mx-0 lg:ml-auto">
              <div className="aspect-[16/9] bg-slate-900 rounded-xl shadow-2xl flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
                {/* Laptop Screen Content Mock */}
                <div className="bg-white w-full h-full rounded-lg shadow-inner p-3 md:p-4 overflow-hidden">
                  <div className="w-full h-6 md:h-8 bg-slate-100 mb-3 md:mb-4 rounded flex items-center px-3 md:px-4 gap-2">
                    <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-red-400"></div>
                    <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="grid grid-cols-4 gap-3 md:gap-4">
                    <div className="col-span-1 bg-slate-50 h-48 md:h-64 rounded p-2 space-y-2">
                      <div className="h-3 md:h-4 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-3 md:h-4 bg-slate-200 rounded w-1/2"></div>
                    </div>
                    <div className="col-span-3 space-y-3 md:space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-20 md:h-24 bg-white border rounded p-3 md:p-4 shadow-sm"
                        >
                          <div className="h-3 md:h-4 bg-primary/20 rounded w-1/3 mb-2"></div>
                          <div className="h-2 md:h-3 bg-slate-100 rounded w-full"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Phone Mockup Overlay */}
                <div className="absolute -bottom-8 right-6 md:right-12 w-32 md:w-48 border-[6px] md:border-8 border-slate-900 rounded-[1.5rem] md:rounded-[2rem] bg-slate-900 shadow-2xl">
                  <div className="bg-white rounded-[1rem] md:rounded-[1.5rem] overflow-hidden h-64 md:h-96 w-full flex flex-col">
                    <div className="bg-slate-50 p-3 md:p-4 border-b">
                      <div className="h-3 md:h-4 bg-slate-200 rounded w-1/2 mx-auto"></div>
                    </div>
                    <div className="p-3 md:p-4 space-y-2 md:space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-16 md:h-20 bg-white border rounded-lg p-2 md:p-3 shadow-sm"
                        >
                          <div className="h-2 md:h-3 bg-primary/20 rounded w-2/3 mb-2"></div>
                          <div className="h-1.5 md:h-2 bg-slate-100 rounded w-full"></div>
                        </div>
                      ))}
                    </div>
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

export default TradespersonFeatures;
