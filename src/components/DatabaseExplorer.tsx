import React, { useState, useEffect } from 'react';
import { Database, Play, RefreshCw, Terminal, Table, Code2, Check, Copy, AlertCircle, Sparkles, X } from 'lucide-react';
import { DatabaseStats, QueryResult } from '../types/portfolio.ts';

interface DatabaseExplorerProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged?: () => void;
}

const SAMPLE_QUERIES = [
  'SELECT title, category, stars, year FROM projects ORDER BY stars DESC;',
  "SELECT name, category, proficiency, level FROM skills WHERE category = 'Databases & Storage';",
  'SELECT name, email, subject, status FROM contact_messages;',
  'SHOW TABLES;',
  "SELECT title, category, full_story FROM projects WHERE category = 'Cloud Infrastructure';"
];

export const DatabaseExplorer: React.FC<DatabaseExplorerProps> = ({
  isOpen,
  onClose,
  onDataChanged
}) => {
  const [activeTab, setActiveTab] = useState<'sql' | 'schema' | 'stats' | 'api'>('sql');
  const [queryInput, setQueryInput] = useState<string>(SAMPLE_QUERIES[0]);
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [executing, setExecuting] = useState<boolean>(false);
  const [stats, setStats] = useState<DatabaseStats | null>(null);
  const [schemaDdl, setSchemaDdl] = useState<string>('');
  const [tablesList, setTablesList] = useState<Array<{ name: string; count: number; columns: string[] }>>([]);
  const [copied, setCopied] = useState(false);
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadStats();
      loadSchema();
      runQuery(queryInput);
    }
  }, [isOpen]);

  const loadStats = async () => {
    try {
      const res = await fetch('/api/db/stats');
      const data = await res.json();
      if (data.success) setStats(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  const loadSchema = async () => {
    try {
      const res = await fetch('/api/db/schema');
      const data = await res.json();
      if (data.success) {
        setSchemaDdl(data.data.ddl);
        setTablesList(data.data.tables);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const runQuery = async (sqlToRun: string = queryInput) => {
    setExecuting(true);
    try {
      const res = await fetch('/api/db/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: sqlToRun })
      });
      const data = await res.json();
      if (data.success) {
        setQueryResult(data.data);
      } else {
        setQueryResult({
          columns: [],
          rows: [],
          rowCount: 0,
          executionTimeMs: 0,
          query: sqlToRun,
          error: data.error || 'Query failed'
        });
      }
    } catch (err: any) {
      setQueryResult({
        columns: [],
        rows: [],
        rowCount: 0,
        executionTimeMs: 0,
        query: sqlToRun,
        error: err.message
      });
    } finally {
      setExecuting(false);
    }
  };

  const handleResetDb = async () => {
    if (!window.confirm('Reset database to initial canonical data? This will restore all default projects, skills, and messages.')) return;
    setResetting(true);
    try {
      await fetch('/api/db/reset', { method: 'POST' });
      await loadStats();
      await runQuery();
      if (onDataChanged) onDataChanged();
    } catch (e) {
      console.error(e);
    } finally {
      setResetting(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh] text-neutral-100">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-neutral-900/95 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-neutral-800 text-emerald-400">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Live Relational Database & API Console
              </h3>
              <p className="text-xs text-neutral-400">
                PostgreSQL schema model · Persistent JSON disk store · Real Express REST API
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetDb}
              disabled={resetting}
              className="px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-1.5"
              title="Reset database to seed records"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${resetting ? 'animate-spin' : ''}`} />
              <span>Reset to Seed Data</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Metrics Quick Strip */}
        {stats && (
          <div className="px-6 py-2.5 bg-neutral-950 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-4">
              <span>Projects: <strong className="text-white tabular-nums">{stats.projectsCount}</strong></span>
              <span>·</span>
              <span>Messages: <strong className="text-white tabular-nums">{stats.messagesCount}</strong></span>
              <span>·</span>
              <span>Skills: <strong className="text-white tabular-nums">{stats.skillsCount}</strong></span>
            </div>
            <div className="flex items-center gap-4">
              <span>DB Size: <strong className="text-emerald-400 tabular-nums">{stats.databaseSizeKb} KB</strong></span>
              <span>·</span>
              <span>Uptime: <strong className="text-white tabular-nums">{stats.uptimeSeconds}s</strong></span>
              <span>·</span>
              <span>Memory: <strong className="text-white tabular-nums">{stats.memoryUsageMb} MB</strong></span>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-neutral-800 bg-neutral-900">
          <button
            onClick={() => setActiveTab('sql')}
            className={`px-3 py-2 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'sql'
                ? 'border-white text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Interactive SQL Runner</span>
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3 py-2 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'schema'
                ? 'border-white text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Database Schema (PostgreSQL DDL)</span>
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`px-3 py-2 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'api'
                ? 'border-white text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>REST API Endpoints & cURL</span>
          </button>
        </div>

        {/* Tab 1: Interactive SQL Runner */}
        {activeTab === 'sql' && (
          <div className="p-6 space-y-4 overflow-y-auto flex-1">
            {/* Query Quick Templates */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                Quick Query Presets
              </div>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_QUERIES.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setQueryInput(q);
                      runQuery(q);
                    }}
                    className="px-2.5 py-1 text-[11px] font-mono text-neutral-300 hover:text-white bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-md transition-colors truncate max-w-xs"
                    title={q}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* SQL Input Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span className="font-mono">SQL Query (SELECT, SHOW TABLES)</span>
                <span className="text-[11px]">Read-only sandbox with real persistent store</span>
              </div>
              <div className="relative">
                <textarea
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  rows={3}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 font-mono text-xs text-emerald-300 focus:outline-none focus:ring-1 focus:ring-neutral-400 transition"
                  placeholder="SELECT * FROM projects..."
                />
                <button
                  onClick={() => runQuery()}
                  disabled={executing}
                  className="absolute bottom-3 right-3 px-3 py-1.5 text-xs font-semibold text-neutral-950 bg-white hover:bg-neutral-200 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-1.5 shadow"
                >
                  <Play className="w-3 h-3 fill-neutral-950" />
                  <span>{executing ? 'Executing...' : 'Run Query'}</span>
                </button>
              </div>
            </div>

            {/* Query Output View */}
            {queryResult && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <div className="flex items-center gap-3">
                    <span>Rows: <strong className="text-white tabular-nums">{queryResult.rowCount}</strong></span>
                    <span>·</span>
                    <span>Execution: <strong className="text-emerald-400 tabular-nums">{queryResult.executionTimeMs} ms</strong></span>
                  </div>
                  {queryResult.error && (
                    <span className="text-rose-400 flex items-center gap-1 text-[11px]">
                      <AlertCircle className="w-3 h-3" />
                      {queryResult.error}
                    </span>
                  )}
                </div>

                {queryResult.error ? (
                  <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/50 text-rose-300 text-xs font-mono">
                    {queryResult.error}
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950 max-h-72">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-neutral-900/80 text-neutral-300 border-b border-neutral-800 sticky top-0">
                        <tr>
                          {queryResult.columns.map(col => (
                            <th key={col} className="p-2.5 font-bold whitespace-nowrap">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-900">
                        {queryResult.rows.map((row, i) => (
                          <tr key={i} className="hover:bg-neutral-900/50 transition-colors">
                            {queryResult.columns.map(col => (
                              <td key={col} className="p-2.5 text-neutral-300 whitespace-nowrap max-w-xs truncate">
                                {String(row[col] ?? '')}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: PostgreSQL Schema DDL */}
        {activeTab === 'schema' && (
          <div className="p-6 space-y-4 overflow-y-auto flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  PostgreSQL Production DDL Schema
                </h4>
                <p className="text-xs text-neutral-400">
                  Tables, foreign keys, indexes, and check constraints
                </p>
              </div>
              <button
                onClick={() => handleCopy(schemaDdl)}
                className="px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy DDL'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 leading-relaxed overflow-x-auto max-h-96">
              {schemaDdl}
            </pre>
          </div>
        )}

        {/* Tab 3: REST API Playground */}
        {activeTab === 'api' && (
          <div className="p-6 space-y-5 overflow-y-auto flex-1">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Full-Stack REST API Endpoints
              </h4>
              <p className="text-xs text-neutral-400">
                All endpoints live on the Node.js/Express server and can be invoked directly
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold text-[10px]">GET</span>
                    <span className="text-white font-bold">/api/projects</span>
                  </div>
                  <span className="text-neutral-500 text-[11px]">Query projects (supports ?category= & ?search=)</span>
                </div>
                <div className="text-[11px] text-neutral-400">
                  curl -X GET &quot;http://localhost:3000/api/projects?category=Full-Stack&quot;
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-400 font-bold text-[10px]">POST</span>
                    <span className="text-white font-bold">/api/projects</span>
                  </div>
                  <span className="text-neutral-500 text-[11px]">Create new project in database</span>
                </div>
                <div className="text-[11px] text-neutral-400">
                  curl -X POST http://localhost:3000/api/projects -H &quot;Content-Type: application/json&quot; -d &apos;&#123;&quot;title&quot;: &quot;New App&quot;, &quot;category&quot;: &quot;Full-Stack&quot;&#125;&apos;
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-400 font-bold text-[10px]">POST</span>
                    <span className="text-white font-bold">/api/messages</span>
                  </div>
                  <span className="text-neutral-500 text-[11px]">Submit contact message into persistent inbox</span>
                </div>
                <div className="text-[11px] text-neutral-400">
                  curl -X POST http://localhost:3000/api/messages -H &quot;Content-Type: application/json&quot; -d &apos;&#123;&quot;name&quot;: &quot;Recruiter&quot;, &quot;email&quot;: &quot;test@example.com&quot;, &quot;message&quot;: &quot;Hello&quot;&#125;&apos;
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-400 font-bold text-[10px]">POST</span>
                    <span className="text-white font-bold">/api/db/query</span>
                  </div>
                  <span className="text-neutral-500 text-[11px]">Execute custom parameterized SQL query</span>
                </div>
                <div className="text-[11px] text-neutral-400">
                  curl -X POST http://localhost:3000/api/db/query -H &quot;Content-Type: application/json&quot; -d &apos;&#123;&quot;query&quot;: &quot;SELECT * FROM projects;&quot;&#125;&apos;
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3.5 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between">
          <span className="text-xs text-neutral-400">
            PostgreSQL DDL & Schema Engine · Live Express Backend
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
          >
            Close Explorer
          </button>
        </div>

      </div>
    </div>
  );
};
