// server/api/chat.ts
import { defineEventHandler, readBody } from 'h3'
import { OpenAI } from 'openai'

export default defineEventHandler(async (event) => {
    console.log(process.env)
    return 'No Access';
    const config = useRuntimeConfig();
    const requestBody = await readBody(event);

    const openai = new OpenAI({
        baseURL: config.public.aiEndpoint,
        apiKey: config.public.openaiApiKey,
        defaultHeaders: {
            "HTTP-Referer": config.public.siteUrl, // Optional, for including your app on openrouter.ai rankings.
            "X-Title": config.public.siteName, // Optional. Shows in rankings on openrouter.ai.
        },
        dangerouslyAllowBrowser: false,
    })

    try {
        const completion = await openai.chat.completions.create({
            model: config.public.apiModel,
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
