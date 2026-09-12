import React, { useState } from 'react';
import {
  Layout,
  Server,
  Database,
  Wrench,
  Sparkles,
  Code,
  CheckCircle2,
  Terminal,
  Zap,
} from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const categoryIcons: Record<string, React.ReactNode> = {
    Layout: <Layout className="w-6 h-6 text-emerald-400" />,
    Server: <Server className="w-6 h-6 text-teal-400" />,
    Database: <Database className="w-6 h-6 text-cyan-400" />,
    Wrench: <Wrench className="w-6 h-6 text-amber-400" />,
    Sparkles: <Sparkles className="w-6 h-6 text-emerald-400" />,
  };

  const filteredCategories =
    selectedFilter === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === selectedFilter);

  return (
    <section id="skills" className="py-20 lg:py-28 bg-[#0B1329] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              SKILLS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              ทักษะความสามารถ
            </h2>
            <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mt-3" />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-emerald-500 text-[#0B1329] font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ทั้งหมด (All)
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedFilter === cat.id
                    ? 'bg-emerald-500 text-[#0B1329] font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat, idx) => (
            <div
              key={cat.id}
              id={`skill-category-${cat.id}`}
              className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0D1836]/90 border border-slate-800/90 hover:border-emerald-500/40 p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-emerald-500/10 flex flex-col justify-between group"
            >
              <div>
                {/* Header with Icon & Category Title */}
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700/60 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10 transition-colors">
                      {categoryIcons[cat.iconName] || <Code className="w-6 h-6 text-emerald-400" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">{cat.thaiTitle}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-400">0{idx + 1}</span>
                </div>

                {/* Technology List */}
                <div className="space-y-3">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-xl bg-slate-950/50 hover:bg-slate-950 border border-slate-800/60 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="text-sm font-semibold text-white tracking-wide">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          Active
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 pl-6 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Tag */}
              <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-emerald-400" />
                  <span>Production Ready</span>
                </span>
                <span>{cat.skills.length} Technologies</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
