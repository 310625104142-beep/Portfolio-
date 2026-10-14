import React, { useEffect, useState } from 'react';
import { Project } from '../types/portfolio.ts';
import { X, ExternalLink, Github, Play, Database, Server, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onLaunchDemo: (project: Project) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onLaunchDemo
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'tradeoffs' | 'raw_db'>('architecture');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-y-auto flex flex-col my-auto text-neutral-100">
        
        {/* Top Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-neutral-400">
              {project.category}
            </span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-xs font-mono tabular-nums text-neutral-400">
              Year {project.year}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onLaunchDemo(project)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-950 bg-white hover:bg-neutral-200 rounded-lg transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-neutral-950" />
              <span>Launch Simulator</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Hero Banner & Title */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-base text-neutral-300 leading-relaxed">
              {project.tagline}
            </p>

            {/* Media Banner with fallbacks */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Key Production Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-xs text-neutral-400">{m.label}</div>
                <div className="text-xl font-bold font-mono text-white tabular-nums">{m.value}</div>
              </div>
            ))}
          </div>

          {/* Navigation Tabs for Deep Dive */}
          <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'architecture'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              System Architecture & Flow
            </button>
            <button
              onClick={() => setActiveTab('tradeoffs')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'tradeoffs'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Engineering Tradeoffs & Invariants
            </button>
            <button
              onClick={() => setActiveTab('raw_db')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'raw_db'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Live Database Record (JSON)
            </button>
          </div>

          {/* Tab 1: Architecture Breakdown */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-base font-bold text-white">The Engineering Problem</h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {project.fullStory}
                </p>
              </div>

              {/* 4 Tier Architecture Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
                    <Cpu className="w-4 h-4 text-sky-400" />
                    <span>Client / Frontend Tier</span>
                  </div>
                  <div className="text-sm text-neutral-200 font-medium">
                    {project.architecture.frontend}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
                    <Server className="w-4 h-4 text-emerald-400" />
                    <span>API & Application Gateway</span>
                  </div>
                  <div className="text-sm text-neutral-200 font-medium">
                    {project.architecture.backend}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
                    <Database className="w-4 h-4 text-amber-400" />
                    <span>Relational Database & Storage</span>
                  </div>
                  <div className="text-sm text-neutral-200 font-medium">
                    {project.architecture.database}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    <span>Deployment & CI/CD Pipeline</span>
                  </div>
                  <div className="text-sm text-neutral-200 font-medium">
                    {project.architecture.deployment}
                  </div>
                </div>
              </div>

              {/* ASCII / Monospace Flow Diagram */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-neutral-400">
                  Data Flow & Request Lifecycle
                </div>
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 leading-relaxed overflow-x-auto">
                  <pre>{`[ Client React 19 UI ] ──( HTTPS / WSS )──> [ Express Application Server ]
                                                    │
                                                    ├──> [ Redis Cache Layer ] (Sub-millisecond read hit)
                                                    │
                                                    └──> [ PostgreSQL Relational DB ]
                                                          ├── Read Replica (Analytics & queries)
                                                          └── Primary (Strict SERIALIZABLE ACID transactions)`}</pre>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Tradeoffs & Decisions */}
          {activeTab === 'tradeoffs' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">Key Architectural Tradeoffs</h3>
              <ul className="space-y-3">
                {project.keyDecisions.map((decision, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-neutral-300 leading-relaxed bg-neutral-950/60 p-3.5 rounded-xl border border-neutral-800">
                    <span className="font-mono text-xs text-emerald-400 shrink-0 font-bold pt-0.5">
                      0{i + 1}.
                    </span>
                    <span>{decision}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tab 3: Raw Database Representation */}
          {activeTab === 'raw_db' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Row from <code className="font-mono text-neutral-200">projects</code> table in live database</span>
                <span className="font-mono text-emerald-400">Status: PERSISTED</span>
              </div>
              <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-300 overflow-x-auto max-h-72">
                {JSON.stringify(project, null, 2)}
              </pre>
            </div>
          )}

          {/* Tech Stack List */}
          <div className="space-y-2 pt-2 border-t border-neutral-800">
            <div className="text-xs font-semibold text-neutral-400">Technology Stack</div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map(t => (
                <span key={t} className="px-2.5 py-1 text-xs font-mono text-neutral-200 bg-neutral-950 border border-neutral-800 rounded-md">
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white"
              >
                <Github className="w-4 h-4" />
                <span>Source Repository</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo URL</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
};
