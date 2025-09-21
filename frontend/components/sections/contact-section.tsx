'use client';

import { Button } from '@/components/ui/button';
import { Mail, MessageCircle } from 'lucide-react';

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  email?: string;
  className?: string;
}

export default function ContactSection({
  title = "¿Tienes alguna pregunta?",
  subtitle = "Contacta con nosotros",
  description = "Nuestro equipo está aquí para ayudarte con cualquier consulta sobre nuestros productos o servicios",
  email = "jrlsanlucar11@gmail.com",
  className = ""
}: ContactSectionProps) {
  const handleEmailClick = () => {
    const subject = "Consulta desde Doña Araña";
    const body = "Hola, me gustaría hacer una consulta sobre...";
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <section className={`py-24 bg-primary text-primary-foreground ${className}`}>
      <div className="container text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {title}
            </h2>
            <h3 className="text-2xl md:text-3xl font-semibold opacity-90">
              {subtitle}
            </h3>
            <p className="text-xl opacity-80 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              onClick={handleEmailClick}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 h-14 px-8 text-lg font-semibold"
            >
              <Mail className="h-5 w-5 mr-3" />
              Escribir Email
            </Button>

            <div className="flex items-center space-x-3 text-white/80">
              <MessageCircle className="h-5 w-5" />
              <span className="text-lg">{email}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}