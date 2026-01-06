import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Box, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

// --- Icon Components ---

const DevIcon = () => {
    const meshRef = useRef<THREE.Group>(null!);
    useFrame((state) => {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    });

    return (
        <group ref={meshRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Octahedron args={[1, 0]}>
                    <meshStandardMaterial color="#98ff98" wireframe />
                </Octahedron>
                <Box args={[0.5, 0.5, 0.5]}>
                    <meshStandardMaterial color="#98ff98" emissive="#98ff98" emissiveIntensity={0.5} transparent opacity={0.8} />
                </Box>
            </Float>
        </group>
    );
};

const NetworkIcon = () => {
    const groupRef = useRef<THREE.Group>(null!);

    useFrame(() => {
        groupRef.current.rotation.y += 0.005;
    });

    return (
        <group ref={groupRef}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <Sphere args={[0.3, 16, 16]} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#98ff98" emissive="#98ff98" emissiveIntensity={0.8} />
                </Sphere>
                <Sphere args={[0.2, 16, 16]} position={[1, 0.5, 0]}>
                    <meshStandardMaterial color="#98ff98" wireframe />
                </Sphere>
                <Sphere args={[0.2, 16, 16]} position={[-0.8, -0.6, 0.5]}>
                    <meshStandardMaterial color="#98ff98" wireframe />
                </Sphere>
                {/* Connection Lines (Cyllinders) */}
                <mesh position={[0.5, 0.25, 0]} rotation={[0, 0, -0.5]}>
                    <cylinderGeometry args={[0.02, 0.02, 1.2]} />
                    <meshBasicMaterial color="#98ff98" transparent opacity={0.3} />
                </mesh>
                <mesh position={[-0.4, -0.3, 0.25]} rotation={[0, 0, 1]}>
                    <cylinderGeometry args={[0.02, 0.02, 1.2]} />
                    <meshBasicMaterial color="#98ff98" transparent opacity={0.3} />
                </mesh>
            </Float>
        </group>
    );
};

const SatcomIcon = () => {
    const dishRef = useRef<THREE.Group>(null!);
    useFrame((state) => {
        dishRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
        dishRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    });

    return (
        <group ref={dishRef}>
            <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
                {/* Dish */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <sphereGeometry args={[1, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.3]} />
                    <meshStandardMaterial color="#98ff98" wireframe side={THREE.DoubleSide} />
                </mesh>
                {/* Feed */}
                <mesh position={[0, 0, 0.8]}>
                    <sphereGeometry args={[0.1]} />
                    <meshStandardMaterial color="white" emissive="white" emissiveIntensity={1} />
                </mesh>
                <mesh position={[0, 0, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.02, 0.05, 0.8]} />
                    <meshStandardMaterial color="#98ff98" />
                </mesh>
            </Float>
        </group>
    )
}

const DefIcon = () => { // Military / Shield
    const shieldRef = useRef<THREE.Group>(null!);
    useFrame((state) => {
        shieldRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    });

    return (
        <group ref={shieldRef}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                <Torus args={[0.8, 0.1, 8, 30]}>
                    <meshStandardMaterial color="#98ff98" wireframe />
                </Torus>
                <Octahedron args={[0.5]} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#98ff98" transparent opacity={0.5} />
                </Octahedron>
            </Float>
        </group>
    )
}


// --- Main wrapper ---

interface Experience3DProps {
    type: string;
}

export default function Experience3D({ type }: Experience3DProps) {
    let IconComponent;
    switch (type) {
        case 'dev':
            IconComponent = DevIcon;
            break;
        case 'network':
            IconComponent = NetworkIcon;
            break;
        case 'satcom':
            IconComponent = SatcomIcon;
            break;
        case 'mil':
            IconComponent = DefIcon;
            break;
        default:
            IconComponent = DevIcon;
    }

    return (
        <div style={{ width: '100%', height: '100%', minHeight: '200px' }}>
            <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#98ff98" />
                <IconComponent />
            </Canvas>
        </div>
    );
}
