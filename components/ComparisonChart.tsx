import React, { useState, useEffect } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';
import { RADAR_DATA } from '../constants';
import { 
  TrendingUp, Zap, Target, BarChart3, ShieldCheck, Cpu, Network, 
  ArrowUpRight, Gauge, AlertTriangle, Timer, Loader2, Table as TableIcon,
  ChevronRight, Info
} from 'lucide-react';

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
    challenges: [
      'High cognitive load for graph modeling',
      'Tuple storage cost at scale',
      'Strict schema migration requirements'
    ]
  },
  {
    name: 'Oso',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/20',
    bg: 'bg-cyan-500/5',
    challenges: [
      'Polar language learning curve',
      'Data filtering integration complexity',
      'Policy debugging overhead'
    ]
  },
  {
    name: 'Gauth_go',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/20',
    bg: 'bg-emerald-500/5',
    challenges: [
      'Significant ledger latency impact',
      'Hardware Security Module (HSM) dependency',
      'Non-standard authentication flows'
    ]
  }
];

const ComparisonChart: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate complex calculation/fetching delay
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  // Calculate aggregate metrics for the Hybrid series (D) vs Others (A, B, C)
  const calculateMetrics = () => {
    const totalD = RADAR_DATA.reduce((acc, curr) => acc + curr.D, 0);
    const sumOfAverages = RADAR_DATA.reduce((acc, curr) => acc + (curr.A + curr.B + curr.C) / 3, 0);
    const totalPercentageLift = ((totalD - sumOfAverages) / sumOfAverages) * 100;

    // Detailed category-specific advantages
    const advantages = RADAR_DATA.map(item => {
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

    return { totalD, sumOfAverages, percentageLift: totalPercentageLift, advantages };
  };

  const metrics = calculateMetrics();

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

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500">
        {/* Radar Chart Skeleton with Scanning Effect */}
        <div className="w-full h-[450px] bg-neutral-900/30 p-4 rounded-3xl border border-white/5 relative group overflow-hidden flex flex-col items-center justify-center">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          
          <div className="absolute top-4 left-6 flex items-center gap-2 z-10 opacity-50">
            <Loader2 size={16} className="text-neutral-500 animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600">Calibrating Vector Matrix...</span>
          </div>

          <div className="relative w-72 h-72 rounded-full border border-white/5 flex items-center justify-center">
            {/* Pulsating Rings */}
            <div className="absolute inset-0 rounded-full border border-white/5 animate-ping opacity-20 duration-[3000ms]"></div>
            <div className="absolute inset-4 rounded-full border border-white/5 animate-ping opacity-20 duration-[2000ms] delay-500"></div>
            <div className="absolute inset-12 rounded-full border border-white/5 animate-ping opacity-20 duration-[1500ms] delay-1000"></div>
            
            {/* Scanning Radar Sweep */}
            <div className="w-full h-full rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_180deg,rgba(59,130,246,0.1)_360deg)] animate-spin opacity-50"></div>
            
            {/* Center Grid */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-px h-full bg-white/5"></div>
              <div className="h-px w-full bg-white/5 absolute"></div>
            </div>
            
            <div className="absolute flex flex-col items-center gap-2">
              <span className="text-[10px] font-mono text-blue-500 animate-pulse">PROCESSING DATA POINTS</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-purple-500 rounded-full animate-bounce delay-0"></div>
                <div className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Aggregate Overview Skeleton */}
        <div className="h-[88px] w-full rounded-2xl bg-neutral-900/30 border border-white/5 animate-pulse relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
        </div>

        {/* Detailed Metrics Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 h-[120px] flex flex-col justify-between relative overflow-hidden">
               {/* Shimmer effect */}
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" style={{animationDelay: `${idx * 0.1}s`}}></div>
               
               <div className="flex items-center gap-2 mb-3">
                 <div className="w-3 h-3 rounded-full bg-white/10"></div>
                 <div className="w-16 h-2 rounded bg-white/10"></div>
               </div>
               
               <div className="w-12 h-6 rounded bg-white/10 mb-2"></div>
               <div className="w-full h-1 rounded bg-white/5 mt-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="w-full h-[450px] bg-neutral-900/30 p-4 rounded-3xl border border-white/5 relative group overflow-hidden">
        {/* Decorative Grid Pulse background */}
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
            <Radar
              name="OpenFGA (ReBAC)"
              dataKey="A"
              stroke="#A855F7"
              fill="#A855F7"
              fillOpacity={0.1}
              isAnimationActive={true}
              animationBegin={200}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
            <Radar
              name="Oso (Logic)"
              dataKey="B"
              stroke="#06B6D4"
              fill="#06B6D4"
              fillOpacity={0.1}
              isAnimationActive={true}
              animationBegin={400}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
            <Radar
              name="Gauth_go (Agency)"
              dataKey="C"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.1}
              isAnimationActive={true}
              animationBegin={600}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
            <Radar
              name="Hybrid (Orchestrated)"
              dataKey="D"
              stroke="#F59E0B"
              fill="#F59E0B"
              fillOpacity={0.25}
              strokeWidth={3}
              isAnimationActive={true}
              animationBegin={800}
              animationDuration={2000}
              animationEasing="cubic-bezier(0.34, 1.56, 0.64, 1)"
            />
            <Legend 
              wrapperStyle={{ 
                paddingTop: '20px', 
                fontSize: '9px', 
                textTransform: 'uppercase', 
                letterSpacing: '0.15em',
                fontWeight: 700,
                color: '#555'
              }} 
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Aggregate Performance Overview */}
      <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-between group hover:bg-amber-500/10 transition-all cursor-default">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-500/20 rounded-xl text-amber-500 shadow-lg shadow-amber-500/10">
            <TrendingUp size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Aggregate Efficiency Lift</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-amber-500">+{metrics.percentageLift.toFixed(1)}%</span>
              <span className="text-[11px] text-neutral-400 font-medium">Composite Architectural Advantage</span>
            </div>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <span className="text-[9px] font-mono text-neutral-600 block uppercase">Benchmark Score</span>
          <span className="text-lg font-bold text-white tracking-tighter">{(metrics.totalD / RADAR_DATA.length).toFixed(1)} / 100</span>
        </div>
      </div>

      {/* Detailed Architectural Differential Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {metrics.advantages.map((adv, idx) => (
          <div 
            key={idx} 
            className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between hover:bg-white/[0.05] transition-all group cursor-default"
            style={{ animationDelay: `${(idx + 1) * 100}ms` }}
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
            
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-2 mb-1">
              <div 
                className="h-full bg-amber-500 transition-all duration-1000" 
                style={{ width: `${adv.valHybrid}%` }}
              ></div>
            </div>
            
            <span className="text-[8px] font-mono text-neutral-600 uppercase tracking-tighter text-right">
              {adv.percentAdvantage.toFixed(1)}% Better than avg
            </span>
          </div>
        ))}
      </div>

      {/* NEW: Performance Differential Ledger (Numeric Comparison) */}
      <div className="p-6 rounded-3xl bg-neutral-900/40 border border-white/5 relative overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TableIcon size={16} className="text-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Performance Differential Ledger</span>
          </div>
          <div className="flex items-center gap-1 text-[9px] text-neutral-500 font-mono italic">
            <Info size={10} />
            <span>Relative delta computed against the maximum performing alternate framework per category.</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[10px] text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-neutral-500 uppercase tracking-widest font-black">
                <th className="py-3 px-2 font-black">Category Vector</th>
                <th className="py-3 px-2 text-center text-purple-400/70">OpenFGA</th>
                <th className="py-3 px-2 text-center text-cyan-400/70">Oso</th>
                <th className="py-3 px-2 text-center text-emerald-400/70">Gauth_go</th>
                <th className="py-3 px-2 text-center text-amber-500 bg-amber-500/5 rounded-t-lg">Hybrid (D)</th>
                <th className="py-3 px-2 text-right">Architectural Alpha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {metrics.advantages.map((adv, idx) => (
                <tr key={idx} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-2 flex items-center gap-2">
                    {getSubjectIcon(adv.subject)}
                    <span className="font-bold text-neutral-300 group-hover:text-white transition-colors uppercase tracking-tight">{adv.subject}</span>
                  </td>
                  <td className="py-4 px-2 text-center font-mono text-neutral-500">{adv.valA}</td>
                  <td className="py-4 px-2 text-center font-mono text-neutral-500">{adv.valB}</td>
                  <td className="py-4 px-2 text-center font-mono text-neutral-500">{adv.valC}</td>
                  <td className="py-4 px-2 text-center font-black text-amber-500 bg-amber-500/[0.02] border-x border-white/5">{adv.valHybrid}</td>
                  <td className="py-4 px-2 text-right font-mono">
                    <span className={`px-2 py-0.5 rounded-md font-bold ${adv.deltaBest >= 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                      {adv.deltaBest >= 0 ? '+' : ''}{adv.deltaBest.toFixed(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-white/5 bg-white/[0.01]">
                <td className="py-4 px-2 font-black text-neutral-500 uppercase tracking-widest">Aggregate Index</td>
                <td className="py-4 px-2 text-center text-neutral-600 font-mono">{(RADAR_DATA.reduce((a, b) => a + b.A, 0) / 5).toFixed(1)}</td>
                <td className="py-4 px-2 text-center text-neutral-600 font-mono">{(RADAR_DATA.reduce((a, b) => a + b.B, 0) / 5).toFixed(1)}</td>
                <td className="py-4 px-2 text-center text-neutral-600 font-mono">{(RADAR_DATA.reduce((a, b) => a + b.C, 0) / 5).toFixed(1)}</td>
                <td className="py-4 px-2 text-center font-black text-amber-500 bg-amber-500/10 border-x border-white/10 rounded-b-lg">
                  {(metrics.totalD / 5).toFixed(1)}
                </td>
                <td className="py-4 px-2 text-right">
                   <div className="inline-flex items-center gap-1 px-2 py-1 bg-amber-500/20 text-amber-500 rounded-lg text-[9px] font-black uppercase tracking-tighter">
                     <TrendingUp size={10} /> Optimal Efficiency
                   </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Granular Performance & Integration Challenges Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Latency Benchmarks */}
        <div className="p-5 rounded-3xl bg-neutral-900/40 border border-white/5 relative overflow-hidden group/chart">
          <div className="flex items-center gap-2 mb-6">
            <Timer size={16} className="text-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">System Latency Benchmarks (Lower is Better)</span>
          </div>
          <div className="h-[200px] w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PERFORMANCE_BENCHMARKS} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                <XAxis type="number" stroke="#666" fontSize={10} tickFormatter={(val) => `${val}ms`} />
                <YAxis dataKey="metric" type="category" stroke="#888" fontSize={10} width={80} tick={{fill: '#888'}} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#333', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                  itemStyle={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}
                  labelStyle={{ color: '#888', marginBottom: '8px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
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

        {/* Right: Integration Friction Analysis */}
        <div className="space-y-3">
           <div className="flex items-center gap-2 mb-2 px-2">
            <AlertTriangle size={14} className="text-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Integration Friction Analysis</span>
          </div>
          {INTEGRATION_CHALLENGES.map((framework, i) => (
            <div key={i} className={`p-4 rounded-2xl border ${framework.borderColor} ${framework.bg} flex flex-col justify-center transition-all hover:scale-[1.02] hover:bg-opacity-20`}>
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

      <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/5 space-y-3 relative overflow-hidden group/analysis">
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover/analysis:opacity-20 transition-opacity">
          <Zap size={40} className="text-amber-500 animate-float" />
        </div>
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-amber-500 animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">Hybrid Advantage Analysis</span>
        </div>
        <p className="text-[11px] text-neutral-400 leading-relaxed font-light max-w-2xl">
          The <strong className="text-amber-500">Orchestrated Hybrid model</strong> (Series D) achieves a significantly higher stability index by smoothing the trade-offs between pure graph-traversal (OpenFGA) and pure logic evaluation (Oso). While individual frameworks peak in specific dimensions, the hybrid approach maintains a consistent <span className="text-white">85+ score</span> across all vectors, reducing architectural fragility and "Authorization Lock-in" in high-stakes enterprise deployments.
        </p>
      </div>
    </div>
  );
};

export default ComparisonChart;