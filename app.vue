<script setup lang="ts">
const config = useRuntimeConfig()
const i18n = useI18n()
const showModal = ref(true)

function closeModal(){
    showModal.value = false;
}

function stopShowingModal(){
    localStorage.setItem('show-support-modal', "false");
    showModal.value = false;
}

useHead({
    title: i18n.t('role.assistant'),
    meta: [
        { name: 'description', content: i18n.t('role.assistant.desc') }
    ],
    link: [
        { rel: 'icon', type: 'image/png', href: '/moodhelper.png' }
    ]
})

useSeoMeta({
    title: i18n.t('role.assistant'),
    ogTitle: i18n.t('role.assistant'),
    description: i18n.t('role.assistant.desc'),
    ogDescription: i18n.t('role.assistant.desc'),
    ogImage: '/moodhelper.png',
    twitterCard: 'summary_large_image',
})

onBeforeMount(() => {
    const dontShowSupportModal = localStorage.getItem('show-support-modal')
    if (dontShowSupportModal) showModal.value = false;
})
</script>

<template>
    <html data-theme="light" class="max-h-screen">
        <NuxtLayout>
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
            <NuxtPage/>

        </NuxtLayout>
    </html>
</template>

<style module>
@tailwind base;
@tailwind components;
@tailwind utilities;

.my-enter-active,
.my-leave-active {
    transition: opacity 0.3s;
}
.my-enter,
.my-leave-active {
    opacity: 0;
}
</style>
