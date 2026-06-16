export type IntelligenceInput = { input?: string };
const product = {
  "repo": "trustsignal",
  "brand": "TrustSignal",
  "suite": "Cybersecurity Suite",
  "domain": "Domain trust scanner",
  "accent": "from-emerald-200 via-teal-300 to-cyan-400",
  "hero": "See whether a domain earns trust before users do.",
  "sub": "TrustSignal checks domain posture, security headers, mail authentication, and public trust signals so teams can fix credibility gaps before customers or attackers notice.",
  "input": "example.com, app.example.com, or launch domain trust review",
  "cta": "Scan trust signals",
  "score": "Trust score",
  "modules": [
    [
      "Header posture",
      "Review browser-facing security headers."
    ],
    [
      "Mail authentication",
      "Check SPF, DKIM, DMARC readiness."
    ],
    [
      "Domain reputation hints",
      "Surface obvious trust and impersonation issues."
    ],
    [
      "Launch checklist",
      "Turn findings into credibility and security fixes."
    ]
  ],
  "rows": [
    [
      "Security headers",
      "Browser trust",
      "High",
      "Add missing protections and verify deployment."
    ],
    [
      "DMARC policy",
      "Email trust",
      "High",
      "Reduce spoofing and phishing exposure."
    ],
    [
      "TLS posture",
      "Transport",
      "Medium",
      "Keep certificate and protocol trust clean."
    ],
    [
      "Brand impersonation",
      "Reputation",
      "Medium",
      "Watch for confusing domains and typos."
    ]
  ],
  "missions": [
    [
      "Security header scanner",
      "Implement live header checks with explanations."
    ],
    [
      "DNS/Mail auth checks",
      "Add SPF, DKIM, and DMARC validation."
    ],
    [
      "Trust report export",
      "Generate client-ready domain posture reports."
    ],
    [
      "Monitoring mode",
      "Track drift and notify when trust weakens."
    ]
  ]
} as const;
function scoreFor(subject: string) { let score = 56 + Math.min(31, Math.floor(subject.length / 6)); if (/risk|breach|trust|domain|role|ops|cost|email|launch|customer|incident/i.test(subject)) score += 8; return Math.min(98, score); }
export function generateIntelligence({ input = '' }: IntelligenceInput) { const subject = input.trim() || product.input; const score = scoreFor(subject); return { product: product.brand, suite: product.suite, domain: product.domain, subject, score, status: score >= 86 ? 'strong' : score >= 72 ? 'ready' : 'needs review', executive_summary: product.sub, intelligence_map: product.modules.map(([label,value]) => ({ label, value, status: score >= 72 ? 'priority' : 'review' })), action_queue: product.rows.slice(0,3).map(([item,owner,priority,note]) => ({ action: item + ' - ' + owner, priority, impact: note })), contributor_lanes: product.missions.map(([lane,mission]) => ({ lane, mission })), generated_at: new Date().toISOString() }; }
