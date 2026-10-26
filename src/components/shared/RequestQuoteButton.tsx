import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Plus } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useJobs, inviteToJob, jobKeys } from "@/api/jobs";
import { extractError } from "@/api/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface RequestQuoteButtonProps extends ButtonProps {
  username: string;
  name: string;
  /** First service the tradesperson offers: pre-selects the post-a-job funnel. */
  serviceSlug?: string;
  label?: string;
}

/**
 * MyBuilder-style "Request a quote": invite this tradesperson to one of your open
 * jobs, or post a new job that is sent to them first.
 */
export function RequestQuoteButton({
  username,
  name,
  serviceSlug,
  label = "Request a quote",
  ...buttonProps
}: RequestQuoteButtonProps) {
  const { isHomeowner, isTradesperson } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [busyJob, setBusyJob] = useState<string | null>(null);
  const { data: jobs } = useJobs({ view: "open", perPage: 20 }, isHomeowner);
  const openJobs = isHomeowner ? (jobs?.data ?? []).filter((j) => j.status === "ACTIVE") : [];

  const postJobUrl = `/post-job?${new URLSearchParams({
    invite: username,
    ...(serviceSlug ? { service: serviceSlug } : {}),
  })}`;

  function start() {
    if (isTradesperson) {
      toast({ title: "Sign in as a homeowner to request quotes" });
      return;
    }
    if (openJobs.length) setOpen(true);
    else navigate(postJobUrl);
  }

  async function invite(jobId: string) {
    setBusyJob(jobId);
    try {
      const r = await inviteToJob(jobId, username);
      void qc.invalidateQueries({ queryKey: jobKeys.all });
      setOpen(false);
      toast({
        title: r.alreadyInvited || r.alreadyResponded ? `${name} already has this job` : `${name} has been invited`,
        description: "We'll let you know when they respond.",
      });
    } catch (err) {
      toast({ title: "Could not send invite", description: extractError(err), variant: "destructive" });
    } finally {
      setBusyJob(null);
    }
  }

  return (
    <>
      <Button onClick={start} {...buttonProps}>
        <MessageSquare className="h-5 w-5 mr-2" />
        {label}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request a quote from {name}</DialogTitle>
            <DialogDescription>Send them one of your open jobs, or post a new one.</DialogDescription>
          </DialogHeader>
          <ul className="space-y-2">
            {openJobs.map((job) => (
              <li key={job.id}>
                <button
                  type="button"
                  disabled={!!busyJob}
                  onClick={() => void invite(job.id)}
                  className="w-full rounded-lg border p-3 text-left hover:border-primary/50 disabled:opacity-60"
                >
                  <span className="font-medium block">{job.title}</span>
                  <span className="text-xs text-muted-foreground">
                    #{job.jobNumber} · {job.placeName ?? job.postcode}
                    {busyJob === job.id ? " · Sending…" : ""}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <Button variant="outline" onClick={() => navigate(postJobUrl)}>
            <Plus className="h-4 w-4 mr-2" />
            Post a new job instead
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
