import { useState, useEffect } from "react";
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
  exContent?: string;
  tags?: string[];
}

function ResumeCardContent({
  title,
  date,
  content,
  tags,
}: React.ComponentProps<typeof CardContent> & ResumeCardProps) {
  return (
    <CardContent className="flex flex-col h-full w-full">
      <div className="flex justify-between">
        <div className="text-1xl font-bold">{title}</div>
        <div className="text-1xl font-bold">{date}</div>
      </div>

      <Separator className="my-2" />

      <div className="flex-grow flex flex-col min-h-0">
        <ScrollArea className="w-full sm:m-3 m-1 overflow-auto">
          <MarkdownRenderer content={content} />
        </ScrollArea>
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
  );
}

export function ResumeCard({
  className,
  title,
  date,
  content = "",
  exContent = null,
  tags = [],
  ...props
}: React.ComponentProps<"div"> & ResumeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // 如果未提供 exContent，则使用 content
  exContent ||= content;

  const handleToggleExpand = () => {
    if (!isExpanded) {
      // 展开前保存滚动位置
      setScrollPosition(window.scrollY);
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
      // 动画完成后恢复滚动位置
      setTimeout(() => {
        window.scrollTo({
          top: scrollPosition,
          behavior: "instant",
        });
      }, 300);
    }
  };

  useEffect(() => {
    // 控制页面滚动
    document.body.style.overflow = isExpanded ? "hidden" : "";

    // 处理 ESC 键
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) {
        handleToggleExpand();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isExpanded]);

  return (
    <div className={cn("relative", className)} {...props}>
      {/* normal card */}
      <Card
        onClick={handleToggleExpand}
        className={cn(
          "bg-card/50",
          "select-none",
          "transition-all duration-300 ease-in-out transform origin-center",
          "w-full shadow-md hover:shadow-xl hover:scale-101",
          className
        )}
      >
        <ResumeCardContent
          title={title}
          date={date}
          content={content}
          tags={tags}
        />
      </Card>

      {/* expand card */}
      <Card
        onClick={handleToggleExpand}
        className={cn(
          "select-none",
          "transition-all duration-300 ease-in-out transform origin-center",
          "fixed z-50 inset-1/35 sm:inset-1/30 md:inset-1/25 lg:inset-1/20 shadow-xl scale-100",
          !isExpanded && "hidden",
          className
        )}
      >
        <ResumeCardContent
          title={title}
          date={date}
          content={exContent}
          tags={tags}
        />
      </Card>

      {/* mask */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-200",
          isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={handleToggleExpand}
      />
    </div>
  );
}
