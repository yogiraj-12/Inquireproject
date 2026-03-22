import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardOverview from './views/DashboardOverview';
import RequestsInbox from './views/RequestsInbox';
import AiInsights from './views/AiInsights';

function App() {
  const [currentView, setCurrentView] = useState('overview');

  const renderView = () => {
    switch(currentView) {
      case 'overview': return <DashboardOverview />;
      case 'inbox': return <RequestsInbox />;
      case 'ai-insights': return <AiInsights />;
      default: return <DashboardOverview />;
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="admin-main">
        {renderView()}
      </main>
    </div>
  );
}

export default App;
