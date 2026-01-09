
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronRight, X, Settings2, Zap, ArrowDownUp, Save } from 'lucide-react';

const GanttChart: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [velocity, setVelocity] = useState(85);
  const [startDate, setStartDate] = useState('2025-06-01');

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="w-full bg-neutral-900/40 p-8 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden group">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full"></div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
            <Calendar size={20} />
          </div>
          <div>
            <h3 className="font-bold text-lg tracking-tight">Implementation Roadmap</h3>
            <p className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-mono">Phase Alignment & Deployment</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-neutral-500">
          <Clock size={12} />
          <span>ESTIMATED DURATION: 14 WEEKS</span>
        </div>
      </div>

      <div className="relative min-h-[300px] flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl bg-black/20 group-hover:border-blue-500/30 transition-colors">
        {/* Placeholder Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
          <div className="grid grid-cols-12 w-full h-full p-4 gap-1">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-full border-r border-white/5"></div>
            ))}
          </div>
        </div>
        
        <div className="relative z-10 text-center space-y-4 px-6">
          <div className="inline-block p-4 rounded-full bg-white/5 border border-white/10 mb-2 animate-pulse-slow">
            <Calendar size={32} className="text-blue-500" />
          </div>
          <h4 className="text-xl font-bold text-white tracking-tight">Gantt Chart Placeholder</h4>
          <p className="text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
            This module is architected to visualize the critical path of your authorization framework deployment. 
            Detailed timeline vectors for tuple migration, policy synthesis, and fiduciary audits will appear here.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              Analysis
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              Synthesis
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Validation
            </div>
          </div>
        </div>

        {/* Decorative corner accents */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/20"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-white/20"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-white/20"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-white/20"></div>
      </div>

      <div className="mt-8 flex items-center justify-between text-[10px] font-mono text-neutral-600">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Critical Path</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-neutral-700"></div> Dependencies</span>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1 text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-widest font-bold focus:outline-none"
        >
          Config timeline <ChevronRight size={12} />
        </button>
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div 
            className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400">
                  <Settings2 size={20} />
                </div>
                <div>
                  <h2 id="modal-title" className="text-xl font-bold tracking-tight text-white">Timeline Configuration</h2>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">Parameters & Simulation</p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-neutral-500 hover:text-white transition-colors hover:bg-white/5 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-8">
              {/* Start Date Selection */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                  <Calendar size={12} /> T-Minus Start Date
                </label>
                <input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-neutral-200 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all hover:border-white/20"
                />
              </div>

              {/* Team Velocity Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                    <Zap size={12} className="text-yellow-500" /> Neural Velocity
                  </label>
                  <span className="text-xs font-mono text-blue-400">{velocity}%</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={velocity}
                  onChange={(e) => setVelocity(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[9px] text-neutral-600 font-mono">
                  <span>CONSERVATIVE</span>
                  <span>AGGRESSIVE</span>
                </div>
              </div>

              {/* Phase Priority List (Simulated) */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                  <ArrowDownUp size={12} /> Phase Priority Sequence
                </label>
                <div className="space-y-2">
                  {[
                    { name: 'Architecture Audit', status: 'Priority 1', color: 'border-purple-500/30' },
                    { name: 'Tuple Migration', status: 'Priority 2', color: 'border-cyan-500/30' },
                    { name: 'Liability Syncing', status: 'Priority 3', color: 'border-emerald-500/30' }
                  ].map((phase, i) => (
                    <div key={i} className={`flex items-center justify-between p-3 rounded-xl bg-neutral-900/50 border ${phase.color} group/item cursor-move`}>
                      <span className="text-xs font-medium text-neutral-300">{phase.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-mono text-neutral-500">{phase.status}</span>
                        <ArrowDownUp size={12} className="text-neutral-700 group-hover/item:text-neutral-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-6 bg-white/5 border-t border-white/5 flex gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-xs font-bold text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-3 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 shadow-lg shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Save size={14} /> Commit Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GanttChart;
