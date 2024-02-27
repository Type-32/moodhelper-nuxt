<script setup lang="ts">
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
    error: Boolean,
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
    <div :class="`chat ${props.role == 'assistant' ? 'chat-start' : 'chat-end'} ${props.role == 'system' ? 'hidden' : ''}`">
        <div class="chat-image avatar">
            <div class="w-10 rounded-full">
                <img src="/assets/moodhelper_user.png" v-if="props.role == 'user'"/>
                <img src="/assets/moodhelper_icon.png" v-else/>
            </div>
        </div>
        <div class="chat-header">
            {{ props.role == 'assistant' ? $t("role.assistant") : $t("role.user") }}
        </div>
        <div :class="`chat-bubble hover:shadow-md transition duration-200 text-left ${error ? 'chat-bubble-error' : props.role == 'assistant' ? 'chat-bubble-primary' : ''}`">
            <span class="loading loading-dots loading-lg" v-if="props.loading">{{ $t('main.loading') }}</span>
            <div>
                <m-d-c :value="props.message" class="prose max-w-none text-base-100/80 prose-headings:text-base-100"/>
            </div>
        </div>
        <div class="chat-footer opacity-50" v-if="props.generating">
            {{ $t('main.response.generating') }}
        </div>
    </div>
</template>

<style scoped>

</style>