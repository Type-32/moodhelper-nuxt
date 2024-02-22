// server/api/chat.ts
import { defineEventHandler, readBody } from 'h3'
import { OpenAI } from 'openai'

export default defineEventHandler(async (event) => {
    // console.log(process.env)
    return 'No Access 404'; // Comment this out to use custom backend

    const config = useRuntimeConfig();
    const requestBody = await readBody(event);

    const openai = new OpenAI({
        baseURL: (process.env.AI_ENDPOINT || 'https://api.openai.com/v1/chat/completions'),
        apiKey: process.env.OPENAI_API_KEY,
        defaultHeaders: {
            "HTTP-Referer": process.env.SITE_URL, // Optional, for including your app on openrouter.ai rankings.
            "X-Title": process.env.SITE_NAME, // Optional. Shows in rankings on openrouter.ai.
        },
        dangerouslyAllowBrowser: false,
    })

    try {
        const completion = await openai.chat.completions.create({
            model: (process.env.API_MODEL || 'gpt-3.5-turbo'),
            messages: requestBody.messages,
            stream: true
        });

        return completion;
    } catch (error: any) {
        // Error handling
        console.error('OpenAI API error:', error);
        return { error: error.message };
    }
});
