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
      { label: "Categorías", href: "/tienda" },
      { label: "Clases y Talleres", href: "#" },
      { label: "Ofertas especiales", href: "#" }
    ]
  }
];

export default function EnhancedFooter({
  sections = defaultSections,
  contactEmail = "jrlsanlucar11@gmail.com",
  location = "Sanlúcar de Barrameda",
  className = ""
}: EnhancedFooterProps) {
  return (
    <footer className={`bg-background border-t ${className}`}>
      <div className="container py-20">
        <div className="space-y-16">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/logos/logohorizontal.png"
              alt="Doña Araña"
              className="h-48 md:h-56 lg:h-64 xl:h-72 w-auto"
            />
          </div>

          {/* Contenido principal con Servicios y Desarrollo alineados horizontalmente */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Descripción */}
            <div className="lg:col-span-5 space-y-8">
              <h3 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Más que una tienda,
                <br />
                <span
                  className="block mt-8"
                  style={{
                    fontFamily: "'Wonderful Branding OTF', 'Wonderful Branding TTF', cursive",
                  }}
                >
                  Una Familia
                </span>
              </h3>

              <p className="text-xl text-muted-foreground leading-relaxed">
                Tu tienda de confianza para lanas, hilos y accesorios de manualidades
                en Sanlúcar de Barrameda. Creando vínculos a través del hilo desde hace años.
              </p>

              <div className="flex flex-col space-y-4 text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0" />
                  <span className="text-lg">{location}</span>
                </div>

                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0" />
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-lg hover:text-primary transition-colors"
                  >
                    {contactEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Servicios - Más hacia la derecha */}
            {sections.map((section, index) => (
              <div key={index} className="lg:col-span-3 lg:col-start-7 space-y-6">
                <h4 className="font-bold text-2xl text-foreground">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-lg text-muted-foreground hover:text-primary transition-colors duration-200 block py-1"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Desarrollo - Alineado horizontalmente con Servicios */}
            <div className="lg:col-span-4 lg:col-start-10 space-y-6">
              <h4 className="font-bold text-2xl text-foreground">Desarrollo</h4>
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <Heart className="h-6 w-6 text-rose-500 flex-shrink-0 mt-1" />
                  <div className="space-y-3">
                    <p className="text-lg font-medium text-foreground">
                      Desarrollado con amor
                    </p>
                    <p className="text-lg text-muted-foreground">
                      Javier Rodríguez López
                    </p>
                    <div className="text-base text-muted-foreground/70 pt-3 border-t border-border/30">
                      Full Stack Developer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Línea separadora y copyright */}
        <div className="border-t border-border/50 mt-16 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © 2024 Doña Araña. Todos los derechos reservados.
            </p>

            <p className="text-sm brand-text font-medium text-center md:text-right">
              Tejiendo sueños, creando memorias
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}