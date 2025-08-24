import { Header } from '../../components/landing/header';
import { HeroSection } from '../../components/landing/hero-section';
import { AboutSection } from '../../components/landing/about-section';
import { PersonaSection } from '../../components/landing/persona-section';
import { WhyUsSection } from '../../components/landing/why-us-section';
import { TestimonialsSection } from '../../components/landing/testimonials-section';
import { FaqSection } from '../../components/landing/faq-section';
import { Footer } from '../../components/landing/footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <PersonaSection />
        <WhyUsSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
