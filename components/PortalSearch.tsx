
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { Search, ExternalLink, Info, Loader2 } from 'lucide-react';
import { GroundingSource } from '../types';

const PortalSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ text: string, sources: GroundingSource[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const data = await geminiService.getGroundingSearch(query);
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in zoom-in-95 duration-500">
      <div className="text-center">
        <h2 className="stranger-title text-4xl mb-4 text-white">PESQUISA DO PORTAL</h2>
        <p className="text-gray-400 text-lg">Acesse dados em tempo real através da fenda dimensional de Hawkins.</p>
      </div>

      <div className="relative group">
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-500 transition-colors" />
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquise sobre descobertas recentes da física..."
              className="w-full bg-black border-2 border-zinc-800 focus:border-red-600 rounded-full pl-12 pr-6 py-4 outline-none text-white text-lg transition-all shadow-xl group-hover:shadow-red-900/20"
            />
          </div>
          <button 
            type="submit"
            disabled={loading || !query.trim()}
            className="bg-red-700 hover:bg-red-600 px-8 py-4 rounded-full font-bold transition-all disabled:opacity-50 shadow-lg"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'CONECTAR'}
          </button>
        </form>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-red-900 border-t-red-600 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-blue-900 border-b-blue-600 rounded-full animate-spin-slow"></div>
          </div>
          <p className="retro-text text-xl text-red-500 animate-pulse">ESTABILIZANDO CAMPO MAGNÉTICO...</p>
        </div>
      )}

      {results && (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
          <div className="flex items-center gap-2 mb-6 text-red-500">
            <Info size={24} />
            <h3 className="retro-text text-2xl font-bold uppercase tracking-widest">Informações Transdimensionais</h3>
          </div>
          
          <div className="prose prose-invert max-w-none mb-8 text-zinc-300 leading-relaxed text-lg">
            {results.text}
          </div>

          {results.sources.length > 0 && (
            <div className="border-t border-zinc-800 pt-6">
              <h4 className="text-sm font-bold text-zinc-500 uppercase mb-4 tracking-widest">Fontes Grounding:</h4>
              <div className="flex flex-wrap gap-3">
                {results.sources.map((source, i) => (
                  <a 
                    key={i}
                    href={source.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-black hover:bg-zinc-800 border border-zinc-800 px-4 py-2 rounded-lg text-sm text-zinc-400 transition-colors group"
                  >
                    <ExternalLink size={14} className="group-hover:text-red-500" />
                    {source.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PortalSearch;
