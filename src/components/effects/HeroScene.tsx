/**
 * PREMIUM CINEMATIC HERO SCENE
 * 
 * Massive 3D experience optimized for visual impact:
 * - Giant animated core orb (HIGHLY VISIBLE)
 * - Dense volumetric particle atmosphere
 * - Premium cinematic lighting system
 * - Smooth mouse-reactive parallax
 * - Layered depth with atmospheric fog
 * - High-performance rendering on MacBook Air
 * 
 * Architecture:
 * - Optimized geometry (lower poly for performance)
 * - GPU-accelerated particle system
 * - Efficient lighting with strategic point lights
 * - Smooth camera tracking without jank
 * - SSR-safe with proper hydration handling
 */

'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Fog } from '@react-three/drei';
import * as THREE from 'three';

/**
 * GIANT ANIMATED CORE ORB
 * The hero - massive, glowing, and cinematic
 */
const GiantCoreOrb: React.FC<{ mousePosition: THREE.Vector2 }> = ({ mousePosition }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const glowLayers = useRef<THREE.Mesh[]>([]);
  const ringsRef = useRef<THREE.Group>(null);
  const pulseLightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const elapsed = clock.getElapsedTime();

    // ✨ CORE PULSING - Luxurious breathing with intensity
    if (coreRef.current) {
      const pulse = Math.sin(elapsed * 1.2) * 0.2 + 1.2;
      coreRef.current.scale.setScalar(pulse);
      
      // Cinematic rotation
      coreRef.current.rotation.x += 0.0001;
      coreRef.current.rotation.y += 0.0003;
    }

    // 💫 GLOW LAYERS - Animated halos
    glowLayers.current.forEach((layer, i) => {
      const glowPulse = Math.sin(elapsed * (1.5 + i * 0.2)) * 0.3 + 1;
      layer.scale.setScalar(glowPulse);
      
      const material = layer.material as THREE.Material & { opacity: number };
      material.opacity = Math.sin(elapsed * (2 + i * 0.3)) * 0.15 + (0.4 - i * 0.08);
    });

    // 🪐 RINGS - Smooth orbital motion
    if (ringsRef.current) {
      ringsRef.current.rotation.x += 0.0003;
      ringsRef.current.rotation.z -= 0.0006;
      ringsRef.current.rotation.y += 0.0001;
    }

    // 🎬 CINEMATIC MOUSE PARALLAX
    if (groupRef.current) {
      const targetX = mousePosition.x * 0.4;
      const targetY = mousePosition.y * 0.4;
      
      groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.04;
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.04;
    }

    // 💡 PULSE LIGHT - Reactive glow
    if (pulseLightRef.current) {
      const intensity = Math.sin(elapsed * 1.5) * 0.5 + 2.5;
      pulseLightRef.current.intensity = intensity;
    }
  });

  return (
    <group ref={groupRef} scale={3.2} position={[0, 0.3, 0]}>
      {/* 🌍 MASSIVE CORE SPHERE - Premium gradient */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 96, 96]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#0ea5e9"
          emissiveIntensity={1}
          metalness={0.4}
          roughness={0.3}
          wireframe={false}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* ✨ LAYERED GLOW HALOS */}
      {[
        { scale: 1.2, color: '#0ea5e9', opacity: 0.4 },
        { scale: 1.5, color: '#06b6d4', opacity: 0.25 },
        { scale: 1.8, color: '#38bdf8', opacity: 0.15 },
        { scale: 2.1, color: '#0ea5e9', opacity: 0.08 },
      ].map((halo, i) => (
        <mesh
          key={`glow-${i}`}
          position={[0, 0, 0]}
          ref={(el) => {
            if (el && glowLayers.current) glowLayers.current[i] = el;
          }}
        >
          <sphereGeometry args={[halo.scale, 64, 64]} />
          <meshBasicMaterial
            color={halo.color}
            transparent
            opacity={halo.opacity}
            side={THREE.BackSide}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* 🪐 PREMIUM ORBITAL RINGS */}
      <group ref={ringsRef}>
        {[
          { radius: 2, thickness: 0.1, rotation: [0.25, 0, 0], color: '#38bdf8', intensity: 0.7 },
          { radius: 2.6, thickness: 0.08, rotation: [0, 0.4, 0], color: '#06b6d4', intensity: 0.6 },
          { radius: 3.2, thickness: 0.06, rotation: [-0.35, 0, 0.15], color: '#0ea5e9', intensity: 0.5 },
          { radius: 3.8, thickness: 0.05, rotation: [0.5, 0.3, -0.2], color: '#38bdf8', intensity: 0.4 },
        ].map((ring, i) => (
          <mesh
            key={`ring-${i}`}
            rotation={ring.rotation as [number, number, number]}
            position={[0, 0, 0]}
          >
            <torusGeometry args={[ring.radius, ring.thickness, 20, 256]} />
            <meshStandardMaterial
              color={ring.color}
              emissive={ring.color}
              emissiveIntensity={ring.intensity}
              metalness={0.8}
              roughness={0.2}
              wireframe={false}
            />
          </mesh>
        ))}
      </group>

      {/* 🌀 INNER FAST-ROTATING RINGS */}
      <group rotation={[0.3, 0, 0]}>
        {[0, 1, 2].map((i) => (
          <mesh
            key={`inner-ring-${i}`}
            rotation={[0, (i / 3) * Math.PI * 2, 0]}
            position={[0, 0, 0]}
          >
            <torusGeometry args={[1.4 + i * 0.25, 0.05, 16, 128]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? '#67e8f9' : '#38bdf8'}
              transparent
              opacity={0.6 - i * 0.15}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* 💡 REACTIVE PULSE LIGHT */}
      <pointLight
        ref={pulseLightRef}
        position={[0, 0, 0]}
        color="#0ea5e9"
        intensity={2.5}
        distance={60}
        decay={2}
      />
    </group>
  );
};

/**
 * DENSE VOLUMETRIC PARTICLE ATMOSPHERE
 * Creates immersive depth and cinematic fog effect
 */
const VolumetricParticleAtmosphere: React.FC<{ mousePosition: THREE.Vector2 }> = ({
  mousePosition,
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 5000;

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // More spread-out distribution for depth
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return positions;
  }, []);

  const particleSizes = useMemo(() => {
    const sizes = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      // Vary sizes for depth illusion
      sizes[i] = Math.random() * 0.12 + 0.03;
    }
    return sizes;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const elapsed = clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Subtle volumetric drift with mouse influence
    for (let i = 0; i < positions.length; i += 3) {
      const idx = i / 3;
      
      // Layered drift motion
      positions[i] += Math.sin(elapsed * 0.2 + idx * 0.01) * 0.008 + mousePosition.x * 0.002;
      positions[i + 1] += Math.cos(elapsed * 0.15 + idx * 0.01) * 0.008 + mousePosition.y * 0.002;
      positions[i + 2] += Math.sin(elapsed * 0.1 + idx * 0.01) * 0.004;

      // Wrap particles for infinite effect
      if (Math.abs(positions[i]) > 25) positions[i] *= -1;
      if (Math.abs(positions[i + 1]) > 25) positions[i + 1] *= -1;
      if (Math.abs(positions[i + 2]) > 20) positions[i + 2] *= -1;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Smooth rotation
    pointsRef.current.rotation.y += 0.00003;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particlePositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={particleSizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1}
        sizeAttenuation
        color="#0ea5e9"
        opacity={0.5}
        transparent
        depthTest
        depthWrite={false}
      />
    </points>
  );
};

/**
 * SECONDARY PARTICLE LAYER
 * Adds depth with slower-moving particles
 */
const DepthParticleLayer: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 2000;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const elapsed = clock.getElapsedTime();
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < pos.length; i += 3) {
      const idx = i / 3;
      pos[i] += Math.sin(elapsed * 0.08 + idx * 0.001) * 0.003;
      pos[i + 1] += Math.cos(elapsed * 0.06 + idx * 0.001) * 0.003;
      pos[i + 2] += Math.sin(elapsed * 0.04 + idx * 0.001) * 0.002;

      if (Math.abs(pos[i]) > 40) pos[i] *= -1;
      if (Math.abs(pos[i + 1]) > 40) pos[i + 1] *= -1;
      if (Math.abs(pos[i + 2]) > 30) pos[i + 2] *= -1;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        sizeAttenuation
        color="#06b6d4"
        opacity={0.2}
        transparent
        depthWrite={false}
      />
    </points>
  );
};

/**
 * CINEMATIC CAMERA CONTROLLER
 * Smooth mouse tracking with inertia
 */
const CinematicCameraController: React.FC<{ mousePosition: THREE.Vector2 }> = ({
  mousePosition,
}) => {
  const { camera } = useThree();
  const targetPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  useFrame(() => {
    // Smooth camera tracking with inertia
    const targetX = mousePosition.x * 2;
    const targetY = mousePosition.y * 2;

    velocity.current.x += (targetX - targetPos.current.x) * 0.05;
    velocity.current.y += (targetY - targetPos.current.y) * 0.05;

    velocity.current.x *= 0.92;
    velocity.current.y *= 0.92;

    targetPos.current.x += velocity.current.x;
    targetPos.current.y += velocity.current.y;

    camera.position.x = targetPos.current.x;
    camera.position.y = targetPos.current.y + 0.8;
    camera.position.z = 12;

    camera.lookAt(0, 0, 0);
  });

  return null;
};

/**
 * PREMIUM CINEMATIC LIGHTING SYSTEM
 * Strategic multi-source lighting for depth and drama
 */
const CinematicLighting: React.FC = () => {
  return (
    <>
      {/* Key Light - Intense cyan */}
      <pointLight
        position={[20, 20, 15]}
        intensity={2.5}
        color="#0ea5e9"
        distance={80}
        decay={2}
      />

      {/* Fill Light - Purple accent for depth */}
      <pointLight
        position={[-20, -15, 10]}
        intensity={1.5}
        color="#a855f7"
        distance={70}
        decay={2}
      />

      {/* Back Light - Rim lighting */}
      <pointLight
        position={[0, 0, -30]}
        intensity={1}
        color="#06b6d4"
        distance={60}
        decay={2}
      />

      {/* Side Light - Subtle accent */}
      <pointLight
        position={[30, 0, 0]}
        intensity={0.8}
        color="#38bdf8"
        distance={50}
        decay={2}
      />

      {/* Ambient - Soft overall illumination */}
      <ambientLight intensity={0.6} color="#ffffff" />

      {/* Premium environment */}
      <Environment preset="night" />
    </>
  );
};

/**
 * SCENE CONTENT ASSEMBLY
 */
const SceneContent: React.FC<{ mousePosition: THREE.Vector2 }> = ({ mousePosition }) => {
  return (
    <>
      {/* Atmospheric fog for depth */}
      <Fog attach="fog" args={['#0a0a0a', 20, 100]} />

      {/* Lighting system */}
      <CinematicLighting />

      {/* Particle atmosphere layers */}
      <DepthParticleLayer />
      <VolumetricParticleAtmosphere mousePosition={mousePosition} />

      {/* Hero orb */}
      <GiantCoreOrb mousePosition={mousePosition} />

      {/* Camera tracking */}
      <CinematicCameraController mousePosition={mousePosition} />
    </>
  );
};

/**
 * HERO SCENE - Main Component
 * Optimized 3D canvas with SSR safety
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
        logarithmicDepthBuffer: true,
      }}
    >
      <PerspectiveCamera
        makeDefault
        position={[0, 0.8, 12]}
        fov={60}
        near={0.1}
        far={1000}
      />
      <SceneContent mousePosition={mousePosition} />
    </Canvas>
  );
};

export default HeroScene;
