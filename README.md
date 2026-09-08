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

# Laboratory Shell — Added 2026-09-07

The Museum Hub **Lab** destination now opens `lab.html`.

This is a structural playground shell, not a final visual-design lock. It translates established Laboratory mechanics into a usable page without inventing progression timing.

Current Laboratory shell regions:

- **Left 30% — Mutosis inputs and controls**
  - Emoji A
  - Emoji B
  - Fields
  - Keywords
  - basic Left / Center / Right weighting controls
  - reserved physical control bay for later/unlocked machine controls
- **Center 45% — Mutosis Machine**
  - physical machine/result area
  - Activate Mutosis
  - Save
  - Discard / Retry
  - Submit
  - Review Drafts
- **Right 25% — Mosaic Tracker**
  - fast view of unlocked unfinished Mosaics
  - supports known or hidden subject state
  - supports all, some, or none of the missing requirements being revealed
  - must never expose information the player has not actually learned

The Mosaic Tracker is an information-state display, not a guaranteed recipe/checklist. The placeholder rows intentionally demonstrate the four visibility patterns without establishing actual Mosaic content.

Files added:

- `lab.html` — Laboratory structural shell
- `lab.css` — Laboratory shell geometry

Navigation change:

- Museum Hub **LAB** now links to `lab.html`.
- Laboratory uses the same temporary fixed **MUSEUM** return control as the Residence.

No Residence geometry was changed. No progression order, Gem unlock timing, Mosaic content, art style, or final Laboratory visual treatment is established by this shell.
