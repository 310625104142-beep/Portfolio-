import React, { useState } from 'react';
import { X, Server, Cloud, Terminal, CheckCircle2, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';

interface DeploymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentGuideModal: React.FC<DeploymentGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  const [platform, setPlatform] = useState<'vercel' | 'render' | 'heroku' | 'docker'>('render');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyText = (txt: string, label: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedSection(label);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const DOCKERFILE_CODE = `# Production Multi-Stage Dockerfile for Full-Stack Node.js Portfolio
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/data ./data
COPY --from=builder /app/src/server ./src/server
COPY --from=builder /app/src/types ./src/types
COPY --from=builder /app/src/data ./src/data
COPY --from=builder /app/server.ts ./server.ts

EXPOSE 3000
CMD ["npx", "tsx", "server.ts"]`;

  const RENDER_YAML = `services:
  - type: web
    name: elena-vance-portfolio
    env: node
    plan: free
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 3000
databases:
  - name: portfolio-db
    databaseName: portfolio
    user: postgres
    plan: free`;

  const VERCEL_JSON = `{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/server.ts" },
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}`;

  const HEROKU_PROCFILE = `web: npx tsx server.ts`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh] text-neutral-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-neutral-900/95 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-neutral-800 text-sky-400">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Full-Stack Architecture & Cloud Deployment Blueprint
              </h3>
              <p className="text-xs text-neutral-400">
                How Frontend, Express Backend & Relational Database communicate and deploy live
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Architecture Pipeline Explanation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              1. Full-Stack Data & Request Lifecycle
            </h4>
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 text-xs leading-relaxed text-neutral-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 space-y-1">
                  <div className="font-bold text-sky-400">1. Client Tier (React 19)</div>
                  <p className="text-[11px] text-neutral-400">
                    Vite bundles client assets. Client makes REST calls (`/api/projects`, `/api/messages`, `/api/db/query`).
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 space-y-1">
                  <div className="font-bold text-emerald-400">2. Backend Tier (Express)</div>
                  <p className="text-[11px] text-neutral-400">
                    In dev, mounts Vite middlewares. In prod, serves static `/dist` and handles API routes with CORS & validation.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 space-y-1">
                  <div className="font-bold text-amber-400">3. Database Tier (PostgreSQL)</div>
                  <p className="text-[11px] text-neutral-400">
                    Stores projects, skills, and recruiter messages with relational schemas and persistent file synchronization.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hosting Platform Blueprints */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                2. Target Hosting Platform Recipes
              </h4>
              <div className="flex items-center gap-1 p-0.5 bg-neutral-950 border border-neutral-800 rounded-lg">
                {(['render', 'heroku', 'vercel', 'docker'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors capitalize ${
                      platform === p ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {platform === 'render' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>Deploy to Render (Web Service + Managed PostgreSQL)</span>
                  <button
                    onClick={() => copyText(RENDER_YAML, 'render')}
                    className="text-neutral-300 hover:text-white flex items-center gap-1 font-mono"
                  >
                    {copiedSection === 'render' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSection === 'render' ? 'Copied' : 'Copy render.yaml'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto">
                  {RENDER_YAML}
                </pre>
                <p className="text-xs text-neutral-400">
                  Render automatically detects the build command, builds the Vite frontend into <code className="text-white">dist/</code>, and launches <code className="text-white">server.ts</code> on port 3000.
                </p>
              </div>
            )}

            {platform === 'heroku' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>Deploy to Heroku (Procfile + Heroku Postgres)</span>
                  <button
                    onClick={() => copyText(HEROKU_PROCFILE, 'heroku')}
                    className="text-neutral-300 hover:text-white flex items-center gap-1 font-mono"
                  >
                    {copiedSection === 'heroku' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSection === 'heroku' ? 'Copied' : 'Copy Procfile'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto">
                  {HEROKU_PROCFILE}
                </pre>
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-400 space-y-1">
                  <div>$ heroku create elena-vance-portfolio</div>
                  <div>$ heroku addons:create heroku-postgresql:essential-0</div>
                  <div>$ git push heroku main</div>
                </div>
              </div>
            )}

            {platform === 'vercel' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>Deploy to Vercel (vercel.json Serverless Configuration)</span>
                  <button
                    onClick={() => copyText(VERCEL_JSON, 'vercel')}
                    className="text-neutral-300 hover:text-white flex items-center gap-1 font-mono"
                  >
                    {copiedSection === 'vercel' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSection === 'vercel' ? 'Copied' : 'Copy vercel.json'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto">
                  {VERCEL_JSON}
                </pre>
              </div>
            )}

            {platform === 'docker' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>Dockerfile (Cloud Run / AWS ECS / Any Container Host)</span>
                  <button
                    onClick={() => copyText(DOCKERFILE_CODE, 'docker')}
                    className="text-neutral-300 hover:text-white flex items-center gap-1 font-mono"
                  >
                    {copiedSection === 'docker' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSection === 'docker' ? 'Copied' : 'Copy Dockerfile'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto max-h-64">
                  {DOCKERFILE_CODE}
                </pre>
              </div>
            )}
          </div>

          {/* Environment Variables Checklist */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              3. Required Environment Variables
            </h4>
            <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono space-y-1.5 text-neutral-300">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold">PORT=3000</span>
                <span className="text-neutral-500">Port where Node.js/Express listens</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white font-bold">NODE_ENV=production</span>
                <span className="text-neutral-500">Instructs server to serve static dist/ bundle</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white font-bold">DATABASE_URL=postgres://...</span>
                <span className="text-neutral-500">Managed PostgreSQL connection string</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between">
          <span className="text-[11px] text-neutral-400">
            Validated for Heroku, Netlify, Render & Vercel
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
          >
            Close Blueprint
          </button>
        </div>

      </div>
    </div>
  );
};
