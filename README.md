# MASHpedition v220 — Fixed 980px Scene Fit

Targeted fix only. The locked 980px Entrance / Left / Right / Wall / Aerial canvases now scale as a unit when the actual viewport is narrower than 980 CSS px. At the measured Chrome viewport of 821px the scale is exactly 821/980 = 0.837755..., the inverse of the observed 980/821 = 1.193666... chonky enlargement. Internal 980px geometry, plates, typography, Museum Foundry optical calibration, thumbnails, controls, and all unrelated behavior are unchanged.

Includes the v219 viewport diagnostic page.
