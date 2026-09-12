import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Plus,
  Trash2,
  Check,
  Sparkles,
  Link2,
  Github,
  Tag,
  FileText,
  Layers,
  ArrowLeft,
  ArrowRight,
  Star,
  Eye,
  Globe,
  ExternalLink,
} from 'lucide-react';
import { Project } from '../types';

interface ProjectEditorModalProps {
  isOpen: boolean;
  project: Project | null; // null means create new
  onClose: () => void;
  onSave: (project: Project) => void;
}

export const ProjectEditorModal: React.FC<ProjectEditorModalProps> = ({
  isOpen,
  project,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Project>({
    id: '',
    name: '',
    type: 'Website development Project',
    badge: 'Featured Project',
    description: '',
    technologies: ['React', 'JavaScript'],
    features: [''],
    githubUrl: 'https://github.com/BankNatthaphong112',
    liveUrl: '',
    imageUrl: '',
    images: [],
    previewType: 'custom',
  });

  const [techInput, setTechInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [imageTab, setImageTab] = useState<'upload' | 'url'>('upload');
  const [previewZoomImage, setPreviewZoomImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (project) {
      // Gather images from project.images or project.imageUrl
      let projectImages: string[] = [];
      if (project.images && Array.isArray(project.images) && project.images.length > 0) {
        projectImages = [...project.images];
      } else if (project.imageUrl) {
        projectImages = [project.imageUrl];
      }

      setFormData({
        ...project,
        features: project.features.length > 0 ? project.features : [''],
        images: projectImages,
        imageUrl: projectImages[0] || project.imageUrl || '',
      });
    } else {
      setFormData({
        id: `proj-${Date.now()}`,
        name: '',
        type: 'Website development Project',
        badge: 'New Project',
        description: '',
        technologies: ['React', 'Tailwind CSS'],
        features: [''],
        githubUrl: 'https://github.com/BankNatthaphong112',
        liveUrl: '',
        imageUrl: '',
        images: [],
        previewType: 'custom',
      });
    }
    setUrlInput('');
    setPreviewZoomImage(null);
  }, [project, isOpen]);

  if (!isOpen) return null;

  // Handle uploading multiple files at once or adding to existing
  const handleMultipleFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList: File[] = Array.from(files);
    const validFiles: File[] = [];

    for (const file of fileList) {
      if (file.size > 8 * 1024 * 1024) {
        alert(`ไฟล์ ${file.name} มีขนาดเกิน 8MB กรุณาเลือกไฟล์ที่มีขนาดเล็กลง`);
      } else {
        validFiles.push(file);
      }
    }

    if (validFiles.length === 0) return;

    // Read all files asynchronously
    const readPromises = validFiles.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            resolve(event.target.result as string);
          } else {
            reject(new Error('Failed to read file'));
          }
        };
        reader.onerror = () => reject(new Error('File reading error'));
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readPromises)
      .then((newBase64Images) => {
        setFormData((prev) => {
          const updatedImages = [...(prev.images || []), ...newBase64Images];
          return {
            ...prev,
            images: updatedImages,
            imageUrl: updatedImages[0] || '',
          };
        });
      })
      .catch((err) => {
        console.error('Error reading uploaded files:', err);
        alert('เกิดข้อผิดพลาดในการโหลดรูปภาพ');
      })
      .finally(() => {
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      });
  };

  // Add an image from URL input
  const handleAddImageUrl = () => {
    if (!urlInput.trim()) return;
    const cleanUrl = urlInput.trim();
    setFormData((prev) => {
      const updated = [...(prev.images || []), cleanUrl];
      return {
        ...prev,
        images: updated,
        imageUrl: updated[0] || '',
      };
    });
    setUrlInput('');
  };

  // Set specific image as the primary cover photo (index 0)
  const handleSetCoverImage = (index: number) => {
    setFormData((prev) => {
      const list = [...(prev.images || [])];
      if (index <= 0 || index >= list.length) return prev;
      const [chosen] = list.splice(index, 1);
      list.unshift(chosen);
      return {
        ...prev,
        images: list,
        imageUrl: list[0] || '',
      };
    });
  };

  // Move image left (earlier in order)
  const handleMoveImageLeft = (index: number) => {
    if (index === 0) return;
    setFormData((prev) => {
      const list = [...(prev.images || [])];
      const temp = list[index];
      list[index] = list[index - 1];
      list[index - 1] = temp;
      return {
        ...prev,
        images: list,
        imageUrl: list[0] || '',
      };
    });
  };

  // Move image right (later in order)
  const handleMoveImageRight = (index: number) => {
    setFormData((prev) => {
      const list = [...(prev.images || [])];
      if (index >= list.length - 1) return prev;
      const temp = list[index];
      list[index] = list[index + 1];
      list[index + 1] = temp;
      return {
        ...prev,
        images: list,
        imageUrl: list[0] || '',
      };
    });
  };

  // Remove specific image
  const handleRemoveImage = (indexToRemove: number) => {
    setFormData((prev) => {
      const updated = (prev.images || []).filter((_, idx) => idx !== indexToRemove);
      return {
        ...prev,
        images: updated,
        imageUrl: updated[0] || '',
      };
    });
  };

  // Clear all images
  const handleClearAllImages = () => {
    if (window.confirm('คุณต้องการลบรูปภาพทั้งหมดของโปรเจกต์นี้หรือไม่?')) {
      setFormData((prev) => ({
        ...prev,
        images: [],
        imageUrl: '',
      }));
    }
  };

  const handleAddTech = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput('');
    }
  };

  const handleRemoveTech = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleAddFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ''],
    }));
  };

  const handleUpdateFeature = (index: number, value: string) => {
    const updated = [...formData.features];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, features: updated }));
  };

  const handleRemoveFeature = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  // Helper to normalize URLs (ensure https:// if user types domain directly)
  const normalizeUrl = (url?: string): string => {
    if (!url) return '';
    const trimmed = url.trim();
    if (!trimmed || trimmed === '#') return '';
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('กรุณากรอกชื่อโปรเจกต์');
      return;
    }

    const cleanFeatures = formData.features.filter((f) => f.trim().length > 0);
    const imageList = formData.images || [];

    const finalProject: Project = {
      ...formData,
      githubUrl: normalizeUrl(formData.githubUrl),
      liveUrl: normalizeUrl(formData.liveUrl),
      images: imageList,
      imageUrl: imageList[0] || formData.imageUrl || '',
      features: cleanFeatures.length > 0 ? cleanFeatures : ['ออกแบบและพัฒนาส่วนติดต่อผู้ใช้งาน'],
    };

    onSave(finalProject);
    onClose();
  };

  const currentImages = formData.images || [];

  return (
    <div
      id="project-editor-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-3xl bg-[#0F172A] border border-slate-700/90 shadow-2xl overflow-hidden my-6 text-slate-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {project ? 'แก้ไขรายละเอียดโปรเจกต์ (Edit Project)' : 'เพิ่มโปรเจกต์ใหม่ (Add Project)'}
              </h3>
              <p className="text-xs text-slate-400">
                คุณสามารถระบุข้อมูล อัปโหลดรูปภาพได้หลายภาพ และจัดลำดับภาพหน้าปกได้ตามต้องการ
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 1. General Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>1. ข้อมูลพื้นฐานของผลงาน (Basic Information)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  ชื่อโปรเจกต์ (Project Name) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น Bakery Management App, AI Platform"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  ประเภทโปรเจกต์ (Category / Type) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น Web Application MVP, Deep Learning (CNN)"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white text-sm outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  ป้ายกำกับ (Badge Label)
                </label>
                <input
                  type="text"
                  placeholder="เช่น Featured Project, Internship, University Project"
                  value={formData.badge || ''}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  สไตล์ Interactive Preview
                </label>
                <select
                  value={formData.previewType || 'custom'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      previewType: e.target.value as Project['previewType'],
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white text-sm outline-none"
                >
                  <option value="custom">Modern Custom Card / Gallery</option>
                  <option value="shopfloor">Shopfloor Bakery App (Order Pipeline)</option>
                  <option value="ai-skin">Skin Disease AI (CNN Classifier)</option>
                  <option value="portfolio">Developer Portfolio Code Window</option>
                  <option value="ecommerce">E-commerce Storefront</option>
                  <option value="dashboard">Admin Data Management</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                คำอธิบายโปรเจกต์ (Description) — คุณสามารถใส่คำอธิบายได้เองอย่างละเอียด *
              </label>
              <textarea
                rows={3}
                required
                placeholder="ระบุรายละเอียดผลงาน บทบาทหน้าที่ เทคนิคที่ใช้ และผลลัพธ์ของโปรเจกต์..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white text-sm outline-none resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* 2. Multi-Image Manager (รองรับหลายรูปภาพตามคำขอของผู้ใช้) */}
          <div className="space-y-4 pt-4 border-t border-slate-800/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>2. คลังรูปภาพของโปรเจกต์ (Project Image Gallery)</span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  สามารถอัปโหลดได้หลายภาพพร้อมกัน หรือใส่ลิงก์ URL รูปภาพที่ 1 จะถูกใช้เป็นภาพหน้าปก
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                  ทั้งหมด: <strong className="text-emerald-400">{currentImages.length}</strong> ภาพ
                </span>
                {currentImages.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearAllImages}
                    className="text-xs text-rose-400 hover:text-rose-300 hover:underline cursor-pointer"
                  >
                    ล้างทั้งหมด
                  </button>
                )}
              </div>
            </div>

            {/* Upload / URL Input Box */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-3">
              {/* Tab Selector */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setImageTab('upload')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    imageTab === 'upload'
                      ? 'bg-emerald-500 text-[#0B1329] font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>อัปโหลดหลายไฟล์จากเครื่อง</span>
                </button>
                <button
                  type="button"
                  onClick={() => setImageTab('url')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    imageTab === 'url'
                      ? 'bg-emerald-500 text-[#0B1329] font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <Link2 className="w-3.5 h-3.5" />
                  <span>เพิ่มด้วยลิงก์ URL</span>
                </button>
              </div>

              {/* Upload Input Area */}
              {imageTab === 'upload' ? (
                <div>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-xl p-6 text-center cursor-pointer transition-all bg-slate-900/40 hover:bg-slate-900/80 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-semibold text-white">
                      คลิกเพื่อเลือกรูปภาพ (เลือกพร้อมกันได้หลายภาพ)
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      รองรับไฟล์ JPG, PNG, WebP, GIF ขนาดไม่เกิน 8MB ต่อไฟล์
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleMultipleFilesUpload}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-example... หรือลิงก์ภาพใดๆ"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddImageUrl();
                      }
                    }}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white text-xs font-mono outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0B1329] font-bold text-xs transition-colors cursor-pointer shrink-0"
                  >
                    + เพิ่มรูปภาพ
                  </button>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery & Management Grid */}
            {currentImages.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
                  <span>รายการภาพที่เพิ่มแล้ว ({currentImages.length} รูป):</span>
                  <span className="text-emerald-400 text-[11px]">
                    ★ ภาพแรกคือภาพปก (Cover) ที่แสดงหน้าการ์ด
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {currentImages.map((imgSrc, idx) => (
                    <div
                      key={idx}
                      className={`relative rounded-xl overflow-hidden border transition-all duration-200 group bg-slate-950 ${
                        idx === 0
                          ? 'border-emerald-500 shadow-md shadow-emerald-500/20'
                          : 'border-slate-800 hover:border-slate-600'
                      }`}
                    >
                      {/* Image Thumbnail */}
                      <div className="h-28 w-full relative overflow-hidden flex items-center justify-center bg-black/40">
                        <img
                          src={imgSrc}
                          alt={`Project thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Zoom button */}
                        <button
                          type="button"
                          onClick={() => setPreviewZoomImage(imgSrc)}
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer"
                          title="ดูภาพขยาย"
                        >
                          <Eye className="w-5 h-5 drop-shadow-md" />
                        </button>
                      </div>

                      {/* Header Badge on Thumbnail */}
                      <div className="absolute top-1.5 left-1.5 flex items-center gap-1 z-10 pointer-events-none">
                        {idx === 0 ? (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-[#0B1329] text-[9px] font-bold uppercase tracking-wider shadow">
                            ★ ภาพปก
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded bg-slate-900/90 text-slate-300 text-[9px] font-mono border border-slate-700">
                            #{idx + 1}
                          </span>
                        )}
                      </div>

                      {/* Controls Footer */}
                      <div className="p-1.5 bg-slate-950/95 border-t border-slate-800 flex items-center justify-between gap-1 text-[10px]">
                        <div className="flex items-center gap-0.5">
                          {idx > 0 && (
                            <button
                              type="button"
                              onClick={() => handleMoveImageLeft(idx)}
                              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                              title="เลื่อนไปทางซ้าย"
                            >
                              <ArrowLeft className="w-3 h-3" />
                            </button>
                          )}
                          {idx < currentImages.length - 1 && (
                            <button
                              type="button"
                              onClick={() => handleMoveImageRight(idx)}
                              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                              title="เลื่อนไปทางขวา"
                            >
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          {idx !== 0 && (
                            <button
                              type="button"
                              onClick={() => handleSetCoverImage(idx)}
                              className="px-1.5 py-0.5 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30 transition-colors cursor-pointer"
                              title="ตั้งเป็นภาพหน้าปกหลัก"
                            >
                              เป็นปก
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="p-1 rounded bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-500/30 transition-colors cursor-pointer"
                            title="ลบภาพนี้"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. Tech Stack Tags */}
          <div className="space-y-3 pt-4 border-t border-slate-800/80">
            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              <span>3. เทคโนโลยีที่ใช้ (Technologies / Tech Stack)</span>
            </h4>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="พิมพ์ชื่อเทคโนโลยี แล้วกดเพิ่ม เช่น React, Python, CSS..."
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTech();
                  }
                }}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white text-sm outline-none"
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs border border-slate-700 cursor-pointer"
              >
                + เพิ่ม Tag
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 min-h-[32px]">
              {formData.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-emerald-300 text-xs font-mono border border-slate-700"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(idx)}
                    className="text-slate-400 hover:text-rose-400 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* 4. Features & Deliverables */}
          <div className="space-y-3 pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>4. จุดเด่นและฟีเจอร์หลัก (Key Highlights / Features)</span>
              </h4>
              <button
                type="button"
                onClick={handleAddFeature}
                className="text-xs text-emerald-400 hover:underline cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>เพิ่มฟีเจอร์</span>
              </button>
            </div>

            <div className="space-y-2">
              {formData.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={`จุดเด่นที่ ${idx + 1}`}
                    value={feat}
                    onChange={(e) => handleUpdateFeature(idx, e.target.value)}
                    className="flex-1 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 text-white text-xs outline-none"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(idx)}
                      className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 5. External Links: GitHub Repo & Live Website */}
          <div className="space-y-4 pt-4 border-t border-slate-800/80">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5" />
                <span>5. ลิงก์เชื่อมต่อไปยัง GitHub Repo และเว็บไซต์จริง (GitHub & Live Web Links)</span>
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">
                ระบุหรือแก้ไขลิงก์เพื่อให้ผู้ที่เข้ามาดู Portfolio สามารถกดเข้าไปดู Source Code ใน GitHub และกดเข้าชมเว็บไซต์จริงของโปรเจกต์นี้ได้ทันที
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* GitHub Repository Link Card */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-slate-200 font-semibold flex items-center gap-1.5">
                    <Github className="w-4 h-4 text-emerald-400" />
                    <span>GitHub Repository URL (ดูโค้ด)</span>
                  </label>
                  {formData.githubUrl && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, githubUrl: '' })}
                      className="text-[11px] text-slate-500 hover:text-rose-400 cursor-pointer"
                    >
                      ล้างลิงก์
                    </button>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="เช่น https://github.com/BankNatthaphong112/your-repo"
                    value={formData.githubUrl || ''}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white text-xs font-mono outline-none"
                  />
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  ระบุ URL ของ Repository ที่คุณเก็บโค้ดไว้ เช่น https://github.com/...
                </p>

                {/* Helper & Test link */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-850">
                  {formData.githubUrl && formData.githubUrl.trim() !== '' && (
                    <a
                      href={normalizeUrl(formData.githubUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-[11px] font-medium border border-emerald-500/30 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>ทดสอบเปิด GitHub ↗</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        githubUrl: 'https://github.com/BankNatthaphong112',
                      })
                    }
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-[10px] font-mono border border-slate-800 transition-colors cursor-pointer"
                  >
                    <span>+ ใส่โปรไฟล์หลัก</span>
                  </button>
                </div>
              </div>

              {/* Live Web / Demo Link Card */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-slate-200 font-semibold flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <span>Live Website URL (ไปดูหน้าเว็บจริง)</span>
                  </label>
                  {formData.liveUrl && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, liveUrl: '' })}
                      className="text-[11px] text-slate-500 hover:text-rose-400 cursor-pointer"
                    >
                      ล้างลิงก์
                    </button>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="เช่น https://banknatthaphong112.github.io/... หรือ https://app.vercel.app"
                    value={formData.liveUrl || ''}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-xs font-mono outline-none"
                  />
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  ระบุ URL ของหน้าเว็บที่ออนไลน์อยู่เพื่อให้คนดูสามารถคลิกเข้าไปใช้งานได้จริง
                </p>

                {/* Helper & Test link */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-850">
                  {formData.liveUrl && formData.liveUrl.trim() !== '' && (
                    <a
                      href={normalizeUrl(formData.liveUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 text-[11px] font-medium border border-cyan-500/30 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>ทดสอบเปิดหน้าเว็บ ↗</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        liveUrl: 'https://banknatthaphong112.github.io/BankNatthaphong.github.io/',
                      })
                    }
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-[10px] font-mono border border-slate-800 transition-colors cursor-pointer"
                  >
                    <span>+ ใส่ GitHub Pages</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Submit Bar */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              id="save-project-btn"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-[#0B1329] font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              บันทึกการเปลี่ยนแปลง (Save Project)
            </button>
          </div>
        </form>

        {/* Full Image Zoom Modal */}
        {previewZoomImage && (
          <div
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setPreviewZoomImage(null)}
          >
            <div className="relative max-w-4xl max-h-[85vh]">
              <button
                onClick={() => setPreviewZoomImage(null)}
                className="absolute -top-10 right-0 p-1.5 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={previewZoomImage}
                alt="Enlarged preview"
                className="max-h-[80vh] w-auto object-contain rounded-2xl border border-slate-700 shadow-2xl"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
