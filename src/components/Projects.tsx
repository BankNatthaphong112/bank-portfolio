import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  Github,
  Sparkles,
  Layers,
  Eye,
  Lock,
  Unlock,
  Plus,
  Pencil,
  Trash2,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  ShoppingBag,
} from 'lucide-react';
import { defaultProjectsList } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { ProjectAuthModal } from './ProjectAuthModal';
import { ProjectEditorModal } from './ProjectEditorModal';
import { isOwnerAuthenticated, setOwnerAuthenticated } from '../utils/security';

const STORAGE_KEY = 'bank_portfolio_projects_custom';

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load projects from storage:', e);
    }
    return defaultProjectsList;
  });

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(() => isOwnerAuthenticated());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Save projects to localStorage whenever updated
  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProjects));
      window.dispatchEvent(new Event('bank-projects-updated'));
    } catch (err) {
      console.error('Failed to save projects:', err);
    }
  };

  const handleSaveProject = (savedProject: Project) => {
    const existingIndex = projects.findIndex((p) => p.id === savedProject.id);
    if (existingIndex >= 0) {
      const updated = [...projects];
      updated[existingIndex] = savedProject;
      saveProjects(updated);
    } else {
      saveProjects([savedProject, ...projects]);
    }
  };

  const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบโปรเจกต์นี้?')) {
      const updated = projects.filter((p) => p.id !== projectId);
      saveProjects(updated);
    }
  };

  const handleResetToDefault = () => {
    if (
      window.confirm(
        'ต้องการรีเซ็ตรายการโปรเจกต์กลับเป็นค่าเริ่มต้นตามเรซูเม่หรือไม่? ข้อมูลที่คุณแก้ไขจะถูกล้าง'
      )
    ) {
      saveProjects(defaultProjectsList);
    }
  };

  const handleLogoutOwner = () => {
    setOwnerAuthenticated(false);
    setIsOwner(false);
  };

  // Render a high-fidelity visual illustration frame for each project
  const renderProjectVisual = (project: Project) => {
    const displayImg =
      project.images && project.images.length > 0 ? project.images[0] : project.imageUrl;
    const imageCount = project.images
      ? project.images.length
      : project.imageUrl
      ? 1
      : 0;

    if (displayImg) {
      return (
        <div className="w-full h-48 sm:h-52 relative overflow-hidden bg-slate-950 border-b border-slate-800 group">
          <img
            src={displayImg}
            alt={project.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30 backdrop-blur-sm">
              {project.type}
            </span>
            {imageCount > 1 ? (
              <span className="text-[10px] font-mono text-emerald-300 bg-slate-900/90 px-2 py-0.5 rounded border border-emerald-500/40 backdrop-blur-sm flex items-center gap-1 shadow">
                <span>📷</span>
                <span>{imageCount} ภาพ</span>
              </span>
            ) : (
              <span className="text-[10px] font-mono text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700/60 backdrop-blur-sm">
                Project Image
              </span>
            )}
          </div>
        </div>
      );
    }

    if (project.previewType === 'shopfloor' || project.id === 'shopfloor-bakery') {
      return (
        <div className="w-full h-48 sm:h-52 bg-gradient-to-br from-amber-950/40 via-slate-900 to-[#0B1329] p-4 relative overflow-hidden flex flex-col justify-between border-b border-slate-800">
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 text-[11px] font-mono border border-amber-500/30">
              <span>🥖</span>
              <span>Shopfloor Bakery MVP</span>
            </div>
            <span className="text-[10px] font-mono text-slate-300 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700">
              Google Apps Script
            </span>
          </div>

          <div className="my-auto z-10 bg-slate-950/85 p-3 rounded-xl border border-slate-800 text-xs font-mono max-w-[95%] mx-auto w-full shadow-lg">
            <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-slate-800/80 text-[10px] text-slate-400">
              <span>Queue #BP-204</span>
              <span className="text-emerald-400">● In Production</span>
            </div>
            <div className="text-white font-bold text-[11px]">เค้กส้มหน้านิ่ม & ขนมปังโฮลวีท</div>
            <div className="text-[10px] text-amber-400/90 mt-0.5">สถานะ: อบเสร็จแล้ว → จุดบรรจุหีบห่อ</div>
          </div>

          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        </div>
      );
    }

    if (project.previewType === 'ai-skin' || project.id === 'skin-disease-ai') {
      return (
        <div className="w-full h-48 sm:h-52 bg-gradient-to-br from-cyan-950/40 via-slate-900 to-[#0B1329] p-4 relative overflow-hidden flex flex-col justify-between border-b border-slate-800">
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 text-[11px] font-mono border border-cyan-500/30">
              <Cpu className="w-3.5 h-3.5" />
              <span>Skin Disease AI (CNN)</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              EfficientNetV2
            </span>
          </div>

          <div className="my-auto z-10 bg-slate-950/85 p-3 rounded-xl border border-slate-800 text-xs font-mono max-w-[95%] mx-auto w-full shadow-lg">
            <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-slate-800/80 text-[10px] text-slate-400">
              <span>Model Classification Output</span>
              <span className="text-emerald-400">Conf: 96.8%</span>
            </div>
            <div className="text-white font-bold text-[11px]">Atopic Dermatitis Analysis</div>
            <div className="text-[10px] text-cyan-300 mt-0.5">Feature Extraction • Python Backend</div>
          </div>

          <div className="absolute -top-8 -right-8 w-40 h-40 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />
        </div>
      );
    }

    // Portfolio Code Window
    return (
      <div className="w-full h-48 sm:h-52 bg-gradient-to-br from-slate-950 via-[#0B1329] to-slate-900 p-4 relative overflow-hidden flex flex-col justify-between border-b border-slate-800">
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-500/20 text-teal-300 text-[11px] font-mono border border-teal-500/30">
            <Layers className="w-3.5 h-3.5" />
            <span>Developer Portfolio</span>
          </div>
          <span className="text-[10px] font-mono text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
            React + Vite
          </span>
        </div>

        <div className="my-auto z-10 bg-slate-950/90 rounded-lg p-3 border border-slate-800 font-mono text-[11px] text-slate-300 shadow-xl max-w-[95%] mx-auto w-full">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1 mb-1 text-[9px] text-slate-400">
            <span>// Developer Metadata</span>
            <span className="text-emerald-400">SHA-256 Auth</span>
          </div>
          <div>
            <span className="text-teal-400">const</span> dev ={' '}
            <span className="text-emerald-300">"นายณัฐพงศ์ เจริญตา"</span>;
          </div>
          <div>
            <span className="text-teal-400">const</span> role ={' '}
            <span className="text-emerald-300">"Frontend Developer"</span>;
          </div>
        </div>

        <div className="absolute -top-8 -left-8 w-40 h-40 bg-teal-500/15 rounded-full blur-2xl pointer-events-none" />
      </div>
    );
  };

  return (
    <section
      id="projects"
      className="py-20 lg:py-28 bg-[#0D1630] border-t border-slate-800/80 relative overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Owner Management Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              PROJECTS & WORKS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              ผลงานและโปรเจกต์
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              ผลงานการพัฒนาเว็บไซต์และระบบที่มุ่งเน้นการใช้งานจริง การออกแบบ UI/UX ที่ทันสมัย และเทคโนโลยีที่ตอบโจทย์
            </p>
            <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mt-3" />
          </div>

          {/* Owner Mode Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {!isOwner ? (
              <button
                id="owner-login-btn"
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-300 border border-slate-700 hover:border-emerald-500/50 text-xs font-medium transition-all shadow-sm cursor-pointer"
                title="คลิกเพื่อใส่รหัสผ่านและแก้ไขโปรเจกต์"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>จัดการโปรเจกต์ (Owner Edit)</span>
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-emerald-500/40 shadow-lg">
                <button
                  onClick={() => {
                    setEditingProject(null);
                    setIsEditorModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-[#0B1329] font-bold text-xs hover:from-emerald-400 hover:to-teal-400 transition-all cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>เพิ่มโปรเจกต์</span>
                </button>

                <button
                  onClick={handleResetToDefault}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition-colors cursor-pointer"
                  title="รีเซ็ตกลับเป็นโปรเจกต์เริ่มต้น"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>รีเซ็ต</span>
                </button>

                <button
                  onClick={handleLogoutOwner}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-300 border border-slate-800 text-xs transition-colors cursor-pointer"
                  title="ล็อคระบบ / ออกจากโหมดจัดการ"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>ล็อค</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Owner Mode Active Notification Banner */}
        {isOwner && (
          <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>ยินดีต้อนรับ คุณณัฐพงศ์ (โหมดจัดการผลงานเปิดใช้งาน)</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                    SHA-256 Verified
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  คุณสามารถคลิกปุ่ม <strong>"แก้ไข"</strong> หรือ <strong>"ลบ"</strong> บนการ์ดแต่ละโปรเจกต์
                  หรือกด <strong>"+ เพิ่มโปรเจกต์"</strong> เพื่อใส่คำอธิบายและอัปโหลดรูปภาพได้ทันที
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const hasLiveUrl = Boolean(
              project.liveUrl &&
              project.liveUrl.trim() !== '' &&
              project.liveUrl.trim() !== '#'
            );
            const hasGithubUrl = Boolean(
              project.githubUrl &&
              project.githubUrl.trim() !== '' &&
              project.githubUrl.trim() !== '#'
            );

            return (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="rounded-2xl bg-gradient-to-b from-slate-900/95 to-[#0B1329]/95 border border-slate-800/90 hover:border-emerald-500/50 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 relative"
            >
              {/* Owner Edit / Delete Badge Overlay */}
              {isOwner && (
                <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 bg-slate-950/95 p-1 rounded-xl border border-slate-700 shadow-xl">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingProject(project);
                      setIsEditorModalOpen(true);
                    }}
                    className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-[#0B1329] transition-all cursor-pointer text-xs flex items-center gap-1 font-semibold"
                    title="แก้ไขข้อมูล ลิงก์ และรูปภาพโปรเจกต์นี้"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>แก้ไข</span>
                  </button>
                  <button
                    onClick={(e) => handleDeleteProject(project.id, e)}
                    className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white transition-all cursor-pointer text-xs"
                    title="ลบโปรเจกต์นี้"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div>
                {/* Visual Preview Banner */}
                {renderProjectVisual(project)}

                {/* Card Body */}
                <div className="p-6">
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-emerald-400 font-medium truncate max-w-[60%]">
                      {project.type}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {hasLiveUrl && (
                        <span
                          className="text-[10px] font-mono text-cyan-300 bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-800/60 flex items-center gap-1 font-semibold"
                          title="มีลิงก์เข้าชมหน้าเว็บจริง"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                          <span>Live Web</span>
                        </span>
                      )}
                      {project.badge && (
                        <span className="text-[11px] font-mono text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60 shrink-0">
                          {project.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Project Name */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors mb-2.5 leading-snug">
                    {project.name}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 5).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-300 text-xs font-mono font-medium border border-slate-700/60 group-hover:border-emerald-500/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="px-2 py-1 rounded-md bg-slate-800/40 text-slate-500 text-xs font-mono">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Live Web, GitHub & Details */}
              <div className="p-6 pt-0 border-t border-slate-800/80 mt-auto flex flex-col gap-2.5">
                {/* Direct Action Links (Live Demo Web & GitHub Repo) */}
                {(hasLiveUrl || hasGithubUrl) && (
                  <div className="flex items-center gap-2">
                    {hasLiveUrl && (
                      <a
                        id={`btn-live-${project.id}`}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-[#0B1329] font-bold text-xs shadow-md shadow-emerald-500/20 transition-all duration-200 cursor-pointer active:scale-95"
                        aria-label={`Visit live website for ${project.name}`}
                        title={`เข้าชมเว็บไซต์จริง: ${project.liveUrl}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>ดูเว็บไซต์ (Live Web)</span>
                      </a>
                    )}

                    {hasGithubUrl && (
                      <a
                        id={`btn-github-${project.id}`}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 hover:border-slate-600 transition-all duration-200 cursor-pointer active:scale-95 ${
                          !hasLiveUrl ? 'flex-1' : ''
                        }`}
                        aria-label={`View ${project.name} code on GitHub`}
                        title={`ดูซอร์สโค้ดใน GitHub Repository: ${project.githubUrl}`}
                      >
                        <Github className="w-3.5 h-3.5 text-emerald-400" />
                        <span>ดูโค้ด (GitHub)</span>
                      </a>
                    )}
                  </div>
                )}

                {/* Details / Interactive Preview Modal Button */}
                <button
                  id={`btn-demo-${project.id}`}
                  onClick={() => setActiveProject(project)}
                  className={`w-full inline-flex items-center justify-center gap-1.5 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 ${
                    !hasLiveUrl && !hasGithubUrl
                      ? 'py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-[#0B1329] font-bold text-xs shadow-md shadow-emerald-500/20'
                      : 'py-2 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 text-xs font-medium'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>ดูภาพผลงาน & Interactive Details</span>
                </button>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* Project Interactive Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}

      {/* Owner Authentication Modal */}
      <ProjectAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthenticated={() => {
          setOwnerAuthenticated(true);
          setIsOwner(true);
        }}
      />

      {/* Project Editor Modal */}
      <ProjectEditorModal
        isOpen={isEditorModalOpen}
        project={editingProject}
        onClose={() => {
          setIsEditorModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
      />
    </section>
  );
};
