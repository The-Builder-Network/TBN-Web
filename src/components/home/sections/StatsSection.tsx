const StatsSection = () => {
  return (
    <section className="py-2 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-around gap-8 md:gap-4">
          <div className="flex flex-col w-fit mx-auto md:mx-0">
            <div className="text-lg md:text-4xl font-bold text-foreground mb-2 border-l-4 border-highlight pl-4">
              268,528
            </div>
            <div className="text-md text-muted-foreground pl-4">
              tradespeople
            </div>
          </div>

          <div className="flex flex-col w-fit">
            <div className="text-lg md:text-4xl font-bold text-foreground mb-2 border-l-4 border-highlight pl-4">
              40+
            </div>
            <div className="text-md text-muted-foreground pl-4">
              trade categories
            </div>
          </div>

          <div className="flex flex-col w-fit">
            <div className="text-lg md:text-4xl font-bold text-foreground mb-2 border-l-4 border-highlight pl-4">
              2,724,326
            </div>
            <div className="text-md text-muted-foreground pl-4">reviews</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
