/**
 * Hero Scene - 3D Cinematic Background
 * 
 * Creates an immersive 3D environment with:
 * - Animated AI core (central focus)
 * - Floating holographic panels
 * - Ambient particle system
 * - Volumetric lighting
 * - Cinematic camera movement
 * 
 * Architecture decision:
 * We use React Three Fiber (React bindings for Three.js) because:
 * 1. Declarative component-based 3D
 * 2. Integrates naturally with React hooks
 * 3. Auto-resizes with window
 * 4. Easy to manage state and animations
 */

'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Animated AI Core
 * Central focal point of the scene
 */
const AICoreOrb: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current || !ringsRef.current) return;

    const elapsed = clock.getElapsedTime();

    // Core pulsing
    if (coreRef.current) {
      coreRef.current.scale.set(
        1 + Math.sin(elapsed * 2) * 0.1,
        1 + Math.sin(elapsed * 2) * 0.1,
        1 + Math.sin(elapsed * 2) * 0.1
      );
    }

    // Rings rotation
    ringsRef.current.rotation.x += 0.001;
    ringsRef.current.rotation.z -= 0.002;
  });

  return (
    <group ref={groupRef}>
      {/* Core sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshPhongMaterial
          color="#0ea5e9"
          emissive="#0ea5e9"
          emissiveIntensity={0.5}
          wireframe={false}
        />
      </mesh>

      {/* Glow layer */}
      <mesh>
        <sphereGeometry args={[0.85, 64, 64]} />
        <meshBasicMaterial
          color="#0ea5e9"
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Animated rings */}
      <group ref={ringsRef}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[0.3 * i, 0, 0]}>
            <torusGeometry args={[1.5 + i * 0.3, 0.05, 16, 100]} />
            <meshPhongMaterial
              color="#38bdf8"
              emissive="#0ea5e9"
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};

/**
 * Particle System
 * Ambient floating particles for depth
 */
const Particles: React.FC<{ count?: number }> = ({ count = 200 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame(() => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.0001;
  });

  const particles = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    particles[i] = (Math.random() - 0.5) * 20;
    particles[i + 1] = (Math.random() - 0.5) * 20;
    particles[i + 2] = (Math.random() - 0.5) * 20;
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} sizeAttenuation color="#0ea5e9" opacity={0.3} transparent />
    </points>
  );
};

/**
 * Cinematic Camera Controller
 * Smooth camera movement with mouse reactivity
 */
const CameraController: React.FC = () => {
  const { camera, mouse } = useThree();
  const targetPosition = useRef({ x: 0, y: 0, z: 5 });

  useFrame(() => {
    // Smooth camera follow
    targetPosition.current.x += (mouse.x * 2 - targetPosition.current.x) * 0.02;
    targetPosition.current.y += (mouse.y * 2 - targetPosition.current.y) * 0.02;

    camera.position.lerp(
      new THREE.Vector3(
        targetPosition.current.x,
        targetPosition.current.y,
        targetPosition.current.z
      ),
      0.05
    );

    camera.lookAt(0, 0, 0);
  });

  return null;
};

/**
 * Main Scene Component
 */
const SceneContent: React.FC = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#0ea5e9" />
      <pointLight position={[-10, -10, 5]} intensity={0.5} color="#a855f7" />

      {/* Scene objects */}
      <AICoreOrb />
      <Particles count={150} />

      {/* Camera controller */}
      <CameraController />

      {/* Environment lighting */}
      <Environment preset="night" />
    </>
  );
};

/**
 * HeroScene - Canvas wrapper
 */
const HeroScene: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <div className="absolute inset-0 bg-neutral-950" />;
  }

  return (
    <Canvas
      style={{
        position: 'absolute',
        inset: 0,
        background: 'transparent',
      }}
      dpr={Math.min(window.devicePixelRatio, 2)} // Optimize for high DPI
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
      <SceneContent />
    </Canvas>
  );
};

export default HeroScene;
