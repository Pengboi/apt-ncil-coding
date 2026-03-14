'use client';

import React, { useEffect, useRef } from 'react';
import { 
  DumbbellIcon, 
  RunningIcon, 
  BullseyeIcon, 
  StopwatchIcon, 
  HandPaperIcon, 
  ShieldIcon, 
  FistIcon, 
  CheckIcon 
} from '@/components/ui/Icons';

interface TipCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  tips: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  delay: number;
}

const tips: TipCard[] = [
  {
    icon: <RunningIcon />,
    title: 'Dribbling Mastery',
    description: 'Master close ball control with cone drills. Practice keeping the ball within one foot of your body while moving at different speeds.',
    tips: ['Use both feet equally', 'Keep your head up', 'Practice daily for 20 mins'],
    level: 'beginner',
    delay: 0,
  },
  {
    icon: <BullseyeIcon />,
    title: 'Precision Passing',
    description: 'Improve your passing accuracy with wall drills and partner exercises. Focus on weight and timing of your passes.',
    tips: ['Lock your ankle', 'Follow through', 'Communicate with teammates'],
    level: 'intermediate',
    delay: 100,
  },
  {
    icon: <StopwatchIcon />,
    title: 'Speed & Agility',
    description: 'Build explosive speed with sprint intervals and agility ladder drills. Quick direction changes are key in modern football.',
    tips: ['Sprint 40m x 10 sets', 'Ladder drills 3x/week', 'Rest between sprints'],
    level: 'advanced',
    delay: 200,
  },
  {
    icon: <HandPaperIcon />,
    title: 'First Touch Control',
    description: 'A great first touch sets up everything. Practice receiving balls from different angles and heights to control instantly.',
    tips: ['Cushion the ball', 'Move with the ball', 'Use different surfaces'],
    level: 'intermediate',
    delay: 0,
  },
  {
    icon: <ShieldIcon />,
    title: 'Defensive Positioning',
    description: 'Learn to read the game and position yourself to intercept passes and block shooting lanes effectively.',
    tips: ['Stay goal-side', 'Watch the ball & player', 'Communicate constantly'],
    level: 'beginner',
    delay: 100,
  },
  {
    icon: <FistIcon />,
    title: 'Power Shooting',
    description: 'Develop powerful shots with proper technique. Focus on body positioning, striking the ball correctly, and follow-through.',
    tips: ['Plant foot beside ball', 'Strike with laces', 'Lean over the ball'],
    level: 'advanced',
    delay: 200,
  },
];

export default function TrainingTips() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('[data-aos]');
            elements.forEach((el) => {
              const delay = el.getAttribute('data-aos-delay');
              if (delay) {
                setTimeout(() => {
                  el.classList.add('aos-animate');
                }, parseInt(delay));
              } else {
                el.classList.add('aos-animate');
              }
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="tips" className="section tips-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">
            <DumbbellIcon />
            Training
          </span>
          <h2 className="section-title">Football Training Tips</h2>
          <p className="section-subtitle">
            Professional techniques and drills to elevate your game to the next level
          </p>
        </div>

        <div className="tips-grid">
          {tips.map((tip, index) => (
            <div 
              key={index} 
              className="tip-card" 
              data-aos="fade-up"
              data-aos-delay={tip.delay}
            >
              <div className="tip-icon">{tip.icon}</div>
              <div className="tip-content">
                <h3>{tip.title}</h3>
                <p>{tip.description}</p>
                <ul className="tip-list">
                  {tip.tips.map((item, i) => (
                    <li key={i}>
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="tip-level">
                <span className={`level ${tip.level}`}>{tip.level}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
