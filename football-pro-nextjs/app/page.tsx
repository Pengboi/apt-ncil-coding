'use client';

import { NotificationProvider } from '@/hooks/useNotification';
import {
  Navbar,
  Hero,
  TrainingTips,
  Lifestyle,
  Products,
  Newsletter,
  Footer,
} from '@/components/sections';

export default function Home() {
  return (
    <NotificationProvider>
      <main>
        <Navbar />
        <Hero />
        <TrainingTips />
        <Lifestyle />
        <Products />
        <Newsletter />
        <Footer />
      </main>
    </NotificationProvider>
  );
}
