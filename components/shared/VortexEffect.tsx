"use client";

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import * as THREE from 'three';

interface VortexEffectProps {
  excludeHomepageHero?: boolean;
}

const VortexEffect = ({ excludeHomepageHero = true }: VortexEffectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const particlePositionsRef = useRef<Float32Array | null>(null);

  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  // Check if we should show the effect based on scroll position on homepage
  useEffect(() => {
    if (!excludeHomepageHero || !isHomepage) return;

    const handleScroll = () => {
      const shouldShow = window.scrollY > 650;
      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [excludeHomepageHero, isHomepage]);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create particles
    const particleCount = Math.min(150, Math.max(120, Math.floor(window.innerWidth * window.innerHeight / 10000)));
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    const particleOpacities = new Float32Array(particleCount);
    const particleColors = new Float32Array(particleCount * 3);

    // Initialize particle properties
    for (let i = 0; i < particleCount; i++) {
      // Position (randomly distributed in sphere)
      const radius = 2 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Size (random between 0.05 and 0.15)
      particleSizes[i] = 0.05 + Math.random() * 0.1;
      
      // Opacity (random between 0.3 and 0.7)
      particleOpacities[i] = 0.3 + Math.random() * 0.4;
      
      // Color (variations of cyan: hsl(180, 70%, 60%))
      const hue = 180 + (Math.random() * 40 - 20); // 160-200
      const saturation = 0.7 + (Math.random() * 0.2 - 0.1); // 0.6-0.8
      const lightness = 0.6 + (Math.random() * 0.2 - 0.1); // 0.5-0.7
      
      const color = new THREE.Color().setHSL(hue/360, saturation, lightness);
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    particleGeometry.setAttribute('opacity', new THREE.BufferAttribute(particleOpacities, 1));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    
    particlePositionsRef.current = particlePositions;

    // Material for particles
    const particleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        attribute float opacity;
        attribute vec3 color;
        varying float vOpacity;
        varying vec3 vColor;
        uniform float time;
        
        void main() {
          vOpacity = opacity;
          vColor = color;
          
          // Rotate particle positions
          float theta = time * 0.8; // 0.8 radians per second
          mat3 rotationMatrix = mat3(
            cos(theta), 0, sin(theta),
            0, 1, 0,
            -sin(theta), 0, cos(theta)
          );
          
          vec3 rotatedPosition = rotationMatrix * position;
          vec4 mvPosition = modelViewMatrix * vec4(rotatedPosition, 1.0);
          
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vOpacity;
        varying vec3 vColor;
        
        void main() {
          float distance = length(gl_PointCoord - vec2(0.5, 0.5));
          if (distance > 0.5) discard;
          
          float alpha = vOpacity * (1.0 - distance * 2.0);
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      if (rendererRef.current && rendererRef.current.domElement) {
        if (containerRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      }
      
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      
      // Dispose geometries and materials
      if (particlesRef.current) {
        particlesRef.current.geometry.dispose();
        (particlesRef.current.material as THREE.Material).dispose();
      }
    };
  }, []);

  // Animation loop
  useEffect(() => {
    if (!isVisible) return;
    
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    
    const updateScrollVelocity = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', updateScrollVelocity);

    const animate = (time: number) => {
      if (
        !sceneRef.current ||
        !cameraRef.current ||
        !rendererRef.current ||
        !particlesRef.current
      ) {
        requestRef.current = requestAnimationFrame(animate);
        return;
      }

      if (previousTimeRef.current !== null) {
        const deltaTime = (time - previousTimeRef.current) / 1000;
        
        // Update time uniform for shader
        const material = particlesRef.current.material as THREE.ShaderMaterial;
        material.uniforms.time.value += deltaTime;
        
        // Add subtle influence from scroll velocity
        if (particlePositionsRef.current && Math.abs(scrollVelocity) > 5) {
          const positions = particlesRef.current.geometry.attributes.position;
          const positionArray = positions.array as Float32Array;
          
          for (let i = 0; i < positionArray.length; i += 3) {
            positionArray[i + 1] += scrollVelocity * 0.0003 * Math.random();
          }
          
          positions.needsUpdate = true;
        }
        
        // Reset scroll velocity
        scrollVelocity = 0;
      }

      previousTimeRef.current = time;
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', updateScrollVelocity);
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isVisible]);

  return (
    <div 
      ref={containerRef} 
      className="vortex-container" 
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    />
  );
};

export default VortexEffect;