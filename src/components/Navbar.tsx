import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, Sparkles, Send } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'หน้าแรก', enLabel: 'Home' },
    { id: 'about', label: 'เกี่ยวกับฉัน', enLabel: 'About' },
    { id: 'skills', label: 'ทักษะ', enLabel: 'Skills' },
    { id: 'experience', label: 'ประสบการณ์', enLabel: 'Experience' },
    { id: 'projects', label: 'ผลงาน', enLabel: 'Projects' },
    { id: 'contact', label: 'ติดต่อ', enLabel: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B1329]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-white group focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-1"
            id="nav-logo"
          >
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:border-emerald-500/50 transition-colors">
              <Code2 className="w-5 h-5" />
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-emerald-400 font-bold">&lt;/&gt;</span>
              <span className="font-extrabold text-white tracking-wider">{personalInfo.displayName}</span>
              <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-sm shadow-inner">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500 text-[#0B1329] font-semibold shadow-sm shadow-emerald-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {item.enLabel}
                </button>
              );
            })}
          </nav>

          {/* Action Button: Contact */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="nav-btn-contact"
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-[#0B1329] hover:from-emerald-400 hover:to-teal-400 transition-all duration-200 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 cursor-pointer active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <Send className="w-3.5 h-3.5" />
              <span>ติดต่อฉัน</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              id="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-emerald-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="md:hidden bg-[#0B1329]/95 backdrop-blur-xl border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 mt-2 shadow-2xl animate-in slide-in-from-top duration-200"
        >
          <div className="px-3 py-2 text-xs font-mono uppercase tracking-wider text-emerald-400/80 flex items-center gap-1.5 border-b border-slate-800/60 pb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Navigation Menu</span>
          </div>
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-left text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs font-mono text-slate-500">{item.enLabel}</span>
              </button>
            );
          })}
          <div className="pt-3 border-t border-slate-800/80">
            <button
              id="mobile-drawer-contact"
              onClick={() => scrollToSection('contact')}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-[#0B1329] font-bold text-sm shadow-md cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>ติดต่อฉัน (Contact Me)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
