# EASTON-001 — Demand Validation

Goal: validate demand for recurring trash-bin cleaning in North Easton, MA, immediately after trash pickup.

## Experiment
- 30–50 homes on one tight confirmed pickup route.
- Leave-behind: **“Your bin just got cleaned.”** + QR code.
- QR target: `/?route=EASTON-001`.
- Funnel: homes touched → visits → CTA clicks → leads → $19/month price acceptance.
- No accounts. No payments. No platform build.

## Data
The MVP logs `visit`, `cta_click`, and `lead_submit` locally for smoke testing. Before field deployment, set `ENDPOINT` in `app.js` to a lightweight collection endpoint so real events and leads are captured centrally.

**Field gate: do not run EASTON-001 until the endpoint is configured and verified.**

## Principle
Build → Measure → Learn. Stop or revise the offer if the data says no.
