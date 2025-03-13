import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardAction, CardContent } from "@/components/ui/card";
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

const expandedCardName = "fixed z-50 inset-1/20 shadow-md border"
const collapsedCardName = "inset-1/10 hover:bg-card/80 transition-all \
    shadow-md hover:shadow-xl hover:scale-105 border transition-all duration-100"

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
        <div className={cn("flex flex-wrap justify-center items-center", className)}>
            <Card
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(isExpanded ? expandedCardName : collapsedCardName)}>
                <CardContent className={cn(isExpanded ? "h-full w-full" : "")}>
                    <div className="h-full w-full flex flex-col">

                        <div className="flex justify-between">
                            <text className="text-1xl font-bold">{title}</text>
                            <text className="text-1xl font-bold justify-end">{date}</text>
                        </div>

                        <Separator className="my-2" />

                        {isExpanded ? (
                            <ScrollArea className="flex-grow flex items-center justify-center h-1/3 m-3">
                                <MarkdownRenderer content={exContent} />
                            </ScrollArea>
                        ) : (
                            <MarkdownRenderer content={content} />
                        )}


                        <Separator className="my-2" />

                        <div className="h-8 flex items-center justify-end">
                            {tags.map((tag) => (
                                <Badge variant="destructive" className="mx-1 py-1" key={tag}>
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card >

            {/* background */}
            {isExpanded && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsExpanded(false)}
                />
            )}
        </div>
    )
}