'use client';

import MainLayout from '@/components/layout/main-layout';
import EnhancedProductsSection from '@/components/sections/enhanced-products-section';

export default function TiendaPage() {
  return (
    <MainLayout>
      <div className="pt-4 sm:pt-6 md:pt-8">
        <EnhancedProductsSection
          title="Todos nuestros productos"
          showOnlyFeatured={false}
          showOnlyInDisplay={false}
        />
      </div>
    </MainLayout>
  );
}