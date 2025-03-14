import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

function MarkdownRenderer({
  className = null,
  content,
}: {
  className?: string;
  content: string;
}) {
  return (
    <div className={cn(className, "prose")}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({
            node,
            inline,
            className,
            children,
            ...props
          }: {
            node?: any;
            inline?: boolean;
            className?: string;
            children: React.ReactNode;
          }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={nord}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <ScrollArea>
                <code className={className} {...props}>
                  {children}
                </code>
              </ScrollArea>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownRenderer;
