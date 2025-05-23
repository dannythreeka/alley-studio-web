'use client';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/hero/HeroSection';
import AboutSection from '@/components/about/AboutSection';
import ServicesSection from '@/components/services/ServicesSection';
import WorksSection from '@/components/works/WorksSection';
import FooterSection from '@/components/footer/FooterSection';
import PageLoader from '@/components/PageLoader';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import LanguageDebug from '@/components/LanguageDebug';
import SkipToContentLink from '@/components/SkipToContentLink';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <PageLoader />
      <Navbar />

      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WorksSection />
      </main>

      <FooterSection />
      <ScrollToTopButton />

      {/* Debug component - Remove in production */}
      {process.env.NODE_ENV === 'development' && <LanguageDebug />}

      {/* Skip to content link for accessibility */}
      <SkipToContentLink />
    </div>
  );
}
