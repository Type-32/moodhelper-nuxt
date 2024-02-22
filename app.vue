<script setup lang="ts">
const { finalizePendingLocaleChange } = useI18n()
const config = useRuntimeConfig()
const i18n = useI18n()

const onBeforeEnter = async () => {
    await finalizePendingLocaleChange()
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
</script>

<template>
    <html data-theme="light" class="max-h-screen">
        <NuxtLayout>
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
