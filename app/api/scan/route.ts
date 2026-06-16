export const maxDuration = 30;

export type CheckResult = {
  id: string;
  label: string;
  passed: boolean;
  value: string | null;
  description: string;
  weight: number;
};

export type ScanOutput = {
  domain: string;
  score: number;
  grade: "A" | "B" | "C" | "D" | "F";
  checks: CheckResult[];
  scannedAt: string;
};

function calcGrade(score: number): "A" | "B" | "C" | "D" | "F" {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 60) return "C";
  if (score >= 40) return "D";
  return "F";
}

export async function POST(request: Request) {
  let rawDomain: string;
  try {
    const body = await request.json();
    rawDomain = typeof body?.domain === "string" ? body.domain.trim().toLowerCase() : "";
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const domain = rawDomain
    .replace(/^https?:\/\//i, "")
    .replace(/\/.*$/, "")
    .replace(/^www\./, "");

  if (!domain || !/^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,}$/i.test(domain)) {
    return Response.json({ error: "Enter a valid domain (e.g. stripe.com)." }, { status: 400 });
  }

  let response: Response;
  let html = "";

  try {
    response = await fetch(`https://${domain}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; TrustSignal/1.0; +https://trustsignal.vercel.app)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      signal: AbortSignal.timeout(10000),
      redirect: "follow",
    });
    try {
      const text = await response.text();
      html = text.slice(0, 60000);
    } catch {
      html = "";
    }
  } catch {
    return Response.json({ error: "Could not connect to that domain. Check the spelling and try again." }, { status: 400 });
  }

  // HTTP → HTTPS redirect check
  let httpsRedirect = false;
  try {
    const httpRes = await fetch(`http://${domain}`, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; TrustSignal/1.0)" },
      redirect: "manual",
      signal: AbortSignal.timeout(6000),
    });
    const loc = httpRes.headers.get("location") ?? "";
    httpsRedirect =
      (httpRes.status >= 300 && httpRes.status < 400 && loc.startsWith("https://")) ||
      (httpRes.status === 200 && response.url.startsWith("https://"));
  } catch {
    httpsRedirect = response.url.startsWith("https://");
  }

  const h = response.headers;
  const cspValue = h.get("content-security-policy") ?? "";
  const hasFrameProtection =
    h.get("x-frame-options") !== null || cspValue.includes("frame-ancestors");
  const frameValue = h.get("x-frame-options") ?? (cspValue.includes("frame-ancestors") ? "CSP frame-ancestors" : null);

  const hasPrivacyLink = /href=["'][^"']*privac[^"']*["']/i.test(html) || /privacy\s+policy/i.test(html);
  const hasCookieNotice = /href=["'][^"']*cookie[^"']*["']/i.test(html) || /cookie\s+(policy|consent|notice)/i.test(html);

  const checks: CheckResult[] = [
    {
      id: "https",
      label: "HTTPS Enabled",
      passed: response.url.startsWith("https://"),
      value: response.url.startsWith("https://") ? "Yes" : "No",
      description: "All traffic is served over encrypted HTTPS connections.",
      weight: 20,
    },
    {
      id: "https-redirect",
      label: "HTTP → HTTPS Redirect",
      passed: httpsRedirect,
      value: httpsRedirect ? "Yes" : "No",
      description: "HTTP requests are automatically redirected to HTTPS.",
      weight: 10,
    },
    {
      id: "hsts",
      label: "HSTS Header",
      passed: h.get("strict-transport-security") !== null,
      value: h.get("strict-transport-security"),
      description: "Strict-Transport-Security forces HTTPS for all future visits, even if a user types http://.",
      weight: 15,
    },
    {
      id: "x-frame",
      label: "Clickjacking Protection",
      passed: hasFrameProtection,
      value: frameValue,
      description: "X-Frame-Options or CSP frame-ancestors prevents your site from being embedded in malicious iframes.",
      weight: 10,
    },
    {
      id: "x-content-type",
      label: "MIME Sniffing Protection",
      passed: h.get("x-content-type-options") === "nosniff",
      value: h.get("x-content-type-options"),
      description: "X-Content-Type-Options: nosniff stops browsers from guessing content types — a common XSS vector.",
      weight: 10,
    },
    {
      id: "csp",
      label: "Content Security Policy",
      passed: cspValue.length > 0,
      value: cspValue.length > 0 ? "Present" : null,
      description: "CSP restricts which scripts, styles, and resources can load on your page — dramatically reducing XSS risk.",
      weight: 15,
    },
    {
      id: "referrer-policy",
      label: "Referrer Policy",
      passed: h.get("referrer-policy") !== null,
      value: h.get("referrer-policy"),
      description: "Controls what referrer information is sent when users navigate away from your site.",
      weight: 5,
    },
    {
      id: "permissions-policy",
      label: "Permissions Policy",
      passed: h.get("permissions-policy") !== null || h.get("feature-policy") !== null,
      value: h.get("permissions-policy") ?? h.get("feature-policy"),
      description: "Restricts browser features like camera, microphone, and geolocation to prevent unauthorized access.",
      weight: 5,
    },
    {
      id: "privacy-policy",
      label: "Privacy Policy",
      passed: hasPrivacyLink,
      value: hasPrivacyLink ? "Found" : null,
      description: "A privacy policy link was detected on the homepage — a trust signal for users and a legal requirement in many regions.",
      weight: 5,
    },
    {
      id: "cookie-notice",
      label: "Cookie Notice",
      passed: hasCookieNotice,
      value: hasCookieNotice ? "Found" : null,
      description: "A cookie policy or consent mechanism was detected — required under GDPR and similar regulations.",
      weight: 5,
    },
  ];

  const score = checks.reduce((acc, c) => acc + (c.passed ? c.weight : 0), 0);

  return Response.json({
    domain,
    score,
    grade: calcGrade(score),
    checks,
    scannedAt: new Date().toISOString(),
  } as ScanOutput);
}
