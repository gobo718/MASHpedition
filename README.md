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

---

# Exhibit View Shell — Added 2026-09-08

A first functional exhibit-navigation shell is now linked from **GRAND EXHIBITION HALLS**.

This shell implements the recovered exhibit-view behavior without treating the separate scrolling-wall overlay as the same system.

## Spatial exhibit views

- **Door / Room View** — the default full-room entrance view.
- **Left Corner View** — camera shifts toward the left side/corner and presents the left three-art grouping.
- **Right Corner View** — corresponding right-side/corner three-art grouping.
- **Wall View** — selecting an artwork squares the view flat to that artwork/wall rather than leaving it in room perspective.
- **Artwork View** — selecting the artwork from Wall View moves into the artwork itself.
- Artwork depth exposes structural placeholders for **Image Detail**, **Description Plaque**, and **Blurblets**.
- **Thumbnail View** — a non-spatial quick selector for the exhibit's artworks.

## Persistent exhibit controls

The recovered persistent controls are present at the bottom of the exhibit surface:

- `LEFT`
- `RIGHT`
- `THUMBNAIL`
- `DOOR`

In Room/Corner views, Left and Right move the camera to the corresponding corner. In Wall/Artwork depth, Left and Right move among artworks while staying in the exhibit viewing system.

## Structural limits

- Artwork boxes are placeholders only. No exhibit art style, wall decoration, room theme, exact architectural dimensions, or final animation timing is locked by this shell.
- The perspective geometry is a functional prototype for the previously established discrete camera positions. It is not a claim that exact room measurements were recovered from the historical record.
- **Mosaics remain a separate presentation system.**
- The reusable left-to-right scrolling-wall overlay used by SALON ECLECTIQUE and other temporary/ranked sets remains a separate view family: centered artwork, partial neighboring artworks at the sides, and downward scroll to plaque then Blurblets.
- The small `MUSEUM` control remains temporary prototype navigation and does not reserve exhibit geometry.

---

# Exhibit left-corner geometry — v7

The LEFT CORNER VIEW is now a deterministic hard-coded construction for the
1536 × 504 CSS landscape viewport used in the approved capture.

- Corner scene: 1536 × 449 px
- Bottom navigation: 55 px
- Base artwork viewport: 300 × 300 px
- Art 1: x=618, y=75; its center is exactly x=768
- Art 2: x=1078, y=75
- Divider: x=450, width=8, height=449
- Art 22 source square: 300 × 300 at x=220, y=0 before projection
- Art 22 projected corners: (220,0), (370,75), (370,375), (220,450)
- Art 22 visible width: 150 px
- Art 22 left edge: 450 px (1.5 × base)
- Art 22 right edge: 300 px (same as base)
- No fake wall wedges, floor/ceiling shapes, or shadows appear in LEFT CORNER VIEW.
- Other exhibit views are intentionally left unchanged in this geometry pass.

---

# Exhibit left-corner geometry — v8 viewport fit

Corrects the earlier assumption that the 1536-pixel screen capture was
1536 CSS pixels. The actual landscape page viewport is 980 CSS pixels wide.

LEFT CORNER VIEW:
- Full viewport: 980 × ~337 CSS px
- Bottom controls: 37 px
- Art scene: 980 × 300 px
- Base square: 200 × 200 px
- Spacing unit: 47.5 px
- Divider: x=295, width=8
- Art 1: x=390, y=50; exact center x=490
- Art 2: x=685, y=50
- Art 22 nominal square slot: x=47.5, y=50, 200 × 200
- Art 22 visible warped corners:
  (147.5,0), (247.5,50), (247.5,250), (147.5,300)
- Art 22 visible width: 100 px
- Art 22 left edge: 300 px
- Art 22 right edge: 200 px

---

# Exhibit left-corner geometry — v9

Implements the accepted 15% enlargement and 0.20x right-side margin.

Fixed geometry:
- Viewport width: 980 CSS px
- Scene height: 300 CSS px
- Art square: 230 × 230 CSS px
- Spacing unit x: 65.9090909 px
- Art 1: left 375, top 35; exact center x=490
- Art 2: left 736.8181818, top 35
- Right margin after Art 2: 13.1818182 px = 0.20x
- Divider: left 235.1818182, width 8
- Art 22 visible left blank: 54.2727273 px
- Art 22-to-divider gap: 65.9090909 px = 1x
- Art 22 visible width: 115 px
- Art 22 left edge: 345 px high
- Art 22 right edge: 230 px high
- Art 22 clips 22.5 px above and below the 300 px scene by design.

---

# Exhibit geometry — v10 completed room-view family

This pass finishes the structural room-view family around the approved v9
left-corner geometry.

- LEFT CORNER: unchanged approved v9 geometry.
- RIGHT CORNER: exact horizontal mirror of LEFT CORNER.
- WALL: three equal 230 × 230 placeholders using the exact same 131.8181818px
  gap as the two normal artworks in the approved corner. Side margins are
  13.1818182px.
- DOOR: the old fake full-room perspective illustration is removed. The Door
  control now opens a plain wall with one centered 230 × 230 placeholder labeled
  DOOR. No exhibit image assets are used for this temporary Door design.
- The persistent LEFT / RIGHT / THUMBNAIL / DOOR controls remain fixed at the
  bottom at 37px high.
- Artwork detail and Thumbnail views remain available.
- The legacy opening-corner label ART 22 remains temporary and can be renumbered
  later when the entry sequence is finalized.

---

# Exhibit room views — v11 cache-safe repair

The v10 screenshots revealed a mixed-version browser load: the new v10 HTML
was being displayed with older cached exhibit CSS/JS. That is why raw DOOR /
ART buttons appeared at the upper left and why RIGHT behaved like the older
prototype navigation.

v11 fixes the delivery problem rather than changing the approved geometry:

- `exhibit.html` now loads `exhibit-v11.css` and `exhibit-v11.js`.
- The new filenames force a fresh browser/GitHub Pages asset request.
- DOOR, LEFT CORNER, RIGHT CORNER, WALL, ARTWORK, and THUMBNAIL are mutually
  exclusive display states.
- DOOR shows only the centered temporary DOOR wall placeholder.
- LEFT CORNER remains the approved v9 geometry.
- RIGHT CORNER remains its exact mirror.
- WALL remains the three-square 230px layout.
- LEFT and RIGHT from DOOR open their corresponding corner.
- RIGHT from LEFT CORNER opens RIGHT CORNER; it no longer falls back into the
  stale Door/Room prototype.
- Thumbnail remains available; no user retest of the broken v10 build is needed.

---

# Exhibit room views — v12 wall-navigation repair

v11 contained the WALL surface and its correct 230px geometry, but the directional
buttons skipped it: LEFT/RIGHT from a corner jumped directly between corner states.
That is why the wall was never seen.

v12 changes only navigation/state sequencing:

RIGHT:
DOOR -> LEFT CORNER -> WALL -> RIGHT CORNER -> DOOR

LEFT:
DOOR -> RIGHT CORNER -> WALL -> LEFT CORNER -> DOOR

The WALL surface itself is unchanged:
- three 230 x 230 squares
- ART 1 / ART 2 / ART 3 in temporary numbering
- same approved inter-art spacing as the normal artwork pair in the corner view
- existing corner geometry remains untouched

THUMBNAIL and artwork detail remain available independently.

---

# Exhibit room views — v13 artwork-position renumbering

This release applies the approved artwork shift without moving either door or
changing any approved geometry.

Physical-position mapping:
- former ART 22 position -> ART 1
- former ART 1 position -> ART 2
- former ART 2 position -> ART 3
- continuing the same way through former ART 21 -> ART 22

Door positions are intentionally unchanged:
- Door 1 remains physically between ART 22 and ART 1.
- Door 2 remains physically between ART 8 and ART 9.

Current prototype surfaces therefore show:
- Left corner: ART 1 | divider | ART 2, ART 3
- Straight wall: ART 2, ART 3, ART 4
- Right-corner geometry: the same physical mirrored slots, now labeled ART 3,
  ART 2, and peripheral ART 1.

No CSS geometry values were changed.

---

# Exhibit room — v14 complete 24-position circuit

v14 converts the solved geometry into the complete room circuit.

## Fixed physical sequence

`DOOR 1 -> ART 1 -> ART 2 -> ART 3 -> ART 4 -> ART 5 -> ART 6 -> ART 7 -> ART 8 -> DOOR 2 -> ART 9 -> ART 10 -> ART 11 -> ART 12 -> ART 13 -> ART 14 -> ART 15 -> ART 16 -> ART 17 -> ART 18 -> ART 19 -> ART 20 -> ART 21 -> ART 22 -> DOOR 1`

Door positions do not move:
- Door 1 remains between ART 22 and ART 1.
- Door 2 remains between ART 8 and ART 9.

## Full-room navigation model

The 24 fixed positions form four six-position wall runs. The approved opening
corner is between ART 1 and ART 2. Subsequent corners occur every six physical
positions, after ART 7, ART 12, and ART 18.

RIGHT advances one physical position around the room. LEFT reverses one physical
position. Every camera state shows three consecutive physical positions.

At a corner, the renderer automatically switches between the approved exact
LEFT CORNER and mirrored RIGHT CORNER geometry. On a flat run it uses the
approved three-square WALL geometry. No geometry numbers changed.

## Door appearances from inside

Each physical door appears naturally in the three consecutive camera windows
that include its fixed slot — six inside-room door appearances total across the
two doors.

For now every inside door is only a black geometry placeholder:
- 230px wide, exactly one artwork-slot width
- top = 35px, identical to artwork top
- bottom = 300px scene edge
- height = 265px
- solid black
- no visible label or decoration

If a door occupies the peripheral corner slot it inherits the same approved
perspective transform as that physical slot.

## Entry door state

The separate DOOR control still opens the temporary entry placeholder. The final
blurred-room/whip transition remains intentionally deferred. RIGHT from that
placeholder enters the approved opening corner at ART 1 / ART 2.

Artwork-click and thumbnail experiences are intentionally not redesigned in this
release; v14 is the room-construction pass.
