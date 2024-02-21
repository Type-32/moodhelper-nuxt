FROM node:18-alpine

# Required
ARG OPENAI_API_KEY
ENV OPENAI_API_KEY=${OPENAI_API_KEY}
ARG API_MODEL
ENV API_MODEL=${API_MODEL}

# Optional, for customizing endpoints
ARG AI_ENDPOINT
ENV AI_ENDPOINT=${AI_ENDPOINT}

# For Telemetry, optional
ARG SITE_NAME
ENV SITE_NAME=${SITE_NAME}
ARG SITE_URL
ENV SITE_URL=${SITE_URL}

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]