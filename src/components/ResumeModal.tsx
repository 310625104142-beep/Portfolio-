import React from 'react';
import { X, Printer, Download, Mail, MapPin, Globe, Github } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white text-neutral-900 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* Top Action Bar (hidden in print) */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-neutral-100 border-b border-neutral-200 print:hidden">
          <div className="text-xs font-semibold text-neutral-600">
            Curriculum Vitae · Elena Vance
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="p-8 sm:p-12 space-y-8 overflow-y-auto flex-1 font-sans text-neutral-800 text-sm leading-relaxed">
          
          {/* Header */}
          <div className="border-b border-neutral-200 pb-6 space-y-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-950">
              Elena Vance
            </h1>
            <div className="text-base font-semibold text-neutral-600">
              Staff Full-Stack Engineer & Database Architect
            </div>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-neutral-500 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>San Francisco, CA</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                <span>elena.vance.systems@gmail.com</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Github className="w-3.5 h-3.5" />
                <span>github.com/elena-vance</span>
              </span>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1">
              Executive Summary
            </h2>
            <p className="text-xs leading-relaxed text-neutral-700">
              Staff Software Engineer with 8+ years architecting enterprise distributed microservices, low-latency relational
              databases (PostgreSQL, MySQL), and performant web applications with React 19 and Node.js. Proven track record
              guaranteeing 99.99% database uptime across multi-region clusters, decreasing compute infrastructure costs by 34%,
              and delivering deterministic double-entry financial ledgers handling $42M+ daily volume.
            </p>
          </div>

          {/* Core Competencies */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1">
              Technical Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <strong className="text-neutral-900">Languages & Runtime:</strong> TypeScript, JavaScript (ES2024), Node.js, Express, Python, SQL
              </div>
              <div>
                <strong className="text-neutral-900">Databases & Storage:</strong> PostgreSQL (ACID, BRIN, GIN, Partitioning), MySQL, Redis, MongoDB
              </div>
              <div>
                <strong className="text-neutral-900">Frontend & Web APIs:</strong> React 19, Next.js, Tailwind CSS, WebSockets, HTML5 Canvas, Web Workers
              </div>
              <div>
                <strong className="text-neutral-900">DevOps & Cloud:</strong> Docker, Kubernetes, GitHub Actions CI/CD, AWS (ECS, RDS, S3), Vercel, Render
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1">
              Professional Experience
            </h2>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-semibold text-xs text-neutral-900">
                  <span>Staff Full-Stack Engineer & Architect · CloudScale Systems</span>
                  <span className="font-mono text-neutral-500">2023 – Present</span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-neutral-700">
                  <li>Architected distributed telemetry ingestion service in Node.js & PostgreSQL processing 15M+ requests/day with sub-30ms p95 latency.</li>
                  <li>Reduced cloud compute costs by 34% by refactoring N+1 queries, partitioning timeseries tables, and deploying Redis clusters.</li>
                  <li>Mentored 12 mid-level and junior engineers in database indexing strategies and strict TypeScript architectural patterns.</li>
                </ul>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-semibold text-xs text-neutral-900">
                  <span>Senior Full-Stack Engineer · FinTech Labs Global</span>
                  <span className="font-mono text-neutral-500">2021 – 2023</span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-neutral-700">
                  <li>Built double-entry accounting engine in PostgreSQL with strict SERIALIZABLE isolation levels, passing SOC-2 audits with zero defects.</li>
                  <li>Migrated legacy web client to modern React 19 with real-time WebSocket feeds, increasing frame render rates from 24 FPS to 60 FPS.</li>
                  <li>Decreased deployment failure rate by 80% with automated GitHub Actions CI/CD test suites.</li>
                </ul>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-semibold text-xs text-neutral-900">
                  <span>Software Engineer · DevCraft Digital Solutions</span>
                  <span className="font-mono text-neutral-500">2018 – 2021</span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-neutral-700">
                  <li>Delivered 14 full-stack client applications from inception to cloud production deployment on Heroku, AWS, and Vercel.</li>
                  <li>Implemented payment gateways (Stripe, Plaid) and secured authentication workflows with OAuth 2.0 and JWT.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1">
              Education & Certifications
            </h2>
            <div className="flex items-center justify-between text-xs text-neutral-700">
              <div>
                <strong className="text-neutral-900">B.S. in Computer Science</strong> · University of California, Berkeley
              </div>
              <div className="font-mono text-neutral-500">Graduated Magna Cum Laude</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
