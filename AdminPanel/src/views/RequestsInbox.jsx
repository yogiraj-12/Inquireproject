import React, { useState, useEffect } from 'react';
import { Mail, ArrowRight, X, User, Briefcase, DollarSign, Calendar, FileText, Tag } from 'lucide-react';

const RequestsInbox = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://inquireproject.onrender.com';
    fetch(`${apiUrl}/api/requests`)
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
                  <button 
                    onClick={() => setSelectedRequest(req)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--admin-accent-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                  >
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
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.7); display: flex; justify-content: center; align-items: center; z-index: 1000; backdrop-filter: blur(5px); }
        .modal-content { background: var(--admin-bg-secondary); border: 1px solid var(--admin-border); border-radius: 12px; width: 90%; max-width: 600px; max-height: 90vh; overflow-y: auto; padding: 2rem; position: relative; box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
        .modal-close { position: absolute; top: 1.5rem; right: 1.5rem; background: transparent; border: none; color: var(--admin-text-secondary); cursor: pointer; transition: color 0.2s; }
        .modal-close:hover { color: white; }
        .detail-row { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1.5rem; }
        .detail-icon { color: var(--admin-accent-primary); margin-top: 0.2rem; }
        .detail-content h4 { font-size: 0.85rem; color: var(--admin-text-secondary); margin-bottom: 0.2rem; text-transform: uppercase; letter-spacing: 0.5px; }
        .detail-content p { font-size: 1.05rem; color: white; margin: 0; line-height: 1.5; }
      `}</style>
      
      {/* Modal Overlay */}
      {selectedRequest && (
        <div className="modal-overlay" onClick={() => setSelectedRequest(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedRequest(null)}>
              <X size={24} />
            </button>
            <h2 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>Request Details</h2>
            <p style={{ color: 'var(--admin-text-secondary)', marginBottom: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>ID: {selectedRequest._id || selectedRequest.id}</p>
            
            <div className="detail-row">
              <User size={20} className="detail-icon" />
              <div className="detail-content">
                <h4>Client Name</h4>
                <p>{selectedRequest.name}</p>
              </div>
            </div>
            
            <div className="detail-row">
              <Briefcase size={20} className="detail-icon" />
              <div className="detail-content">
                <h4>Company</h4>
                <p>{selectedRequest.company || 'Not Provided'}</p>
              </div>
            </div>
            
            <div className="detail-row">
              <Tag size={20} className="detail-icon" />
              <div className="detail-content">
                <h4>Service Requested</h4>
                <p style={{ color: 'var(--admin-accent-primary)', fontWeight: 600 }}>{selectedRequest.type}</p>
              </div>
            </div>
            
            <div className="detail-row">
              <DollarSign size={20} className="detail-icon" />
              <div className="detail-content">
                <h4>Estimated Budget</h4>
                <p>{selectedRequest.budget}</p>
              </div>
            </div>
            
            <div className="detail-row">
              <Calendar size={20} className="detail-icon" />
              <div className="detail-content">
                <h4>Submission Date</h4>
                <p>{new Date(selectedRequest.date).toLocaleString()}</p>
              </div>
            </div>
            
            <div className="detail-row">
              <FileText size={20} className="detail-icon" />
              <div className="detail-content">
                <h4>Current Status</h4>
                <p style={{ color: selectedRequest.status === 'Unread' ? 'var(--admin-warning)' : 'var(--admin-success)' }}>
                  {selectedRequest.status}
                </p>
              </div>
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--admin-border)', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setSelectedRequest(null)} style={{ padding: '0.8rem 1.5rem', background: 'transparent', border: '1px solid var(--admin-border)', color: 'white', borderRadius: '8px', cursor: 'pointer' }}>Close</button>
              <button style={{ padding: '0.8rem 1.5rem', background: 'var(--admin-accent-primary)', border: 'none', color: '#000', fontWeight: 600, borderRadius: '8px', cursor: 'pointer' }}>Reply to Client</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestsInbox;
