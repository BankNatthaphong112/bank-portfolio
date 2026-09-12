import React from 'react';
import {
  GraduationCap,
  Laptop,
  Code2,
  Rocket,
  Quote,
  CheckCircle,
  Terminal,
  Cpu,
} from 'lucide-react';
import { personalInfo, aboutHighlights } from '../data/portfolioData';

export const About: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    GraduationCap: <GraduationCap className="w-6 h-6 text-emerald-400" />,
    Laptop: <Laptop className="w-6 h-6 text-teal-400" />,
    Code2: <Code2 className="w-6 h-6 text-cyan-400" />,
    Rocket: <Rocket className="w-6 h-6 text-emerald-400" />,
  };

  return (
    <section
      id="about"
      className="py-20 lg:py-28 bg-[#0D1630] border-t border-b border-slate-800/80 relative overflow-hidden"
    >
      {/* Subtle Background Elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            ABOUT ME
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            เกี่ยวกับฉัน
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mt-3" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Story & Philosophy & Quote */}
          <div className="lg:col-span-6 space-y-6">
            {/* Main Narrative Card */}
            <div className="p-7 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-xl backdrop-blur-sm relative">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-4">
                <Terminal className="w-4 h-4" />
                <span>who_i_am.tsx</span>
              </div>
              <p className="text-slate-200 text-lg leading-relaxed font-normal mb-6">
                {personalInfo.aboutLong}
              </p>
              <div className="pt-5 border-t border-slate-800/80 flex flex-wrap gap-4 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/60">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Frontend Focus</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/60">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>UI/UX Mindset</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/60">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Fast Learner</span>
                </div>
              </div>
            </div>

            {/* Quote Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900/80 to-teal-950/40 border border-emerald-500/20 shadow-lg relative overflow-hidden">
              <Quote className="absolute -bottom-3 -right-3 w-20 h-20 text-emerald-500/10 pointer-events-none" />
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                    Guiding Motto
                  </div>
                  <blockquote className="text-base sm:text-lg font-semibold text-white italic">
                    "{personalInfo.quote}"
                  </blockquote>
                  <p className="text-xs text-slate-400 mt-1">
                    — ความมุ่งมั่นในการเขียนโค้ดและพัฒนาศักยภาพอย่างต่อเนื่องในทุก ๆ วัน
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Visual Information Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aboutHighlights.map((card, idx) => (
              <div
                key={idx}
                id={`about-card-${idx}`}
                className="p-6 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800/90 hover:border-emerald-500/40 transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-emerald-500/10 group flex flex-col justify-between"
              >
                <div>
                  <div className="inline-flex p-3 rounded-xl bg-slate-800/90 border border-slate-700/60 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10 transition-colors mb-4">
                    {iconMap[card.icon]}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>0{idx + 1} // Core Pillar</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
