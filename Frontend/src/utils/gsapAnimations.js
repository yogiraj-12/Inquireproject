import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const fadeInUp = (element, trigger, delay = 0) => {
  gsap.fromTo(
    element,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: trigger || element,
        start: 'top 85%',
      }
    }
  );
};

export const staggerIn = (elements, trigger, stagger = 0.1) => {
  gsap.fromTo(
    elements,
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: trigger,
        start: 'top 80%',
      }
    }
  );
};

export const counterAnimation = (element, endValue) => {
  gsap.fromTo(
    element,
    { innerHTML: 0 },
    {
      innerHTML: endValue,
      duration: 2,
      snap: { innerHTML: 1 },
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
      }
    }
  );
};

export const parallaxLayer = (element, speed, trigger) => {
  gsap.to(element, {
    yPercent: speed * 50,
    ease: "none",
    scrollTrigger: {
      trigger: trigger,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
};

export const neuReveal = (elements, trigger, delay = 0) => {
  gsap.fromTo(
    elements,
    { y: 60, opacity: 0, scale: 0.95 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      delay,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: trigger || (Array.isArray(elements) ? elements[0] : elements),
        start: 'top 85%',
      }
    }
  );
};

export const orbFloat = (element, duration = 10) => {
  gsap.to(element, {
    x: () => gsap.utils.random(-200, 200),
    y: () => gsap.utils.random(-200, 200),
    rotation: () => gsap.utils.random(-45, 45),
    scale: () => gsap.utils.random(0.8, 1.3),
    duration,
    ease: "sine.inOut",
    onComplete: () => orbFloat(element, duration),
  });
};

export const fastReveal = (elements, trigger, delay = 0) => {
  gsap.fromTo(
    elements,
    { y: 40, opacity: 0, scale: 0.98 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      delay,
      stagger: 0.1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: trigger || (Array.isArray(elements) ? elements[0] : elements),
        start: 'top 85%',
      }
    }
  );
};
