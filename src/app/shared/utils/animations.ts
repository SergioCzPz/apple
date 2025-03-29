import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export const animateWithGsap = (
  target: string,
  vars: gsap.TweenVars,
  scrollVars?: ScrollTrigger.Vars
): void => {
  gsap.to(target, {
    ...vars,
    scrollTrigger: {
      trigger: target,
      toggleActions: 'restart reverse restart reverse',
      start: 'top 85%',
      ...scrollVars,
    },
    ...vars,
  });
};
