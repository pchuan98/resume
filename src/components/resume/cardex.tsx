import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import MarkdownRenderer from "@/components/resume/markdown";

// max card : card      ->  fixed z-50 inset-1/9 invisible
// max card : content   ->  h-full w-full flex flex-col

// father div ->       <div className="flex flex-wrap justify-center items-center m-10">

interface ResumeCardProps {
  title: string;
  date: string;
  content: string;
  exContent: string;
  expanded: boolean;
  tags: string[];
}

const expandedCardName = "inset-1/20 fixed z-50 shadow-md border";
const collapsedCardName =
  "w-full hover:bg-card/80 transition-all \
    shadow-md hover:shadow-xl hover:scale-101 border transition-all duration-200";
export function ResumeCard({
  className,
  title,
  date,
  content = "",
  exContent = "",
  expanded = true,
  tags = [],
  ...props
}: React.ComponentProps<"div"> & ResumeCardProps) {
  // if exContent is empty, the exContent = content
  if (exContent === "") {
    exContent = content;
  }

  const [isExpanded, setIsExpanded] = useState(expanded);
  const [scrollPosition, setScrollPosition] = useState(0);
  const cardRef = useRef(null);

  // Toggle expand/collapse with scroll position maintenance
  const handleToggleExpand = (newState: boolean) => {
    if (newState) {
      // Save current scroll position when expanding
      setScrollPosition(window.scrollY);
    } else {
      // Use setTimeout to ensure DOM updates before scrolling
      setTimeout(() => {
        window.scrollTo({
          top: scrollPosition,
          behavior: "instant",
        });
      }, 0);
    }
    setIsExpanded(newState);
  };

  useEffect(() => {
    document.body.style.overflow = isExpanded ? "hidden" : "unset";

    // Handle ESC key to close expanded card
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) {
        handleToggleExpand(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isExpanded]);

  // CSS class to disable text selection
  const noSelectClass = "select-none";

  return (
    <div className={cn("flex flex-col", className)}>
      <Card
        ref={cardRef}
        onClick={() => handleToggleExpand(!isExpanded)}
        className={cn(isExpanded ? expandedCardName : collapsedCardName)}
      >
        <CardContent
          className={cn(
            isExpanded ? "flex flex-col h-full w-full" : "",
            noSelectClass
          )}
        >
          <div className="flex justify-between">
            <text className="text-1xl font-bold">{title}</text>
            <text className="text-1xl font-bold justify-end">{date}</text>
          </div>

          <Separator className="my-2" />

          <div className="flex-grow flex items-center justify-center h-1/3">
            {isExpanded ? (
              <ScrollArea className="flex w-full h-full m-3">
                <MarkdownRenderer
                  className={cn("w-2/3", noSelectClass)}
                  content={content}
                />
              </ScrollArea>
            ) : (
              <div className="flex flex-col w-full h-full m-3">
                <MarkdownRenderer
                  className={cn("w-full", noSelectClass)}
                  content={content}
                />
              </div>
            )}
          </div>

          <Separator className="my-2" />

          <div className="h-8 flex items-center justify-end">
            {tags.map((tag) => (
              <Badge variant="destructive" className="mx-1 py-1" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* background */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => handleToggleExpand(false)}
        />
      )}
    </div>
  );
}
