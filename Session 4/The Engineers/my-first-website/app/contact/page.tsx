"use client";

import Navigation from "../components/Navigation";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--void)] relative overflow-hidden">
      <Navigation />
      
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid opacity-50" />
      <div className="fixed inset-0 noise-overlay" />
      <div className="fixed inset-0 scanlines" />
      
      {/* Gradient orbs */}
      <div className="fixed bottom-1/4 -left-32 w-96 h-96 bg-[var(--arcane-cyan)] rounded-full blur-[150px] opacity-20" />
      <div className="fixed top-1/4 -right-32 w-96 h-96 bg-[var(--mystic-magenta)] rounded-full blur-[150px] opacity-20" />

      <section className="relative z-10 min-h-screen flex items-center justify-center pt-16">
        <div className="text-center space-y-8 max-w-2xl mx-auto px-6">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--arcane-cyan)] to-[var(--legendary-amber)] p-0.5 animate-float">
            <div className="w-full h-full rounded-2xl bg-[var(--surface)] flex items-center justify-center">
              <span className="text-5xl">📡</span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white">
              Send a <span className="gradient-text">Message</span>
            </h1>
            <p className="font-body text-xl text-[var(--text-secondary)]">
              Reach out through the digital ether. Connect with fellow adventurers 
              and share your coding quests.
            </p>
          </div>

          {/* Contact Card */}
          <div className="glass-card rounded-2xl p-8 max-w-md mx-auto corner-accent">
            <div className="font-display text-sm text-[var(--arcane-cyan)] tracking-widest mb-6">
              COMMUNICATION CRYSTAL
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[var(--void)]/50 border border-[var(--edge)] text-left">
                <div className="font-body text-xs text-[var(--text-muted)] mb-1">EMAIL</div>
                <div className="font-body text-white">hello@aetheria.quest</div>
              </div>
              
              <div className="p-4 rounded-lg bg-[var(--void)]/50 border border-[var(--edge)] text-left">
                <div className="font-body text-xs text-[var(--text-muted)] mb-1">LOCATION</div>
                <div className="font-body text-white">APT Coding Camp, Session 4</div>
              </div>
              
              <div className="p-4 rounded-lg bg-[var(--void)]/50 border border-[var(--edge)] text-left">
                <div className="font-body text-xs text-[var(--text-muted)] mb-1">STATUS</div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <div className="font-body text-white">Online & Coding</div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            {["GitHub", "Discord", "Twitter"].map((platform) => (
              <button
                key={platform}
                className="px-4 py-2 rounded-lg bg-[var(--surface)] border border-[var(--edge)] font-body text-sm text-[var(--text-secondary)] hover:text-white hover:border-[var(--arcane-cyan)]/50 transition-colors"
              >
                {platform}
              </button>
            ))}
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
