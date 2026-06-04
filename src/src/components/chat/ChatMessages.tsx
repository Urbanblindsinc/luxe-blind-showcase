
import React from "react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
}

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
}

const ChatMessages = ({ messages, isTyping }: ChatMessagesProps) => {
  return (
    <div className="flex-grow overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex",
            message.isBot ? "justify-start" : "justify-end"
          )}
        >
          <div
            className={cn(
              "max-w-[80%] rounded-lg p-3",
              message.isBot 
                ? "bg-gray-100 text-gray-800" 
                : "bg-primary text-white"
            )}
          >
            {message.content}
          </div>
        </div>
      ))}
      
      {isTyping && (
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
