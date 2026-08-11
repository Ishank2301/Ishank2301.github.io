import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Starfield() {
  const ref = useRef()
  const sphere = useMemo(() => {
    const positions = new Float32Array(3000)
    for (let i = 0; i < 3000; i++) {
      positions[i] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [])

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 15
    ref.current.rotation.y -= delta / 20
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#10b981" size={0.015} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}

export default function ParticleNetwork() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Starfield />
      </Canvas>
    </div>
  )
}
