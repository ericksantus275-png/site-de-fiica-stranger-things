
export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface PhysicsTopic {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Expert';
  icon: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}
