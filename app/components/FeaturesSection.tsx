"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FEATURES = [
  {
    icon: "🔒",
    title: "10 security checks",
    body: "HTTPS, HSTS, CSP, clickjacking protection, MIME sniffing, referrer policy, permissions policy, and privacy compliance — all in one scan.",
  },
  {
    icon: "⚡",
    title: "Results in seconds",
    body: "Enter a domain and get a full report in under 10 seconds. No installs, no accounts, no browser extensions required.",
  },
  {
    icon: "🎯",
    title: "A–F grade system",
    body: "Each check is weighted by security impact. Your final grade reflects how enterprise buyers and security-conscious users perceive your site.",
  },
  {
    icon: "🛡️",
    title: "Know before they do",
    body: "B2B buyers and investors run security checks before signing deals. See what they see — and fix it before it costs you a contract.",
  },
  {
    icon: "📋",
    title: "Fix-it descriptions",
    body: "Every failed check includes a plain-English explanation of what it protects against and why it matters to your users.",
  },
  {
    icon: "🔁",
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
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="rounded-2xl border border-border bg-surface p-5 hover:border-accent/40 transition-colors"
          >
            <div className="mb-3 text-2xl">{f.icon}</div>
            <p className="mb-1 font-semibold text-foreground">{f.title}</p>
            <p className="text-sm text-muted leading-relaxed">{f.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
