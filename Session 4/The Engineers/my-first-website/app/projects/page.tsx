"use client";

import Navigation from "../components/Navigation";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[var(--void)] relative overflow-hidden">
      <Navigation />
      
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid opacity-50" />
      <div className="fixed inset-0 noise-overlay" />
      <div className="fixed inset-0 scanlines" />
      
      {/* Gradient orbs */}
      <div className="fixed top-1/3 -left-32 w-96 h-96 bg-[var(--legendary-amber)] rounded-full blur-[150px] opacity-20" />
      <div className="fixed bottom-1/3 -right-32 w-96 h-96 bg-[var(--arcane-cyan)] rounded-full blur-[150px] opacity-20" />

      <section className="relative z-10 min-h-screen flex items-center justify-center pt-16">
        <div className="text-center space-y-8 max-w-2xl mx-auto px-6">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--legendary-amber)] to-[var(--mystic-magenta)] p-0.5 animate-float">
            <div className="w-full h-full rounded-2xl bg-[var(--surface)] flex items-center justify-center">
              <span className="text-5xl">📜</span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white">
              Quest <span className="gradient-text-cyan">Log</span>
            </h1>
            <p className="font-body text-xl text-[var(--text-secondary)]">
              Your completed and active quests will appear here. 
              Track your progress through the coding realms.
            </p>
          </div>

          {/* Quest Preview */}
          <div className="glass-card rounded-2xl p-8 max-w-md mx-auto corner-accent">
            <div className="font-display text-sm text-[var(--legendary-amber)] tracking-widest mb-6">
              ACTIVE QUESTS
            </div>
            <div className="space-y-3">
              {[
                { name: "Build Portfolio", status: "In Progress", color: "var(--arcane-cyan)" },
                { name: "Master React", status: "Completed", color: "var(--legendary-amber)" },
                { name: "Deploy Website", status: "Pending", color: "var(--text-muted)" },
              ].map((quest) => (
                <div key={quest.name} className="flex items-center justify-between p-4 rounded-lg bg-[var(--void)]/50 border border-[var(--edge)]">
                  <div className="font-body text-white">{quest.name}</div>
                  <div className="flex items-center gap-2">
                    <span className="font-body text-xs" style={{ color: quest.color }}>{quest.status}</span>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: quest.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Back Button */}
          <Link href="/">
            <button className="btn-secondary">
              Return Home
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
