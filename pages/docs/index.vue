<script setup lang="ts">
const i18n = useI18n()
const { locale, locales, setLocale } = useI18n()
const selectedLocale = computed({
    get: () => locale.value,
    set: (value) => {
        // console.log(value)
        localStorage.setItem('page-locale', value)
        locale.value = value
    }
})
onBeforeMount(() => {
    locale.value = localStorage.getItem('page-locale') || i18n.getBrowserLocale() || 'en'
})
</script>

<template>
    <div class="min-h-screen w-full flex justify-center items-center">
        <span class="text-center text-base-content">{{ $t('docs.coming_soon') }}</span>
    </div>
</template>

<style scoped>

</style>