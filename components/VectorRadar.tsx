import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Legend } from 'recharts';
import { RADAR_DATA } from '../constants';
import { BarChart3, TrendingUp, Loader2 } from 'lucide-react';

const VectorRadar: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const calculateEfficiency = () => {
    const totalD = RADAR_DATA.reduce((acc, curr) => acc + curr.D, 0);
    const sumOfAverages = RADAR_DATA.reduce((acc, curr) => acc + (curr.A + curr.B + curr.C) / 3, 0);
    return ((totalD - sumOfAverages) / sumOfAverages) * 100;
  };

  const totalD = RADAR_DATA.reduce((acc, curr) => acc + curr.D, 0);
  const efficiencyLift = calculateEfficiency();

  if (isLoading) {
    return (
      <div className="w-full h-[450px] bg-neutral-900/30 p-4 rounded-3xl border border-white/5 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-4 left-6 flex items-center gap-2 opacity-50">
          <Loader2 size={16} className="text-neutral-500 animate-spin" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600">Calibrating Vector Matrix...</span>
        </div>
        <div className="w-64 h-64 rounded-full border border-white/5 flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_180deg,rgba(59,130,246,0.1)_360deg)] animate-spin opacity-50"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="w-full h-[450px] bg-neutral-900/30 p-4 rounded-3xl border border-white/5 relative group overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] animate-grid-pulse"></div>
        
        <div className="absolute top-4 left-6 flex items-center gap-2 z-10">
          <BarChart3 size={16} className="text-amber-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Vector Analysis Matrix</span>
        </div>
        
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RADAR_DATA}>
            <PolarGrid stroke="#333" strokeOpacity={0.5} />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#666', fontSize: 10, fontWeight: 700, letterSpacing: '0.05em' }} 
            />
            <Radar name="OpenFGA (ReBAC)" dataKey="A" stroke="#A855F7" fill="#A855F7" fillOpacity={0.1} />
            <Radar name="Oso (Logic)" dataKey="B" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.1} />
            <Radar name="Gauth_go (Agency)" dataKey="C" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
            <Radar name="Hybrid (Orchestrated)" dataKey="D" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.25} strokeWidth={3} />
            <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: '#555' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-between group hover:bg-amber-500/10 transition-all">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-500/20 rounded-xl text-amber-500 shadow-lg shadow-amber-500/10">
            <TrendingUp size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Aggregate Efficiency Lift</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-amber-500">+{efficiencyLift.toFixed(1)}%</span>
              <span className="text-[11px] text-neutral-400 font-medium uppercase tracking-tighter">Composite Advantage</span>
            </div>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <span className="text-[9px] font-mono text-neutral-600 block uppercase">Benchmark Index</span>
          <span className="text-lg font-bold text-white tracking-tighter">{(totalD / RADAR_DATA.length).toFixed(1)} / 100</span>
        </div>
      </div>
    </div>
  );
};

export default VectorRadar;