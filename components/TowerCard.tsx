import React, { useId, useState } from 'react';
import { TowerData } from '../types';
import { Lightbulb, Info, ChevronDown, Binary, Activity, Terminal, Eye, Sparkles, Layers, ChevronUp, ExternalLink, Compass, Shield, Zap } from 'lucide-react';

interface TowerCardProps {
  tower: TowerData;
  isActive: boolean;
  onSelect: (tower: TowerData) => void;
}

const TowerCard: React.FC<TowerCardProps> = ({ tower, isActive, onSelect }) => {
  const titleId = useId();
  const descId = useId();
  const useCaseId = useId();
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
      boxGlow: 'hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]'
    };
    if (tower.colorClass === 'cyan') return {
      border: 'border-cyan-500/50',
      shadow: 'shadow-[0_0_40px_rgba(6,182,212,0.25)]',
      ring: 'ring-cyan-500/30',
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-400',
      glow: 'group-hover/icon:drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] group-hover/icon:brightness-125',
      boxGlow: 'hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]'
    };
    return {
      border: 'border-emerald-500/50',
      shadow: 'shadow-[0_0_40px_rgba(16,185,129,0.25)]',
      ring: 'ring-emerald-500/30',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      glow: 'group-hover/icon:drop-shadow-[0_0_15px_rgba(16,185,129,0.8)] group-hover/icon:brightness-125',
      boxGlow: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]'
    };
  };

  const theme = getThemeColors();

  const getLabelExplanation = (label: string) => {
    switch (label) {
      case 'RELATIONSHIPS':
        return (
          <>
            <p className="mb-2"><span className="font-bold text-white">ReBAC (Relationship-Based Access Control):</span> Utilizes directed graph theory to model permissions as a web of interconnected entities.</p>
            <p className="text-neutral-500">Optimized for: Deeply nested hierarchies, transitive sharing, and Zanzibar-style global consistency.</p>
          </>
        );
      case 'LOGIC':
        return (
          <>
            <p className="mb-2"><span className="font-bold text-white">ABAC (Attribute-Based Access Control):</span> Employs boolean logic and predicate evaluation to govern access based on dynamic attributes.</p>
            <p className="text-neutral-500">Optimized for: Context-aware policies, real-time data filtering, and complex regulatory constraints.</p>
          </>
        );
      case 'AGENCY':
        return (
          <>
            <p className="mb-2"><span className="font-bold text-white">Fiduciary-Based Authorization:</span> Extends beyond simple access to define the legal capacity and liability of acting entities.</p>
            <p className="text-neutral-500">Optimized for: AI agent delegation, non-repudiation ledgers, and formal digital power-of-attorney.</p>
          </>
        );
      default:
        return '';
    }
  };

  const getGlowClass = () => {
    if (tower.colorClass === 'purple') {
      return 'hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] border-purple-900/30 hover:border-purple-500/50';
    }
    if (tower.colorClass === 'cyan') {
      return 'hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] border-cyan-900/30 hover:border-cyan-500/50';
    }
    return 'hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] border-emerald-900/30 hover:border-emerald-500/50';
  };

  const getLabelColor = () => {
    if (tower.colorClass === 'purple') return 'text-purple-400 bg-purple-400/10 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]';
    if (tower.colorClass === 'cyan') return 'text-cyan-400 bg-cyan-400/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]';
    return 'text-emerald-400 bg-emerald-400/10 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]';
  };

  const toggleUseCase = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsUseCaseExpanded(!isUseCaseExpanded);
  };

  const toggleDesc = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDescExpanded(!isDescExpanded);
  };

  return (
    <div 
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      aria-labelledby={titleId}
      aria-label={`Select ${tower.title} architectural tower focusing on ${tower.label}`}
      onClick={() => onSelect(tower)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(tower); }}}
      className={`relative group cursor-pointer transition-all duration-500 p-6 rounded-2xl border bg-neutral-900/50 backdrop-blur-sm flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-blue-500/50
        ${getGlowClass()} 
        ${isActive 
          ? `scale-105 ${theme.border} z-10 ring-2 ${theme.ring} ${theme.shadow} opacity-100` 
          : 'scale-100 opacity-60 hover:opacity-100 hover:scale-[1.03] border-white/5'
        }`}
    >
      {/* Selection indicator pill */}
      {isActive && (
        <div 
          className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.2em] uppercase bg-${tower.colorClass}-500 text-white shadow-lg shadow-${tower.colorClass}-500/50 z-20 animate-in slide-in-from-bottom-2 duration-300`}
        >
          Selected
        </div>
      )}

      {/* Label with Tooltip Trigger */}
      <div className="flex items-center justify-end mb-4 relative group/tooltip">
        <span 
          className={`flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] px-3 py-1 rounded-full border border-current/20 cursor-help transition-all ${getLabelColor()}`}
        >
          {tower.label}
          <Info size={10} className="opacity-50" />
        </span>
        
        {/* Tooltip Content */}
        <div className="absolute bottom-full right-0 mb-3 w-72 p-4 bg-neutral-900/98 backdrop-blur-2xl border border-white/10 rounded-2xl text-[10px] leading-relaxed text-neutral-300 opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-all duration-300 translate-y-2 group-hover/tooltip:translate-y-0 z-50 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className={`font-black mb-3 tracking-[0.2em] text-[9px] uppercase ${theme.text} border-b border-white/5 pb-2 flex items-center gap-2`}>
            <Compass size={12} />
            Paradigm Specification
          </div>
          <div className="space-y-1">
            {getLabelExplanation(tower.label)}
          </div>
          <div className="absolute top-full right-6 -mt-1 w-2 h-2 bg-neutral-900 border-r border-b border-white/10 rotate-45"></div>
        </div>
      </div>
      
      <div className="flex items-baseline gap-2 mb-3">
        <h3 id={titleId} className={`text-2xl font-bold transition-colors ${isActive ? 'text-white' : 'group-hover:text-white'} tracking-tight`}>
          {tower.title}
        </h3>
        <span className="text-[9px] font-mono text-neutral-600 font-medium">v1.0</span>
      </div>

      <div className={`mb-4 flex items-center gap-4 transition-all duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
        <div className={`group/icon p-2 rounded-lg transition-all duration-300 hover:scale-110 ${theme.glow} ${theme.boxGlow} ${isActive ? `${theme.bg} ${theme.border} border shadow-lg` : 'opacity-80 bg-white/5 border border-transparent'}`}>
          <div className="transition-transform duration-300 group-hover/icon:scale-110">
            {tower.icon}
          </div>
        </div>
        <div className="overflow-hidden">
          <span className={`block mono text-[9px] font-bold tracking-widest uppercase transition-all duration-500 transform ${theme.text} opacity-0 -translate-x-4 group-hover/icon:opacity-100 group-hover/icon:translate-x-0`}>
            {tower.iconDescription}
          </span>
        </div>
      </div>

      <div className="relative mb-6">
        <p id={descId} className={`text-sm leading-relaxed transition-all duration-500 ${isDescExpanded ? 'max-h-[1000px]' : 'max-h-24 overflow-hidden'} ${isActive ? 'text-neutral-200' : 'text-neutral-400 group-hover:text-neutral-300'}`}>
          {tower.description}
        </p>
        {!isDescExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-neutral-900/90 to-transparent pointer-events-none"></div>
        )}
        <button 
          onClick={toggleDesc}
          className={`mt-2 text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-1 transition-colors ${theme.text} hover:brightness-125`}
        >
          {isDescExpanded ? <><ChevronUp size={10} /> Show Less</> : <><ChevronDown size={10} /> Read Full Abstract</>}
        </button>
      </div>

      {/* Strategic Deployment Section (Accordion) */}
      <div 
        role="button"
        aria-expanded={isUseCaseExpanded}
        onClick={toggleUseCase}
        className={`p-4 rounded-xl border transition-all duration-500 cursor-pointer group/usecase ${
          isUseCaseExpanded ? 'bg-black/80 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] ring-1 ring-white/10 border-white/20' : isActive ? `bg-black/40 ${theme.border}` : 'bg-black/20 border-white/5'
        } ${!isUseCaseExpanded && 'hover:bg-white/10'}`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Lightbulb size={12} className={`${theme.text} ${isUseCaseExpanded ? 'animate-pulse' : ''}`} />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500 group-hover/usecase:text-neutral-400 transition-colors">Strategic Deployment</span>
          </div>
          <ChevronDown size={14} className={`text-neutral-600 transition-transform duration-500 ${isUseCaseExpanded ? 'rotate-180 text-white' : 'group-hover/usecase:text-neutral-400'}`} />
        </div>
        
        <p id={useCaseId} className={`text-xs mono leading-relaxed transition-colors ${isActive || isUseCaseExpanded ? 'text-neutral-300' : 'text-neutral-500'}`}>
          {tower.useCase}
        </p>

        <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isUseCaseExpanded ? 'max-h-[500px] opacity-100 mt-4 pt-4 border-t border-white/10' : 'max-h-0 opacity-0'}`}>
          <div className="space-y-4">
            <div className="bg-neutral-900/50 p-3 rounded-lg border border-white/5 relative overflow-hidden group/sim">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50 group-hover/sim:bg-blue-400 transition-colors"></div>
              <div className="flex items-center gap-2 mb-2">
                <Eye size={12} className="text-blue-500/60" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500">System Simulation</span>
              </div>
              <p className="text-[10px] text-neutral-400 leading-relaxed italic font-light">
                {tower.detailedScenario}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* NEW: Key Technical Specifications Section */}
      <div className={`mt-6 p-5 rounded-2xl border border-white/10 bg-white/[0.03] space-y-6 transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'}`}>
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <Terminal size={14} className="text-neutral-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400">Key Technical Specifications</span>
        </div>
        
        <div className="grid gap-6">
          {/* Architecture Details */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Binary size={12} className={theme.text} />
              <span className="text-[11px] font-bold text-neutral-200 tracking-wide">Architecture</span>
            </div>
            <ul className="grid grid-cols-1 gap-2.5 pl-2">
              {tower.architecture.split(',').map((spec, idx) => (
                <li key={idx} className="text-[10px] text-neutral-400 flex items-start gap-2.5 group/spec hover:text-white transition-colors">
                  <div className={`mt-1.5 w-1.5 h-1.5 flex-shrink-0 rounded-sm rotate-45 border border-${tower.colorClass}-500/50 bg-${tower.colorClass}-500/20 group-hover/spec:bg-${tower.colorClass}-500/50 transition-all`} />
                  <span className="leading-relaxed">{spec.trim()}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Performance Data */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Activity size={12} className={theme.text} />
              <span className="text-[11px] font-bold text-neutral-200 tracking-wide">Performance Metrics</span>
            </div>
            <ul className="grid grid-cols-1 gap-2.5 pl-2">
              {tower.performanceMetrics.map((metric, idx) => (
                <li key={idx} className="text-[10px] text-neutral-400 flex items-start gap-2.5 group/metric hover:text-white transition-colors">
                  <div className={`mt-1.5 w-1.5 h-1.5 flex-shrink-0 rounded-full border border-${tower.colorClass}-500/50 bg-${tower.colorClass}-500/10 group-hover/metric:scale-125 transition-all shadow-[0_0_8px_rgba(255,255,255,0.05)]`} />
                  <span className="leading-relaxed">{metric}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Architectural Synergies Section */}
      <div className={`mt-6 p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent space-y-4 transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'}`}>
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <Layers size={14} className="text-neutral-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400">Architectural Synergies</span>
        </div>
        <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
          A resilient security posture is achieved through <strong>defense-in-depth</strong>, orchestrating these three paradigms into a unified mesh. In this layered approach, <strong>OpenFGA</strong> serves as the foundational relationship graph managing planetary-scale access hierarchies, while <strong>Oso</strong> provides the granular logic gates for real-time attribute evaluation at the edge. <strong>Gauth_go</strong> acts as the ultimate fiduciary arbiter, anchoring high-stakes operations with cryptographic agency proofs and legal non-repudiation. By synthesizing graph consistency, logical precision, and forensic accountability, architects can build systems that are not only secure but legally robust.
        </p>
      </div>

      {/* Learn More Link (Official Documentation) */}
      <div className="mt-auto pt-6 flex items-center justify-center">
        <a 
          href={tower.docsUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`flex items-center gap-2 py-2.5 px-6 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border border-white/10 bg-white/5 hover:bg-white/10 ${theme.text} hover:scale-105 active:scale-95 shadow-lg`}
        >
          <ExternalLink size={14} />
          Technical Documentation
        </a>
      </div>
      
      <div className={`mt-6 h-1 transition-all duration-700 rounded-full bg-${tower.colorClass}-500 ${isActive ? 'w-full opacity-100' : 'w-0 group-hover:w-full opacity-50'}`}></div>
    </div>
  );
};

export default TowerCard;