<script setup lang="ts">
const WHATSAPP_PRIMARY = '27605457885'
const WHATSAPP_DISPLAY = '+27 60 545 7885'
const EMAIL = 'vsmtours8@gmail.com'
const EMAIL_DISPLAY = 'VSMTOURS8@GMAIL.COM'
const SITE_URL = 'https://vsmtours.co.za'

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LimousineService',
        name: 'VSM Tours',
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        image: `${SITE_URL}/hero.png`,
        description:
          'Private chauffeurs across Gauteng and beyond. Airport transfers, corporate travel, weddings, and outstation trips.',
        telephone: '+27605457885',
        email: EMAIL,
        areaServed: [
          { '@type': 'City', name: 'Johannesburg' },
          { '@type': 'City', name: 'Pretoria' },
          { '@type': 'City', name: 'Sandton' },
          { '@type': 'City', name: 'Midrand' },
          { '@type': 'AdministrativeArea', name: 'Gauteng' },
        ],
        serviceType: [
          'Airport transfer',
          'Corporate travel',
          'Wedding transport',
          'Outstation trips',
          'Hourly chauffeur',
        ],
        availableLanguage: ['English'],
        sameAs: [`https://wa.me/${WHATSAPP_PRIMARY}`],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+27605457885',
          contactType: 'customer service',
          areaServed: 'ZA',
          availableLanguage: 'English',
        },
      }),
    },
  ],
})

const mobileOpen = ref(false)

const form = reactive({
  name: '',
  service: 'Airport Transfer (OR Tambo / Lanseria)',
  vehicle: 'V-Class',
  passengers: '1',
  pickup: '',
  dropoff: '',
  date: '',
  time: '',
  notes: '',
})

/** Min selectable pickup date (today, local) */
const minPickupDate = computed(() => {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
})

function openPicker(e: Event) {
  const el = e.currentTarget as HTMLInputElement & { showPicker?: () => void }
  try {
    el.showPicker?.()
  } catch {
    /* browser may block if not a user gesture; native click still works */
  }
}

const serviceTypes = [
  'Airport Transfer (OR Tambo / Lanseria)',
  'Meet & Greet',
  'Point-to-Point Transfer',
  'Hourly / Day Chauffeur',
  'Corporate Travel',
  'Outstation / Long Distance',
  'Event / Wedding / Conference',
  'Family / Group Tour',
  'Other',
]

const vehicles = [
  'C-Class',
  'V-Class',
  'E-Class',
  'BMW X3',
  'Hyundai Staria',
]

const fleet = [
  {
    n: '01',
    name: 'C-Class',
    tagline: 'Executive comfort, every mile.',
    seats: 3,
    luggage: '',
    bestFor: 'Solo exec, short city runs',
    tier: 'Executive sedan',
    image: '/fleet/c-class.jpg',
  },
  {
    n: '02',
    name: 'V-Class',
    tagline: 'Travel together, in ultimate comfort.',
    seats: 6,
    luggage: '',
    bestFor: 'VIP groups & shared travel',
    tier: 'Luxury MPV',
    image: '/fleet/v-class.jpg',
  },
  {
    n: '03',
    name: 'E-Class',
    tagline: 'Refined luxury for business and beyond.',
    seats: 3,
    luggage: '',
    bestFor: 'Corporate, meetings, VIP',
    tier: 'Executive sedan',
    image: '/fleet/e-class.jpg',
  },
  {
    n: '04',
    name: 'BMW X3',
    tagline: 'Bold presence, premium ride.',
    seats: 3,
    luggage: '',
    bestFor: 'SUV comfort, leisure & business',
    tier: 'Premium SUV',
    image: '/fleet/bmw-x3.jpg',
  },
  {
    n: '05',
    name: 'Hyundai Staria',
    tagline: 'Space that moves you.',
    seats: 8,
    luggage: 'More luggage space',
    bestFor: 'Families, teams, events',
    tier: 'Luxury van',
    image: '/fleet/staria.jpg',
  },
]

const inclusions = [
  {
    title: 'Professional chauffeur',
    desc: 'Punctual, discreet, and presentation-ready for every trip.',
  },
  {
    title: 'Flight-aware airport pickups',
    desc: 'OR Tambo & Lanseria timing with meet & greet on request.',
  },
  {
    title: 'Clear WhatsApp quotes',
    desc: 'No guesswork. Confirm price, vehicle, and driver details before you ride.',
  },
  {
    title: 'Comfort-first vehicles',
    desc: 'Premium sedans, SUV, V-Class and Staria maintained for style and safety.',
  },
]

const addOns = [
  'Child seat',
  'Meet & greet',
  'Extra waiting time',
  'Multi-stop itinerary',
  'Return trip',
  'Hourly / full-day hire',
]

const services = [
  {
    title: 'Airport Transfers',
    desc: 'OR Tambo & Lanseria: flight-aware pickups and meet & greet. Luggage confirmed per trip.',
    icon: 'plane',
  },
  {
    title: 'Hourly & Day Chauffeur',
    desc: 'Keep a dedicated driver for meetings, roadshows, shopping, or a full day on the road.',
    icon: 'car',
  },
  {
    title: 'Corporate Travel',
    desc: 'Executive transfers, staff shuttles, client collections, and multi-stop itineraries.',
    icon: 'briefcase',
  },
  {
    title: 'Outstation & Long Distance',
    desc: 'Comfortable intercity travel to Pretoria, Sun City, Kruger gateways, and beyond.',
    icon: 'pin',
  },
  {
    title: 'Events & Conferences',
    desc: 'Weddings, matric dances, concerts, and conference shuttles with punctual logistics.',
    icon: 'heart',
  },
  {
    title: 'Family & Group Tours',
    desc: 'Spacious vehicles for families, visitors, and small groups exploring Gauteng.',
    icon: 'family',
  },
]

const howItWorks = [
  {
    n: '01',
    title: 'Request a quote',
    desc: 'Send your pickup, drop-off, date, time, and vehicle preference from our form.',
  },
  {
    n: '02',
    title: 'We send your quotation',
    desc: 'We confirm availability, price, and chauffeur details on WhatsApp before you travel.',
  },
  {
    n: '03',
    title: 'Meet your chauffeur',
    desc: 'Your driver arrives on time, with meet & greet at the airport when requested.',
  },
  {
    n: '04',
    title: 'Travel in comfort',
    desc: 'Arrive relaxed. Follow up anytime on WhatsApp for the next journey.',
  },
]

const serviceAreas = [
  'Johannesburg',
  'Sandton',
  'Pretoria',
  'Midrand',
  'OR Tambo',
  'Lanseria',
  'Centurion',
  'Outstation routes',
]

const faqs = [
  {
    q: 'Do you only do airport transfers?',
    a: 'No. We also offer point-to-point transfers, hourly and full-day chauffeur hire, corporate travel, events, and long-distance / outstation trips.',
  },
  {
    q: 'Which airports do you cover?',
    a: 'We regularly serve OR Tambo and Lanseria, with meet & greet and flight-aware timing on request.',
  },
  {
    q: 'Can you move groups or conference guests?',
    a: 'Yes. Tell us passenger numbers and we’ll recommend V-Class (6), Staria (8), or a sedan/SUV (3). Luggage is confirmed separately for your trip.',
  },
  {
    q: 'How do I get a quote?',
    a: 'Use the quote form or WhatsApp us with pickup, drop-off, date, time, and passengers. We’ll reply with a clear quotation.',
  },
  {
    q: 'Do you offer child seats or extras?',
    a: 'Yes. Note child seats, meet & greet, luggage needs, extra stops, or waiting time in your quote notes and we’ll confirm availability.',
  },
  {
    q: 'Can companies get invoices / accounts?',
    a: 'Yes. For corporate and repeat travel, WhatsApp or email us and we’ll set up clear quotations and invoicing.',
  },
]

const trustPoints = [
  { label: 'SPACIOUS & COMFORTABLE', icon: 'car' },
  { label: 'SAFE & RELIABLE', icon: 'shield' },
  { label: 'EXPERIENCED DRIVERS', icon: 'user' },
  { label: 'OUTSTATION SPECIALISTS', icon: 'map' },
]

function waUrl(text: string) {
  return `https://wa.me/${WHATSAPP_PRIMARY}?text=${encodeURIComponent(text)}`
}

function scrollTo(id: string) {
  mobileOpen.value = false
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function formatPickupDate(iso: string) {
  if (!iso) return 'Not set'
  const d = new Date(`${iso}T12:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-ZA', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatPickupTime(t: string) {
  if (!t) return 'Not set'
  const [h, m] = t.split(':').map(Number)
  if (Number.isNaN(h) || Number.isNaN(m)) return t
  const d = new Date()
  d.setHours(h, m, 0, 0)
  return d.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })
}

/**
 * WhatsApp prefill is plain text only (no logo / brand colors).
 * Avoid emojis / fancy unicode; some devices show them as � in wa.me links.
 */
function buildBookingMessage() {
  const lines = [
    '*VSM TOURS*',
    '_Private chauffeurs - Gauteng and beyond_',
    '------------------------------',
    '*NEW QUOTE REQUEST*',
    '------------------------------',
    '',
    `*Name:* ${form.name.trim() || 'Not provided'}`,
    `*Service:* ${form.service}`,
    `*Vehicle:* ${form.vehicle}`,
    `*Passengers:* ${form.passengers}`,
    '',
    `*Pickup:* ${form.pickup.trim() || 'Not provided'}`,
    `*Drop-off:* ${form.dropoff.trim() || 'Not provided'}`,
    `*Date:* ${formatPickupDate(form.date)}`,
    `*Time:* ${formatPickupTime(form.time)}`,
  ]
  if (form.notes.trim()) {
    lines.push('', `*Notes:* ${form.notes.trim()}`)
  }
  lines.push(
    '',
    '------------------------------',
    '_Your journey - Our priority_',
    'Please confirm availability. Thank you!',
  )
  return lines.join('\n')
}

function submitBooking(e: Event) {
  e.preventDefault()
  if (!form.name.trim() || !form.pickup.trim() || !form.dropoff.trim()) {
    alert('Please fill in your name, pickup, and drop-off so we can help you faster.')
    return
  }
  window.open(waUrl(buildBookingMessage()), '_blank', 'noopener,noreferrer')
}

function openWhatsAppChat() {
  window.open(
    waUrl(
      [
        '*VSM TOURS*',
        '_Private chauffeurs - Gauteng and beyond_',
        '------------------------------',
        "Hi - I'd like to chat about a ride.",
        '',
        '_Your journey - Our priority_',
      ].join('\n'),
    ),
    '_blank',
    'noopener,noreferrer',
  )
}

function bookVehicle(vehicleName: string) {
  form.vehicle = vehicleName
  scrollTo('book')
}

</script>

<template>
  <div class="min-h-dvh bg-navy-900 font-sans text-cream antialiased">
    <NuxtRouteAnnouncer />
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:text-navy-900"
    >
      Skip to main content
    </a>

    <header
      class="sticky top-0 z-50 border-b border-navy-700 bg-navy-900/90 backdrop-blur-sm supports-[backdrop-filter]:bg-navy-900/85"
    >
      <div
        class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:py-4"
      >
        <a
          href="#"
          class="group flex shrink-0 items-center gap-3 transition-opacity hover:opacity-90"
          aria-label="VSM Tours home"
          @click.prevent="scrollTo('main')"
        >
          <img
            src="/logo-light.png"
            alt="VSM Tours"
            width="428"
            height="322"
            decoding="async"
            class="h-14 w-auto max-w-[9.5rem] object-contain object-left sm:h-16 sm:max-w-[11rem] md:h-[4.5rem] md:max-w-[12.5rem]"
          />
          <span class="font-serif text-lg font-semibold tracking-wide text-cream sm:text-xl">
            VSM Tours
          </span>
        </a>

        <nav
          class="hidden items-center gap-7 text-sm font-medium text-cream md:flex"
        >
          <button type="button" class="transition hover:text-gold" @click="scrollTo('services')">
            Services
          </button>
          <button type="button" class="transition hover:text-gold" @click="scrollTo('book')">
            Quote
          </button>
          <button type="button" class="transition hover:text-gold" @click="scrollTo('fleet')">
            Fleet
          </button>
          <button type="button" class="transition hover:text-gold" @click="scrollTo('contact')">
            Contact
          </button>
        </nav>

        <div class="flex items-center gap-3 sm:gap-4">
          <a
            :href="`https://wa.me/${WHATSAPP_PRIMARY}`"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden items-center gap-2 font-mono text-xs tracking-tight text-cream/80 transition hover:text-gold md:inline-flex"
            :aria-label="`WhatsApp ${WHATSAPP_DISPLAY}`"
          >
            <svg
              class="h-3.5 w-3.5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
              />
            </svg>
            {{ WHATSAPP_DISPLAY }}
          </a>
          <button
            type="button"
            class="hidden rounded-full bg-gold px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-navy-900 transition hover:bg-gold-light md:inline-block"
            @click="scrollTo('book')"
          >
            Request a quote
          </button>
          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-navy-700 text-cream md:hidden"
            aria-label="Open menu"
            @click="mobileOpen = !mobileOpen"
          >
            <svg
              v-if="!mobileOpen"
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-else
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        v-show="mobileOpen"
        class="border-t border-navy-700 bg-navy-850 px-4 py-4 md:hidden"
      >
        <div class="flex flex-col gap-3 text-sm font-medium">
          <a
            :href="`https://wa.me/${WHATSAPP_PRIMARY}`"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 py-1 text-left text-cream transition hover:text-gold"
          >
            <svg
              class="h-4 w-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.75"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            {{ WHATSAPP_DISPLAY }}
          </a>
          <button class="py-1 text-left text-cream transition hover:text-gold" @click="scrollTo('services')">
            Services
          </button>
          <button class="py-1 text-left text-cream transition hover:text-gold" @click="scrollTo('book')">
            Quote
          </button>
          <button class="py-1 text-left text-cream transition hover:text-gold" @click="scrollTo('fleet')">
            Fleet
          </button>
          <button class="py-1 text-left text-cream transition hover:text-gold" @click="scrollTo('contact')">
            Contact
          </button>
          <button
            class="mt-2 rounded-full bg-gold py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-navy-900 transition hover:bg-gold-light"
            @click="scrollTo('book')"
          >
            Request a quote
          </button>
        </div>
      </div>
    </header>

    <main id="main">
      <!-- Hero -->
      <section
        class="relative isolate min-h-[72vh] overflow-hidden bg-navy-950 bg-[url('/hero1.png')] bg-cover bg-[center_48%] bg-no-repeat md:min-h-[78vh] md:bg-[center_56%]"
      >
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-950/35 to-navy-950/10"
          aria-hidden="true"
        />
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-navy-950/20"
          aria-hidden="true"
        />
        <div
          class="pointer-events-none absolute inset-x-0 bottom-0 h-[min(42vh,22rem)] bg-gradient-to-t from-navy-950 via-navy-950/80 to-transparent"
          aria-hidden="true"
        />

        <div
          class="relative z-10 mx-auto flex max-w-6xl flex-col justify-end gap-5 px-4 pb-16 pt-24 md:min-h-[78vh] md:justify-end md:gap-6 md:pb-24 md:pt-28"
        >
          <p class="text-xs font-semibold uppercase tracking-[0.28em] text-cream/80 md:text-sm">
            Comfort · Style · Memories
          </p>
          <div class="max-w-2xl space-y-1">
            <h1
              class="font-serif text-4xl font-semibold leading-tight tracking-tight text-cream md:text-5xl lg:text-6xl"
            >
              Private chauffeurs.
            </h1>
            <p
              class="font-serif text-4xl italic leading-tight text-cream md:text-5xl lg:text-6xl"
            >
              Across Gauteng <span class="text-gold">&amp; beyond.</span>
            </p>
          </div>
          <p
            class="max-w-xl rounded-lg bg-[rgba(1,11,58,0.92)] px-3 py-2.5 text-base leading-relaxed text-cream md:px-4 md:py-3 md:text-lg"
          >
            Airport transfers, corporate travel, weddings and outstation trips. Request a quotation on WhatsApp.
          </p>
          <div class="flex flex-wrap items-center gap-4">
            <button
              type="button"
              class="rounded-lg bg-gold px-5 py-3 text-sm font-semibold text-navy-900 shadow-lg shadow-[0_10px_28px_rgba(1,11,58,0.45)] transition hover:bg-gold-light md:px-6 md:py-3.5 md:text-base"
              @click="scrollTo('book')"
            >
              Request a quote
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-lg border border-cream/40 bg-navy-950/40 px-4 py-3 text-sm font-medium text-cream backdrop-blur-sm transition hover:border-gold hover:text-gold md:px-5 md:text-base"
              @click="openWhatsAppChat"
            >
              <svg
                class="h-5 w-5 shrink-0 text-whatsapp"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                />
              </svg>
              WhatsApp us
            </button>
          </div>

          <div
            class="mt-5 flex max-w-4xl flex-wrap items-center gap-x-6 gap-y-3 border-t border-cream/25 pt-6 md:mt-6 md:gap-x-8"
          >
            <div
              v-for="(t, i) in trustPoints"
              :key="i"
              class="flex shrink-0 items-center gap-2"
            >
              <span class="shrink-0 text-gold" aria-hidden="true">
                <svg
                  v-if="t.icon === 'car'"
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M8 17h8M5 11l1.5-4h11L19 11m-14 0h14v4a1 1 0 01-1 1H6a1 1 0 01-1-1v-4z"
                  />
                </svg>
                <svg
                  v-else-if="t.icon === 'shield'"
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                  />
                </svg>
                <svg
                  v-else-if="t.icon === 'user'"
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <svg
                  v-else
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
              <span
                class="whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-wide text-cream sm:text-xs"
                >{{ t.label }}</span
              >
            </div>
          </div>
        </div>
      </section>

      <!-- Why VSM -->
      <section id="why" class="scroll-mt-24 bg-navy-950 py-16 md:py-24">
        <div class="mx-auto max-w-6xl px-4">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Why VSM Tours
          </p>
          <h2
            class="mt-4 max-w-3xl font-serif text-3xl font-semibold text-cream md:text-4xl lg:text-5xl"
          >
            The details competitors advertise,
            <span class="italic text-gold">delivered on every ride.</span>
          </h2>
          <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <article
              v-for="item in inclusions"
              :key="item.title"
              class="border-t border-gold/35 pt-6"
            >
              <h3 class="font-serif text-xl font-semibold text-cream">{{ item.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-cream/85">{{ item.desc }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- Fleet -->
      <section id="fleet" class="scroll-mt-24 bg-navy-900 py-16 md:py-24">
        <div class="mx-auto max-w-6xl px-4">
          <div
            class="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between"
          >
            <div class="max-w-xl space-y-4">
              <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                Our Fleet
              </p>
              <h2
                class="font-serif text-3xl font-semibold text-cream md:text-4xl lg:text-5xl"
              >
                Five premium vehicles.
                <span class="block font-serif italic text-gold">Endless journeys.</span>
              </h2>
            </div>
            <p class="max-w-md text-sm leading-relaxed text-cream/85 md:text-right">
              Choose by seats and journey type. Luggage needs are confirmed with you separately.
            </p>
          </div>

          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="car in fleet"
              :key="car.n"
              class="group flex flex-col overflow-hidden rounded-xl border border-navy-700 bg-navy-850 transition hover:border-gold/30"
            >
              <div class="relative aspect-[16/10] overflow-hidden bg-navy-950">
                <img
                  :src="car.image"
                  :alt="car.name"
                  class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span
                  class="absolute left-3 top-3 rounded bg-navy-950/80 px-2 py-1 text-xs font-medium text-cream"
                >
                  {{ car.n }}
                </span>
              </div>
              <div class="flex flex-1 flex-col p-5">
                <div class="flex items-start justify-between gap-3">
                  <h3 class="font-serif text-2xl font-semibold text-cream">
                    {{ car.name }}
                  </h3>
                  <span class="text-[10px] font-semibold uppercase tracking-wider text-cream/70">
                    {{ car.tier }}
                  </span>
                </div>
                <p class="mt-2 text-sm text-cream/85">{{ car.tagline }}</p>
                <p class="mt-2 text-xs text-cream/70">{{ car.bestFor }}</p>
                <div
                  class="mt-5 flex items-center justify-between gap-3 border-t border-navy-700 pt-4"
                >
                  <div class="min-w-0 text-sm text-cream">
                    <p class="font-medium">{{ car.seats }} seats</p>
                    <p v-if="car.luggage" class="truncate text-xs text-cream/80">
                      {{ car.luggage }}
                    </p>
                  </div>
                  <button
                    type="button"
                    class="shrink-0 rounded-md bg-gold px-3 py-2 text-sm font-semibold text-navy-900 transition hover:bg-gold-light"
                    @click="bookVehicle(car.name)"
                  >
                    Quote
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- Services -->
      <section id="services" class="scroll-mt-24 bg-navy-950 py-16 md:py-24">
        <div class="mx-auto max-w-6xl px-4 text-center">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Perfect for
          </p>
          <h2
            class="mx-auto mt-4 max-w-3xl font-serif text-3xl font-semibold text-cream md:text-4xl lg:text-5xl"
          >
            Whatever the journey,
            <span class="block font-serif italic text-gold">we make it memorable.</span>
          </h2>

          <div
            class="mt-14 grid gap-px overflow-hidden rounded-2xl border border-navy-700 bg-navy-700 sm:grid-cols-2 lg:grid-cols-3"
          >
            <div
              v-for="svc in services"
              :key="svc.title"
              class="bg-navy-850 p-8 text-left"
            >
              <div class="mb-4 text-gold" aria-hidden="true">
                <svg
                  v-if="svc.icon === 'plane'"
                  class="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                <svg
                  v-else-if="svc.icon === 'pin'"
                  class="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <svg
                  v-else-if="svc.icon === 'family'"
                  class="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <svg
                  v-else-if="svc.icon === 'briefcase'"
                  class="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <svg
                  v-else-if="svc.icon === 'heart'"
                  class="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <svg
                  v-else
                  class="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M8 17h8M6 10h12l-1.5-5h-9L6 10zm0 0L4 19h16l-2-9H6z"
                  />
                </svg>
              </div>
              <h3 class="font-serif text-xl font-semibold text-cream">{{ svc.title }}</h3>
              <p class="mt-2 text-sm text-cream/85">{{ svc.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Airport spotlight -->
      <section id="airport" class="scroll-mt-24 bg-navy-900 py-16 md:py-20">
        <div class="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-center">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Airport transfers
            </p>
            <h2 class="mt-4 font-serif text-3xl font-semibold text-cream md:text-4xl">
              OR Tambo &amp; Lanseria,
              <span class="italic text-gold">done properly.</span>
            </h2>
            <p class="mt-4 text-sm leading-relaxed text-cream/90 md:text-base">
              Flight-aware timing, optional meet &amp; greet, and a confirmed chauffeur.
              Luggage needs are discussed with you for each trip.
            </p>
            <ul class="mt-6 space-y-2 text-sm text-cream">
              <li class="flex gap-2"><span class="text-gold">✓</span> Named passenger pickup</li>
              <li class="flex gap-2"><span class="text-gold">✓</span> Meet &amp; greet on request</li>
              <li class="flex gap-2"><span class="text-gold">✓</span> Vehicle matched to your passengers</li>
            </ul>
            <button
              type="button"
              class="mt-8 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy-900 transition hover:bg-gold-light"
              @click="scrollTo('book')"
            >
              Quote airport transfer
            </button>
          </div>
          <div class="rounded-2xl border border-navy-700 bg-navy-850 p-8">
            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Popular routes
            </p>
            <ul class="mt-5 space-y-4 text-sm text-cream/85">
              <li class="flex justify-between gap-4 border-b border-navy-700 pb-3">
                <span>OR Tambo → Sandton</span>
                <span class="text-cream">Quote on WhatsApp</span>
              </li>
              <li class="flex justify-between gap-4 border-b border-navy-700 pb-3">
                <span>OR Tambo → Pretoria</span>
                <span class="text-cream">Quote on WhatsApp</span>
              </li>
              <li class="flex justify-between gap-4 border-b border-navy-700 pb-3">
                <span>Lanseria → Sandton / Midrand</span>
                <span class="text-cream">Quote on WhatsApp</span>
              </li>
              <li class="flex justify-between gap-4">
                <span>Hotel ↔ Airport return</span>
                <span class="text-cream">Ask for return rate</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Simple quote CTA (no second vehicle list) -->
      <section id="rates" class="scroll-mt-24 bg-navy-950 py-14 md:py-20">
        <div class="mx-auto max-w-3xl px-4 text-center">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-cream/70">
            Clear quotes
          </p>
          <h2 class="mt-3 font-serif text-3xl font-semibold text-cream md:text-4xl">
            One form. Fast WhatsApp reply.
          </h2>
          <p class="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-cream/85 md:text-base">
            Choose a vehicle in Fleet, then send pickup, drop-off, date and passengers.
            We confirm price before you ride. Luggage and add-ons are discussed in your notes.
          </p>
          <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              class="rounded-lg bg-gold px-6 py-3.5 text-sm font-semibold text-navy-900 transition hover:bg-gold-light"
              @click="scrollTo('book')"
            >
              Request a quote
            </button>
            <button
              type="button"
              class="rounded-lg border border-cream/35 px-6 py-3.5 text-sm font-semibold text-cream transition hover:border-gold hover:text-gold"
              @click="openWhatsAppChat"
            >
              <span class="inline-flex items-center gap-2">
                <svg
                  class="h-4 w-4 shrink-0 text-whatsapp"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                  />
                </svg>
                WhatsApp a quote
              </span>
            </button>
          </div>
          <ul class="mt-8 flex flex-wrap justify-center gap-2">
            <li
              v-for="extra in addOns"
              :key="extra"
              class="rounded-full border border-navy-700 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-cream/80"
            >
              {{ extra }}
            </li>
          </ul>
        </div>
      </section>

      <!-- How it works -->
      <section id="how" class="scroll-mt-24 bg-navy-900 py-16 md:py-24">
        <div class="mx-auto max-w-6xl px-4">
          <p class="text-center text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            How it works
          </p>
          <h2
            class="mx-auto mt-4 max-w-2xl text-center font-serif text-3xl font-semibold text-cream md:text-4xl"
          >
            Four clear steps to your quotation.
          </h2>
          <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div
              v-for="step in howItWorks"
              :key="step.n"
              class="border-t border-gold/40 pt-6"
            >
              <p class="text-sm font-medium text-gold">{{ step.n }}</p>
              <h3 class="mt-2 font-serif text-xl font-semibold text-cream">
                {{ step.title }}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-cream/85">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Coverage -->
      <section id="areas" class="scroll-mt-24 bg-navy-950 py-16 md:py-20">
        <div class="mx-auto max-w-6xl px-4 text-center">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Where we drive
          </p>
          <h2
            class="mx-auto mt-4 max-w-2xl font-serif text-3xl font-semibold text-cream md:text-4xl"
          >
            Gauteng coverage,
            <span class="italic text-gold">and beyond.</span>
          </h2>
          <p class="mx-auto mt-3 max-w-xl text-sm text-cream/85">
            Airport, city, corporate, and outstation routes across Gauteng and beyond.
          </p>
          <ul
            class="mt-10 flex flex-wrap justify-center gap-3"
          >
            <li
              v-for="area in serviceAreas"
              :key="area"
              class="rounded-full border border-navy-700 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cream"
            >
              {{ area }}
            </li>
          </ul>
        </div>
      </section>

      <!-- FAQ -->
      <section id="faq" class="scroll-mt-24 bg-navy-900 py-16 md:py-24">
        <div class="mx-auto max-w-6xl px-4">
          <p class="text-center text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            FAQ
          </p>
          <h2
            class="mt-4 text-center font-serif text-3xl font-semibold text-cream md:text-4xl"
          >
            Common questions.
          </h2>
          <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <details
              v-for="item in faqs"
              :key="item.q"
              class="group rounded-xl border border-navy-700 bg-navy-850 px-5 py-4"
            >
              <summary
                class="cursor-pointer list-none font-serif text-base font-semibold text-cream marker:content-none md:text-lg [&::-webkit-details-marker]:hidden"
              >
                <span class="flex items-start justify-between gap-3">
                  {{ item.q }}
                  <span class="shrink-0 text-gold transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p class="mt-3 text-sm leading-relaxed text-cream/85">{{ item.a }}</p>
            </details>
          </div>
        </div>
      </section>

      <!-- Book -->
      <section id="book" class="scroll-mt-24 bg-navy-900 py-16 md:py-24">
        <div class="mx-auto max-w-3xl px-4">
          <p class="text-center text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Request a quotation
          </p>
          <h2
            class="mt-3 text-center font-serif text-3xl font-semibold text-cream md:text-4xl"
          >
            Get your <span class="italic text-gold">quote in seconds.</span>
          </h2>
          <p class="mt-3 text-center text-sm text-cream/85">
            Fill in pickup, drop-off, date and passengers. We receive your request on WhatsApp and
            reply with a quotation.
          </p>

          <form
            class="mt-10 space-y-4 rounded-2xl border border-navy-700 bg-navy-850 p-6 md:p-8"
            @submit="submitBooking"
          >
            <div class="grid gap-4 sm:grid-cols-2">
              <label class="block">
                <span class="sr-only">Full name</span>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Full name"
                  class="w-full rounded-lg border border-navy-700 bg-navy-950 px-4 py-3 text-sm text-cream placeholder:text-beige/45 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/35"
                />
              </label>
              <label class="block">
                <span class="sr-only">Service type</span>
                <select
                  v-model="form.service"
                  class="w-full rounded-lg border border-navy-700 bg-navy-950 px-4 py-3 text-sm text-cream focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/35"
                >
                  <option v-for="s in serviceTypes" :key="s" :value="s">{{ s }}</option>
                </select>
              </label>
              <label class="block">
                <span class="sr-only">Vehicle</span>
                <select
                  v-model="form.vehicle"
                  class="w-full rounded-lg border border-navy-700 bg-navy-950 px-4 py-3 text-sm text-cream focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/35"
                >
                  <option v-for="v in vehicles" :key="v" :value="v">{{ v }}</option>
                </select>
              </label>
              <label class="block">
                <span class="sr-only">Passengers</span>
                <input
                  v-model="form.passengers"
                  type="number"
                  min="1"
                  max="8"
                  placeholder="Passengers"
                  class="w-full rounded-lg border border-navy-700 bg-navy-950 px-4 py-3 text-sm text-cream placeholder:text-beige/45 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/35"
                />
              </label>
              <label class="block">
                <span class="sr-only">Pickup</span>
                <input
                  v-model="form.pickup"
                  type="text"
                  required
                  placeholder="Pickup location"
                  class="w-full rounded-lg border border-navy-700 bg-navy-950 px-4 py-3 text-sm text-cream placeholder:text-beige/45 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/35"
                />
              </label>
              <label class="block">
                <span class="sr-only">Drop-off</span>
                <input
                  v-model="form.dropoff"
                  type="text"
                  required
                  placeholder="Drop-off location"
                  class="w-full rounded-lg border border-navy-700 bg-navy-950 px-4 py-3 text-sm text-cream placeholder:text-beige/45 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/35"
                />
              </label>
              <label class="block">
                <span class="mb-1.5 block text-xs font-medium text-cream/80">Pickup date</span>
                <input
                  v-model="form.date"
                  type="date"
                  required
                  :min="minPickupDate"
                  class="booking-datetime w-full cursor-pointer rounded-lg border border-navy-700 bg-navy-950 px-4 py-3 text-sm text-cream focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/35"
                  @click="openPicker"
                />
              </label>
              <label class="block">
                <span class="mb-1.5 block text-xs font-medium text-cream/80">Pickup time</span>
                <input
                  v-model="form.time"
                  type="time"
                  required
                  step="300"
                  class="booking-datetime w-full cursor-pointer rounded-lg border border-navy-700 bg-navy-950 px-4 py-3 text-sm text-cream focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/35"
                  @click="openPicker"
                />
              </label>
            </div>
            <label class="block">
              <span class="sr-only">Notes</span>
              <textarea
                v-model="form.notes"
                rows="3"
                placeholder="Notes (luggage details, meet & greet, child seat, extra stops…)"
                class="w-full rounded-lg border border-navy-700 bg-navy-950 px-4 py-3 text-sm text-cream placeholder:text-beige/45 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/35"
              />
            </label>
            <button
              type="submit"
              class="w-full rounded-lg bg-gold py-3.5 text-sm font-semibold text-navy-900 shadow-lg shadow-[0_12px_32px_rgba(1,11,58,0.45)] transition hover:bg-gold-light"
            >
              Send quote request on WhatsApp
            </button>
          </form>
        </div>
      </section>

      <!-- Contact CTA - Base44 layout, VSM navy design + our copy -->
      <section id="contact" class="scroll-mt-24 border-t border-navy-700 bg-navy-900">
        <div
          class="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-20"
        >
          <div>
            <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">Contact us</p>
            <h2
              class="mt-4 max-w-xl font-serif text-3xl font-semibold leading-tight tracking-tight text-cream sm:text-4xl"
            >
              Your journey. Our priority.
            </h2>
          </div>
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              class="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 text-xs font-medium uppercase tracking-[0.14em] text-navy-900 transition-colors hover:bg-gold-light"
              @click="scrollTo('book')"
            >
              Request a quote
              <svg
                class="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 5 7 7-7 7" />
              </svg>
            </button>
            <a
              :href="`https://wa.me/${WHATSAPP_PRIMARY}`"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-6 py-4 text-xs font-medium uppercase tracking-[0.14em] text-cream transition-colors hover:border-gold hover:text-gold"
            >
              <svg
                class="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                />
              </svg>
              {{ WHATSAPP_DISPLAY }}
            </a>
          </div>
        </div>
      </section>

      <!-- Footer - Base44 layout, VSM navy design + our details -->
      <footer class="border-t border-navy-700 bg-navy-950 text-cream">
        <div class="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-16">
          <div class="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <div class="flex items-center gap-3">
                <img
                  src="/logo-light.png"
                  alt="VSM Tours"
                  width="428"
                  height="322"
                  decoding="async"
                  class="h-12 w-auto object-contain object-left"
                />
                <span class="font-serif text-base font-semibold tracking-tight text-cream"
                  >VSM Tours</span
                >
              </div>
              <p class="mt-5 max-w-sm text-sm leading-relaxed text-cream/60">
                Private chauffeurs across Gauteng and beyond: airport transfers, corporate travel,
                weddings and outstation trips. Request a quotation on WhatsApp.
              </p>
              <button
                type="button"
                class="mt-7 inline-flex items-center gap-2 rounded-full border border-cream/30 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-cream transition-colors hover:border-gold hover:text-gold"
                @click="scrollTo('book')"
              >
                Request a quote
                <svg
                  class="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m12 5 7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div>
              <h3 class="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Navigate</h3>
              <ul class="mt-5 space-y-3">
                <li>
                  <button
                    type="button"
                    class="text-sm text-cream/70 transition-colors hover:text-cream"
                    @click="scrollTo('services')"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    class="text-sm text-cream/70 transition-colors hover:text-cream"
                    @click="scrollTo('book')"
                  >
                    Quote
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    class="text-sm text-cream/70 transition-colors hover:text-cream"
                    @click="scrollTo('fleet')"
                  >
                    Fleet
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    class="text-sm text-cream/70 transition-colors hover:text-cream"
                    @click="scrollTo('contact')"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Quotes</h3>
              <ul class="mt-5 space-y-4 text-sm text-cream/70">
                <li class="flex items-start gap-3">
                  <svg
                    class="mt-0.5 h-4 w-4 shrink-0 text-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                    />
                  </svg>
                  <a
                    :href="`https://wa.me/${WHATSAPP_PRIMARY}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="transition-colors hover:text-cream"
                    >{{ WHATSAPP_DISPLAY }}</a
                  >
                </li>
                <li class="flex items-start gap-3">
                  <svg
                    class="mt-0.5 h-4 w-4 shrink-0 text-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" stroke-width="2" />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
                    />
                  </svg>
                  <a :href="`mailto:${EMAIL}`" class="transition-colors hover:text-cream">{{
                    EMAIL_DISPLAY
                  }}</a>
                </li>
                <li class="flex items-start gap-3">
                  <svg
                    class="mt-0.5 h-4 w-4 shrink-0 text-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
                    />
                    <circle cx="12" cy="10" r="3" stroke-width="2" />
                  </svg>
                  <span>Johannesburg, Gauteng</span>
                </li>
              </ul>
              <p class="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-cream/45">
                WhatsApp quotations 24/7
              </p>
            </div>
          </div>

          <div
            class="mt-12 flex flex-col gap-3 border-t border-navy-700 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between"
          >
            <p>
              © {{ new Date().getFullYear() }} VSM Tours Private Chauffeur Services. All rights
              reserved. · Developed by
              <span class="text-gold">Kaybee Debug Solutions</span>
            </p>
            <p class="font-mono uppercase tracking-[0.14em]">
              OR Tambo · Lanseria · Johannesburg · Pretoria
            </p>
          </div>
        </div>
      </footer>
    </main>

    <!-- WhatsApp chat FAB - high contrast + above header -->
    <a
      :href="`https://wa.me/${WHATSAPP_PRIMARY}`"
      target="_blank"
      rel="noopener noreferrer"
      class="fixed bottom-5 right-5 z-[100] flex h-12 w-12 items-center justify-center rounded-full bg-whatsapp text-cream shadow-[0_8px_24px_rgba(37,211,102,0.45)] ring-2 ring-white/80 transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold md:bottom-7 md:right-7 md:h-14 md:w-14"
      aria-label="Chat on WhatsApp"
    >
      <svg class="h-6 w-6 md:h-7 md:w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
        />
      </svg>
    </a>
  </div>
</template>

<style>
/* Native selects / autofill - match Tailwind navy-950 + cream (design tokens) */
select option,
select optgroup {
  background-color: var(--navy-deep);
  color: var(--foreground);
}
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  -webkit-text-fill-color: var(--foreground) !important;
  caret-color: var(--foreground);
  box-shadow: 0 0 0 1000px var(--navy-deep) inset !important;
}

/* Date / time: visible calendar & clock controls on dark theme */
.booking-datetime {
  color-scheme: dark;
}
.booking-datetime::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 1;
  filter: invert(0.85) sepia(0.4) saturate(4) hue-rotate(5deg);
  width: 1.15rem;
  height: 1.15rem;
}
</style>
