
import React from "react";
import { ChevronRight } from "lucide-react";

interface SuggestedQuestion {
  text: string;
  onClick: () => void;
}

interface ChatSuggestionsProps {
  questions: SuggestedQuestion[];
}

const ChatSuggestions = ({ questions }: ChatSuggestionsProps) => {
  return (
    <div className="flex overflow-x-auto gap-2 pb-2 mb-3">
      {questions.map((question, index) => (
        <button
          key={index}
          onClick={question.onClick}
          className="flex items-center whitespace-nowrap text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
        >
          {question.text}
          <ChevronRight className="h-3 w-3 ml-1" />
        </button>
      ))}
    </div>
  );
};

export default ChatSuggestions;
