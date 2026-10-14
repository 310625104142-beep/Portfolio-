import React, { useState, useEffect } from 'react';
import { Project } from '../types/portfolio.ts';
import { X, Save, Trash2, Plus, AlertCircle } from 'lucide-react';

interface ProjectAdminModalProps {
  isOpen: boolean;
  projectToEdit: Project | null;
  onClose: () => void;
  onSaved: () => void;
}

export const ProjectAdminModal: React.FC<ProjectAdminModalProps> = ({
  isOpen,
  projectToEdit,
  onClose,
  onSaved
}) => {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<Project['category']>('Full-Stack');
  const [description, setDescription] = useState('');
  const [fullStory, setFullStory] = useState('');
  const [techStackInput, setTechStackInput] = useState('');
  const [imageUrl, setImageUrl] = useState('/src/assets/images/project_cloud_platform_1791962975439.jpg');
  const [metric1Label, setMetric1Label] = useState('Uptime');
  const [metric1Value, setMetric1Value] = useState('99.99%');
  const [metric2Label, setMetric2Label] = useState('Latency');
  const [metric2Value, setMetric2Value] = useState('< 20ms');
  const [stars, setStars] = useState('450');
  const [year, setYear] = useState('2025');
  const [featured, setFeatured] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (projectToEdit) {
      setTitle(projectToEdit.title);
      setTagline(projectToEdit.tagline);
      setCategory(projectToEdit.category);
      setDescription(projectToEdit.description);
      setFullStory(projectToEdit.fullStory);
      setTechStackInput(projectToEdit.techStack.join(', '));
      setImageUrl(projectToEdit.imageUrl);
      setMetric1Label(projectToEdit.metrics[0]?.label || 'Metric 1');
      setMetric1Value(projectToEdit.metrics[0]?.value || '100%');
      setMetric2Label(projectToEdit.metrics[1]?.label || 'Metric 2');
      setMetric2Value(projectToEdit.metrics[1]?.value || 'Fast');
      setStars(projectToEdit.stars.toString());
      setYear(projectToEdit.year);
      setFeatured(projectToEdit.featured);
    } else {
      setTitle('');
      setTagline('');
      setCategory('Full-Stack');
      setDescription('');
      setFullStory('');
      setTechStackInput('React, Node.js, Express, PostgreSQL, Tailwind CSS');
      setImageUrl('/src/assets/images/project_devtool_studio_1791962977389.jpg');
      setMetric1Label('Throughput');
      setMetric1Value('50k req/s');
      setMetric2Label('Latency');
      setMetric2Value('12ms');
      setStars('320');
      setYear('2025');
      setFeatured(false);
    }
    setError(null);
  }, [projectToEdit, isOpen]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required.');
      return;
    }

    setSaving(true);
    setError(null);

    const payload = {
      title,
      tagline: tagline || title,
      category,
      description,
      fullStory: fullStory || description,
      techStack: techStackInput.split(',').map(s => s.trim()).filter(Boolean),
      imageUrl,
      metrics: [
        { label: metric1Label, value: metric1Value },
        { label: metric2Label, value: metric2Value }
      ],
      stars: parseInt(stars, 10) || 0,
      year: year || '2025',
      featured,
      architecture: {
        frontend: 'React 19 + TypeScript',
        backend: 'Node.js + Express REST API',
        database: 'PostgreSQL Relational Storage',
        deployment: 'Cloud Run / Vercel'
      },
      keyDecisions: [
        'Relational schema modeling for strict ACID transactions',
        'Persistent storage synchronization with Express backend'
      ]
    };

    try {
      const url = projectToEdit ? `/api/projects/${projectToEdit.id}` : '/api/projects';
      const method = projectToEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to save project');
      }

      onSaved();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!projectToEdit) return;
    if (!window.confirm(`Are you sure you want to delete "${projectToEdit.title}" from the database?`)) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/projects/${projectToEdit.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      onSaved();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh] text-neutral-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-neutral-900 border-b border-neutral-800">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              {projectToEdit ? 'Edit Project in Database' : 'Add New Project (Live Full-Stack CRUD)'}
            </h3>
            <p className="text-xs text-neutral-400">
              Saves directly to backend PostgreSQL / persistent store
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
          {error && (
            <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-900/60 text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-neutral-300 font-medium">Project Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Nexus Distributed KV Store"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white focus:outline-none focus:ring-1 focus:ring-neutral-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-300 font-medium">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white focus:outline-none"
              >
                <option value="Full-Stack">Full-Stack</option>
                <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                <option value="Developer Tools">Developer Tools</option>
                <option value="FinTech / Real-time">FinTech / Real-time</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-neutral-300 font-medium">Tagline / Short Summary</label>
            <input
              type="text"
              value={tagline}
              onChange={e => setTagline(e.target.value)}
              placeholder="e.g. Low-latency distributed cache with raft consensus"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white focus:outline-none focus:ring-1 focus:ring-neutral-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-neutral-300 font-medium">Full Description</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Detail the technical architecture and capabilities..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white focus:outline-none focus:ring-1 focus:ring-neutral-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-neutral-300 font-medium">Tech Stack (comma separated)</label>
            <input
              type="text"
              value={techStackInput}
              onChange={e => setTechStackInput(e.target.value)}
              placeholder="React, Express, PostgreSQL, Docker, Redis"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white focus:outline-none focus:ring-1 focus:ring-neutral-400"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="space-y-1">
              <label className="text-neutral-400">Metric 1 Label</label>
              <input
                type="text"
                value={metric1Label}
                onChange={e => setMetric1Label(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-neutral-400">Metric 1 Value</label>
              <input
                type="text"
                value={metric1Value}
                onChange={e => setMetric1Value(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-neutral-400">Stars</label>
              <input
                type="number"
                value={stars}
                onChange={e => setStars(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-neutral-400">Year</label>
              <input
                type="text"
                value={year}
                onChange={e => setYear(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white font-mono"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="featuredCheck"
              checked={featured}
              onChange={e => setFeatured(e.target.checked)}
              className="rounded bg-neutral-950 border-neutral-800 text-white"
            />
            <label htmlFor="featuredCheck" className="text-neutral-300">
              Highlight as featured showcase card
            </label>
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex items-center justify-between border-t border-neutral-800">
            {projectToEdit ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={saving}
                className="px-3.5 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-950/30 border border-rose-900/50 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Project</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-white hover:bg-neutral-200 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saving ? 'Saving to DB...' : 'Save to Database'}</span>
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
