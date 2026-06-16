"use client";

import { motion } from "framer-motion";

export default function HeroSection({ onScanClick }: { onScanClick: () => void }) {
  return (
    <section className="sky-bg hex-grid relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-accent/8 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex max-w-3xl flex-col items-center gap-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-1.5 text-xs font-semibold text-accent-2"
        >
          <span>◈</span> Security scanner · Free · No signup
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
        >
          Your domain&apos;s
          <br />
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            trust score. Instant.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="max-w-xl text-base text-muted sm:text-lg"
        >
          Enterprise buyers check your security headers before signing contracts.
          Investors google your domain before wiring money. TrustSignal shows you what they see —
          and exactly how to fix it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-3 sm:flex-row"
        >
          <button
            onClick={onScanClick}
            className="rounded-xl bg-accent px-8 py-3.5 text-sm font-semibold text-white hover:opacity-90 active:scale-95 transition-all"
          >
            Scan my domain →
          </button>
          <span className="text-xs text-muted">Enter domain · Get score · Done</span>
        </motion.div>

        {/* Score preview card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-4 w-full max-w-xs rounded-2xl border border-border bg-surface p-4 text-left shadow-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Example scan</p>
          <div className="flex items-center gap-4 mb-3">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-success">85</span>
              <span className="text-xs text-muted">/ 100</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted">Grade</span>
                <span className="text-sm font-bold text-success">B</span>
              </div>
              <div className="h-2 rounded-full bg-surface-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ delay: 0.9, duration: 1 }}
                  className="h-full rounded-full bg-success"
                />
              </div>
            </div>
          </div>
          {[
            { label: "HTTPS", pass: true },
            { label: "HSTS Header", pass: true },
            { label: "CSP", pass: false },
            { label: "Permissions Policy", pass: false },
          ].map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="flex items-center gap-2 mb-1.5"
            >
              <span className={`text-xs ${row.pass ? "text-success" : "text-danger"}`}>
                {row.pass ? "✓" : "✗"}
              </span>
              <span className="text-xs text-muted">{row.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted"
      >
        <span className="text-xs">Scan yours</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4 }} className="h-4 w-px bg-muted/50" />
      </motion.div>
    </section>
  );
}
