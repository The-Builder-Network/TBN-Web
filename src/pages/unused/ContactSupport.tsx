import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ContactSupport = () => {
  const [searchParams] = useSearchParams();
  const emailFromQuery = searchParams.get("email") || "";

  const [formData, setFormData] = useState({
    userType: "",
    topic: "",
    email: emailFromQuery,
    subject: "",
    description: "",
    files: [] as File[],
  });

  const updateField = <K extends keyof typeof formData>(
    key: K,
    value: (typeof formData)[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter((file) => {
        const maxSize = 10 * 1024 * 1024; // 10 MB
        const allowedTypes = [
          "application/pdf",
          "image/png",
          "image/jpeg",
          "image/jpg",
        ];
        return file.size <= maxSize && allowedTypes.includes(file.type);
      });
      updateField("files", [...formData.files, ...newFiles]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact support form submitted:", formData);
    // TODO: Implement form submission logic
  };

  const canSubmit =
    formData.userType &&
    formData.topic &&
    formData.email &&
    formData.subject &&
    formData.description;

  return (
    <main className="flex-1 container py-10 px-16">
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            How can we help?
          </h1>
          <p className="text-sm text-muted-foreground">
            <span className="text-red-500">*</span> Indicates required field
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Type */}
          <div className="space-y-2">
            <Label htmlFor="userType">
              Are you a tradesperson or a homeowner?{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.userType}
              onValueChange={(val) => updateField("userType", val)}
            >
              <SelectTrigger id="userType" className="h-12">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="homeowner">Homeowner</SelectItem>
                <SelectItem value="tradesperson">Tradesperson</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Topic */}
          <div className="space-y-2">
            <Label htmlFor="topic">
              Choose a topic <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.topic}
              onValueChange={(val) => updateField("topic", val)}
            >
              <SelectTrigger id="topic" className="h-12">
                <SelectValue placeholder="Select an Option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="account">Account Issues</SelectItem>
                <SelectItem value="job-posting">Job Posting</SelectItem>
                <SelectItem value="payments">Payments</SelectItem>
                <SelectItem value="technical">Technical Support</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Your email address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="h-12"
              placeholder="your@email.com"
            />
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">
              Subject <span className="text-red-500">*</span>
            </Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => updateField("subject", e.target.value)}
              className="h-12"
              placeholder="Brief description of your issue"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="min-h-[200px] resize-none"
              placeholder="Please provide as much detail as possible..."
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label>Add a document (.pdf, .png, .jpeg, .jpg - max 10 MB)</Label>
            <div className="flex items-center gap-3">
              <label
                htmlFor="file-upload"
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors"
              >
                <Upload className="h-4 w-4" />
                Upload Files
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                multiple
                accept=".pdf,.png,.jpeg,.jpg"
                onChange={handleFileChange}
              />
              <span className="text-sm text-muted-foreground">
                Or drop files
              </span>
            </div>
            {formData.files.length > 0 && (
              <div className="space-y-1 mt-2">
                {formData.files.map((file, i) => (
                  <div
                    key={i}
                    className="text-sm text-muted-foreground flex items-center gap-2"
                  >
                    <span>📎 {file.name}</span>
                    <button
                      type="button"
                      onClick={() =>
                        updateField(
                          "files",
                          formData.files.filter((_, idx) => idx !== i),
                        )
                      }
                      className="text-destructive hover:underline text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              size="lg"
              disabled={!canSubmit}
              className="px-12"
            >
              Send
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ContactSupport;
