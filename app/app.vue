<script setup lang="ts">
const WHATSAPP_PRIMARY = '27605457885'
const WHATSAPP_DISPLAY = '+27 60 545 7885'
const EMAIL = 'victormolepl@gmail.com'

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
    seats: 4,
    luggage: '2–3 bags',
    bestFor: 'Solo exec, short city runs',
    tier: 'Executive sedan',
  },
  {
    n: '02',
    name: 'V-Class',
    tagline: 'Travel together, in ultimate comfort.',
    seats: 6,
    luggage: 'Flexible / group luggage',
    bestFor: 'VIP groups, airport with bags',
    tier: 'Luxury MPV',
  },
  {
    n: '03',
    name: 'E-Class',
    tagline: 'Refined luxury for business and beyond.',
    seats: 4,
    luggage: '2–3 bags',
    bestFor: 'Corporate, meetings, VIP',
    tier: 'Executive sedan',
  },
  {
    n: '04',
    name: 'BMW X3',
    tagline: 'Bold presence, premium ride.',
    seats: 5,
    luggage: 'Generous boot space',
    bestFor: 'SUV comfort, leisure & business',
    tier: 'Premium SUV',
  },
  {
    n: '05',
    name: 'Hyundai Staria',
    tagline: 'Space that moves you.',
    seats: 7,
    luggage: 'High capacity',
    bestFor: 'Families, teams, events',
    tier: 'Luxury van',
  },
]

const inclusions = [
  {
    title: 'Professional chauffeur',
    desc: 'Punctual, discreet, and presentation-ready for every booking.',
  },
  {
    title: 'Flight-aware airport pickups',
    desc: 'OR Tambo & Lanseria timing with meet & greet on request.',
  },
  {
    title: 'Clear WhatsApp quotes',
    desc: 'No guesswork — confirm price, vehicle, and driver details before you ride.',
  },
  {
    title: 'Comfort-first vehicles',
    desc: 'Premium sedans, SUV, V-Class and Staria maintained for style and safety.',
  },
]

const quoteTiers = [
  {
    name: 'C-Class',
    examples: 'Executive sedan',
    best: '1–3 passengers · airport & meetings',
  },
  {
    name: 'E-Class',
    examples: 'Executive sedan',
    best: '1–3 passengers · corporate & VIP',
  },
  {
    name: 'BMW X3',
    examples: 'Premium SUV',
    best: '1–4 passengers · comfort with luggage',
  },
  {
    name: 'V-Class',
    examples: 'Luxury MPV',
    best: 'Up to 6 · VIP groups & airport with bags',
  },
  {
    name: 'Hyundai Staria',
    examples: 'Luxury van',
    best: 'Up to 7 · families, teams & events',
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
    desc: 'OR Tambo & Lanseria — flight-aware pickups, meet & greet, and luggage assistance.',
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
    desc: 'Comfortable intercity travel — Pretoria, Sun City, Kruger gateways, and beyond.',
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
    title: 'Book on WhatsApp',
    desc: 'Send your pickup, drop-off, date, time, and vehicle preference from our form.',
  },
  {
    n: '02',
    title: 'We confirm details',
    desc: 'We confirm availability, price, and chauffeur details before your trip.',
  },
  {
    n: '03',
    title: 'Meet your chauffeur',
    desc: 'Your driver arrives on time — meet & greet at the airport when requested.',
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
    a: 'Yes. Tell us passenger numbers and luggage — we’ll recommend V-Class, Staria, or a suitable plan for your schedule.',
  },
  {
    q: 'How do I get a quote?',
    a: 'Use the booking form or WhatsApp us with pickup, drop-off, date, time, and passengers. We’ll reply with a clear quote.',
  },
  {
    q: 'Do you offer child seats or extras?',
    a: 'Yes — note child seats, meet & greet, extra stops, or waiting time in your booking notes and we’ll confirm availability.',
  },
  {
    q: 'Can companies get invoices / accounts?',
    a: 'Yes. For corporate and repeat travel, WhatsApp or email us and we’ll set up clear confirmations and invoicing.',
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
 * Avoid emojis / fancy unicode — some devices show them as � in wa.me links.
 */
function buildBookingMessage() {
  const lines = [
    '*VSM TOURS*',
    '_Premium Fleet - Premium Experience_',
    '------------------------------',
    '*NEW BOOKING REQUEST*',
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
        '_Premium Fleet - Premium Experience_',
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

function requestQuote(tierName?: string) {
  const lines = [
    '*VSM TOURS*',
    '_Premium Fleet - Premium Experience_',
    '------------------------------',
    '*QUOTE REQUEST*',
    '------------------------------',
    '',
    tierName ? `*Category:* ${tierName}` : '*Category:* Please advise',
    '',
    'Please quote for my trip. I will share pickup, drop-off, date and passengers.',
    '',
    '_Your journey - Our priority_',
  ]
  window.open(waUrl(lines.join('\n')), '_blank', 'noopener,noreferrer')
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
          class="group flex shrink-0 items-center transition-opacity hover:opacity-90"
          aria-label="VSM Tours — home"
          @click.prevent="scrollTo('main')"
        >
          <img
            src="/logo.png"
            alt=""
            width="1024"
            height="682"
            decoding="async"
            class="h-14 w-auto max-w-[min(85vw,20rem)] object-contain object-left sm:h-16 sm:max-w-[22rem] md:h-[4.25rem] md:max-w-[26rem]"
          />
        </a>

        <nav
          class="hidden items-center gap-5 text-sm font-medium text-cream/90 lg:flex xl:gap-7"
        >
          <button type="button" class="transition hover:text-gold" @click="scrollTo('why')">
            Why VSM
          </button>
          <button type="button" class="transition hover:text-gold" @click="scrollTo('fleet')">
            Fleet
          </button>
          <button type="button" class="transition hover:text-gold" @click="scrollTo('services')">
            Services
          </button>
          <button type="button" class="transition hover:text-gold" @click="scrollTo('rates')">
            Quotes
          </button>
          <button type="button" class="transition hover:text-gold" @click="scrollTo('how')">
            How it works
          </button>
          <button type="button" class="transition hover:text-gold" @click="scrollTo('book')">
            Book
          </button>
          <button type="button" class="transition hover:text-gold" @click="scrollTo('contact')">
            Contact
          </button>
        </nav>

        <div class="flex items-center gap-2">
          <button
            type="button"
            class="hidden rounded-full bg-gold px-4 py-2 text-sm font-semibold text-navy-900 shadow-lg shadow-gold/10 transition hover:bg-gold-light md:inline-block"
            @click="scrollTo('book')"
          >
            Book a Ride
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
          <button class="py-1 text-left text-cream transition hover:text-gold" @click="scrollTo('why')">
            Why VSM
          </button>
          <button class="py-1 text-left text-cream transition hover:text-gold" @click="scrollTo('fleet')">
            Fleet
          </button>
          <button class="py-1 text-left text-cream transition hover:text-gold" @click="scrollTo('services')">
            Services
          </button>
          <button class="py-1 text-left text-cream transition hover:text-gold" @click="scrollTo('rates')">
            Quotes
          </button>
          <button class="py-1 text-left text-cream transition hover:text-gold" @click="scrollTo('how')">
            How it works
          </button>
          <button class="py-1 text-left text-cream transition hover:text-gold" @click="scrollTo('book')">
            Book
          </button>
          <button class="py-1 text-left text-cream transition hover:text-gold" @click="scrollTo('contact')">
            Contact
          </button>
          <button
            class="mt-2 rounded-full bg-gold py-2.5 font-semibold text-navy-900 transition hover:bg-gold-light"
            @click="scrollTo('book')"
          >
            Book a Ride
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
          class="relative z-10 mx-auto flex max-w-6xl flex-col justify-end gap-4 px-4 pb-16 pt-24 md:min-h-[78vh] md:justify-end md:gap-5 md:pb-24 md:pt-28"
        >
          <p class="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold md:text-xs">
            Comfort · Style · Memories
          </p>
          <div class="max-w-xl space-y-0.5">
            <h1
              class="font-serif text-3xl font-semibold leading-tight tracking-tight text-cream md:text-4xl lg:text-[2.75rem]"
            >
              Premium Fleet.
            </h1>
            <p
              class="font-serif text-3xl italic leading-tight text-gold md:text-4xl lg:text-[2.75rem]"
            >
              Premium Experience.
            </p>
          </div>
          <p class="max-w-md text-xs leading-relaxed text-cream/90 md:max-w-lg md:text-sm">
            Chauffeured travel across the city and beyond — airport transfers,
            outstation trips, weddings, and corporate rides.
          </p>
          <div class="flex flex-wrap items-center gap-3">
            <button
              type="button"
              class="rounded-lg bg-gold px-4 py-2.5 text-xs font-semibold text-navy-900 shadow-lg shadow-[0_10px_28px_rgba(1,11,58,0.45)] transition hover:bg-gold-light md:text-sm"
              @click="scrollTo('book')"
            >
              Book Your Ride Today
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-1.5 text-xs font-medium text-gold transition hover:text-gold-light md:text-sm"
              @click="openWhatsAppChat"
            >
              <svg
                class="h-4 w-4 shrink-0 text-cream"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-3 11H7v-2h10v2zm0-4H7V7h10v2z"
                />
              </svg>
              Chat on WhatsApp
            </button>
          </div>

          <div
            class="mt-4 grid max-w-2xl grid-cols-2 gap-x-4 gap-y-3 border-t border-navy-700/70 pt-5 md:mt-5 md:grid-cols-4 md:gap-3"
          >
            <div
              v-for="(t, i) in trustPoints"
              :key="i"
              class="flex flex-col items-start gap-1"
            >
              <span
                class="text-[9px] font-semibold uppercase tracking-wider text-gold md:text-[10px]"
                >{{ t.label }}</span
              >
              <span class="text-gold" aria-hidden="true">
                <svg
                  v-if="t.icon === 'car'"
                  class="h-4 w-4"
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
                  class="h-4 w-4"
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
                  class="h-4 w-4"
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
                  class="h-4 w-4"
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
            The details competitors advertise —
            <span class="italic text-gold">delivered on every ride.</span>
          </h2>
          <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <article
              v-for="item in inclusions"
              :key="item.title"
              class="border-t border-gold/35 pt-6"
            >
              <h3 class="font-serif text-xl font-semibold text-cream">{{ item.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-beige">{{ item.desc }}</p>
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
            <p class="max-w-md text-sm leading-relaxed text-beige md:text-right">
              Choose by seats, luggage and journey type — then book straight on WhatsApp.
            </p>
          </div>

          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="car in fleet"
              :key="car.n"
              class="group flex flex-col rounded-xl border border-navy-700 bg-navy-900 p-6 transition hover:border-gold/25"
            >
              <div class="flex items-start justify-between gap-3">
                <span class="text-sm font-medium text-gold">{{ car.n }}</span>
                <span class="text-[10px] font-semibold uppercase tracking-wider text-beige">
                  {{ car.tier }}
                </span>
              </div>
              <h3 class="mt-2 font-serif text-2xl font-semibold text-cream">
                {{ car.name }}
              </h3>
              <p class="mt-2 text-sm text-beige">{{ car.tagline }}</p>
              <p class="mt-3 text-xs text-gold">Best for: {{ car.bestFor }}</p>
              <div
                class="mt-6 flex items-center justify-between gap-3 border-t border-navy-700 pt-4"
              >
                <div class="min-w-0 text-sm text-gold">
                  <p>{{ car.seats }} seats</p>
                  <p class="truncate text-xs text-beige">{{ car.luggage }}</p>
                </div>
                <button
                  type="button"
                  class="shrink-0 text-sm font-medium text-gold transition hover:text-gold-light"
                  @click="bookVehicle(car.name)"
                >
                  Book →
                </button>
              </div>
            </article>
          </div>

          <div class="mt-14 overflow-x-auto rounded-2xl border border-navy-700">
            <table class="min-w-full text-left text-sm">
              <caption class="sr-only">Fleet comparison</caption>
              <thead class="bg-navy-850 text-xs uppercase tracking-wider text-gold">
                <tr>
                  <th class="px-4 py-3 font-semibold">Vehicle</th>
                  <th class="px-4 py-3 font-semibold">Tier</th>
                  <th class="px-4 py-3 font-semibold">Seats</th>
                  <th class="px-4 py-3 font-semibold">Luggage</th>
                  <th class="px-4 py-3 font-semibold">Best for</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="car in fleet"
                  :key="`cmp-${car.n}`"
                  class="border-t border-navy-700 text-beige"
                >
                  <td class="px-4 py-3 font-medium text-cream">{{ car.name }}</td>
                  <td class="px-4 py-3">{{ car.tier }}</td>
                  <td class="px-4 py-3">{{ car.seats }}</td>
                  <td class="px-4 py-3">{{ car.luggage }}</td>
                  <td class="px-4 py-3">{{ car.bestFor }}</td>
                </tr>
              </tbody>
            </table>
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
              <p class="mt-2 text-sm text-beige">{{ svc.desc }}</p>
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
            <p class="mt-4 text-sm leading-relaxed text-beige md:text-base">
              Flight-aware timing, optional meet &amp; greet, luggage help, and a confirmed
              chauffeur — the same airport standard the top Jozi operators sell.
            </p>
            <ul class="mt-6 space-y-2 text-sm text-cream">
              <li class="flex gap-2"><span class="text-gold">✓</span> Named passenger pickup</li>
              <li class="flex gap-2"><span class="text-gold">✓</span> Meet &amp; greet on request</li>
              <li class="flex gap-2"><span class="text-gold">✓</span> Vehicle matched to people + bags</li>
            </ul>
            <button
              type="button"
              class="mt-8 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy-900 transition hover:bg-gold-light"
              @click="scrollTo('book')"
            >
              Book airport transfer
            </button>
          </div>
          <div class="rounded-2xl border border-navy-700 bg-navy-850 p-8">
            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Popular routes
            </p>
            <ul class="mt-5 space-y-4 text-sm text-beige">
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

      <!-- Quotes / rates style -->
      <section id="rates" class="scroll-mt-24 bg-navy-950 py-16 md:py-24">
        <div class="mx-auto max-w-6xl px-4">
          <p class="text-center text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Transparent quotes
          </p>
          <h2
            class="mx-auto mt-4 max-w-3xl text-center font-serif text-3xl font-semibold text-cream md:text-4xl"
          >
            Quote any vehicle —
            <span class="italic text-gold">confirmed before you ride.</span>
          </h2>
          <p class="mx-auto mt-3 max-w-2xl text-center text-sm text-beige">
            Pick a car from our fleet and request a WhatsApp quote for your route, date and passengers.
          </p>

          <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="tier in quoteTiers"
              :key="tier.name"
              class="flex flex-col rounded-2xl border border-navy-700 bg-navy-900 p-6"
            >
              <h3 class="font-serif text-2xl font-semibold text-cream">{{ tier.name }}</h3>
              <p class="mt-2 text-sm text-gold">{{ tier.examples }}</p>
              <p class="mt-4 flex-1 text-sm text-beige">{{ tier.best }}</p>
              <button
                type="button"
                class="mt-6 w-full rounded-lg border border-gold/50 py-3 text-sm font-semibold text-gold transition hover:bg-gold hover:text-navy-900"
                @click="requestQuote(tier.name)"
              >
                Request quote
              </button>
            </article>
          </div>

          <div class="mt-10 rounded-2xl border border-navy-700 bg-navy-850/60 p-6 md:p-8">
            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Optional add-ons
            </p>
            <ul class="mt-5 flex flex-wrap gap-3">
              <li
                v-for="extra in addOns"
                :key="extra"
                class="rounded-full border border-navy-700 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cream"
              >
                {{ extra }}
              </li>
            </ul>
            <p class="mt-5 text-sm text-beige">
              Mention extras in your booking notes — we’ll confirm availability and cost upfront.
            </p>
          </div>
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
            Book in four clear steps.
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
              <p class="mt-2 text-sm leading-relaxed text-beige">{{ step.desc }}</p>
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
          <p class="mx-auto mt-3 max-w-xl text-sm text-beige">
            Same focus as leading Jozi chauffeurs and shuttles — airport, city, corporate, and
            outstation routes.
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
              <p class="mt-3 text-sm leading-relaxed text-beige">{{ item.a }}</p>
            </details>
          </div>
        </div>
      </section>

      <!-- Book -->
      <section id="book" class="scroll-mt-24 bg-navy-900 py-16 md:py-24">
        <div class="mx-auto max-w-3xl px-4">
          <p class="text-center text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Book your ride
          </p>
          <h2
            class="mt-3 text-center font-serif text-3xl font-semibold text-cream md:text-4xl"
          >
            Reserve <span class="italic text-gold">in seconds.</span>
          </h2>
          <p class="mt-3 text-center text-sm text-beige">
            Fill the form and we’ll receive your booking on WhatsApp instantly.
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
                  max="20"
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
                <span class="mb-1.5 block text-xs font-medium text-beige">Pickup date</span>
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
                <span class="mb-1.5 block text-xs font-medium text-beige">Pickup time</span>
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
                placeholder="Notes (meet & greet, child seat, luggage, extra stops…)"
                class="w-full rounded-lg border border-navy-700 bg-navy-950 px-4 py-3 text-sm text-cream placeholder:text-beige/45 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/35"
              />
            </label>
            <button
              type="submit"
              class="w-full rounded-lg bg-gold py-3.5 text-sm font-semibold text-navy-900 shadow-lg shadow-[0_12px_32px_rgba(1,11,58,0.45)] transition hover:bg-gold-light"
            >
              Send booking on WhatsApp
            </button>
          </form>
        </div>
      </section>

      <!-- Contact -->
      <section id="contact" class="scroll-mt-24 bg-navy-950 pb-12 pt-8 md:pb-20">
        <div class="mx-auto max-w-6xl px-4">
          <div class="flex justify-center">
            <span
              class="rounded-full border border-gold bg-gold px-6 py-2 text-xs font-bold uppercase tracking-wider text-navy-900 shadow-md shadow-gold/25"
            >
              Contact us
            </span>
          </div>

          <div class="mt-10 grid gap-4 sm:grid-cols-2">
            <a
              :href="`https://wa.me/${WHATSAPP_PRIMARY}`"
              target="_blank"
              rel="noopener noreferrer"
              class="flex gap-4 rounded-xl border border-navy-700 bg-navy-850 p-6 transition hover:border-gold/30"
            >
              <span
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold"
              >
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </span>
              <div>
                <p class="font-semibold text-cream">{{ WHATSAPP_DISPLAY }}</p>
                <p class="text-sm text-beige">WhatsApp · quotes & bookings</p>
              </div>
            </a>
            <a
              :href="`mailto:${EMAIL}`"
              class="flex gap-4 rounded-xl border border-navy-700 bg-navy-850 p-6 transition hover:border-gold/30"
            >
              <span
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold"
              >
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <div>
                <p class="font-semibold text-cream">{{ EMAIL }}</p>
                <p class="text-sm text-beige">Corporate quotes & invoices</p>
              </div>
            </a>
          </div>

          <div
            class="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-2 border-t border-navy-700 pt-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-beige md:text-xs"
          >
            <span>Premium vehicles</span>
            <span>Professional service</span>
            <span>Unforgettable journeys</span>
          </div>
          <p
            class="mt-6 text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-gold md:text-xs"
          >
            Your journey · Our priority
          </p>
          <footer class="mt-10 border-t border-navy-700 pt-6 text-center">
            <p class="text-xs text-beige">
              © {{ new Date().getFullYear() }} VSM Tours. All rights reserved.
            </p>
            <p class="mt-2 text-[11px] text-beige/80">
              Developed by
              <span class="font-medium text-gold">Kaybee Debug Solutions</span>
            </p>
          </footer>
        </div>
      </section>
    </main>

    <!-- WhatsApp chat FAB — high contrast + above header -->
    <a
      :href="`https://wa.me/${WHATSAPP_PRIMARY}`"
      target="_blank"
      rel="noopener noreferrer"
      class="fixed bottom-5 right-5 z-[100] flex h-16 w-16 items-center justify-center rounded-full bg-whatsapp text-cream shadow-[0_10px_36px_rgba(37,211,102,0.6),0_4px_16px_rgba(0,0,0,0.4)] ring-[3px] ring-white/90 ring-offset-2 ring-offset-[var(--background)] transition hover:scale-110 hover:shadow-[0_12px_44px_rgba(37,211,102,0.75)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold md:bottom-8 md:right-8 md:h-[4.5rem] md:w-[4.5rem]"
      aria-label="Chat on WhatsApp"
    >
      <svg class="h-8 w-8 md:h-9 md:w-9" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
        />
      </svg>
    </a>
  </div>
</template>

<style>
/* Native selects / autofill — match Tailwind navy-950 + cream (design tokens) */
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
