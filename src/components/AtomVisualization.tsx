import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Colors = {
  phigaMain: 0x027373,     // Main theme color
  phigaAccent: 0x04BF9D,   // Accent color
  phigaDark: 0x032626,     // Dark theme color
  phigaLight: 0xE8F7F4,    // Light theme color
  white: 0xffffff,         // Pure white
  blue: 0x60a5fa,          // Blue for electrons
  orange: 0xff8c00,        // Orange for nucleus glow
};

function AtomVisualization() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Small delay to ensure container is properly mounted
    const initializeScene = () => {
      if (!mountRef.current) return;

      // Create an empty scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Get container dimensions with fallback
      const width = mountRef.current.clientWidth || 1200;
      const height = mountRef.current.clientHeight || 1200;
      
      console.log('Atom container dimensions:', width, height);

    // Create perspective camera for better 3D visualization
      const camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        1,
        2000
      );
      camera.position.z = 900;
      camera.position.y = 0;
      camera.position.x = 0;
      camera.lookAt(0, 0, 0);

    // Create renderer with antialiasing
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    rendererRef.current = renderer;

    // Configure renderer
    renderer.setClearColor("#000000", 0);
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(Colors.phigaLight, 0.4);
    scene.add(ambientLight);

    const lights: THREE.Light[] = [];
    lights[0] = new THREE.PointLight(Colors.phigaAccent, 0.8, 0);
    lights[0].position.set(200, 0, 0);

    lights[1] = new THREE.PointLight(Colors.phigaMain, 0.6, 0);
    lights[1].position.set(0, 200, 0);

    lights[2] = new THREE.PointLight(0xffffff, 0.5, 0);
    lights[2].position.set(0, 100, 100);

    lights[3] = new THREE.AmbientLight(0xffffff, 0.3);

    lights.forEach(light => scene.add(light));

    // Geometry creation functions
    function createTorus(
      r: number,
      tubeD: number,
      radialSegs: number,
      tubularSegs: number,
      arc: number,
      color: string | number,
      rotationX: number
    ) {
      const geometry = new THREE.TorusGeometry(r, tubeD, radialSegs, tubularSegs, arc);
      const material = new THREE.MeshLambertMaterial({ color: color || "#ff7171" });
      const torus = new THREE.Mesh(geometry, material);
      torus.rotation.x = rotationX;
      return torus;
    }

    function createSphere(params: {
      r?: number;
      color?: number;
      x?: number;
      y?: number;
    }) {
      const geometry = new THREE.SphereGeometry(width / (params.r || 40), 50, 50);
      const material = new THREE.MeshPhongMaterial({
        color: params.color || Colors.blue,
        transparent: true,
        opacity: 0.8
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.x = params.x || 0;
      sphere.position.y = params.y || 0;
      return sphere;
    }

    // Create valence shells
    const baseRadius = width > height ? (height - 40) / 2 : (width - 40) / 2;

    function createValence(ringNumber: number, electronCount: number) {
      const radius = 100 + (baseRadius / 8) * ringNumber;

      const ring = createTorus(
        radius,
        baseRadius / 400,
        20,
        100,
        Math.PI * 2,
        Colors.phigaAccent,
        0
      );

      const electrons: THREE.Mesh[] = [];
      const angleIncrement = (Math.PI * 2) / electronCount;
      let angle = 0;

      for (let i = 0; i < electronCount; i++) {
        const posX = radius * Math.cos(angle);
        const posY = radius * Math.sin(angle);
        angle += angleIncrement;

        const electron = createSphere({
          r: 120,
          x: posX,
          y: posY,
          color: Colors.blue
        });
        electrons.push(electron);
      }

      const group = new THREE.Group();
      group.add(ring);
      electrons.forEach(electron => group.add(electron));

      return group;
    }

    // Create nucleus
    const nucleus = createSphere({ r: 15, color: Colors.phigaMain });
    scene.add(nucleus);

    // Create electron shells
    const shellCounts = [2, 6, 10, 14, 18];
    const valenceCount = 6;
    const valences: THREE.Group[] = [];

    for (let i = 1; i <= valenceCount; i++) {
      const shellCountIndex = (i - 1) % shellCounts.length;
      const v = createValence(i, shellCounts[shellCountIndex]);
      valences.push(v);
      scene.add(v);
    }

    // Animation loop
    function render() {
      animationIdRef.current = requestAnimationFrame(render);

      const baseRotation = 0.01;

      valences.forEach((v, i) => {
        v.rotation.y += baseRotation - (i * 0.001);
        v.rotation.x += baseRotation - (i * 0.001);
        v.rotation.z += baseRotation - (i * 0.001);
      });

      nucleus.rotation.x += 0.01;
      nucleus.rotation.y += 0.01;

      renderer.render(scene, camera);
    }

    console.log('Starting atom animation with', valences.length, 'valence shells');
    render();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
        
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
        
        if (rendererRef.current && mountRef.current) {
          mountRef.current.removeChild(rendererRef.current.domElement);
          rendererRef.current.dispose();
        }
        
        // Clean up geometries and materials
        if (sceneRef.current) {
          sceneRef.current.traverse((object) => {
            if (object instanceof THREE.Mesh) {
              object.geometry.dispose();
              if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose());
              } else {
                object.material.dispose();
              }
            }
          });
        }
      };
    };

    // Initialize scene with a small delay
    const timeoutId = setTimeout(initializeScene, 100);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full overflow-hidden"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export default AtomVisualization;