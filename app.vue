<script setup lang="ts">
const { finalizePendingLocaleChange } = useI18n()

const onBeforeEnter = async () => {
    await finalizePendingLocaleChange()
}
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
