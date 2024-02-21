<script setup lang="ts">
import OpenAI from "openai";
const config = useRuntimeConfig();

interface Message {
    role: "user" | "system" | "assistant";
    content: string;

}
import ChatMessage from "~/components/ChatMessage.vue";
const i18n = useI18n()
const { locale, locales, setLocale } = useI18n()

async function* asyncGenerator(completionPromise: any) {
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
const messages = ref<Message[]>([
    { role: "system", content: "You instructions in response to the user's prompt (format your response in markdown for better readability for the user, and also respond in the user's prompted language.):\n" +
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
            "4. You are not allowed to aid or assist or respond the user regarding any illegal content."
    },
    // {role:'user', content: '# hello! \n ## this is so markdown **lmao**'},
    // {role:'assistant', content: '# hello!'},
])
const activeResponse = ref<string>(), awaitingResponse = ref<boolean>(false), generatingResponse = ref<boolean>(false)
const input = ref(''), showModal = ref(true)
const selectedLocale = computed({
    get: () => locale.value,
    set: (value) => {
        console.log(value)
        localStorage.setItem('page-locale', value)
        locale.value = value
    }
})

const $openai = new OpenAI({
    baseURL: config.public.aiEndpoint,
    apiKey: config.public.openaiApiKey,
    defaultHeaders: {
        "HTTP-Referer": config.public.siteUrl, // Optional, for including your app on openrouter.ai rankings.
        "X-Title": config.public.siteName, // Optional. Shows in rankings on openrouter.ai.
    },
    dangerouslyAllowBrowser: true,
})

function seek(){
    if(input.value == '' || !input.value) return;
    messages.value.push({ role: 'user', content: input.value })
    input.value = ''
    stream()
}

async function stream(){
    // const completion = (await useFetch(`/api/moodhelper/${JSON.stringify(messages.value)}`))
    awaitingResponse.value = true;
    const completion = await $openai.chat.completions.create({
        model: config.public.apiModel,
        messages: messages.value,
        stream: true
    });
    awaitingResponse.value = false;
    activeResponse.value = "Loading..."
    generatingResponse.value = true;

    if (!completion) {
        activeResponse.value = ""
        generatingResponse.value = false;
        return;
    }
    activeResponse.value = ""
    for await (const chunk of asyncGenerator(completion)){
        activeResponse.value += chunk.choices[0].delta.content;
    }
    generatingResponse.value = false;
    messages.value.push({ role: 'assistant', content: activeResponse.value })
}

function closeModal(){
    showModal.value = false;
}

function stopShowingModal(){
    localStorage.setItem('show-support-modal', "false");
    showModal.value = false;
}

onBeforeMount(() => {
    const dontShowSupportModal = localStorage.getItem('show-support-modal')
    if (dontShowSupportModal) showModal.value = false;

    locale.value = localStorage.getItem('page-locale') || i18n.getBrowserLocale() || 'en'
})
</script>

<template>
    <dialog id="support_on_kofi_modal" :class="`modal ${showModal ? 'modal-open' : ''}`">
        <div class="modal-box">
            <h3 class="font-bold text-lg">{{ $t('support-modal.title') }}</h3>
            <p class="py-4">{{ $t('support-modal.text') }}</p>
            <div class="modal-action grid grid-cols-2 items-center w-full justify-center">
                <a class="btn btn-primary" href="https://ko-fi.com/type32">{{ $t('support-modal.support') }}</a>
                <button class="btn" @click="closeModal()">{{ $t('support-modal.deny') }}</button>
            </div>
            <button class="btn btn-sm btn-ghost w-full mt-2" @click="stopShowingModal()">{{ $t('support-modal.stop-showing-modal') }}</button>
        </div>
    </dialog>
    <div class="flex flex-col min-h-screen items-center align-top justify-start max-tablet:px-8">
        <div class="top-2 sticky items-center justify-center flex laptop:flex-none laptop:w-1/2 max-tablet:w-full z-10">
            <div class="navbar w-full gap-2 group z-10">
                <div class="flex transition duration-300 group-hover:backdrop-blur-lg group-hover:translate-y-1 bg-base-100/70 backdrop-blur-sm rounded-box shadow-lg w-full p-2 gap-2 z-10">
                    <select v-model="selectedLocale" class="select select-bordered h-full">
                        <option value="en">{{ $t(`locales.en`) }}</option>
                        <option value="cn">{{ $t(`locales.cn`) }}</option>
                    </select>
                    <div class="join flex flex-row flex-grow">
                        <textarea class="textarea textarea-bordered join-item w-full h-full" :placeholder="$t('navbar.input.placeholder')" v-model="input"/>
                        <div class="join-item">
                            <button class="btn btn-neutral join-item h-full" @click="seek()">{{ $t('navbar.button.text') }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full flex-grow flex-col flex" v-if="messages.length == 1">
            <div class="flex flex-col justify-center items-center flex-grow gap-5">
                <div class="text-center">
                    <h1 class="text-base-content text-center text-2xl font-bold">{{ $t('role.assistant') }}</h1>
                    <p class="text-base-content/70 text-center">{{ $t('main.landing.author') }}</p>
                </div>
                <div class="avatar">
                    <div class="rounded-full object-contain size-36">
                        <img src="/assets/moodhelper_icon.png" class="-z-10"/>
                    </div>
                </div>
                <p class="text-base-content/70 text-center">{{ $t('main.landing.tips') }}</p>
            </div>
        </div>
        <div class="laptop:w-5/6 max-tablet:w-full grid grid-cols-1 h-fit gap-y-6 py-5" v-else>
            <div class="flex flex-row w-full max-w-screen" v-for="(msg, msgIndex) in messages" :key="msgIndex">
                <ChatMessage :message="msg.content" :role="msg.role" class="flex-grow"/>
            </div>
            <ChatMessage :message="activeResponse" :role="'assistant'" :loading="awaitingResponse" v-if="generatingResponse || awaitingResponse"/>
        </div>
    </div>
    <footer class="footer p-10 bg-neutral text-neutral-content mt-20">
        <aside>
            <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" class="fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg>
            <p>{{ $t('main.footer.org') }}<br>{{ $t('main.footer.org_desc') }}<br><b>{{ $t("role.assistant") }}</b> {{ $t('main.footer.built-with-love') }}</p>
        </aside>
        <nav>
            <h6 class="footer-title">{{ $t('main.footer.nav.links') }}</h6>
            <a href="https://ko-fi.com/type32" class="link link-hover">{{ $t('main.footer.nav.links.kofi-support') }}</a>
            <a href="https://github.com/Type-32" class="link link-hover">{{ $t('main.footer.nav.links.view-github') }}</a>
        </nav>
    </footer>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>