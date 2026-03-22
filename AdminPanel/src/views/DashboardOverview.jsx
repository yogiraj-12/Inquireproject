import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { Activity, Globe, Smartphone, Server } from 'lucide-react';

const DashboardOverview = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${apiUrl}/api/requests`)
      .then(res => res.json())
      .then(fetchedData => {
        setRequests(fetchedData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch dashboard data:', err);
        setLoading(false);
      });
  }, []);

  const totalRequests = requests.length;
  const unreadCount = requests.filter(r => r.status === 'Unread').length;

  const typeCounts = requests.reduce((acc, r) => {
    acc[r.type] = (acc[r.type] || 0) + 1;
    return acc;
  }, {});

  const topService = Object.keys(typeCounts).length > 0 
    ? Object.keys(typeCounts).reduce((a, b) => typeCounts[a] > typeCounts[b] ? a : b) 
    : 'None';

  const data = Object.keys(typeCounts).map(key => ({
    name: key,
    count: typeCounts[key]
  }));

  if (data.length === 0) {
    data.push({ name: 'No Data', count: 0 });
  }

  return (
    <div className="view-container">
      <h1 className="page-title">Dashboard Overview</h1>
      <p className="page-subtitle">Real-time metrics of incoming service inquiries.</p>

      <div className="grid-cols-3">
        <div className="admin-card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={18} color="var(--admin-accent-primary)" /> Total Requests
          </div>
          <div className="metric-value">{loading ? '...' : totalRequests}</div>
          <p style={{ color: 'var(--admin-success)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Updated dynamically</p>
        </div>
        <div className="admin-card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Globe size={18} color="var(--admin-accent-secondary)" /> Top Service
          </div>
          <div className="metric-value" style={{ color: 'var(--admin-accent-secondary)' }}>{loading ? '...' : topService}</div>
          <p style={{ color: 'var(--admin-text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Highest volume request</p>
        </div>
        <div className="admin-card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Smartphone size={18} color="var(--admin-accent-tertiary)" /> Unread
          </div>
          <div className="metric-value" style={{ color: 'var(--admin-accent-tertiary)' }}>{loading ? '...' : unreadCount}</div>
          <p style={{ color: unreadCount > 0 ? 'var(--admin-warning)' : 'var(--admin-success)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            {unreadCount > 0 ? 'Needs immediate attention' : 'All caught up!'}
          </p>
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
