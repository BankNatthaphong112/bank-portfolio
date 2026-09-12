import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Projects } from './components/Projects';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B1329] text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Sticky Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 w-full overflow-x-hidden">
        {/* 1. Hero / Introduction */}
        <Hero />

        {/* 2. About Me */}
        <About />

        {/* 3. Skills */}
        <Skills />

        {/* 4. Experience & Education */}
        <Experience />
        <Education />

        {/* 5. Projects Showcase */}
        <Projects />

        {/* 6. Certifications & Activities */}
        <Certifications />

        {/* 7. Contact & Message Form */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
