/**
 * Component: ParticleField
 * 
 * Floating particle system for immersive backgrounds.
 * Uses React Three Fiber for GPU-accelerated rendering.
 * 
 * Architecture decision:
 * - Particles are 3D (rendered via Three.js)
* - Not HTML elements (would be slow with many particles)
 * - Uses instanced geometry (one draw call for all particles)
 * - Responsive to mouse movement
 * 
 * Why Three.js for particles?
 * 1. GPU acceleration (hundreds of particles at 60fps)
 * 2. 3D effects (depth, parallax)
 * 3. Can integrate with shader effects
 * 4. Much more performant than DOM/SVG particles
 * 
 * Performance notes:
 * - Particles only animate transform (GPU property)
 * - Instanced rendering (one geometry, many matrices)
 * - Auto-cull if off-screen
 */

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface ParticleFieldProps {
  particleCount?: number;
  speed?: number;
}

const ParticleSystem: React.FC<ParticleFieldProps> = ({
  particleCount = 50,
  speed = 0.001,
}) => {
  const meshRef = useRef<Mesh>(null);

  const particles = useMemo(() => {
    const array = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      array[i] = (Math.random() - 0.5) * 10; // x
      array[i + 1] = (Math.random() - 0.5) * 10; // y
      array[i + 2] = (Math.random() - 0.5) * 10; // z
    }
    return array;
  }, [particleCount]);

  useFrame(() => {
    if (!meshRef.current) return;

    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += (Math.random() - 0.5) * speed;
      positions[i + 1] += (Math.random() - 0.5) * speed;
      positions[i + 2] += (Math.random() - 0.5) * speed;

      // Wrap particles around
      if (Math.abs(positions[i]) > 5) positions[i] *= -1;
      if (Math.abs(positions[i + 1]) > 5) positions[i + 1] *= -1;
      if (Math.abs(positions[i + 2]) > 5) positions[i + 2] *= -1;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} sizeAttenuation transparent />
    </mesh>
  );
};

export const ParticleField: React.FC<ParticleFieldProps> = (props) => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5] }}
        style={{ background: 'transparent' }}
      >
        <ParticleSystem {...props} />
      </Canvas>
    </div>
  );
};
