import React from 'react';
import { RADAR_DATA } from '../constants';
import { Shield, Zap, Activity, Globe, Info } from 'lucide-react';

const AggregateIndex: React.FC = () => {
  const calculateMetrics = () => {
    const categories = RADAR_DATA.length;
    const avgA = RADAR_DATA.reduce((acc, curr) => acc + curr.A, 0) / categories;
    const avgB = RADAR_DATA.reduce((acc, curr) => acc + curr.B, 0) / categories;
    const avgC = RADAR_DATA.reduce((acc, curr) => acc + curr.C, 0) / categories;
    const avgHybrid = RADAR_DATA.reduce((acc, curr) => acc + curr.D, 0) / categories;

    return {
      composite: avgHybrid.toFixed(1),
      resilience: (avgHybrid * 0.95).toFixed(1), // Simulated weighting
      scalability: RADAR_DATA.find(d => d.subject === 'Scalability')?.D || 0,
      velocity: RADAR_DATA.find(d => d.subject === 'Developer Velocity')?.D || 0
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-4 duration-1000">
      {/* Primary Score */}
      <div className="p-5 rounded-3xl bg-amber-500/10 border border-amber-500/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:rotate-12 transition-transform">
          <Globe size={48} className="text-amber-500" />
        </div>
        <div className="relative z-10">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-500/70">Aggregate Index</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-4xl font-black text-amber-500 tracking-tighter">{metrics.composite}</span>
            <span className="text-xs text-amber-500/50 font-bold">/100</span>
          </div>
          <div className="mt-3 h-1 w-full bg-amber-500/10 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" style={{ width: `${metrics.composite}%` }} />
          </div>
        </div>
      </div>

      {/* Resilience Score */}
      <div className="p-5 rounded-3xl bg-blue-500/10 border border-blue-500/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:rotate-12 transition-transform">
          <Shield size={48} className="text-blue-500" />
        </div>
        <div className="relative z-10">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-500/70">System Resilience</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-4xl font-black text-blue-500 tracking-tighter">{metrics.resilience}</span>
            <span className="text-xs text-blue-500/50 font-bold">SRI</span>
          </div>
          <div className="mt-3 h-1 w-full bg-blue-500/10 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: `${metrics.resilience}%` }} />
          </div>
        </div>
      </div>

      {/* Performance Peak */}
      <div className="p-5 rounded-3xl bg-purple-500/10 border border-purple-500/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:rotate-12 transition-transform">
          <Activity size={48} className="text-purple-500" />
        </div>
        <div className="relative z-10">
          <span className="text-[10px] font-black uppercase tracking-widest text-purple-500/70">Scalability Peak</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-4xl font-black text-purple-500 tracking-tighter">{metrics.scalability}</span>
            <span className="text-xs text-purple-500/50 font-bold">NODE</span>
          </div>
          <div className="mt-3 h-1 w-full bg-purple-500/10 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" style={{ width: `${metrics.scalability}%` }} />
          </div>
        </div>
      </div>

      {/* Velocity Vector */}
      <div className="p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:rotate-12 transition-transform">
          <Zap size={48} className="text-emerald-500" />
        </div>
        <div className="relative z-10">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/70">Agility Vector</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-4xl font-black text-emerald-500 tracking-tighter">{metrics.velocity}</span>
            <span className="text-xs text-emerald-500/50 font-bold">AVX</span>
          </div>
          <div className="mt-3 h-1 w-full bg-emerald-500/10 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: `${metrics.velocity}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AggregateIndex;