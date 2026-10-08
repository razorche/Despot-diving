import { createRoot } from 'react-dom/client';
import '../nav.css';
import { AnimatedDespotNav } from '@/components/ui/navigation-menu';

const mount = document.getElementById('despot-framer-nav');
if (mount) {
  const activePage = mount.getAttribute('data-active-page') || 'index.html';
  createRoot(mount).render(<AnimatedDespotNav activePage={activePage} />);
}
