import React, { useState, useEffect, useRef } from 'react';
import { TowerData, TowerType } from './types';
import { TOWERS } from './constants';
import TowerCard from './components/TowerCard';
import VectorRadar from './components/VectorRadar';
import PerformanceLedger from './components/PerformanceLedger';
import OperationalMetrics from './components/OperationalMetrics';
import AuthConsultant from './components/AuthConsultant';
import GanttChart from './components/GanttChart';
import ComparisonModal from './components/ComparisonModal';
import AggregateIndex from './components/AggregateIndex';
import HybridAnalysis from './components/HybridAnalysis';
import { generateInfographicImage } from './services/gemini';
import { 
  LayoutGrid, Sparkles, MessageSquare, Info, Github, Layers, Loader2, Network, 
  Cpu, ShieldCheck, Terminal, Database, Activity, Ruler, Box, Calendar, 
  Settings, X, Key, Zap, BrainCircuit, ChevronRight, Binary, 
  Fingerprint, Eye, Compass, MousePointer2, Grid3X3, Globe, Share2, Workflow, GitMerge,
  ArrowRightLeft
} from 'lucide-react';

const App: React.FC = () => {
  const [selectedTower, setSelectedTower] = useState<TowerData>(TOWERS[0]);
  const [infographicUrl, setInfographicUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState('Initializing');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  
  const [textModel, setTextModel] = useState(() => localStorage.getItem('auth_towers_text_model') || 'gemini-3-pro-preview');
  const [imageModel, setImageModel] = useState(() => localStorage.getItem('auth_towers_image_model') || 'gemini-2.5-flash-image');

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { localStorage.setItem('auth_towers_text_model', textModel); }, [textModel]);
  useEffect(() => { localStorage.setItem('auth_towers_image_model', imageModel); }, [imageModel]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleGenerateImage = async () => {
    if (imageModel === 'gemini-3-pro-image-preview') {
      // @ts-ignore
      const hasKey = await window.aistudio?.hasSelectedApiKey?.();
      if (!hasKey) {
        // @ts-ignore
        await window.aistudio?.openSelectKey?.();
      }
    }
    setIsGenerating(true);
    setLoadingPhase('Parsing Architecture');
    const phases = ['Deconstructing Paradigms', 'Mapping Relationship Graphs', 'Synthesizing Polar Logic', 'Validating Fiduciary Chains', 'Final Render Assembly'];
    let phaseIdx = 0;
    const phaseInterval = setInterval(() => {
      phaseIdx = (phaseIdx + 1) % phases.length;
      setLoadingPhase(phases[phaseIdx]);
    }, 2000);
    const prompt = `A professional, high-tech architectural infographic comparing three authorization frameworks as futuristic towers. Tower 1 (OpenFGA): A complex glowing neural network graph representing massive-scale relationship tuples and hierarchy. Tower 2 (Oso): A sleek logic engine with illuminated gears and code brackets, representing dynamic policy-as-code and Polar logic. Tower 3 (Gauth_go): A digital legal seal with a glowing power-of-attorney contract and an AI-human handshake silhouette, representing fiduciary duty and legal liability. The environment is a clean, dark minimalist digital landscape with subtle blue and green lighting. Labels: 'RELATIONSHIPS', 'LOGIC', 'AGENCY'. High resolution, isometric 3D render.`;
    const url = await generateInfographicImage(prompt, imageModel);
    clearInterval(phaseInterval);
    if (url) setInfographicUrl(url);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden selection:bg-blue-500/30">
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <nav className="sticky top-0 z-50 px-6 py-4 backdrop-blur-md border-b border-white/5 bg-black/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Layers size={18} className="text-white" />
            </div>
            <span className="font-bold tracking-tight text-xl bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
              Auth<span className="text-blue-500">Towers</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            <a href="#towers" className="hover:text-white transition-colors">Towers</a>
            <a href="#vectors" className="hover:text-white transition-colors">Vectors</a>
            <a href="#performance" className="hover:text-white transition-colors">Performance</a>
            <a href="#operations" className="hover:text-white transition-colors">Operations</a>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsComparisonOpen(true)}
              className="hidden sm:flex px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold transition-all items-center gap-2"
            >
              <ArrowRightLeft size={14} /> Compare Frameworks
            </button>
            <button onClick={() => setIsSettingsOpen(true)} className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-neutral-400 hover:text-white transition-all">
              <Settings size={18} />
            </button>
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-semibold transition-all flex items-center gap-2">
              <Github size={14} /> Source
            </button>
          </div>
        </div>
      </nav>

      {/* Comparison Modal */}
      <ComparisonModal 
        isOpen={isComparisonOpen} 
        onClose={() => setIsComparisonOpen(false)} 
      />

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-[0_20px_100px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-500/20 rounded-2xl text-blue-400 border border-blue-500/20">
                  <BrainCircuit size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight text-white uppercase">Engine Specs</h2>
                  <p className="text-[9px] text-neutral-500 uppercase tracking-widest font-mono">System Parameters v2.0</p>
                </div>
              </div>
              <button onClick={() => setIsSettingsOpen(false)} className="p-2.5 text-neutral-500 hover:text-white transition-colors hover:bg-white/5 rounded-full">
                <X size={20} />
              </button>
            </div>
            <div className="p-8 space-y-8">
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-[10px] font-black text-neutral-400 uppercase tracking-widest"><Terminal size={14} className="text-blue-500" /> Advisory Intelligence</label>
                <select value={textModel} onChange={(e) => setTextModel(e.target.value)} className="w-full bg-neutral-900 border border-white/10 rounded-2xl px-5 py-4 text-sm text-neutral-200 focus:outline-none appearance-none cursor-pointer hover:border-white/20 transition-all shadow-inner">
                  <option value="gemini-3-pro-preview">Gemini 3 Pro (Deep Logic & Grounding)</option>
                  <option value="gemini-3-flash-preview">Gemini 3 Flash (Fast & Capable)</option>
                </select>
              </div>
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-[10px] font-black text-neutral-400 uppercase tracking-widest"><Zap size={14} className="text-purple-500" /> Neural Visualizer</label>
                <select value={imageModel} onChange={(e) => setImageModel(e.target.value)} className="w-full bg-neutral-900 border border-white/10 rounded-2xl px-5 py-4 text-sm text-neutral-200 focus:outline-none appearance-none cursor-pointer hover:border-white/20 transition-all shadow-inner">
                  <option value="gemini-2.5-flash-image">Gemini 2.5 Flash Image (Standard)</option>
                  <option value="gemini-3-pro-image-preview">Gemini 3 Pro Image (4K Architectural Renders)</option>
                </select>
              </div>
            </div>
            <div className="px-8 py-6 bg-white/5 border-t border-white/5">
              <button onClick={() => setIsSettingsOpen(false)} className="w-full py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all shadow-xl">Sync Architectural Mesh</button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 pt-12">
        <section className="mb-24 text-center md:text-left grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold tracking-widest uppercase mb-6">
              <Sparkles size={12} /> The Future of Authorization
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tighter">Navigating the <br /><span className="text-neutral-500">Modern Auth Stack.</span></h1>
            <p className="text-lg text-neutral-400 max-w-lg mb-10 leading-relaxed font-light">Authorization has evolved beyond simple roles. Explore the three distinct paradigms shaping complex security architectures today: Relationships, Logic, and Agency.</p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a href="#towers" className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 active:scale-95 transition-all flex items-center gap-2 shadow-xl shadow-white/5">Explore Towers</a>
              <button onClick={handleGenerateImage} disabled={isGenerating} className="px-8 py-3 bg-neutral-900 border border-white/10 text-white font-bold rounded-xl active:scale-95 transition-all flex items-center gap-2 group overflow-hidden relative">
                <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-0" />
                <span className="relative z-10 flex items-center gap-2">
                  {isGenerating ? <><Loader2 className="animate-spin" size={18} /> Projecting...</> : <><Sparkles size={18} /> Render Blueprint</>}
                </span>
              </button>
            </div>
          </div>
          
          <div ref={containerRef} onMouseMove={handleMouseMove} className="relative group min-h-[400px]">
            {infographicUrl && !isGenerating ? (
              <img src={infographicUrl} alt="Infographic" className="w-full aspect-[16/9] object-cover rounded-3xl border border-white/10 shadow-2xl transition-all group-hover:scale-[1.01]" />
            ) : isGenerating ? (
              <div className="w-full aspect-[16/9] bg-[#020617] rounded-3xl border border-blue-500/30 overflow-hidden relative flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" style={{ transform: `perspective(1200px) rotateX(55deg) translateY(${mousePos.y * 70}px) translateX(${mousePos.x * 70}px) scale(1.6)` }} />
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_25px_#22d3ee] animate-scan z-30" />
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <Loader2 className="animate-spin text-blue-500" size={32} />
                  <h3 className="text-white font-black text-xl tracking-tight uppercase leading-none">{loadingPhase}</h3>
                </div>
              </div>
            ) : (
              <div className="w-full aspect-[16/9] bg-neutral-900 rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center text-neutral-500 text-sm gap-4">
                <LayoutGrid size={48} className="opacity-20 animate-pulse-slow" />
                <p className="font-medium tracking-tight">Architectural Visualizer Offline</p>
                <button onClick={handleGenerateImage} className="text-xs bg-white text-black font-bold px-6 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all transform active:scale-95 shadow-xl shadow-white/5">Activate Render Engine</button>
              </div>
            )}
          </div>
        </section>

        <section id="towers" className="mb-32">
          <div className="flex items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <div className="w-1.5 h-8 bg-blue-500 rounded-full" />
                The Three Framework Towers
              </h2>
              <p className="text-neutral-500">Each approach offers unique tradeoffs in scalability and legal agency.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6" role="radiogroup" aria-label="Authorization Framework Towers">
            {TOWERS.map(tower => (
              <TowerCard key={tower.id} tower={tower} isActive={selectedTower.id === tower.id} onSelect={setSelectedTower} />
            ))}
          </div>
        </section>

        {/* Global Aggregate Metrics */}
        <section className="mb-32">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-3 uppercase tracking-tighter">
              <div className="w-1.5 h-8 bg-amber-500 rounded-full" />
              Aggregate System Index
            </h2>
            <p className="text-neutral-500">Consolidated health and performance vectors across the orchestrated mesh.</p>
          </div>
          <AggregateIndex />
        </section>

        <section id="vectors" className="mb-32 grid md:grid-cols-2 gap-16 items-start">
          <div className="sticky top-32 space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <div className="w-1.5 h-8 bg-purple-500 rounded-full" />
                Architectural Vectors
              </h2>
              <p className="text-neutral-400 mb-6 leading-relaxed">Visualizing technical dimensions across performance, flexibility, and compliance needs. Modern architectures often mix these towers for defense-in-depth, layering logic with relationships.</p>
            </div>
            
            <HybridAnalysis />
          </div>
          <div className="bg-neutral-900/40 p-2 rounded-[2rem] border border-white/5 shadow-2xl">
            <VectorRadar />
          </div>
        </section>

        <section id="performance" className="mb-32">
          <div className="text-center mb-12">
             <h2 className="text-3xl font-bold mb-2 uppercase tracking-tighter">Deep Differential Deep-Dive</h2>
             <p className="text-neutral-500">Numerical breakdown of framework capacity across the primary authorization mesh.</p>
          </div>
          <PerformanceLedger />
        </section>

        <section id="operations" className="mb-32">
          <div className="text-center mb-12">
             <h2 className="text-3xl font-bold mb-2 uppercase tracking-tighter">Operational Constraints</h2>
             <p className="text-neutral-500">Real-world benchmarks and integration friction indicators for Day 2 operations.</p>
          </div>
          <OperationalMetrics />
        </section>

        <section id="roadmap" className="mb-32">
           <GanttChart />
        </section>

        <section id="consultant" className="mb-32 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold tracking-widest uppercase mb-4">
              <Activity size={12} /> Expert Consultation
            </div>
            <h2 className="text-4xl font-black tracking-tight mb-4 uppercase">The Auth Oracle</h2>
            <p className="text-neutral-400 max-w-xl mx-auto">Input technical constraints and scaling requirements using <span className="text-blue-400 font-mono">{textModel}</span>.</p>
          </div>
          <AuthConsultant textModel={textModel} />
        </section>

        <footer className="border-t border-white/5 pt-12 text-center text-neutral-600 text-sm">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Layers size={24} className="opacity-20" />
            <div className="h-4 w-px bg-white/10" />
            <span className="font-bold text-neutral-400">AuthTowers</span>
          </div>
          <p>© 2025 AuthTowers Architectural Group. All security systems operational.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;