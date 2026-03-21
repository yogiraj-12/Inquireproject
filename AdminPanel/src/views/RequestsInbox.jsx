import React, { useState, useEffect } from 'react';
import { Mail, ArrowRight } from 'lucide-react';

const RequestsInbox = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/requests')
      .then(res => res.json())
      .then(data => {
        setRequests(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load requests:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="view-container">
      <h1 className="page-title">Requests Inbox</h1>
      <p className="page-subtitle">Manage and review all incoming service inquiries.</p>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--admin-border)' }}>
            <tr>
              <th style={{ padding: '1.2rem', color: 'var(--admin-text-secondary)', fontWeight: 600 }}>ID</th>
              <th style={{ padding: '1.2rem', color: 'var(--admin-text-secondary)', fontWeight: 600 }}>Client</th>
              <th style={{ padding: '1.2rem', color: 'var(--admin-text-secondary)', fontWeight: 600 }}>Service</th>
              <th style={{ padding: '1.2rem', color: 'var(--admin-text-secondary)', fontWeight: 600 }}>Est. Budget</th>
              <th style={{ padding: '1.2rem', color: 'var(--admin-text-secondary)', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '1.2rem', color: 'var(--admin-text-secondary)', fontWeight: 600 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ padding: '2rem', textAlign: 'center' }}>Loading requests...</td></tr>
            ) : requests.length === 0 ? (
              <tr><td colSpan="6" style={{ padding: '2rem', textAlign: 'center' }}>No requests found.</td></tr>
            ) : requests.map((req) => (
              <tr key={req._id} style={{ borderBottom: '1px solid var(--admin-border)', transition: 'background 0.2s', cursor: 'pointer' }} className="table-row-hover">
                <td style={{ padding: '1.2rem', fontFamily: 'var(--font-mono)' }}>#{req._id ? req._id.substring(18) : '---'}</td>
                <td style={{ padding: '1.2rem' }}>
                  <div style={{ fontWeight: 600 }}>{req.name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--admin-text-secondary)' }}>{req.company}</div>
                </td>
                <td style={{ padding: '1.2rem' }}>
                  <span style={{ 
                    padding: '0.3rem 0.8rem', 
                    borderRadius: '50px', 
                    fontSize: '0.85rem',
                    background: req.type === 'App' ? 'rgba(69, 243, 255, 0.1)' : req.type === 'Server' ? 'rgba(247, 37, 133, 0.1)' : 'rgba(138, 43, 226, 0.1)',
                    color: req.type === 'App' ? 'var(--admin-accent-primary)' : req.type === 'Server' ? 'var(--admin-accent-tertiary)' : 'var(--admin-accent-secondary)'
                  }}>
                    {req.type}
                  </span>
                </td>
                <td style={{ padding: '1.2rem', fontWeight: 500 }}>{req.budget}</td>
                <td style={{ padding: '1.2rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: req.status === 'Unread' ? 'var(--admin-warning)' : 'var(--admin-text-secondary)' }}>
                    {req.status === 'Unread' && <Mail size={14} />}
                    {req.status}
                  </span>
                </td>
                <td style={{ padding: '1.2rem' }}>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--admin-accent-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    View <ArrowRight size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style>{`
        .table-row-hover:hover { background: rgba(255, 255, 255, 0.02); }
      `}</style>
    </div>
  );
};

export default RequestsInbox;
