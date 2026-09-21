# EASTON-001 — Demand Validation

Goal: validate demand for recurring trash-bin cleaning in North Easton, MA, immediately after trash pickup.

## Experiment
- 30–50 homes on one tight confirmed pickup route.
- Leave-behind: **“Your bin just got cleaned.”** + QR code.
- QR target: `/?route=EASTON-001`.
- Funnel: homes touched → visits → CTA clicks → leads → $19/month price acceptance.
- No accounts. No payments. No platform build.

## Collection architecture
Static mobile page → `POST /api/collect` → Supabase `easton_events`.

The browser never receives database credentials. The serverless collector accepts only the three experiment event types and stores contact/address only on `lead_submit`.

### Deploy
1. Create/connect a Supabase project and run `supabase/schema.sql`.
2. Deploy this repository to Vercel.
3. Set Vercel environment variables `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
4. Open `/?route=EASTON-001` on a phone and submit a test lead.
5. Verify `visit`, `cta_click`, and `lead_submit` rows exist before printing the QR code.

**Field gate: do not run EASTON-001 until that end-to-end test passes.**

## Principle
Build → Measure → Learn. Stop or revise the offer if the data says no.
