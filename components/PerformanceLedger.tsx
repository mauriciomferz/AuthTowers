import React from 'react';
import { RADAR_DATA } from '../constants';
import { 
  Table as TableIcon, Info, TrendingUp, ArrowUpRight, Network, Cpu, ShieldCheck, Gauge, Zap, Target 
} from 'lucide-react';

const PerformanceLedger: React.FC = () => {
  const calculateAdvantages = () => {
    return RADAR_DATA.map(item => {
      const others = [item.A, item.B, item.C];
      const othersAvg = others.reduce((a, b) => a + b, 0) / 3;
      const bestAlternative = Math.max(...others);
      
      return {
        subject: item.subject,
        valA: item.A,
        valB: item.B,
        valC: item.C,
        valHybrid: item.D,
        deltaAvg: item.D - othersAvg,
        deltaBest: item.D - bestAlternative,
        percentAdvantage: ((item.D - othersAvg) / othersAvg) * 100
      };
    });
  };

  const advantages = calculateAdvantages();

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Scalability': return <Network size={12} className="text-purple-400" />;
      case 'Logic Depth': return <Cpu size={12} className="text-cyan-400" />;
      case 'Legal Compliance': return <ShieldCheck size={12} className="text-emerald-400" />;
      case 'Developer Velocity': return <Zap size={12} className="text-amber-400" />;
      case 'Performance': return <Gauge size={12} className="text-blue-400" />;
      default: return <Target size={12} className="text-neutral-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* 5-Column Differential Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {advantages.map((adv, idx) => (
          <div 
            key={idx} 
            className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between hover:bg-white/[0.05] transition-all group cursor-default"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {getSubjectIcon(adv.subject)}
                <span className="text-[8px] font-black uppercase tracking-widest text-neutral-500">{adv.subject}</span>
              </div>
              <ArrowUpRight size={10} className="text-neutral-700 group-hover:text-amber-500 transition-colors" />
            </div>
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors">{adv.valHybrid}</span>
              <span className={`text-[9px] font-mono font-bold ${adv.deltaAvg >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                {adv.deltaAvg >= 0 ? '+' : ''}{adv.deltaAvg.toFixed(1)}
              </span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-amber-500" style={{ width: `${adv.valHybrid}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Numerical Table */}
      <div className="p-6 rounded-3xl bg-neutral-900/40 border border-white/5 relative overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TableIcon size={16} className="text-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Differential Ledger</span>
          </div>
          <div className="flex items-center gap-1 text-[9px] text-neutral-500 font-mono italic">
            <Info size={10} />
            <span>Delta computed against best alternate framework.</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[10px] text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-neutral-500 uppercase tracking-widest font-black">
                <th className="py-3 px-2">Category Vector</th>
                <th className="py-3 px-2 text-center text-purple-400/70">OpenFGA</th>
                <th className="py-3 px-2 text-center text-cyan-400/70">Oso</th>
                <th className="py-3 px-2 text-center text-emerald-400/70">Gauth_go</th>
                <th className="py-3 px-2 text-center text-amber-500 bg-amber-500/5 rounded-t-lg">Hybrid</th>
                <th className="py-3 px-2 text-right">Architectural Alpha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {advantages.map((adv, idx) => (
                <tr key={idx} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-2 flex items-center gap-2">
                    {getSubjectIcon(adv.subject)}
                    <span className="font-bold text-neutral-300 group-hover:text-white transition-colors uppercase tracking-tight">{adv.subject}</span>
                  </td>
                  <td className="py-4 px-2 text-center font-mono text-neutral-500">{adv.valA}</td>
                  <td className="py-4 px-2 text-center font-mono text-neutral-500">{adv.valB}</td>
                  <td className="py-4 px-2 text-center font-mono text-neutral-500">{adv.valC}</td>
                  <td className="py-4 px-2 text-center font-black text-amber-500 bg-amber-500/[0.02]">{adv.valHybrid}</td>
                  <td className="py-4 px-2 text-right">
                    <span className={`px-2 py-0.5 rounded-md font-mono font-bold ${adv.deltaBest >= 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                      {adv.deltaBest >= 0 ? '+' : ''}{adv.deltaBest.toFixed(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PerformanceLedger;