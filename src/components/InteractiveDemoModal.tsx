import React, { useState, useEffect } from 'react';
import { Project } from '../types/portfolio.ts';
import { X, Play, RefreshCw, Send, CheckCircle2, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

interface InteractiveDemoModalProps {
  project: Project | null;
  onClose: () => void;
}

export const InteractiveDemoModal: React.FC<InteractiveDemoModalProps> = ({
  project,
  onClose
}) => {
  // Osiris state
  const [regions, setRegions] = useState([
    { name: 'US-East-1 (N. Virginia)', latency: 14, status: 'Healthy', load: 64 },
    { name: 'US-West-2 (Oregon)', latency: 22, status: 'Healthy', load: 58 },
    { name: 'EU-Central-1 (Frankfurt)', latency: 68, status: 'Healthy', load: 72 },
    { name: 'AP-Northeast-1 (Tokyo)', latency: 104, status: 'Healthy', load: 45 },
  ]);
  const [chaosTriggered, setChaosTriggered] = useState(false);

  // Apex state
  const [balanceUSD, setBalanceUSD] = useState(100000);
  const [balanceBTC, setBalanceBTC] = useState(2.45);
  const [tradeAmount, setTradeAmount] = useState('0.1');
  const [tradeAction, setTradeAction] = useState<'BUY' | 'SELL'>('BUY');
  const [tradeHistory, setTradeHistory] = useState<Array<{ id: string; time: string; type: string; amount: number; price: number; hash: string }>>([
    { id: 'TX-901', time: '14:22:04', type: 'BUY', amount: 0.25, price: 68420, hash: '0x7f9a2b8c' },
    { id: 'TX-902', time: '14:22:15', type: 'SELL', amount: 0.10, price: 68450, hash: '0x3c1d8e4f' },
  ]);

  // Nexus DevTool State
  const [devEndpoint, setDevEndpoint] = useState('/api/projects');
  const [apiResponse, setApiResponse] = useState<string>('Click "Execute Request" to query live backend');
  const [apiLoading, setApiLoading] = useState(false);
  const [apiTiming, setApiTiming] = useState<number | null>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  // Osiris Chaos toggle
  const triggerChaosTest = () => {
    setChaosTriggered(true);
    setRegions(prev => [
      { ...prev[0], latency: 128, status: 'Rebalancing Failover', load: 92 },
      { ...prev[1], latency: 24, status: 'Rerouting Ingress', load: 88 },
      { ...prev[2], latency: 70, status: 'Healthy', load: 74 },
      { ...prev[3], latency: 106, status: 'Healthy', load: 48 },
    ]);
    setTimeout(() => {
      setRegions(prev => [
        { ...prev[0], latency: 16, status: 'Healthy (Failover Complete)', load: 66 },
        { ...prev[1], latency: 22, status: 'Healthy', load: 60 },
        { ...prev[2], latency: 68, status: 'Healthy', load: 70 },
        { ...prev[3], latency: 104, status: 'Healthy', load: 46 },
      ]);
      setChaosTriggered(false);
    }, 2500);
  };

  // Apex trade execution
  const executeTrade = () => {
    const qty = parseFloat(tradeAmount);
    if (isNaN(qty) || qty <= 0) return;
    const btcPrice = 68500;
    const cost = qty * btcPrice;

    if (tradeAction === 'BUY') {
      if (balanceUSD < cost) return;
      setBalanceUSD(prev => prev - cost);
      setBalanceBTC(prev => Math.round((prev + qty) * 1000) / 1000);
    } else {
      if (balanceBTC < qty) return;
      setBalanceBTC(prev => Math.round((prev - qty) * 1000) / 1000);
      setBalanceUSD(prev => prev + cost);
    }

    const txHash = '0x' + Math.random().toString(16).substring(2, 10);
    const newTx = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      time: new Date().toLocaleTimeString(),
      type: tradeAction,
      amount: qty,
      price: btcPrice,
      hash: txHash
    };
    setTradeHistory(prev => [newTx, ...prev.slice(0, 5)]);
  };

  // Nexus live fetch
  const executeApiCall = async () => {
    setApiLoading(true);
    const t0 = performance.now();
    try {
      const res = await fetch(devEndpoint);
      const data = await res.json();
      setApiTiming(Math.round(performance.now() - t0));
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setApiResponse(`Error calling ${devEndpoint}: ${err.message}`);
      setApiTiming(Math.round(performance.now() - t0));
    } finally {
      setApiLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto text-neutral-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-neutral-900/95 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-neutral-800 text-emerald-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Live Simulator: {project.title}
              </h3>
              <p className="text-[11px] text-neutral-400">
                Interactive runtime prototype demonstrating core architecture mechanics
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Simulator Body */}
        <div className="p-6 space-y-6">
          
          {/* 1. Osiris Cloud Simulator */}
          {project.id === 'osiris-cloud' || project.category === 'Cloud Infrastructure' ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Regional Mesh Topology & Latency Monitor
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Simulates distributed eBPF ping & automated packet rerouting
                  </p>
                </div>
                <button
                  onClick={triggerChaosTest}
                  disabled={chaosTriggered}
                  className="px-3 py-1.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${chaosTriggered ? 'animate-spin' : ''}`} />
                  <span>{chaosTriggered ? 'Failover In Progress...' : 'Inject Network Chaos'}</span>
                </button>
              </div>

              {/* Regional Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {regions.map(r => (
                  <div key={r.name} className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">{r.name}</span>
                      <span className="font-mono tabular-nums text-emerald-400 text-[11px]">{r.latency}ms</span>
                    </div>
                    <div className="w-full bg-neutral-900 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${r.load > 85 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        style={{ width: `${r.load}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                      <span>Status: {r.status}</span>
                      <span>Load: {r.load}%</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80 text-xs font-mono text-neutral-400">
                <span className="text-emerald-400">✓ Invariant:</span> Zero packets dropped during rebalance. PostgreSQL timeseries log synced.
              </div>
            </div>
          ) : project.id === 'apex-trading' || project.category === 'FinTech / Real-time' ? (
            /* 2. Apex Trading Simulator */
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Immutable Double-Entry Ledger Simulator
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Executes deterministic balance changes with cryptographic verification
                  </p>
                </div>
                <div className="text-right text-xs font-mono tabular-nums">
                  <div className="text-neutral-400">USD Balance: <span className="text-white font-bold">${balanceUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                  <div className="text-neutral-400">BTC Balance: <span className="text-emerald-400 font-bold">{balanceBTC} BTC</span></div>
                </div>
              </div>

              {/* Order Submission Form */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Side</label>
                    <select
                      value={tradeAction}
                      onChange={(e) => setTradeAction(e.target.value as any)}
                      className="w-full bg-neutral-900 border border-neutral-800 text-xs text-white rounded-lg p-2 focus:outline-none"
                    >
                      <option value="BUY">BUY BTC</option>
                      <option value="SELL">SELL BTC</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Quantity (BTC)</label>
                    <input
                      type="number"
                      step="0.05"
                      value={tradeAmount}
                      onChange={(e) => setTradeAmount(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 text-xs text-white rounded-lg p-2 font-mono focus:outline-none"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={executeTrade}
                      className="w-full py-2 px-3 text-xs font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Post Ledger Order</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Ledger Table */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-neutral-400">
                  Cryptographic Ledger Audit Trail (Last 5 Transactions)
                </div>
                <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-neutral-900/60 text-neutral-400 border-b border-neutral-800">
                      <tr>
                        <th className="p-2.5">TX ID</th>
                        <th className="p-2.5">Time</th>
                        <th className="p-2.5">Side</th>
                        <th className="p-2.5">Amount</th>
                        <th className="p-2.5">Price</th>
                        <th className="p-2.5">Hash</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900">
                      {tradeHistory.map(tx => (
                        <tr key={tx.id} className="text-neutral-300">
                          <td className="p-2.5 font-bold text-white">{tx.id}</td>
                          <td className="p-2.5 text-neutral-400">{tx.time}</td>
                          <td className={`p-2.5 font-semibold ${tx.type === 'BUY' ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {tx.type}
                          </td>
                          <td className="p-2.5 tabular-nums">{tx.amount} BTC</td>
                          <td className="p-2.5 tabular-nums">${tx.price.toLocaleString()}</td>
                          <td className="p-2.5 text-neutral-500 text-[11px]">{tx.hash}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            /* 3. General / Nexus Live API Workbench Simulator */
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Live API Query Runner
                </h4>
                <p className="text-xs text-neutral-400">
                  Query the active backend API routes in real-time
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={devEndpoint}
                  onChange={(e) => setDevEndpoint(e.target.value)}
                  className="bg-neutral-950 border border-neutral-800 text-xs text-white rounded-lg p-2 font-mono focus:outline-none flex-1"
                >
                  <option value="/api/projects">GET /api/projects (Project catalog)</option>
                  <option value="/api/skills">GET /api/skills (Skills matrix)</option>
                  <option value="/api/experience">GET /api/experience (Career history)</option>
                  <option value="/api/db/stats">GET /api/db/stats (Database metrics & size)</option>
                  <option value="/api/health">GET /api/health (Server health & uptime)</option>
                </select>

                <button
                  onClick={executeApiCall}
                  disabled={apiLoading}
                  className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-white hover:bg-neutral-200 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{apiLoading ? 'Querying...' : 'Execute Request'}</span>
                </button>
              </div>

              {apiTiming !== null && (
                <div className="text-xs font-mono text-neutral-400 flex items-center gap-2">
                  <span>Status: <strong className="text-emerald-400">200 OK</strong></span>
                  <span>·</span>
                  <span>Response Time: <strong className="text-white tabular-nums">{apiTiming}ms</strong></span>
                </div>
              )}

              <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 max-h-64 overflow-y-auto">
                {apiResponse}
              </pre>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between">
          <span className="text-[11px] text-neutral-400">
            Simulated live environment powered by Vite & Express backend
          </span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
