import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Code2,
  Monitor,
  Sparkles,
  ShoppingBag,
  Layers,
  BarChart3,
  Check,
  Cpu,
  RefreshCw,
  Activity,
  Calendar,
  Clock,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Image as ImageIcon,
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'details'>('preview');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // Shopfloor interactive state
  const [shopfloorStep, setShopfloorStep] = useState<number>(2);
  const [orderFilter, setOrderFilter] = useState<string>('all');

  // AI Skin Disease interactive state
  const [selectedDisease, setSelectedDisease] = useState<'eczema' | 'psoriasis' | 'nevus'>('eczema');
  const [isScanning, setIsScanning] = useState<boolean>(false);

  if (!project) return null;

  // Consolidate images array
  const allImages: string[] = [];
  if (project.images && Array.isArray(project.images) && project.images.length > 0) {
    allImages.push(...project.images);
  } else if (project.imageUrl) {
    allImages.push(project.imageUrl);
  }

  const currentImage = allImages[selectedImageIndex] || allImages[0] || '';

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
  };

  const diseaseData = {
    eczema: {
      name: 'โรคผื่นผิวหนังอักเสบ (Atopic Dermatitis / Eczema)',
      confidence: '96.8%',
      loss: '0.042',
      model: 'EfficientNetV2-B3 (CNN)',
      recommendation: 'ความเสี่ยงระดับปานกลาง ควรดูแลความชุ่มชื้นและปรึกษาแพทย์ผิวหนัง',
      severity: 'Moderate',
      color: 'amber',
    },
    psoriasis: {
      name: 'โรคสะเก็ดเงิน (Psoriasis Vulgaris)',
      confidence: '94.5%',
      loss: '0.058',
      model: 'EfficientNetV2-B3 (CNN)',
      recommendation: 'พบการแบ่งตัวของเซลล์ผิวผิดปกติ แนะนำให้เข้าพบแพทย์ผู้เชี่ยวชาญ',
      severity: 'Attention Needed',
      color: 'rose',
    },
    nevus: {
      name: 'ไฝเม็ดสีชนิดไม่เป็นอันตราย (Benign Melanocytic Nevus)',
      confidence: '98.2%',
      loss: '0.021',
      model: 'EfficientNetV2-B3 (CNN)',
      recommendation: 'เซลล์เม็ดสีปกติ ขอบเรียบ สม่ำเสมอ ไม่พบสัญญาณมะเร็งผิวหนัง',
      severity: 'Normal / Benign',
      color: 'emerald',
    },
  };

  const handleSimulateScan = (type: 'eczema' | 'psoriasis' | 'nevus') => {
    setSelectedDisease(type);
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 600);
  };

  const hasLiveUrl = Boolean(
    project.liveUrl &&
    project.liveUrl.trim() !== '' &&
    project.liveUrl.trim() !== '#'
  );
  const hasGithub = Boolean(
    project.githubUrl &&
    project.githubUrl.trim() !== '' &&
    project.githubUrl.trim() !== '#'
  );

  return (
    <div
      id="project-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-3xl bg-[#0F172A] border border-slate-700/80 shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/80 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <span className="text-sm font-bold text-white tracking-wide truncate max-w-[200px] sm:max-w-md">
              {project.name}
            </span>
            <span className="hidden sm:inline-block text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              {project.type}
            </span>
          </div>

          <button
            id="close-project-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close Project Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-900/90 border-b border-slate-800 text-xs font-medium shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-emerald-500 text-[#0B1329] font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>ภาพผลงาน & Interactive Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'details'
                  ? 'bg-emerald-500 text-[#0B1329] font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Features & Tech Details</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {hasLiveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-[#0B1329] transition-all text-xs font-bold shadow-sm"
                title={`เข้าชมเว็บไซต์จริง: ${project.liveUrl}`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>เข้าชมเว็บ (Live Web)</span>
              </a>
            )}
            {hasGithub && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-xs font-medium border border-slate-700"
                title={`ดูซอร์สโค้ดใน GitHub Repository: ${project.githubUrl}`}
              >
                <Github className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">ดูโค้ด (GitHub Repo)</span>
                <span className="sm:hidden">GitHub</span>
              </a>
            )}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'preview' ? (
            <div className="space-y-6">
              {/* Multi-Image Gallery Carousel */}
              {allImages.length > 0 && (
                <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 sm:p-5 space-y-4 shadow-xl">
                  {/* Gallery Top Status */}
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-800">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <ImageIcon className="w-4 h-4" />
                      <span>แกลเลอรีภาพถ่ายผลงาน (Project Gallery)</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="bg-slate-900 px-2.5 py-0.5 rounded-full border border-slate-800 text-slate-300">
                        {selectedImageIndex + 1} / {allImages.length} ภาพ
                      </span>
                      <button
                        onClick={() => setFullscreenImage(currentImage)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="ดูภาพขนาดใหญ่เต็มจอ"
                      >
                        <Maximize2 className="w-3 h-3" />
                        <span className="hidden sm:inline">ขยายเต็มจอ</span>
                      </button>
                    </div>
                  </div>

                  {/* Main Active Image Display */}
                  <div className="relative rounded-2xl overflow-hidden border border-slate-800/90 bg-black/60 flex items-center justify-center min-h-[260px] max-h-[460px] group">
                    <img
                      src={currentImage}
                      alt={`${project.name} - รูปภาพที่ ${selectedImageIndex + 1}`}
                      className="w-full max-h-[460px] object-contain cursor-pointer"
                      onClick={() => setFullscreenImage(currentImage)}
                    />

                    {/* Left and Right Nav Buttons (if > 1 image) */}
                    {allImages.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrevImage();
                          }}
                          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/80 hover:bg-emerald-500 hover:text-[#0B1329] text-white border border-slate-700 shadow-xl transition-all cursor-pointer backdrop-blur-sm"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNextImage();
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/80 hover:bg-emerald-500 hover:text-[#0B1329] text-white border border-slate-700 shadow-xl transition-all cursor-pointer backdrop-blur-sm"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    {/* Bottom overlay badge */}
                    <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-sm text-slate-200 text-[11px] font-mono px-3 py-1 rounded-lg border border-slate-800 pointer-events-none">
                      {selectedImageIndex === 0 ? '★ ภาพหน้าปก (Cover)' : `ภาพที่ ${selectedImageIndex + 1}`}
                    </div>
                  </div>

                  {/* Thumbnails row (if > 1 image) */}
                  {allImages.length > 1 && (
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-thin">
                      {allImages.map((imgSrc, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImageIndex(idx)}
                          className={`relative shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-slate-900 ${
                            selectedImageIndex === idx
                              ? 'border-emerald-500 ring-2 ring-emerald-500/30 scale-105'
                              : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'
                          }`}
                        >
                          <img
                            src={imgSrc}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-0.5 right-1 bg-slate-950/80 text-[9px] font-mono text-slate-300 px-1 rounded">
                            #{idx + 1}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 1. SHOPFLOOR BAKERY INTERACTIVE PREVIEW */}
              {project.previewType === 'shopfloor' && (
                <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-[#0B1329] border border-slate-800 p-6">
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                        🥖
                      </div>
                      <div>
                        <div className="text-base font-bold text-white font-mono">
                          Shopfloor Bakery Management MVP
                        </div>
                        <div className="text-[11px] text-slate-400">
                          ระบบบริหารจัดการกระบวนการภายในร้านขนม • Google Apps Script Integration
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                        ● MVP Live Active
                      </span>
                    </div>
                  </div>

                  {/* Process Stepper */}
                  <div className="mb-6 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                      กระบวนการผลิตขนม (Bakery Production Workflow):
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { step: 1, label: '1. รับออเดอร์', icon: '📋' },
                        { step: 2, label: '2. เตรียมวัตถุดิบ', icon: '🥣' },
                        { step: 3, label: '3. อบขนมในเตา', icon: '🔥' },
                        { step: 4, label: '4. ตรวจสอบ & บรรจุ', icon: '✅' },
                      ].map((item) => (
                        <button
                          key={item.step}
                          onClick={() => setShopfloorStep(item.step)}
                          className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                            shopfloorStep === item.step
                              ? 'bg-emerald-500/20 border-emerald-500/50 text-white shadow-sm'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <div className="text-base mb-1">{item.icon}</div>
                          <div className="text-xs font-medium">{item.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Orders List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>รายการคิวผลิตในเตาอบ (Active Oven Batches):</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setOrderFilter('all')}
                          className={`px-2 py-0.5 rounded ${
                            orderFilter === 'all'
                              ? 'bg-slate-800 text-emerald-400'
                              : 'text-slate-500'
                          }`}
                        >
                          ทั้งหมด
                        </button>
                        <button
                          onClick={() => setOrderFilter('urgent')}
                          className={`px-2 py-0.5 rounded ${
                            orderFilter === 'urgent'
                              ? 'bg-slate-800 text-amber-400'
                              : 'text-slate-500'
                          }`}
                        >
                          เร่งด่วน
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-emerald-400 font-bold">#BATCH-088</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                              กำลังอบ (180°C)
                            </span>
                          </div>
                          <div className="text-white font-bold text-sm mb-1">
                            เค้กส้มหน้านิ่ม (Orange Fudge Cake)
                          </div>
                          <div className="text-slate-400 text-[11px]">จำนวน: 24 ชิ้น • เวลาเหลือ: 12 นาที</div>
                        </div>
                        <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                          <span>Google Sheet Sync: OK</span>
                          <span className="text-amber-400">เตาอบ #2</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-amber-400 font-bold">#BATCH-089</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                              รอนวดแป้ง
                            </span>
                          </div>
                          <div className="text-white font-bold text-sm mb-1">
                            ขนมปังโฮลวีทธัญพืช (Whole Wheat Bread)
                          </div>
                          <div className="text-slate-400 text-[11px]">จำนวน: 40 แถว • กำหนดส่ง 14:00 น.</div>
                        </div>
                        <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                          <span>Status: In Queue</span>
                          <span className="text-teal-400">สูตรมาตรฐาน B</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. SKIN DISEASE AI (CNN) INTERACTIVE PREVIEW */}
              {project.previewType === 'ai-skin' && (
                <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-[#0B1329] border border-slate-800 p-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-base font-bold text-white font-mono">
                          Skin Disease AI Classifier Simulation
                        </div>
                        <div className="text-[11px] text-slate-400">
                          โมเดลโครงข่ายประสาทเทียมสังเคราะห์ (CNN) EfficientNetV2 สำหรับจำแนกโรคผิวหนัง
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
                      Python Backend API
                    </span>
                  </div>

                  {/* Sample Selection */}
                  <div className="mb-6">
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                      เลือกตัวอย่างภาพถ่ายทางคลินิก (Select Clinical Image Sample):
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(['eczema', 'psoriasis', 'nevus'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => handleSimulateScan(type)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            selectedDisease === type
                              ? 'bg-cyan-500/20 border-cyan-500/50 text-white'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <div className="text-xs font-mono font-bold text-cyan-300 mb-1">
                            {type === 'eczema'
                              ? 'ตัวอย่าง 1: Atopic Eczema'
                              : type === 'psoriasis'
                              ? 'ตัวอย่าง 2: Psoriasis'
                              : 'ตัวอย่าง 3: Benign Nevus'}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {diseaseData[type].name.split(' (')[0]}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Simulation Output Card */}
                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 relative overflow-hidden">
                    {isScanning && (
                      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-20 flex items-center justify-center gap-2 text-cyan-400 font-mono text-xs">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>กำลังประมวลผลผ่านโมเดล Deep Learning...</span>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">
                          ผลลัพธ์การจำแนก (Classification Result)
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">
                          {diseaseData[selectedDisease].name}
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                          {diseaseData[selectedDisease].recommendation}
                        </p>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                        <span className="text-xs font-mono text-slate-400">Confidence Score</span>
                        <span className="text-2xl font-extrabold font-mono text-emerald-400">
                          {diseaseData[selectedDisease].confidence}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          Loss: {diseaseData[selectedDisease].loss}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. CODE TERMINAL PREVIEW */}
              {project.previewType === 'portfolio' && (
                <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 font-mono text-xs text-slate-300">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                    <span className="text-emerald-400">// Project Metadata & Architecture</span>
                    <span className="text-slate-500">react-vite.config.ts</span>
                  </div>
                  <pre className="overflow-x-auto text-[11px] leading-relaxed text-slate-300">
{`// Developer Portfolio Architecture
export const developerProfile = {
  name: "นายณัฐพงศ์ เจริญตา (แบงค์)",
  role: "Frontend Developer",
  university: "มหาวิทยาลัยราชภัฏอุดรธานี (GPA 3.68)",
  internship: "บริษัท อีสานดอทคอม จำกัด (ขอนแก่น)",
  technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Web Crypto API"],
  security: {
    authentication: "SHA-256 Hash Verification",
    status: "Protected Admin Mode"
  }
};`}
                  </pre>
                </div>
              )}
            </div>
          ) : (
            /* Details Tab */
            <div className="space-y-6">
              {/* Description */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                  รายละเอียดผลงาน (Project Overview)
                </h4>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                  เทคโนโลยีและเครื่องมือที่ใช้ (Tech Stack)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-mono border border-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project External Links Card */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                  ช่องทางเข้าชมและซอร์สโค้ด (Project Links & Repository)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {hasLiveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/40 hover:border-emerald-500 flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                          <ExternalLink className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white group-hover:text-emerald-300">
                            เข้าชมเว็บไซต์จริง (Live Web)
                          </div>
                          <div className="text-[11px] font-mono text-slate-400 truncate max-w-[200px] sm:max-w-xs">
                            {project.liveUrl}
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 shrink-0" />
                    </a>
                  ) : (
                    <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 text-slate-500 text-xs flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-slate-700" />
                      <span>ยังไม่ได้ระบุลิงก์เว็บไซต์ของโปรเจกต์นี้</span>
                    </div>
                  )}

                  {hasGithub ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-xl bg-slate-950/80 border border-slate-700 hover:border-slate-500 flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0">
                          <Github className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white group-hover:text-emerald-300">
                            ซอร์สโค้ด (GitHub Repository)
                          </div>
                          <div className="text-[11px] font-mono text-slate-400 truncate max-w-[200px] sm:max-w-xs">
                            {project.githubUrl}
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 shrink-0" />
                    </a>
                  ) : (
                    <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 text-slate-500 text-xs flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-slate-700" />
                      <span>ยังไม่ได้ระบุลิงก์ GitHub Repo</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Features List */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                  จุดเด่นและคุณสมบัติหลัก (Key Features & Functionalities)
                </h4>
                <div className="space-y-2">
                  {project.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            โปรเจกต์โดย: <span className="text-slate-200 font-semibold">ณัฐพงศ์ เจริญตา (Bank)</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {hasLiveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-[#0B1329] text-xs font-bold shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>ไปที่เว็บไซต์จริง (Live Web)</span>
              </a>
            )}
            {hasGithub && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-emerald-400" />
                <span>ดูโค้ดใน GitHub Repo</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-colors cursor-pointer"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>

        {/* Fullscreen Image Overlay */}
        {fullscreenImage && (
          <div
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={() => setFullscreenImage(null)}
          >
            <div className="relative max-w-5xl max-h-[90vh]">
              <button
                onClick={() => setFullscreenImage(null)}
                className="absolute -top-12 right-0 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
                aria-label="Close fullscreen view"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={fullscreenImage}
                alt="Enlarged project view"
                className="max-h-[85vh] w-auto max-w-full object-contain rounded-2xl border border-slate-700 shadow-2xl"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
