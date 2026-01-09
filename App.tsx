import React, { useState, useEffect, useRef } from 'react';
import { TowerData, TowerType } from './types';
import { TOWERS } from './constants';
import TowerCard from './components/TowerCard';
import ComparisonChart from './components/ComparisonChart';
import AuthConsultant from './components/AuthConsultant';
import GanttChart from './components/GanttChart';
import { generateInfographicImage } from './services/gemini';
import { 
  LayoutGrid, Sparkles, MessageSquare, Info, Github, Layers, Loader2, Network, 
  Cpu, ShieldCheck, Terminal, Database, Activity, Ruler, Box, Calendar, 
  Settings, X, Key, Zap, BrainCircuit, CpuCore, ChevronRight, Binary, 
  Fingerprint, Eye, Compass, MousePointer2, Grid3X3, Globe, Share2, Workflow
} from 'lucide-react';

const App: React.FC = () => {
  const [selectedTower, setSelectedTower] = useState<TowerData>(TOWERS[0]);
  const [infographicUrl, setInfographicUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState('Initializing');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Model state with persistence
  const [textModel, setTextModel] = useState(() => {
    return localStorage.getItem('auth_towers_text_model') || 'gemini-3-pro-preview';
  });
  const [imageModel, setImageModel] = useState(() => {
    return localStorage.getItem('auth_towers_image_model') || 'gemini-2.5-flash-image';
  });

  const containerRef = useRef<HTMLDivElement>(null);

  // Persistence effect
  useEffect(() => {
    localStorage.setItem('auth_towers_text_model', textModel);
  }, [textModel]);

  useEffect(() => {
    localStorage.setItem('auth_towers_image_model', imageModel);
  }, [imageModel]);

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
    
    const phases = [
      'Deconstructing Paradigms', 
      'Mapping Relationship Graphs', 
      'Synthesizing Polar Logic', 
      'Validating Fiduciary Chains',
      'Final Render Assembly'
    ];
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
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
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
            <a href="#comparison" className="hover:text-white transition-colors">Comparison</a>
            <a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a>
            <a href="#consultant" className="hover:text-white transition-colors">Consultant</a>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-neutral-400 hover:text-white transition-all"
              aria-label="Settings"
            >
              <Settings size={18} />
            </button>
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-semibold transition-all flex items-center gap-2">
              <Github size={14} /> Source
            </button>
          </div>
        </div>
      </nav>

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
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                    <Terminal size={14} className="text-blue-500" /> Advisory Intelligence
                  </label>
                  {textModel.includes('pro') && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[8px] font-bold text-blue-400 uppercase tracking-widest">Complex Reasoning</span>
                  )}
                </div>
                <div className="relative group/select">
                  <select 
                    value={textModel}
                    onChange={(e) => setTextModel(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/10 rounded-2xl px-5 py-4 text-sm text-neutral-200 focus:outline-none focus:ring-1 focus:ring-blue-500/50 appearance-none cursor-pointer hover:border-white/20 transition-all pr-12 shadow-inner"
                  >
                    <optgroup label="Advanced Reasoning (Recommended)">
                      <option value="gemini-3-pro-preview">Gemini 3 Pro (Deep Logic & Grounding)</option>
                    </optgroup>
                    <optgroup label="High Performance">
                      <option value="gemini-3-flash-preview">Gemini 3 Flash (Fast & Capable)</option>
                      <option value="gemini-flash-lite-latest">Gemini Flash Lite (Maximum Speed)</option>
                    </optgroup>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 group-hover/select:text-neutral-300 transition-colors">
                    <ChevronRight size={16} className="rotate-90" />
                  </div>
                </div>
                <p className="text-[9px] text-neutral-500 italic px-2">
                  {textModel === 'gemini-3-pro-preview' 
                    ? "Oracle utilizes Deep Thinking (Reasoning) and Google Search grounding for accurate security advice." 
                    : "Optimized for fast responses without grounding tools."}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                    <Zap size={14} className="text-purple-500" /> Neural Visualizer
                  </label>
                  {imageModel.includes('pro') && (
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[8px] font-bold text-purple-400 uppercase tracking-widest">High Fidelity</span>
                  )}
                </div>
                <div className="relative group/select">
                  <select 
                    value={imageModel}
                    onChange={(e) => setImageModel(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/10 rounded-2xl px-5 py-4 text-sm text-neutral-200 focus:outline-none focus:ring-1 focus:ring-blue-500/50 appearance-none cursor-pointer hover:border-white/20 transition-all pr-12 shadow-inner"
                  >
                    <option value="gemini-2.5-flash-image">Gemini 2.5 Flash Image (Standard)</option>
                    <option value="gemini-3-pro-image-preview">Gemini 3 Pro Image (4K Architectural Renders)</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 group-hover/select:text-neutral-300 transition-colors">
                    <ChevronRight size={16} className="rotate-90" />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-8 py-6 bg-white/5 border-t border-white/5">
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="w-full py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all active:scale-[0.98] shadow-[0_10px_30_rgba(255,255,255,0.1)]"
              >
                Sync Architectural Mesh
              </button>
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
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tighter">
              Navigating the <br />
              <span className="text-neutral-500">Modern Auth Stack.</span>
            </h1>
            <p className="text-lg text-neutral-400 max-w-lg mb-10 leading-relaxed font-light">
              Authorization has evolved beyond simple roles. Explore the three distinct paradigms shaping complex security architectures today: Relationships, Logic, and Agency.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a href="#towers" className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 active:scale-95 transition-all flex items-center gap-2 shadow-xl shadow-white/5">Explore Towers</a>
              <button 
                onClick={handleGenerateImage}
                disabled={isGenerating}
                className="px-8 py-3 bg-neutral-900 border border-white/10 text-white font-bold rounded-xl active:scale-95 transition-all flex items-center gap-2 overflow-hidden relative group"
              >
                <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-0"></div>
                <span className="relative z-10 flex items-center gap-2">
                  {isGenerating ? <><Loader2 className="animate-spin" size={18} /> Projecting...</> : <><Sparkles size={18} /> Render Blueprint</>}
                </span>
              </button>
            </div>
          </div>
          
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative group min-h-[400px]"
          >
            {infographicUrl && !isGenerating ? (
              <img src={infographicUrl} alt="Infographic" className="w-full aspect-[16/9] object-cover rounded-3xl border border-white/10 shadow-2xl transition-all group-hover:scale-[1.01]" />
            ) : isGenerating ? (
              /* ENHANCED ARCHITECTURAL BLUEPRINT ASSEMBLY */
              <div className="w-full aspect-[16/9] bg-[#020617] rounded-3xl border border-blue-500/30 overflow-hidden relative flex flex-col items-center justify-center shadow-2xl shadow-blue-500/10">
                {/* Parallax Background Grid */}
                <div 
                  className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 transition-transform duration-[2000ms] ease-out pointer-events-none"
                  style={{ transform: `perspective(1200px) rotateX(55deg) translateY(${mousePos.y * 70}px) translateX(${mousePos.x * 70}px) scale(1.6)` }}
                ></div>
                
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_25px_#22d3ee] animate-scan z-30"></div>
                
                {/* Parallax Morphing Blobs */}
                <div className="absolute inset-0 z-10 opacity-30 pointer-events-none overflow-hidden">
                  <div 
                    className="absolute top-[10%] left-[10%] w-64 h-64 bg-purple-600/40 blur-[100px] animate-morph transition-transform duration-1000"
                    style={{ transform: `translate(${mousePos.x * -100}px, ${mousePos.y * -100}px)` }}
                  ></div>
                  <div 
                    className="absolute bottom-[10%] right-[10%] w-64 h-64 bg-cyan-600/40 blur-[100px] animate-morph transition-transform duration-1000" 
                    style={{ animationDelay: '2s', transform: `translate(${mousePos.x * 80}px, ${mousePos.y * 80}px)` }}
                  ></div>
                  <div 
                    className="absolute top-[40%] left-[45%] w-48 h-48 bg-emerald-600/40 blur-[100px] animate-morph transition-transform duration-1000" 
                    style={{ animationDelay: '4s', transform: `translate(${mousePos.x * 40}px, ${mousePos.y * -60}px)` }}
                  ></div>
                </div>

                <div className="relative w-full h-full flex items-center justify-center z-20">
                  <svg className="w-full h-full max-w-[600px] absolute overflow-visible" viewBox="0 0 400 225">
                    <defs>
                      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                      <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                        <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Pulsating Light Beams (Connections) */}
                    <g className="opacity-40" filter="url(#glow)">
                      <path d="M120 160 L280 160" stroke="url(#beamGradient)" strokeWidth="1" fill="none" className="animate-dash-scroll" style={{ strokeDasharray: '20, 20' }} />
                      <path d="M120 160 L200 60" stroke="url(#beamGradient)" strokeWidth="1" fill="none" className="animate-dash-scroll" style={{ strokeDasharray: '15, 25', animationDelay: '0.5s' }} />
                      <path d="M280 160 L200 60" stroke="url(#beamGradient)" strokeWidth="1" fill="none" className="animate-dash-scroll" style={{ strokeDasharray: '25, 15', animationDelay: '1s' }} />
                    </g>

                    {/* Data Flow Particles */}
                    <circle r="2" fill="#3b82f6" filter="url(#glow)">
                      <animateMotion dur="4s" repeatCount="indefinite" path="M120 160 L280 160" />
                    </circle>
                    <circle r="2" fill="#a855f7" filter="url(#glow)">
                      <animateMotion dur="3s" repeatCount="indefinite" path="M280 160 L200 60" />
                    </circle>
                    <circle r="2" fill="#10b981" filter="url(#glow)">
                      <animateMotion dur="5s" repeatCount="indefinite" path="M200 60 L120 160" />
                    </circle>

                    {/* Framework Nodes */}
                    <g transform="translate(120, 160)">
                      <circle r="5" className="fill-purple-500/20 stroke-purple-500 animate-pulse" strokeWidth="1" />
                      <circle r="2" className="fill-white" />
                      <text y="15" textAnchor="middle" className="text-[6px] fill-purple-400 font-bold uppercase tracking-widest">RELATION</text>
                    </g>
                    <g transform="translate(280, 160)">
                      <circle r="5" className="fill-cyan-500/20 stroke-cyan-500 animate-pulse" strokeWidth="1" style={{ animationDelay: '1s' }} />
                      <circle r="2" className="fill-white" />
                      <text y="15" textAnchor="middle" className="text-[6px] fill-cyan-400 font-bold uppercase tracking-widest">LOGIC</text>
                    </g>
                    <g transform="translate(200, 60)">
                      <circle r="5" className="fill-emerald-500/20 stroke-emerald-500 animate-pulse" strokeWidth="1" style={{ animationDelay: '2s' }} />
                      <circle r="2" className="fill-white" />
                      <text y="-10" textAnchor="middle" className="text-[6px] fill-emerald-400 font-bold uppercase tracking-widest">AGENCY</text>
                    </g>

                    <g className="animate-rotate-slow" style={{ transformOrigin: '200px 112px' }}>
                      <circle cx="200" cy="112" r="85" fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="2 10" className="opacity-40" />
                      <circle cx="200" cy="112" r="100" fill="none" stroke="#a855f7" strokeWidth="0.5" strokeDasharray="5 15" className="opacity-20" />
                    </g>
                    
                    <g fill="none" strokeWidth="1" className="opacity-70">
                      <path d="M200 60 L240 112 L200 164 L160 112 Z" stroke="#3b82f6" className="animate-draw" />
                    </g>
                  </svg>
                  
                  <div className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none">
                    <div className="flex justify-between items-start">
                      <div className="mono text-[8px] text-blue-400/60 animate-terminal space-y-1 bg-black/40 p-2 rounded-lg backdrop-blur-sm border border-white/5">
                        <div className="flex items-center gap-1.5"><CpuCore size={8} /> ENGINE: {imageModel.toUpperCase()}</div>
                        <div className="text-purple-400 flex items-center gap-1.5"><Workflow size={8} /> REL_GRAPH: MAPPING_NODES...</div>
                        <div className="text-emerald-400 flex items-center gap-1.5"><Share2 size={8} /> FEDERATION: SYNCING...</div>
                      </div>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                      <div className="relative bg-black/70 backdrop-blur-2xl px-10 py-6 rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.15)] flex flex-col items-center">
                        <div className="flex items-center gap-2 mb-3">
                           <Loader2 className="animate-spin text-blue-500" size={14} />
                           <h3 className="text-white font-black text-xl tracking-tight uppercase leading-none">
                            {loadingPhase}
                          </h3>
                        </div>
                        <div className="w-64 h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                           <div className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-600 animate-[draw-line_3s_infinite_ease-in-out]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full aspect-[16/9] bg-neutral-900 rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center text-neutral-500 text-sm gap-4 transition-colors hover:border-white/20">
                <LayoutGrid size={48} className="opacity-20 animate-pulse-slow" />
                <p className="font-medium tracking-tight">Architectural Visualizer Offline</p>
                <button 
                  onClick={handleGenerateImage} 
                  className="group text-xs bg-white text-black font-bold px-6 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all transform active:scale-95 shadow-xl shadow-white/5"
                >
                  Activate Render Engine
                </button>
              </div>
            )}
          </div>
        </section>

        <section id="towers" className="mb-32">
          <div className="flex items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <div className="w-1.5 h-8 bg-blue-500 rounded-full"></div>
                The Three Framework Towers
              </h2>
              <p className="text-neutral-500">Each approach offers unique tradeoffs in scalability and legal agency.</p>
            </div>
          </div>
          <div 
            className="grid md:grid-cols-3 gap-6"
            role="radiogroup"
            aria-label="Authorization Framework Towers"
          >
            {TOWERS.map(tower => (
              <TowerCard key={tower.id} tower={tower} isActive={selectedTower.id === tower.id} onSelect={setSelectedTower} />
            ))}
          </div>
        </section>

        <section id="comparison" className="mb-32 grid md:grid-cols-2 gap-16 items-start">
          <div className="sticky top-32">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <div className="w-1.5 h-8 bg-purple-500 rounded-full"></div>
              Comparative Vectors
            </h2>
            <p className="text-neutral-400 mb-6 leading-relaxed">
              Visualizing technical dimensions across performance, flexibility, and compliance needs. Modern architectures often mix these towers for defense-in-depth, layering logic with relationships.
            </p>
            <p className="text-neutral-400 mb-8 leading-relaxed font-light border-l-2 border-white/5 pl-6 italic">
              Composing these frameworks allows for a superior multi-layered security posture. While OpenFGA excels at planetary-scale relationship graphs, Oso provides the granular logic gates necessary for real-time attribute evaluation.
            </p>
            <div className="space-y-4">
               {[
                 { label: 'Zanzibar Scalability', color: 'bg-purple-500', val: 95 },
                 { label: 'Logic Expressiveness', color: 'bg-cyan-500', val: 90 },
                 { label: 'Liability Verification', color: 'bg-emerald-500', val: 98 }
               ].map(item => (
                 <div key={item.label} className="p-4 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors">
                   <div className="flex justify-between items-center mb-2">
                     <div className="font-bold text-xs uppercase tracking-widest">{item.label}</div>
                     <div className="text-xs mono opacity-60">{item.val}%</div>
                   </div>
                   <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                     <div className={`h-full ${item.color} transition-all duration-1000`} style={{ width: `${item.val}%` }}></div>
                   </div>
                 </div>
               ))}
            </div>
          </div>
          <div className="bg-neutral-900/40 p-2 rounded-[2rem] border border-white/5 shadow-2xl">
            <ComparisonChart />
          </div>
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
            <div className="h-4 w-px bg-white/10"></div>
            <span className="font-bold text-neutral-400">AuthTowers</span>
          </div>
          <p>© 2025 AuthTowers Architectural Group. All security systems operational.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;