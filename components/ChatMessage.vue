<script setup lang="ts">
import VueMarkdown from 'vue-markdown-render';

interface Message {
    role: "user" | "system" | "assistant";
    content: string;
}
import type {PropType} from "vue";
const props = defineProps({
    message: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true
    },
    loading: Boolean,
    generating: Boolean,
})

function copyToClipboard() {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = props.message;

    // Set the textarea to be out of view
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';

    // Append the textarea to the DOM
    document.body.appendChild(textarea);

    // Select the text inside the textarea
    textarea.select();

    try {
        // Execute the copy command
        document.execCommand('copy');
        console.log('Text copied to clipboard:', props.message);
    } catch (err) {
        console.error('Unable to copy text to clipboard:', err);
    } finally {
        // Clean up: remove the temporary textarea
        document.body.removeChild(textarea);
    }
}
</script>

<template>
    <div :class="`flex gap-2 ${props.role == 'system' ? 'hidden' : ''} max-w-full`">
        <div class="h-full">
            <div class="avatar">
                <div class="rounded-full object-contain size-8">
                    <img src="/assets/moodhelper_user.png" class="-z-10" v-if="props.role == 'user'"/>
                    <img src="/assets/moodhelper_icon.png" class="-z-10" v-else/>
                </div>
            </div>
        </div>
        <div class="flex-grow flex flex-col gap-4">
            <div class="font-bold text-base-content">{{ props.role == 'assistant' ? $t("role.assistant") : $t("role.user") }}</div>
            <div class="tooltip active:scale-[0.99] cursor-pointer transition duration-200 text-left" data-tip="Click to Copy" @click="copyToClipboard()">
                <span class="loading loading-dots loading-lg" v-if="props.loading">{{ $t('main.loading') }}</span>
                <m-d-c :value="props.message" class="prose p-5 ring-1 ring-base-200 rounded-box max-w-none hover:shadow-md transition duration-300" v-else/>
            </div>
            <div class="text-left badge" v-if="props.generating">{{ $t('main.response.generating') }}</div>
        </div>
    </div>
</template>

<style scoped>

</style>