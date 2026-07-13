import { motion, AnimatePresence } from 'framer-motion';
import type { NavItem } from './NavbarModel';
import logoImg from '../../assets/Logo.svg';
import githubIcon from '../../assets/icon-github.svg';
import linkedinIcon from '../../assets/icon-linkedin.svg';

interface NavbarViewProps {
  isSticky: boolean;
  isMobileMenuOpen: boolean;
  activeSection: string;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  navItems: NavItem[];
  onAdminClick?: () => void;
}

export function NavbarView({
  isSticky,
  isMobileMenuOpen,
  activeSection,
  toggleMobileMenu,
  scrollToSection,
  navItems,
  onAdminClick,
}: NavbarViewProps) {
  return (
    <motion.nav
      className={`glass-nav rounded-2xl flex flex-col justify-center px-6 py-3 transition-all duration-300 shadow-lg ${isSticky
        ? 'fixed top-4 left-4 right-4 z-50 max-w-[1376px] mx-auto'
        : 'relative mb-16'
        }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img alt="Logo" className="w-[38px] h-[41px] object-contain" src={logoImg} />
          <span className="text-[27px] font-bold tracking-tight text-white">gerson</span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item, i) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`px-4 py-1.5 font-light hover:text-white transition relative group text-[16px] ${isActive
                  ? 'bg-[rgba(128,128,128,0.32)] rounded-[4px] text-white font-normal'
                  : 'text-[#e8e8e8]'
                  }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                data-cursor-hover
              >
                {item.label}
              </motion.a>
            );
          })}
          {onAdminClick && (
            <motion.button
              onClick={onAdminClick}
              className="ml-4 px-3 py-1.5 text-xs border border-blue-500 text-blue-400 hover:bg-blue-900/30 rounded transition cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              data-cursor-hover
            >
              Backend Admin
            </motion.button>
          )}
        </div>

        {/* Desktop Social Icons */}
        <motion.div
          className="hidden md:flex items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <a href="https://github.com/CallMeSon" target="_blank" rel="noreferrer" className="w-8 h-[31px] hover:opacity-80 transition" data-cursor-hover>
            <img alt="Github" src={githubIcon} className="w-full h-full object-contain" />
          </a>
          <a href="https://www.linkedin.com/in/gerson-sebastian-860124261/" target="_blank" rel="noreferrer" className="w-8 h-8 hover:opacity-80 transition" data-cursor-hover>
            <img alt="Linkedin" src={linkedinIcon} className="w-full h-full object-contain" />
          </a>
        </motion.div>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="flex md:hidden items-center gap-4">
          {onAdminClick && (
            <button
              onClick={onAdminClick}
              className="px-2 py-1 text-[10px] border border-blue-500 text-blue-400 rounded transition"
            >
              Admin
            </button>
          )}
          <button
            onClick={toggleMobileMenu}
            className="text-white hover:text-gray-300 focus:outline-none p-1"
            aria-label="Toggle Menu"
            data-cursor-hover
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav Links Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden flex flex-col gap-4 mt-4 pt-4 border-t border-white/10 w-full"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`px-4 py-2 text-sm font-light transition rounded-md ${isActive
                    ? 'bg-[rgba(128,128,128,0.32)] text-white font-normal'
                    : 'text-[#e8e8e8] hover:bg-white/5'
                    }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="flex items-center gap-6 px-4 py-2 border-t border-white/5 mt-2">
              <a href="https://github.com/CallMeSon" target="_blank" rel="noreferrer" className="w-6 h-6 hover:opacity-80 transition">
                <img alt="Github" src={githubIcon} className="w-full h-full object-contain" />
              </a>
              <a href="https://www.linkedin.com/in/gerson-sebastian-860124261/" target="_blank" rel="noreferrer" className="w-6 h-6 hover:opacity-80 transition">
                <img alt="Linkedin" src={linkedinIcon} className="w-full h-full object-contain" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
