"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components = [
  {
    title: "Lanas",
    href: "/productos/lanas",
    description: "Explora nuestra variedad de lanas de diferentes colores y texturas para tus proyectos.",
  },
  {
    title: "Hilos",
    href: "/productos/hilos",
    description: "Encuentra hilos de alta calidad perfectos para costura, bordado y más.",
  },
  {
    title: "Accesorios",
    href: "/productos/accesorios",
    description: "Accesorios esenciales para complementar tus manualidades y proyectos creativos.",
  },
  {
    title: "Kits",
    href: "/productos/kits",
    description: "Kits completos que incluyen todo lo necesario para tus proyectos de tejido y crochet.",
  },
  {
    title: "Ofertas",
    href: "/productos/ofertas",
    description: "Aprovecha nuestras ofertas especiales y promociones en productos seleccionados.",
  },
  {
    title: "Novedades",
    href: "/productos/novedades",
    description: "Descubre las últimas incorporaciones a nuestra tienda, con nuevos productos cada temporada.",
  },
];

const ListItem = ({ title, href, children }: { title: string; href: string; children: React.ReactNode }) => (
  <li>
    <Link href={href} className="block p-3 rounded-md hover:bg-muted">
      {title}
    </Link>
    <p className="text-sm text-muted-foreground">{children}</p>
  </li>
);


const MenuList = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Inicio</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">Doña Araña</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Tu tienda online con todo lo necesario para tejidos, costura y manualidades.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/sobre-nosotros" title="Sobre Nosotros">
                Conoce más acerca de nuestra tienda, nuestro equipo y misión.
              </ListItem>
              <ListItem href="/tienda" title="Tienda">
                Descubre todos nuestros productos y categorías disponibles.
              </ListItem>
              <ListItem href="/contacto" title="Contacto">
                Si tienes dudas, contáctanos y estaremos encantados de ayudarte.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Productos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentación
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MenuList;
