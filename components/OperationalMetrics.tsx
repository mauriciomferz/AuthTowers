import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer 
} from 'recharts';
import { Timer, AlertTriangle, Zap } from 'lucide-react';

const PERFORMANCE_BENCHMARKS = [
  { metric: 'Read (ms)', OpenFGA: 5, Oso: 2, Gauth: 45 },
  { metric: 'Write (ms)', OpenFGA: 15, Oso: 5, Gauth: 120 },
  { metric: 'Cold Start', OpenFGA: 100, Oso: 50, Gauth: 300 },
];

const INTEGRATION_CHALLENGES = [
  {
    name: 'OpenFGA',
    color: 'text-purple-400',
    borderColor: 'border-purple-500/20',
    bg: 'bg-purple-500/5',
    challenges: ['High cognitive load for graph modeling', 'Tuple storage cost at scale', 'Strict schema migration requirements']
  },
  {
    name: 'Oso',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/20',
    bg: 'bg-cyan-500/5',
    challenges: ['Polar language learning curve', 'Data filtering integration complexity', 'Policy debugging overhead']
  },
  {
    name: 'Gauth_go',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/20',
    bg: 'bg-emerald-500/5',
    challenges: ['Significant ledger latency impact', 'HSM hardware dependency', 'Non-standard authentication flows']
  }
];

const OperationalMetrics: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* System Latency Benchmarks */}
      <div className="p-5 rounded-3xl bg-neutral-900/40 border border-white/5 relative overflow-hidden group/chart">
        <div className="flex items-center gap-2 mb-6">
          <Timer size={16} className="text-blue-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">System Latency (Lower is Better)</span>
        </div>
        <div className="h-[200px] w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={PERFORMANCE_BENCHMARKS} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
              <XAxis type="number" stroke="#666" fontSize={10} tickFormatter={(val) => `${val}ms`} />
              <YAxis dataKey="metric" type="category" stroke="#888" fontSize={10} width={80} tick={{fill: '#888'}} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#333', borderRadius: '12px' }}
                itemStyle={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}
                labelStyle={{ color: '#888', marginBottom: '8px', fontSize: '10px', textTransform: 'uppercase' }}
                cursor={{fill: 'rgba(255,255,255,0.03)'}}
              />
              <Bar dataKey="OpenFGA" fill="#A855F7" radius={[0, 4, 4, 0]} barSize={8} />
              <Bar dataKey="Oso" fill="#06B6D4" radius={[0, 4, 4, 0]} barSize={8} />
              <Bar dataKey="Gauth" fill="#10B981" radius={[0, 4, 4, 0]} barSize={8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4 border-t border-white/5 pt-4">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500"></div><span className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider">OpenFGA</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-cyan-500"></div><span className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider">Oso</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider">Gauth_go</span></div>
        </div>
      </div>

      {/* Integration Friction Analysis */}
      <div className="space-y-3">
         <div className="flex items-center gap-2 mb-2 px-2">
          <AlertTriangle size={14} className="text-amber-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Integration Friction Analysis</span>
        </div>
        {INTEGRATION_CHALLENGES.map((framework, i) => (
          <div key={i} className={`p-4 rounded-2xl border ${framework.borderColor} ${framework.bg} flex flex-col justify-center transition-all hover:scale-[1.02]`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] font-black uppercase tracking-widest ${framework.color}`}>{framework.name}</span>
              <AlertTriangle size={12} className={`${framework.color} opacity-60`} />
            </div>
            <ul className="space-y-1.5">
              {framework.challenges.map((c, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[10px] text-neutral-400 leading-tight">
                  <span className={`mt-1 w-1 h-1 rounded-full ${framework.color} opacity-50 flex-shrink-0`} />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OperationalMetrics;