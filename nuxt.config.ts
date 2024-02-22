// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  i18n: {
    vueI18n: './i18n.config.ts',
    skipSettingLocaleOnNavigate: true,
    locales: [
      { code: 'en', iso: 'en-US', file: {path: 'en-US.json', cache: true}, name: 'English' },
      { code: 'cn', iso: 'zh-CN', file: {path: 'zh-CN.json', cache: true}, name: 'Chinese' }
    ],
    defaultLocale: 'en',
    langDir: 'locales',
    lazy: false,
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',  // recommended
    }
  },
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@nuxt/content'],
  runtimeConfig: {
    public:{
      openaiApiKey: '',
      apiModel: 'gpt-3.5-turbo',
      aiEndpoint: 'https://api.openai.com/v1/chat/completions',
      siteUrl: '',
      siteName: '',
    }
  }
})
