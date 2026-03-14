"use client";

import Navigation from "../components/Navigation";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--void)] relative overflow-hidden">
      <Navigation />
      
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid opacity-50" />
      <div className="fixed inset-0 noise-overlay" />
      <div className="fixed inset-0 scanlines" />
      
      {/* Gradient orbs */}
      <div className="fixed top-1/2 -left-32 w-96 h-96 bg-[var(--ethereal-violet)] rounded-full blur-[150px] opacity-20" />
      <div className="fixed top-1/4 -right-32 w-96 h-96 bg-[var(--mystic-magenta)] rounded-full blur-[150px] opacity-20" />

      <section className="relative z-10 min-h-screen flex items-center justify-center pt-16">
        <div className="text-center space-y-8 max-w-2xl mx-auto px-6">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--ethereal-violet)] to-[var(--arcane-cyan)] p-0.5 animate-float">
            <div className="w-full h-full rounded-2xl bg-[var(--surface)] flex items-center justify-center">
              <span className="text-5xl">🏰</span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white">
              The <span className="gradient-text">Lore</span>
            </h1>
            <p className="font-body text-xl text-[var(--text-secondary)]">
              Every legend has a beginning. This is the story of your coding journey 
              through the realms of web development.
            </p>
          </div>

          {/* Story Card */}
          <div className="glass-card rounded-2xl p-8 max-w-lg mx-auto corner-accent text-left">
            <div className="font-display text-sm text-[var(--ethereal-violet)] tracking-widest mb-6">
              CHAPTER 1
            </div>
            <p className="font-body text-[var(--text-secondary)] leading-relaxed mb-4">
              In the digital realm of Aetheria, brave coders gather to learn the ancient arts 
              of web development. Through four epic sessions, they master the powers of Python, 
              unlock the secrets of React, and forge legendary applications.
            </p>
            <p className="font-body text-[var(--text-secondary)] leading-relaxed">
              This website represents the culmination of Session 4 — where imagination 
              meets code, and first websites become portals to infinite possibilities.
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-12">
            <div className="text-center">
              <div className="font-display text-4xl font-bold text-[var(--arcane-cyan)] text-glow-cyan">4</div>
              <div className="font-body text-sm text-[var(--text-muted)]">Sessions</div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl font-bold text-[var(--mystic-magenta)] text-glow-magenta">1</div>
              <div className="font-body text-sm text-[var(--text-muted)]">Journey</div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl font-bold text-[var(--legendary-amber)] text-glow-amber">∞</div>
              <div className="font-body text-sm text-[var(--text-muted)]">Dreams</div>
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
