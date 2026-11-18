// https://nuxt.com/docs/api/configuration/nuxt-config
const SITE_URL = 'https://vsmtours.co.za'
const SITE_NAME = 'VSM Tours'
const SITE_TITLE = 'VSM Tours — Premium Fleet & Chauffeur | Gauteng'
const SITE_DESCRIPTION =
  'Private chauffeurs across Gauteng and beyond. Airport transfers (OR Tambo & Lanseria), corporate travel, weddings, outstation trips — book in minutes on WhatsApp.'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/design-tokens.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en-ZA' },
      title: SITE_TITLE,
      titleTemplate: '%s',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: SITE_DESCRIPTION },
        {
          name: 'keywords',
          content:
            'VSM Tours, chauffeur Johannesburg, airport transfer OR Tambo, Lanseria transfer, corporate travel Gauteng, wedding transport, outstation trips, private driver Sandton, Pretoria chauffeur',
        },
        { name: 'author', content: SITE_NAME },
        { name: 'robots', content: 'index, follow, max-image-preview:large' },
        { name: 'theme-color', content: '#010b3a' },
        { name: 'geo.region', content: 'ZA-GP' },
        { name: 'geo.placename', content: 'Gauteng, South Africa' },

        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: SITE_NAME },
        { property: 'og:locale', content: 'en_ZA' },
        { property: 'og:url', content: SITE_URL },
        { property: 'og:title', content: SITE_TITLE },
        { property: 'og:description', content: SITE_DESCRIPTION },
        { property: 'og:image', content: `${SITE_URL}/hero.png` },
        { property: 'og:image:alt', content: 'VSM Tours premium chauffeur fleet' },

        // Twitter / X
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: SITE_TITLE },
        { name: 'twitter:description', content: SITE_DESCRIPTION },
        { name: 'twitter:image', content: `${SITE_URL}/hero.png` },
      ],
      link: [
        { rel: 'canonical', href: SITE_URL },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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
