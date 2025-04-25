'use client';
import { useChat } from '@ai-sdk/react';
import { useState, useEffect, useRef, KeyboardEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SendIcon, User, Bot, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toggleChat = () => setIsOpen((open) => !open);
  const { messages, input, handleInputChange, handleSubmit, isLoading,
    error, reload, stop } = useChat({
      maxSteps: 5,

      // run client-side tools that are automatically executed:
      async onToolCall({ toolCall }) {
        if (toolCall.toolName === 'redirect') {
          // Handle redirect tool call
          const { page_name } = toolCall.args as { page_name: string };
          
          // Fix: Check if page_name starts with a slash, if not add one
          const path = page_name.startsWith('/') ? page_name : `/${page_name}`;
          
          // Use absolute path for router.push to avoid path doubling
          router.push(path);
        }
      },
    });

  const chatRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const renderMessageContent = (content: string | null | undefined) => {
    if (!content) return null;
    try {
      return (
        <div className="prose prose-sm dark:prose-invert max-w-none break-words"> {/* Added prose styling + break-words */}
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{ // Customize rendering if needed
              // Example: open links in new tab
              a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      );
    } catch (error) {
      console.error("Failed to parse message content:", error);
      return (
        <div className="text-destructive">
          <p>Error parsing message content. Please try again later.</p>
        </div>
      );
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    // Keep scroll logic, might need adjustment based on how useChat updates messages
    const messageEls = container.querySelectorAll<HTMLElement>(".message-item"); // Use a common class for all messages if needed
    if (messageEls.length > 0) {
      const last = messageEls[messageEls.length - 1];
      last.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]); // Trigger scroll on messages update

  useEffect(() => {
    if (isOpen && messagesContainerRef.current) {
      setTimeout(() => {
        messagesContainerRef.current?.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatRef.current &&
        !chatRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={chatRef}>
      {isOpen ? (
        <div className="flex flex-col bg-gray-900 border border-cyan-400/30 rounded-xl shadow-2xl w-[400px] h-[600px] overflow-hidden backdrop-blur-lg">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-4 flex justify-between items-center border-b border-cyan-400/20">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-['Poppins'] text-cyan-300">
                MedHive AI
              </h1>
            </div>
            <div className="flex items-center gap-2">
              {/* Close chat button */}
              <button
                onClick={toggleChat}
                className="text-cyan-300 hover:text-cyan-200 transition-colors p-1 rounded-lg hover:bg-cyan-400/10"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900/80 to-gray-900/20 font-medium"
          > 
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* Avatar/Icon */}
            {message.role === "assistant" && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <Bot size={20} className="text-muted-foreground" />
              </div>
            )}

            {/* Message Bubble */}
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {renderMessageContent(message.content)}
            </div>

             {/* Avatar/Icon */}
             {message.role === "user" && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <User size={20} className="text-primary-foreground" />
              </div>
            )}
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3 justify-start">
             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <Bot size={20} className="text-muted-foreground" />
              </div>
            <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted text-muted-foreground">
              <div className="flex items-center space-x-2">
                 <span>Assistant is thinking</span>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
                 {/* Optional: Add stop button during generation */}
                 <Button variant="ghost" size="sm" onClick={stop} className="ml-4 text-xs">Stop</Button>
              </div>
            </div>
          </div>
        )}

         {/* Error Display */}
         {error && (
            <div className="flex items-center gap-3 justify-center text-destructive p-3 bg-destructive/10 rounded-lg border border-destructive/30">
                 <AlertTriangle size={20} />
                 <div className="flex-1">
                    <p className="font-semibold">An error occurred:</p>
                    <p className="text-sm">{error.message || 'Please try again.'}</p>
                    {/* Provide a retry mechanism */}
                    <Button variant="destructive" size="sm" onClick={() => reload()} className="mt-2">
                        Retry Last Message
                    </Button>
                 </div>
            </div>
        )}
      </div>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-cyan-400/10 bg-gray-900/50">
            <div className="flex items-center gap-2 font-['Poppins']">
              <textarea
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask Dr. MedLiv..."
                rows={1}
                className="flex-1 p-2 bg-gray-800/60 border border-gray-700 rounded-xl resize-none text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all scrollbar-thin scrollbar-track-gray-900/50 scrollbar-thumb-cyan-400/30"
              />
              <button
                type="submit"
                className="p-2 bg-cyan-400/10 border border-cyan-400/30 rounded-xl hover:bg-cyan-400/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-6 h-6 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </form>

          {/* Status Indicators - Can be removed or adapted if useChat provides connection status */}
          {/* <div className="absolute top-3 right-4 flex space-x-1.5"> ... </div> */}
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/30 text-cyan-400 p-4 rounded-xl shadow-2xl backdrop-blur-lg transition-all hover:shadow-cyan-lg"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
