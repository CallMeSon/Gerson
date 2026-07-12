import Button from '../components/Button';
import type { Project } from './ProjectsSection';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  editingProject: Project | null;
  formName: string;
  formScope: string;
  formDesc: string;
  formImgUrl: string;
  formProjUrl: string;
  formGitUrl: string;
  setFormName: (v: string) => void;
  setFormScope: (v: string) => void;
  setFormDesc: (v: string) => void;
  setFormImgUrl: (v: string) => void;
  setFormProjUrl: (v: string) => void;
  setFormGitUrl: (v: string) => void;
  onSave: (e: React.FormEvent) => void;
  onEditClick: (project: Project) => void;
  onDelete: (id: number) => void;
  onReset: () => void;
}

export default function AdminPanel({
  isOpen,
  onClose,
  projects,
  editingProject,
  formName,
  formScope,
  formDesc,
  formImgUrl,
  formProjUrl,
  formGitUrl,
  setFormName,
  setFormScope,
  setFormDesc,
  setFormImgUrl,
  setFormProjUrl,
  setFormGitUrl,
  onSave,
  onEditClick,
  onDelete,
  onReset,
}: AdminPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Overlay backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Panel content */}
      <div className="relative w-full max-w-lg bg-[#1f1f1f] h-full shadow-2xl flex flex-col z-10 border-l border-white/10">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#181818]">
          <h3 className="text-xl font-bold text-blue-400">Database Project Manager</h3>
          <button
            onClick={() => { onClose(); onReset(); }}
            className="text-gray-400 hover:text-white text-2xl font-bold px-2 cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* List + Form */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">

          {/* Form Input */}
          <form onSubmit={onSave} className="space-y-4 bg-white/[0.02] border border-white/5 p-4 rounded-lg">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400">
              {editingProject ? 'Edit Proyek' : 'Tambah Proyek Baru'}
            </h4>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Nama Proyek *</label>
              <input
                type="text" required value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Contoh: E-Commerce Web App"
                className="w-full bg-[#121212] border border-white/10 focus:border-blue-500 rounded px-3 py-2 text-sm outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Scope/Bidang Proyek *</label>
              <input
                type="text" required value={formScope}
                onChange={(e) => setFormScope(e.target.value)}
                placeholder="Contoh: Fullstack Development"
                className="w-full bg-[#121212] border border-white/10 focus:border-blue-500 rounded px-3 py-2 text-sm outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Deskripsi Proyek</label>
              <textarea
                rows={3} value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                placeholder="Deskripsi singkat mengenai proyek..."
                className="w-full bg-[#121212] border border-white/10 focus:border-blue-500 rounded px-3 py-2 text-sm outline-none transition resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Image URL</label>
              <input
                type="text" value={formImgUrl}
                onChange={(e) => setFormImgUrl(e.target.value)}
                placeholder="https://picsum.photos/400/250"
                className="w-full bg-[#121212] border border-white/10 focus:border-blue-500 rounded px-3 py-2 text-sm outline-none transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Live URL</label>
                <input
                  type="text" value={formProjUrl}
                  onChange={(e) => setFormProjUrl(e.target.value)}
                  placeholder="https://live.demo"
                  className="w-full bg-[#121212] border border-white/10 focus:border-blue-500 rounded px-3 py-2 text-sm outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">GitHub URL</label>
                <input
                  type="text" value={formGitUrl}
                  onChange={(e) => setFormGitUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full bg-[#121212] border border-white/10 focus:border-blue-500 rounded px-3 py-2 text-sm outline-none transition"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="submit" variant="primary" size="sm" className="flex-1">
                {editingProject ? 'Simpan Perubahan' : 'Tambah ke PostgreSQL'}
              </Button>
              {editingProject && (
                <Button type="button" variant="gray" size="sm" onClick={onReset}>
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
              <div
                key={proj.id}
                className="flex justify-between items-center p-3 bg-white/[0.01] border border-white/5 rounded-lg"
              >
                <div className="truncate max-w-[280px]">
                  <p className="text-sm font-semibold truncate text-white">{proj.name}</p>
                  <p className="text-xs text-gray-500 truncate">{proj.scope}</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => onEditClick(proj)} variant="outline" size="sm" className="!px-3 !py-1 text-xs">
                    Edit
                  </Button>
                  <Button onClick={() => onDelete(proj.id)} variant="red" size="sm" className="!px-3 !py-1 text-xs">
                    Hapus
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
