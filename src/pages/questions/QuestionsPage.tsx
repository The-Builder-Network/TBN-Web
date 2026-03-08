import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronRight, MessageSquare, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import JobServiceCombobox from "@/components/shared/JobServiceCombobox";
import SortOptionsModal from "@/components/modals/SortOptionsModal";
import AskQuestionModal from "@/components/modals/AskQuestionModal";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { services } from "@/data/services";

const questions = [
  {
    category: "Painting & Decorating",
    title: "Concrete/cement interior wall",
    author: "Anonymous user",
    date: "08/03/2026 - 2:09 PM",
    preview:
      "Hi, we have just stripped wallpaper off in our bedroom that's not been decorated since 1970s and underneath it all appears to be concrete wall? We have some cracks under our window and some pink stuff...",
    answers: 1,
    bestAnswer: true,
    likes: 1,
  },
  {
    category: "Handyman",
    title: "Carpenter",
    author: "Anonymous user",
    date: "08/03/2026 - 2:05 PM",
    preview:
      "Is it common practice for a tradesman to ask for just over 60% of total price of job upfront before starting job to buy materials?",
    answers: 3,
    bestAnswer: true,
    likes: 2,
  },
  {
    category: "Plumbing",
    title: "How complicated would it be to rearrange bathroom?",
    author: "Anonymous user",
    date: "08/03/2026 - 1:53 PM",
    preview:
      "I recently bought a house and the bathroom is absolutely fine but the layout is awkward (bath with shower against windowsill making it difficult to have any kind of shower screen and boiler placed ominously above your head...",
    answers: 1,
    bestAnswer: true,
    likes: 1,
  },
  {
    category: "Carpentry & Joinery",
    title: "Doors",
    author: "Anonymous user",
    date: "08/03/2026 - 12:33 PM",
    preview:
      "Can you hang a solid wood door on a wood frame. Do you need two people to fit this type of door",
    answers: 3,
    bestAnswer: true,
    likes: 1,
  },
  {
    category: "Plumbing",
    title: "John Root",
    author: "John Root",
    date: "08/03/2026 - 9:44 AM",
    preview:
      "Whilst most houses in our street have the external stop cock on the outside pavement, ours is located in our back yard. It is leaking. Our plumber said it is Thames Water property and he can not touch it...",
    answers: 5,
    bestAnswer: true,
    likes: 1,
  },
];

const QuestionsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedService, setSelectedService] = useState("");
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [askModalOpen, setAskModalOpen] = useState(false);

  // Sync URL to State on mount
  useEffect(() => {
    const serviceSlug = searchParams.get("service");
    if (serviceSlug) {
      // Validate slug
      const service = services.find((s) => s.slug === serviceSlug);
      if (service) {
        setSelectedService(serviceSlug);
      } else {
        // Invalid slug, reset URL
        setSearchParams((prev) => {
          const next = new URLSearchParams(prev);
          next.delete("service");
          return next;
        });
      }
    } else {
      setSelectedService("");
    }
  }, [searchParams, setSearchParams]);

  const handleServiceChange = (slug: string) => {
    setSelectedService(slug);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (slug) {
        next.set("service", slug);
      } else {
        next.delete("service");
      }
      return next;
    });
  };

  const handleSortApply = (sort: string) => {
    console.log("Sorting by:", sort);
    // Logic to sort questions would go here
  };

  return (
    <div className="flex-1 container py-10 px-16">
      <h1 className="text-3xl font-bold mb-2">Ask a tradesperson</h1>
      <p className="text-md text-muted-foreground mb-6">
        Get the latest advice about improving your home by asking our expert
        tradespeople.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Filter */}
          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm text-muted-foreground">Filter by Service</p>
          </div>

          <div className="mb-4">
            <JobServiceCombobox
              value={selectedService}
              onChange={handleServiceChange}
              placeholder="All categories"
              triggerClassName="bg-background w-full"
            />
          </div>

          <div className="flex items-center justify-between my-4">
            <p className="text-md font-medium flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" /> 60,676 questions
            </p>
            <button
              className="text-sm text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors"
              onClick={() => setSortModalOpen(true)}
            >
              <Filter className="w-4 h-4" /> Sort by ▾
            </button>
          </div>

          <div className="space-y-4">
            {questions.map((q, i) => (
              <Link
                key={i}
                to="#"
                className="block border rounded-lg p-5 hover:border-primary/20 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-highlight font-medium mb-1">
                      {q.category}
                    </p>
                    <h3 className="font-bold text-lg">{q.title}</h3>
                    <p className="text-sm text-muted-foreground my-0.5">
                      {q.author} · {q.date}
                    </p>
                    <p className="text-sm text-muted-foreground my-2 line-clamp-2">
                      {q.preview}
                    </p>
                    {q.preview.length > 100 && (
                      <span className="text-sm text-primary font-medium">
                        Read more
                      </span>
                    )}
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" /> {q.answers}{" "}
                        answer{q.answers !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground ml-4 mt-1 flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>5</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>6068</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="border rounded-lg p-5 bg-secondary/30">
            <p className="font-bold text-lg mb-2">Need some tips or advice?</p>
            <Button
              className="w-full mt-2"
              onClick={() => setAskModalOpen(true)}
            >
              Ask a question
            </Button>
          </div>
          <div className="border rounded-lg p-5">
            <p className="font-bold text-lg mb-2">Ready to hire?</p>
            <p className="text-sm text-muted-foreground mb-4">
              Post your job in minutes, browse real reviews and choose who to
              speak to.
            </p>
            <Link to={selectedService ? `/post-job?service=${selectedService}` : "/post-job"}>
              <Button
                variant="outline"
                className="w-full hover:bg-secondary transition-colors font-medium border-primary text-primary hover:text-primary"
              >
                Post a job
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <SortOptionsModal
        open={sortModalOpen}
        onOpenChange={setSortModalOpen}
        onApply={handleSortApply}
      />

      <AskQuestionModal 
        open={askModalOpen} 
        onOpenChange={setAskModalOpen} 
        initialService={selectedService}
      />
    </div>
  );
};

export default QuestionsPage;
