import type { ServiceId } from "./services";

/**
 * Photograph for one material, positionally matched to the `materials` array in
 * the dictionaries — entry n here illustrates material n there, in every locale.
 * Sources and licence are listed in public/images/materials/CREDITS.md.
 */
const MATERIAL_IMAGES: Record<ServiceId, readonly string[]> = {
  general: [
    "/images/materials/broom-dustpan.webp",
    "/images/materials/floor-cleaner.webp",
    "/images/materials/toilet-brush.webp",
    "/images/materials/dish-soap.webp",
    "/images/materials/bin-bags.webp",
    "/images/materials/cloths-gloves.webp",
  ],
  deep: [
    "/images/materials/cleaning-kit.webp",
    "/images/materials/oven-degreaser.webp",
    "/images/materials/scrub-brush.webp",
    "/images/materials/step-ladder.webp",
    "/images/materials/vacuum.webp",
  ],
  moving: ["/images/materials/cleaning-kit.webp", "/images/materials/glass-cleaner.webp"],
  washing: [
    "/images/materials/washing-machine.webp",
    "/images/materials/laundry-detergent.webp",
    "/images/materials/stain-remover.webp",
    "/images/materials/iron-board.webp",
    "/images/materials/drying-rack.webp",
  ],
};

/** Null when a material has no photograph yet — the card then renders text only. */
export function materialImage(serviceId: ServiceId, index: number): string | null {
  return MATERIAL_IMAGES[serviceId][index] ?? null;
}
