import React from 'react';
import { ArrowUp, Code2, Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-[#080E21] border-t border-slate-800/80 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Code2 className="w-4 h-4" />
              </span>
              <span className="font-mono text-emerald-400 font-bold text-lg">&lt;/&gt;</span>
              <span className="font-bold text-white tracking-wider text-lg">
                {personalInfo.displayName}
              </span>
            </div>
            <span className="hidden sm:inline-block text-slate-700">|</span>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              "Keep Learning • Keep Growing • Build the Future"
            </p>
          </div>

          {/* Copyright & Back to Top */}
          <div className="flex items-center gap-6">
            <div className="text-xs text-slate-400 font-mono">
              © 2026 Bank. All rights reserved.
            </div>

            <button
              id="footer-back-to-top"
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-800/80 text-slate-300 hover:text-emerald-400 hover:bg-slate-700/80 border border-slate-700/80 transition-all duration-200 cursor-pointer shadow-md hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center group"
              aria-label="Back to top"
              title="กลับขึ้นสู่ด้านบน"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
