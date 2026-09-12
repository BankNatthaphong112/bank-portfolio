import React, { useState } from 'react';
import { Lock, KeyRound, ShieldAlert, Eye, EyeOff, Check, X, ShieldCheck } from 'lucide-react';
import { verifyOwnerPassword } from '../utils/security';

interface ProjectAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

export const ProjectAuthModal: React.FC<ProjectAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticated,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('กรุณากรอกรหัสผ่าน');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const isValid = await verifyOwnerPassword(password);
      if (isValid) {
        setIsLoading(false);
        setPassword('');
        onAuthenticated();
        onClose();
      } else {
        setIsLoading(false);
        setError('รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
      }
    } catch (err) {
      setIsLoading(false);
      setError('เกิดข้อผิดพลาดในการตรวจสอบรหัสผ่าน');
    }
  };

  return (
    <div
      id="project-auth-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-[#0F172A] border border-slate-700/90 shadow-2xl overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Icon */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">ยืนยันสิทธิ์เจ้าของเว็บไซต์</h3>
              <p className="text-xs font-mono text-emerald-400">Owner Access Verification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informational Notice */}
        <div className="mb-6 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-1.5">
          <div className="flex items-center gap-2 font-semibold text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>ระบบความปลอดภัย SHA-256</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            โหมดนี้สำหรับคุณณัฐพงศ์ (Bank) เพื่อจัดการผลงาน เพิ่มรูปภาพ และแก้ไขคำอธิบายโปรเจกต์ รหัสผ่านจะถูก Hash ด้วย SHA-256 ก่อนตรวจสอบ
          </p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="owner-pass-input"
              className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2"
            >
              รหัสผ่าน (Password)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                id="owner-pass-input"
                type={showPassword ? 'text' : 'password'}
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="ป้อนรหัสผ่าน..."
                className="w-full pl-10 pr-11 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder-slate-500 text-sm outline-none transition-colors font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors"
                title={showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-[#0B1329] font-bold text-xs hover:from-emerald-400 hover:to-teal-400 transition-all shadow-md shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
