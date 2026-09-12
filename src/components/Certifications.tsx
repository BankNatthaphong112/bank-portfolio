import React from 'react';
import { Shield, Award, CheckCircle, ExternalLink, Network } from 'lucide-react';
import { certificationsList } from '../data/portfolioData';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-16 lg:py-24 bg-[#0B1329] border-t border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            CERTIFICATIONS & ACTIVITIES
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            ใบรับรองและกิจกรรมการเรียนรู้
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mt-3" />
        </div>

        {/* Compact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certificationsList.map((cert, index) => (
            <div
              key={index}
              id={`cert-card-${index}`}
              className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0D1836]/90 border border-slate-800/90 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-emerald-500/10 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700/60 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10 transition-colors">
                    {index === 0 ? (
                      <Shield className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Network className="w-5 h-5 text-teal-400" />
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>{cert.status}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-emerald-300 transition-colors">
                  {cert.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">
                  {cert.issuer}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{cert.category}</span>
                <span className="text-emerald-400 font-semibold">Verified Credential</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
