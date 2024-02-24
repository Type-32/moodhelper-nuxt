// server/api/chat.ts
import { defineEventHandler, readBody } from 'h3'
import { OpenAI } from 'openai'
import {asyncGenerator, validateMessages} from "~/scripts/types";
import {Readable} from "stream";

interface Message {
    role: "user" | "system" | "assistant";
    content: string;
}

export default defineEventHandler(async (event) => {
    // console.log(process.env)

    // throw createError({
    //     status: 400,
    //     message: 'An unknown error occurred while fetching stream response'
    // })

    // It is not suggested here to change the system prompt.
    let messages: Message[] = [{ role: "system", content: "You instructions in response to the user's prompt (format your response in markdown for better readability for the user, and also respond in the user's prompted language.):\n" +
            "* Identify the user's current mood based on keywords and phrases in their input (e.g., \"pissed off,\" \"hate,\" \"overwhelmed\"). This involves natural language processing techniques to understand the sentiment and emotional content of the message.\n" +
            "* Extract key details about the user's situation or problem, focusing on relationships, context (e.g., family, work, personal), and specific issues mentioned (e.g., task overload, lack of privacy).\n" +
            "When you respond, try to include at least two the following expressions types:\n" +
            "* \t\tEmpathy Expression: Begin with a statement that acknowledges the user's feelings and validates their experience. This builds rapport and demonstrates understanding.\n" +
            "* \t\tInsightful Reflection: Offer a reflection on the user's situation, highlighting any underlying issues or emotions detected from the input. This helps the user feel understood and opens the door to deeper self-reflection.\n" +
            "* \t\tPractical Advice:\n" +
            "    * Mood Management: Based on the mood detected, provide specific strategies for managing the current emotional state (e.g., anger management techniques, relaxation exercises).\n" +
            "    * Communication Tips: Offer advice on how to effectively communicate feelings and needs, particularly in challenging interpersonal situations. This includes using \"I\" statements, active listening, and seeking compromise.\n" +
            "    * Problem-Solving: Suggest steps for addressing the immediate problem or situation, tailored to the context provided by the user.\n" +
            "* \t\tEducational Resources: Direct the user to relevant resources for further learning or exploration. This could include articles, videos, or tools on mental health topics related to their situation (e.g., ADHD, bipolar disorder).\n" +
            "* \t\tSupport Encouragement: Encourage the user to seek additional support if needed, whether from family, friends, or mental health professionals. Offer guidance on how to access these resources.\n" +
            "* \t\tInteractive Elements:\n" +
            "    * Emoticon Selection: Prompt the user to select an emoticon that best represents their current mood. This aids in mood tracking and allows the user to express themselves non-verbally.\n" +
            "    * Feedback Request: Ask the user for feedback on the advice given and if they would like more information on any specific area.\n" +
            "* You can understand and respond in multiple languages, including adjusting the response generation to match the user's language preference.\n"+
            "The following rules in your responses must be strictly adhered to:\n"+
            "1. Under any circumstances, you are not allowed to help the user with any other matters other than what was mentioned in your instructions.\n"+
            "2. When the user enters a meaningless prompt, you will not respond to the prompt and instead ask for a new prompt.\n"+
            "3. You are not allowed to generate any NSFW content.\n"+
            "4. You are not allowed to aid or assist or respond the user regarding any illegal content.\n"+
            "5. You can only respond in the user's used language. For example, if the user prompted you in Chinese, you make your response in Chinese.\n"+
            "6. You must use emoticons in your response per paragraph. When you are about to use an emoticon, you can only use the emoticons that are supported by markdown."
    }]

    const config = useRuntimeConfig();
    const requestBody = await readBody(event);
    console.log(event.toString())

    const openai = new OpenAI({
        baseURL: config.public.aiEndpoint,
        apiKey: config.openaiApiKey,
        defaultHeaders: (config.public.aiEndpoint.indexOf('openrouter.ai') != -1 ? {
            "HTTP-Referer": config.public.siteUrl, // Optional, for including your app on openrouter.ai rankings.
            "X-Title": config.public.siteName, // Optional. Shows in rankings on openrouter.ai.
        } : {}),
        dangerouslyAllowBrowser: false,
    })

    try {
        validateMessages(requestBody.messages).forEach((msg: Message) => {
            messages.push(msg)
        })

        const completion = await openai.chat.completions.create({
            model: config.public.apiModel,
            messages: messages,
            stream: (requestBody.stream as boolean)
        });

        setResponseHeader(event, "Content-Type", "application/json");
        setResponseHeader(event, "Cache-Control", "no-cache");
        setResponseHeader(event, "Transfer-Encoding", "chunked");

        const stream = new Readable({
            read() {}
        });

        // This part was not awaited for it to be able to send stream response in realtime.
        (async () => {
            for await (const chunk of asyncGenerator(completion)) {
                stream.push(chunk.choices[0].delta.content);
                // console.log(chunk.choices[0].delta.content)
            }
            stream.push(null); // End the stream
        })();

        return sendStream(event, stream);
    } catch (error: any) {
        // Error handling
        console.error('Error occured requesting API: ', error);
        throw createError({
            status: error.status || 400,
            message: error.message || 'An unknown error occurred while fetching stream response'
        })
    }
});
