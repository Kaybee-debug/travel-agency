// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/design-tokens.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'VSM Tours — Premium Fleet & Chauffeur',
      meta: [
        {
          name: 'description',
          content:
            'Chauffeured travel across the city and beyond — airport transfers, outstation trips, weddings, corporate rides, and on-demand Uber & Bolt service.',
        },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap',
        },
      ],
    },
  },
})
