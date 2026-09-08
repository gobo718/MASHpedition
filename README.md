# MASHpedition Residence — locked geometry build

Unversioned structural build based on the Residence geometry reconstructed and approved on 2026-09-02.

Screen 1:
- Five equal 20% landscape columns.
- Left 20%: Identity occupies top 80%; profile picture and identity text split that box 50/50 vertically.
- Bottom 20% of left column: Mailbox, Guestbook, Trick-or-Treat Box, equal side-by-side.
- Middle 40%: one continuous Microflex Board.
- Right 40%: upper four Atelier slots, two columns by two rows.

Screen 2:
- Middle 40%: continuation of the same Microflex Board.
- Right 40%: exact duplicate of the first-screen Atelier geometry, completing a continuous 2-column × 4-row Atelier.
- Left 20%:
  - top 1/3: Trophy + Prize Machine
  - next 1/6: COLLECTION
  - next 1/3: Sticker Machine + Computer
  - bottom 1/6: GALLERY

Structural verification:
- Board = exactly 40% width × 200% screen height.
- Atelier = exactly 40% width × 200% screen height.
- Every Atelier slot = exactly 20% viewport width × 50% viewport height.
- Second-screen left menu = exact 2:1:2:1 vertical ratio.
- Collection and Gallery are the long word-labeled buttons.
- Trophy, Prize Machine, Sticker Machine, and Computer use symbol buttons.

---

# Museum Hub Shell — Added 2026-09-03

## Current Museum-Level Geography

The current first-pass museum hub shell uses one landscape viewport.

### Top Band — 1/6 of Screen Height

The top band is divided horizontally:

- **Left 1/6:** Catacombs
- **Middle 2/3:** Residence
- **Right 1/6:** Catacombs

The Catacombs visually flank the Residence. The Residence is on the second level; the Catacombs are underground.

### Central Region — 2/3 of Screen Height

The central region is an equal 2 × 2 grid:

| | |
|---|---|
| **Grand Exhibition Halls** | **SALON ECLECTIQUE** |
| **Studio** | **Lab** |

Geographic working positions:

- Northwest: Grand Exhibition Halls
- Northeast: SALON ECLECTIQUE
- West: Studio
- East: Lab

### Bottom Atrium Band — 1/6 of Screen Height

For now, the Atrium does not require a separate hub button. Its four destinations appear directly in the bottom band.

Left to right:

- **Information Desk — 25%**
- **For Your Consideration — 50%**
- **Gift Shop — 12.5%**
- **Control Room — 12.5%**

For Your Consideration is intentionally the dominant destination in this band.

## Hub Abstraction

At the museum level, major hubs should remain major hubs rather than exposing all of their internal rooms.

The direct display of the four Atrium destinations is an intentional exception in the current shell. Do not similarly expand the Grand Exhibition Halls, SALON ECLECTIQUE, Studio, Lab, Residence, or Catacombs into their internal destinations unless that is deliberately designed later.

Vaults are not a museum-level hub. They are a Catacombs-associated offshoot/special destination.

## Current Flat Site Structure

The working prototype is intentionally kept flat for easy maintenance and manual GitHub updates from a phone.

- `index.html` — Museum Hub
- `styles.css` — Museum Hub styles
- `residence.html` — Residence
- `residence.css` — Residence styles
- `README.md` — accumulated working documentation

Avoid introducing nested folders unless they become functionally necessary.

The old root `app.js` was identified as stale code referencing elements not present in the approved Residence shell and is not part of the current flat prototype.

## Current Navigation

- Loading the site opens the Museum Hub.
- Selecting **Residence** opens `residence.html`.
- The Residence currently has a small **MUSEUM** return control linking to `index.html`.

The MUSEUM control is **strictly temporary prototype navigation**. It is a fixed overlay and does not reserve, remove, resize, or restructure any part of the approved Residence geometry. It should be replaced when the actual navigation mechanism is designed.

## Change-Control Note

The Museum Hub shell currently defines structural geography only. It does not establish perspective, architecture, decorative styling, movement behavior, navigation chrome, or additional rooms.

Exact shell proportions above are intentional and should be preserved unless explicitly revised.



---

# Laboratory Shell — Corrected Geometry 2026-09-08

The Laboratory is a structural playground shell. Its current geometry follows Billy's explicit screen measurements and should not be reinterpreted into generic panels.

## Laboratory screen geometry

- **0–20% — Input/navigation column**
  - 0–35%: `EMOJI A`
  - 35–70%: `EMOJI B`
  - 70–85%: `MOSAICS JOURNAL`
  - 85–100%: `PRESETS`
- **20–70% — `MUTOSIS MACHINE`**
  - 0–5% blank
  - 5–10% meter
  - 10–15% blank
  - 15–40% machine screen with 2.5% whole-screen blank space on each side and a 45% whole-screen screen area
  - 40–45% blank
  - 45–50% `ACTIVATE MUTOSIS`
  - 50–55% blank
  - 55–65%: Field 1 / dial / central gap / dial / Field 2 using whole-screen widths `2.5 / 15 / 5 / 5 / 5 / 15 / 2.5`
  - 65–70% blank
  - 70–80%: same arrangement for Fields 3 and 4
  - 80–85% blank
  - 85–95%: same arrangement for Fields 5 and 6
  - 95–100% blank
- **70–80% — `CHIMERIC AGGLOMERATOR`**
  - 0–90% machine
  - 90–95% meter
  - 95–100% temporary `MUSEUM` return control
  - The Museum control occupies what is canonically blank space only for prototype navigation. Remove it when real navigation replaces the temporary return control.
- **80–100% — Output**
  - 0–80% output area
  - 80–90%: `SAVE` | `RETRY`
  - 90–100%: `DISCARD` | `SUBMIT`

## Corrections carried forward

- Mosaics are not a persistent Lab panel. The Lab exposes them through the `MOSAICS JOURNAL` control.
- Generic permanent `LEFT / CENTER / RIGHT` machine controls are not part of the Lab shell. Weighting is an evolving/context-sensitive mechanic and must not be exposed as a universal toolbar.
- **Chimeric Agglomerator** is the canonical name of the Laboratory's Gem-making apparatus.
- The shell does not invent controls for the Chimeric Agglomerator beyond the meter specified above.
- Residence files remain unchanged.
- Story progression, unlock timing, final art treatment, and responsive refinements are not locked by this shell.

## Laboratory viewport correction — 2026-09-08

- Restored the Laboratory outer canvas sizing behavior from the preceding Lab shell: `100vw × 100dvh` in landscape, with no forced 1000px minimum width or 560px minimum height.
- The measured 20% / 50% / 10% / 20% internal Laboratory geometry is unchanged.
- The 1000px minimum remains portrait-only, matching the earlier shell behavior.

---

# Studio Shell — Percentage Geometry Added 2026-09-08

The Studio now has its established all-open playground geometry. These are structural proportions, not progression timing.

## Full Studio geometry

The Studio occupies one landscape viewport and is divided vertically:

- **0–20%:** top equipment band
- **20–50%:** upper middle row
- **50–80%:** lower middle row
- **80–100%:** bottom equipment band

Top band:

- **Chromatic Attic — 75% width**
- **Chromatic Amalgamator — 25% width**

Upper middle row:

- **Easel — 50% width**
- **The Rough Stuff — 50% width**

Lower middle row:

- **Creation Station — 50% width**
- **Presentation Station — 50% width**

Bottom band:

- **Paint Mixer — 25% width**
- **Color Cellar — 75% width**

This preserves the established progression geometry in its fully opened state: the original central 2×2 workspace occupies two 30%-high rows, Chromatic Attic / Chromatic Amalgamator occupy the top 20%, and Paint Mixer / Color Cellar occupy the bottom 20%.

The small fixed `MUSEUM` control is temporary prototype navigation only and does not consume or resize Studio geometry.

## Museum Atrium geometry — explicit percentage lock

The existing Museum Hub already contained the intended Atrium proportions. They are now expressed explicitly in CSS rather than only as fractional units:

- Entire Atrium band: **bottom 1/6 = 16.6667% of the viewport height**
- **Information Desk — 25% width**
- **For Your Consideration — 50% width**
- **Gift Shop — 12.5% width**
- **Control Room — 12.5% width**

The Museum Hub remains:

- top band: **1/6 = 16.6667% height**
- central region: **2/3 = 66.6667% height**
- Atrium band: **1/6 = 16.6667% height**

No Lab or Residence geometry was changed while adding the Studio shell.
