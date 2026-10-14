import React from 'react';
import { Experience } from '../types/portfolio.ts';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

interface ExperienceSectionProps {
  experience: Experience[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience }) => {
  return (
    <section id="experience" className="py-20 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3 pb-6 border-b border-neutral-900">
          <div className="text-xs font-semibold tracking-wider uppercase text-neutral-400">
            03. Career Track Record
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Engineering Roles & Milestones
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
            A history of shipping resilient systems, leading architectural initiatives, and mentoring engineering teams.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {experience.map((exp, idx) => (
            <div
              key={exp.id}
              className="p-6 sm:p-8 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 hover:bg-neutral-900/60 transition-colors space-y-6"
            >
              {/* Role & Company Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-xs font-mono text-neutral-400">
                    0{idx + 1}. {exp.type}
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {exp.role}
                  </h3>
                  <div className="text-sm font-semibold text-neutral-300">
                    {exp.company}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{exp.period}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{exp.location}</span>
                  </span>
                </div>
              </div>

              {/* Role Scope Description */}
              <p className="text-sm text-neutral-300 leading-relaxed max-w-3xl">
                {exp.description}
              </p>

              {/* Concrete Quantitative Achievements */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-neutral-400">
                  Key Quantitative Impacts
                </div>
                <ul className="space-y-2.5">
                  {exp.achievements.map((ach, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      <span className="font-mono text-emerald-400 font-bold shrink-0 pt-0.5">→</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Applied */}
              <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs font-mono text-neutral-400">
                <span className="text-neutral-500 mr-2 text-[11px]">Stack:</span>
                {exp.techStack.map(t => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-300 text-[11px]"
                  >
                    {t}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
