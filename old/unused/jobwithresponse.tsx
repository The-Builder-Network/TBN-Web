import { Link, useParams } from "react-router-dom";
import { Star, MapPin, Phone, MessageSquare, Clock } from "lucide-react";

const invitedTradespeople = [
  { name: "Bletchel Construction Limited", rating: 4.8, reviews: 138 },
  { name: "R M Design and Management Studios", rating: 4.8, reviews: 35 },
  { name: "NP Essex", rating: 4.8, reviews: 302 },
  { name: "AI Planning Portal Ltd", rating: 5, reviews: 180 },
  { name: "CBG ARCHITECTS LTD", rating: 5, reviews: 3 },
  { name: "Africa Naspi design studio ltd", rating: 4.8, reviews: 13 },
  { name: "Steven Alkin Architects", rating: null, reviews: 0 },
  { name: "IIJ Architect Ltd", rating: 4.5, reviews: 5 },
  { name: "anonymous", rating: null, reviews: 0 },
  { name: "NAK Design Ltd", rating: 5, reviews: 1 },
];

const JobResponsesDetailed = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/" className="text-sm text-primary hover:underline">&lsaquo; My jobs</Link>

      <h1 className="text-xl font-bold mt-2 mb-1">Responses to your job: Architectural Services</h1>
      <p className="text-sm text-primary hover:underline mb-6">
        <Link to="#">View details</Link>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="space-y-5">
          <div className="border rounded-lg p-4">
            <h3 className="font-bold text-sm mb-2">My chats</h3>
            <p className="text-xs text-muted-foreground mb-3">
              These are tradespeople you are chatting with about your job. Hire one of them to get your job done soon.
            </p>
            <Link to="#" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <span className="text-xs text-accent-foreground font-bold">NP</span>
              </div>
              NP Essex
            </Link>
            <p className="text-xs text-muted-foreground ml-10">★ 4.8/5 (302 reviews)</p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-bold text-sm mb-2">Interested tradespeople</h3>
            <p className="text-xs text-muted-foreground mb-2">
              Tradespeople interested in your job will show here.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" /> Waiting for more tradespeople
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-bold text-sm mb-2">Invited tradespeople</h3>
            <p className="text-xs text-muted-foreground mb-3">We let these tradespeople know you're interested</p>
            <div className="space-y-2.5">
              {invitedTradespeople.map((tp, i) => (
                <Link key={i} to="#" className="flex items-center gap-2 group">
                  <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-xs font-medium flex-shrink-0">
                    {tp.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-primary group-hover:underline">{tp.name}</p>
                    {tp.rating && (
                      <p className="text-xs text-muted-foreground">★ {tp.rating}/5 ({tp.reviews} reviews)</p>
                    )}
                    {!tp.rating && <p className="text-xs text-muted-foreground">No reviews yet</p>}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-bold text-sm mb-2">Declined responses</h3>
            <p className="text-xs text-muted-foreground mb-2">You've decided not to work with these tradespeople.</p>
            <Link to="#" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-xs font-medium">C</div>
              <div>
                <p className="text-xs font-medium">CBG ARCHITECTS LTD</p>
                <p className="text-xs text-muted-foreground">★ 5/5 (3 reviews)</p>
              </div>
            </Link>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-bold text-sm mb-2">Job details</h3>
            <p className="text-xs text-muted-foreground">Architectural Services</p>
            <Link to="#" className="text-xs font-semibold text-primary hover:underline mt-1 inline-block">
              View details &rsaquo;
            </Link>
          </div>
        </div>

        {/* Main chat area */}
        <div className="md:col-span-2">
          <div className="border rounded-lg p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold">
                NP
              </div>
              <div>
                <h3 className="font-bold">NP Essex</h3>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-3.5 h-3.5 star-filled fill-current" />
                  <span className="font-medium">4.8/5</span>
                  <span className="text-muted-foreground">(302 reviews)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Active within 1 mile of St James, London
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
              <Phone className="w-3.5 h-3.5" /> +447426879200
            </div>

            <div className="flex gap-4 border-b mb-6">
              <button className="text-sm font-medium pb-2 border-b-2 border-primary text-primary">Profile</button>
              <button className="text-sm font-medium pb-2 text-muted-foreground hover:text-foreground">Reviews</button>
              <button className="text-sm font-medium pb-2 text-muted-foreground hover:text-foreground">Messages</button>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-muted-foreground">Thu, 17 Jul 2025</p>
              <div className="bg-secondary/50 rounded-lg p-4 max-w-md ml-auto">
                <p className="text-sm">
                  Good news – this tradesperson is interested in your job and is ready to discuss the details with you.
                </p>
              </div>
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <MessageSquare className="w-3.5 h-3.5 mt-0.5" />
                <p>You can now contact NP Essex. Reach out to discuss the job details and decide if you want to hire this tradesperson.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobResponsesDetailed;
