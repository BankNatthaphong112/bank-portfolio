import React from 'react';
import {
  Briefcase,
  Calendar,
  Building2,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Code2,
} from 'lucide-react';
import { experienceList } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      className="py-20 lg:py-28 bg-[#0D1630] border-t border-slate-800/80 relative overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            EXPERIENCE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ประสบการณ์การทำงาน
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mt-3" />
        </div>

        {/* Experience Showcase Card */}
        <div className="space-y-8">
          {experienceList.map((exp, index) => (
            <div
              key={index}
              id={`experience-item-${index}`}
              className="rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-[#0B1329] border border-emerald-500/30 shadow-2xl p-7 sm:p-10 relative overflow-hidden transition-all duration-300 hover:border-emerald-500/50"
            >
              {/* Top ambient glow badge */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                {/* Left meta info */}
                <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-800 pb-6 lg:pb-0 lg:pr-8">
                  {/* Verified internship badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-4">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Verified Professional Internship</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                    {exp.role}
                  </h3>

                  <div className="flex items-center gap-2 text-base text-slate-300 font-medium mb-3">
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    <span>{exp.company}</span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 text-xs font-mono text-emerald-400 border border-slate-700/80 mb-6">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>

                  {/* Skills Applied */}
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                      Core Competencies:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-300 text-xs font-medium border border-slate-700/60"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right responsibilities and deliverables */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    <Code2 className="w-4 h-4 text-emerald-400" />
                    <span>หน้าที่และความรับผิดชอบหลัก (Key Responsibilities & Deliverables)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <div
                        key={rIdx}
                        className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/30 transition-all flex items-start gap-3"
                      >
                        <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-200 leading-relaxed font-medium">
                            {resp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary Callout Box */}
                  <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-slate-800/60 to-slate-900/60 border border-slate-700/60 flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-teal-500/15 flex items-center justify-center text-teal-400">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">
                          การทำงานจริงในระดับองค์กร (Enterprise Exposure)
                        </div>
                        <div className="text-[12px] text-slate-400">
                          มีประสบการณ์ร่วมงานกับทีมพัฒนาจริง เข้าใจวงจรชีวิตของระบบเว็บและการส่งมอบงาน
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
