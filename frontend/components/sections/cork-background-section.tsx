'use client';

import { Button } from '@/components/ui/button';

interface CorkBackgroundSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  buttonText: string;
  backgroundImage?: string;
  onButtonClick?: () => void;
}

export default function CorkBackgroundSection({
  title,
  subtitle,
  description,
  buttonText,
  backgroundImage = '/fondo/Fondoladrillo.jpg',
  onButtonClick,
}: CorkBackgroundSectionProps) {
  return (
    <section
      className="py-20"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 text-center shadow-2xl max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {title} {subtitle && <span className="brand-text">{subtitle}</span>}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          <Button
            size="lg"
            onClick={onButtonClick}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
}