import React, { useState } from 'react';
import { Skill } from '../types/portfolio.ts';
import { Database, Server, Cpu, Cloud, Terminal, CheckCircle2 } from 'lucide-react';

interface SkillsSectionProps {
  skills: Skill[];
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Backend & API': <Server className="w-4 h-4 text-emerald-400" />,
  'Databases & Storage': <Database className="w-4 h-4 text-amber-400" />,
  'Frontend': <Cpu className="w-4 h-4 text-sky-400" />,
  'DevOps & Cloud': <Cloud className="w-4 h-4 text-purple-400" />,
  'Systems & Core': <Terminal className="w-4 h-4 text-rose-400" />
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Backend & API', 'Databases & Storage', 'Frontend', 'DevOps & Cloud', 'Systems & Core'];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  return (
    <section id="stack" className="py-20 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-900">
          <div className="space-y-3">
            <div className="text-xs font-semibold tracking-wider uppercase text-neutral-400">
              02. Technical Competencies & Systems
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Architecture & Stack Matrix
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
              Engineered across production microservices, high-traffic data stores, and responsive interfaces.
              Evaluated with real-world production hours and architectural depth.
            </p>
          </div>

          {/* Category Filter Controls */}
          <div className="flex items-center gap-1 p-1 bg-neutral-900/80 border border-neutral-800 rounded-lg overflow-x-auto max-w-full">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map(skill => (
            <div
              key={skill.id}
              className="p-5 rounded-xl border border-neutral-800/90 bg-neutral-900/40 hover:bg-neutral-900/70 hover:border-neutral-700 transition-all duration-200 space-y-4"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {CATEGORY_ICONS[skill.category]}
                    <span className="text-xs text-neutral-400 font-mono">{skill.category}</span>
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {skill.name}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-white tabular-nums">
                    {skill.years}
                  </span>
                  <div className="text-[11px] text-neutral-400 font-mono">
                    {skill.level}
                  </div>
                </div>
              </div>

              {/* Proficiency Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>Proficiency</span>
                  <span className="text-neutral-200 tabular-nums">{skill.proficiency}%</span>
                </div>
                <div className="w-full bg-neutral-950 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-white h-full rounded-full transition-all duration-500"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>

              {/* Concrete Architectural Highlight */}
              <p className="text-xs text-neutral-300 leading-relaxed font-mono">
                {skill.highlight}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
