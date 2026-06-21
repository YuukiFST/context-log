'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Text3D, Center } from '@react-three/drei'

export default function SceneInner() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <Center>
          <mesh>
            <icosahedronGeometry args={[1.2, 0]} />
            <meshStandardMaterial color="#D9854A" wireframe />
          </mesh>
        </Center>
      </Float>
      {Array.from({ length: 30 }).map((_, i) => (
        <Float key={i} speed={0.5 + Math.random() * 1} rotationIntensity={0.1} floatIntensity={0.3}>
          <mesh
            position={[
              (Math.random() - 0.5) * 6,
              (Math.random() - 0.5) * 6,
              (Math.random() - 0.5) * 6 - 2,
            ]}
            scale={0.02 + Math.random() * 0.04}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#D9854A" opacity={0.3 + Math.random() * 0.3} transparent />
          </mesh>
        </Float>
      ))}
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
    </Canvas>
  )
}
