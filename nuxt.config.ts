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
      openaiApiKey: process.env.OPENAI_API_KEY,
      apiModel: process.env.API_MODEL || 'gpt-3.5-turbo',
      aiEndpoint: process.env.AI_ENDPOINT || 'https://api.openai.com/v1/chat/completions',
      siteUrl: process.env.SITE_URL || '',
      siteName: process.env.SITE_NAME || '',
    }
  }
})
