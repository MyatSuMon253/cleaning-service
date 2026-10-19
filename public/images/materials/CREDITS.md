# Material photographs

Shown on the service detail pages (`/services/<id>`), one per entry in that service's
`materials` list. The file order is fixed by `lib/materials.ts`, which matches each photo
to the material at the same index in the dictionaries — change one and change the other.

All are from Pexels under the [Pexels licence](https://www.pexels.com/license/): free for
commercial use, no attribution required. Credits are listed anyway so each source can be
traced and replaced with a photo of Tidy Home's own kit.

| File | Used for | Pexels photo |
|---|---|---|
| `broom-dustpan.webp` | General 1 — broom, dustpan, mop | https://www.pexels.com/photo/15213501/ |
| `floor-cleaner.webp` | General 2 — tile and floor cleaner | https://www.pexels.com/photo/5217889/ |
| `toilet-brush.webp` | General 3 — bathroom and toilet cleaner | https://www.pexels.com/photo/4239074/ |
| `dish-soap.webp` | General 4 — dishwashing liquid, sponges | https://www.pexels.com/photo/10574059/ |
| `bin-bags.webp` | General 5 — rubbish bin and bags | https://www.pexels.com/photo/7282001/ |
| `cloths-gloves.webp` | General 6 — dust cloths and gloves | https://www.pexels.com/photo/4239039/ |
| `cleaning-kit.webp` | Deep 1, Moving 1 — the general list | https://www.pexels.com/photo/5218015/ |
| `oven-degreaser.webp` | Deep 2 — kitchen and extractor degreaser | https://www.pexels.com/photo/9462303/ |
| `scrub-brush.webp` | Deep 3 — long-handled scrubbing brush | https://www.pexels.com/photo/45059/ |
| `step-ladder.webp` | Deep 4 — step ladder | https://www.pexels.com/photo/5691618/ |
| `vacuum.webp` | Deep 5 — vacuum cleaner | https://www.pexels.com/photo/9462142/ |
| `glass-cleaner.webp` | Moving 2 — all-purpose and glass cleaner | https://www.pexels.com/photo/9462107/ |
| `washing-machine.webp` | Washing 1 — washing machine or basins | https://www.pexels.com/photo/7282378/ |
| `laundry-detergent.webp` | Washing 2 — detergent and softener | https://www.pexels.com/photo/10566506/ |
| `stain-remover.webp` | Washing 3 — stain remover | https://www.pexels.com/photo/10557892/ |
| `iron-board.webp` | Washing 4 — iron and ironing board | https://www.pexels.com/photo/28576628/ |
| `drying-rack.webp` | Washing 5 — drying rack, line, hangers | https://www.pexels.com/photo/10565610/ |

Each was centre-cropped square to 600 × 600 by the Pexels CDN and encoded as WebP at
quality 80 (`cwebp -q 80`). The cards crop to 4:3, and Next serves AVIF where supported.

## Replacing one

Drop a new file in at the same name — no code change. To add a material, add its line to
both dictionaries **and** a path at the same index in `lib/materials.ts`; a material with
no path renders as a text-only card rather than a broken image.
