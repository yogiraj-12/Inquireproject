import React, { useEffect, useRef } from 'react';
import LayeredBackground from '../components/LayeredBackground';
import { staggerIn } from '../../utils/gsapAnimations';
import { PortfolioCard } from '../components/Cards';
import { portfolioData } from '../../models/portfolioData';

const PortfolioView = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.portfolio-card-anim');
      staggerIn(cards, gridRef.current, 0.15);
    }
  }, []);

  return (
    <LayeredBackground
      id="portfolio"
      fallbackGradient="radial-gradient(ellipse at bottom, #1a1a2e 0%, #0a0a0f 100%)"
      themeColor="rgba(10,10,15,0.85)"
    >
      <h2 className="section-heading">Featured Projects</h2>
      <p className="section-subheading">A selection of our recent work across various industries.</p>
      
      <div className="grid-container" ref={gridRef}>
        {portfolioData.map((project) => (
          <PortfolioCard key={project.id} project={project} className="portfolio-card-anim" />
        ))}
      </div>
    </LayeredBackground>
  );
};

export default PortfolioView;
