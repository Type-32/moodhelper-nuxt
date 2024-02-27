---
title: "用Docker部署"
author: "D & W"
---

# MoodHelper 聊天机器人安装指南

欢迎使用 MoodHelper 安装指南！ 本页面将引导您完成使用 Docker 启动并运行您自己的 MoodHelper 实例的步骤，Docker 是一个功能强大的平台，可以帮助您轻松部署应用程序。 无论您是 IT 专业人士还是技术爱好者，这些说明都旨在帮助您轻松入门。

## 🐳 Docker 安装概述

Docker 是一组平台即服务产品，它使用操作系统级虚拟化以称为容器的包形式交付软件。 容器之间相互隔离，并捆绑自己的软件、库和配置文件； 他们可以通过明确的渠道相互沟通。 对于 MoodHelper，我们将使用 Docker 容器来封装其环境和依赖项，以便轻松跨不同系统进行部署。

## 🚀 开始使用

在开始安装之前，请确保您的系统上安装了 Docker。 如果没有，请访问 [官方 Docker 文档](https://docs.docker.com/get-docker/) 进行设置。 Docker 准备就绪后，您可以继续安装 MoodHelper。

### 📦安装方法

使用 Docker 部署 MoodHelper 有两种主要方法：

1. **通过 Portainer 部署**（推荐给那些喜欢 GUI 方法的人）
2. **Docker Pull & Up**（对于那些熟悉命令行的人）

## 🌐 使用 Docker 部署 MoodHelper

以下是这两种方法的分步指南：

### 1. 通过 Portainer 部署

Portainer 是一款多功能容器管理工具，可以通过用户友好的 Web 界面轻松部署和管理 Docker 容器。

- **第 1 步：** 登录到您的 Portainer 仪表板。
- **第 2 步：** 导航到“容器”部分，然后单击“添加容器”。
- **第 3 步：** 在“图像”字段中，输入 `type32/moodhelper-nuxt:latest`。
- **第 4 步：** 向下滚动到“Env”并添加上面列出的环境变量。
- **第 5 步：** 将容器上的端口“3000”映射到主机上所需的端口。
- **第 6 步：** 单击“部署容器”以启动您的 MoodHelper 实例。

### 2. Docker 拉起

对于那些喜欢命令行的人，请按照下列步骤操作：

- **第 1 步：** 打开您的终端。
- **第 2 步：** 通过运行以下命令拉取 MoodHelper 镜像：
   ````
   docker pull type32/moodhelper-nuxt：最新
   ````
- **步骤 3：** 使用必要的环境变量和端口映射启动容器：
   ````
   docker run -d -p YOUR_EXTERNAL_PORT_HERE:3000 \
   -e NUXT_OPENAI_API_KEY=YOUR_OPENAI_API_KEY_HERE \
   -e NUXT_PUBLIC_API_MODEL=YOUR_ENDPOINT_MODEL_NAME_HERE \
   -e NUXT_PUBLIC_AI_ENDPOINT=您的_CUSTOM_ENDPOINT_HERE \
   -e NUXT_PUBLIC_SITE_URL=您的网站的S_PUBLIC_URL \
   -e NUXT_PUBLIC_SITE_NAME=您的网站的S_PUBLIC_NAME \
   -e NUXT_API_RATE_LIMIT=50 \
   -e NUXT_API_WINDOW_DURATION=15 \
   --name mudhelper type32/moodhelper-nuxt:最新
   ````

如有必要，请将“YOUR_EXTERNAL_PORT_HERE”替换为您所需的端口映射。 确保您选择的端口已打开并且在您的网络上可用。

## 🎉 恭喜！

您已成功部署 MoodHelper！ 在 Web 浏览器中导航到“http://localhost:3000”（或您的自定义映射端口）以访问您的 MoodHelper 实例。

### 🔧 故障排除

如果您在安装过程中遇到任何问题，这里有一些提示：
- 确保 Docker 正在您的系统上运行。
- 检查您正在使用的端口是否尚未被使用。
- 验证所有环境变量是否设置正确。

### 📚 进一步帮助

有关 Docker 及其命令的更多详细信息，请访问 [Docker 文档](https://docs.docker.com/)。 如果您需要 MoodHelper 的帮助或有任何疑问，请随时联系我们的支持团队。

感谢您选择心情助手！ 我们很高兴您能与新的聊天机器人伴侣一起开始您的情感健康之旅。