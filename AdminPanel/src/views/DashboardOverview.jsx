import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { Activity, Globe, Smartphone, Server } from 'lucide-react';

const data = [
  { name: 'Website', count: 45 },
  { name: 'App', count: 32 },
  { name: 'Server', count: 18 },
  { name: 'Other', count: 12 },
];

const DashboardOverview = () => {
  return (
    <div className="view-container">
      <h1 className="page-title">Dashboard Overview</h1>
      <p className="page-subtitle">Real-time metrics of incoming service inquiries.</p>

      <div className="grid-cols-3">
        <div className="admin-card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={18} color="var(--admin-accent-primary)" /> Total Requests
          </div>
          <div className="metric-value">107</div>
          <p style={{ color: 'var(--admin-success)', fontSize: '0.9rem', marginTop: '0.5rem' }}>+12% this week</p>
        </div>
        <div className="admin-card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Globe size={18} color="var(--admin-accent-secondary)" /> Top Service
          </div>
          <div className="metric-value" style={{ color: 'var(--admin-accent-secondary)' }}>Website</div>
          <p style={{ color: 'var(--admin-text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>42% of all requests</p>
        </div>
        <div className="admin-card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Smartphone size={18} color="var(--admin-accent-tertiary)" /> Unread
          </div>
          <div className="metric-value" style={{ color: 'var(--admin-accent-tertiary)' }}>14</div>
          <p style={{ color: 'var(--admin-warning)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Needs immediate attention</p>
        </div>
      </div>

      <div className="admin-card mt-2" style={{ height: '400px' }}>
        <div className="card-title mb-4">Request Distribution</div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--admin-border)" vertical={false} />
            <XAxis dataKey="name" stroke="var(--admin-text-secondary)" tick={{ fill: 'var(--admin-text-secondary)' }} />
            <YAxis stroke="var(--admin-text-secondary)" tick={{ fill: 'var(--admin-text-secondary)' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--admin-bg-secondary)', border: '1px solid var(--admin-border)', borderRadius: '8px' }}
              itemStyle={{ color: 'var(--admin-accent-primary)' }}
            />
            <Bar dataKey="count" fill="var(--admin-accent-primary)" radius={[4, 4, 0, 0]}>
              <LabelList dataKey="count" position="top" fill="var(--admin-text-primary)" fontSize={12} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardOverview;
