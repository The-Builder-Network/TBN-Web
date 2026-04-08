import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { services } from "@/constants/services";

interface JobServiceComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Height class for the trigger button, e.g. "h-12" or "h-14" */
  triggerClassName?: string;
}

/**
 * Shared job service combobox used in HeroSection, JobServiceSelector,
 * and TradespersonHero forms.
 */
const JobServiceCombobox = ({
  value,
  onChange,
  placeholder = "Select a service...",
  triggerClassName = "h-12 text-base",
}: JobServiceComboboxProps) => {
  const [open, setOpen] = useState(false);

  const selectedService = services.find((s) => s.slug === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full hover:bg-muted hover:text-neutral-800 justify-between",
            triggerClassName,
          )}
        >
          {selectedService ? (
            selectedService.name
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder="Search service..." />
          <CommandList>
            <CommandEmpty>No service found.</CommandEmpty>
            <CommandGroup>
              {services.map((service) => (
                <CommandItem
                  key={service.slug}
                  value={service.name}
                  onSelect={() => {
                    onChange(value === service.slug ? "" : service.slug);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === service.slug ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {service.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default JobServiceCombobox;
