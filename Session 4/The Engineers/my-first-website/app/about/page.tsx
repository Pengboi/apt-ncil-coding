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
              The <span className="gradient-text">Chronicles</span>
            </h1>
            <p className="font-body text-xl text-[var(--text-secondary)]">
              Every knight has a beginning. This is the story of your heroic journey 
              through the Five Sacred Disciplines of Syntaxia.
            </p>
          </div>

          {/* Story Card */}
          <div className="glass-card rounded-2xl p-8 max-w-lg mx-auto corner-accent text-left">
            <div className="font-display text-sm text-[var(--ethereal-violet)] tracking-widest mb-6">
              THE CHRONICLES OF SYNTAXIA
            </div>
            <p className="font-body text-[var(--text-secondary)] leading-relaxed mb-4">
              In the realm of <strong className="text-[var(--arcane-cyan)]">Syntaxia</strong>, heroes are forged not by sword and shield, 
              but by wit and will. The <strong className="text-[var(--mystic-magenta)]">Adventurers Academy</strong> stands as the last 
              bastion against the Ancient Bugs that threaten to unravel reality itself.
            </p>
            <p className="font-body text-[var(--text-secondary)] leading-relaxed mb-4">
              Through <strong>30 epic quests</strong>, knights master the <strong>Five Sacred Disciplines</strong>: 
              the Way of the Serpent, the Path of Variables, the Art of Functions, 
              the Domain of Interfaces, and the Mastery of Intelligence.
            </p>
            <p className="font-body text-[var(--text-secondary)] leading-relaxed">
              This website represents your progress through the Academy — from humble 
              <strong className="text-[var(--legendary-amber)]"> Squire</strong> to legendary <strong className="text-[var(--legendary-amber)]">Paragon</strong>. 
              Every line of code is a spell. Every bug slain is a victory. Your legend begins now.
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-12">
            <div className="text-center">
              <div className="font-display text-4xl font-bold text-[var(--arcane-cyan)] text-glow-cyan">30</div>
              <div className="font-body text-sm text-[var(--text-muted)]">Epic Quests</div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl font-bold text-[var(--mystic-magenta)] text-glow-magenta">5</div>
              <div className="font-body text-sm text-[var(--text-muted)]">Sacred Disciplines</div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl font-bold text-[var(--legendary-amber)] text-glow-amber">∞</div>
              <div className="font-body text-sm text-[var(--text-muted)]">Possibilities</div>
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
