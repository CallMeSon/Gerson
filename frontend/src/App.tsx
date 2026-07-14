import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import ScrollProgressBar from './components/ScrollProgressBar';
import ParticleStars from './components/ParticleStars';
import HeroSection from './sections/HeroSection';
import BrandsSection from './sections/BrandsSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';
import AdminPanel from './sections/AdminPanel';
import type { Project } from './sections/ProjectsSection';

const API_URL = import.meta.env.DEV ? 'http://localhost:5000/api/projects' : '/api/projects';
const UPLOAD_URL = import.meta.env.DEV ? 'http://localhost:5000/api/upload' : '/api/upload';
const isAdminMode = import.meta.env.VITE_APP_MODE === 'admin';

export default function App() {
  // ── Lenis Smooth Scrolling ──────────────────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      (window as any).lenis = null;
    };
  }, []);

  // ── Data state ───────────────────────────────────────────────────────────────
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Admin panel state ─────────────────────────────────────────────────────────
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formName, setFormName] = useState('');
  const [formScope, setFormScope] = useState('');
  const [formImgUrl, setFormImgUrl] = useState('');
  const [formProjUrl, setFormProjUrl] = useState('');
  const [formGitUrl, setFormGitUrl] = useState('');

  // ── Data fetching ─────────────────────────────────────────────────────────────
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Gagal mengambil data proyek.');
      setProjects(await res.json());
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError('Koneksi ke backend gagal. Pastikan server backend Anda berjalan di port 5000.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  // ── CRUD operations ───────────────────────────────────────────────────────────
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name: formName, scope: formScope, image_url: formImgUrl, project_url: formProjUrl, github_url: formGitUrl };
    try {
      const res = editingProject
        ? await fetch(`${API_URL}/${editingProject.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        : await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error('Gagal menyimpan proyek');
      resetForm();
      fetchProjects();
    } catch (err: any) { alert(err.message); }
  };

  const handleEditClick = (project: Project) => {
    setEditingProject(project);
    setFormName(project.name);
    setFormScope(project.scope);
    setFormImgUrl(project.image_url);
    setFormProjUrl(project.project_url);
    setFormGitUrl(project.github_url);
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus proyek ini?')) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Gagal menghapus proyek');
      fetchProjects();
    } catch (err: any) { alert(err.message); }
  };

  const resetForm = () => {
    setEditingProject(null);
    setFormName(''); setFormScope('');
    setFormImgUrl(''); setFormProjUrl(''); setFormGitUrl('');
  };

  // ── Parallax Background ───────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y5 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="bg-[#121212] min-h-screen text-white relative font-plus-jakarta overflow-x-hidden">

      <ScrollProgressBar />
      <ParticleStars count={70} />

      {/* Background blobs — subtle CSS radial gradients matching Figma design */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        {/* Blob 1 — warm orange glow, upper-left */}
        <motion.div style={{
          position: 'absolute',
          top: '2%',
          left: '-4%',
          width: '35%',
          height: '40%',
          background: 'radial-gradient(ellipse at 25% 35%, rgba(160, 65, 20, 0.28) 0%, rgba(100, 35, 10, 0.10) 50%, transparent 75%)',
          filter: 'blur(55px)',
          y: y1,
        }} />
        {/* Blob 2 — orange glow, right side mid */}
        <motion.div style={{
          position: 'absolute',
          top: '28%',
          right: '-2%',
          width: '28%',
          height: '35%',
          background: 'radial-gradient(ellipse at 75% 45%, rgba(155, 65, 20, 0.22) 0%, rgba(90, 30, 8, 0.08) 50%, transparent 75%)',
          filter: 'blur(50px)',
          y: y2,
        }} />
        {/* Blob 3 — blue-grey cool accent, left center */}
        <motion.div style={{
          position: 'absolute',
          top: '45%',
          left: '-3%',
          width: '30%',
          height: '32%',
          background: 'radial-gradient(ellipse at 20% 60%, rgba(45, 65, 130, 0.18) 0%, rgba(25, 40, 90, 0.07) 50%, transparent 75%)',
          filter: 'blur(60px)',
          y: y3,
        }} />
        {/* Blob 4 — orange glow, lower-left */}
        <motion.div style={{
          position: 'absolute',
          bottom: '8%',
          left: '-2%',
          width: '25%',
          height: '30%',
          background: 'radial-gradient(ellipse at 20% 80%, rgba(165, 70, 20, 0.30) 0%, rgba(100, 40, 10, 0.10) 50%, transparent 75%)',
          filter: 'blur(50px)',
          y: y4,
        }} />
        {/* Blob 5 — faint blue, upper-right */}
        <motion.div style={{
          position: 'absolute',
          top: '5%',
          right: '5%',
          width: '22%',
          height: '28%',
          background: 'radial-gradient(ellipse at 70% 20%, rgba(40, 60, 140, 0.14) 0%, rgba(20, 35, 90, 0.05) 55%, transparent 80%)',
          filter: 'blur(70px)',
          y: y5,
        }} />
      </div>


      {/* Main content container */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-6 relative z-10">
        <Navbar onAdminClick={isAdminMode ? () => setIsAdminOpen(true) : undefined} />
        <HeroSection />
        <BrandsSection />
        <SkillsSection />
        <ProjectsSection
          projects={projects}
          loading={loading}
          error={error}
          isAdminMode={isAdminMode}
          fetchProjects={fetchProjects}
          onOpenAdmin={() => setIsAdminOpen(true)}
          onEditClick={(project) => {
            handleEditClick(project);
            setIsAdminOpen(true);
          }}
          onDelete={handleDeleteProject}
        />
        <ContactSection />
      </div>

      <Footer />

      {/* Admin slide-over panel — only rendered in admin build */}
      {isAdminMode && (
        <AdminPanel
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          projects={projects}
          editingProject={editingProject}
          formName={formName}
          formScope={formScope}
          formImgUrl={formImgUrl}
          formProjUrl={formProjUrl}
          formGitUrl={formGitUrl}
          uploadEndpoint={UPLOAD_URL}
          setFormName={setFormName}
          setFormScope={setFormScope}
          setFormImgUrl={setFormImgUrl}
          setFormProjUrl={setFormProjUrl}
          setFormGitUrl={setFormGitUrl}
          onSave={handleSaveProject}
          onEditClick={handleEditClick}
          onDelete={handleDeleteProject}
          onReset={resetForm}
        />
      )}
    </div>
  );
}
