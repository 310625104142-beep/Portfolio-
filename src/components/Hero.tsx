import React from 'react';
import { Database, ArrowDown, FileText, CheckCircle2, Server, Terminal, Github, ExternalLink } from 'lucide-react';

interface HeroProps {
  onOpenDbExplorer: () => void;
  onOpenResume: () => void;
  onOpenDeploymentGuide: () => void;
  serverOnline: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenDbExplorer,
  onOpenResume,
  onOpenDeploymentGuide,
  serverOnline
}) => {
  return (
    <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Split: Typographic hierarchy on left, large visual container on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          
          {/* Left Column (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Kicker & Identity */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/src/assets/images/avatar_engineer_portrait_1791962976806.jpg"
                  alt="Elena Vance"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-neutral-800"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h2 className="text-sm font-semibold text-white tracking-wide">
                    Elena Vance
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Staff Full-Stack Engineer & Database Architect
                  </p>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight">
                Architecting resilient full-stack systems from schema to production.
              </h1>

              {/* Lead Copy */}
              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
                Specialized in high-concurrency Node.js microservices, low-latency PostgreSQL
                data modeling, and performant React web interfaces. Every project here runs on a live,
                queryable Express backend with persistent storage and observable architectural metrics.
              </p>
            </div>

            {/* Live Stack Highlights (Unboxed text with separators) */}
            <div className="text-xs font-mono text-neutral-400 flex flex-wrap items-center gap-y-1 gap-x-2">
              <span className="text-neutral-200">TypeScript</span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-200">React 19</span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-200">Express / Node.js</span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-200">PostgreSQL</span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-200">Docker</span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-200">CI/CD Automation</span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-neutral-950 bg-white hover:bg-neutral-200 rounded-lg transition-colors whitespace-nowrap shadow-sm"
              >
                <span>Explore Selected Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenDbExplorer}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-neutral-200 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors whitespace-nowrap"
              >
                <Database className="w-4 h-4 text-emerald-400" />
                <span>Inspect Live DB & Run SQL</span>
              </button>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-neutral-300 hover:text-white bg-transparent hover:bg-neutral-900/60 border border-neutral-800 rounded-lg transition-colors whitespace-nowrap"
              >
                <FileText className="w-4 h-4 text-neutral-400" />
                <span>View Resume</span>
              </button>
            </div>

            {/* Quick Links & GitHub */}
            <div className="pt-2 flex items-center gap-5 text-xs text-neutral-400">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>github.com/elena-vance</span>
              </a>
              <span aria-hidden="true">·</span>
              <button
                onClick={onOpenDeploymentGuide}
                className="inline-flex items-center gap-1.5 hover:text-sky-400 transition-colors"
              >
                <Server className="w-3.5 h-3.5 text-sky-400" />
                <span>Architecture Blueprint & Deploy Specs</span>
              </button>
            </div>

          </div>

          {/* Right Column (col-span-5): Large matching-height visual container */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative h-full min-h-[380px] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/50 group">
              
              {/* High-fidelity workspace image */}
              <img
                src="/src/assets/images/hero_developer_workspace_1791962975502.jpg"
                alt="Engineering workspace and production architecture monitors"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Scrim overlay for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent pointer-events-none" />

              {/* Interactive bottom card overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-neutral-950/90 backdrop-blur-md border border-neutral-800 text-xs space-y-2.5">
                <div className="flex items-center justify-between text-neutral-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-neutral-300" />
                    <span className="font-mono text-neutral-200 font-medium">Full-Stack Live Runtime</span>
                  </div>
                  <span className="font-mono tabular-nums text-emerald-400">
                    {serverOnline ? 'Connected (Port 3000)' : 'Connecting...'}
                  </span>
                </div>

                <div className="font-mono text-[11px] text-neutral-400 leading-relaxed bg-neutral-900/90 rounded p-2 border border-neutral-800/80">
                  <span className="text-neutral-500">$</span> GET /api/db/stats HTTP/1.1<br />
                  <span className="text-neutral-500">&gt;</span> PostgreSQL / JSON Engine: <span className="text-white">Active</span><br />
                  <span className="text-neutral-500">&gt;</span> Seed Tables: <span className="text-white">projects, skills, messages</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-neutral-400 text-[11px]">Production ready & open to opportunities</span>
                  <button
                    onClick={onOpenDbExplorer}
                    className="text-neutral-200 hover:text-white font-medium text-[11px] underline underline-offset-2 flex items-center gap-1"
                  >
                    <span>Open API Sandbox</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Full-Width Quantitative Proof Strip Below the Split */}
        <div className="mt-12 pt-8 border-t border-neutral-900 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono tabular-nums">
              8+ Years
            </div>
            <div className="text-xs text-neutral-400">
              Full-Stack & Systems Engineering
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono tabular-nums">
              42+ Deploys
            </div>
            <div className="text-xs text-neutral-400">
              Zero-Downtime Production Launches
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono tabular-nums">
              99.99% SLA
            </div>
            <div className="text-xs text-neutral-400">
              Database Invariant & ACID Guarantee
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono tabular-nums">
              1.4M+ Daily
            </div>
            <div className="text-xs text-neutral-400">
              Concurrent Events & API Invocations
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
