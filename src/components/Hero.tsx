import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  CheckCircle2,
  Upload,
  User,
  Camera,
  Layers,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedImg = localStorage.getItem('bank_portfolio_profile_photo');
    if (savedImg) {
      setProfileImage(savedImg);
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert('กรุณาเลือกไฟล์ขนาดไม่เกิน 3MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProfileImage(result);
        localStorage.setItem('bank_portfolio_profile_photo', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    localStorage.removeItem('bank_portfolio_profile_photo');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      const navOffset = 80;
      const elementPosition = projectsEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#0B1329]"
    >
      {/* Background Decorative Gradients & Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Teal/Emerald Ambient Glow */}
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-10 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl" />
        {/* Subtle Tech Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(#10B981 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT: Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Beacon */}
            <div
              id="hero-status-beacon"
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-medium mb-6 shadow-sm shadow-emerald-500/10"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>{personalInfo.status}</span>
            </div>

            {/* Sub-headline */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-slate-400 text-lg sm:text-xl font-medium tracking-wide">
                {personalInfo.heroHeadline}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono text-xs font-semibold uppercase tracking-wider border border-slate-700/60">
                {personalInfo.displayName}
              </span>
            </div>

            {/* Headline Name */}
            <h1
              id="hero-name"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-4"
            >
              {personalInfo.name}
            </h1>

            {/* Professional Subtitle */}
            <div className="flex items-center gap-3 mb-6">
              <span className="h-0.5 w-8 bg-emerald-500 rounded-full" />
              <h2
                id="hero-subtitle"
                className="text-xl sm:text-2xl font-bold text-emerald-400 tracking-wide"
              >
                {personalInfo.thaiTitle}
              </h2>
            </div>

            {/* Description */}
            <p
              id="hero-description"
              className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-8 font-normal"
            >
              {personalInfo.bio}
            </p>

            {/* Main message tag */}
            <div className="mb-8 flex items-center gap-2 text-xs sm:text-sm font-mono text-slate-400 bg-slate-900/80 px-3.5 py-2 rounded-lg border border-slate-800">
              <span className="text-emerald-400 font-bold">&gt;</span>
              <span className="text-slate-200 font-semibold">{personalInfo.tagline}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">Modern Web, UI/UX, AI & Technology</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <a
                id="hero-cta-projects"
                href="#projects"
                onClick={scrollToProjects}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-[#0B1329] font-bold text-base hover:from-emerald-400 hover:to-teal-400 transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>ดูผลงานของฉัน</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                id="hero-cta-contact"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-white font-semibold text-base border border-slate-700/80 hover:border-emerald-500/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-md"
              >
                <Mail className="w-5 h-5 text-emerald-400" />
                <span>ติดต่อฉัน (Contact)</span>
              </a>
            </div>

            {/* Social Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80 w-full">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider mr-1">
                Connect:
              </span>
              <a
                id="hero-social-github"
                href={personalInfo.contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-slate-900/90 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/30 transition-all duration-200"
                aria-label="Bank's GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                id="hero-social-linkedin"
                href={personalInfo.contacts.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-slate-900/90 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/30 transition-all duration-200"
                aria-label="Bank's LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                id="hero-social-email"
                href={`mailto:${personalInfo.contacts.email}`}
                className="p-2.5 rounded-lg bg-slate-900/90 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/30 transition-all duration-200"
                aria-label="Send Email to Bank"
              >
                <Mail className="w-5 h-5" />
              </a>
              <div className="ml-auto hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Professional Profile Presentation */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-md">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-emerald-500/30 via-teal-500/20 to-cyan-500/30 rounded-3xl blur-xl opacity-75" />

              {/* Main Card */}
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/95 to-[#0B1329]/95 border border-slate-800/90 shadow-2xl overflow-hidden backdrop-blur-xl">
                {/* Header Window Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-950/60 border-b border-slate-800/80">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <span className="text-emerald-400">~/bank</span>/frontend-developer
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>verified</span>
                  </div>
                </div>

                {/* Profile Portrait / Avatar Container */}
                <div className="p-6 sm:p-7 flex flex-col items-center">
                  <div className="relative mb-5 group">
                    {/* Ring Accent */}
                    <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-2xl p-1 bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 shadow-xl shadow-emerald-950/50 relative overflow-hidden">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="บัญพงศ์ เจริญตา (Bank)"
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        /* Professional Developer Graphic Presentation */
                        <div className="w-full h-full rounded-xl bg-[#091024] flex flex-col items-center justify-center relative overflow-hidden text-center p-3">
                          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 flex items-center justify-center mb-2 shadow-inner">
                            <span className="text-2xl font-mono font-extrabold text-emerald-400 tracking-wider">
                              BK
                            </span>
                          </div>
                          <div className="text-xs font-semibold text-white tracking-wide">
                            {personalInfo.name}
                          </div>
                          <div className="text-[11px] text-emerald-400/90 font-mono mt-0.5">
                            Frontend Developer
                          </div>

                          {/* Green Tie subtle accent tribute from resume */}
                          <div
                            className="mt-2 px-2.5 py-0.5 rounded-full bg-emerald-900/40 border border-emerald-500/30 text-[10px] text-emerald-300 font-mono flex items-center gap-1"
                            title="มหาวิทยาลัยราชภัฏอุดรธานี • สาขาเทคโนโลยีสารสนเทศ (GPA 3.68)"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>UDRU • GPA 3.68</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Image Upload Trigger */}
                    <label
                      htmlFor="profile-photo-upload"
                      className="absolute bottom-1 right-1 p-2.5 rounded-xl bg-slate-900/90 text-slate-200 hover:text-emerald-300 hover:bg-slate-800 border border-slate-700 shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95"
                      title={profileImage ? 'เปลี่ยนรูปภาพโปรไฟล์' : 'อัปโหลดรูปจริงของคุณ (บันทึกอัตโนมัติ)'}
                    >
                      <Camera className="w-4 h-4" />
                      <input
                        id="profile-photo-upload"
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {profileImage && (
                    <button
                      onClick={handleRemoveImage}
                      className="text-xs text-slate-400 hover:text-rose-400 underline mb-3 transition-colors cursor-pointer"
                    >
                      รีเซ็ตเป็นตราประจำตัว
                    </button>
                  )}

                  {/* Profile Summary Badges */}
                  <div className="w-full text-center">
                    <h3 className="text-lg font-bold text-white mb-0.5">
                      {personalInfo.name} ({personalInfo.displayName})
                    </h3>
                    <p className="text-xs font-mono text-emerald-400 mb-4">
                      @BankNatthaphong112 • Frontend Developer
                    </p>

                    {/* Terminal snippet */}
                    <div className="w-full bg-slate-950/80 rounded-xl p-3.5 border border-slate-800/90 text-left font-mono text-xs text-slate-300 overflow-x-auto shadow-inner">
                      <div className="text-slate-500">// Developer Profile</div>
                      <div className="mt-1">
                        <span className="text-teal-400">const</span>{' '}
                        <span className="text-yellow-300">developer</span> = &#123;
                      </div>
                      <div className="pl-4">
                        <span className="text-slate-400">name:</span>{' '}
                        <span className="text-emerald-300">"นายณัฐพงศ์ เจริญตา"</span>,
                      </div>
                      <div className="pl-4">
                        <span className="text-slate-400">role:</span>{' '}
                        <span className="text-emerald-300">"Frontend Developer"</span>,
                      </div>
                      <div className="pl-4">
                        <span className="text-slate-400">university:</span>{' '}
                        <span className="text-teal-300">"มหาวิทยาลัยราชภัฏอุดรธานี (GPA 3.68)"</span>,
                      </div>
                      <div className="pl-4">
                        <span className="text-slate-400">internship:</span>{' '}
                        <span className="text-emerald-300">"บริษัท อีสานดอทคอม จำกัด"</span>,
                      </div>
                      <div>&#125;;</div>
                    </div>

                    {/* Interactive Feature Tags */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                      <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-xs font-mono text-slate-300">
                        ⚛️ React
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-xs font-mono text-slate-300">
                        🎨 Tailwind CSS
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-xs font-mono text-slate-300">
                        ⚡ Vite
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-xs font-mono text-slate-300">
                        🤖 AI API
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
