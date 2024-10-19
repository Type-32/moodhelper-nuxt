<script setup lang="ts">
useHead({
  title: "MoodHelper",
  meta: [
    {
      name: "description",
      content:
        "MoodHelper is a mood-management assistance bot using Mistral AI.",
    },
  ],
  link: [{ rel: "icon", type: "image/png", href: "/moodhelper.png" }],
});

useSeoMeta({
  title: "MoodHelper",
  ogTitle: "MoodHelper",
  description:
    "MoodHelper is a mood-management assistance bot using Mistral AI.",
  ogDescription:
    "MoodHelper is a mood-management assistance bot using Mistral AI.",
  ogImage: "/moodhelper.png",
  twitterCard: "summary_large_image",
});

import ChatBubble from "~/components/ChatBubble.vue";

const config = useRuntimeConfig();
// console.log(process.env)

interface Message {
  role: "user" | "system" | "assistant";
  content: string;
}

import ChatMessage from "~/components/ChatMessage.vue";
const i18n = useI18n();
const { locale, locales, setLocale } = useI18n();

const messages = ref<Message[]>([]);
const activeResponse = ref<string>(),
  awaitingResponse = ref<boolean>(false),
  generatingResponse = ref<boolean>(false),
  errorOccurred = ref<boolean>(false);
const input = ref(""),
  showModal = ref(true);
const selectedLocale = computed({
  get: () => locale.value,
  set: (value) => {
    // console.log(value)
    localStorage.setItem("page-locale", value);
    locale.value = value;
  },
});

// const $openai = new OpenAI({
//     baseURL: config.public.aiEndpoint,
//     apiKey: config.public.openaiApiKey,
//     defaultHeaders: (config.public.aiEndpoint.indexOf("openrouter") != -1 ? {
//         "HTTP-Referer": config.public.siteUrl, // Optional, for including your app on openrouter.ai rankings.
//         "X-Title": config.public.siteName, // Optional. Shows in rankings on openrouter.ai.
//     } : undefined),
//     dangerouslyAllowBrowser: true,
// })

function seek() {
  if (input.value == "" || !input.value) return;
  messages.value.push({ role: "user", content: input.value });
  input.value = "";
  stream();
}

async function stream() {
  awaitingResponse.value = true;
  generatingResponse.value = false;

  // const completion = await $openai.chat.completions.create({
  //     model: config.public.apiModel,
  //     messages: messages.value,
  //     stream: true
  // });
  try {
    const completion = await fetch("/api/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: messages.value,
        stream: true,
      }),
    });

    // console.log(completion)

    if (!completion) {
      activeResponse.value = "errorMessage";
      generatingResponse.value = awaitingResponse.value = false;
      throw new Error("Completion response is null.");
    }

    if (completion.status != 200)
      throw new Error(`${completion.status} ${completion.statusText}`);

    awaitingResponse.value = false;
    activeResponse.value = "Loading...";
    generatingResponse.value = true;

    // activeResponse.value = ""
    // for await (const chunk of asyncGenerator(completion))
    //     activeResponse.value += chunk.choices[0].delta.content;
    //
    // generatingResponse.value = false;
    // messages.value.push({ role: 'assistant', content: activeResponse.value })

    const reader = completion.body?.getReader();
    if (reader == null) {
      activeResponse.value = "errorMessage";
      generatingResponse.value = false;
      throw new Error();
    }

    activeResponse.value = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // console.log(new TextDecoder("utf-8").decode(value || ''))
      activeResponse.value += new TextDecoder("utf-8").decode(value || "");
    }

    generatingResponse.value = false;
    messages.value.push({ role: "assistant", content: activeResponse.value });
  } catch (e: any) {
    errorOccurred.value = true;
    activeResponse.value = e?.message;
  }

  awaitingResponse.value = generatingResponse.value = false;
}

onBeforeMount(() => {
  locale.value =
    localStorage.getItem("page-locale") || i18n.getBrowserLocale() || "en";
});
</script>

<template>
  <div
    class="flex flex-col min-h-screen items-center align-top justify-start max-tablet:px-8"
  >
    <div
      class="top-2 sticky items-center justify-center flex laptop:flex-none laptop:w-1/2 max-tablet:w-full z-10"
    >
      <div class="navbar w-full gap-2 group z-10">
        <div
          class="flex transition duration-300 group-hover:backdrop-blur-lg group-hover:translate-y-1 bg-base-100/70 backdrop-blur-sm rounded-box shadow-lg w-full p-2 gap-2 z-10"
        >
          <select
            v-model="selectedLocale"
            class="select select-bordered h-full bg-transparent"
          >
            <option value="en">{{ $t(`locales.en`) }}</option>
            <option value="cn">{{ $t(`locales.cn`) }}</option>
          </select>
          <div class="join flex flex-row flex-grow">
            <textarea
              class="textarea textarea-bordered join-item w-full h-full bg-transparent"
              :placeholder="$t('navbar.input.placeholder')"
              v-model="input"
            />
            <div class="join-item">
              <button
                class="btn btn-neutral join-item h-full"
                :disabled="
                  awaitingResponse ||
                  generatingResponse ||
                  input == '' ||
                  errorOccurred
                "
                @click="seek()"
              >
                {{ $t("navbar.button.text") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex-grow flex-col flex" v-if="messages.length == 0">
      <div class="flex flex-col justify-center items-center flex-grow gap-5">
        <div class="text-center">
          <h1 class="text-base-content text-center text-2xl font-bold">
            {{ $t("role.assistant") }}
          </h1>
          <p class="text-base-content/70 text-center">
            {{ $t("main.landing.author") }}
          </p>
        </div>
        <div class="avatar">
          <div class="rounded-full object-contain size-36">
            <img src="/assets/moodhelper_icon.png" class="-z-10" />
          </div>
        </div>
        <p class="text-base-content/70 text-center">
          {{ $t("main.landing.tips") }}
        </p>
        <span class="text-base-content/70 text-center"
          >{{ $t("main.check_docs.1") }}
          <a href="/docs" class="link link-hover font-bold">{{
            $t("main.check_docs.2")
          }}</a></span
        >
      </div>
    </div>
    <div
      class="laptop:w-5/6 max-tablet:w-full grid grid-cols-1 h-fit gap-y-6 py-5"
      v-else
    >
      <div
        class="flex flex-row w-full max-w-screen"
        v-for="(msg, msgIndex) in messages"
        :key="msgIndex"
      >
        <ChatMessage
          :message="msg.content"
          :role="msg.role"
          class="flex-grow"
        />
      </div>
      <ChatMessage
        :message="activeResponse"
        :role="'assistant'"
        :loading="awaitingResponse"
        :generating="generatingResponse"
        v-if="(generatingResponse || awaitingResponse) && !errorOccurred"
      />

      <!--            <ChatBubble role="assistant" :message="$t('main.response.error')" :loading="awaitingResponse" :generating="generatingResponse" :error="errorOccurred" v-if="errorOccurred"/>-->
      <div role="alert" class="alert alert-error" v-if="errorOccurred">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{{ `${$t("main.response.error")}${activeResponse}` }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
