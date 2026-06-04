
import React from "react";
import { SendHorizonal, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  input: string;
  isTyping: boolean;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ChatInput = ({ input, isTyping, onChange, onSubmit }: ChatInputProps) => {
  return (
    <form onSubmit={onSubmit} className="w-full flex gap-2">
      <Input
        value={input}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type a message..."
        className="flex-grow"
      />
      <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
        {isTyping ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <SendHorizonal className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
};

export default ChatInput;
