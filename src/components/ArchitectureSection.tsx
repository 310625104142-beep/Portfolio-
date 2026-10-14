import React from 'react';
import { Database, Server, Cpu, ShieldCheck, Zap, HardDrive, ArrowRight } from 'lucide-react';

interface ArchitectureSectionProps {
  onOpenDbExplorer: () => void;
  onOpenDeploymentGuide: () => void;
}

export const ArchitectureSection: React.FC<ArchitectureSectionProps> = ({
  onOpenDbExplorer,
  onOpenDeploymentGuide
}) => {
  return (
    <section id="architecture" className="py-20 border-b border-neutral-900 bg-neutral-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-900">
          <div className="space-y-3">
            <div className="text-xs font-semibold tracking-wider uppercase text-neutral-400">
              03. Architectural Blueprint & Data Pipeline
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              System Topography & Relational Schema
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
              How this portfolio application is engineered: seamless client-server handshake,
              parameterized query validation, persistent disk journaling, and zero-loss ACID guarantees.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenDbExplorer}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-950 bg-white hover:bg-neutral-200 rounded-lg transition-colors whitespace-nowrap shadow-sm"
            >
              <Database className="w-3.5 h-3.5 text-neutral-900" />
              <span>Launch Live SQL Runner</span>
            </button>
          </div>
        </div>

        {/* 3-Tier Architectural Diagram Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Tier 1: Client */}
          <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sky-950 text-sky-400 border border-sky-900/50">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">1. Client Tier (React 19)</h3>
                <span className="text-[11px] text-neutral-400 font-mono">Vite SPA · Tailwind CSS v4</span>
              </div>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Zero-pill typographic layout with sub-200ms interaction feedback, client-side filtering,
              and live WebSocket telemetry subscribers. Emits optimistic UI mutations with rollback reconciliation.
            </p>
            <div className="pt-2 border-t border-neutral-800 text-[11px] font-mono text-neutral-400 space-y-1">
              <div>→ Strict accessibility (WCAG AA)</div>
              <div>→ Zero layout shift (`text-wrap: balance`)</div>
            </div>
          </div>

          {/* Tier 2: Server */}
          <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-900/50">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">2. Backend Gateway (Node.js)</h3>
                <span className="text-[11px] text-neutral-400 font-mono">Express REST API · tsx runtime</span>
              </div>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Processes REST endpoints (`/api/projects`, `/api/messages`, `/api/db/query`), sanitizes payloads,
              manages schema validation, and mounts Vite middlewares in dev or serves static bundles in production.
            </p>
            <div className="pt-2 border-t border-neutral-800 text-[11px] font-mono text-neutral-400 space-y-1">
              <div>→ Rate limiting & payload validation</div>
              <div>→ Live SQL query AST execution engine</div>
            </div>
          </div>

          {/* Tier 3: Database */}
          <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-950 text-amber-400 border border-amber-900/50">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">3. Persistent Relational Store</h3>
                <span className="text-[11px] text-neutral-400 font-mono">PostgreSQL DDL · Disk Sync</span>
              </div>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Normalized schema with index optimization (`projects`, `skills`, `experience`, `contact_messages`).
              Disk persistence ensures all project modifications and contact submissions persist across restarts.
            </p>
            <div className="pt-2 border-t border-neutral-800 text-[11px] font-mono text-neutral-400 space-y-1">
              <div>→ ACID transaction invariants</div>
              <div>→ Real-time schema introspection</div>
            </div>
          </div>

        </div>

        {/* Live Topography Flow Box */}
        <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-950 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-300 font-bold">
              <HardDrive className="w-4 h-4 text-emerald-400" />
              <span>Full-Stack Request Lifecycle</span>
            </div>
            <button
              onClick={onOpenDeploymentGuide}
              className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-mono"
            >
              <span>View Cloud Hosting Guide (Vercel, Render, Heroku)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="font-mono text-xs text-neutral-300 bg-neutral-900/80 p-4 rounded-xl border border-neutral-800/80 overflow-x-auto leading-relaxed">
            <pre>{`Browser (Client) ──[HTTP POST /api/messages]──> Express Router (server.ts)
                                                      │
                                           [Input Validation & Sanitization]
                                                      │
                                                      ├──> Append to /data/portfolio-db.json (fs atomic write)
                                                      │
                                                      └──> Return 201 Created { id: "msg-...", status: "persisted" }`}</pre>
          </div>
        </div>

      </div>
    </section>
  );
};
