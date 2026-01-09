
// Complete component implementation and add default export to fix import error in App.tsx
import React, { useId, useState } from 'react';
import { TowerData } from '../types';
import { 
  Lightbulb, Info, ChevronDown, Binary, Activity, Eye, Layers, 
  ChevronUp, ExternalLink, Compass, Shield, Zap, GitMerge, Cpu, 
  Network, Target, Box, CpuIcon, Search, Stethoscope, 
  ClipboardCheck, History, ArrowRight 
} from 'lucide-react';

interface TowerCardProps {
  tower: TowerData;
  isActive: boolean;
  onSelect: (tower: TowerData) => void;
}

const TowerCard: React.FC<TowerCardProps> = ({ tower, isActive, onSelect }) => {
  const titleId = useId();
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [isUseCaseExpanded, setIsUseCaseExpanded] = useState(false);

  const getThemeColors = () => {
    if (tower.colorClass === 'purple') return {
      border: 'border-purple-500/50',
      shadow: 'shadow-[0_0_40px_rgba(168,85,247,0.25)]',
      ring: 'ring-purple-500/30',
      bg: 'bg-purple-500/10',
      text: 'text-purple-400',
      glow: 'group-hover/icon:drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] group-hover/icon:brightness-125',
      boxGlow: 'hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]',
      tooltipBg: 'bg-purple-900/90'
    };
    if (tower.colorClass === 'cyan') return {
      border: 'border-cyan-500/50',
      shadow: 'shadow-[0_0_40px_rgba(6,182,212,0.25)]',
      ring: 'ring-cyan-500/30',
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-400',
      glow: 'group-hover/icon:drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] group-hover/icon:brightness-125',
      boxGlow: 'hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]',
      tooltipBg: 'bg-cyan-900/90'
    };
    return {
      border: 'border-emerald-500/50',
      shadow: 'shadow-[0_0_40px_rgba(16,185,129,0.25)]',
      ring: 'ring-emerald-500/30',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      glow: 'group-hover/icon:drop-shadow-[0_0_15px_rgba(16,185,129,0.8)] group-hover/icon:brightness-125',
      boxGlow: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]',
      tooltipBg: 'bg-emerald-900/90'
    };
  };

  const theme = getThemeColors();

  const getIconContext = () => {
    if (tower.id === 'OPENFGA') return 'Relationship Graph';
    if (tower.id === 'OSO') return 'Policy Logic';
    return 'Fiduciary Duty';
  };

  const getLabelExplanation = (label: string) => {
    switch (label) {
      case 'RELATIONSHIPS':
        return (
          <>
            <p className="mb-2"><span className="font-bold text-white">ReBAC:</span> Graph-based permissions modeling for massive nested hierarchies.</p>
            <p className="text-neutral-500">Optimized for: SaaS, Google Zanzibar patterns, and planetary scale.</p>
          </>
        );
      case 'LOGIC':
        return (
          <>
            <p className="mb-2"><span className="font-bold text-white">ABAC:</span> Attribute-driven policy-as-code using the Polar engine.</p>
            <p className="text-neutral-500">Optimized for: Dynamic business rules and database push-down filtering.</p>
          </>
        );
      case 'AGENCY':
        return (
          <>
            <p className="mb-2"><span className="font-bold text-white">Agency:</span> Fiduciary-based auth encoding legal capacity and liability.</p>
            <div className="space-y-2 mt-2 pt-2 border-t border-white/10">
              <p className="text-[9px] font-black uppercase text-emerald-400 flex items-center gap-1"><History size={10} /> Ledger Logic: Medical Records</p>
              <div className="space-y-1 pl-2 border-l border-emerald-500/30">
                <p className="text-[10px]"><span className="text-white">1. Mandate:</span> Patient signs digital proxy for specialist.</p>
                <p className="text-[10px]"><span className="text-white">2. Check:</span> Ledger validates HSM signature against live Proxy capacity.</p>
                <p className="text-[10px]"><span className="text-white">3. Forensic:</span> Breach attempts trigger an immutable state-seal for legal audit.</p>
              </div>
            </div>
          </>
        );
      default:
        return '';
    }
  };

  const archBullets = tower.architecture.split(',').map(s => s.trim());

  return (
    <div 
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onClick={() => onSelect(tower)}
      className={`relative group cursor-pointer transition-all duration-500 p-6 rounded-2xl border bg-neutral-900/50 backdrop-blur-sm flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-blue-500/50
        ${isActive 
          ? `scale-105 ${theme.border} z-10 ring-2 ${theme.ring} ${theme.shadow} opacity-100` 
          : 'scale-100 opacity-60 hover:opacity-100 hover:scale-[1.03] border-white/5'
        }`}
    >
      {/* Paradigm Label */}
      <div className="flex items-center justify-end mb-4 relative group/tooltip">
        <span className={`flex items-center gap-1.5 text-[10px] font-black tracking-[0.2em] px-3 py-1 rounded-full border border-current/20 transition-all ${tower.colorClass === 'purple' ? 'text-purple-400 bg-purple-400/10' : tower.colorClass === 'cyan' ? 'text-cyan-400 bg-cyan-400/10' : 'text-emerald-400 bg-emerald-400/10'}`}>
          {tower.label}
          <Info size={10} className="opacity-50" />
        </span>
        <div className="absolute bottom-full right-0 mb-3 w-64 p-4 bg-neutral-900/98 backdrop-blur-2xl border border-white/10 rounded-xl text-[10px] leading-relaxed text-neutral-300 opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-all duration-300 z-50">
          <div className={`font-black mb-2 tracking-widest text-[9px] uppercase ${theme.text} flex items-center gap-2`}>
            <Compass size={12} /> Paradigm Specs
          </div>
          {getLabelExplanation(tower.label)}
        </div>
      </div>
      
      <div className="flex items-baseline gap-2 mb-3">
        <h3 id={titleId} className="text-2xl font-bold tracking-tight text-white">{tower.title}</h3>
        <span className="text-neutral-600 text-[10px] font-mono">v1.4.2</span>
      </div>

      {/* Main Icon with HUD Tooltip */}
      <div className="mb-6">
        <div className={`flex items-center gap-4 p-4 rounded-2xl ${theme.bg} border ${theme.border} group/icon transition-all relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-r from-white/[0.05] to-transparent pointer-events-none" />
          
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover/icon:opacity-20 transition-opacity">
            <Activity size={48} className={theme.text} />
          </div>

          <div className="absolute bottom-[calc(100%+8px)] left-0 opacity-0 group-hover/icon:opacity-100 transition-all duration-300 translate-y-2 group-hover/icon:translate-y-0 pointer-events-none z-20">
            <div className={`px-2 py-1 rounded-md ${theme.tooltipBg} backdrop-blur-md border border-white/10 shadow-xl flex items-center gap-2`}>
              <div className={`w-1 h-1 rounded-full bg-white animate-pulse shadow-[0_0_5px_white]`} />
              <span className="text-[8px] font-black uppercase tracking-[0.15em] text-white whitespace-nowrap">{getIconContext()}</span>
            </div>
            <div className={`ml-4 w-2 h-2 ${theme.tooltipBg} border-r border-b border-white/10 rotate-45 -mt-1`} />
          </div>

          <div className={`transition-transform duration-500 group-hover/icon:scale-110 relative z-10 ${theme.glow}`}>
            {tower.icon}
          </div>
          <div className="relative z-10">
            <div className={`text-[10px] font-black uppercase tracking-widest ${theme.text}`}>{tower.iconDescription}</div>
            <div className="text-[8px] text-neutral-500 font-medium">SYSTEM CORE</div>
          </div>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        <div>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsDescExpanded(!isDescExpanded); }}
            className="flex items-center justify-between w-full text-left group/btn"
          >
            <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest flex items-center gap-2">
              <Layers size={12} className="text-blue-500/50" /> The Paradigm
            </span>
            {isDescExpanded ? <ChevronUp size={14} className="text-neutral-700" /> : <ChevronDown size={14} className="text-neutral-700" />}
          </button>
          <p className={`mt-2 text-xs leading-relaxed text-neutral-400 transition-all duration-300 overflow-hidden ${isDescExpanded ? 'max-h-96 opacity-100' : 'max-h-12 opacity-50'}`}>
            {tower.description}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-black text-neutral-500 uppercase tracking-widest">
            <Binary size={12} className={theme.text} /> Tech Stack
          </div>
          <div className="flex flex-wrap gap-2">
            {archBullets.map((bullet, i) => (
              <span key={i} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[9px] text-neutral-300 font-mono">
                {bullet}
              </span>
            ))}
          </div>
        </div>

        <div>
           <button 
            onClick={(e) => { e.stopPropagation(); setIsUseCaseExpanded(!isUseCaseExpanded); }}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest flex items-center gap-2">
              <Target size={12} className="text-amber-500/50" /> Critical Use-Case
            </span>
            {isUseCaseExpanded ? <ChevronUp size={14} className="text-neutral-700" /> : <ChevronDown size={14} className="text-neutral-700" />}
          </button>
          <div className={`mt-2 text-[11px] leading-relaxed text-neutral-400 bg-white/5 p-3 rounded-lg border border-white/5 transition-all duration-300 overflow-hidden ${isUseCaseExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            {tower.useCase}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
        <a 
          href={tower.docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 text-[10px] font-black text-neutral-500 hover:text-white transition-colors uppercase tracking-widest"
        >
          Documentation <ExternalLink size={10} />
        </a>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${theme.bg} ${theme.text} text-[10px] font-black uppercase tracking-widest border ${theme.border}`}>
          Active <ArrowRight size={10} />
        </div>
      </div>
    </div>
  );
};

export default TowerCard;
