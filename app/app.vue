<script setup lang="ts">
const WHATSAPP_PRIMARY = '27714630640'
const WHATSAPP_SECONDARY_DISPLAY = '060 545 7885'
const EMAIL = 'victormolepl@gmail.com'

const mobileOpen = ref(false)

const form = reactive({
  name: '',
  service: 'Airport Transfer',
  vehicle: 'VClass',
  passengers: '1',
  pickup: '',
  dropoff: '',
  date: '',
  time: '',
  notes: '',
})

const serviceTypes = [
  'Airport Transfer',
  'Outstation Trip',
  'Family Tour',
  'Corporate Travel',
  'Event / Wedding',
  'Uber / Bolt Ride',
  'Other',
]

const vehicles = [
  'VClass',
  'Staria',
  'Ertiga',
  'Rumion',
  'Executive Sedan',
  'Premium SUV',
]

const fleet = [
  {
    n: '01',
    name: 'VClass',
    tagline: 'Travel together, in ultimate comfort.',
    seats: 6,
  },
  {
    n: '02',
    name: 'Staria',
    tagline: 'Space that moves you.',
    seats: 7,
  },
  {
    n: '03',
    name: 'Ertiga',
    tagline: 'Smart. Spacious. Always ready.',
    seats: 6,
  },
  {
    n: '04',
    name: 'Rumion',
    tagline: 'More room. More memories.',
    seats: 6,
  },
  {
    n: '05',
    name: 'Executive Sedan',
    tagline: 'Sleek rides for Uber & Bolt.',
    seats: 4,
  },
  {
    n: '06',
    name: 'Premium SUV',
    tagline: 'Bold journeys, refined comfort.',
    seats: 5,
  },
]

const services = [
  {
    title: 'Airport Transfers',
    desc: 'Punctual pickups and drop-offs to all major airports.',
    icon: 'plane',
  },
  {
    title: 'Outstation Trips',
    desc: 'Long-distance travel with experienced drivers.',
    icon: 'pin',
  },
  {
    title: 'Family Tours',
    desc: 'Spacious vehicles for unforgettable family adventures.',
    icon: 'family',
  },
  {
    title: 'Corporate Travel',
    desc: 'Reliable transport for executives and teams.',
    icon: 'briefcase',
  },
  {
    title: 'Events & Weddings',
    desc: 'Arrive in style on your most important days.',
    icon: 'heart',
  },
  {
    title: 'Uber & Bolt Rides',
    desc: 'On-demand rides with our trusted drivers.',
    icon: 'car',
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

function buildBookingMessage() {
  const lines = [
    '*VSM Tours — booking request*',
    '',
    `Name: ${form.name || '(not provided)'}`,
    `Service: ${form.service}`,
    `Vehicle: ${form.vehicle}`,
    `Passengers: ${form.passengers}`,
    `Pickup: ${form.pickup || '(not provided)'}`,
    `Drop-off: ${form.dropoff || '(not provided)'}`,
    `Date: ${form.date || '(not provided)'}`,
    `Time: ${form.time || '(not provided)'}`,
  ]
  if (form.notes.trim()) {
    lines.push('', `Notes: ${form.notes.trim()}`)
  }
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
    waUrl('Hi VSM Tours — I’d like to chat about a ride.'),
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
          class="hidden items-center gap-8 text-sm font-medium text-cream/90 md:flex"
        >
          <button
            type="button"
            class="transition hover:text-gold"
            @click="scrollTo('fleet')"
          >
            Fleet
          </button>
          <button
            type="button"
            class="transition hover:text-gold"
            @click="scrollTo('services')"
          >
            Services
          </button>
          <button
            type="button"
            class="transition hover:text-gold"
            @click="scrollTo('book')"
          >
            Book
          </button>
          <button
            type="button"
            class="transition hover:text-gold"
            @click="scrollTo('contact')"
          >
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
          <button
            class="py-1 text-left text-cream transition hover:text-gold"
            @click="scrollTo('fleet')"
          >
            Fleet
          </button>
          <button
            class="py-1 text-left text-cream transition hover:text-gold"
            @click="scrollTo('services')"
          >
            Services
          </button>
          <button
            class="py-1 text-left text-cream transition hover:text-gold"
            @click="scrollTo('book')"
          >
            Book
          </button>
          <button
            class="py-1 text-left text-cream transition hover:text-gold"
            @click="scrollTo('contact')"
          >
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
        class="relative isolate min-h-[85vh] overflow-hidden bg-navy-950 bg-[url('/hero1.png')] bg-cover bg-[center_48%] bg-no-repeat md:min-h-[90vh] md:bg-[center_56%]"
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
          class="pointer-events-none absolute inset-x-0 bottom-0 h-[min(58vh,30rem)] bg-gradient-to-t from-navy-950 via-navy-950/85 to-transparent md:h-[min(55vh,34rem)]"
          aria-hidden="true"
        />

        <div
          class="relative z-10 mx-auto flex max-w-6xl flex-col justify-end gap-8 px-4 pb-28 pt-28 md:min-h-[90vh] md:justify-end md:gap-10 md:pb-44 md:pt-28 lg:pb-52"
        >
          <p
            class="text-xs font-semibold uppercase tracking-[0.35em] text-gold md:text-sm"
          >
            Comfort · Style · Memories
          </p>
          <div class="max-w-2xl space-y-2">
            <h1
              class="font-serif text-4xl font-semibold leading-tight tracking-tight text-cream md:text-5xl lg:text-6xl"
            >
              Premium Fleet.
            </h1>
            <p
              class="font-serif text-4xl italic text-gold md:text-5xl lg:text-6xl"
            >
              Premium Experience.
            </p>
          </div>
          <p class="max-w-xl text-sm leading-relaxed text-beige md:text-base">
            We take you places. Chauffeured travel across the city and beyond —
            airport transfers, outstation trips, weddings, corporate rides, and
            on-demand Uber &amp; Bolt service.
          </p>
          <div class="flex flex-wrap items-center gap-4">
            <button
              type="button"
              class="rounded-lg bg-gold px-6 py-3.5 text-sm font-semibold text-navy-900 shadow-xl shadow-[0_14px_40px_rgba(1,11,58,0.55)] transition hover:bg-gold-light"
              @click="scrollTo('book')"
            >
              Book Your Ride Today
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-2 text-sm font-medium text-gold transition hover:text-gold-light"
              @click="openWhatsAppChat"
            >
              <svg
                class="h-5 w-5 shrink-0 text-cream"
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
            class="mt-10 grid max-w-3xl grid-cols-2 gap-6 border-t border-navy-700/80 bg-navy-950/45 px-2 py-10 backdrop-blur-[2px] sm:px-3 md:mt-16 md:grid-cols-4 md:gap-4 md:px-4 md:py-12"
          >
            <div
              v-for="(t, i) in trustPoints"
              :key="i"
              class="flex flex-col items-start gap-1.5"
            >
              <span
                class="text-[10px] font-semibold uppercase tracking-wider text-gold md:text-[11px]"
                >{{ t.label }}</span
              >
              <span class="mt-0.5 text-gold" aria-hidden="true">
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
            </div>
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
                Six vehicles.
                <span class="block font-serif italic text-gold">Endless journeys.</span>
              </h2>
            </div>
            <p class="max-w-md text-sm leading-relaxed text-beige md:text-right">
              Each vehicle in our fleet is hand-picked for comfort, safety, and style
              — driven by experienced chauffeurs.
            </p>
          </div>

          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="car in fleet"
              :key="car.n"
              class="group flex flex-col rounded-xl border border-navy-700 bg-navy-900 p-6 transition hover:border-gold/25"
            >
              <span class="text-sm font-medium text-gold">{{ car.n }}</span>
              <h3 class="mt-2 font-serif text-2xl font-semibold text-cream">
                {{ car.name }}
              </h3>
              <p class="mt-2 flex-1 text-sm text-beige">{{ car.tagline }}</p>
              <div
                class="mt-6 flex items-center justify-between border-t border-navy-700 pt-4"
              >
                <span class="text-sm text-gold">{{ car.seats }} seats</span>
                <button
                  type="button"
                  class="text-sm font-medium text-gold transition hover:text-gold-light"
                  @click="bookVehicle(car.name)"
                >
                  Book →
                </button>
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
              <p class="mt-2 text-sm text-beige">{{ svc.desc }}</p>
            </div>
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
                <span class="sr-only">Date</span>
                <input
                  v-model="form.date"
                  type="date"
                  class="w-full rounded-lg border border-navy-700 bg-navy-950 px-4 py-3 text-sm text-cream focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/35"
                />
              </label>
              <label class="block">
                <span class="sr-only">Time</span>
                <input
                  v-model="form.time"
                  type="time"
                  class="w-full rounded-lg border border-navy-700 bg-navy-950 px-4 py-3 text-sm text-cream focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/35"
                />
              </label>
            </div>
            <label class="block">
              <span class="sr-only">Notes</span>
              <textarea
                v-model="form.notes"
                rows="3"
                placeholder="Notes (luggage, child seat, etc.)"
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
                <p class="font-semibold text-cream">071 463 0640</p>
                <p class="text-sm text-beige">{{ WHATSAPP_SECONDARY_DISPLAY }}</p>
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
                <p class="text-sm text-beige">We reply within the hour</p>
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
</style>
