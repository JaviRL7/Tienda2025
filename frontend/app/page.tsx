'use client';

import MainLayout from '@/components/layout/main-layout';
import HeroSection from '@/components/sections/hero-section';
import MainCarouselSection from '@/components/sections/main-carousel-section';
import AboutSection from '@/components/sections/about-section';
import EnhancedProductsSection from '@/components/sections/enhanced-products-section';
import ClassesSection from '@/components/sections/classes-section';
import { InstagramSection } from '@/components/sections/instagram-section';
import CorkPolaroidSection from '@/components/sections/cork-polaroid-section';
import ContactSection from '@/components/sections/contact-section';

export default function HomePage() {
  return (
    <MainLayout>
      <MainCarouselSection />
      <HeroSection />
      <AboutSection />
      <EnhancedProductsSection
        title="Productos Destacados"
        showOnlyInDisplay={true}
      />
      <CorkPolaroidSection />
      <ClassesSection />
      <InstagramSection />
      <ContactSection />
    </MainLayout>
  );
}