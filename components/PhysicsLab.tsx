
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { Message } from '../types';
import { Send, User, Bot, Loader2, Radio } from 'lucide-react';

interface PhysicsLabProps {
  initialTopic?: string;
}

const PhysicsLab: React.FC<PhysicsLabProps> = ({ initialTopic }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialTopic) {
      handleAsk(`Pode me explicar sobre ${initialTopic}?`);
    } else if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: "Câmbio, aqui é o Dr. Owens. O Laboratório de Hawkins está pronto para analisar suas dúvidas sobre o tempo e o espaço. O que você gostaria de investigar hoje? Câmbio desliga."
      }]);
    }
  }, [initialTopic]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleAsk = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await geminiService.askPhysicsQuestion(messages, text, initialTopic);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-[70vh] flex flex-col bg-zinc-950 border-2 border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Lab Monitor Header */}
      <div className="bg-zinc-900 p-4 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_red]"></div>
          <span className="retro-text text-zinc-400 uppercase tracking-widest">Monitor do Lab: Frequência 144.9</span>
        </div>
        {initialTopic && (
          <span className="bg-red-900 text-white text-[10px] px-2 py-0.5 rounded-full retro-text">FOCO: {initialTopic.toUpperCase()}</span>
        )}
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-6 scrollbar-hide">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-lg ${msg.role === 'user' ? 'bg-red-700' : 'bg-zinc-800'}`}>
                {msg.role === 'user' ? <User size={20} /> : <Radio size={20} className="text-red-500" />}
              </div>
              <div className={`p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-red-900/40 text-white border border-red-700 rounded-tr-none' 
                  : 'bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-tl-none'
              }`}>
                <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl rounded-tl-none flex items-center gap-3">
              <Loader2 className="animate-spin text-red-500" size={18} />
              <span className="retro-text text-zinc-500 animate-pulse">PROCESSANDO SINAL...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-zinc-900 border-t border-zinc-800">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleAsk(input); }}
          className="flex gap-2"
        >
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem para o laboratório..."
            className="flex-grow bg-black border-2 border-zinc-800 focus:border-red-600 rounded-lg px-4 py-3 outline-none transition-all text-white placeholder:text-zinc-600"
          />
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-red-700 hover:bg-red-600 disabled:opacity-50 disabled:hover:bg-red-700 text-white p-3 rounded-lg transition-all shadow-[0_0_15px_rgba(185,28,28,0.4)]"
          >
            <Send size={24} />
          </button>
        </form>
        <p className="mt-2 text-[10px] retro-text text-center text-zinc-600 uppercase">Aviso: Comunicações podem ser interceptadas pelo Mundo Invertido.</p>
      </div>
    </div>
  );
};

export default PhysicsLab;
