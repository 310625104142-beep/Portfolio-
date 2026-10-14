import React from 'react';
import { Database, Terminal, Sun, Moon, Sparkles, BookOpen } from 'lucide-react';

interface HeaderProps {
  onOpenDbExplorer: () => void;
  onOpenDeploymentGuide: () => void;
  onOpenResume: () => void;
  theme: 'dark' | 'light' | 'terminal';
  setTheme: (theme: 'dark' | 'light' | 'terminal') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDbExplorer,
  onOpenDeploymentGuide,
  onOpenResume,
  theme,
  setTheme
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-200 border-neutral-800/80 bg-neutral-950/85">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity"
        >
          Elena Vance
          <span className="text-xs font-normal text-neutral-400 ml-2 hidden sm:inline">
            · Full-Stack Systems
          </span>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <a
            href="#projects"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Work
          </a>
          <a
            href="#stack"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Stack & Skills
          </a>
          <a
            href="#architecture"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Architecture
          </a>
          <a
            href="#experience"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Experience
          </a>
          <a
            href="#contact"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Architecture / Deployment blueprint button */}
          <button
            onClick={onOpenDeploymentGuide}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
            title="View Full-Stack Deployment Architecture"
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            <span>Deploy Guide</span>
          </button>

          {/* Primary Action Button: Live DB & API Console */}
          <button
            onClick={onOpenDbExplorer}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-neutral-950 bg-white hover:bg-neutral-200 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <Database className="w-3.5 h-3.5 text-neutral-900" />
            <span>Database & API</span>
          </button>

          {/* Theme selector */}
          <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-0.5">
            <button
              onClick={() => setTheme('dark')}
              className={`p-1.5 rounded-md transition-colors ${
                theme === 'dark' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'
              }`}
              title="Obsidian Dark Theme"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('light')}
              className={`p-1.5 rounded-md transition-colors ${
                theme === 'light' ? 'bg-neutral-800 text-amber-300' : 'text-neutral-400 hover:text-neutral-200'
              }`}
              title="Clean Light Theme"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('terminal')}
              className={`p-1.5 rounded-md transition-colors ${
                theme === 'terminal' ? 'bg-neutral-800 text-emerald-400' : 'text-neutral-400 hover:text-neutral-200'
              }`}
              title="Retro Terminal Theme"
            >
              <Terminal className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};
