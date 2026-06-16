# TrustSignal

TrustSignal is a product in the Cybersecurity Suite.

## Promise

See whether a domain earns trust before users do.

TrustSignal checks domain posture, security headers, mail authentication, and public trust signals so teams can fix credibility gaps before customers or attackers notice.

## Current v1

- Bespoke product cockpit UI
- Live product-specific intake
- `POST /api/intelligence`
- Product-specific scoring and action queue
- Contributor mission lanes
- Mobile-friendly layout

## Contributor Missions

- Security header scanner: Implement live header checks with explanations.
- DNS/Mail auth checks: Add SPF, DKIM, and DMARC validation.
- Trust report export: Generate client-ready domain posture reports.
- Monitoring mode: Track drift and notify when trust weakens.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
