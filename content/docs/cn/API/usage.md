---
title: "API使用"
author: "W"
---

# MoodHelper API 使用指南

欢迎使用 MoodHelper API 使用指南！ 我们的 API 允许您将 MoodHelper 的功能集成到您自己的应用程序中，从而提供一种无缝的方式来实时访问我们的聊天机器人的响应。 下面，我们提供了一个 TypeScript 代码片段，演示如何从 MoodHelper API 获取流式响应，确保您的应用程序可以与我们的服务有效交互。

## 🚀 快速开始使用 MoodHelper API

MoodHelper API 的设计简单且易于使用。 要与 API 进行通信，您需要向端点“https://moodhelper.crtl-prototype-studios.cn/api/v1/chat”发送 POST 请求。 该请求包含用户的消息并指定应以流式传输响应。

## 📜 TypeScript 集成

下面是一个简化的 TypeScript 示例，可帮助您入门：

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
let activeResponse: string = '';

// Function to handle streaming the response from the API
async function stream() {
    awaitingResponse = true;
    generatingResponse = false;
    activeResponse = ''; // Reset active response

    try {
        const response = await fetch('https://moodhelper.crtl-prototype-studios.cn/api/v1/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages, stream: true }), // Ensure stream is true
        });

        if (!response.ok) throw new Error('Network response was not ok.');

        const reader = response.body?.getReader();
        if (!reader) throw new Error('Failed to get reader from response body.');

        awaitingResponse = false;
        generatingResponse = true;

        // Stream the response
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            activeResponse += new TextDecoder("utf-8").decode(value);
        }

        generatingResponse = false;
        messages.push({ role: 'assistant', content: activeResponse });
    } catch (error) {
        errorOccurred = true;
        generatingResponse = false;
        console.error('An error occurred:', error);
    } finally {
        awaitingResponse = generatingResponse = false;
    }
}
```

### 📘 API 端点详细信息

- **端点：** `https://moodhelper.crtl-prototype-studios.cn/api/v1/chat`
- **方法：** POST
- **内容类型：** `application/json`
- **身体参数：**
  - `messages`：消息对象数组，其中每个对象都有一个`角色`（`用户`或`系统`）和`内容`（消息文本）。
  - `stream`：必须设置为 `true` 才能启用流响应的布尔值。

### 💡 使用 API 的技巧

- 确保“stream”参数始终为“true”以接收流式响应。
- 如果需要，“messages”数组可以包含多条消息，但通常您一次会发送一条用户消息。
- 处理 UI 中的“errorOccurred”、“awaitingResponse”和“generateResponse”状态，以向用户提供反馈（例如，加载指示器或错误消息）。
- 始终将您的请求正文编码为 JSON 并设置适当的内容类型。

## 🛠 故障排除

- **常见错误：** 检查网络问题，确保 API 端点 URL 正确，并验证您的请求正文格式是否正确。
- **调试：** 使用 `console.log` 语句来调试您的函数并捕获 try-catch 块中的任何错误。
- **API 速率限制：** 请注意可能适用于您使用 API 的任何速率限制，以避免被暂时阻止。

## 📚 进一步阅读

有关使用 TypeScript 与 API 集成以及处理流式响应的更多详细信息，请考虑探索有关 JavaScript/TypeScript 异步编程以及使用 Fetch API 的其他资源。

我们希望本指南可以帮助您在项目中有效地利用 MoodHelper API。 祝您编码愉快，我们迫不及待地想看看您构建的内容！