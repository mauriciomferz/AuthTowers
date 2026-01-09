
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, ExternalLink, Globe } from 'lucide-react';
import { getAuthAdvice } from '../services/gemini';
import { ChatMessage } from '../types';

interface AuthConsultantProps {
  textModel: string;
}

interface EnhancedChatMessage extends ChatMessage {
  sources?: { title: string; uri: string }[];
}

const AuthConsultant: React.FC<AuthConsultantProps> = ({ textModel }) => {
  const [messages, setMessages] = useState<EnhancedChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: EnhancedChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const response = await getAuthAdvice(input, history, textModel);
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: response.text,
      sources: response.sources 
    }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[600px] border border-white/10 rounded-2xl bg-neutral-900/50 backdrop-blur-md overflow-hidden shadow-2xl">
      <div className="p-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm">Auth Oracle</h3>
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Architectural Advisory AI</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {textModel.includes('pro') && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[8px] font-bold text-emerald-400 uppercase tracking-tighter">
              <Globe size={10} /> Grounding Active
            </div>
          )}
          <div className="px-2 py-1 rounded border border-white/10 bg-black/40 text-[9px] font-mono text-neutral-500">
            ENGINE: {textModel}
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center px-8 opacity-40">
            <div className="p-4 rounded-full bg-white/5 mb-4 animate-pulse">
              <Bot className="w-12 h-12 text-blue-400" />
            </div>
            <p className="text-sm font-medium mb-1">Architectural Consultation Ready.</p>
            <p className="text-xs text-neutral-500 max-w-[280px]">Ask about ReBAC hierarchies, Polar logic optimization, or Gauth_go fiduciary chains.</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`flex-shrink-0 mt-1 p-2 rounded-xl h-fit ${msg.role === 'user' ? 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/10' : 'bg-white/10 text-neutral-300 border border-white/5'}`}>
              {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
            </div>
            <div className={`flex flex-col gap-2 max-w-[85%] ${msg.role === 'user' ? 'items-end' : ''}`}>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-blue-600/10 border border-blue-500/30 text-blue-50 rounded-tr-none shadow-xl' 
                  : 'bg-neutral-800/80 border border-white/5 text-neutral-300 rounded-tl-none shadow-xl backdrop-blur-sm'
              }`}>
                {msg.content.split('\n').map((line, idx) => (
                  <p key={idx} className={line.trim() === '' ? 'h-2' : 'mb-2 last:mb-0'}>
                    {line}
                  </p>
                ))}
              </div>
              
              {msg.sources && msg.sources.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {msg.sources.map((source, sIdx) => (
                    <a 
                      key={sIdx}
                      href={source.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] text-neutral-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <ExternalLink size={10} />
                      {source.title.length > 20 ? source.title.substring(0, 20) + '...' : source.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4">
            <div className="p-2 rounded-xl bg-white/10 text-neutral-300 border border-white/5 h-fit mt-1">
              <Loader2 className="animate-spin" size={18} />
            </div>
            <div className="p-4 rounded-2xl rounded-tl-none bg-neutral-800/50 border border-white/5 text-neutral-400 text-xs italic animate-pulse">
              Accessing global architectural repository...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-black/40 border-t border-white/5 flex gap-3">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Describe your security challenge..."
          className="flex-1 bg-neutral-800/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-neutral-600"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="p-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-20 disabled:hover:bg-blue-600 text-white rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-500/20"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default AuthConsultant;
