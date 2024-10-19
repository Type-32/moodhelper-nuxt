---
title: "API Usage"
author: "W"
---

# MoodHelper API Usage Guide

Welcome to the API Usage Guide for MoodHelper! Our API allows you to integrate MoodHelper's capabilities into your own applications, providing a seamless way to access our chatbot's responses in real-time. Below, we provide a TypeScript code snippet that demonstrates how to fetch streamed responses from the MoodHelper API, ensuring your application can interact with our service effectively.

## 🚀 Quick Start with the MoodHelper API

The MoodHelper API is designed to be straightforward and easy to use. To communicate with the API, you'll send a POST request to the endpoint `https://moodhelper.crtl-prototype-studios.cn/api/v1/chat`. This request includes the user's message and specifies that the response should be streamed.

## 📜 TypeScript Integration

Here's a simplified TypeScript example to get you started:

```ts
// Define the structure for the messages array
interface Message {
  role: string;
  content: string;
}

// Initialize variables to manage API communication states
let messages: Message[] = [{ role: "user", content: "Hello!" }];
let awaitingResponse: boolean = false;
let generatingResponse: boolean = false;
let errorOccurred: boolean = false;
let activeResponse: string = "";

// Function to handle streaming the response from the API
async function stream() {
  awaitingResponse = true;
  generatingResponse = false;
  activeResponse = ""; // Reset active response

  try {
    const response = await fetch(
      "https://moodhelper.crtl-prototype-studios.cn/api/v1/chat",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, stream: true }), // Ensure stream is true
      },
    );

    if (!response.ok) throw new Error("Network response was not ok.");

    const reader = response.body?.getReader();
    if (!reader) throw new Error("Failed to get reader from response body.");

    awaitingResponse = false;
    generatingResponse = true;

    // Stream the response
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      activeResponse += new TextDecoder("utf-8").decode(value);
    }

    generatingResponse = false;
    messages.push({ role: "assistant", content: activeResponse });
  } catch (error) {
    errorOccurred = true;
    generatingResponse = false;
    console.error("An error occurred:", error);
  } finally {
    awaitingResponse = generatingResponse = false;
  }
}
```

### 📘 API Endpoint Details

- **Endpoint:** `https://moodhelper.crtl-prototype-studios.cn/api/v1/chat`
- **Method:** POST
- **Content-Type:** `application/json`
- **Body Parameters:**
  - `messages`: An array of message objects where each object has a `role` (`user` or `system`) and `content` (the message text).
  - `stream`: A boolean that must be set to `true` to enable streaming responses.

### 💡 Tips for Using the API

- Ensure that the `stream` parameter is always `true` to receive a streamed response.
- The `messages` array can contain multiple messages if needed, but typically you will send one user message at a time.
- Handle `errorOccurred`, `awaitingResponse`, and `generatingResponse` states in your UI to provide feedback to the user (e.g., loading indicators or error messages).
- Always encode your request body as JSON and set the appropriate content type.

## 🛠 Troubleshooting

- **Common Errors:** Check for network issues, ensure the API endpoint URL is correct, and verify that your request body is properly formatted.
- **Debugging:** Use `console.log` statements to debug your function and catch any errors in the try-catch block.
- **API Rate Limits:** Be mindful of the rate limits (50 requests, 15 minute timeout) that may apply to your usage of the API to avoid being temporarily blocked.

## 📚 Further Reading

For more detailed information on integrating with APIs using TypeScript and handling streamed responses, consider exploring additional resources on asynchronous programming in JavaScript/TypeScript and working with the Fetch API.

We hope this guide helps you effectively utilize the MoodHelper API in your projects. Happy coding, and we can't wait to see what you build!
