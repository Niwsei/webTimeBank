import { GoogleGenAI } from "@google/genai";
import { ServiceRequest } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// A simple in-memory cache to avoid making identical API calls too frequently.
const cache = new Map();

export async function getAIRecommendations(userContext: string, allRequests: ServiceRequest[]): Promise<number[]> {
    if (allRequests.length === 0) return [];
    
    const requestList = allRequests.map(r => `ID ${r.id}: "${r.title}" in category "${r.category}" by user ${r.user.name}`).join('\n');
    const cacheKey = `recs:${userContext}:${requestList}`;

    if (cache.has(cacheKey)) {
        return cache.get(cacheKey);
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `User context: ${userContext}\n\nList of available help requests:\n${requestList}\n\nBased ONLY on the user context and the list, identify the top 2 most relevant request IDs. The user cannot fulfill their own request. Return ONLY a comma-separated list of the IDs (e.g., "2,1"). If no matches, return empty.`,
        });

        const ids = response.text.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id));
        cache.set(cacheKey, ids);
        return ids;

    } catch (error)
     {
        console.error("Error getting AI recommendations:", error);
        // Fallback to returning the first 2 request IDs on error
        return allRequests.slice(0, 2).map(r => r.id);
    }
}