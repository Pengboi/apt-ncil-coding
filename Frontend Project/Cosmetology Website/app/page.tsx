import {
  Navbar,
  Hero,
  Services,
  About,
  Gallery,
  Testimonials,
  Booking,
  Contact,
  Footer,
} from '@/components';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Testimonials />
      <Booking />
      <Contact />
      <Footer />
    </main>
  );
}
