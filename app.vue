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
