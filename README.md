# MASHpedition — Residence Shell 0.0.1

First clean implementation shell for MASHPEDITION.

This build deliberately uses **current MASHPEDITION concepts only**. It does not import the visual language, limits, progression rules, or game logic of Billy Labs / Emoji Kitchen Explorer.

## What this shell establishes

- Landscape-first Residence.
- Standard Residence occupies two landscape screens.
- Upper geometry:
  - compact Identity area on the left;
  - Microflex Board center-left;
  - Atelier on the right.
- Atelier contains eight artwork positions in a 2 × 4 arrangement.
- The upper four align with the Microflex Board region.
- The lower four continue on the second Residence screen.
- Gallery, Trophy Room, and Collection occupy the lower-left area and align conceptually with the lower Atelier half.
- Mailbox, Guestbook, and Trick-or-Treat Box are present as compact Residence objects.
- All destinations are navigation hooks only. They open explicit placeholders rather than inventing unfinished systems.

## Visual policy

The styling is intentionally new and restrained. It is **not** a recreation of any older mockup. The current goal is to validate geometry, proportions, phone-landscape behavior, and navigation relationships before committing to final MASHPEDITION art direction.

## Run

No build tooling is required. Open `index.html` in a browser.

For local serving:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Current implementation boundary

This is the Residence shell only. It does not yet implement Gallery organization, Collection exhibits, Trophy systems, Atelier management, Microflex generation, mailbox/guestbook behavior, Blurblets, plaques, FYC, SALON ECLECTIQUE, or the reusable Exhibit room engine.
