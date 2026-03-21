import React from 'react';
import * as Icons from 'lucide-react';

export const ServiceCard = ({ service, className }) => {
  const IconComponent = Icons[service.icon] || Icons.Code;
  return (
    <div className={`glass-card ${className}`}>
      <div style={{ marginBottom: '1.5rem', color: 'var(--accent-secondary)' }}>
        <IconComponent size={40} />
      </div>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{service.title}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{service.description}</p>
      <div style={{ marginTop: '1.5rem', color: 'var(--accent-primary)', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        Learn more <Icons.ArrowRight size={16} />
      </div>
    </div>
  );
};

export const PortfolioCard = ({ project, className }) => {
  return (
    <div className={`glass-card ${className}`} style={{ padding: 0, overflow: 'hidden' }}>
      <img src={project.image} alt={project.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <div style={{ padding: '1.5rem' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>{project.category}</span>
        <h3 style={{ margin: '0.5rem 0 1rem 0' }}>{project.title}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>{project.description}</p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {project.tech.map((t, i) => (
            <span key={i} style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
