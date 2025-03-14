import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import MarkdownRenderer from "@/components/resume/markdown";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface ResumeCardProps {
  title: string;
  date: string;
  content: string;
  exContent: string;
  expanded: boolean;
  tags: string[];
}

const expandedCardName =
  "fixed z-50 shadow-md border inset-1/35 sm:inset-1/30 md:inset-1/25 lg:inset-1/20";
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
  if (exContent === "") {
    exContent = content;
  }

  const [isExpanded, setIsExpanded] = useState(expanded);
  const [scrollPosition, setScrollPosition] = useState(0);
  const cardRef = useRef(null);

  const handleToggleExpand = (newState: boolean) => {
    // fix: expand卡片之后scroll坐标会上移部分
    if (newState) {
      setScrollPosition(window.scrollY);
    } else {
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

          <div className="flex-grow flex flex-col min-h-0">
            <div className="flex flex-wrap overflow-auto">
              <ScrollArea className="w-full sm:m-3 m-1 overflow-auto">
                <MarkdownRenderer content={isExpanded ? exContent : content} />
              </ScrollArea>
            </div>
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
