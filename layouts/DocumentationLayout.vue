<script setup lang="ts">
const props = defineProps({
    navigation: []
})
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
    <div class="drawer laptop:drawer-open">
        <input id="docs-layout-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col">
            <!-- Navbar -->
            <div class="w-full navbar bg-base-100/70 sticky top-0 shadow-sm backdrop-blur-lg">
                <div class="flex-1 max-tablet:hidden">
                    <input class="input input-ghost w-1/2" :placeholder="$t('docs.nav.search_docs_placeholder')"/>
                </div>
                <div class="flex-none laptop:hidden flex flex-row">
                    <label for="docs-layout-drawer" aria-label="open sidebar" class="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </label>
                    <a class="btn btn-ghost" href="/">
                        <div class="object-contain size-8 rounded-3xl flex items-center">
                            <img src="~/assets/moodhelper_icon.png" alt="MoodHelper Icon" class="rounded-3xl object-contain w-full h-full"/>
                        </div>
                        <h1 class="text-2xl font-bold">MoodHelper</h1>
                    </a>
                </div>
                <div class="flex-none hidden laptop:block">
                    <select v-model="selectedLocale" class="select select-bordered h-full bg-transparent">
                        <option value="en">{{ $t(`locales.en`) }}</option>
                        <option value="cn">{{ $t(`locales.cn`) }}</option>
                    </select>
                </div>
            </div>
            <!-- Content -->
            <slot/>
        </div>
        <div class="drawer-side laptop:p-3 laptop:flex laptop:flex-col">
            <label for="docs-layout-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <div class="flex-1 px-2 mx-2 flex flex-row max-tablet:hidden">
                <a class="btn btn-ghost" href="/">
                    <div class="object-contain size-8 rounded-3xl flex items-center">
                        <img src="~/assets/moodhelper_icon.png" alt="MoodHelper Icon" class="rounded-3xl object-contain w-full h-full"/>
                    </div>
                    <h1 class="text-2xl font-bold">MoodHelper</h1>
                </a>
            </div>
            <MenuTreeLister class="menu p-4 bg-base-100 w-full max-tablet:w-1/3 max-h-screen max-tablet:min-h-full" :list="props.navigation"/>
        </div>
    </div>
</template>

<style scoped>

</style>