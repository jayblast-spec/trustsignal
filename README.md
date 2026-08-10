<div align="center">

# TrustSignal

### Domain Security, Graded in Seconds

TrustSignal scans any domain and returns an instant A–F security grade, checking HTTPS enforcement, security headers, CSP, and HSTS so you know what you're dealing with before you trust it.

<p>
  <a href="https://trustsignal-delta.vercel.app"><img alt="Live Demo" src="https://img.shields.io/badge/Live-Demo-1D4ED8?style=for-the-badge&logo=vercel&logoColor=white"></a>
  <a href="https://github.com/jayblast-spec/trustsignal"><img alt="GitHub Repo" src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white"></a>
</p>

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-App%20Router-000000?style=flat-square&logo=next.js&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-19-1D4ED8?style=flat-square&logo=react&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind%20CSS-4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white">
  <img alt="Framer Motion" src="https://img.shields.io/badge/Framer%20Motion-Interaction-1D4ED8?style=flat-square&logo=framer&logoColor=white">
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-Deployment-000000?style=flat-square&logo=vercel&logoColor=white">
</p>

<p>
  <img alt="Animated TrustSignal headline" src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=18&duration=2600&pause=650&color=1D4ED8&center=true&vCenter=true&width=760&lines=Enter+a+domain+%E2%86%92+instant+A-F+grade;HTTPS%2C+CSP%2C+HSTS+checked+in+seconds;Security+headers+audited%2C+not+guessed;Know+before+you+trust">
</p>

</div>

## What It Does

TrustSignal takes a domain and produces an instant A–F security score by evaluating whether HTTPS is properly enforced and auditing its security headers — Content-Security-Policy, HTTP Strict-Transport-Security, and related response headers — so the result is a single readable grade instead of a raw header dump.

## How It Works

- Next.js App Router front end (`app/page.tsx`), styled with Tailwind CSS 4 and animated with Framer Motion, using the Geist font family.
- `app/api/scan/route.ts` performs the live header/HTTPS scan server-side; `app/api/intelligence/route.ts` adds an analysis layer that turns raw scan results into the A–F grade and summary.
- No account or API key is required — a domain goes in, a grade comes back.

## Live

Production: **https://trustsignal-delta.vercel.app**

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Motion | Framer Motion |
| Server Logic | Next.js API routes (`/api/scan`, `/api/intelligence`) |
| Deployment | Vercel |

<p align="center">
  <img alt="ArkNet Digital" src="https://capsule-render.vercel.app/api?type=rect&height=70&color=0:1D4ED8,55:0B1E3D,100:020617&text=ArkNet%20Digital%20%7C%20Contact%3A%20michael%40arknet.digital&fontColor=FAFAFA&fontSize=16&fontAlign=50&animation=fadeIn">
</p>
