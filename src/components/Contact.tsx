import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
  Send,
  Copy,
  Check,
  Sparkles,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate sending message
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 800);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#0D1630] border-t border-slate-800/80 relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            GET IN TOUCH
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            ติดต่อฉัน
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
            หากคุณสนใจร่วมงาน หรือต้องการสอบถามข้อมูลเพิ่มเติม สามารถติดต่อได้ที่ช่องทางด้านล่าง
          </p>
          <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mx-auto mt-4" />
        </div>

        {/* Two Columns: Contact Details & Interactive Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <div
              id="contact-email-card"
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all duration-200 flex items-center justify-between group shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-slate-800 text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">อีเมล (Email)</div>
                  <a
                    href={`mailto:${personalInfo.contacts.email}`}
                    className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors"
                  >
                    {personalInfo.contacts.email}
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(personalInfo.contacts.email, 'email')}
                className="p-2 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                title="คัดลอกอีเมล"
                aria-label="Copy email address"
              >
                {copiedField === 'email' ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Phone Card */}
            <div
              id="contact-phone-card"
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all duration-200 flex items-center justify-between group shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-slate-800 text-teal-400 group-hover:bg-teal-500/10 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">เบอร์โทรศัพท์ (Phone)</div>
                  <a
                    href={`tel:${personalInfo.contacts.phone}`}
                    className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors font-mono"
                  >
                    {personalInfo.contacts.phone}
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(personalInfo.contacts.phone, 'phone')}
                className="p-2 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                title="คัดลอกเบอร์โทร"
                aria-label="Copy phone number"
              >
                {copiedField === 'phone' ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Location Card */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-4 shadow-lg">
              <div className="p-3 rounded-xl bg-slate-800 text-cyan-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400">ที่อยู่ (Location)</div>
                <div className="text-sm sm:text-base font-semibold text-white">
                  {personalInfo.contacts.location}
                </div>
              </div>
            </div>

            {/* Social Links Cards */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={personalInfo.contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-800/60 transition-all flex items-center gap-3 group"
              >
                <Github className="w-5 h-5 text-slate-300 group-hover:text-emerald-400" />
                <div className="text-left">
                  <div className="text-xs font-mono text-slate-400">GitHub</div>
                  <div className="text-xs font-bold text-white truncate max-w-[120px]">
                    BankNatthaphong112
                  </div>
                </div>
              </a>

              <a
                href={personalInfo.contacts.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-800/60 transition-all flex items-center gap-3 group"
              >
                <Globe className="w-5 h-5 text-slate-300 group-hover:text-emerald-400" />
                <div className="text-left">
                  <div className="text-xs font-mono text-slate-400">Portfolio</div>
                  <div className="text-xs font-bold text-white truncate max-w-[100px]">
                    banknatthaphong
                  </div>
                </div>
              </a>
            </div>

            {/* Status callout */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-500/30 text-xs sm:text-sm text-slate-300 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <div>
                <span className="text-white font-semibold">พร้อมร่วมงานและเรียนรู้: </span>
                เปิดรับโอกาสการฝึกงานและตำแหน่ง Frontend Developer ในโครงการที่ท้าทาย
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-slate-900/95 border border-slate-800 p-7 sm:p-9 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-lg font-bold text-white">
                    ส่งข้อความติดต่อ (Send a Message)
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">Response within 24h</span>
              </div>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-3 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    ส่งข้อความเรียบร้อยแล้ว!
                  </h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    ขอบคุณที่ติดต่อเข้ามา ผมได้รับข้อความของคุณแล้วและจะติดต่อกลับโดยเร็วที่สุด
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="sender-name"
                        className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2"
                      >
                        ชื่อของคุณ (Your Name) *
                      </label>
                      <input
                        id="sender-name"
                        type="text"
                        required
                        placeholder="กรุณากรอกชื่อของคุณ"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder-slate-500 text-sm outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="sender-email"
                        className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2"
                      >
                        อีเมลสำหรับติดต่อกลับ *
                      </label>
                      <input
                        id="sender-email"
                        type="email"
                        required
                        placeholder="example@domain.com"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder-slate-500 text-sm outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="sender-subject"
                      className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2"
                    >
                      หัวข้อเรื่อง (Subject) *
                    </label>
                    <input
                      id="sender-subject"
                      type="text"
                      required
                      placeholder="เช่น สอบถามการร่วมงาน / ตำแหน่งงานฝึกงาน"
                      value={formState.subject}
                      onChange={(e) =>
                        setFormState({ ...formState, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder-slate-500 text-sm outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="sender-message"
                      className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2"
                    >
                      ข้อความ (Message) *
                    </label>
                    <textarea
                      id="sender-message"
                      rows={4}
                      required
                      placeholder="พิมพ์ข้อความที่คุณต้องการติดต่อ..."
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder-slate-500 text-sm outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    id="contact-btn-submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-[#0B1329] font-bold text-base hover:from-emerald-400 hover:to-teal-400 transition-all duration-200 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span>กำลังส่งข้อความ...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>ส่งข้อความ</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
