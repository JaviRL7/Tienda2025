'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ASSETS, ANIMATION_CONFIG } from '@/lib/constants';

export default function CorkPolaroidSection() {
  useEffect(() => {
    AOS.init({
      duration: ANIMATION_CONFIG.AOS.DURATION,
      once: ANIMATION_CONFIG.AOS.ONCE,
      offset: ANIMATION_CONFIG.AOS.OFFSET,
    });
  }, []);

  return (
    <section className="py-6 md:py-8 lg:py-12 relative overflow-hidden cork-background">
      {/* Background image as div to avoid zoom issues */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${ASSETS.BACKGROUNDS.CORK})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          transform: 'scale(1.1)',
          transformOrigin: 'center center',
          filter: 'blur(1px)'
        }}
      ></div>
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/15"></div>

      {/* Gradientes para integrar bordes superior e inferior */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white via-white/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/60 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-8 lg:space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16 items-center max-w-5xl w-full">

            {/* Primera Polaroid (antes segunda) */}
            <div
              className="relative"
              data-aos="fade-up"
              data-aos-delay={ANIMATION_CONFIG.DELAYS.SHORT}
            >
              <div className="transform rotate-[6deg]">
                <img
                  src={ASSETS.POLAROIDS.POLAROID_2}
                  alt="Polaroid 2 - Doña Araña"
                  className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
                />
              </div>
            </div>

            {/* Segunda Polaroid (antes primera) */}
            <div
              className="relative"
              data-aos="fade-up"
              data-aos-delay={ANIMATION_CONFIG.DELAYS.MEDIUM}
            >
              <div className="transform rotate-[-8deg]">
                <img
                  src={ASSETS.POLAROIDS.POLAROID_1}
                  alt="Polaroid 1 - Doña Araña"
                  className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}