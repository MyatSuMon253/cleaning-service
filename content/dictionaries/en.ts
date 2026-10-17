import { formatMmk } from "../../lib/format";
import { TIERS } from "../../lib/services";

/** Derived from TIERS so the legal text can never drift from the price list. */
const TIER_LIST = TIERS.map((t) => `${t.hours} hours ${formatMmk(t.mmk)} MMK`).join(", ");

export const en = {
  brand: "Tidy Home",
  tagline: "Home cleaning in Yangon",

  nav: {
    services: "Services",
    gallery: "Results",
    pricing: "Pricing",
    book: "Book",
    terms: "Terms",
    language: "Language",
    theme: "Theme",
  },

  hero: {
    eyebrow: "Yangon home cleaning",
    heading1: "A cleaner home,",
    heading2: "on your terms.",
    lede: "Four services, one plain price list, and a booking form that takes a minute. You supply the tools — we bring the work.",
    ctaPrimary: "Book a clean",
    ctaSecondary: "See pricing",
    materialsNote: "You supply all tools, chemicals and materials.",
  },

  trust: [
    {
      title: "Fixed prices",
      body: "Three, four or seven hours. The price is on the page before you book.",
    },
    {
      title: "No subscription",
      body: "One booking at a time. Nothing recurring, nothing to cancel.",
    },
    {
      title: "Damage covered",
      body: "Accidental damage during the job is covered up to MMK 100,000.",
    },
    {
      title: "No account needed",
      body: "A phone number and your address. That is the whole form.",
    },
  ],

  services: {
    eyebrow: "What we do",
    heading: "Four services",
    note: "Every booking is one-time. There are no plans and no subscriptions.",
    general: {
      name: "General Cleaning",
      blurb:
        "The routine reset for a home that is already in decent shape. Floors, surfaces, bathroom, kitchen — done properly, in the hours you book.",
      note: "Fixed price by duration",
    },
    deep: {
      name: "Deep Cleaning",
      blurb:
        "Post-renovation, move-in, or a home that has not had a proper scrub in years. Detailed manual work, not a machine pass.",
      note: "Priced after an on-site survey",
    },
    moving: {
      name: "Moving",
      blurb:
        "Empty the old place or settle into the new one. We work around the boxes so you can concentrate on the move itself.",
      note: "Fixed price by duration",
    },
    washing: {
      name: "Washing + Ironing",
      blurb:
        "Laundry washed, pressed and folded. Hand it over at the start of the shift and collect it at the end.",
      note: "Fixed price by duration",
    },
  },

  gallery: {
    eyebrow: "Before and after",
    heading: "The difference",
    lede: "Same room, same light, a few hours apart.",
    before: "Before",
    after: "After",
    empty: "Photographs coming soon.",
  },

  pricing: {
    eyebrow: "Pricing",
    heading: "One price list",
    currency: "MMK",
    duration: {
      "3": "3 hours",
      "4": "4 hours",
      "7": "7 hours",
    },
    durationNote:
      "Hours run continuously from your chosen start time. A 7-hour booking starts at 9:00 only.",
    materialsNote: "All tools, chemicals and materials are supplied by you.",
    damageNote: "Accidental damage during the job is covered up to",
    deepHeading: "Deep Cleaning",
    deepNote:
      "No fixed price. We survey the site first, then quote against the area and the condition we find.",
    surveyFee: "Site survey fee",
    surveyFeeNote: "Payable at the survey. Non-refundable whether or not you go ahead.",
    appliesTo: "Applies to",
    appliesGeneral: "General Cleaning, Moving, and Washing + Ironing.",
    cta: "Book this",
  },

  shifts: {
    heading: "Start times",
    morning: "Morning",
    morningTime: "9:00",
    evening: "Evening",
    eveningTime: "13:00",
    morningEnds: "Morning shift starts at 9:00 and runs to 16:00 for a 7-hour booking.",
    eveningEnds: "Evening shift starts at 13:00. Bookings of 4 hours or less.",
    sevenHourOnlyMorning: "A 7-hour booking always starts at 9:00.",
  },

  booking: {
    eyebrow: "Book",
    heading: "Request a booking",
    lede:
      "Fill this in and we will call you to confirm. No account, no payment online.",
    labels: {
      name: "Your name",
      phone: "Phone number",
      address: "Address",
      service: "Service",
      date: "Preferred date",
      shift: "Start time",
      duration: "How long",
      notes: "Anything we should know",
    },
    placeholders: {
      name: "e.g. Aung Kyaw",
      phone: "09 XXX XXX XXX",
      address: "Ward, township, building, floor, unit, landmarks",
      notes: "Optional",
    },
    surveyNotice:
      "Deep cleaning is quoted on site. You are booking the survey visit — a 5,000 MMK survey fee is payable then, and it is non-refundable.",
    submit: "Request this booking",
    submitting: "Sending…",
    formNote: "We confirm every booking by phone.",
    errors: {
      name: "Please enter your name.",
      phone: "Please enter a valid Myanmar phone number, starting 09.",
      address: "Please tell us the full address, including ward and township.",
      service: "Please choose a service.",
      date: "Please choose a date from tomorrow onwards.",
      shift: "Please choose a start time.",
      duration: "Please choose how many hours.",
      durationNotAvailable: "A 7-hour booking starts at 9:00 only.",
      generic: "Something went wrong. Please check the form and try again.",
    },
    success: {
      heading: "Request received",
      reference: "Reference",
      service: "Service",
      when: "When",
      duration: "Duration",
      shift: "Start time",
      survey: "Site survey fee",
      phone: "We will call you on",
      callNote:
        "We have no email on file for you, so the confirmation comes by phone. If you would rather speak to us now:",
      another: "Make another booking",
      close: "Call us",
    },
  },

  terms: {
    eyebrow: "Terms and conditions",
    heading: "The fine print",
    intro:
      "These apply to every booking. Read them before you confirm — they are short.",
    clauses: [
      {
        title: "You supply the materials",
        body: "All tools, equipment, chemicals and cleaning materials are provided by you, for every service. Our team arrives with none. A standard list is on each service page.",
      },
      {
        title: "Damage coverage",
        body: "Accidental damage caused by our cleaner during the job is covered up to MMK 100,000 per booking. Pre-existing damage and ordinary wear must be reported before the visit; anything unreported afterwards is not covered.",
      },
      {
        title: "Start times and lateness",
        body: "Start times are 9:00 or 13:00. We tolerate up to 30 minutes of delay. Beyond 30 minutes you may cancel free of charge.",
      },
      {
        title: "If we cannot attend",
        body: "If our cleaner does not arrive, we send a replacement at the earliest available slot, or give a full refund plus one complimentary service — your choice.",
      },
      {
        title: "Out of scope",
        body: "High and hard-to-reach places, exterior surfaces, hand-washing of clothes, cooking, and running errands outside the premises are not included.",
      },
      {
        title: "Secure your valuables",
        body: "Please put away jewellery, cash, important documents and fragile high-value items before the visit.",
      },
      {
        title: "Belongings are declared",
        body: "Before leaving, your cleaner lists anything moved, opened or handled, so you can check it before signing off.",
      },
      {
        title: "Deep cleaning survey",
        body: "Deep cleaning is quoted after an on-site survey. A 5,000 MMK survey fee is payable at the survey and is non-refundable. The final price is agreed with you before any work begins.",
      },
      {
        title: "Fixed pricing",
        body: `General Cleaning, Moving and Washing + Ironing are priced by duration: ${TIER_LIST}. Hours run continuously from the chosen start time, and a 7-hour booking always starts at 9:00.`,
      },
      {
        title: "One-time bookings",
        body: "There are no subscriptions and no recurring plans. Reschedule free of charge with at least 24 hours' notice.",
      },
      {
        title: "What our team wears",
        body: "There is no company uniform. Cleaners arrive in ordinary clothes, and carry identification for you to check.",
      },
      {
        title: "Limit of liability",
        body: "Our total liability on any claim is capped at the damage coverage described above.",
      },
    ],
    disclaimer:
      "By booking you confirm that you have read and accepted these terms. Questions are welcome by phone.",
  },

  footer: {
    tagline: "Home cleaning in Yangon.",
    contact: "Contact",
    phone: "Phone",
    address: "Address",
    addressValue: "No. 37/39, 28th Street, Pabedan, Yangon",
    hours: "Hours",
    hoursValue: "Daily, 9:00 – 20:00",
    rights: "All rights reserved.",
    materials: "You supply all tools, chemicals and materials.",
    madeNote: "One-time bookings only. No subscriptions.",
  },
};
