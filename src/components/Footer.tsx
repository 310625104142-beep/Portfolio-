import React from 'react';
import { Database, Github, Linkedin, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenDbExplorer: () => void;
  onOpenDeploymentGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDbExplorer,
  onOpenDeploymentGuide
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-900 bg-neutral-950 py-12 text-xs text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-neutral-900">
          <div className="space-y-1.5">
            <div className="text-base font-bold text-white tracking-tight">
              Elena Vance
            </div>
            <p className="text-xs text-neutral-400">
              Staff Full-Stack Engineer & Database Architect · Distributed Systems & Low-Latency APIs
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-300">
            <a href="#projects" className="hover:text-white transition-colors">
              Projects
            </a>
            <a href="#stack" className="hover:text-white transition-colors">
              Stack & Skills
            </a>
            <button onClick={onOpenDbExplorer} className="hover:text-white transition-colors">
              Database Console
            </button>
            <button onClick={onOpenDeploymentGuide} className="hover:text-white transition-colors">
              Deploy Specs
            </button>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-neutral-400">
          <div>
            © {new Date().getFullYear()} Elena Vance. Built with React 19, Node.js Express & PostgreSQL/JSON engine.
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <span aria-hidden="true">·</span>
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors flex items-center gap-1"
              title="Scroll to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
