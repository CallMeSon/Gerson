import { useState, useEffect } from 'react';
import { assets } from './assets';
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

const API_URL = 'http://localhost:5000/api/projects';
const isAdminMode = import.meta.env.VITE_APP_MODE === 'admin';

export default function App() {
  // ── Data state ───────────────────────────────────────────────────────────────
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Admin panel state ─────────────────────────────────────────────────────────
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formName, setFormName] = useState('');
  const [formScope, setFormScope] = useState('');
  const [formDesc, setFormDesc] = useState('');
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
    const payload = { name: formName, scope: formScope, description: formDesc, image_url: formImgUrl, project_url: formProjUrl, github_url: formGitUrl };
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
    setFormDesc(project.description);
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
    setFormName(''); setFormScope(''); setFormDesc('');
    setFormImgUrl(''); setFormProjUrl(''); setFormGitUrl('');
  };

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="bg-[#121212] min-h-screen text-white relative font-plus-jakarta overflow-x-hidden">

      <ScrollProgressBar />
      <ParticleStars count={70} />

      {/* Background animated blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute opacity-30 blob-1" style={{ top: '-318px', left: '-1151px', width: '1782px', height: '1514px', filter: 'blur(100px)' }}>
          <img src={assets.imgGroup1} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute opacity-20 blob-2" style={{ top: '455px', left: '33%', width: '1782px', height: '1532px', filter: 'blur(100px)' }}>
          <img src={assets.imgGroup2} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute opacity-20 blob-3" style={{ top: '1611px', left: '-260px', width: '1782px', height: '1532px', filter: 'blur(100px)' }}>
          <img src={assets.imgGroup2} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute opacity-10 blob-4" style={{ top: '3048px', left: '-796px', width: '2867px', height: '2721px', filter: 'blur(100px)' }}>
          <img src={assets.imgGroup4} alt="" className="w-full h-full object-cover" />
        </div>
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
          formDesc={formDesc}
          formImgUrl={formImgUrl}
          formProjUrl={formProjUrl}
          formGitUrl={formGitUrl}
          setFormName={setFormName}
          setFormScope={setFormScope}
          setFormDesc={setFormDesc}
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
