import React, { useState } from 'react';
import { BrainCircuit, Sparkles, Zap, ShieldAlert } from 'lucide-react';

const AiInsights = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [insights, setInsights] = useState([]);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      
      setAnalyzing(false);
      setAnalyzed(true);
      
      if (response.ok) {
        setInsights([{
          id: 'AI-GEN',
          name: 'AI Batch Analysis Report',
          aiTag: 'SUMMARY',
          priority: 'High',
          reason: `${data.summary} ${data.recommendation}`
        }]);
      } else {
        setInsights([{ id: 'ERR', name: 'Error', aiTag: 'ERROR', priority: 'High', reason: data.error || 'Unknown error. Check backend .env for AI_API_KEY.' }]);
      }
    } catch (error) {
      setAnalyzing(false);
      setAnalyzed(true);
      setInsights([{ id: 'ERR', name: 'Connection Error', aiTag: 'ERROR', priority: 'High', reason: 'Failed to connect to backend AI endpoint.' }]);
    }
  };

  return (
    <div className="view-container">
      <h1 className="page-title">AI Insights & Sorting</h1>
      <p className="page-subtitle">Let Integrix.ai analyze unread inquiries to identify lucrative deals.</p>

      {!analyzed && (
        <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', textAlign: 'center' }}>
          <BrainCircuit size={64} color={analyzing ? 'var(--admin-accent-primary)' : 'var(--admin-text-secondary)'} className={analyzing ? 'pulse-anim' : ''} style={{ marginBottom: '1.5rem' }} />
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            {analyzing ? 'AI is processing 5 new requests...' : 'Ready to analyze unread requests'}
          </h2>
          <p style={{ color: 'var(--admin-text-secondary)', maxWidth: '500px', marginBottom: '2rem' }}>
            Our trained model will read the contents of the latest submissions, extract the requested service types, and tag the most valuable leads for immediate action.
          </p>
          <button 
            onClick={handleAnalyze} 
            disabled={analyzing}
            style={{
              background: 'linear-gradient(135deg, var(--admin-accent-primary), var(--admin-accent-secondary))',
              color: 'white', border: 'none', padding: '1rem 2.5rem', borderRadius: '50px',
              fontSize: '1rem', fontWeight: 600, cursor: analyzing ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.8rem',
              boxShadow: analyzing ? 'none' : '0 5px 20px rgba(69, 243, 255, 0.4)',
              transition: 'all 0.3s ease',
              opacity: analyzing ? 0.7 : 1
            }}
          >
            {analyzing ? <><BrainCircuit size={18} className="spin-anim" /> Processing NLP...</> : <><Sparkles size={18} /> Run AI Analysis</>}
          </button>
        </div>
      )}

      {analyzed && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--admin-success)' }}>
              <ShieldAlert size={20} /> Analysis Complete
            </h3>
            <button 
              onClick={() => setAnalyzed(false)}
              style={{ background: 'transparent', border: '1px solid var(--admin-border)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}
            >
              Reset
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {insights.map((insight, idx) => (
              <div key={idx} className="admin-card" style={{ borderLeft: insight.priority === 'High' ? '4px solid var(--admin-accent-tertiary)' : '1px solid var(--admin-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>{insight.name} (Request #{insight.id})</h3>
                    <span style={{ 
                      background: insight.priority === 'High' ? 'rgba(247, 37, 133, 0.2)' : 'rgba(255,255,255,0.1)', 
                      color: insight.priority === 'High' ? 'var(--admin-accent-tertiary)' : 'var(--admin-text-secondary)',
                      padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.3rem'
                    }}>
                      <Zap size={12} /> {insight.aiTag}
                    </span>
                  </div>
                  <div style={{ background: 'rgba(0,255,255,0.1)', color: 'var(--admin-accent-primary)', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 600 }}>
                    Priority: {insight.priority}
                  </div>
                </div>
                <p style={{ color: 'var(--admin-text-secondary)', lineHeight: 1.6 }}>
                  <strong>AI Reasoning:</strong> {insight.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .spin-anim { animation: spin 2s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .pulse-anim { animation: pulse 1.5s infinite alternate; }
        @keyframes pulse { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(1.1); opacity: 1; filter: drop-shadow(0 0 15px var(--admin-accent-primary)); } }
      `}</style>
    </div>
  );
};

export default AiInsights;
