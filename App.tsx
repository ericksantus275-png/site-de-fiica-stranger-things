
import React, { useState } from 'react';
import Layout from './components/Layout';
import TopicExplorer from './components/TopicExplorer';
import PhysicsLab from './components/PhysicsLab';
import PortalSearch from './components/PortalSearch';

type Tab = 'explore' | 'lab' | 'portal';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('explore');
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>();

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopic(topicId);
    setActiveTab('lab');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'explore':
        return <TopicExplorer onSelectTopic={handleSelectTopic} />;
      case 'lab':
        return <PhysicsLab initialTopic={selectedTopic} />;
      case 'portal':
        return <PortalSearch />;
      default:
        return <TopicExplorer onSelectTopic={handleSelectTopic} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={(tab) => {
      setActiveTab(tab as Tab);
      if (tab !== 'lab') setSelectedTopic(undefined);
    }}>
      <div className="max-w-7xl mx-auto">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
