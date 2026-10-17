# Before / after photographs

Real photos replace the placeholders without touching any component.

## How to add a photo

1. Export it here, e.g. `general-living-before.webp` and `general-living-after.webp`.
2. Open `lib/gallery.ts` and set the two `src` strings on that pair.

That is the only change required. If a `src` is left as an empty string the branded
placeholder is used instead, so the page never shows a broken image.

## Naming

```
{pair-id}-before.webp
{pair-id}-after.webp
```

Pair ids currently defined in `lib/gallery.ts`:

| id | service |
|---|---|
| `general-living` | General Cleaning |
| `general-kitchen` | General Cleaning |
| `deep-bathroom` | Deep Cleaning |
| `moving-empty` | Moving |
| `washing-laundry` | Washing + Ironing |

## Specification

- **Dimensions:** 1600 × 1200 (4:3). The layout crops to 4:3, so any 4:3 source works.
- **Format:** WebP, quality ~80. AVIF is served automatically where the browser supports it.
- **Size:** keep each file under 300 KB.
- **Both photos of a pair must be the same room, same angle, same framing** — otherwise the
  comparison does not read. Same time of day and same camera position.
- **No people, no faces, no visible paperwork.** Nothing that needs a model release.

## Replacing the placeholders

`placeholder-before.svg` and `placeholder-after.svg` can be deleted once every pair in
`lib/gallery.ts` has a real `src`.
