import {
  BadgeCheck,
  BriefcaseBusiness,
  CalendarRange,
  Coffee,
  Gift,
  HandPlatter,
  LayoutGrid,
  PackageCheck,
  Palette,
  Sparkles,
  Store,
  Truck
} from "lucide-react";

export const whatsappUrl =
  "https://wa.me/50234682894?text=Hola%20DonutWorry_GT,%20quiero%20cotizar%20mini%20donas%20para%20mi%20empresa%20o%20evento.";

export const navLinks = [
  { label: "Catalogo", href: "#catalogo" },
  { label: "Empresas", href: "#empresas" },
  { label: "Galeria", href: "#galeria" },
  { label: "Cotizacion", href: "#cotizacion" }
];

export const benefits = [
  {
    title: "Pedidos por mayor",
    description: "Capacidad para abastecer oficinas, ferias y celebraciones empresariales.",
    icon: PackageCheck
  },
  {
    title: "Personalizacion para eventos",
    description: "Adaptamos toppings, presentacion y concepto segun tu ocasion.",
    icon: Palette
  },
  {
    title: "Presentacion premium",
    description: "Boxes, bandejas y detalles que elevan la experiencia de marca.",
    icon: Gift
  },
  {
    title: "Ideal para oficinas",
    description: "Perfecto para coffee breaks, cierres mensuales y reuniones de equipo.",
    icon: Coffee
  },
  {
    title: "Entregas coordinadas",
    description: "Planificacion puntual para eventos, activaciones y jornadas especiales.",
    icon: Truck
  },
  {
    title: "Calidad artesanal",
    description: "Mini donas frescas, visualmente irresistibles y hechas con cuidado.",
    icon: BadgeCheck
  }
];

export type Product = {
  title: string;
  description: string;
  image: string;
  priceLabel: string;
  priceValue: number;
  packageDetails?: string[];
};

export const products: Product[] = [
  {
    title: "Mini donas clasicas",
    description: "Incluye 5 mini donas con 1 topping, ideal para detalles dulces y pedidos puntuales.",
    image: "/media/5_minidonas.jpg",
    priceLabel: "Q10",
    priceValue: 10,
    packageDetails: ["5 uds", "1 topping"]
  },
  {
    title: "Mini donas con chocolate",
    description: "Incluye 10 mini donas con 2 toppings, perfecto para compartir en oficinas y reuniones.",
    image: "/media/10_minidonas.jpg",
    priceLabel: "Q20",
    priceValue: 20,
    packageDetails: ["10 uds", "2 toppings"]
  },
  {
    title: "Mini donas personalizadas",
    description: "Incluye 15 mini donas con 3 toppings para una presentacion mas abundante y vistosa.",
    image: "/media/15_minidonas.jpg",
    priceLabel: "Q30",
    priceValue: 30,
    packageDetails: ["15 uds", "3 toppings"]
  },
  {
    title: "Mini donas con toppings",
    description: "Version con acabados mas visuales y toppings variados para pedidos especiales.",
    image: "/media/5_minidonas_botonetas.jpg",
    priceLabel: "Consultar",
    priceValue: 0,
    packageDetails: ["Paquete especial", "Toppings variados"]
  },
  {
    title: "Bandejas para eventos",
    description: "Presentaciones listas para mesas dulces, ferias y eventos corporativos.",
    image: "/media/paqueques_15.jpg",
    priceLabel: "Q15",
    priceValue: 15,
    packageDetails: ["Formato para eventos"]
  },
  {
    title: "Box corporativo",
    description: "Una entrega premium para sorprender colaboradores, clientes y aliados.",
    image: "/media/super_wafles_25.jpg",
    priceLabel: "Q25",
    priceValue: 25,
    packageDetails: ["Box listo para regalo"]
  }
];

export function buildProductWhatsappUrl(productTitle: string, priceLabel: string) {
  const message = encodeURIComponent(
    `Hola DonutWorry_GT, quiero solicitar este producto:\nProducto: ${productTitle}\nPrecio: ${priceLabel}\nQuiero mas informacion y disponibilidad.`
  );

  return `https://wa.me/50234682894?text=${message}`;
}

export function buildWhatsappFormUrl(message: string) {
  return `https://wa.me/50234682894?text=${encodeURIComponent(message)}`;
}

export const businessUseCases = [
  { title: "Coffee breaks", icon: Coffee },
  { title: "Eventos corporativos", icon: BriefcaseBusiness },
  { title: "Regalos empresariales", icon: Gift },
  { title: "Ferias", icon: LayoutGrid },
  { title: "Activaciones de marca", icon: Sparkles },
  { title: "Reuniones", icon: CalendarRange }
];

export const personalization = [
  "Colores de marca en toppings y detalles visuales",
  "Empaques y stickers personalizados para campanas",
  "Volumenes altos para oficinas, ferias y eventos masivos",
  "Mix de sabores y decoraciones para ocasiones especiales",
  "Propuestas pensadas para reforzar la experiencia de tu marca"
];

export type GalleryItem = {
  src: string;
  focusProduct?: boolean;
};

export const galleryImages: GalleryItem[] = [
  { src: "/media/15_minidonas.jpg" },
  { src: "/media/10_minidonas.jpg" },
  { src: "/media/5_minidonas_botonetas.jpg" },
  { src: "/media/5_minidonas.jpg" },
  { src: "/media/desayuno_3D.jpg", focusProduct: true },
  { src: "/media/paqueques_15.jpg", focusProduct: true }
];

export const testimonials = [
  {
    quote:
      "La presentacion fue impecable y el equipo quedo encantado. Elevo por completo nuestro evento interno.",
    name: "Maria Lopez",
    role: "Coordinacion de RR. HH.",
    company: "Grupo Corporativo Demo"
  },
  {
    quote:
      "Necesitabamos algo visual, rico y facil de servir en feria. DonutWorry_GT resolvio todo con excelente actitud.",
    name: "Jorge Ramirez",
    role: "Brand Manager",
    company: "Empresa Demo GT"
  },
  {
    quote:
      "Nos ayudaron a personalizar una entrega para clientes clave y se sintio premium desde el empaque hasta el sabor.",
    name: "Ana Castillo",
    role: "Marketing B2B",
    company: "Soluciones Empresariales"
  }
];

export const processSteps = [
  {
    title: "Indica tu pedido",
    description: "Cuentanos el tipo de evento, fecha, cantidades y estilo deseado.",
    icon: Store
  },
  {
    title: "Personalizamos",
    description: "Ajustamos sabores, toppings, colores de marca y presentacion final.",
    icon: Palette
  },
  {
    title: "Confirmamos entrega",
    description: "Coordinamos logistica y detalles para que todo llegue en tiempo.",
    icon: HandPlatter
  },
  {
    title: "Disfruta",
    description: "Tus clientes, colaboradores e invitados reciben una experiencia memorable.",
    icon: Sparkles
  }
];
