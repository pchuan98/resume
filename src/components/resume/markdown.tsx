import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";

function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className={cn("prose")}>
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
                wrapLines={true}
                wrapLongLines={true}
                showLineNumbers={true}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={cn(className, "text-sm break-all")} {...props}>
                {children}
              </code>
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
