import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

interface BeanInstance {
  mesh: THREE.Mesh;
  basePosition: THREE.Vector3;
  baseRotation: THREE.Euler;
  floatSpeed: number;
  floatAmplitude: number;
  rotationSpeed: THREE.Vector3;
  depthFactor: number;
  initialScale: number;
  phase: number;
  targetOffset: THREE.Vector3;
}

export const ThreeBeanCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // References to keep animation loop clean and leak-free
  const animationFrameId = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef(0);
  const beansRef = useRef<BeanInstance[]>([]);
  const particleGroupRef = useRef<THREE.Points | null>(null);
  const particleVelocitiesRef = useRef<Float32Array | null>(null);
  const particleAlphasRef = useRef<Float32Array | null>(null);

  // Check reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Helper: Create procedural warm roasted bean texture canvas
  const createBeanTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Warm roasted caramel & chestnut gradient (not black/heavy)
    const gradient = ctx.createRadialGradient(256, 256, 40, 256, 256, 256);
    gradient.addColorStop(0, '#8C5638'); // warm caramel core
    gradient.addColorStop(0.45, '#683C24'); // medium roast
    gradient.addColorStop(0.85, '#4E2918'); // rich roasted edge
    gradient.addColorStop(1, '#3A1E11'); // soft rim
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    // Fine roasted micro-specks & pores
    ctx.fillStyle = 'rgba(40, 20, 12, 0.35)';
    for (let i = 0; i < 1500; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const r = Math.random() * 2.0 + 0.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Golden/caramel roast highlights
    ctx.fillStyle = 'rgba(226, 192, 150, 0.18)';
    for (let i = 0; i < 500; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const r = Math.random() * 2.5 + 1;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Delicate central cleft line (chaff lighter center)
    ctx.strokeStyle = 'rgba(215, 175, 130, 0.45)';
    ctx.lineWidth = 5;
    ctx.filter = 'blur(2px)';
    ctx.beginPath();
    ctx.moveTo(256, 45);
    ctx.bezierCurveTo(246, 180, 266, 330, 256, 465);
    ctx.stroke();
    ctx.filter = 'none';

    return new THREE.CanvasTexture(canvas);
  };

  // Helper: Create custom procedural coffee bean geometry
  const createCoffeeBeanGeometry = () => {
    const sphere = new THREE.SphereGeometry(1, 48, 36);
    const position = sphere.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < position.count; i++) {
      vertex.fromBufferAttribute(position, i);

      // Base elongation & organic proportions
      let x = vertex.x * 0.70;
      let y = vertex.y * 1.16;
      let z = vertex.z * 0.54;

      // Organic tapering towards the tips
      const tipTaper = 1 - Math.pow(Math.abs(vertex.y), 2.8) * 0.28;
      x *= tipTaper;
      z *= tipTaper;

      // Coffee bean cleft: on the front face (z < 0)
      if (z < 0.15) {
        const sCurve = Math.sin(y * 2.4) * 0.08;
        const distFromCenter = Math.abs(x - sCurve);

        // Deep longitudinal groove
        const grooveDepth = Math.exp(-distFromCenter * 14.0) * 0.40;
        z += grooveDepth;

        // Raised outer bean lips flanking the groove
        const lipOffset = Math.abs(distFromCenter - 0.22);
        const lipHeight = Math.exp(-lipOffset * lipOffset * 32.0) * 0.07;
        z -= lipHeight;
      } else {
        z *= 1.08;
      }

      position.setXYZ(i, x, y, z);
    }

    sphere.computeVertexNormals();
    return sphere;
  };

  // Trigger restrained bean particle burst
  const triggerBeanBurst = useCallback((clickX?: number, clickY?: number) => {
    if (!particleGroupRef.current || !particleVelocitiesRef.current || !particleAlphasRef.current) return;

    const positions = particleGroupRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const alphas = particleAlphasRef.current;
    const velocities = particleVelocitiesRef.current;
    const particleCount = positions.count;

    const originX = clickX !== undefined ? (clickX / window.innerWidth) * 6 - 3 : 0;
    const originY = clickY !== undefined ? -(clickY / window.innerHeight) * 4 + 2 : 0;

    for (let i = 0; i < particleCount; i++) {
      positions.setXYZ(
        i,
        originX + (Math.random() - 0.5) * 0.4,
        originY + (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.8
      );

      const angle = Math.random() * Math.PI * 2;
      const speed = 0.035 + Math.random() * 0.06;
      velocities[i * 3] = Math.cos(angle) * speed;
      velocities[i * 3 + 1] = Math.sin(angle) * speed + 0.015;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * speed;

      alphas[i] = 1.0;
    }

    positions.needsUpdate = true;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
    } catch {
      setHasWebGL(false);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    // Warm, architectural studio lighting for roasted beans
    const keyLight = new THREE.DirectionalLight(0xFFF1E6, 2.4);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xE5C299, 2.2);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x8C5638, 1.2);
    fillLight.position.set(0, -4, 3);
    scene.add(fillLight);

    const ambientLight = new THREE.AmbientLight(0x4A2D1F, 1.5);
    scene.add(ambientLight);

    // Shared Bean Geometry & Material
    const beanGeometry = createCoffeeBeanGeometry();
    const beanTexture = createBeanTexture();

    // 6 delicate, small beans positioned strictly on the outer periphery
    // Leaving all headlines, cards, badges, and footer text completely free
    const beanConfigs = [
      // 0: Far top-left outer corner (far away from headline & eyebrow)
      { pos: new THREE.Vector3(-5.5, 3.0, -1.0), rot: new THREE.Euler(0.4, 0.6, -0.3), scale: 0.25, depth: 0.85, speed: 0.65 },
      // 1: Far top-right outer corner (above right card)
      { pos: new THREE.Vector3(5.3, 3.1, -1.2), rot: new THREE.Euler(-0.3, -0.8, 0.4), scale: 0.24, depth: 0.8, speed: 0.85 },
      // 2: Far left mid-edge (along outer screen margin)
      { pos: new THREE.Vector3(-5.8, 0.4, -0.6), rot: new THREE.Euler(0.6, -0.4, 0.7), scale: 0.24, depth: 0.7, speed: 0.75 },
      // 3: Far right mid-edge (along outer screen margin)
      { pos: new THREE.Vector3(5.6, -0.1, -0.4), rot: new THREE.Euler(-0.5, 0.9, -0.2), scale: 0.26, depth: 0.9, speed: 0.9 },
      // 4: Far bottom-left outer corner (far below buttons, away from text)
      { pos: new THREE.Vector3(-5.4, -2.9, -1.0), rot: new THREE.Euler(0.2, 0.5, 0.8), scale: 0.22, depth: 0.75, speed: 0.6 },
      // 5: Far bottom-right outer corner (far right of footer text)
      { pos: new THREE.Vector3(5.5, -2.9, -1.0), rot: new THREE.Euler(-0.7, -0.3, 0.2), scale: 0.24, depth: 0.8, speed: 0.75 },
    ];

    const beans: BeanInstance[] = [];

    beanConfigs.forEach((cfg, idx) => {
      // Warm roasted chestnut & caramel shades (natural, soft, artisanal)
      const roastShades = [0x7A482C, 0x8C5638, 0x6E3E26, 0x845032, 0x73432A, 0x804C2E, 0x653820, 0x7C4A2E];
      const beanMaterial = new THREE.MeshStandardMaterial({
        color: roastShades[idx % roastShades.length],
        map: beanTexture,
        roughness: 0.45,
        metalness: 0.04,
        bumpMap: beanTexture,
        bumpScale: 0.02,
      });

      const mesh = new THREE.Mesh(beanGeometry, beanMaterial);
      mesh.position.copy(cfg.pos);
      mesh.rotation.copy(cfg.rot);
      mesh.scale.setScalar(cfg.scale);

      scene.add(mesh);

      beans.push({
        mesh,
        basePosition: cfg.pos.clone(),
        baseRotation: cfg.rot.clone(),
        floatSpeed: cfg.speed,
        floatAmplitude: 0.09 * cfg.depth,
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.007,
          (Math.random() - 0.5) * 0.010,
          (Math.random() - 0.5) * 0.005
        ),
        depthFactor: cfg.depth,
        initialScale: cfg.scale,
        phase: idx * 0.95,
        targetOffset: new THREE.Vector3()
      });
    });

    beansRef.current = beans;

    // --- Particle System for Bean Bursts ---
    const particleCount = 40;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);
    const particleAlphas = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = 0;
      particlePositions[i * 3 + 1] = -100;
      particlePositions[i * 3 + 2] = 0;
      particleAlphas[i] = 0.0;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleVelocitiesRef.current = particleVelocities;
    particleAlphasRef.current = particleAlphas;

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xD8B892,
      size: 0.075,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    const particlePoints = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particlePoints);
    particleGroupRef.current = particlePoints;

    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = nx;
      mouseRef.current.targetY = ny;
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleCanvasClick = (e: MouseEvent) => {
      triggerBeanBurst(e.clientX, e.clientY);
    };

    canvas.addEventListener('click', handleCanvasClick);

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const scrollOffset = scrollRef.current * 0.0018;

      beans.forEach(b => {
        if (prefersReducedMotion) return;

        const floatY = Math.sin(elapsedTime * b.floatSpeed + b.phase) * b.floatAmplitude;
        const floatX = Math.cos(elapsedTime * (b.floatSpeed * 0.7) + b.phase) * (b.floatAmplitude * 0.6);

        const parallaxX = mouseRef.current.x * 0.35 * b.depthFactor;
        const parallaxY = mouseRef.current.y * 0.28 * b.depthFactor;

        const distToMouse = Math.hypot(
          b.basePosition.x - mouseRef.current.x * 3.5,
          b.basePosition.y - mouseRef.current.y * 2.5
        );

        if (distToMouse < 1.8) {
          const repelForce = (1.8 - distToMouse) * 0.09;
          b.targetOffset.x += ((b.basePosition.x - mouseRef.current.x * 3.5) / distToMouse) * repelForce * 0.12;
          b.targetOffset.y += ((b.basePosition.y - mouseRef.current.y * 2.5) / distToMouse) * repelForce * 0.12;
        }

        b.targetOffset.multiplyScalar(0.92);

        const scrollDriftY = scrollOffset * b.depthFactor * 1.5;
        const scrollDisperseX = (b.basePosition.x > 0 ? 1 : -1) * scrollOffset * 0.5;

        b.mesh.position.x = b.basePosition.x + floatX + parallaxX + b.targetOffset.x + scrollDisperseX;
        b.mesh.position.y = b.basePosition.y + floatY + parallaxY + b.targetOffset.y + scrollDriftY;
        b.mesh.position.z = b.basePosition.z;

        b.mesh.rotation.x = b.baseRotation.x + elapsedTime * b.rotationSpeed.x * 10;
        b.mesh.rotation.y = b.baseRotation.y + elapsedTime * b.rotationSpeed.y * 10 + mouseRef.current.x * 0.15;
        b.mesh.rotation.z = b.baseRotation.z + elapsedTime * b.rotationSpeed.z * 10;
      });

      if (particleGroupRef.current && particleVelocitiesRef.current && particleAlphasRef.current) {
        const positions = particleGroupRef.current.geometry.attributes.position as THREE.BufferAttribute;
        const vels = particleVelocitiesRef.current;
        const alphas = particleAlphasRef.current;
        let hasActive = false;

        for (let i = 0; i < positions.count; i++) {
          if (alphas[i] > 0.01) {
            hasActive = true;
            positions.setX(i, positions.getX(i) + vels[i * 3]);
            positions.setY(i, positions.getY(i) + vels[i * 3 + 1]);
            positions.setZ(i, positions.getZ(i) + vels[i * 3 + 2]);

            vels[i * 3 + 1] -= 0.0006;
            vels[i * 3] *= 0.97;
            vels[i * 3 + 1] *= 0.97;

            alphas[i] *= 0.96;
          }
        }

        if (hasActive) {
          positions.needsUpdate = true;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      canvas.removeEventListener('click', handleCanvasClick);
      renderer.dispose();
      beanGeometry.dispose();
      beanTexture?.dispose();
    };
  }, [prefersReducedMotion, triggerBeanBurst]);

  if (!hasWebGL) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-auto z-10 cursor-pointer overflow-hidden select-none"
      title="Click anywhere to release roasted coffee bean sparks"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
