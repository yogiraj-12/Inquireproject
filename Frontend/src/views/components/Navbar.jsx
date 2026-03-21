import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const Navbar = ({ links, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 });
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        gsap.to(navRef.current, { y: -100, duration: 0.3, ease: 'power2.in' });
      } else {
        gsap.to(navRef.current, { y: 0, duration: 0.3, ease: 'power2.out' });
      }
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-content">
        <div className="logo" style={{cursor:'pointer'}} onClick={() => onNavigate('home')}>Integrix</div>
        <div className="nav-links">
          {links.map((link) => (
            <a key={link.id} onClick={(e) => { e.preventDefault(); onNavigate(link.id); }}>
              {link.label}
            </a>
          ))}
          <button className="glass-button primary" onClick={() => onNavigate('contact')}>Book a Meeting</button>
        </div>
        <div className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-links">
          {links.map((link) => (
            <a key={link.id} onClick={(e) => { e.preventDefault(); setMenuOpen(false); onNavigate(link.id); }}>
              {link.label}
            </a>
          ))}
          <button className="btn btn-primary" onClick={() => { setMenuOpen(false); onNavigate('contact'); }}>Book a Meeting</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
