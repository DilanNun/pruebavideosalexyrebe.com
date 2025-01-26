import { Mic, Users2, BookOpen, Calendar } from 'lucide-react';

export const navigationItems = [
  {
    title: "Conferencias",
    subtitle: "Inspiración que transforma",
    icon: Mic,
    image: "https://i.postimg.cc/bvCG39sv/grid1.jpg",
    href: "/conferencias",
    page: 'conferencias'
  },
  {
    title: "Mentorías",
    subtitle: "Guía personalizada",
    icon: BookOpen,
    image: "https://i.postimg.cc/Y9Tvw2NK/grid2.jpg",
    href: "/mentorias",
    page: 'mentorias'
  },
  {
    title: "Nosotros",
    subtitle: "Nuestra Historia",
    icon: Users2,
    image: "https://i.postimg.cc/4ytm4CwK/grid3.jpg",
    href: "/nosotros",
    page: 'nosotros'
  },
  {
    title: "Contacto",
    subtitle: "Experiencia exclusiva",
    icon: Calendar,
    image: "https://i.postimg.cc/2611JLZ7/grid4.jpg",
    href: "#contacto",
    page: 'contacto'
  }
];