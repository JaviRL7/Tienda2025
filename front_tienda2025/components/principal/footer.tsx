import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#2D2A2A] text-white py-8 px-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Sección de información general */}
        <div>
          <h3 className="text-xl font-bold mb-4">Sobre Nosotros</h3>
          <p className="text-gray-300">Somos una tienda dedicada a ofrecer productos de la mejor calidad. Nos apasiona la satisfacción de nuestros clientes.</p>
        </div>

        {/* Sección de links rápidos */}
        <div>
          <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline">Inicio</a></li>
            <li><a href="/productos" className="hover:underline">Productos</a></li>
            <li><a href="/sobre-nosotros" className="hover:underline">Sobre Nosotros</a></li>
            <li><a href="/contacto" className="hover:underline">Contacto</a></li>
          </ul>
        </div>

        {/* Sección de redes sociales */}
        <div>
          <h3 className="text-xl font-bold mb-4">Síguenos</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaFacebook size={24} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaTwitter size={24} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* Sección de contacto */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contacto</h3>
          <p className="text-gray-300">Teléfono: +34 123 456 789</p>
          <p className="text-gray-300">Email: info@tienda2025.com</p>
          <p className="text-gray-300">Dirección: Calle Ejemplo, 123, Madrid, España</p>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
        &copy; {new Date().getFullYear()} Tienda 2025. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
