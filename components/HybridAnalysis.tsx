import React from 'react';
import { Zap, GitMerge, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';

const HybridAnalysis: React.FC = () => {
  const synergyPoints = [
    {
      title: 'Graph-Logic Synchronization',
      description: 'OpenFGA manages global relationships while Oso handles localized attribute predicates.',
      benefit: 'Reduces logic complexity by 40%',
      icon: <GitMerge size={16} />,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    {
      title: 'Fiduciary Anchor Point',
      description: 'Gauth_go provides non-repudiation for high-stakes actions evaluated by Oso/OpenFGA.',
      benefit: 'Legal-grade proof for all actions',
      icon: <ShieldCheck size={16} />,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10'
    },
    {
      title: 'Unified Evaluation Plane',
      description: 'A shared context layer prevents "Shadow Permissions" across disparate systems.',
      benefit: 'Eliminates single-point-of-failure',
      icon: <Cpu size={16} />,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-[2rem] bg-gradient-to-br from-amber-500/10 via-transparent to-transparent border border-amber-500/20 relative overflow-hidden group/analysis">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover/analysis:scale-110 transition-transform duration-700">
          <Zap size={120} className="text-amber-500" />
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-amber-500/20 rounded-2xl text-amber-500 shadow-lg shadow-amber-500/10">
            <Zap size={20} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-black uppercase tracking-tighter text-white">Hybrid Advantage Analysis</h3>
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">Architectural Synergy Report</p>
          </div>
        </div>

        <div className="space-y-4">
          {synergyPoints.map((point, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all group">
              <div className={`shrink-0 p-3 h-fit rounded-xl ${point.bgColor} ${point.color}`}>
                {point.icon}
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-neutral-200 group-hover:text-white transition-colors">{point.title}</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">{point.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <ArrowRight size={10} className="text-amber-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-500/80">{point.benefit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-2xl bg-black/40 border border-white/5">
          <p className="text-[11px] text-neutral-400 leading-relaxed italic">
            "By orchestrating these paradigms, enterprises move from <strong className="text-neutral-300">Simple Access</strong> to <strong className="text-amber-500">Intelligent Authorization</strong>, ensuring that performance never compromises compliance."
          </p>
        </div>
      </div>
    </div>
  );
};

export default HybridAnalysis;