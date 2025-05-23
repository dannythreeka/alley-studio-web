'use client';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/hero/HeroSection';
import AboutSection from '@/components/about/AboutSection';
import ServicesSection from '@/components/services/ServicesSection';
import WorksSection from '@/components/works/WorksSection';
import FooterSection from '@/components/footer/FooterSection';
import PageLoader from '@/components/PageLoader';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import SkipToContentLink from '@/components/SkipToContentLink';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <SkipToContentLink />
      <PageLoader />
      <Navbar />

      <main id="main" className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WorksSection />
      </main>

      <FooterSection />
      <ScrollToTopButton />
    </div>
  );
}
