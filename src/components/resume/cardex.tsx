import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function ExpandableCard() {
    const [isExpanded, setIsExpanded] = useState(false);

    // 控制背景滚动
    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isExpanded]);

    return (
        <div className="flex flex-wrap justify-center items-center my-4">
            <Card
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(
                    "transition-all duration-300 ease-in-out",
                    isExpanded
                        ? "fixed inset-4 z-50 "
                        : "w-3/4 bg-card/70 hover:bg-card/80 transition-all shadow-md hover:shadow-xl hover:scale-105 border transition-all duration-100"
                )}
            >
                <CardContent
                    className={cn("h-full", isExpanded ? "overflow-y-auto px-10" : "")}
                >
                    <div className="flex justify-between">
                        <text className="text-1xl font-bold">项目名称</text>
                        <text className="text-1xl font-bold justify-end">1992.12.12</text>
                    </div>
                    <Separator className="my-2" />

                    <p className="text-gray-600 mb-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
                        temporibus officiis culpa! Consectetur fugiat molestiae perferendis
                        numquam debitis labore quaerat, quos eos amet iusto nisi distinctio
                        itaque commodi id ipsum?
                    </p>

                    {/* 展开时显示的额外内容 */}
                    {isExpanded && (
                        <>
                            {/* 可以添加更多内容 */}
                            {Array.from({ length: 100 }).map((_, i) => (
                                <p key={i} className="text-gray-600 mb-4">
                                    额外内容 {i + 1}: Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit...
                                </p>
                            ))}
                        </>
                    )}

                    <div className="flex justify-end">
                        <Badge variant="outline" className="bg-red-100 px-5">
                            没做完xx
                        </Badge>
                    </div>
                </CardContent>
            </Card>
            {/* 背景遮罩 */}
            {isExpanded && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsExpanded(false)}
                />
            )}
        </div>
    );
}

export default ExpandableCard;
