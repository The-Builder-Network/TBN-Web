import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Star, MapPin, ThumbsUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AskQuestionModal from "@/components/modals/AskQuestionModal";

const answers = [
  {
    bestAnswer: true,
    name: "DO Handyman Services",
    rating: 4.9,
    reviews: 18,
    location: "Dundee",
    text: "Hi, From my personal experience, I try and do all the sanding/filling before the mist coat. Depending on how severe the uneven parts are, these are the steps I'd take: You can go over with a scraper any long lines left over, then sand down the area with 120 grit to remove any high spots. Then fill any low spots with a flexible filler, let it dry, and sand again. After that, apply your mist coat. The mist coat will highlight any remaining imperfections you might have missed, which you can then address before your top coats.",
    date: "6 March 2026",
    likes: 1,
  },
  {
    bestAnswer: false,
    name: "Sab decorator",
    rating: 4.7,
    reviews: 52,
    location: "Bradford",
    text: "Yes and after",
    date: "17 February 2026",
    likes: 0,
  },
  {
    bestAnswer: false,
    name: "sjfuller Building services",
    rating: 5,
    reviews: 8,
    location: "Emsworth",
    text: "Personally I would sand back ,lets say, any obvious imperfections (!) then a mist coat will show up the worst areas, a light will help if you're being very picky then easy fill is probably your best option, then repeat until you're happy.",
    date: "18 February 2026",
    likes: 0,
  },
  {
    bestAnswer: false,
    name: "Tez Decor",
    rating: 5,
    reviews: 8,
    location: "Glasgow",
    text: "I would give it a sand first and then mist coat and if there's any imperfections that require filling can be spotted better with the mist coat.",
    date: "23 February 2026",
    likes: 0,
  },
];

const sortAnswerOptions = [
  { label: "Most liked", value: "most-liked" },
  { label: "Most recent", value: "most-recent" },
  { label: "Least liked", value: "least-liked" },
];

const QuestionDetail = () => {
  const { questionId } = useParams();
  const [expandedAnswers, setExpandedAnswers] = useState<Set<number>>(
    new Set(),
  );
  const [likedAnswers, setLikedAnswers] = useState<Set<number>>(new Set());
  const [likeCounts, setLikeCounts] = useState<number[]>(
    answers.map((a) => a.likes),
  );
  const [showSortModal, setShowSortModal] = useState(false);
  const [sortBy, setSortBy] = useState("most-liked");
  const [tempSort, setTempSort] = useState("most-liked");
  const [showAskModal, setShowAskModal] = useState(false);

  const TRUNCATE_LENGTH = 180;

  const toggleExpand = (i: number) => {
    setExpandedAnswers((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const toggleLike = (i: number) => {
    setLikedAnswers((prev) => {
      const next = new Set(prev);
      const counts = [...likeCounts];
      if (next.has(i)) {
        next.delete(i);
        counts[i]--;
      } else {
        next.add(i);
        counts[i]++;
      }
      setLikeCounts(counts);
      return next;
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link
        to="/ask-tradesperson"
        className="text-primary hover:underline inline-flex items-center gap-1"
      >
        &lsaquo; Back
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
        <div className="md:col-span-2">
          <p className="text-sm text-primary font-medium mb-1">
            Painting & Decorating
          </p>
          <h1 className="text-2xl font-bold mb-1">
            Sanding before mist coat, or after?
          </h1>
          <p className="text-sm text-muted-foreground mb-4">
            Mr Nicholas Bell 06/03/2026 - 7:58 AM
          </p>

          <p className="text-muted-foreground mb-6">
            Hi there, I've recently skimmed a wall within my house (DIY) by no
            means am I at any kind of professional standard. So as expected, I
            have the odd bump and lump in places. With that, should I key the
            entire area(180/240 Grit?), and remove the localised lumps and bumps
            before the mist coat or after? I feel like I have searched across
            the whole internet with conflicting information.
          </p>

          <div className="flex items-center justify-between mb-6">
            <p className="font-semibold flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" /> {answers.length} Answers
            </p>
            <button
              onClick={() => {
                setTempSort(sortBy);
                setShowSortModal(true);
              }}
              className="text-muted-foreground border rounded-lg px-3 py-1.5 flex items-center gap-1 hover:bg-secondary transition-colors"
            >
              Sort by ▾
            </button>
          </div>

          <div className="space-y-6">
            {answers.map((a, i) => {
              const isLong = a.text.length > TRUNCATE_LENGTH;
              const isExpanded = expandedAnswers.has(i);
              const displayText =
                isLong && !isExpanded
                  ? a.text.slice(0, TRUNCATE_LENGTH) + "..."
                  : a.text;

              return (
                <div key={i} className="border-b pb-6 last:border-0">
                  {a.bestAnswer && (
                    <p className="text-sm font-bold text-highlight flex items-center gap-1 mb-2">
                      <Star className="w-3.5 h-3.5 fill-current" /> BEST ANSWER
                    </p>
                  )}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-medium flex-shrink-0">
                      {a.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-primary">{a.name}</p>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-3 h-3 star-filled fill-current" />
                        <span className="font-medium">{a.rating}/5</span>
                        <span className="text-muted-foreground">
                          ({a.reviews} reviews)
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" /> {a.location}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3">{displayText}</p>
                  {isLong && (
                    <button
                      onClick={() => toggleExpand(i)}
                      className="text-primary font-medium mt-1"
                    >
                      {isExpanded ? "Show less" : "Read more"}
                    </button>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-sm text-primary">Answered {a.date}</p>
                    <button
                      onClick={() => toggleLike(i)}
                      className={`flex items-center gap-1.5 border rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                        likedAnswers.has(i)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "hover:bg-secondary"
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" /> Like{" "}
                      <span
                        className={`px-1.5 py-0.5 rounded text-sm ${likedAnswers.has(i) ? "bg-primary-foreground/20" : "bg-secondary"}`}
                      >
                        {likeCounts[i]}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="border rounded-lg p-5">
            <p className="font-bold mb-1">Ready to hire?</p>
            <p className="text-muted-foreground mb-3">
              Post your job in minutes, browse real reviews and choose who to
              speak to.
            </p>
            <Link to="/post-job">
              <Button className="w-full">Post a job</Button>
            </Link>
          </div>
          <div className="border rounded-lg p-5">
            <p className="font-bold mb-1">Need some tips or advice?</p>
            <button
              onClick={() => setShowAskModal(true)}
              className="w-full border rounded-lg px-4 py-2 font-medium hover:bg-secondary transition-colors mt-2"
            >
              Ask a question
            </button>
          </div>
        </div>
      </div>

      {/* Sort Answers Modal */}
      <Dialog open={showSortModal} onOpenChange={setShowSortModal}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl">Sort answers by</DialogTitle>
          </DialogHeader>
          <div className="space-y-1 mt-2">
            {sortAnswerOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTempSort(opt.value)}
                className="w-full flex items-center justify-between py-3 border-b last:border-0 text-left"
              >
                <span>{opt.label}</span>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    tempSort === opt.value
                      ? "border-foreground"
                      : "border-muted-foreground/40"
                  }`}
                >
                  {tempSort === opt.value && (
                    <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
                  )}
                </div>
              </button>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <Button
              onClick={() => {
                setSortBy(tempSort);
                setShowSortModal(false);
              }}
            >
              Apply
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AskQuestionModal open={showAskModal} onOpenChange={setShowAskModal} />
    </div>
  );
};

export default QuestionDetail;
