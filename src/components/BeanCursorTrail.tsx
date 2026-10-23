import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
  life: number;
}

export const BeanCursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(true);
  const particlesRef = useRef<Particle[]>([]);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || reducedMotion) {
      setEnabled(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      const dist = Math.hypot(dx, dy);

      // Only spawn a particle when cursor has moved enough, and limit total count
      if (dist > 18 && particlesRef.current.length < 22) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 4 + 4,
          rotation: Math.random() * Math.PI,
          opacity: 0.5,
          life: 1.0,
        });
        lastPosRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Draw little stylized roasted coffee bean
    const drawBean = (x: number, y: number, size: number, rot: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = Math.max(0, alpha);

      // Bean body (oval in warm roasted brown)
      ctx.fillStyle = '#704735';
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.7, size * 1.1, 0, 0, Math.PI * 2);
      ctx.fill();

      // Delicate cleft line
      ctx.strokeStyle = '#C6A47D';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.9);
      ctx.quadraticCurveTo(size * 0.2, 0, 0, size * 0.9);
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.life -= 0.035;
        p.opacity = p.life * 0.5;
        p.y += 0.4; // gentle downward drift

        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
        } else {
          drawBean(p.x, p.y, p.size, p.rotation, p.opacity);
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 select-none"
      aria-hidden="true"
    />
  );
};
