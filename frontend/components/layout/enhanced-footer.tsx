import { Heart, MapPin, Mail } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface EnhancedFooterProps {
  sections?: FooterSection[];
  contactEmail?: string;
  location?: string;
  className?: string;
}

const defaultSections: FooterSection[] = [
  {
    title: "Servicios",
    links: [
      { label: "Productos", href: "/tienda" },
      { label: "Galería", href: "/galeria" },
      { label: "Información", href: "/info" }
    ]
  }
];

export default function EnhancedFooter({
  sections = defaultSections,
  contactEmail = "jrlsanlucar11@gmail.com",
  location = "Calle San Juan 76, Sanlúcar de Barrameda - 856 36 25 28",
  className = ""
}: EnhancedFooterProps) {
  return (
    <footer className={`bg-background border-t ${className}`}>
      <div className="container py-8 md:py-16 lg:py-20">
        <div className="space-y-8 md:space-y-12 lg:space-y-16">
          {/* Logo */}
          <div className="flex items-center justify-center md:justify-start">
            <img
              src="/logos/logohorizontal.png"
              alt="Doña Araña"
              className="h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 w-auto"
            />
          </div>

          {/* Contenido principal con Servicios y Desarrollo alineados horizontalmente */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20">
            {/* Descripción */}
            <div className="lg:col-span-5 space-y-4 md:space-y-6 lg:space-y-8">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-center md:text-left">
                Más que una tienda,
                <br />
                <span
                  className="block mt-3 md:mt-6 lg:mt-8"
                  style={{
                    fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
                  }}
                >
                  Una Familia
                </span>
              </h3>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed text-center md:text-left">
                Tu tienda de confianza para lanas, hilos y accesorios de manualidades
                en Sanlúcar de Barrameda. Creando vínculos a través del hilo desde hace años.
              </p>

              <div className="flex flex-col space-y-3 md:space-y-4 text-muted-foreground">
                <div className="flex items-start space-x-3 md:space-x-4">
                  <MapPin className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base md:text-lg">{location}</span>
                </div>

                <div className="flex items-center space-x-3 md:space-x-4">
                  <Mail className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0" />
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-sm sm:text-base md:text-lg hover:text-primary transition-colors break-all"
                  >
                    {contactEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Servicios - Más hacia la derecha */}
            {sections.map((section, index) => (
              <div key={index} className="lg:col-span-3 lg:col-start-7 space-y-3 md:space-y-4 lg:space-y-6">
                <h4 className="font-bold text-lg md:text-xl lg:text-2xl text-foreground">{section.title}</h4>
                <ul className="space-y-2 md:space-y-3 lg:space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-sm md:text-base lg:text-lg text-muted-foreground hover:text-primary transition-colors duration-200 block py-1"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Desarrollo - Alineado horizontalmente con Servicios */}
            <div className="lg:col-span-4 lg:col-start-10 space-y-3 md:space-y-4 lg:space-y-6">
              <h4 className="font-bold text-lg md:text-xl lg:text-2xl text-foreground">Desarrollo</h4>
              <div className="p-3 md:p-4 lg:p-6">
                <div className="flex items-start space-x-3 md:space-x-4">
                  <Heart className="h-5 w-5 md:h-6 md:w-6 text-rose-500 flex-shrink-0 mt-1" />
                  <div className="space-y-2 md:space-y-3">
                    <p className="text-sm md:text-base lg:text-lg font-medium text-foreground">
                      Desarrollado con amor
                    </p>
                    <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
                      Javier Rodríguez López
                    </p>
                    <div className="text-xs md:text-sm lg:text-base text-muted-foreground/70 pt-2 md:pt-3 border-t border-border/30">
                      Full Stack Developer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Línea separadora y copyright */}
        <div className="border-t border-border/50 mt-8 md:mt-12 lg:mt-16 pt-6 md:pt-8 lg:pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-xs sm:text-sm text-muted-foreground text-center md:text-left">
              © 2025 Doña Araña. Todos los derechos reservados.
            </p>

            <p className="text-xs sm:text-sm brand-text font-medium text-center md:text-right">
              Tejiendo sueños, creando memorias
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}