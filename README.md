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


## Exhibit View v7 — 2026-09-08

This revision replaces the earlier freeform room mock with the user-specified fixed exhibit camera circuit.

Key rules implemented:
- Never show more than 3 mashups at once.
- No floor or ceiling. The player is visually inside a cube-like room perimeter.
- Three reusable room compositions only: LEFT CORNER, STRAIGHT WALL, RIGHT CORNER.
- LEFT CORNER shows: angled side-wall image, corner, front-center image, front-right image.
- STRAIGHT WALL shows exactly 3 front-facing images.
- RIGHT CORNER shows: front-left image, front-center image, corner, angled side-wall image.
- Door is a fixed architectural position in the sequence, not just a generic back button.

24-state room circuit implemented:
1. 22 / corner / 1 / 2
2. 1 / 2 / 3
3. 2 / 3 / 4
4. 3 / 4 / 5
5. 4 / 5 / 6
6. 5 / 6 / corner / 7
7. 6 / corner / 7 / DOOR
8. 7 / DOOR / 8
9. DOOR / 8 / 9
10. 8 / 9 / 10
11. 9 / 10 / 11
12. 10 / 11 / corner / 12
13. 11 / corner / 12 / 13
14. 12 / 13 / 14
15. 13 / 14 / 15
16. 14 / 15 / 16
17. 15 / 16 / 17
18. 16 / 17 / corner / 18
19. 17 / corner / 18 / 19
20. 18 / 19 / 20
21. 19 / 20 / 21
22. 20 / 21 / DOOR
23. 21 / DOOR / 22
24. DOOR / 22 / corner / 1

The DOOR control jumps to the canonical straight-on door position: 7 / DOOR / 8.
Thumbnail View still provides direct access to ART 1–22.


## Exhibit View v9 — 2026-09-08

Corrections / interaction pass:
- Straight-wall states now use three truly equal-sized, equally aligned, non-distorted wall slots. The center image is no longer enlarged.
- Horizontal swipe is supported across the exhibit room surface, including straight-wall states and Thumbnail View. Swipe left moves one state forward around the 24-state circuit; swipe right moves one state backward. This mirrors the RIGHT / LEFT controls.
- Thumbnail View retains all 22 room thumbnails on one screen, arranged 7 / 8 / 7. The 7-item top and bottom rows are centered.
- Grand Exhibition Hall exhibit addressing is capped at 66 (`MAX_EXHIBITS = 66`); any requested exhibit index above 66 clamps to 66. This matches the current 66-Theme ceiling rather than allowing stray 88-exhibit values.


## Exhibit View v10 — 2026-09-08

Fast correction pass to separate the exhibit room circuit from the endless-wall browser concept.

What changed:
- The exhibit room remains the fixed 24-state room circuit with corners and fixed DOOR positions.
- The room's head-on three-art states are relabeled as FRONT WALL VIEW rather than being treated as a separate endless-wall system.
- FRONT WALL presentation was corrected to look like three equal artworks hanging on a wall, with more visible wall space around them.
- Added a separate ENDLESS WALL VIEW prototype on the same surface: no doors, no corners, no wrapping topology, just the repeated 3-art sequence 1/2/3 -> 2/3/4 -> 3/4/5 and so on forever.
- THUMBNAIL cycles to THUMBNAIL VIEW, then ENDLESS WALL VIEW, then back to the exhibit room.
- In ENDLESS WALL VIEW, LEFT/RIGHT and swipe move through the repeating 3-art sequence.
- DOOR from ENDLESS WALL VIEW returns to the exhibit room.

This is a fast structural correction so the two systems stop being conflated.


## v10 — Exhibit vs Endless Wall separation

The earlier build incorrectly conflated the Exhibit room's front-facing camera composition with the separate Endless Wall browsing system. They are now separate surfaces.

### Exhibit View
- Remains a physical 22-position exhibit room with the existing 24-state camera circuit.
- It still includes left-corner, front-wall, and right-corner camera positions, including the fixed architectural door positions previously specified.
- Front-wall camera positions now use three equal, normally sized framed works with visible wall around them.
- The user-facing label now says EXHIBIT — FRONT WALL so it is not confused with Endless Wall.

### Endless Wall
- New separate `endless-wall.html` surface.
- No room topology.
- No doors.
- No corners.
- No dedicated exhibit spots.
- No wraparound.
- It simply repeats the Exhibit front-wall visual component forever: 1/2/3, then 2/3/4, then 3/4/5, etc.
- Horizontal swipe and LEFT/RIGHT controls advance the sequence by one item.
- Thumbnail View is a moving 22-item browsing window, arranged 7/8/7 with the first and last rows centered.
- SALON ECLECTIQUE temporarily links to this surface because SALON uses the non-room scrolling-wall family rather than dedicated exhibit-room topology.

---

# Shared Viewing Matrix Restoration — 2026-09-08

The previously established area/view matrix is restored without changing the Museum, Residence, Lab, or Studio geometry.

- Mix A = Thumbnails + Endless Wall
- Mix B = Exhibit View + Room View + Thumbnails
- Mix C = Exhibit View + Room View + Thumbnails + Endless Wall

Area routing:
- Grand Exhibition Halls = Mix B
- SALON ECLECTIQUE = Mix A
- For Your Consideration = Mix A
- Gallery = Mix A
- Collection = Mix B
- Catacombs · Theme = Mix A
- Catacombs · Search (no Theme specified) = Mix C

Rules preserved:
- Exhibit View is only available where the result can populate Theme spots.
- GEH 1ST / 2ND / 3RD controls appear only in Exhibit View and Thumbnail View; Room View remains first-place only.
- Endless Wall is linear: no doors, no corners, no wrapping.
- Endless Wall reuses the same three-image straight-wall dimensions as Room View.
- Thumbnail View uses 22 positions in a centered 7 / 8 / 7 arrangement.
- Generic large sets page 22 thumbnails at a time instead of rendering the full set at once.
- Mosaics remain separate and are not routed through this viewer.


---

# v43 — Museum Geography + Exhibit Entrance Template — 2026-09-10

- Museum Hub left top-band label changed from `CATACOMBS · THEME` to player-facing `CATACOMBS`; its existing `cat-theme` route is preserved.
- Museum Hub right top-band slot changed from `CATACOMBS · SEARCH` to `COMMON GROUNDS CAFÉ`.
- `common-grounds.html` is a neutral Common Grounds destination shell only. It does **not** use Exhibit/Aerial and does not invent the still-TBD Installation geometry.
- `exhibit-entrance.html` is a separate, generic entrance-template shell for exhibit-capable museum destinations. It is **not** the Common Grounds entrance and is intentionally not wired into the Museum Hub yet.
- Existing v42 Exhibit/Aerial/Thumbnail/Endless viewer files and geometry were not modified.


## v44 — Exhibit Entrance Facades
- Replaces the temporary Door-only ENTRANCE view with the first shared exterior Exhibit facade.
- Geometry is calculated from the existing authoritative 980x300 scene and 230px Door 1 at x=375; no screenshot measurements used.
- Left of Door 1: large location banner. Right of Door 1: large emoji pair plus location-specific supporting copy.
- GEH: ordinal PLACE + “Selections Curated by Community Vote”.
- Collection: “Selections Curated by [resident username]”.
- Catacombs: search details + “Selections Curated by Community Vote”.
- No single Theme appears on the entrance; Themes represent individual selections inside the Exhibit.
- Query samples: `?area=geh&rank=1&emojis=😀%20😎`, `?area=collection&resident=Creator01&emojis=🎭%20✨`, `?area=cat-search&search=SEARCH%20DETAILS&emojis=👻%20🌙`.

v45 entrance alignment refinement (2026-09-10):
- Raised the left location-name banner using the internal 980x300 entrance coordinate system.
- Right-side emoji block now starts at the same internal Y coordinate as the location banner.
- Increased vertical separation between emoji, rank/search detail, and selections message.
- No viewer geometry or non-Entrance behavior changed.

v46 (2026-09-10): Entrance emoji-only refinement. Raised emoji pair 8px while preserving the existing location, rank, and curator-line positions. Removed clipping on the entrance information container so native emoji glyphs are not cropped across their tops. No viewer geometry changes elsewhere.

## v47 — Entrance Final Refinements — 2026-09-10

- Collection entrance curator block moved down 8px without moving the location or emoji pair.
- Collection curator copy split into two lines: `Selections Curated by` followed by the dynamic resident username.
- Museum Hub `COMMON GROUNDS CAFÉ` label centered within its existing map box without changing the box geometry or museum geography.
- A GEH rank-selector edit in v47 targeted the wrong rank controls; that specific rank-control change is not authoritative and was corrected in v48.

## v48 — Art-Space Entrance Completion — 2026-09-10

- Preserves the valid v47 Collection and Common Grounds map refinements above.
- Restores the GEH Exhibit-room side rank controls to their established left `1ST–5TH` / right `6TH–10TH` arrangement.
- GEH Thumbnail rank selector keeps its established 2-column × 5-row geometry but reads row-major: `1ST 2ND`, `3RD 4TH`, `5TH 6TH`, `7TH 8TH`, `9TH 10TH`.
- FOR YOUR CONSIDERATION entrance: `Freshly Painted Selections Begging for Your Opinion`; no entrance emoji pair, rank, or community-curated line.
- PRIVATE GALLERY entrance: `The Works of [USERNAME]`; no entrance emoji pair or curator line.
- SALON ECLECTIQUE entrance: `Bespoke selections tailored to your requests, presented via curation by a personal docent.`; no entrance emoji pair.
- Standard emoji-pair Exhibits use the exhibit-wide entrance emoji pair consistently for artwork display; mixed-pair art spaces are excluded from that rule.
- Entrance rule: show an emoji pair only when every image in that Exhibit shares that pair.

## v50 — Art-space presentation cleanup
- GEH selected rank persists when returning to ENTRANCE; selecting 6TH renders 6TH PLACE.
- Removed presentation-level Theme from normal viewer identity. Theme is set-level context only when Theme defines the result set (currently Theme-filtered Catacombs; Common Grounds Theme Top 20 will use the same rule when built).
- Presentation-level emoji pair remains only where the whole set shares the pair.
- For Your Consideration and Private Gallery no longer show a false shared emoji/Theme identity in Endless/Thumbnails.
- Salon Eclectique Endless/Thumbnails use docent name plus a deliberately vague selection description instead of emoji/Theme.
- Salon initial sample is 3–22 selections and avoids announcing a closed/final total, allowing the docent to offer more later.
- Approved room/viewer geometry preserved.

## v51 — Art-space internal presentation cleanup
- Private Gallery entrance copy centered, raised, enlarged, and split into The Works of / [USERNAME].
- Removed presentation-level emoji/Theme identity from FYC, Salon Eclectique, and Private Gallery Endless/Thumbnails.
- Catacombs non-Exhibit views remove generic emoji/Theme identity; Thumbnails uses smaller DETAILS OF SEARCH and Endless uses search details.
- LEFT/RIGHT remain directional controls, not layouts.
- Approved viewer geometry remains unchanged.
