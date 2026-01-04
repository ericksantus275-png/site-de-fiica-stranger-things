
import React from 'react';
import { PhysicsTopic } from './types';
import { Clock, Zap, Atom, Orbit } from 'lucide-react';

export const PHYSICS_TOPICS: PhysicsTopic[] = [
  {
    id: 'time-dilation',
    title: 'Dilatação Temporal',
    description: 'Como o tempo passa mais devagar para quem viaja perto da velocidade da luz. O fenômeno que torna o Mundo Invertido ainda mais estranho.',
    difficulty: 'Intermediate',
    icon: 'Clock'
  },
  {
    id: 'entropy',
    title: 'Entropia e a Flecha do Tempo',
    description: 'Por que o tempo só corre para frente? Descubra como a desordem do universo impede que voltemos para salvar Barb.',
    difficulty: 'Expert',
    icon: 'Zap'
  },
  {
    id: 'quantum-realms',
    title: 'Dimensões Paralelas',
    description: 'Mecânica quântica e a teoria de muitos mundos. Existe realmente um portal para o Mundo Invertido?',
    difficulty: 'Expert',
    icon: 'Orbit'
  },
  {
    id: 'relative-simultaneity',
    title: 'Relatividade da Simultaneidade',
    description: 'O que é "agora"? Einstein explica por que dois eventos podem acontecer ao mesmo tempo para o Dustin, mas não para o Steve.',
    difficulty: 'Beginner',
    icon: 'Atom'
  }
];
