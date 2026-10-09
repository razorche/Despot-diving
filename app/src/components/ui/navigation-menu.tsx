'use client';

import * as React from 'react';
import { motion, useScroll, useMotionValueEvent, type Variants } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';

import { DespotClubLogo } from '@/components/icons/DespotClubLogo';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const PILL_ITEMS = [
  { name: 'Početna', href: 'index.html', key: 'index.html' },
  { name: 'Ronjenje', href: 'service.html', key: 'service.html' },
  { name: 'Kursevi', href: 'courses.html', key: 'courses.html' },
  { name: 'Kontakt', href: 'contact.html', key: 'contact.html' },
];

const SHEET_ITEMS = [
  { name: 'Lokacije', href: 'project.html', key: 'project.html' },
  { name: 'O nama', href: 'about.html', key: 'about.html' },
  { name: 'Galerija', href: 'galerija.html', key: 'galerija.html' },
  { name: 'Blog', href: 'news.html', key: 'news.html' },
];

const EXPAND_SCROLL_THRESHOLD = 80;

const containerVariants: Variants = {
  expanded: {
    y: 0,
    opacity: 1,
    width: 'auto',
    transition: {
      y: { type: 'spring', damping: 18, stiffness: 250 },
      opacity: { duration: 0.3 },
      type: 'spring',
      damping: 20,
      stiffness: 300,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  collapsed: {
    y: 0,
    opacity: 1,
    width: '3.25rem',
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 300,
      when: 'afterChildren',
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const logoVariants: Variants = {
  expanded: { opacity: 1, x: 0, scale: 1, transition: { type: 'spring', damping: 18, stiffness: 280 } },
  collapsed: { opacity: 0, x: -12, scale: 0.92, transition: { duration: 0.22 } },
};

const itemVariants: Variants = {
  expanded: { opacity: 1, x: 0, scale: 1, transition: { type: 'spring', damping: 15 } },
  collapsed: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.2 } },
};

const collapsedIconVariants: Variants = {
  expanded: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  collapsed: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', damping: 15, stiffness: 300, delay: 0.15 },
  },
};

function isActive(activePage: string, key: string) {
  const map: Record<string, string[]> = {
    'index.html': ['index.html'],
    'service.html': ['service.html', 'service-details.html'],
    'project.html': ['project.html', 'project-details.html'],
    'courses.html': ['courses.html', 'courses-details.html'],
    'about.html': ['about.html', 'team.html', 'team-details.html'],
    'galerija.html': ['galerija.html'],
    'news.html': ['news.html', 'news-grid.html', 'news-details.html'],
    'contact.html': ['contact.html'],
    'faq.html': ['faq.html'],
  };
  for (const [navKey, pages] of Object.entries(map)) {
    if (pages.includes(activePage)) return navKey === key;
  }
  return activePage === key;
}

export function AnimatedDespotNav({ activePage = 'index.html' }: { activePage?: string }) {
  const [isExpanded, setExpanded] = React.useState(true);
  const [sheetOpen, setSheetOpen] = React.useState(false);

  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);
  const scrollPositionOnCollapse = React.useRef(0);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = lastScrollY.current;

    if (isExpanded && latest > previous && latest > 150) {
      setExpanded(false);
      scrollPositionOnCollapse.current = latest;
    } else if (
      !isExpanded &&
      latest < previous &&
      scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD
    ) {
      setExpanded(true);
    }

    lastScrollY.current = latest;
  });

  const handleNavClick = (e: React.MouseEvent) => {
    if (!isExpanded) {
      e.preventDefault();
      setExpanded(true);
    }
  };

  const linkClass = (key: string) =>
    cn(
      'despot-nav-link text-sm font-semibold transition-colors px-2 py-1 whitespace-nowrap uppercase tracking-wide',
      isActive(activePage, key) && 'despot-nav-link--active',
    );

  return (
    <div className="fixed top-6 left-1/2 z-[9999] -translate-x-1/2">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={isExpanded ? 'expanded' : 'collapsed'}
        variants={containerVariants}
        whileHover={!isExpanded ? { scale: 1.08 } : {}}
        whileTap={!isExpanded ? { scale: 0.95 } : {}}
        onClick={handleNavClick}
        className={cn(
          'flex h-[3.25rem] items-center overflow-hidden rounded-full border border-white/15 bg-[#0a1520]/95 shadow-lg shadow-black/30 backdrop-blur-xl',
          !isExpanded && 'cursor-pointer justify-center',
        )}
      >
        <motion.a
          href="index.html"
          variants={logoVariants}
          onClick={(e) => e.stopPropagation()}
          className="flex shrink-0 items-center py-1 pl-2.5 pr-1 sm:pl-3"
          aria-label="Despot Ronilački Klub — početna"
        >
          <DespotClubLogo
            variant="full"
            className="h-[2rem] w-auto max-w-[min(11.5rem,38vw)] drop-shadow-[0_1px_8px_rgba(62,207,214,0.25)] sm:h-[2.125rem] sm:max-w-[13rem]"
          />
        </motion.a>

        <motion.div
          className={cn(
            'flex items-center gap-0.5 pr-1 sm:gap-2 sm:pr-2',
            !isExpanded && 'pointer-events-none',
          )}
        >
          {PILL_ITEMS.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              variants={itemVariants}
              onClick={(e) => e.stopPropagation()}
              className={linkClass(item.key)}
            >
              {item.name}
            </motion.a>
          ))}

          <motion.div variants={itemVariants} onClick={(e) => e.stopPropagation()}>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="despot-nav-link h-9 w-9 shrink-0"
                  aria-label="Još stranica"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="border-white/10 bg-background">
                <SheetHeader>
                  <SheetTitle className="sr-only">Navigacija — Despot Ronilački Klub</SheetTitle>
                  <DespotClubLogo
                    variant="full"
                    className="h-10 w-auto max-w-[220px] drop-shadow-[0_1px_8px_rgba(62,207,214,0.2)]"
                  />
                  <p className="text-left text-xs uppercase tracking-widest text-muted-foreground">
                    Ronilački klub · Budva
                  </p>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-3" aria-label="Puna navigacija">
                  {[...PILL_ITEMS, ...SHEET_ITEMS].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'text-base font-medium uppercase tracking-wide',
                        isActive(activePage, item.key) ? 'despot-nav-link despot-nav-link--active' : 'despot-nav-link',
                      )}
                      onClick={() => setSheetOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                  <a
                    href="contact.html"
                    className="despot-nav-cta mt-4 inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-semibold uppercase tracking-wide"
                    onClick={() => setSheetOpen(false)}
                  >
                    <span className="despot-nav-cta-label">Rezerviši zaron</span>
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </motion.div>

          <motion.a
            href="contact.html"
            variants={itemVariants}
            onClick={(e) => e.stopPropagation()}
            className="despot-nav-cta hidden rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide lg:inline-flex"
          >
            <span className="despot-nav-cta-label">Rezerviši</span>
          </motion.a>
        </motion.div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <motion.div variants={collapsedIconVariants} animate={isExpanded ? 'expanded' : 'collapsed'}>
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a2540]/90 p-1 ring-1 ring-[#3ecfd6]/35"
              aria-hidden
            >
              <DespotClubLogo variant="mark" className="h-full w-full" title="" />
            </span>
          </motion.div>
        </div>
      </motion.nav>
    </div>
  );
}

export { AnimatedDespotNav as AnimatedNavFramer };
