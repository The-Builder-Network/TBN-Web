import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import JobServiceCombobox from "@/components/shared/JobServiceCombobox";

const HeroSection = () => {
  const [selectedService, setSelectedService] = useState("");
  const navigate = useNavigate();

  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const words = [
      "tradesperson.",
      "builder.",
      "plumber.",
      "roofer.",
      "carpenter.",
      "gardener.",
      "painter.",
      "bricklayer.",
    ];

    const currentWord = words[wordIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000; // Pause at end of word

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentWord.substring(0, displayText.length - 1));
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex]);

  const handleSubmit = () => {
    if (selectedService) {
      navigate(`/post-job?service=${encodeURIComponent(selectedService)}`);
    }
  };

  return (
    <section className="pattern">
      <div className="container py-12 md:py-24 mt-2">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left Content */}
          <div className="text-primary-foreground col-span-3">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight w-full mb-20">
              The reliable way <br />
              to hire a{" "}
              <span className="inline-block min-w-[280px] md:min-w-[320px] lg:min-w-[380px]">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>

            {/* Search Form */}
            <div className="mb-6 relative max-w-lg">
              <p className="text-3xl font-semibold mb-4">What is your job?</p>
              <div className="flex flex-col sm:flex-row w-full items-stretch sm:items-center gap-0">
                <div className="flex-1">
                  <JobServiceCombobox
                    value={selectedService}
                    onChange={setSelectedService}
                    placeholder="Restoration & Refurbishment"
                    triggerClassName="h-14 text-lg px-4 text-foreground hover:bg-white/90 rounded-r-none border-r-0"
                  />
                </div>
                <Button
                  onClick={handleSubmit}
                  disabled={!selectedService}
                  className="h-14 rounded-l-none px-6 disabled:opacity-90 border-2 border-white bg-primary/95 hover:bg-primary/90"
                >
                  <ArrowRight className="h-24 w-24" />
                </Button>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
              <span className="font-medium">Excellent</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 bg-emerald-500 flex items-center justify-center"
                  >
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                ))}
              </div>
              <span className="text-primary-foreground/60">Trustpilot</span>
            </div>
          </div>

          {/* Right Content - Placeholder for image */}
          <div className="hidden lg:block col-span-2 relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="aspect-[4/3] bg-primary-foreground/10 rounded-2xl flex items-center justify-center">
              <img src="/images/hero_section_img_1.jpg" alt="Hero" />
              <div className="absolute top-12 left-12 bg-highlight text-black px-4 py-2 rounded-md font-bold shadow-lg flex items-center gap-2">
                <span>Gwatwa ★ 4.8/5</span>
              </div>

              {/* Green Bounding Box Effect */}
              <div className="absolute top-12 left-12 right-12 bottom-12 border-2 border-highlight pointer-events-none rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
