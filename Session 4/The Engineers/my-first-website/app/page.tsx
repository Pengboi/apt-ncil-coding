"use client";

import Navigation from "./components/Navigation";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--void)] relative overflow-hidden">
      <Navigation />
      
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid opacity-50" />
      <div className="fixed inset-0 noise-overlay" />
      <div className="fixed inset-0 scanlines" />
      
      {/* Animated gradient orbs */}
      <div className="fixed top-1/4 -left-32 w-96 h-96 bg-[var(--arcane-cyan)] rounded-full blur-[150px] opacity-20 animate-pulse-glow" />
      <div className="fixed bottom-1/4 -right-32 w-96 h-96 bg-[var(--mystic-magenta)] rounded-full blur-[150px] opacity-20 animate-pulse-glow" style={{ animationDelay: "1s" }} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--ethereal-violet)] rounded-full blur-[200px] opacity-10" />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-[var(--arcane-cyan)]/20">
                <span className="w-2 h-2 rounded-full bg-[var(--legendary-amber)] animate-pulse" />
                <span className="font-body text-sm text-[var(--text-secondary)] tracking-wide">
                  Adventurers Academy | Syntaxia
                </span>
              </div>

              {/* Main Title */}
              <div className="space-y-4">
                <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight">
                  <span className="text-white">Forge Your</span>
                  <br />
                  <span className="gradient-text animate-glitch">Legend</span>
                </h1>
                <p className="font-body text-xl md:text-2xl text-[var(--text-secondary)] max-w-lg leading-relaxed">
                  Build powerful RPG characters, craft epic weapons, and embark on coding adventures in a realm where imagination meets code.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link href="/rpg">
                  <button className="btn-primary text-base">
                    Enter the Realm
                  </button>
                </Link>
                <Link href="/projects">
                  <button className="btn-secondary text-base">
                    View Quests
                  </button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-4">
                <div>
                  <div className="font-display text-3xl font-bold text-[var(--arcane-cyan)] text-glow-cyan">
                    30
                  </div>
                  <div className="font-body text-sm text-[var(--text-muted)]">Epic Quests</div>
                </div>
                <div>
                  <div className="font-display text-3xl font-bold text-[var(--mystic-magenta)] text-glow-magenta">
                    5
                  </div>
                  <div className="font-body text-sm text-[var(--text-muted)]">Sacred Disciplines</div>
                </div>
                <div>
                  <div className="font-display text-3xl font-bold text-[var(--legendary-amber)] text-glow-amber">
                    5
                  </div>
                  <div className="font-body text-sm text-[var(--text-muted)]">Bosses</div>
                </div>
              </div>
            </div>

            {/* Right Content - Character Card */}
            <div className="relative">
              <div className="relative animate-float">
                {/* Card Glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[var(--arcane-cyan)] via-[var(--mystic-magenta)] to-[var(--legendary-amber)] opacity-20 blur-2xl rounded-2xl" />
                
                {/* Character Card */}
                <div className="relative glass-card rounded-2xl p-8 corner-accent">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="font-display text-xs text-[var(--arcane-cyan)] tracking-widest mb-1">
                        CHARACTER SHEET
                      </div>
                      <div className="font-display text-2xl font-bold text-white">
                        Code Warrior
                      </div>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--arcane-cyan)] to-[var(--ethereal-violet)] p-0.5">
                      <div className="w-full h-full rounded-full bg-[var(--surface)] flex items-center justify-center">
                        <span className="text-2xl">⚔️</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { label: "Strength", value: 18, color: "var(--mystic-magenta)" },
                      { label: "Agility", value: 14, color: "var(--arcane-cyan)" },
                      { label: "Intelligence", value: 16, color: "var(--legendary-amber)" },
                      { label: "Vitality", value: 12, color: "var(--ethereal-violet)" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-[var(--void)]/50 rounded-lg p-4 border border-[var(--edge)]">
                        <div className="font-body text-xs text-[var(--text-muted)] mb-1">{stat.label}</div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-[var(--edge)] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-1000"
                              style={{ width: `${(stat.value / 20) * 100}%`, backgroundColor: stat.color }}
                            />
                          </div>
                          <span className="font-display font-bold text-white">{stat.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Equipment */}
                  <div className="space-y-3">
                    <div className="font-body text-xs text-[var(--text-muted)] tracking-widest">EQUIPMENT</div>
                    {[
                      { name: "Keyboard of Power", type: "Weapon", icon: "⌨️" },
                      { name: "Monitor of Clarity", type: "Armor", icon: "🖥️" },
                    ].map((item) => (
                      <div key={item.name} className="flex items-center gap-3 p-3 bg-[var(--void)]/30 rounded-lg border border-[var(--edge)] hover:border-[var(--arcane-cyan)]/30 transition-colors">
                        <span className="text-xl">{item.icon}</span>
                        <div className="flex-1">
                          <div className="font-body font-medium text-white">{item.name}</div>
                          <div className="font-body text-xs text-[var(--text-muted)]">{item.type}</div>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-[var(--legendary-amber)]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block px-4 py-1 rounded-full border border-[var(--mystic-magenta)]/30 bg-[var(--mystic-magenta)]/5">
              <span className="font-body text-sm text-[var(--mystic-magenta)]">Features</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Your Adventure Awaits
            </h2>
            <p className="font-body text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Explore the tools and systems built throughout your coding journey
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Character System",
                description: "Create and customize RPG characters with unique stats, classes, and abilities.",
                icon: "🎭",
                color: "var(--arcane-cyan)",
                href: "/rpg",
              },
              {
                title: "Weapon Forge",
                description: "Design legendary weapons with custom attributes and powerful enchantments.",
                icon: "⚔️",
                color: "var(--mystic-magenta)",
                href: "/projects",
              },
              {
                title: "Quest Log",
                description: "Track your coding quests and achievements throughout the camp sessions.",
                icon: "📜",
                color: "var(--legendary-amber)",
                href: "/about",
              },
            ].map((feature) => (
              <Link key={feature.title} href={feature.href}>
                <div className="group relative h-full glass-card rounded-2xl p-8 hover:bg-[var(--surface)]/80 transition-all duration-300 hover:-translate-y-1">
                  {/* Glow effect on hover */}
                  <div
                    className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm"
                    style={{ background: `linear-gradient(135deg, ${feature.color}20, transparent)` }}
                  />
                  
                  <div className="relative">
                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-6 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${feature.color}15`, color: feature.color }}
                    >
                      {feature.icon}
                    </div>

                    {/* Content */}
                    <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-[var(--text-primary)] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="font-body text-[var(--text-secondary)] leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Arrow */}
                    <div className="mt-6 flex items-center gap-2 font-body text-sm" style={{ color: feature.color }}>
                      <span>Explore</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sessions Timeline */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block px-4 py-1 rounded-full border border-[var(--legendary-amber)]/30 bg-[var(--legendary-amber)]/5">
              <span className="font-body text-sm text-[var(--legendary-amber)]">Journey</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Your Coding Quest
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--arcane-cyan)] via-[var(--mystic-magenta)] to-[var(--legendary-amber)] hidden md:block" />

            {/* The Five Sacred Disciplines */}
            {[
              { num: "I", title: "Way of the Serpent", desc: "Master loops, variables, and the foundations of logic in the Turtle Marshes" },
              { num: "II", title: "Path of Variables", desc: "Navigate data structures and the Forest of Mutable Shadows" },
              { num: "III", title: "Art of Functions", desc: "Climb the Mountain of Reusable Stone and craft modular spells" },
              { num: "IV", title: "Domain of Interfaces", desc: "Explore the Crystal Plains of UI with React and Next.js" },
              { num: "V", title: "Mastery of Intelligence", desc: "Ascend the Neural Peaks and command the power of AI" },
            ].map((session, i) => (
              <div key={session.num} className={`relative flex items-center gap-8 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className={`glass-card rounded-xl p-6 inline-block max-w-md corner-accent ${i % 2 === 0 ? "md:ml-auto" : "md:mr-auto"}`}>
                    <div className="font-display text-5xl font-bold text-[var(--edge)] mb-2">{session.num}</div>
                    <h3 className="font-display text-xl font-bold text-white mb-2">{session.title}</h3>
                    <p className="font-body text-[var(--text-secondary)]">{session.desc}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex w-4 h-4 rounded-full bg-[var(--void)] border-2 border-[var(--arcane-cyan)] items-center justify-center z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--arcane-cyan)]" />
                </div>

                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative glass-card rounded-3xl p-12 text-center overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-[var(--arcane-cyan)]/10 via-[var(--mystic-magenta)]/10 to-[var(--legendary-amber)]/10 blur-3xl" />
            
            <div className="relative space-y-6">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
                Ready to Begin?
              </h2>
              <p className="font-body text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
                Your character awaits. Enter the RPG system and start crafting your legend today.
              </p>
              <div className="pt-4">
                <Link href="/rpg">
                  <button className="btn-primary text-lg px-8 py-4">
                    Launch RPG System
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-[var(--edge)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--arcane-cyan)] to-[var(--mystic-magenta)] flex items-center justify-center">
                <span className="font-display font-bold text-sm text-[var(--void)]">S</span>
              </div>
              <span className="font-display font-bold text-lg text-white">SYNTAXIA</span>
            </div>
            
            <div className="font-body text-sm text-[var(--text-muted)]">
              Forged at the Adventurers Academy
            </div>
            
            <div className="flex items-center gap-4">
              <span className="font-body text-xs text-[var(--text-muted)] tracking-wider">
                PHASE I: SERPENT
              </span>
              <div className="w-2 h-2 rounded-full bg-[var(--arcane-cyan)] animate-pulse" />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
