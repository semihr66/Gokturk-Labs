import { useEffect, useRef } from "react";
import * as THREE from "three";

interface StudioHero3DProps {
  className?: string;
}

export default function StudioHero3D({ className = "" }: StudioHero3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Reduced motion check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const mount = mountRef.current;
    if (!mount) return;

    let animationFrameId: number;
    let isVisible = true;

    // 2. Responsive detection: Mobile uses lighter polygon count and lower pixel ratio
    const isMobile = window.innerWidth < 768;

    // 3. Scene, Camera, Renderer
    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile, // Disable MSAA on mobile for 60fps
      powerPreference: "high-performance"
    });

    // Bound pixel ratio to 1.5 max to prevent high-DPI GPU drain (4K/Retina)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    // 4. Central Geometric Studio Core: Wireframe Icosahedron + Outer Ring
    // Low detail on mobile, medium on desktop
    const coreDetail = isMobile ? 1 : 2;
    const coreGeometry = new THREE.IcosahedronGeometry(2.4, coreDetail);
    
    // Wireframe material (zero heavy texture, pure GPU line shader)
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x9333ea,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const coreMesh = new THREE.Mesh(coreGeometry, wireframeMaterial);
    scene.add(coreMesh);

    // Outer Gyroscope Rings
    const ringGeometry = new THREE.TorusGeometry(3.3, 0.02, 8, isMobile ? 32 : 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25
    });
    const ringMesh1 = new THREE.Mesh(ringGeometry, ringMaterial);
    const ringMesh2 = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh1.rotation.x = Math.PI / 3;
    ringMesh2.rotation.y = Math.PI / 4;
    scene.add(ringMesh1);
    scene.add(ringMesh2);

    // Floating Quantum Nodes (Particles) - strictly bounded count
    const particleCount = isMobile ? 35 : 75;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 14;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xc084fc,
      size: isMobile ? 0.07 : 0.09,
      transparent: true,
      opacity: 0.6
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 5. Subtle Mouse Parallax (Throttled via interpolation)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 0.8;
      mouseY = (e.clientY / innerHeight - 0.5) * 0.8;
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    // 6. IntersectionObserver: Stop animation loop completely when scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(mount);

    // 7. Optimized Render Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Save CPU/GPU when out of viewport
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      coreMesh.rotation.x = elapsedTime * 0.12 + targetY * 0.4;
      coreMesh.rotation.y = elapsedTime * 0.18 + targetX * 0.4;

      ringMesh1.rotation.x = elapsedTime * 0.08 + targetY * 0.3;
      ringMesh1.rotation.z = elapsedTime * 0.14;

      ringMesh2.rotation.y = -elapsedTime * 0.1 + targetX * 0.3;
      ringMesh2.rotation.z = -elapsedTime * 0.06;

      particleSystem.rotation.y = -elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!mount) return;
      const newWidth = mount.clientWidth;
      const newHeight = mount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // 9. Thorough Cleanup on Unmount (Memory leak prevention)
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
      }

      coreGeometry.dispose();
      wireframeMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden opacity-60 ${className}`} 
      aria-hidden="true" 
    />
  );
}
