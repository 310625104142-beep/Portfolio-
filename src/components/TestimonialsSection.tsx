import React from 'react';
import { Testimonial } from '../types/portfolio.ts';
import { Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-20 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3 pb-6 border-b border-neutral-900">
          <div className="text-xs font-semibold tracking-wider uppercase text-neutral-400">
            04. Peer Recommendations & Leadership
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Engineering Peer Endorsements
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
            Reflections from engineering leaders, quantitative researchers, and architects who have collaborated on production systems.
          </p>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div
              key={t.id}
              className="p-6 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 hover:bg-neutral-900/60 transition-colors flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <Quote className="w-6 h-6 text-neutral-600" />
                <p className="text-sm text-neutral-300 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/80 space-y-1">
                <div className="text-sm font-bold text-white tracking-tight">
                  {t.name}
                </div>
                <div className="text-xs text-neutral-400">
                  {t.role} · <span className="text-neutral-300">{t.company}</span>
                </div>
                <div className="text-[11px] text-neutral-500 font-mono">
                  {t.relationship}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
