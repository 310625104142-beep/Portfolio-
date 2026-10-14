import React, { useState } from 'react';
import { Project } from '../types/portfolio.ts';
import { ExternalLink, Github, Play, Layers, Star, Plus, Search, Sparkles } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  loading: boolean;
  onSelectProject: (project: Project) => void;
  onLaunchDemo: (project: Project) => void;
  onAddNewProject: () => void;
  onEditProject: (project: Project) => void;
}

const CATEGORIES = ['All', 'Full-Stack', 'Cloud Infrastructure', 'Developer Tools', 'FinTech / Real-time'] as const;

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  loading,
  onSelectProject,
  onLaunchDemo,
  onAddNewProject,
  onEditProject
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = projects.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <section id="projects" className="py-20 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-900">
          <div className="space-y-3">
            <div className="text-xs font-semibold tracking-wider uppercase text-neutral-400">
              01. Selected Works & Systems
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Full-Stack Engineering & Microservices
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
              Production architectures engineered with strict relational consistency, high-throughput APIs,
              and observable distributed runtimes. Click any project to inspect its architecture diagram and technical tradeoffs.
            </p>
          </div>

          {/* Quick Action: Add Project to Database */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onAddNewProject}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors whitespace-nowrap shadow-sm"
              title="Add a new project record to the live database"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>Add Project (Live DB CRUD)</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar: Category Segmented Control & Search Input */}
        <div className="pt-6 pb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-900/80 border border-neutral-800/90 rounded-lg overflow-x-auto max-w-full">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === category
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] sm:w-72">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search stack, title, or topic..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs rounded-lg pl-9 pr-3 py-2 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 transition"
            />
          </div>

        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 text-center text-sm font-mono text-neutral-500">
            Connecting to PostgreSQL / Express backend...
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProjects.length === 0 && (
          <div className="py-16 text-center rounded-2xl border border-neutral-900 bg-neutral-950/40 p-8 space-y-3">
            <p className="text-sm text-neutral-400">
              No projects matched your criteria.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="text-xs font-medium text-white underline underline-offset-4"
            >
              Clear filters and show all projects
            </button>
          </div>
        )}

        {/* Projects Bento Grid */}
        {!loading && filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => {
              const isLarge = project.featured && (idx === 0 || idx === 1);

              return (
                <div
                  key={project.id}
                  className={`group rounded-2xl border border-neutral-800/90 bg-neutral-900/40 hover:bg-neutral-900/70 hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                    isLarge ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                  }`}
                >
                  {/* Card Media Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-neutral-950 border-b border-neutral-800/80">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        // Styled fallback container on error
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.classList.add('flex', 'items-center', 'justify-center', 'bg-neutral-900');
                          parent.innerHTML = `<div class="p-6 text-center text-neutral-400 text-xs font-mono">${project.title}</div>`;
                        }
                      }}
                    />

                    {/* Scrim Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none" />

                    {/* Top overlay unboxed metadata */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
                      <div className="flex items-center gap-2 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-neutral-800/80">
                        <span className="font-semibold">{project.category}</span>
                        <span aria-hidden="true" className="text-neutral-500">·</span>
                        <span className="font-mono tabular-nums text-neutral-400">{project.year}</span>
                      </div>

                      <div className="flex items-center gap-1.5 bg-neutral-950/80 backdrop-blur-md px-2 py-1 rounded-md border border-neutral-800/80 font-mono tabular-nums text-neutral-300">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span>{project.stars}</span>
                      </div>
                    </div>

                    {/* Quick Demo Overlay Launch Button */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onLaunchDemo(project);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-950 bg-white hover:bg-neutral-100 rounded-lg shadow-lg transition-transform active:scale-95"
                      >
                        <Play className="w-3 h-3 fill-neutral-950" />
                        <span>Interactive Demo</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-2.5">
                      {/* Quiet 1-line kicker (No pill sandwich) */}
                      <div className="text-xs font-mono text-neutral-400">
                        {project.architecture.backend} + {project.architecture.database.split(' ')[0]}
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => onSelectProject(project)}
                        className="text-lg font-bold text-white group-hover:text-neutral-100 cursor-pointer hover:underline underline-offset-4 tracking-tight"
                      >
                        {project.title}
                      </h3>

                      {/* Tagline / Description */}
                      <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Quantitative Key Metrics */}
                    <div className="grid grid-cols-3 gap-2 py-2 border-y border-neutral-800/80 font-mono">
                      {project.metrics.slice(0, 3).map((m, i) => (
                        <div key={i} className="text-left">
                          <div className="text-[11px] text-neutral-500 truncate">{m.label}</div>
                          <div className="text-xs font-bold text-white tabular-nums truncate">{m.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Unboxed Metadata List */}
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-400 font-mono">
                      {project.techStack.map((tech, i) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-neutral-950/80 border border-neutral-800/80 text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Card Actions Footer */}
                    <div className="pt-2 flex items-center justify-between gap-3 text-xs">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-neutral-300 transition-colors"
                      >
                        <Layers className="w-3.5 h-3.5 text-sky-400" />
                        <span>Case Study & Architecture</span>
                      </button>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onEditProject(project)}
                          className="text-neutral-400 hover:text-white transition-colors text-xs"
                          title="Edit this project in the live database"
                        >
                          Edit DB
                        </button>

                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-neutral-400 hover:text-white transition-colors"
                            title="View Source on GitHub"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}

                        <button
                          onClick={() => onLaunchDemo(project)}
                          className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                        >
                          <Play className="w-3 h-3 fill-emerald-400" />
                          <span>Simulate</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
