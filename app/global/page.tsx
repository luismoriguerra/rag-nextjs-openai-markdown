'use client';
import { useState } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/loading";
import { experimental_useObject as useObject } from 'ai/react';
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";

const predefinedPrompts = [
  "Training and Certification Inquiries",
  "Product Information",
  "Technical Support",
  "Pricing and Licensing",
  "what is the page of individual dashboard",
  "where can I edit my work experience ? ",
  "where can I see my last transactions ? ",
  "what are the top 5 trending projects on Insights app",
];

export default function Page() {
  const [prompt, setPrompt] = useState("");

  const { object, submit, isLoading } = useObject({
    api: '/global/api/chat',
    schema: z.object({
      content: z.string().describe('markdown formatted text answering the users question'),
    }),
  });

  const handlePromptClick = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
    submit(selectedPrompt);
  };

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">AI Assistant</h1>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {predefinedPrompts.map((predefinedPrompt, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => handlePromptClick(predefinedPrompt)}
          >
            {predefinedPrompt}
          </Button>
        ))}
      </div>

      <Input
        value={prompt}
        disabled={isLoading}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            submit(prompt);
          }
        }}
        placeholder="Ask your question here..."
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isLoading && <Loading />}
      <div className="bg-white p-4 rounded-md shadow">
        <Markdown className="prose">
          {object?.content}
        </Markdown>
      </div>
    </div>
  );
}