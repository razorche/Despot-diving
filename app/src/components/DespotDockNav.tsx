import type { ReactNode } from 'react';
import {
  Waves,
  MapPinned,
  GraduationCap,
  Users,
  Images,
  Newspaper,
  Mail,
  CalendarCheck,
  Home,
} from 'lucide-react';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import { DespotMark } from '@/components/icons/DespotMark';

const WWW_BASE = import.meta.env.VITE_WWW_BASE ?? 'http://localhost:3000';

type DockLink = {
  title: string;
  href: string;
  icon: ReactNode;
  accent?: boolean;
};

const navItems: DockLink[] = [
  {
    title: 'Početna',
    href: `${WWW_BASE}/index.html`,
    icon: <Home className="h-full w-full text-[#e8f6f8]" />,
  },
  {
    title: 'Ronjenje',
    href: `${WWW_BASE}/service.html`,
    icon: <Waves className="h-full w-full text-[#3ecfd6]" />,
  },
  {
    title: 'Lokacije',
    href: `${WWW_BASE}/project.html`,
    icon: <MapPinned className="h-full w-full text-[#e8f6f8]" />,
  },
  {
    title: 'Kursevi',
    href: `${WWW_BASE}/courses.html`,
    icon: <GraduationCap className="h-full w-full text-[#e8f6f8]" />,
  },
  {
    title: 'O nama',
    href: `${WWW_BASE}/about.html`,
    icon: <Users className="h-full w-full text-[#e8f6f8]" />,
  },
  {
    title: 'Klub',
    href: `${WWW_BASE}/index.html`,
    icon: <DespotMark className="h-full w-full text-[#3ecfd6]" />,
    accent: true,
  },
  {
    title: 'Galerija',
    href: `${WWW_BASE}/galerija.html`,
    icon: <Images className="h-full w-full text-[#e8f6f8]" />,
  },
  {
    title: 'Blog',
    href: `${WWW_BASE}/news.html`,
    icon: <Newspaper className="h-full w-full text-[#e8f6f8]" />,
  },
  {
    title: 'Kontakt',
    href: `${WWW_BASE}/contact.html`,
    icon: <Mail className="h-full w-full text-[#e8f6f8]" />,
  },
  {
    title: 'Rezerviši',
    href: `${WWW_BASE}/contact.html`,
    icon: <CalendarCheck className="h-full w-full text-[#0c2d3a]" />,
    accent: true,
  },
];

function DockLinkItem({ item }: { item: DockLink }) {
  return (
    <a
      href={item.href}
      className="block h-full w-full rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#3ecfd6]"
      aria-label={item.title}
    >
      <DockItem
        className={
          item.accent
            ? 'aspect-square rounded-full bg-gradient-to-b from-[#3ecfd6] to-[#1565a8] ring-2 ring-white/30'
            : 'aspect-square rounded-full bg-[#1565a8]/90 ring-1 ring-white/15'
        }
      >
        <DockLabel>{item.title}</DockLabel>
        <DockIcon>{item.icon}</DockIcon>
      </DockItem>
    </a>
  );
}

export function DespotDockNav() {
  return (
    <nav
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[1000] flex justify-center pb-4 md:pb-6"
      aria-label="Glavna navigacija — Despot Ronilački Klub"
    >
      <div className="pointer-events-auto w-full max-w-[100vw] px-2">
        <Dock className="items-end pb-2" panelHeight={56} magnification={72}>
          {navItems.map((item) => (
            <DockLinkItem key={item.title} item={item} />
          ))}
        </Dock>
      </div>
    </nav>
  );
}
