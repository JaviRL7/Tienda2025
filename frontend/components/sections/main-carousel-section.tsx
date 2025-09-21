import StylizedCarousel from '@/components/ui/stylized-carousel';

interface MainCarouselSectionProps {
  className?: string;
}

const carouselImages = [
  {
    src: "/images/imagen1.jpg",
    alt: "Doña Araña - Variedad de lanas",
    title: "Descubre nuestra amplia variedad",
    description: "Las mejores lanas y materiales para tus proyectos de manualidades"
  },
  {
    src: "/images/imagen2.webp",
    alt: "Doña Araña - Ambiente de tienda",
    title: "Un ambiente acogedor",
    description: "Más que una tienda, un lugar donde nace la creatividad"
  },
  {
    src: "/images/imagen3.jpg",
    alt: "Doña Araña - Productos artesanales",
    title: "Calidad artesanal",
    description: "Productos seleccionados con cuidado para tejedoras expertas"
  },
  {
    src: "/images/imagen4.jpg",
    alt: "Doña Araña - Inspiración creativa",
    title: "Inspiración sin límites",
    description: "Encuentra la inspiración perfecta para tu próximo proyecto"
  },
  {
    src: "/images/imagen5.jpg",
    alt: "Doña Araña - Comunidad de tejedoras",
    title: "Una comunidad que teje",
    description: "Únete a nuestra familia de amantes de las manualidades"
  }
];

export default function MainCarouselSection({ className = "" }: MainCarouselSectionProps) {
  return (
    <section className={`py-20 bg-gradient-to-br from-primary/90 via-primary/70 to-primary/80 text-primary-foreground ${className}`}>
      <div className="container">
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
            <span className="block mb-12">Bienvenido a</span>
            <span
              className="text-primary-foreground block"
              style={{
                fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
                lineHeight: "1.2"
              }}
            >
              Doña Araña
            </span>
          </h2>

          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Tradición, creatividad y lanas en el corazón de Sanlúcar
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <StylizedCarousel
            images={carouselImages}
            autoPlay={true}
            autoPlayInterval={5000}
            showControls={true}
            showIndicators={true}
            showPlayButton={true}
            className="transform hover:scale-[1.01] transition-transform duration-500"
          />
        </div>

      </div>
    </section>
  );
}