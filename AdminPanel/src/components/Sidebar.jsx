import React from 'react';
import { LayoutDashboard, Inbox, BrainCircuit, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'inbox', label: 'Requests Inbox', icon: <Inbox size={20} /> },
    { id: 'ai-insights', label: 'AI Insights', icon: <BrainCircuit size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="admin-sidebar">
      <div className="logo-container">
        Integrix<span className="logo-accent">.ai</span>
      </div>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {navItems.map((item) => (
          <div 
            key={item.id} 
            className={`nav-item ${currentView === item.id ? 'active' : ''}`}
            onClick={() => setCurrentView(item.id)}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
      </div>

      <div className="nav-item" style={{ marginTop: 'auto', color: 'var(--admin-danger)' }}>
        <LogOut size={20} />
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
