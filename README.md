## v260 — Residence Atelier Equal Thirds Margins + Unified Border Stroke
- Changed wide-mode Atelier square placement so horizontal surplus is distributed equally as left / center / right margins: 33.333% / 33.333% / 33.333%, across every Atelier pair on both Residence screens.
- Made the Atelier margin/background use the Residence white panel treatment instead of the grey surface showing through.
- Bound Atelier label borders and image borders to the same 1 CSS px stroke variable so their thickness is explicitly identical.
- Preserved square image sizing, stable Residence viewport-height math, label threshold/cap behavior, 20% / 40% / 20% / 20% partition, and unrelated behavior.

## v259 — Residence Atelier Stable Uniform Squares
- Fixed the actual wide-browser size snap: Residence screen height now uses the stable small viewport height, so browser chrome collapsing/expanding while scrolling cannot change Atelier sizing between Screen 1 and Screen 2.
- All eight Atelier images use the same square calculation. When a 20% Atelier cell is wider than the vertically permitted square, the image stays square and the unused width becomes equal left/right margin.
- Preserved v258 Atelier label top borders, center dividers, 20 CSS px label threshold, 3× font-size label cap, 20% / 40% / 20% / 20% partition, and unrelated behavior.

## v258 — Residence Atelier Label Top Borders + Square Wide-Mode Images
- Added the missing top border to every visible Atelier label box, completing the label rectangles while preserving the existing center dividers.
- Corrected Atelier image slots so their width cannot exceed their calculated image height. This preserves square image geometry in the wide browser case that previously stretched Screen 1 images wider than tall.
- Preserved the 20 CSS px label activation threshold, 3× font-size label-height cap, blank surplus above capped labels, 20% / 40% / 20% / 20% Residence partition, and all unrelated behavior.

## v257 — Residence Atelier Label Cap + Dividers
- Added the missing vertical center divider through each visible pair of Atelier label boxes.
- Preserved the 20 CSS px minimum top-space threshold before ATELIER n/8 words appear.
- Capped each visible Atelier label box at 3× its rendered font size.
- Once that cap is reached, any additional vertical surplus remains blank above the label; the label stays directly attached to the top of its image.
- Preserved the v256 20% / 40% / 20% / 20% Residence partition, eight Atelier positions, image geometry, portrait deferral, and all unrelated behavior.

## v256 — Residence Conformable Atelier System
- Reclassified the landscape Residence layout from Hybrid to Conformable while preserving the established 20% / 40% / 20% / 20% horizontal partition.
- Preserved eight Atelier positions across the two landscape Residence screens: ATELIER 1/8–4/8 on Screen 1 and ATELIER 5/8–8/8 on Screen 2.
- Atelier image geometry no longer controls the widths of the rest of Residence. Each Atelier cell conforms to its allotted 20% width and half-screen height.
- Any spare vertical room is reserved above the image only. At 0–19 CSS px it remains blank margin; at 20 CSS px or more the corresponding ATELIER n/8 label appears and the top label area expands with additional room.
- Portrait Residence remains a separate future composition; no portrait rebuild is included here.
- No Museum Foundry calibration, menu behavior, Concourse geometry, Entrance geometry, or unrelated page behavior changed.

## v255 — Concourse Bookshop South-Edge Trim
- Trimmed 10% from the Bookshop’s south/bottom side only.
- Preserved the Bookshop’s north/top edge and width; no other Concourse geometry changed.

## v254 — Concourse Café / Donor’s Club Clearance
- Narrowed the Common Grounds Café by 15% from the left only; its established right edge remains fixed.
- Shortened Donor’s Club by 15% from the top only; its established bottom edge remains fixed.
- Updated the Concourse responsive reference centers so those one-sided reductions remain correct across viewport sizes.
- No changes to Installation, Bookshop, Entrance, or other Concourse geometry.

## v253 — Entrance Location Whole-Word Font Fit
- Corrected the v252 LEFT Entrance location fitter so it never splits an individual word to satisfy the safe zone.
- Location labels now preserve normal word boundaries and dynamically shrink only as far as necessary to fit the existing protected 80% × 80% inner safe rectangle.
- Plate geometry, door geometry, right-side plates, wording, and Museum Foundry calibration remain unchanged.

## v252 — Entrance Location Safe-Zone Font Fit
- Added a narrowly scoped dynamic font fit to the LEFT Entrance location plate only.
- Preserves the established font size whenever the label fits inside a protected 80% × 80% inner safe zone (10% breathing room on every side).
- Shrinks only overflowing location text; plate dimensions, door geometry, right-side plates, and Museum Foundry calibration remain unchanged.
- Re-evaluates from the original stylesheet font size after viewport changes so typography can grow back when space returns.

## v251 — Universal simple Entrance plate width + height conformity
- Completed the Entrance-wide conformity sweep for the simple two-plate Entrance family: Private Gallery, For Your Consideration, and Salon Eclectique.
- Their left and right outer plates now share the same responsive side-territory width and the exact same rendered height at every landscape viewport shape.
- Collection, Grand Exhibition Hall, and Catacombs retain their intentionally different multi-element side compositions.
- Locked door geometry, plate spacing, wording, and Museum Foundry calibration are unchanged.

## v250 — Private Gallery Entrance right plate conforming width
- Private Gallery’s visible right-side `THE WORKS OF / USERNAME OF RESIDENT` plate now fills the existing universal 31.5% right-side plate territory instead of retaining its older content-sized maximum width.
- The locked Entrance door geometry, 37.5 / 25 / 37.5 architecture, plate positions, wording, and Museum Foundry calibration are unchanged.

## v249 — Entrance coordinate-space centering repair
- Audited the complete 20-screenshot Entrance set across For Your Consideration, Collection, Private Gallery, Grand Exhibition Hall, and Salon Eclectique instead of sampling only a few screenshots.
- Found the shared cause of the inconsistent centering: the universal Entrance solver measured the actual Door-view rectangle, but wrote those coordinates onto the inherited fixed 980×300 canvas, where they were scaled/offset a second time.
- Door views now use the actual Door-view rectangle as their canvas coordinate space, so the locked 37.5% / 25% / 37.5% architecture is centered consistently at every tested viewport shape.
- Door ratio (1:2.5), 15% minimum wall above, plate spacing, destination content, and Museum Foundry calibration are unchanged.

## v248 — Complete universal Entrance plate spacing
- Completed the locked landscape Entrance plate-spacing setup across every Entrance stack that currently contains multiple plates.
- Catacombs left stack remains: first plate 1/4 physical door width below door top; curation plate 1/8 physical door width below CATACOMBS.
- Grand Exhibition Hall right stack now uses the same 1/8 physical door width gap between its rank plate and community-vote curation plate.
- Collection, Private Gallery, For Your Consideration, and Salon Eclectique currently have no second plate in a side stack, so no inter-plate gap is required there; their universal first-plate/side-territory geometry remains active.
- Door geometry, destination content, plate side assignment, Museum Foundry calibration, and unrelated layouts remain unchanged.

## v247 — Universal landscape Entrance architecture
- Stretched the locked Catacombs landscape Entrance geometry to every Entrance.
- Every landscape Entrance now uses the actual Door-view rectangle with 37.5% left territory / 25% physical door / 37.5% right territory.
- Door remains 1:2.5, width-derived only, with at least 15% visible wall above; excess physical door may continue below the viewport.
- Left and right top plate territories use the same 3% outer/door inset and 31.5% plate width.
- First plates begin 1/4 door width below the physical door top. Stacked plates use 1/8 door width between plates.
- Existing destination-specific Entrance content and Museum Foundry calibration remain unchanged.

## v246 — Entrance initial inset + half-gap plate stacks
- Kept the first left/right Entrance plates **25% of physical door width** below the physical door top.
- Reduced spacing between successive plates to **12.5% of physical door width** (`entranceGap × 0.5`).
- The same initial-inset/inter-plate rule applies to left and right plate stacks.
- Door geometry, Museum Foundry calibration, temporary search controls, and unrelated layouts are unchanged.

## v245 — Entrance quarter-door-width plate spacing test
- Established one landscape Entrance spacing unit as **25% of the physical door width**.
- First left and right plates begin one spacing unit below the physical door top.
- Subsequent plates in a stack begin one spacing unit below the preceding plate.
- Because the door is locked at 1:2.5, the spacing unit is exactly 10% of total physical door height and remains valid when the door is vertically cropped.
- Door geometry, Museum Foundry calibration, and unrelated layouts are unchanged.

## v244 — Catacombs Entrance furniture shares the door-top datum
- Anchored the actual right-side Entrance information wrapper to the same computed `doorTop` used by the physical door and CATACOMBS plate.
- Kept Search Details nested in that wrapper instead of independently offsetting its contents.
- Positioned the curator plate immediately below the rendered CATACOMBS plate so the title cannot be clipped by the following plate.
- Door geometry and Museum Foundry calibration are unchanged.

## v243 — Catacombs Entrance Plates Follow Door Top
- Anchored the top of the Catacombs location plate and Search Details plate to the same computed `doorTop` used by the physical Entrance door.
- Preserved the locked 37.5% / 25% / 37.5% horizontal architecture, 1:2.5 door ratio, and 15% minimum wall-above rule.
- No Museum Foundry calibration or unrelated layout geometry changed.

# v242 — Catacombs Entrance Literal Door Geometry

- Replaced the Catacombs Entrance door's viewport-unit/cascade-dependent sizing with one explicit geometry calculation based on the actual usable Door view rectangle.
- Landscape horizontal architecture remains literal **37.5% left wall / 25% door / 37.5% right wall**.
- Door width is exactly **25% of the Door view width**; physical height is exactly **2.5 × door width**. Height never feeds back into width.
- Vertical placement is solved as `max(15% of usable height, usable height - physical door height)`: a fitting door sits on the floor with any extra wall above; a non-fitting door begins at the 15% wall line and continues below the clipped view.
- The solved pixel width, height, top, and minimum-wall value are exposed as nonvisual `data-geometry-*` attributes on the door for independent auditing.
- No Museum Foundry calibration, plate geometry, search-state semantics, or unrelated views were changed.

# v241 — Catacombs Entrance Composition Cleanup

- Locked the universal landscape Entrance facade at **37.5% left wall / 25% centered door / 37.5% right wall**.
- Locked the door at **1:2.5**. Its width is always 25% of viewport width; vertical space never narrows or distorts it.
- The door top never rises above the **15% minimum visible-wall line**. If the width-sized door is too tall, its lower portion is cropped below the viewport; if it is shorter, the additional space remains visible wall above it.
- Rebuilt Catacombs Entrance content inside equal left/right wall territories: CATACOMBS and curator copy on the left, active Search Details only on the right.
- Search Details is now content-height instead of an oversized empty billboard.
- Temporary Theme/Emoji state controls remain independent diagnostics at their booked 37.5% / 62.5% vertical centers and do not participate in Entrance furniture geometry.
- Museum Foundry calibration and unrelated views remain untouched.

## v240 — Catacombs Entrance measured door/crop correction

- Replaced the incorrect v239 230:265 responsive door assumption with Billy’s actual ruler-measured visible composition.
- Horizontal geometry uses the supplied 32/16 wall + 22/16 door + 32/16 wall relationship, limiting the visible doorway to 22/86 of the available width.
- Vertical geometry uses the supplied 7/32 visible wall above + 44/32 visible doorway, while respecting that another 22/32 of the physical door existed below the reference viewport. The visible black doorway is therefore square (44:44); the off-screen lower portion is not stretched into view.
- The doorway remains centered and reaches the menu-bar floor. When height is the limiting dimension, the 7:44 visible wall-to-door relationship is preserved; wider/taller layouts may naturally show additional wall.
- Museum Foundry glyph calibration/optical-centering math and unrelated views remain unchanged.

## v239 — Catacombs Entrance screenshot correction

- Corrected the responsive Catacombs Entrance door so it no longer stretches vertically with the viewport: it preserves the established 230:265 Door 1 aspect ratio, remains centered, reaches the menu-bar floor, and restores the measured visible wall band above it.
- Kept the Catacombs location stack on the left: `CATACOMBS` with `SELECTIONS CURATED BY COMMUNITY VOTE` beneath it.
- Kept the entire right plate exclusively for active Search Details; removed the accidental nested curator plate/search-text collision introduced in v238.
- Aligned the temporary Theme/Emoji search-state test controls with the left edge of the Entrance location stack.
- Made the Catacombs location title responsive enough to remain on one line in narrower landscape browser rectangles.
- Museum Foundry glyph calibration/optical-centering math and unrelated views remain unchanged.

# v238 — Catacombs Responsive Entrance

- Builds the Catacombs Entrance as the first implementation of the universal responsive Entrance architecture.
- Landscape uses the available game rectangle rather than shrinking a fixed 980×300 facade. The centered black door uses the measured 11/43 room-width proportion and reaches the menu-bar floor; location remains left and active Search Details remain right.
- Portrait intentionally breaks from the physical-rotation rule used by maps/machines: the door becomes a close-up background and one unified information panel begins at roughly 15% down the screen. Location is above one restrained divider; search/context information is below it.
- The portrait panel is structured as a reusable Entrance component; this build populates it for Catacombs only.
- Corrects Catacombs Exhibit applicability to the booked rule: any Theme search disables Exhibit view; with no Theme, Exhibit remains applicable for zero, one, or two searched emoji.
- Location/search emoji semantics are preserved: with no Theme, zero or one searched emoji keeps the current two-emoji Exhibit identity on the location side; two searched emoji are not redundantly duplicated there.
- Museum Foundry glyph calibration, room/art geometry, and unrelated views are unchanged.

# v237 — Catacombs Entrance Search Details Composition

- Catacombs Entrance now places `Selections Curated by Community Vote` directly beneath the `CATACOMBS` location plate.
- The whole right side is one variable Search Details plate; only active search filters are listed. Supported test/query fields include searched emoji, Theme, rank, modifier tags, submitted time frame, artist, and artist group.
- Searched emoji appear in Search Details; the Entrance distinguishes searched emoji from the current Exhibit’s location identity.
- Theme searches have no Exhibit view. With no Theme, Exhibit applicability remains available for zero, one, or two searched emoji.
- With no Theme, zero or one searched emoji can still show the current exhibit emoji pair on the left as location identity; a searched pair stays on the search side without redundant left-side duplication.
- Temporary Theme/No Theme and Emoji/No Emoji radio controls remain design scaffolding.
- Museum Foundry glyph calibration and unrelated room/art geometry are unchanged.

## v236 — Catacombs Theme + Emoji Search-State Test Controls

- Kept the existing temporary `SEARCH HAS: THEME / NO THEME` radio pair and added a matching temporary `SEARCH HAS: EMOJI / NO EMOJI` pair.
- Both test pairs use the established left location/status anchor. Theme is vertically centered in the 25–50% screen band; Emoji is vertically centered in the 50–75% band.
- `NO EMOJI` removes the Catacombs emoji identity from the lower-left presentation identity and from the Catacombs Entrance; `EMOJI` restores both.
- These remain design/test controls only; eventual Catacombs search state will drive the same presentation states automatically.
- No museum room/art geometry or Museum Foundry calibration was changed.

# MASHpedition — Cumulative README / Version History

Newest recorded version first. This file combines the preserved pre-v221 README with the v220–v231 README material. Historical text is preserved rather than reconstructed; versions that never had a README entry are not invented here.

## Recorded Version History

### v234 — Concourse Installation Back-Center Placement
- Moved the Installation hendecagon toward the back wall.
- Horizontally centers the regular hendecagon in the open span between Common Grounds Café and Bookshop.
- Uses the existing 3 CSS px Entrance-sign-to-black-door clearance as the exact back-wall-to-hendecagon clearance.
- Installation remains a regular hendecagon; destination plates and typography are not stretched.

## v233 Concourse rename + Hybrid responsive geometry
- ANNEX is now canonically CONCOURSE. Common Grounds remains specifically the Café within the Concourse.
- Museum Map destination label now reads CONCOURSE; Installation returns to CONCOURSE; the Café is labeled COMMON GROUNDS CAFÉ.
- Replaces v224 whole-map uniform scaling with Hybrid geometry: the Concourse canvas fills the entire usable viewport above the persistent menu bar.
- Destination boxes, typography, plates, and the Installation are not non-uniformly stretched. Instead, their established centers/edges are remapped across the available rectangle so the geography/negative space conforms.
- The Installation hendecagon is regenerated as a regular hendecagon at the responsive location using a single uniform radius scale.
- At the original 980×300 reference size, established positions reproduce the prior geometry exactly.
- Historical README entries retain the word Annex where that was the name at the time; history is not rewritten.

### v231: PARADE view switch is now committed before result-card painting; Parade slots/status are null-safe. Both exhibit CSS and JS cache keys bumped to 231.

### v230 Parade runtime repair
- Restored the missing paintEndlessSlot() renderer used by the shared Exhibit viewer.
- PARADE buttons were correctly wired in v229, but clicking them called renderEndless(), which immediately failed because paintEndlessSlot() did not exist.
- The restored renderer uses the same result/art numbering rules as Thumbnail View and preserves Zazzly/emoji-pair art labels.
- No menu order, typography calibration, plate geometry, or unrelated layout behavior changed.

### v229 Parade rename + repair
- ENDLESS is renamed to PARADE in the user-facing view/menu vocabulary.
- Existing internal `endless` state keys/classes are intentionally retained to avoid a risky unrelated refactor.
- Integrated Exhibit viewer now labels the sequential feed PARADE / PARADE VIEW and accepts `start=parade` while retaining legacy `start=endless` compatibility.
- Standalone sequential-feed page is retitled PARADE. THUMBNAILS and PARADE are now explicit mode buttons rather than one ambiguous toggle.
- Standalone Thumbnail mode hides LEFT/RIGHT, matching the universal Thumbnail-menu rule; Parade restores LEFT/RIGHT.
- No typography calibration, plate geometry, artwork geometry, or unrelated page behavior changed.

### v228 FYC runtime repair
- Fixes the v227 startup exception caused by painting lowercase FYC Museum Foundry glyphs before the glyph calibration sets were initialized.
- Defers only the FYC supporting-copy paint until after those existing calibration tables/functions are ready.
- Restores execution of the remainder of exhibit.js, including LEFT/RIGHT/ENTRANCE/AERIAL/EXHIBIT/THUMBNAILS/ENDLESS/FULL handlers.
- MUSEUM remained functional because it is a normal link and did not depend on the aborted JS.
- No Museum Foundry calibration values, plates, door geometry, menu geometry, wording, or unrelated behavior changed.

### v227 FYC typography regression repair: removed the FYC-only Georgia override and restored the established Museum Foundry/SmallCaps signage treatment to FYC Entrance identity and supporting copy. Wording, door geometry, plate geometry, menu geometry, and unrelated behavior are unchanged.

### v226 universal menu ordering pass
- Canonical relative order: LEFT, RIGHT, PREV, NEXT, ENTRANCE, EXHIBIT, THUMBNAILS, ENDLESS, SUBLOCATION, MUSEUM, FULL/BROWSER.
- Absent controls simply disappear; remaining controls keep canonical relative order.
- Existing AERIAL is preserved (not removed) and remains adjacent to the Exhibit navigation group.
- Thumbnail contexts continue to hide LEFT/RIGHT.
- PAGE PREV/PAGE NEXT labels are normalized to PREV/NEXT.
- FULL/BROWSER remains one state-dependent final control.
- No typography calibration, plate geometry, scene geometry, or unrelated behavior changed.

### v225 Thumbnail menu correction
- Removes LEFT and RIGHT from the context-sensitive menu in every thumbnail view.
- Thumbnail pagination remains PAGE PREV / PAGE NEXT.
- LEFT / RIGHT behavior outside thumbnail views is unchanged.
- No layout, typography, plate, Annex, or Museum Foundry changes.

### v224 Annex map correction
- Fits the complete Annex map into the usable viewport above the persistent menu bar.
- Fit uses both available width and available height.
- Uniform map scaling preserves the Installation as a mathematically regular hendecagon.
- Browser/fullscreen changes recalculate the fit.
- No Museum Foundry calibration, Annex wording, plate geometry, Installation player geometry, or unrelated page behavior changed.

### v223 Residence correction: keeps both reduced-height Residence screens plus one real menu-bar-height of clearance below Screen 2, so its bottom can scroll fully above the fixed bar. No typography calibration, protected Residence geometry, or unrelated page behavior changed.

### MASHpedition v222 — Universal Menu Bar + Layout-Class Foundation
Built from v221.

- Persistent bottom menu bar now exists on every current game page/system.
- FULL / BROWSER is available from each game menu bar.
- MUSEUM moved into the bar where applicable; Museum Map correctly omits MUSEUM.
- Existing Exhibit context bar remains the mature context-sensitive implementation.
- Standalone Endless bar now includes FULL / BROWSER.
- Residence Hybrid geometry now reserves one persistent bar across both scroll screens.
  Each Residence screen uses viewport height minus bar height; the right Atelier region is
  one square per screen and remains 2x2 (4 square art slots per screen, 8 total).
  Profile image is protected as proportional geometry; remaining Residence regions conform.
- Museum Map and Studio Map reserve bar space as conformable layouts.
- Lab reserves bar space as Hybrid; final square Machine Screen remains for the Lab geometry pass.
- Annex reserves bar space without changing protected Installation hendecagon geometry.
- No Museum Foundry calibration, exhibit plate geometry, exhibit room coordinates, or wording changed.

### MASHpedition v221 — Dynamic Game Viewport + Context Bar foundation
- Fixed 980 × 300 museum scenes now fit by BOTH available viewport width and height.
- Added FULL / BROWSER toggle using the browser Fullscreen API.
- Moved MUSEUM into the existing bottom game bar.
- Moved applicable PAGE PREV / PAGE NEXT controls into that same bar.
- The bar is context-sensitive: pagination controls appear only when applicable; existing capability controls retain their established visibility rules.
- Fixed the right-corner mirror so whole-scene viewport fitting is preserved there too.
- Removed the obsolete JS that positioned pagination relative to the old floating MUSEUM button.
- No Museum Foundry calibration, plate geometry, room coordinates, or content wording changed.

### MASHpedition v220 — Fixed 980px Scene Fit
Targeted fix only. The locked 980px Entrance / Left / Right / Wall / Aerial canvases now scale as a unit when the actual viewport is narrower than 980 CSS px. At the measured Chrome viewport of 821px the scale is exactly 821/980 = 0.837755..., the inverse of the observed 980/821 = 1.193666... chonky enlargement. Internal 980px geometry, plates, typography, Museum Foundry optical calibration, thumbnails, controls, and all unrelated behavior are unchanged.

Includes the v219 viewport diagnostic page.

### v219 diagnostic-only: added viewport-diagnostic.html and cache-bumped exhibit.html asset query strings to v219. No game CSS/JS/geometry/typography changes.

### v173 — Collection Thumbnail information plate targeted fix
- Changed only the Collection Thumbnail upper-left information plate sizing/centering.
- Width is 116px, derived from the existing 11-thumbnail layout's own 116px side reservation; no screenshot-estimated measurement.
- Existing Museum Foundry glyph/tier/optical calibration is untouched.
- No thumbnail, navigation, emoji, caption, or other screen geometry changed.

### v172 emergency calibration restoration
Restored every deliberate +2px typography calibration that v171 incorrectly removed. No other v171 fixes were reverted. Existing tuned typography offsets are protected design values; no new screenshot-derived offsets were introduced.

### v169 follow-up notes
- Common Grounds needs a smarter persistent bottom navigation bar; eliminate floating navigation buttons rather than adding more of them.
- Common Grounds café zone is expected to become an Annex-type area containing the café; final area name remains TBD.
- Common Grounds Installation hendecagon will later keep its size/orientation but move farther toward the back; entrance will be enlarged.
- Catacombs entrance: remove the placeholder DETAILS OF SEARCH box; align the curator/tagline top with the CATACOMBS plate and later provide substantial search-detail plate space on both sides beneath. Exact search-detail fields remain TBD.

### v85 — Zazzly 12-art room prototype
- Adds `area=zazzly` as a compact premium room using only the approved Exhibit 1 90-degree geometry.
- Physical circuit: south `12 | Door 4 | 1`; west `2–5`; north `6 | Door 5 | 7`; east `8–11`.
- Corner geometry is copied from Exhibit 1 at the four transitions (1/2, 5/6, 7/8, 11/12); no new perspective math was introduced.
- Zazzly artwork labels occupy global 67–78.
- Door 4 in Room 3 now opens the Zazzly room. Door 5 is present as the balanced north door but has no destination yet.
- Aerial/Thumbnails/Endless are intentionally withheld for this first room-only build rather than showing layouts that have not yet been designed for the 12-art room.

### v81 — Catacombs SEARCH HAS placement repair
- Explicitly positions SEARCH HAS controls against established viewer anchors.
- Exhibit selector moved above bottom controls to prevent overlap.
- Thumbnail selector mirrors PAGE PREV/NEXT in the lower-right blank edge.
- Endless selector uses the same lower baseline as page navigation.
- Aerial selector is compact and aligned to the center identity line.
- No approved room/art geometry changed.

### v74
- Corrected the Installation entrance wrap state: the entrance is one continuous black architectural side, not a 230px black artwork square.
- Black now fills the full 300px scene height from x=418.501px through the corner at x=713.501px in the `20 · entrance · 1 angled` state.
- Preserves v73 swipe navigation.

### v73
- Enabled horizontal swipe navigation in the Installation player view.
- Swipe left advances exactly one Installation state; swipe right moves back exactly one state.
- Uses a 42px minimum horizontal gesture and horizontal-dominance check to avoid accidental vertical swipes.
- Preserves v72 entrance/geometry unchanged.

### v69 Installation geometry QA
- Re-derived Installation perspective from one base size and one gap unit.
- Complete side frame mathematically fits inside 300px scene.
- Clockwise/counterclockwise are exact mirrored constructions.
- Navigation advances one artwork index per click.

### v68 Installation repair: one-artwork stepping, fixed clockwise/counterclockwise mirrored perception, restored approved Exhibit corner spacing, full four-edge perspective frames, and LEFT/RIGHT grouped at bottom-left.

### - v65: Installation artwork numbering now starts at the entrance and proceeds clockwise from 1 through 20.

### v64 Common Grounds Installation map
- Moved the INSTALLATION title to the top-left of the expanded map.
- Expanded the Installation hendecagon vertically to use the previously wasted top space.
- Preserved the regular 11-sided geometry, open entrance side, and 20 artwork positions.

### v58 — Emoji-pair Main-room location labels
- Corrects v57 scope: the booked `01 - Celebration` through `22 - Joy` names belong to the Main room's numbered locations anywhere an art-space location is defined by one shared emoji pair, not only the Exhibit presentation.
- Applies the names to Collection Main-room thumbnails/artwork detail as well as the already-labeled Exhibit/Aerial surfaces and GEH Main-room surfaces.
- Search/non-pair spaces remain result-labeled. Catacombs remains excluded from shared-pair naming.
- Existing rank suffixes remain and use `1st`, `2nd`, `3rd`, etc. casing.
- No geometry changed.

### v56 — Catacombs entrance top alignment
- Aligns the top of the right-side search block with the top of the left CATACOMBS text.
- Position is calculated from the established 980×300 entrance geometry, not estimated from the screenshot.
- No other entrance, thumbnail, room, or control geometry changed.

### v55 — Adaptive thumbnail invocation fix
- Fixes adaptive brick packing running while Thumbnail view was still hidden and therefore measuring a 0×0 grid.
- Thumbnail view is now activated first, then the optimizer measures the real canvas and applies the chosen brick composition.
- No optimizer rules or approved 22-item 7/8/7 geometry changed.

### v54 — Adaptive brick thumbnails
- Partial thumbnail pages (<22) now test every valid 1–3-row brick composition.
- Adjacent rows cannot contain the same number of thumbnails.
- The winning composition is the one that permits the largest square thumbnails in the existing thumbnail canvas.
- Each row and the complete stack are centered.
- The established 22-thumbnail 7 / 8 / 7 layout is unchanged.

### v53 — Catacombs entrance correction
- Catacombs Entrance no longer displays an emoji pair.
- Removed the stray upper-left DETAILS OF SEARCH element that leaked into Entrance.
- Entrance retains only the established right-side search details plus Selections Curated by Community Vote.
- Catacombs Thumbnails retain text-only DETAILS OF SEARCH with no emoji/Theme placeholder.
- Other v52 art-space cleanup remains unchanged.

### v52 — Verified internal identity cleanup
- Force-hides the actual legacy emoji/Theme block in Thumbnails and Endless for FYC, Salon Eclectique, and Private Gallery.
- Catacombs hides the legacy emoji/Theme children and uses dedicated DETAILS OF SEARCH context.
- Raises special entrance supporting copy on one shared high anchor.
- GEH and Collection identity behavior untouched.

### v51 — Art-space internal presentation cleanup
- Private Gallery entrance copy centered, raised, enlarged, and split into The Works of / [USERNAME].
- Removed presentation-level emoji/Theme identity from FYC, Salon Eclectique, and Private Gallery Endless/Thumbnails.
- Catacombs non-Exhibit views remove generic emoji/Theme identity; Thumbnails uses smaller DETAILS OF SEARCH and Endless uses search details.
- LEFT/RIGHT remain directional controls, not layouts.
- Approved viewer geometry remains unchanged.

### v50 — Art-space presentation cleanup
- GEH selected rank persists when returning to ENTRANCE; selecting 6TH renders 6TH PLACE.
- Removed presentation-level Theme from normal viewer identity. Theme is set-level context only when Theme defines the result set (currently Theme-filtered Catacombs; Common Grounds Theme Top 20 will use the same rule when built).
- Presentation-level emoji pair remains only where the whole set shares the pair.
- For Your Consideration and Private Gallery no longer show a false shared emoji/Theme identity in Endless/Thumbnails.
- Salon Eclectique Endless/Thumbnails use docent name plus a deliberately vague selection description instead of emoji/Theme.
- Salon initial sample is 3–22 selections and avoids announcing a closed/final total, allowing the docent to offer more later.
- Approved room/viewer geometry preserved.

### v48 — Art-Space Entrance Completion — 2026-09-10
- Preserves the valid v47 Collection and Common Grounds map refinements above.
- Restores the GEH Exhibit-room side rank controls to their established left `1ST–5TH` / right `6TH–10TH` arrangement.
- GEH Thumbnail rank selector keeps its established 2-column × 5-row geometry but reads row-major: `1ST 2ND`, `3RD 4TH`, `5TH 6TH`, `7TH 8TH`, `9TH 10TH`.
- FOR YOUR CONSIDERATION entrance: `Freshly Painted Selections Begging for Your Opinion`; no entrance emoji pair, rank, or community-curated line.
- PRIVATE GALLERY entrance: `The Works of [USERNAME]`; no entrance emoji pair or curator line.
- SALON ECLECTIQUE entrance: `Bespoke selections tailored to your requests, presented via curation by a personal docent.`; no entrance emoji pair.
- Standard emoji-pair Exhibits use the exhibit-wide entrance emoji pair consistently for artwork display; mixed-pair art spaces are excluded from that rule.
- Entrance rule: show an emoji pair only when every image in that Exhibit shares that pair.

### v47 — Entrance Final Refinements — 2026-09-10
- Collection entrance curator block moved down 8px without moving the location or emoji pair.
- Collection curator copy split into two lines: `Selections Curated by` followed by the dynamic resident username.
- Museum Hub `COMMON GROUNDS CAFÉ` label centered within its existing map box without changing the box geometry or museum geography.
- A GEH rank-selector edit in v47 targeted the wrong rank controls; that specific rank-control change is not authoritative and was corrected in v48.

### v46 (2026-09-10): Entrance emoji-only refinement. Raised emoji pair 8px while preserving the existing location, rank, and curator-line positions. Removed clipping on the entrance information container so native emoji glyphs are not cropped across their tops. No viewer geometry changes elsewhere.

### v45 entrance alignment refinement (2026-09-10):
- Raised the left location-name banner using the internal 980x300 entrance coordinate system.
- Right-side emoji block now starts at the same internal Y coordinate as the location banner.
- Increased vertical separation between emoji, rank/search detail, and selections message.
- No viewer geometry or non-Entrance behavior changed.

### v44 — Exhibit Entrance Facades
- Replaces the temporary Door-only ENTRANCE view with the first shared exterior Exhibit facade.
- Geometry is calculated from the existing authoritative 980x300 scene and 230px Door 1 at x=375; no screenshot measurements used.
- Left of Door 1: large location banner. Right of Door 1: large emoji pair plus location-specific supporting copy.
- GEH: ordinal PLACE + “Selections Curated by Community Vote”.
- Collection: “Selections Curated by [resident username]”.
- Catacombs: search details + “Selections Curated by Community Vote”.
- No single Theme appears on the entrance; Themes represent individual selections inside the Exhibit.
- Query samples: `?area=geh&rank=1&emojis=😀%20😎`, `?area=collection&resident=Creator01&emojis=🎭%20✨`, `?area=cat-search&search=SEARCH%20DETAILS&emojis=👻%20🌙`.

### v43 — Museum Geography + Exhibit Entrance Template — 2026-09-10
- Museum Hub left top-band label changed from `CATACOMBS · THEME` to player-facing `CATACOMBS`; its existing `cat-theme` route is preserved.
- Museum Hub right top-band slot changed from `CATACOMBS · SEARCH` to `COMMON GROUNDS CAFÉ`.
- `common-grounds.html` is a neutral Common Grounds destination shell only. It does **not** use Exhibit/Aerial and does not invent the still-TBD Installation geometry.
- `exhibit-entrance.html` is a separate, generic entrance-template shell for exhibit-capable museum destinations. It is **not** the Common Grounds entrance and is intentionally not wired into the Museum Hub yet.
- Existing v42 Exhibit/Aerial/Thumbnail/Endless viewer files and geometry were not modified.

### Exhibit View v10 — 2026-09-08
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

### Exhibit View v9 — 2026-09-08
Corrections / interaction pass:
- Straight-wall states now use three truly equal-sized, equally aligned, non-distorted wall slots. The center image is no longer enlarged.
- Horizontal swipe is supported across the exhibit room surface, including straight-wall states and Thumbnail View. Swipe left moves one state forward around the 24-state circuit; swipe right moves one state backward. This mirrors the RIGHT / LEFT controls.
- Thumbnail View retains all 22 room thumbnails on one screen, arranged 7 / 8 / 7. The 7-item top and bottom rows are centered.
- Grand Exhibition Hall exhibit addressing is capped at 66 (`MAX_EXHIBITS = 66`); any requested exhibit index above 66 clamps to 66. This matches the current 66-Theme ceiling rather than allowing stray 88-exhibit values.

### Exhibit View v7 — 2026-09-08
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

## Preserved Legacy Foundation / Reference Notes

The following material was present in the pre-v221 README but was not attached to a specific version number. It is preserved intact here instead of being assigned invented version numbers.

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
