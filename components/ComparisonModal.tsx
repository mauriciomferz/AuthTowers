import React, { useEffect } from 'react';
import { X, ArrowRightLeft, Shield, Cpu, Network, CheckCircle2, AlertCircle, Zap } from 'lucide-react';
import { COMPARISON_DATA } from '../constants';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="w-full max-w-6xl bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-[0_20px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/5 shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/10">
              <ArrowRightLeft size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tighter text-white uppercase leading-none">Side-by-Side Analysis</h2>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono mt-1">Cross-Framework Comparison Matrix v2.0</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-3 text-neutral-500 hover:text-white transition-colors hover:bg-white/10 rounded-full"
            aria-label="Close Comparison"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content Table */}
        <div className="flex-1 overflow-auto p-4 sm:p-8">
          <div className="min-w-[800px]">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="py-6 px-4 text-left border-b border-white/10 w-1/4">
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-600">Framework Vector</span>
                  </th>
                  <th className="py-6 px-4 text-center border-b border-white/10 w-1/4 bg-purple-500/5 rounded-t-3xl">
                    <div className="flex flex-col items-center gap-2">
                      <Network size={20} className="text-purple-400" />
                      <span className="text-lg font-bold text-purple-400">OpenFGA</span>
                      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">ReBAC / Zanzibar</span>
                    </div>
                  </th>
                  <th className="py-6 px-4 text-center border-b border-white/10 w-1/4 bg-cyan-500/5 rounded-t-3xl">
                    <div className="flex flex-col items-center gap-2">
                      <Cpu size={20} className="text-cyan-400" />
                      <span className="text-lg font-bold text-cyan-400">Oso</span>
                      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">ABAC / Logic</span>
                    </div>
                  </th>
                  <th className="py-6 px-4 text-center border-b border-white/10 w-1/4 bg-emerald-500/5 rounded-t-3xl">
                    <div className="flex flex-col items-center gap-2">
                      <Shield size={20} className="text-emerald-400" />
                      <span className="text-lg font-bold text-emerald-400">Gauth_go</span>
                      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">Fiduciary / Agency</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DATA.rows.map((row, i) => (
                  <tr key={i} className="group hover:bg-white/[0.02] transition-colors border-b border-white/5 last:border-0">
                    <td className="py-6 px-4">
                      <div className="flex items-center gap-3">
                        <Zap size={12} className="text-blue-500 opacity-50" />
                        <span className="text-xs font-black uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">{row.category}</span>
                      </div>
                    </td>
                    <td className="py-6 px-4 text-center bg-purple-500/5">
                      <p className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">{row.a}</p>
                    </td>
                    <td className="py-6 px-4 text-center bg-cyan-500/5">
                      <p className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">{row.b}</p>
                    </td>
                    <td className="py-6 px-4 text-center bg-emerald-500/5">
                      <p className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">{row.c}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Additional Insight Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 rounded-3xl bg-neutral-900 border border-white/5 space-y-4">
              <div className="flex items-center gap-3 text-purple-400">
                <CheckCircle2 size={20} />
                <span className="text-xs font-black uppercase tracking-widest">Scale Verdict</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Choose <strong className="text-purple-400">OpenFGA</strong> when your main challenge is the sheer volume of relationships. If you have millions of documents and folders with nested group access, Zanzibar's graph traversal is the only model that won't melt your DB.
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-neutral-900 border border-white/5 space-y-4">
              <div className="flex items-center gap-3 text-cyan-400">
                <CheckCircle2 size={20} />
                <span className="text-xs font-black uppercase tracking-widest">Logic Verdict</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Choose <strong className="text-cyan-400">Oso</strong> for high-velocity attribute logic. If your security requirements change weekly or depend on context like "is it business hours?" or "is the user in the same region?", Oso's Polar engine is peerless.
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-neutral-900 border border-white/5 space-y-4">
              <div className="flex items-center gap-3 text-emerald-400">
                <CheckCircle2 size={20} />
                <span className="text-xs font-black uppercase tracking-widest">Compliance Verdict</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Choose <strong className="text-emerald-400">Gauth_go</strong> when legal agency matters. For healthcare proxy access, corporate signatory rights, or AI agent delegation where liability needs an immutable paper trail, the fiduciary ledger is mandatory.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-white/5 border-t border-white/5 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-2 text-neutral-500">
            <AlertCircle size={14} />
            <span className="text-[10px] uppercase font-bold tracking-widest">Synthetic Benchmark Simulation</span>
          </div>
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-neutral-200 transition-all shadow-xl active:scale-95"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;