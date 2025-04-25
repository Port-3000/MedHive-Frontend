'use client';

import React, {
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { useChat } from '@ai-sdk/react';
// import Image from 'next/image'; // Uncomment if Image is needed later

const Chat: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  // Initialize useChat
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const chatRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Handle enter key press
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

  const toggleChat = () => setIsOpen((open) => !open);

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
              <div className="p-1.5 rounded-lg bg-cyan-400/10 border border-cyan-400/30">
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
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
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
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="p-3 rounded-full bg-cyan-400/10 border border-cyan-400/30">
                  <svg
                    className="w-10 h-10 text-cyan-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-['Poppins'] text-gray-100">
                  MedHive Assistant
                </h2>
                <p className="text-gray-400 font-['Poppins']">
                  Ask me about medical information, symptoms, or health advice
                </p>
              </div>
            )}

            {/* Update message mapping */}
            {messages.map((m) => (
              <div
                key={m.id} // Use message id as key
                className={`relative max-w-[85%] p-4 rounded-xl transition-all message-item ${ // Add message-item class
                  m.role === "user"
                    ? "ml-auto bg-gradient-to-br from-cyan-600/70 to-cyan-500/70 text-white shadow-cyan-lg font-['Poppins']"
                    : m.role === "system" // Handle system role if needed, or remove if useChat doesn't use it
                    ? "mx-auto bg-red-500/10 border border-red-400/30 text-red-300"
                    : "mr-auto bg-gray-800/60 border border-gray-700 text-gray-300 hover:border-cyan-400/30 assistant-message" // Keep assistant-message class if needed by scroll logic
                }`}
              >
                {m.content}
                {m.role === "user" && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-cyan-400/50 clip-path-triangle" />
                )}
                {/* Add image rendering if needed, based on m.experimental_attachments */}
                {/* <div> ... Image rendering logic ... </div> */}
              </div>
            ))}
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
};

export default Chat;
