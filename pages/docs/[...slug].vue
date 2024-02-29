<script setup lang="ts">
definePageMeta({
    middleware: 'documentation'
})

import DocumentationLayout from "~/layouts/DocumentationLayout.vue";
import PageFooter from "~/components/PageFooter.vue";
const { page } = useContent()
const $route = useRoute()

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

const navigation = ref();
let path;
onBeforeMount(async () => {
    locale.value = localStorage.getItem('page-locale') || i18n.getBrowserLocale() || 'en'
    let temp = await fetchContentNavigation(queryContent('docs', locale.value))
    console.log(temp)

    if (!temp)
        temp = await fetchContentNavigation(queryContent('docs','en'))
    // navigation.value = (temp?.at(0)?.children?.at(0)?.children as any)?.reverse();

    const sorted = (temp?.at(0)?.children?.at(0)?.children as any)?.sort((a: any, b: any) => {
        const aIsPage = !a.children;
        const bIsPage = !b.children;

        if (aIsPage && !bIsPage) return -1; // a (page) should come before b (directory)
        if (!aIsPage && bIsPage) return 1;  // b (page) should come before a (directory)
        return 0; // No change in order for two items of the same type
    });
    console.log(sorted)

    navigation.value = sorted;
    console.log($route.path)
    path = $route.path
})

</script>

<template>
    <DocumentationLayout :navigation="navigation">
        <article class="prose px-10 py-10 max-w-none">
            <ContentDoc :path="path"/>
        </article>
<!--        <PageFooter/>-->
    </DocumentationLayout>
</template>

<style scoped>

</style>