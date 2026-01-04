
import React from 'react';
import { PHYSICS_TOPICS } from '../constants';
import { Clock, Zap, Atom, Orbit, ChevronRight } from 'lucide-react';

interface TopicExplorerProps {
  onSelectTopic: (topicId: string) => void;
}

const iconMap: Record<string, any> = {
  Clock,
  Zap,
  Atom,
  Orbit
};

const TopicExplorer: React.FC<TopicExplorerProps> = ({ onSelectTopic }) => {
  return (
    <div className="animate-in fade-in duration-700">
      <div className="mb-12 text-center">
        <h2 className="stranger-title text-4xl mb-4 text-white">MISTÉRIOS DO TEMPO</h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg italic">
          "O tempo é apenas uma dimensão... mas às vezes o portal se abre e as regras mudam."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PHYSICS_TOPICS.map((topic) => {
          const IconComponent = iconMap[topic.icon];
          return (
            <div 
              key={topic.id}
              onClick={() => onSelectTopic(topic.id)}
              className="bg-zinc-900 border-2 border-zinc-800 hover:border-red-600 p-6 rounded-lg group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,0,0,0.2)]"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-zinc-800 rounded-lg group-hover:bg-red-900 transition-colors">
                  <IconComponent className="text-red-500 group-hover:text-white" size={32} />
                </div>
                <span className={`px-3 py-1 rounded text-xs font-bold uppercase retro-text ${
                  topic.difficulty === 'Beginner' ? 'bg-green-900 text-green-300' :
                  topic.difficulty === 'Intermediate' ? 'bg-blue-900 text-blue-300' :
                  'bg-purple-900 text-purple-300'
                }`}>
                  {topic.difficulty}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-red-500 transition-colors">{topic.title}</h3>
              <p className="text-gray-400 mb-6">{topic.description}</p>
              <div className="flex items-center gap-2 text-red-500 font-bold retro-text">
                ESTUDAR AGORA <ChevronRight size={16} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Retro Chart Section */}
      <div className="mt-16 bg-black border-2 border-red-900 p-8 rounded-lg">
        <h3 className="stranger-title text-2xl mb-6 text-red-500">GRÁFICO DE INSTABILIDADE TEMPORAL</h3>
        <div className="h-48 w-full flex items-end gap-2 overflow-hidden">
          {[40, 70, 45, 90, 65, 30, 85, 45, 20, 95, 60, 40, 80, 50, 70].map((h, i) => (
            <div 
              key={i} 
              className="bg-red-600 w-full transition-all hover:bg-white animate-pulse" 
              style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }}
            ></div>
          ))}
        </div>
        <p className="mt-4 retro-text text-gray-500 text-sm">DETECTANDO ANOMALIAS NO ESPAÇO-TEMPO... HAWKINS, INDIANA.</p>
      </div>
    </div>
  );
};

export default TopicExplorer;
