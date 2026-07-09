import { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
  useInView,
} from 'framer-motion';


import { assets } from './assets';
import Navbar from './components/Navbar';
import Button from './components/Button';
import heroImg from './assets/hero.png';
import catImg from './assets/cat.png';
import certifiedImg from './assets/certified.png';
import upnvjImg from './assets/upnvj.png';
import veterantechImg from './assets/veterantech.png';
import kopdesImg from './assets/kopdes.png';
import bgnImg from './assets/bgn.png';
import coffeeImg from './assets/coffee.png';
import laptopImg from './assets/laptop.png';
import uxImg from './assets/UX.png';
import uiEngineerImg from './assets/ui-engineer.png';
import problemsolvImg from './assets/problemsolv.png';
import logoImg from './assets/Logo.svg';
import githubIcon from './assets/icon-github.svg';
import linkedinIcon from './assets/icon-linkedin.svg';

interface Project {
  id: number;
  name: string;
  scope: string;
  description: string;
  image_url: string;
  project_url: string;
  github_url: string;
}

// ─── FRAMER MOTION VARIANTS ─────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};


const slideInRight = {
  hidden: { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] as const } },
  exit: { x: '100%', opacity: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] as const } },
};

// ─── TYPEWRITER HOOK ─────────────────────────────────────────────────────────

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), speed);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex((w) => (w + 1) % words.length);
    }

    setDisplayed(current.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return displayed;
}



// ─── PARTICLE STARS ──────────────────────────────────────────────────────────

function ParticleStars({ count = 60 }: { count?: number }) {
  const particles = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 5,
      driftDuration: 10 + Math.random() * 10,
      driftDelay: Math.random() * 8,
    }))
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {particles.current.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            '--duration': `${p.duration}s`,
            '--delay': `${p.delay}s`,
            '--drift-duration': `${p.driftDuration}s`,
            '--drift-delay': `${p.driftDelay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// ─── SCROLL PROGRESS BAR ─────────────────────────────────────────────────────

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX, width: '100%' }}
    />
  );
}

// ─── ANIMATED SECTION WRAPPER ─────────────────────────────────────────────────

function RevealSection({
  children,
  className = '',
  variants = fadeUp,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: typeof fadeUp;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Admin state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formName, setFormName] = useState('');
  const [formScope, setFormScope] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formImgUrl, setFormImgUrl] = useState('');
  const [formProjUrl, setFormProjUrl] = useState('');
  const [formGitUrl, setFormGitUrl] = useState('');

  // Typewriter
  const typewriterText = useTypewriter(['Best Unemployment', 'UI/UX Designer', 'Fullstack Dev', 'Problem Solver']);

  // Fetch projects from Express API
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/projects');
      if (!res.ok) throw new Error('Gagal mengambil data proyek.');
      const data = await res.json();
      setProjects(data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError('Koneksi ke backend gagal. Pastikan server backend Anda berjalan di port 5000.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // CRUD Operations
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: formName,
      scope: formScope,
      description: formDesc,
      image_url: formImgUrl,
      project_url: formProjUrl,
      github_url: formGitUrl,
    };

    try {
      let res;
      if (editingProject) {
        res = await fetch(`http://localhost:5000/api/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('http://localhost:5000/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error('Gagal menyimpan proyek');
      resetForm();
      fetchProjects();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleEditClick = (project: Project) => {
    setEditingProject(project);
    setFormName(project.name);
    setFormScope(project.scope);
    setFormDesc(project.description);
    setFormImgUrl(project.image_url);
    setFormProjUrl(project.project_url);
    setFormGitUrl(project.github_url);
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus proyek ini?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Gagal menghapus proyek');
      fetchProjects();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const resetForm = () => {
    setEditingProject(null);
    setFormName('');
    setFormScope('');
    setFormDesc('');
    setFormImgUrl('');
    setFormProjUrl('');
    setFormGitUrl('');
  };

  // ── HERO refs for parallax ──────────────────────────────────────────────
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 80]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <div className="bg-[#121212] min-h-screen text-white relative font-plus-jakarta overflow-x-hidden">



      {/* SCROLL PROGRESS BAR */}
      <ScrollProgressBar />

      {/* PARTICLE STARS */}
      <ParticleStars count={70} />

      {/* BACKGROUND ANIMATED BLOBS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <div
          className="absolute opacity-30 blob-1"
          style={{ top: '-318px', left: '-1151px', width: '1782px', height: '1514px', filter: 'blur(100px)' }}
        >
          <img src={assets.imgGroup1} alt="" className="w-full h-full object-cover" />
        </div>
        <div
          className="absolute opacity-20 blob-2"
          style={{ top: '455px', left: '33%', width: '1782px', height: '1532px', filter: 'blur(100px)' }}
        >
          <img src={assets.imgGroup2} alt="" className="w-full h-full object-cover" />
        </div>
        <div
          className="absolute opacity-20 blob-3"
          style={{ top: '1611px', left: '-260px', width: '1782px', height: '1532px', filter: 'blur(100px)' }}
        >
          <img src={assets.imgGroup2} alt="" className="w-full h-full object-cover" />
        </div>
        <div
          className="absolute opacity-10 blob-4"
          style={{ top: '3048px', left: '-796px', width: '2867px', height: '2721px', filter: 'blur(100px)' }}
        >
          <img src={assets.imgGroup4} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* CONTAINER */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-6 relative z-10">

        {/* NAVBAR */}
        <Navbar onAdminClick={() => setIsAdminOpen(true)} />

        {/* HERO SECTION */}
        <section id="about" ref={heroRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32">

          {/* Left Column */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start gap-8"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold leading-tight"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.span variants={fadeUp} className="block">I'm Gerson Sebastian,</motion.span>
              <motion.span variants={fadeUp} className="block mt-2">
                <span className="gradient-text-blue">
                  {typewriterText}
                  <span className="typewriter-cursor" />
                </span>
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-[#e8e8e8] font-light text-lg max-w-[480px] leading-relaxed"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              I'm available for work, if you want to contact with me then please hit hire me button
            </motion.p>

            <motion.div
              className="flex items-center gap-4 animate-fade-in"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              <Button variant="primary" size="lg" asAnchor href="#contact">
                Hire Me
              </Button>
              <Button variant="outline" size="lg" asAnchor href="#motto">
                My Motto
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            className="lg:col-span-5 flex justify-center relative"
            variants={fadeRight}
            initial="hidden"
            animate="visible"
          >
            <div>
              {/* Profile Photo */}
              <motion.img
                src={heroImg}
                alt="Gerson Sebastian"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              />



              {/* Floating Coffee Cup */}
              <motion.div
                className="absolute bottom-[-30px] left-[-45px] w-36 h-36 z-20 pointer-events-none drop-shadow-2xl"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img src={coffeeImg} alt="coffee" className="w-full h-full object-contain" />
              </motion.div>

              {/* Floating Laptop */}
              <motion.div
                className="absolute top-[-60px] right-[-80px] w-52 h-52 z-20 pointer-events-none drop-shadow-2xl"
                animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <img src={laptopImg} alt="laptop" className="w-full h-full object-contain" />
              </motion.div>

              {/* Badge */}
              <motion.div
                className="absolute top-[30%] left-[-30px] z-20 w-[200px] drop-shadow-xl float-badge"
                whileHover={{ scale: 1.08, rotate: -3 }}
                transition={{ duration: 0.3 }}
              >
                <img alt="Certified Jobless" src={certifiedImg} className="w-full h-auto object-contain" />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* BRANDS / PARTNERS */}
        <RevealSection>
          <section className="bg-[rgba(255,255,255,0.1)] flex items-center justify-between px-[81px] py-[47px] mb-32 mx-[60px]">
            {[
              { src: upnvjImg, alt: 'UPN' },
              { src: veterantechImg, alt: 'Veterantech' },
              { src: kopdesImg, alt: 'Soon' },
              { src: bgnImg, alt: 'Soon' },
            ].map((brand, i) => (
              <motion.div
                key={brand.alt + i}
                className="w-[156px] h-[156px] flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.08 }}
              >
                <img alt={brand.alt} src={brand.src} className="w-full h-full object-contain brand-logo" />
              </motion.div>
            ))}
          </section>
        </RevealSection>

        {/* SKILLS SECTION */}
        <section id="skills" className="mb-32">
          <RevealSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text-blue">My Skill</span> Saya
            </h2>
            <p className="text-[#e8e8e8] font-light max-w-xl mx-auto">
              Love to explore on design and building software, I will create solution
            </p>
          </RevealSection>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {[
              {
                img: uxImg,
                title: 'UI/UX',
                desc: 'Lorem ipsum description of skills',
                border: 'hover:border-[#8B5CF6]/60',
              },
              {
                img: uiEngineerImg,
                title: 'UI Engineer',
                desc: 'Lorem ipsum description of skills',
                border: 'hover:border-[#266ed9]/60',
              },
              {
                img: problemsolvImg,
                title: 'Problem Solving',
                desc: 'Lorem ipsum description of skills',
                border: 'hover:border-[#b14c1f]/60',
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                custom={i}
                className={`skill-card border border-white/10 ${card.border} transition rounded-xl p-8 flex flex-col items-center text-center bg-white/[0.02]`}
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
                data-cursor-hover
              >
                <motion.div
                  className="w-[86px] h-[86px] mb-6 flex items-center justify-center"
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <img alt={card.title} src={card.img} className="w-full h-full object-contain" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="mb-32 scroll-mt-6">
          <RevealSection>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-3">
                  My Latest <span className="gradient-text-orange">Project</span>
                </h2>
                <p className="text-[#e8e8e8] font-light">Project that created</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsAdminOpen(true)}>
                + Kelola Database Proyek
              </Button>
            </div>
          </RevealSection>

          {error && (
            <motion.div
              className="bg-red-900/30 border border-red-500 text-red-200 p-4 rounded-lg mb-8 text-center text-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {error}
              <Button variant="outline" size="sm" className="block mx-auto mt-2 font-semibold" onClick={fetchProjects}>
                Coba Hubungkan Kembali
              </Button>
            </motion.div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white/5 border border-white/10 rounded-xl overflow-hidden h-[380px]">
                  <div className="bg-white/10 h-[250px] w-full" />
                  <div className="p-5 flex flex-col gap-3">
                    <div className="h-4 bg-white/20 rounded w-[60%]" />
                    <div className="h-3 bg-white/10 rounded w-[40%]" />
                  </div>
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <motion.div
              className="text-center py-20 bg-white/[0.01] border border-dashed border-white/10 rounded-xl flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-gray-400">Belum ada proyek dalam database PostgreSQL.</p>
              <Button
                onClick={() => { setIsAdminOpen(true); resetForm(); }}
                variant="primary"
                size="sm"
              >
                Tambah Proyek Pertama
              </Button>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  variants={fadeUp}
                  custom={i}
                  className="bg-[#1f1f1f]/50 border border-white/5 rounded-xl overflow-hidden shadow-lg flex flex-col"
                  whileHover={{ y: -8, borderColor: 'rgba(255,255,255,0.15)', boxShadow: '0 24px 48px rgba(0,0,0,0.5)' }}
                  transition={{ duration: 0.3 }}
                  data-cursor-hover
                >
                  <div className="h-[220px] bg-[#2a2a2a] relative overflow-hidden group">
                    <motion.img
                      alt={project.name}
                      className="w-full h-full object-cover"
                      src={project.image_url || 'https://picsum.photos/400/250'}
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://picsum.photos/400/250';
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                    >
                      {project.project_url && (
                        <Button
                          variant="primary"
                          size="sm"
                          asAnchor
                          href={project.project_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Live Demo
                        </Button>
                      )}
                      {project.github_url && (
                        <Button
                          variant="outline"
                          size="sm"
                          asAnchor
                          href={project.github_url}
                          target="_blank"
                          rel="noreferrer"
                          className="!border-white !text-white hover:!bg-white/10"
                        >
                          GitHub
                        </Button>
                      )}
                    </motion.div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs text-[#266ed9] uppercase tracking-wider font-semibold block mb-2">{project.scope}</span>
                      <h3 className="text-xl font-bold mb-2 text-white">{project.name}</h3>
                      <p className="text-sm text-gray-400 font-light line-clamp-3 mb-4">{project.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          <RevealSection className="flex justify-center">
            <Button variant="primary">
              Explore More
            </Button>
          </RevealSection>
        </section>

        {/* WHY HIRE ME SECTION */}
        <section id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">

          {/* Left Column (Image) */}
          <motion.div
            className="lg:col-span-6 flex justify-center"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="relative w-[480px] max-w-full">


              {/* Construction Cat */}
              <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.02 }}
              >
                <img alt="Why Hire Me" src={catImg} className="w-full h-auto object-contain" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column (Text) */}
          <motion.div
            className="lg:col-span-6 flex flex-col items-start gap-6"
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Why you should <br />
              <span className="gradient-text-blue">Hire Me</span>
            </h2>
            <p className="text-2xl font-light text-[#e8e8e8] leading-relaxed italic">
              "Because I have no job :("
            </p>
            <p className="text-gray-400 font-light leading-relaxed">
              Tapi secara profesional, saya bersemangat mempelajari fullstack web development dan siap mendedikasikan waktu saya untuk membantu membangun solusi digital hebat di tim Anda.
            </p>
            <Button variant="orange" size="lg" asAnchor href="mailto:gerson.sebastian@example.com">
              Hire Me
            </Button>
          </motion.div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="bg-[rgba(255,255,255,0.1)] mix-blend-hard-light overflow-hidden w-full relative z-10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <motion.div
            className="flex items-center justify-between px-[128px] py-[47px]"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Brand Info */}
            <motion.div variants={fadeUp} className="flex flex-col gap-[25px] w-[384px]">
              <div className="flex items-center gap-3">
                <img alt="Logo" className="w-[38px] h-[41px] object-contain" src={logoImg} />
                <span className="text-[27px] font-bold tracking-tight">gerson</span>
              </div>
              <p className="text-[#b6b6b6] font-extralight text-[18px] leading-normal max-w-sm whitespace-pre-wrap">
                {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus  arcu ante, at finibus neque laoreet sed.`}
              </p>
              <div className="flex items-center gap-8">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="w-8 h-[31px] hover:opacity-80 transition" data-cursor-hover>
                  <img alt="Github" src={githubIcon} className="w-full h-full object-contain" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 hover:opacity-80 transition" data-cursor-hover>
                  <img alt="Linkedin" src={linkedinIcon} className="w-full h-full object-contain" />
                </a>
              </div>
            </motion.div>

            {/* Links */}
            <div className="flex gap-[128px] items-start text-[18px] leading-normal">
              {/* Features Links */}
              <motion.div variants={fadeUp} custom={1} className="flex flex-col gap-[24px] w-[117px]">
                <h4 className="font-bold text-white">Features</h4>
                <ul className="flex flex-col gap-[10px] text-[#b6b6b6] font-extralight">
                  {['UI/UX Design', 'Programming', 'Web Project', 'App Project'].map((item) => (
                    <motion.li key={item} whileHover={{ x: 4, color: '#ffffff' }} className="cursor-pointer transition-colors">
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* About Links */}
              <motion.div variants={fadeUp} custom={2} className="flex flex-col gap-[24px] w-[140px]">
                <h4 className="font-bold text-white">About</h4>
                <ul className="flex flex-col gap-[10px] text-[#b6b6b6] font-extralight">
                  {['Contact', 'Privacy Policy', 'Terms Condition'].map((item) => (
                    <motion.li key={item} whileHover={{ x: 4, color: '#ffffff' }} className="cursor-pointer transition-colors">
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* CRUD ADMIN SLIDE-OVER PANEL (with AnimatePresence) */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div
            className="fixed inset-0 z-50 overflow-hidden flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Overlay backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsAdminOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Panel content */}
            <motion.div
              className="relative w-full max-w-lg bg-[#1f1f1f] h-full shadow-2xl flex flex-col z-10 border-l border-white/10"
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#181818]">
                <h3 className="text-xl font-bold text-blue-400">Database Project Manager</h3>
                <motion.button
                  onClick={() => { setIsAdminOpen(false); resetForm(); }}
                  className="text-gray-400 hover:text-white text-2xl font-bold px-2"
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  data-cursor-hover
                >
                  &times;
                </motion.button>
              </div>

              {/* List + Form */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">

                {/* Form Input */}
                <form onSubmit={handleSaveProject} className="space-y-4 bg-white/[0.02] border border-white/5 p-4 rounded-lg">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400">
                    {editingProject ? 'Edit Proyek' : 'Tambah Proyek Baru'}
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Nama Proyek *</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Contoh: E-Commerce Web App"
                      className="w-full bg-[#121212] border border-white/10 focus:border-blue-500 rounded px-3 py-2 text-sm outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Scope/Bidang Proyek *</label>
                    <input
                      type="text"
                      required
                      value={formScope}
                      onChange={(e) => setFormScope(e.target.value)}
                      placeholder="Contoh: Fullstack Development"
                      className="w-full bg-[#121212] border border-white/10 focus:border-blue-500 rounded px-3 py-2 text-sm outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Deskripsi Proyek</label>
                    <textarea
                      rows={3}
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      placeholder="Deskripsi singkat mengenai proyek..."
                      className="w-full bg-[#121212] border border-white/10 focus:border-blue-500 rounded px-3 py-2 text-sm outline-none transition resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Image URL</label>
                    <input
                      type="text"
                      value={formImgUrl}
                      onChange={(e) => setFormImgUrl(e.target.value)}
                      placeholder="https://picsum.photos/400/250"
                      className="w-full bg-[#121212] border border-white/10 focus:border-blue-500 rounded px-3 py-2 text-sm outline-none transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Live URL</label>
                      <input
                        type="text"
                        value={formProjUrl}
                        onChange={(e) => setFormProjUrl(e.target.value)}
                        placeholder="https://live.demo"
                        className="w-full bg-[#121212] border border-white/10 focus:border-blue-500 rounded px-3 py-2 text-sm outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">GitHub URL</label>
                      <input
                        type="text"
                        value={formGitUrl}
                        onChange={(e) => setFormGitUrl(e.target.value)}
                        placeholder="https://github.com/..."
                        className="w-full bg-[#121212] border border-white/10 focus:border-blue-500 rounded px-3 py-2 text-sm outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      className="flex-1"
                    >
                      {editingProject ? 'Simpan Perubahan' : 'Tambah ke PostgreSQL'}
                    </Button>
                    {editingProject && (
                      <Button
                        type="button"
                        variant="gray"
                        size="sm"
                        onClick={resetForm}
                      >
                        Batal
                      </Button>
                    )}
                  </div>
                </form>

                {/* List Project Database */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400">
                    Daftar Proyek Terdaftar ({projects.length})
                  </h4>

                  {projects.map((proj) => (
                    <motion.div
                      key={proj.id}
                      className="flex justify-between items-center p-3 bg-white/[0.01] border border-white/5 rounded-lg"
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                    >
                      <div className="truncate max-w-[280px]">
                        <p className="text-sm font-semibold truncate text-white">{proj.name}</p>
                        <p className="text-xs text-gray-500 truncate">{proj.scope}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEditClick(proj)}
                          variant="outline"
                          size="sm"
                          className="!px-3 !py-1 text-xs"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteProject(proj.id)}
                          variant="red"
                          size="sm"
                          className="!px-3 !py-1 text-xs"
                        >
                          Hapus
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
