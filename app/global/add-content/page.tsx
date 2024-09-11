'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('/global/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content }),
            });
            if (response.ok) {
                setContent('');
                // Handle success (e.g., show a success message)
            } else {
                // Handle error (e.g., show an error message)
            }
        } catch (error) {
            console.error('Error submitting content:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Global Add Content</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Textarea 
                    placeholder="Add content here" 
                    rows={20}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={isLoading}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
                >
                    {isLoading ? 'Adding...' : 'Add Content'}
                </Button>
            </form>
        </div>
    )
}
