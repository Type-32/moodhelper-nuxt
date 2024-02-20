FROM node:18-alpine

ARG VITE_OPENAI_API_TOKEN
ENV VITE_OPENAI_API_TOKEN=${VITE_OPENAI_API_TOKEN}

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]