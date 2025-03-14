// src/components/CardGenerator.jsx
import "./index.css";

import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ResumeCard } from "@/components/resume/cardex";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const fetchCards = async ({ pageParam = 0 }) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (Math.random() > 0.98) {
    throw new Error("获取数据时发生错误");
  }

  return {
    data: [
      {
        id: pageParam,
        title: `项目 ${pageParam}`,
        date: `${new Date().getFullYear() - Math.floor(Math.random() * 3)
          }-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}`,
        content: `这是一个示例内容描述，展示了项目 ${pageParam} 的详细信息和亮点。`,
        tags: ["React", "TailwindCSS", "Shadcn UI"]
          .sort(() => Math.random() - 0.5)
          .slice(0, Math.floor(Math.random() * 3) + 1),
      },
    ],
    nextPage: pageParam + 1,
    hasMore: pageParam < 40, // 限制总页数为5页
  };
};

function CardGenerator() {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["resumeCards"],
    queryFn: ({ pageParam = 0 }) => fetchCards({ pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
    initialPageParam: 0,
  });

  // 当 ref 元素进入视图时加载更多数据
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 错误处理
  useEffect(() => {
    if (isError) {
      toast("加载失败", {
        description: error?.message || "获取数据时发生错误，请稍后重试",
      });
    }
  }, [isError, error, toast]);

  // 显示加载骨架屏
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-5 p-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="w-full p-6 rounded-lg border border-border bg-card shadow-sm"
          >
            <div className="space-y-3">
              <Skeleton className="h-6 w-[250px]" />
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-20 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 显示错误信息
  if (isError && !data) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>加载失败</AlertTitle>
          <AlertDescription>
            {error?.message || "获取数据时发生错误，请稍后重试"}
          </AlertDescription>
        </Alert>
        <Button
          onClick={() => refetch()}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          重试
        </Button>
      </div>
    );
  }

  return (
    <div className="w-lvw md:w-lvw flex flex-col justify-center gap-y-1 md:gap-y-5 p-2 md:p-10">
      <AnimatePresence mode="popLayout">
        {data?.pages.map((page) =>
          page.data.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ResumeCard
                title={card.title}
                date={card.date}
                content={card.content}
                tags={card.tags}
              />
            </motion.div>
          ))
        )}
      </AnimatePresence>

      {/* 加载更多触发器 */}
      {hasNextPage && (
        <div ref={ref} className="w-full py-4 flex justify-center">
          {isFetchingNextPage ? (
            <div className="flex flex-col items-center gap-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <p className="text-sm text-muted-foreground">加载更多...</p>
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={() => fetchNextPage()}
              className="text-sm"
            >
              加载更多
            </Button>
          )}
        </div>
      )}

      {/* 没有更多内容提示 */}
      {!hasNextPage && data?.pages.length > 0 && (
        <p className="text-center text-sm text-muted-foreground py-4">
          已经到底了，没有更多内容
        </p>
      )}
    </div>
  );
}

export function Cards() {
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              staleTime: 600,
              retry: 5,
            },
          },
        })
      }
    >
      <CardGenerator />
    </QueryClientProvider>
  );
}
