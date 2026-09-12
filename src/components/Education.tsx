import React from 'react';
import {
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  BookOpen,
  CheckCircle,
} from 'lucide-react';
import { educationList } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 lg:py-28 bg-[#0B1329] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            EDUCATION
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ประวัติการศึกษา
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mt-3" />
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central/left line */}
          <div className="absolute top-6 bottom-6 left-4 sm:left-8 w-0.5 bg-gradient-to-b from-emerald-500 via-teal-500/50 to-slate-800" />

          <div className="space-y-8">
            {educationList.map((edu, index) => (
              <div
                key={index}
                id={`education-node-${index}`}
                className="relative pl-12 sm:pl-20 group"
              >
                {/* Node icon indicator */}
                <div className="absolute left-1.5 sm:left-5 top-4 -translate-x-1/2 w-8 h-8 rounded-xl bg-slate-900 border-2 border-emerald-500 group-hover:border-teal-300 flex items-center justify-center text-emerald-400 shadow-md shadow-emerald-500/20 transition-all duration-300 group-hover:scale-110">
                  <GraduationCap className="w-4 h-4" />
                </div>

                {/* Card Container */}
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/95 to-[#0D1836]/95 border border-slate-800/90 group-hover:border-emerald-500/40 transition-all duration-300 shadow-xl group-hover:shadow-emerald-500/10">
                  {/* Header info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium">
                        {edu.status || (edu.gpa ? `GPA: ${edu.gpa}` : 'การศึกษา')}
                      </span>
                      {edu.gpa && (
                        <span className="inline-flex items-center gap-1 text-xs font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          <Award className="w-3 h-3" />
                          <span>GPA {edu.gpa}</span>
                        </span>
                      )}
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-800/80 px-3 py-1 rounded-md border border-slate-700/60">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{edu.period}</span>
                    </div>
                  </div>

                  {/* Degree and Institution */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5 group-hover:text-emerald-300 transition-colors">
                    {edu.degree}
                  </h3>

                  {(edu.major || edu.faculty) && (
                    <p className="text-base text-emerald-400 font-medium mb-1">
                      {edu.major && `สาขา: ${edu.major}`}
                      {edu.faculty && ` • ${edu.faculty}`}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-sm text-slate-300 font-medium mb-4">
                    <BookOpen className="w-4 h-4 text-teal-400" />
                    <span>{edu.institution}</span>
                    {edu.location && (
                      <span className="text-slate-500 text-xs">({edu.location})</span>
                    )}
                  </div>

                  {/* Bullet Highlights */}
                  <div className="pt-4 border-t border-slate-800/70 space-y-2">
                    {edu.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-emerald-400/80 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
