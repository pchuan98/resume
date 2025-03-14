import { useState, useEffect } from "react";
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

  useEffect(() => {
    document.body.style.overflow = isExpanded ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isExpanded]);

  return (
    <div className={cn("flex flex-col", className)}>
      <Card
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(isExpanded ? expandedCardName : collapsedCardName)}
      >
        <CardContent
          className={cn(isExpanded ? "flex flex-col h-full w-full" : "")}
        >
          <div className="flex justify-between">
            <text className="text-1xl font-bold">{title}</text>
            <text className="text-1xl font-bold justify-end">{date}</text>
          </div>

          <Separator className="my-2" />

          <div className="flex-grow flex items-center justify-center h-1/3">
            {isExpanded ? (
              <ScrollArea className="flex w-full h-full m-3">
                <MarkdownRenderer className="w-2/3" content={content} />
              </ScrollArea>
            ) : (
              <div className="flex flex-col w-full h-full m-3">
                <MarkdownRenderer className="w-full" content={content} />
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
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
}

const ExpandableCard = ({ title, content, image }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    // 当卡片展开时禁止背景滚动
    if (!isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  return (
    <>
      <div
        className={`
            transform transition-all duration-500 ease-in-out cursor-pointer bg-white rounded-lg shadow-md overflow-hidden
            ${
              isExpanded
                ? "fixed inset-0 z-50 m-0 rounded-none"
                : "hover:shadow-xl"
            }
          `}
        onClick={!isExpanded ? toggleExpand : undefined}
      >
        {/* 卡片头部 */}
        <div className="relative">
          <img
            src={image || "/api/placeholder/800/400"}
            alt={title}
            className={`w-full object-cover ${isExpanded ? "h-64" : "h-48"}`}
          />

          {/* 关闭按钮 - 仅在展开状态显示 */}
          {isExpanded && (
            <button
              onClick={toggleExpand}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 focus:outline-none"
            >
              {/* <X size={24} /> */}
            </button>
          )}
        </div>

        {/* 卡片内容 */}
        <div
          className={`p-6 ${
            isExpanded ? "overflow-y-auto max-h-[calc(100vh-16rem)]" : ""
          }`}
        >
          <h3
            className={`font-bold ${
              isExpanded ? "text-2xl mb-6" : "text-lg mb-2"
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-gray-700 ${
              isExpanded ? "text-lg" : "text-sm line-clamp-2"
            }`}
          >
            {content}
          </p>

          {/* 额外内容 - 仅在展开状态显示 */}
          {isExpanded && (
            <div className="mt-6">
              <h4 className="text-xl font-semibold mb-4">详细信息</h4>
              <p className="text-gray-700 mb-4">
                这里可以显示更多的详细内容，只有在卡片展开时才会显示。您可以在这里放置任何需要的元素，
                如更多的文本、图片、视频或交互元素。
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">特点一</h5>
                  <p className="text-sm text-gray-600">特点一的详细描述...</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">特点二</h5>
                  <p className="text-sm text-gray-600">特点二的详细描述...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 背景遮罩 - 仅在展开状态显示 */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleExpand}
        ></div>
      )}
    </>
  );
};

export default ExpandableCard;
