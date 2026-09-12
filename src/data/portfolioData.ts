import { Project, SkillCategory, EducationItem, ExperienceItem, CertificationItem } from '../types';

export const personalInfo = {
  name: 'นายณัฐพงศ์ เจริญตา',
  displayName: 'BANK',
  nickname: 'แบงค์',
  age: 22,
  birthdate: '26 เมษายน 2547',
  englishName: 'Natthaphong Charoenta',
  title: 'Frontend Developer',
  thaiTitle: 'FRONTEND DEVELOPER (นักพัฒนาเว็บไซต์)',
  tagline: 'Build Better Web & AI Solutions',
  heroHeadline: "Hello, I'm",
  status: 'พร้อมสำหรับการฝึกงานและร่วมงาน (Frontend Developer)',
  location: 'ขอนแก่น / อุดรธานี, ประเทศไทย',
  address: '120 หมู่ที่ 4 ต.ห้วยโจด อ.กระนวน จ.ขอนแก่น 40170',
  bio: 'เป็นนักศึกษาด้านเทคโนโลยีสารสนเทศ ที่มีความสนใจในการพัฒนาเว็บและ AI มีประสบการณ์จากการฝึกงาน การทำโปรเจกต์และการเรียนรู้ด้วยตนเอง พร้อมเปิดรับการเรียนรู้ใหม่ ๆ และมุ่งมั่นพัฒนาตนเอง',
  aboutLong:
    'นายณัฐพงศ์ เจริญตา (แบงค์) อายุ 22 ปี เป็นนักศึกษาด้านเทคโนโลยีสารสนเทศ ที่มีความสนใจในการพัฒนาเว็บ (Frontend Developer) และเทคโนโลยี AI มีประสบการณ์จริงจากการฝึกงานในการพัฒนา Web Application และโปรเจกต์วิเคราะห์ภาพถ่ายด้วยโมเดล Deep Learning พร้อมเปิดรับการเรียนรู้สิ่งใหม่และมุ่งมั่นพัฒนาศักยภาพตนเองอย่างต่อเนื่อง',
  quote: 'มุ่งมั่นเรียนรู้ ลงมือทำจริง และพัฒนาตัวเองในทุกวันสู่เป้าหมายข้างหน้า',
  contacts: {
    phone: '096-352-2209',
    email: 'BankNatthaphong@gmail.com',
    secondaryEmail: '66040233112@udru.ac.th',
    github: 'https://github.com/BankNatthaphong112',
    linkedin: 'https://linkedin.com/in/bank-natthaphong',
    portfolio: 'https://banknatthaphong112.github.io/BankNatthaphong.github.io/',
    location: '120 หมู่ที่ 4 ต.ห้วยโจด อ.กระนวน จ.ขอนแก่น 40170',
    university: 'มหาวิทยาลัยราชภัฏอุดรธานี (สาขาเทคโนโลยีสารสนเทศ)',
    gpa: '3.68',
  },
};

export const aboutHighlights = [
  {
    icon: 'GraduationCap',
    title: 'นักศึกษาเทคโนโลยีสารสนเทศ',
    desc: 'มหาวิทยาลัยราชภัฏอุดรธานี (ชั้นปีที่ 4) เกรดเฉลี่ยสะสม 3.68',
    color: 'emerald',
  },
  {
    icon: 'Laptop',
    title: 'Frontend Developer',
    desc: 'พัฒนา Web Application, Responsive UI และ Clean Architecture',
    color: 'teal',
  },
  {
    icon: 'Cpu',
    title: 'ความสนใจด้าน Web & AI',
    desc: 'ศึกษาและประยุกต์ใช้ Deep Learning (CNN) EfficientNetV2 ร่วมกับเว็บ',
    color: 'cyan',
  },
  {
    icon: 'Rocket',
    title: 'ประสบการณ์ฝึกงานจริง',
    desc: 'ฝึกงานที่บริษัท อีสานดอทคอม จำกัด พัฒนา Shopfloor Web App (MVP)',
    color: 'emerald',
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Front-end',
    thaiTitle: 'ส่วนติดต่อผู้ใช้ (Frontend Development)',
    iconName: 'Layout',
    skills: [
      { name: 'HTML', description: 'Semantic HTML5, a11y, โครงสร้างหน้าเว็บมาตรฐาน' },
      { name: 'CSS', description: 'Modern CSS3, Flexbox, Grid Layout, Responsive Design' },
      { name: 'JavaScript', description: 'ES6+, DOM Manipulation, Async/Await, Web APIs' },
    ],
  },
  {
    id: 'frameworks',
    title: 'Framework / Library',
    thaiTitle: 'เฟรมเวิร์กและไลบรารีที่เชี่ยวชาญ',
    iconName: 'Code',
    skills: [
      { name: 'React.js', description: 'Functional Components, Hooks, State Management, SPA' },
      { name: 'Tailwind CSS', description: 'Utility-First Styling, Modern Responsive UI, Custom Theme' },
      { name: 'Bootstrap', description: 'Responsive Layouts, Component Library, Grid System' },
      { name: 'Node.js', description: 'JavaScript Runtime Environment, API Handling, Packages' },
    ],
  },
  {
    id: 'backend',
    title: 'Back-end & Programming',
    thaiTitle: 'ภาษาโปรแกรมมิ่งและฝั่งเซิร์ฟเวอร์',
    iconName: 'Server',
    skills: [
      { name: 'Python', description: 'AI, Deep Learning, Data Processing, Scripting' },
      { name: 'PHP', description: 'Server-side Web Development, Database Integration' },
      { name: 'Java', description: 'Object-Oriented Programming (OOP), Data Structures' },
      { name: 'C#', description: 'Object-Oriented Application Development, Logic' },
      { name: 'C / C++', description: 'Core Programming Fundamentals, Memory Concepts' },
    ],
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    thaiTitle: 'การออกแบบส่วนติดต่อผู้ใช้งาน',
    iconName: 'Wrench',
    skills: [
      { name: 'Figma', description: 'Wireframing, High-Fidelity UI Design, Prototyping, Component Systems' },
    ],
  },
  {
    id: 'softskills',
    title: 'Soft Skills',
    thaiTitle: 'ทักษะการทำงานและปฏิสัมพันธ์',
    iconName: 'Sparkles',
    skills: [
      { name: 'การแก้ไขปัญหา (Problem Solving)', description: 'การวิเคราะห์ค้นหาสาเหตุของปัญหาและแก้ไขอย่างเป็นระบบ' },
      { name: 'การคิดวิเคราะห์ (Analytical Thinking)', description: 'วิเคราะห์โครงสร้างระบบและการออกแบบโค้ดอย่างรอบคอบ' },
      { name: 'การทำงานเป็นทีม (Teamwork)', description: 'ร่วมมือกับเพื่อนร่วมทีมและผู้ร่วมงานเพื่อเป้าหมายเดียวกัน' },
      { name: 'การสื่อสาร (Communication)', description: 'สื่อสารข้อมูลทางเทคนิคและการส่งต่องานอย่างมีประสิทธิภาพ' },
      { name: 'การบริหารเวลา (Time Management)', description: 'จัดลำดับความสำคัญของภารกิจและส่งงานตรงตามกำหนด' },
      { name: 'การเรียนรู้และปรับตัว (Adaptability)', description: 'เปิดรับความรู้ใหม่และพร้อมพัฒนาตนเองอย่างต่อเนื่อง' },
    ],
  },
];

export const educationList: EducationItem[] = [
  {
    degree: 'ระดับปริญญาตรี (กำลังศึกษาอยู่ชั้นปีที่ 4)',
    major: 'สาขาเทคโนโลยีสารสนเทศ',
    faculty: 'คณะวิทยาการสารสนเทศ',
    institution: 'มหาวิทยาลัยราชภัฏอุดรธานี',
    period: 'พ.ศ. 2566 - ปัจจุบัน',
    gpa: '3.68',
    status: 'กำลังศึกษาอยู่ชั้นปีที่ 4 (GPA 3.68)',
    highlights: [
      'ศึกษาหลักสูตรเทคโนโลยีสารสนเทศ มหาวิทยาลัยราชภัฏอุดรธานี',
      'เกรดเฉลี่ยสะสม (GPA) : 3.68',
      'เรียนรู้การพัฒนาเว็บไซต์, การออกแบบและวิเคราะห์ระบบ (System Analysis and Design)',
      'โครงงานการประยุกต์ใช้โมเดล Deep Learning (CNN) EfficientNetV2 ร่วมกับระบบวิเคราะห์',
    ],
  },
  {
    degree: 'มัธยมศึกษาตอนปลาย',
    institution: 'โรงเรียนศรีกระนวนวิทยาคม',
    location: 'จังหวัดขอนแก่น',
    period: 'พ.ศ. 2564 - 2566',
    status: 'สำเร็จการศึกษา',
    highlights: [
      'สำเร็จการศึกษาระดับมัธยมศึกษาตอนปลาย',
      'โรงเรียนศรีกระนวนวิทยาคม จังหวัดขอนแก่น',
      'ปูพื้นฐานด้านตรรกศาสตร์ วิทยาศาสตร์ และคอมพิวเตอร์',
    ],
  },
  {
    degree: 'มัธยมศึกษาตอนต้น',
    institution: 'โรงเรียนศรีกระนวนวิทยาคม',
    location: 'จังหวัดขอนแก่น',
    period: 'พ.ศ. 2560 - 2563',
    status: 'สำเร็จการศึกษา',
    highlights: [
      'สำเร็จการศึกษาระดับมัธยมศึกษาตอนต้น',
      'โรงเรียนศรีกระนวนวิทยาคม จังหวัดขอนแก่น',
    ],
  },
];

export const experienceList: ExperienceItem[] = [
  {
    role: 'ฝึกงานในตำแหน่ง Frontend Developer',
    company: 'บริษัท อีสานดอทคอม จำกัด (จ.ขอนแก่น) (Esarndotcom Co.,Ltd.)',
    companyType: 'Company Limited (ขอนแก่น)',
    period: '1 พ.ย. - 12 มิ.ย. 2569',
    responsibilities: [
      'ฝึกงานในตำแหน่ง Frontend Developer รับผิดชอบการพัฒนาส่วนติดต่อผู้ใช้งาน (UI)',
      'ฝึกประสบการณ์ด้านการพัฒนาเว็บไซต์และระบบ Web Application',
      'พัฒนาและปรับปรุงส่วนติดต่อผู้ใช้งาน ให้ตอบสนองต่อการทำงานได้อย่างราบรื่น',
      'งานที่ได้รับผิดชอบ: พัฒนา Shopfloor Web Application สำหรับจัดการกระบวนการภายในเว็บไซต์ร้านขนม พัฒนาด้วย Google Apps Script ในรูปแบบ MVP เพื่อให้ลูกค้าทดลองใช้งานจริงและประเมินความเหมาะสมของระบบ โดยรับผิดชอบด้าน Frontend',
    ],
    skills: [
      'Frontend Developer',
      'Web Application',
      'Google Apps Script',
      'MVP Development',
      'UI/UX Improvement',
      'Problem Solving',
      'Teamwork',
    ],
  },
];

export const defaultProjectsList: Project[] = [
  {
    id: 'shopfloor-bakery',
    name: 'เว็บไซต์จัดการกระบวนการภายในเว็บไซต์ร้านขนม',
    type: 'Website development Group Project',
    badge: 'Shopfloor MVP Web App',
    description:
      'พัฒนา Shopfloor Web Application สำหรับจัดการกระบวนการภายในเว็บไซต์ร้านขนม ในรูปแบบ MVP เพื่อให้ลูกค้าได้ทดลองใช้งานจริง พัฒนาโดยใช้ google app script พร้อมออกแบบส่วนติดต่อผู้ใช้งานให้เรียบง่ายและสะดวกต่อการปฏิบัติงาน',
    technologies: ['Google Apps Script', 'JavaScript', 'HTML5', 'CSS3', 'Web Application', 'MVP'],
    previewType: 'shopfloor',
    features: [
      'พัฒนา Shopfloor Web Application สำหรับจัดการกระบวนการภายในเว็บไซต์ร้านขนม',
      'พัฒนาในรูปแบบ MVP เพื่อให้ผู้ใช้/ลูกค้าได้ทดลองใช้งานจริงและประเมินผลระบบ',
      'ใช้ Google Apps Script จัดการข้อมูลและขั้นตอนการทำงานหลังบ้าน',
      'รับผิดชอบด้าน Frontend ออกแบบและปรับปรุง UI ให้ใช้งานง่าย สะอาดตา และคล่องตัว',
    ],
    githubUrl: 'https://github.com/BankNatthaphong112',
    liveUrl: 'https://banknatthaphong112.github.io/BankNatthaphong.github.io/',
  },
  {
    id: 'skin-disease-ai',
    name: 'ระบบวินิจฉัยโรคผิวหนัง',
    type: 'System analysis and design Group Project',
    badge: 'Deep Learning (CNN) • AI',
    description:
      'พัฒนาระบบวิเคราะห์และจำแนกโรคผิวหนังจากภาพถ่ายด้วย Deep Learning (CNN) โดยใช้ EfficientNetV2 เป็นโมเดลหลัก พัฒนาด้วยภาษา Python เพื่อช่วยเพิ่มความแม่นยำในการจำแนกประเภทโรคผิวหนัง พร้อมทำการวิเคราะห์และออกแบบระบบอย่างเป็นขั้นเป็นตอน',
    technologies: [
      'Python',
      'Deep Learning (CNN)',
      'EfficientNetV2',
      'System Analysis & Design',
      'Computer Vision',
      'AI Model',
    ],
    previewType: 'ai-skin',
    features: [
      'พัฒนาระบบวิเคราะห์และจำแนกโรคผิวหนังจากภาพถ่ายทางการแพทย์ด้วย Deep Learning',
      'เลือกใช้สถาปัตยกรรมโครงข่ายประสาท EfficientNetV2 เพื่อเพิ่มความแม่นยำและประสิทธิภาพการประมวลผล',
      'พัฒนาด้วยภาษา Python สำหรับการเตรียมชุดข้อมูล การฝึกฝน และการจำแนกประเภท',
      'ดำเนินงานตามกระบวนการ System Analysis and Design ครอบคลุมการวิเคราะห์ความต้องการและการออกแบบระบบ',
    ],
    githubUrl: 'https://github.com/BankNatthaphong112',
    liveUrl: '',
  },
  {
    id: 'bank-portfolio',
    name: 'พอร์ตโฟลิโอเว็บไซต์ส่วนตัว (Bank Portfolio)',
    type: 'Frontend Development Project',
    badge: 'Owner Edit & SHA-256 Auth',
    description:
      'เว็บไซต์ Portfolio ส่วนตัว นำเสนอข้อมูลประวัติ การศึกษา ทักษะ ผลงาน และช่องทางติดต่อ พร้อมฟังก์ชันพิเศษให้เจ้าของสามารถใส่รหัสผ่านที่เข้ารหัส SHA-256 เพื่อแก้ไขหรือเพิ่มรูปภาพและคำอธิบายโปรเจกต์ของตนเองได้แบบ Real-time',
    technologies: ['React.js', 'Tailwind CSS', 'Vite', 'TypeScript', 'Web Crypto (SHA-256)', 'Local Persistence'],
    previewType: 'portfolio',
    features: [
      'ระบบรักษาความปลอดภัยยืนยันตัวตนเจ้าของด้วยการแฮชรหัสผ่าน SHA-256 (Web Crypto API)',
      'รองรับการเพิ่มรูปภาพ อัปโหลดรูปจริง หรือใส่ URL พร้อมแก้ไขคำอธิบายโปรเจกต์ได้เอง',
      'บันทึกข้อมูลอย่างต่อเนื่องผ่าน Local Storage เพื่อความสะดวกในการอัปเดตผลงาน',
      'ดีไซน์แบบ Modern Tech Navy พร้อม Timeline การศึกษาและประสบการณ์จริงตามเรซูเม่',
    ],
    githubUrl: 'https://github.com/BankNatthaphong112',
    liveUrl: 'https://banknatthaphong112.github.io/BankNatthaphong.github.io/',
  },
];

export const projectsList: Project[] = defaultProjectsList;

export const certificationsList: CertificationItem[] = [
  {
    name: 'The Ethical Hacker course',
    issuer: 'Cisco Networking Academy',
    category: 'Cybersecurity',
    status: 'Verified Certificate',
  },
  {
    name: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    category: 'Cybersecurity',
    status: 'Verified Certificate',
  },
];
