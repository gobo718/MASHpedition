MASHpedition v222 — Universal Menu Bar + Layout-Class Foundation

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


v223 Residence correction: keeps both reduced-height Residence screens plus one real menu-bar-height of clearance below Screen 2, so its bottom can scroll fully above the fixed bar. No typography calibration, protected Residence geometry, or unrelated page behavior changed.


v224 Annex map correction
- Fits the complete Annex map into the usable viewport above the persistent menu bar.
- Fit uses both available width and available height.
- Uniform map scaling preserves the Installation as a mathematically regular hendecagon.
- Browser/fullscreen changes recalculate the fit.
- No Museum Foundry calibration, Annex wording, plate geometry, Installation player geometry, or unrelated page behavior changed.


v225 Thumbnail menu correction
- Removes LEFT and RIGHT from the context-sensitive menu in every thumbnail view.
- Thumbnail pagination remains PAGE PREV / PAGE NEXT.
- LEFT / RIGHT behavior outside thumbnail views is unchanged.
- No layout, typography, plate, Annex, or Museum Foundry changes.


v226 universal menu ordering pass
- Canonical relative order: LEFT, RIGHT, PREV, NEXT, ENTRANCE, EXHIBIT, THUMBNAILS, ENDLESS, SUBLOCATION, MUSEUM, FULL/BROWSER.
- Absent controls simply disappear; remaining controls keep canonical relative order.
- Existing AERIAL is preserved (not removed) and remains adjacent to the Exhibit navigation group.
- Thumbnail contexts continue to hide LEFT/RIGHT.
- PAGE PREV/PAGE NEXT labels are normalized to PREV/NEXT.
- FULL/BROWSER remains one state-dependent final control.
- No typography calibration, plate geometry, scene geometry, or unrelated behavior changed.


v227 FYC typography regression repair: removed the FYC-only Georgia override and restored the established Museum Foundry/SmallCaps signage treatment to FYC Entrance identity and supporting copy. Wording, door geometry, plate geometry, menu geometry, and unrelated behavior are unchanged.


v228 FYC runtime repair
- Fixes the v227 startup exception caused by painting lowercase FYC Museum Foundry glyphs before the glyph calibration sets were initialized.
- Defers only the FYC supporting-copy paint until after those existing calibration tables/functions are ready.
- Restores execution of the remainder of exhibit.js, including LEFT/RIGHT/ENTRANCE/AERIAL/EXHIBIT/THUMBNAILS/ENDLESS/FULL handlers.
- MUSEUM remained functional because it is a normal link and did not depend on the aborted JS.
- No Museum Foundry calibration values, plates, door geometry, menu geometry, wording, or unrelated behavior changed.


v229 Parade rename + repair
- ENDLESS is renamed to PARADE in the user-facing view/menu vocabulary.
- Existing internal `endless` state keys/classes are intentionally retained to avoid a risky unrelated refactor.
- Integrated Exhibit viewer now labels the sequential feed PARADE / PARADE VIEW and accepts `start=parade` while retaining legacy `start=endless` compatibility.
- Standalone sequential-feed page is retitled PARADE. THUMBNAILS and PARADE are now explicit mode buttons rather than one ambiguous toggle.
- Standalone Thumbnail mode hides LEFT/RIGHT, matching the universal Thumbnail-menu rule; Parade restores LEFT/RIGHT.
- No typography calibration, plate geometry, artwork geometry, or unrelated page behavior changed.


v230 Parade runtime repair
- Restored the missing paintEndlessSlot() renderer used by the shared Exhibit viewer.
- PARADE buttons were correctly wired in v229, but clicking them called renderEndless(), which immediately failed because paintEndlessSlot() did not exist.
- The restored renderer uses the same result/art numbering rules as Thumbnail View and preserves Zazzly/emoji-pair art labels.
- No menu order, typography calibration, plate geometry, or unrelated layout behavior changed.


v231: PARADE view switch is now committed before result-card painting; Parade slots/status are null-safe. Both exhibit CSS and JS cache keys bumped to 231.
