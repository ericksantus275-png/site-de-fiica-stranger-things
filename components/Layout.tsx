
import React from 'react';
import { ShieldAlert, Zap, Radio, BookOpen } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen upside-down-bg flex flex-col">
      {/* Header */}
      <header className="p-6 border-b border-red-900 bg-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-900 rounded-full animate-pulse shadow-[0_0_15px_rgba(255,0,0,0.6)]">
              <ShieldAlert className="text-white w-6 h-6" />
            </div>
            <h1 className="stranger-title text-2xl md:text-3xl text-red-600">
              HAWKINS <span className="text-white">PHYSICS</span>
            </h1>
          </div>
          
          <nav className="flex items-center gap-6 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            <button 
              onClick={() => setActiveTab('explore')}
              className={`flex items-center gap-2 whitespace-nowrap retro-text text-xl transition-all ${activeTab === 'explore' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'}`}
            >
              <BookOpen size={18} /> EXPLORAR
            </button>
            <button 
              onClick={() => setActiveTab('lab')}
              className={`flex items-center gap-2 whitespace-nowrap retro-text text-xl transition-all ${activeTab === 'lab' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'}`}
            >
              <Radio size={18} /> O LABORATÓRIO
            </button>
            <button 
              onClick={() => setActiveTab('portal')}
              className={`flex items-center gap-2 whitespace-nowrap retro-text text-xl transition-all ${activeTab === 'portal' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'}`}
            >
              <Zap size={18} /> O PORTAL (SEARCH)
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="p-8 border-t border-gray-800 bg-black text-center">
        <p className="retro-text text-gray-500 text-lg">
          PROPRIEDADE DO LABORATÓRIO NACIONAL DE HAWKINS. NÍVEL DE ACESSO: 4.
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <div className="w-3 h-3 rounded-full bg-red-600 animate-ping"></div>
          <div className="w-3 h-3 rounded-full bg-blue-600 animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-600 animate-bounce"></div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
