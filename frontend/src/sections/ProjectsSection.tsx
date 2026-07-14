import { motion } from 'framer-motion';
import Button from '../components/Button';
import RevealSection from '../components/RevealSection';
import { fadeUp, staggerContainer } from '../lib/variants';

export interface Project {
  id: number;
  name: string;
  scope: string;
  image_url: string;
  project_url: string;
  github_url: string;
}

const getImageUrl = (url: string) => {
  if (!url) return 'https://picsum.photos/400/250';
  if (url.startsWith('/uploads/')) {
    const backendBase = import.meta.env.DEV ? 'http://localhost:5000' : '';
    return `${backendBase}${url}`;
  }
  return url;
};

interface ProjectsSectionProps {
  projects: Project[];
  loading: boolean;
  error: string | null;
  isAdminMode: boolean;
  fetchProjects: () => void;
  onOpenAdmin: () => void;
  onEditClick: (project: Project) => void;
  onDelete: (id: number) => void;
}

export default function ProjectsSection({
  projects,
  loading,
  error,
  isAdminMode,
  fetchProjects,
  onOpenAdmin,
  onEditClick,
  onDelete,
}: ProjectsSectionProps) {
  return (
    <section id="projects" className="mb-32 scroll-mt-6">
      <RevealSection>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              My Latest <span className="gradient-text-orange">Project</span>
            </h2>
            <p className="text-[#e8e8e8] font-light">Project that created</p>
          </div>
          {isAdminMode && (
            <Button variant="outline" size="sm" onClick={onOpenAdmin}>
              + Kelola Database Proyek
            </Button>
          )}
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
        isAdminMode ? (
          <motion.div
            className="text-center py-20 bg-white/[0.01] border border-dashed border-white/10 rounded-xl flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-400">Belum ada proyek dalam database PostgreSQL.</p>
            <Button onClick={onOpenAdmin} variant="primary" size="sm">
              Tambah Proyek Pertama
            </Button>
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-400 text-lg font-light">Sabar yah masih di siapin 😊</p>
          </motion.div>
        )
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
                  src={getImageUrl(project.image_url)}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5 }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://picsum.photos/400/250';
                  }}
                />
                 <motion.div
                  className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2 flex-wrap p-4"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  {project.project_url && (
                    <Button variant="primary" size="sm" asAnchor href={project.project_url} target="_blank" rel="noreferrer">
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
                  {isAdminMode && (
                    <>
                      <Button
                        onClick={() => onEditClick(project)}
                        variant="outline"
                        size="sm"
                        className="!border-blue-500 !text-blue-400 hover:!bg-blue-500/20"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => onDelete(project.id)}
                        variant="red"
                        size="sm"
                        className="!border-red-500 !text-red-400 hover:!bg-red-500/20"
                      >
                        Hapus
                      </Button>
                    </>
                  )}
                </motion.div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-[#266ed9] uppercase tracking-wider font-semibold block mb-2">{project.scope}</span>
                  <h3 className="text-xl font-bold mb-2 text-white">{project.name}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {projects.length > 6 && (
        <RevealSection className="flex justify-center">
          <Button variant="primary">Explore More</Button>
        </RevealSection>
      )}
    </section>
  );
}
