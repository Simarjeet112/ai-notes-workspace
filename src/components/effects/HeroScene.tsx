/**
 * CINEMATIC HERO SCENE
 * 
 * Movie-like 3D experience with:
 * - Giant animated AI core orb (primary focal point)
 * - Reactive volumetric lighting system
 * - High-density particle atmosphere
 * - Cinematic camera parallax with mouse tracking
 * - Glowing energy rings and halos
 * - Depth-layered holographic effects
 * - Smooth luxury motion design
 * 
 * Inspired by:
 * - Apple WWDC keynotes
 * - Linear product launches
 * - Draftly.space immersion
 * - Stripe 3D interactions
 * - Premium sci-fi UI
 */

'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

/**
 * MASSIVE ANIMATED AI CORE ORB
 * The centerpiece - highly visible, premium animated 3D object
 */
const MassiveCoreOrb: React.FC<{ mousePosition: THREE.Vector2 }> = ({ mousePosition }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const halosRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const elapsed = clock.getElapsedTime();

    // ✨ CORE PULSING - Luxurious breathing effect
    if (coreRef.current) {
      const pulse = Math.sin(elapsed * 1.5) * 0.15 + 1;
      coreRef.current.scale.setScalar(pulse);
      
      // Subtle rotation
      coreRef.current.rotation.x += 0.0002;
      coreRef.current.rotation.y += 0.0004;
    }

    // 🌟 GLOW LAYER - Reactive to core pulse
    if (glowRef.current) {
      const glowPulse = Math.sin(elapsed * 1.8) * 0.25 + 0.8;
      glowRef.current.scale.setScalar(2.2 * glowPulse);
      
      const material = glowRef.current.material as THREE.Material & { opacity: number };
      material.opacity = (Math.sin(elapsed * 2) * 0.15 + 0.35);
    }

    // 💫 RINGS ROTATION - Smooth orbital motion
    if (ringsRef.current) {
      ringsRef.current.rotation.x += 0.0005;
      ringsRef.current.rotation.z -= 0.0008;
      ringsRef.current.rotation.y += 0.0002;
    }

    // ✨ HALOS - Extra glow rings
    if (halosRef.current) {
      halosRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        mesh.rotation.z += (i % 2 === 0 ? 0.001 : -0.001);
        mesh.rotation.y += 0.0003;
        
        const scale = 1 + Math.sin(elapsed * 1.2 + i) * 0.1;
        mesh.scale.setScalar(scale);
      });
    }

    // 🎬 CINEMATIC MOUSE PARALLAX
    // Subtle camera-like tracking - not aggressive
    if (groupRef.current) {
      const targetX = mousePosition.x * 0.3;
      const targetY = mousePosition.y * 0.3;
      
      groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef} scale={2.5}>
      {/* 🌍 MASSIVE CORE - Premium gradient sphere */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#0ea5e9"
          emissiveIntensity={0.8}
          metalness={0.3}
          roughness={0.4}
          wireframe={false}
        />
      </mesh>

      {/* ✨ OUTER GLOW HALO */}
      <mesh ref={glowRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.1, 64, 64]} />
        <meshBasicMaterial
          color="#0ea5e9"
          transparent
          opacity={0.35}
          side={THREE.BackSide}
        />
      </mesh>

      {/* 💫 SECONDARY HALOS - Layered glow */}
      <group ref={halosRef}>
        {[0, 1, 2].map((i) => (
          <mesh key={`halo-${i}`} position={[0, 0, 0]}>
            <sphereGeometry args={[1 + (i + 1) * 0.35, 32, 32]} />
            <meshBasicMaterial
              color={i === 0 ? '#06b6d4' : '#38bdf8'}
              transparent
              opacity={0.15 - i * 0.04}
              side={THREE.BackSide}
            />
          </mesh>
        ))}
      </group>

      {/* 🪐 ORBITAL RINGS - Smooth rotating torus rings */}
      <group ref={ringsRef}>
        {[
          { radius: 1.8, thickness: 0.08, rotation: [0.3, 0, 0], color: '#38bdf8' },
          { radius: 2.3, thickness: 0.06, rotation: [0, 0.5, 0], color: '#06b6d4' },
          { radius: 2.8, thickness: 0.05, rotation: [-0.4, 0, 0.2], color: '#0ea5e9' },
        ].map((ring, i) => (
          <mesh
            key={`ring-${i}`}
            rotation={ring.rotation as [number, number, number]}
            position={[0, 0, 0]}
          >
            <torusGeometry args={[ring.radius, ring.thickness, 24, 200]} />
            <meshStandardMaterial
              color={ring.color}
              emissive={ring.color}
              emissiveIntensity={0.6}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        ))}
      </group>

      {/* 🌀 SUBTLE INNER ROTATION - Small fast rings */}
      <group>
        {[0, 1].map((i) => (
          <mesh
            key={`fast-ring-${i}`}
            rotation={[0.3 + i * 0.3, 0, 0]}
            position={[0, 0, 0]}
          >
            <torusGeometry args={[1.3 + i * 0.2, 0.04, 16, 80]} />
            <meshBasicMaterial
              color={i === 0 ? '#67e8f9' : '#38bdf8'}
              transparent
              opacity={0.5}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};

/**
 * VOLUMETRIC PARTICLE ATMOSPHERE
 * Dense, immersive particle field creating depth and motion
 */
const VolumetricParticles: React.FC<{ mousePosition: THREE.Vector2 }> = ({ mousePosition }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const elapsed = clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Subtle drift with mouse influence
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += Math.sin(elapsed * 0.3 + i) * 0.01 + mousePosition.x * 0.001;
      positions[i + 1] += Math.cos(elapsed * 0.2 + i) * 0.01 + mousePosition.y * 0.001;
      positions[i + 2] += Math.sin(elapsed * 0.15 + i) * 0.005;

      // Wrap around
      if (Math.abs(positions[i]) > 20) positions[i] *= -1;
      if (Math.abs(positions[i + 1]) > 20) positions[i + 1] *= -1;
      if (Math.abs(positions[i + 2]) > 15) positions[i + 2] *= -1;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Subtle rotation
    pointsRef.current.rotation.y += 0.00005;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={3000}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        sizeAttenuation
        color="#0ea5e9"
        opacity={0.4}
        transparent
        depthTest
        depthWrite={false}
      />
    </points>
  );
};

/**
 * CINEMATIC CAMERA CONTROLLER
 * Smooth mouse-following parallax for immersive feel
 */
const CinematicCameraController: React.FC<{ mousePosition: THREE.Vector2 }> = ({ mousePosition }) => {
  const { camera } = useThree();
  const targetPos = useRef({ x: 0, y: 0 });

  useFrame(() => {
    // Smooth camera tracking
    targetPos.current.x += (mousePosition.x * 1.5 - targetPos.current.x) * 0.08;
    targetPos.current.y += (mousePosition.y * 1.5 - targetPos.current.y) * 0.08;

    camera.position.x = targetPos.current.x;
    camera.position.y = targetPos.current.y + 0.5;
    camera.position.z = 8.5;

    camera.lookAt(0, 0, 0);
  });

  return null;
};

/**
 * SCENE LIGHTING SYSTEM
 * Premium cinematic lighting with reactive glow
 */
const CinematicLighting: React.FC = () => {
  return (
    <>
      {/* Key Light - Strong cyan glow */}
      <pointLight
        position={[15, 15, 10]}
        intensity={2}
        color="#0ea5e9"
        distance={50}
        decay={2}
      />

      {/* Fill Light - Purple accent */}
      <pointLight
        position={[-15, -10, 5]}
        intensity={1.2}
        color="#a855f7"
        distance={40}
        decay={2}
      />

      {/* Back Light - Subtle rim */}
      <pointLight
        position={[0, 0, -20]}
        intensity={0.8}
        color="#06b6d4"
        distance={30}
        decay={2}
      />

      {/* Ambient - Soft overall glow */}
      <ambientLight intensity={0.5} color="#ffffff" />

      {/* Environment - Premium night preset */}
      <Environment preset="night" />
    </>
  );
};

/**
 * MAIN SCENE CONTENT
 */
const SceneContent: React.FC<{ mousePosition: THREE.Vector2 }> = ({ mousePosition }) => {
  return (
    <>
      <CinematicLighting />
      <MassiveCoreOrb mousePosition={mousePosition} />
      <VolumetricParticles mousePosition={mousePosition} />
      <CinematicCameraController mousePosition={mousePosition} />
    </>
  );
};

/**
 * HERO SCENE - Main Component
 * High-performance 3D canvas with SSR safety
 */
const HeroScene: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState<THREE.Vector2>(new THREE.Vector2(0, 0));

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition(new THREE.Vector2(x, y));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isLoaded) {
    return <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 to-black" />;
  }

  return (
    <Canvas
      style={{
        position: 'absolute',
        inset: 0,
        background: 'transparent',
      }}
      dpr={Math.min(window.devicePixelRatio, 2)}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        precision: 'highp',
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 8.5]} fov={65} near={0.1} far={1000} />
      <SceneContent mousePosition={mousePosition} />
    </Canvas>
  );
};

export default HeroScene;
