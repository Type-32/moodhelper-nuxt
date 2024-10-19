<script setup lang="ts">
definePageMeta({
  middleware: "documentation",
});

useHead({
  title: "MoodHelper Docs",
  meta: [{ name: "description", content: "Documentation for MoodHelper." }],
  link: [{ rel: "icon", type: "image/png", href: "/moodhelper.png" }],
});

useSeoMeta({
  title: "MoodHelper Docs",
  ogTitle: "MoodHelper Docs",
  description: "Documentation for MoodHelper.",
  ogDescription: "Documentation for MoodHelper.",
  ogImage: "/moodhelper.png",
  twitterCard: "summary_large_image",
});

import DocumentationLayout from "~/layouts/DocumentationLayout.vue";
import PageFooter from "~/components/PageFooter.vue";
const { page } = useContent();
const $route = useRoute(),
  $router = useRouter();

const i18n = useI18n();
const { locale, locales, setLocale } = useI18n();

const navigation = ref();
let path;

onBeforeMount(async () => {
  locale.value =
    localStorage.getItem("page-locale") || i18n.getBrowserLocale() || "en";
  await getContentPaths();
});

async function getContentPaths() {
  const { data: temp, error } = await useAsyncData(
    async () =>
      await fetchContentNavigation(queryContent("docs", locale.value)),
  );

  path = $route.path;

  watchEffect(() => {
    if (temp.value) {
      navigation.value = processNavigation(temp); // Assuming you have a function to process or sort data
      // console.log(JSON.stringify(navigation.value))
    }
  });
}

function processNavigation(value: any) {
  return (value.value?.at(0)?.children?.at(0)?.children as any)?.sort(
    (a: any, b: any) => {
      const aIsPage = !a.children;
      const bIsPage = !b.children;

      if (aIsPage && !bIsPage) return -1; // a (page) should come before b (directory)
      if (!aIsPage && bIsPage) return 1; // b (page) should come before a (directory)
      return 0; // No change in order for two items of the same type
    },
  );
}

watch(locale, async () => {
  await getContentPaths();
  let end: string = "";
  $route.fullPath
    .split("/")
    .slice(3, $route.params.slug.length + 2)
    .forEach((str) => {
      end += `/${str}`;
    });
  $router.push(`/docs/${locale.value}${end || "getting-started"}`);
  // reloadNuxtApp()
});
</script>

<template>
  <DocumentationLayout :navigation="navigation">
    <!--        <div>{{navigation}}</div>-->
    <article class="prose px-10 py-10 max-w-none">
      <ContentDoc :path="path">
        <template #not-found>
          <div role="alert" class="alert alert-error flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ $t("docs.404.nonexist") }}</span>
          </div>
          <div class="mockup-window border border-base-300 mt-4">
            <div class="p-5 flex-col flex justify-center gap-3">
              <div class="flex justify-center">
                {{ $t("docs.404.buttons") }}
              </div>
              <div class="flex justify-center gap-2">
                <input
                  type="radio"
                  name="radio-2"
                  class="radio radio-primary"
                  checked
                />
                <input
                  type="radio"
                  name="radio-2"
                  class="radio radio-primary"
                />
                <input
                  type="radio"
                  name="radio-2"
                  class="radio radio-primary"
                />
                <input
                  type="radio"
                  name="radio-2"
                  class="radio radio-primary"
                />
                <input
                  type="radio"
                  name="radio-2"
                  class="radio radio-primary"
                />
                <input
                  type="radio"
                  name="radio-2"
                  class="radio radio-primary"
                />
              </div>
              <div class="flex justify-center gap-2">
                <input
                  type="radio"
                  name="radio-3"
                  class="radio radio-secondary"
                  checked
                />
                <input
                  type="radio"
                  name="radio-3"
                  class="radio radio-secondary"
                />
                <input
                  type="radio"
                  name="radio-3"
                  class="radio radio-secondary"
                />
                <input
                  type="radio"
                  name="radio-3"
                  class="radio radio-secondary"
                />
                <input
                  type="radio"
                  name="radio-3"
                  class="radio radio-secondary"
                />
                <input
                  type="radio"
                  name="radio-3"
                  class="radio radio-secondary"
                />
              </div>
            </div>
          </div>
        </template>
      </ContentDoc>
    </article>
    <!--        <PageFooter/>-->
  </DocumentationLayout>
</template>

<style scoped></style>
