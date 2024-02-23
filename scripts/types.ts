export interface Message {
    role: "user" | "system" | "assistant";
    content: string;
}
export function createMessage(role: "user" | "system" | "assistant", content: string): Message {
    return {
        role,
        content,
    };
}

export function validateMessage(input: any): Message {
    if (typeof input === 'object' && input !== null &&
        ('role' in input) && (input.role === "user" || input.role === "system" || input.role === "assistant") &&
        ('content' in input) && typeof input.content === 'string') {
        return input as Message;
    } else {
        throw new Error('Invalid message format');
    }
}

export function validateMessages(input: any): Message[] {
    // Ensure input is an object and not null
    if (typeof input !== 'object' || input === null) {
        throw new Error('Expected an object');
    }

    const messages: Message[] = [];

    for (const key in input) {
        if (input.hasOwnProperty(key)) {
            const validatedMessage = validateMessage(input[key]);
            messages.push(validatedMessage);
        }
    }

    return messages;
}

export async function* asyncGenerator(completionPromise: any) {
    const completion = await completionPromise; // Assuming completionPromise is the promise from the API call

    // Check if the response is a stream and handle accordingly
    if (completion && typeof completion[Symbol.asyncIterator] === 'function') {
        for await (const chunk of completion) {
            yield chunk;
        }
    } else {
        // Handle non-stream responses or errors
        yield completion; // Or handle as needed
    }
}