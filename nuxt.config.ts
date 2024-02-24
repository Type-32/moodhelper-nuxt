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
  modules: ['@nuxtjs/tailwindcss', 'nuxt-rate-limit', '@nuxtjs/i18n', '@nuxt/content'],
  nuxtRateLimit: {
    routes: {
      '/api/v1/*': {
        maxRequests: (!process.env.NUXT_API_RATE_LIMIT ? 50 : process.env.NUXT_API_RATE_LIMIT as unknown as number),
        intervalSeconds: ((!process.env.NUXT_API_WINDOW_DURATION ? 15 * 60 : process.env.NUXT_API_WINDOW_DURATION as unknown as number * 60)),
      },
    },
  },
  runtimeConfig: {
    apiRateLimit: 50, // Default: 50 requests per min
    apiWindowDuration: 15, // Default: 15 minutes
    openaiApiKey: '',
    public:{
      apiModel: 'gpt-3.5-turbo',
      aiEndpoint: 'https://api.openai.com/v1/chat/completions',
      siteUrl: '',
      siteName: '',
    }
  },
})
