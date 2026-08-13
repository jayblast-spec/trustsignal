"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5" />
      <circle cx="12" cy="15.2" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.5 3 5 13.5h5.5L11 21l7.5-10.5H13z" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.5 5 6v6c0 4.6 3 7.9 7 9.5 4-1.6 7-4.9 7-9.5V6z" />
      <path d="M9 12.2l2 2 4-4.4" />
    </svg>
  );
}

function ChecklistIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4.5" y="3.5" width="15" height="17" rx="2" />
      <path d="M8 8.5h8M8 12h8M8 15.5h5.5" />
    </svg>
  );
}

function RepeatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12a8 8 0 0 1 13.7-5.7L20 8.5" />
      <path d="M20 4.5v4h-4" />
      <path d="M20 12a8 8 0 0 1-13.7 5.7L4 15.5" />
      <path d="M4 19.5v-4h4" />
    </svg>
  );
}

const FEATURES = [
  {
    icon: LockIcon,
    title: "10 security checks",
    body: "HTTPS, HSTS, CSP, clickjacking protection, MIME sniffing, referrer policy, permissions policy, and privacy compliance — all in one scan.",
  },
  {
    icon: BoltIcon,
    title: "Results in seconds",
    body: "Enter a domain and get a full report in under 10 seconds. No installs, no accounts, no browser extensions required.",
  },
  {
    icon: TargetIcon,
    title: "A–F grade system",
    body: "Each check is weighted by security impact. Your final grade reflects how enterprise buyers and security-conscious users perceive your site.",
  },
  {
    icon: ShieldIcon,
    title: "Know before they do",
    body: "B2B buyers and investors run security checks before signing deals. See what they see — and fix it before it costs you a contract.",
  },
  {
    icon: ChecklistIcon,
    title: "Fix-it descriptions",
    body: "Every failed check includes a plain-English explanation of what it protects against and why it matters to your users.",
  },
  {
    icon: RepeatIcon,
    title: "Scan competitors too",
    body: "Run any domain. Use TrustSignal to benchmark your security posture against competitors and prove your advantage to customers.",
  },
];

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="mx-auto max-w-4xl px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Security is your{" "}
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            competitive edge
          </span>
        </h2>
        <p className="mt-3 text-muted">
          The businesses that own the next decade won&apos;t just be the fastest — they&apos;ll be the most trusted.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="rounded-2xl border border-border bg-surface p-5 hover:border-accent/40 transition-colors"
            >
              <div className="icon-3d mb-3">
                <Icon />
              </div>
              <p className="mb-1 font-semibold text-foreground">{f.title}</p>
              <p className="text-sm text-muted leading-relaxed">{f.body}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
