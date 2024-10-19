---
title: "Install via Docker"
author: "D & W"
---

# MoodHelper Chatbot Installation Guide

Welcome to the MoodHelper Installation Guide! This page will walk you through the steps to get your own instance of MoodHelper up and running using Docker, a powerful platform that can help you deploy applications with ease. Whether you're an IT professional or a tech enthusiast, these instructions are designed to get you started without any hassle.

## 🐳 Docker Installation Overview

Docker is a set of platform-as-a-service products that use OS-level virtualization to deliver software in packages called containers. Containers are isolated from each other and bundle their own software, libraries, and configuration files; they can communicate with each other through well-defined channels. For MoodHelper, we'll be using a Docker container to encapsulate its environment and dependencies, making it easy to deploy across different systems.

## 🚀 Getting Started

Before diving into the installation, ensure you have Docker installed on your system. If not, visit the [official Docker documentation](https://docs.docker.com/get-docker/) to get it set up. Once Docker is ready, you can proceed with installing MoodHelper.

### 📦 Installation Methods

You have two main methods to deploy MoodHelper using Docker:

1. **Deploy via Portainer** (Recommended for those who prefer a GUI approach)
2. **Docker Pull & Up** (For those comfortable with the command line)

## 🌐 Deploy MoodHelper Using Docker

Here's a step-by-step guide for both methods:

### 1. Deploy via Portainer

Portainer is a versatile container management tool that makes it easy to deploy and manage Docker containers through a user-friendly web interface.

- **Step 1:** Log in to your Portainer dashboard.
- **Step 2:** Navigate to the "Containers" section and click on "Add Container."
- **Step 3:** In the "Image" field, enter `type32/moodhelper-nuxt:latest`.
- **Step 4:** Scroll down to "Env" and add the environment variables listed above.
- **Step 5:** Map the port `3000` on the container to a desired port on your host.
- **Step 6:** Click "Deploy the container" to start your MoodHelper instance.

### 2. Docker Pull & Up

For those who prefer the command line, follow these steps:

- **Step 1:** Open your terminal.
- **Step 2:** Pull the MoodHelper image by running:
  ```
  docker pull type32/moodhelper-nuxt:latest
  ```
- **Step 3:** Start the container with the necessary environment variables and port mapping:
  ```
  docker run -d -p YOUR_EXTERNAL_PORT_HERE:3000 \
  -e NUXT_OPENAI_API_KEY=YOUR_OPENAI_API_KEY_HERE \
  -e NUXT_PUBLIC_API_MODEL=YOUR_ENDPOINT_MODEL_NAME_HERE \
  -e NUXT_PUBLIC_AI_ENDPOINT=YOUR_CUSTOM_ENDPOINT_HERE \
  -e NUXT_PUBLIC_SITE_URL=YOUR_SITE'S_PUBLIC_URL \
  -e NUXT_PUBLIC_SITE_NAME=YOUR_SITE'S_PUBLIC_NAME \
  -e NUXT_API_RATE_LIMIT=50 \
  -e NUXT_API_WINDOW_DURATION=15 \
  --name moodhelper type32/moodhelper-nuxt:latest
  ```

Replace `YOUR_EXTERNAL_PORT_HERE` with your desired port mapping if necessary. Ensure the port you choose is open and available on your network.

## 🎉 Congratulations!

You have successfully deployed MoodHelper! Navigate to `http://localhost:3000` (or your custom mapped port) in your web browser to access your MoodHelper instance.

### 🔧 Troubleshooting

Should you encounter any issues during the installation process, here are a few tips:

- Ensure Docker is running on your system.
- Check that the ports you're using are not already in use.
- Verify that all environment variables are correctly set.

### 📚 Further Assistance

For more detailed information about Docker and its commands, visit the [Docker documentation](https://docs.docker.com/). If you need help with MoodHelper or have any questions, don't hesitate to reach out to our support team.

Thank you for choosing MoodHelper! We're excited for you to start your journey towards better emotional well-being with your new chatbot companion.
