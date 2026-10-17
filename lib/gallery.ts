import type { Locale } from "./locale";
import type { ServiceId } from "./services";

export type ImageKind = "before" | "after";

export type ImageSrc = {
  /** Empty string means "no real photo yet" — resolveImage falls back to the placeholder. */
  src: string;
  kind: ImageKind;
  alt: Record<Locale, string>;
};

export type BeforeAfterPair = {
  id: string;
  serviceId: ServiceId;
  caption: Record<Locale, string>;
  before: ImageSrc;
  after: ImageSrc;
};

const PLACEHOLDER: Record<ImageKind, string> = {
  before: "/images/placeholder-before.svg",
  after: "/images/placeholder-after.svg",
};

function pair(
  id: string,
  serviceId: ServiceId,
  caption: Record<Locale, string>,
  files: { before: string; after: string },
  alt: Record<Locale, string>,
): BeforeAfterPair {
  return {
    id,
    serviceId,
    caption,
    before: { src: files.before, kind: "before", alt: { en: `${alt.en} — before`, my: `${alt.my} — မတိုင်မီ` } },
    after: { src: files.after, kind: "after", alt: { en: `${alt.en} — after`, my: `${alt.my} — ပြီးနောက်` } },
  };
}

export const GALLERY: readonly BeforeAfterPair[] = [
  pair(
    "general-living",
    "general",
    { en: "Living room, three-hour clean", my: "ဧည့်ခန်း — ၃ နာရီ သန့်ရှင်းရေး" },
    { before: "", after: "" },
    { en: "Living room", my: "ဧည့်ခန်း" },
  ),
  pair(
    "general-kitchen",
    "general",
    { en: "Kitchen surfaces and floor", my: "မီးဖိုခေါင်း မျက်နှာပြင်နှင့်ကြမ်းပြင်" },
    { before: "", after: "" },
    { en: "Kitchen", my: "မီးဖိုခေါင်း" },
  ),
  pair(
    "deep-bathroom",
    "deep",
    { en: "Deep clean — bathroom after renovation", my: "အခြေခံ အသစ်ပြင်ဆင်မှု သန့်ရှင်းရေး — ရေချိုးခန်း" },
    { before: "", after: "" },
    { en: "Bathroom", my: "ရေချိုးခန်း" },
  ),
  pair(
    "moving-empty",
    "moving",
    { en: "Move-out clean, empty unit", my: "ပြောင်းရွှေ့သည့်အခါ သန့်ရှင်းရေး — အခန်းလပ်" },
    { before: "", after: "" },
    { en: "Empty apartment", my: "အခန်းလပ်" },
  ),
  pair(
    "washing-laundry",
    "washing",
    { en: "Washed, pressed and folded", my: "လျှော်၊ သွတ်၊ ခေါက်ပြီးစီး" },
    { before: "", after: "" },
    { en: "Laundry", my: "အဝတ်လျှော်ခြင်း" },
  ),
];

export function resolveImage(image: ImageSrc): string {
  const trimmed = image.src.trim();
  return trimmed === "" ? PLACEHOLDER[image.kind] : trimmed;
}

export function galleryFor(serviceId: ServiceId): readonly BeforeAfterPair[] {
  return GALLERY.filter((g) => g.serviceId === serviceId);
}
