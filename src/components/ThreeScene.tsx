import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleWave = () => {
    const count = 2000;
    const mesh = useRef<THREE.InstancedMesh>(null!);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Generate random positions
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        if (!mesh.current) return;

        // Mouse interaction
        const { mouse } = state;

        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;

            // Update time
            t = particle.t += speed / 2;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;

            // Base Position
            particle.mx += (mouse.x * 100 - particle.mx) * 0.01;
            particle.my += (mouse.y * 100 - particle.my) * 0.01;

            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );

            // Scale based on "music" frequency simulation (using sin wave)
            const scale = (Math.sin(t * 5) + 1.5) / 2;
            dummy.scale.set(scale, scale, scale);

            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[0.2, 0]} />
            <meshPhongMaterial color="#98ff98" emissive="#98ff98" emissiveIntensity={0.05} transparent opacity={0.4} />
        </instancedMesh>
    );
};

export default function ThreeScene() {
    return (
        <Canvas
            eventSource={document.getElementById('root')!}
            eventPrefix="client"
            camera={{ position: [0, 0, 50], fov: 75 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0, // Behind content but visible
                pointerEvents: 'none', // Allow clicks to pass through
                background: '#050a05',
            }}
        >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} color="#98ff98" intensity={1} />
            <ParticleWave />
        </Canvas>
    );
}
