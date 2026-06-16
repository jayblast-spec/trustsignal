"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ScanOutput, CheckResult } from "../api/scan/route";

const SCAN_STEPS = [
  "Connecting to domain...",
  "Reading response headers...",
  "Checking HTTPS & redirects...",
  "Scanning security policies...",
  "Calculating trust score...",
];

const GRADE_COLORS: Record<string, string> = {
  A: "#34d399",
  B: "#60a5fa",
  C: "#fbbf24",
  D: "#fb923c",
  F: "#f87171",
};

const GRADE_LABELS: Record<string, string> = {
  A: "Excellent",
  B: "Good",
  C: "Fair",
  D: "Poor",
  F: "Critical",
};

function ScoreRing({ score, grade }: { score: number; grade: string }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const color = GRADE_COLORS[grade] ?? "#6b93c4";

  return (
    <div className="relative flex items-center justify-center w-36 h-36">
      <svg width="144" height="144" viewBox="0 0 144 144" className="-rotate-90">
        <circle cx="72" cy="72" r={r} fill="none" stroke="var(--surface-2)" strokeWidth="10" />
        <motion.circle
          cx="72"
          cy="72"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - (circ * score) / 100 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span
          className="text-3xl font-bold"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {score}
        </motion.span>
        <span className="text-xs text-muted">/ 100</span>
      </div>
    </div>
  );
}

function CheckRow({ check, index }: { check: CheckResult; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.05 }}
      className="flex items-start gap-3 py-2.5 border-b border-border/50 last:border-0"
    >
      <span
        className={`mt-0.5 text-base leading-none flex-shrink-0 ${check.passed ? "text-success" : "text-danger"}`}
      >
        {check.passed ? "✓" : "✗"}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <span className="text-sm font-medium text-foreground">{check.label}</span>
          <span className="text-xs text-muted flex-shrink-0">{check.weight}pts</span>
        </div>
        <p className="text-xs text-muted leading-relaxed">{check.description}</p>
        {check.value && check.value !== "Yes" && check.value !== "No" && check.value !== "Found" && (
          <p className="text-xs font-mono text-accent-2/70 mt-1 truncate">{check.value}</p>
        )}
      </div>
    </motion.div>
  );
}

export default function ScanForm() {
  const [domain, setDomain] = useState("");
  const [state, setState] = useState<"idle" | "scanning" | "done" | "error">("idle");
  const [stepIndex, setStepIndex] = useState(0);
  const [result, setResult] = useState<ScanOutput | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const scan = useCallback(async () => {
    const clean = domain.trim().replace(/^https?:\/\//i, "").replace(/\/.*$/, "");
    if (!clean) return;

    setState("scanning");
    setStepIndex(0);
    setResult(null);
    setErrorMsg("");

    const interval = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, SCAN_STEPS.length - 1));
    }, 700);

    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: clean }),
      });
      clearInterval(interval);
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Scan failed. Try again.");
        setState("error");
        return;
      }
      setResult(data as ScanOutput);
      setState("done");
    } catch {
      clearInterval(interval);
      setErrorMsg("Network error. Check your connection and try again.");
      setState("error");
    }
  }, [domain]);

  const passed = result?.checks.filter((c) => c.passed).length ?? 0;
  const failed = result?.checks.filter((c) => !c.passed).length ?? 0;
  const grade = result?.grade ?? "F";
  const gradeColor = GRADE_COLORS[grade] ?? "#6b93c4";

  return (
    <div className="mx-auto max-w-2xl px-4 pb-24">
      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && state !== "scanning" && scan()}
          placeholder="stripe.com"
          className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder-muted/50 outline-none focus:border-accent/60 transition-colors"
        />
        <button
          onClick={scan}
          disabled={state === "scanning" || !domain.trim()}
          className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {state === "scanning" ? "Scanning..." : "Scan"}
        </button>
      </div>

      {/* Scanning state */}
      <AnimatePresence>
        {state === "scanning" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 rounded-xl border border-border bg-surface p-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="h-4 w-4 rounded-full border-2 border-accent border-t-transparent flex-shrink-0"
              />
              <span className="text-sm text-accent-2 font-medium">
                {SCAN_STEPS[stepIndex]}
              </span>
            </div>
            <div className="space-y-2">
              {SCAN_STEPS.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className={`h-1.5 w-1.5 rounded-full flex-shrink-0 transition-colors duration-300 ${
                      i < stepIndex ? "bg-success" : i === stepIndex ? "bg-accent" : "bg-border"
                    }`}
                  />
                  <span className={`text-xs transition-colors duration-300 ${i <= stepIndex ? "text-muted" : "text-border"}`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      <AnimatePresence>
        {state === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm text-danger"
          >
            {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {state === "done" && result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-4"
          >
            {/* Score card */}
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <ScoreRing score={result.score} grade={grade} />
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-1">
                    {result.domain}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
                    <span className="text-4xl font-bold" style={{ color: gradeColor }}>
                      {grade}
                    </span>
                    <span className="text-lg text-muted">{GRADE_LABELS[grade]}</span>
                  </div>
                  <p className="text-sm text-muted">
                    {passed} of {result.checks.length} checks passed
                  </p>
                  <div className="mt-3 flex gap-3">
                    <div className="rounded-lg bg-success/10 border border-success/20 px-3 py-1.5">
                      <span className="text-xs font-semibold text-success">{passed} passed</span>
                    </div>
                    <div className="rounded-lg bg-danger/10 border border-danger/20 px-3 py-1.5">
                      <span className="text-xs font-semibold text-danger">{failed} failed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Checks list */}
            <div className="rounded-2xl border border-border bg-surface p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">
                Security checks
              </p>
              {result.checks.map((c, i) => (
                <CheckRow key={c.id} check={c} index={i} />
              ))}
            </div>

            {/* Scan another */}
            <div className="text-center">
              <button
                onClick={() => { setState("idle"); setResult(null); setDomain(""); }}
                className="text-sm text-muted hover:text-accent transition-colors"
              >
                ← Scan another domain
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
