import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Box, TorusKnot, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

// --- Icon Components ---

const SoftwareIcon = ({ hovered }: { hovered: boolean }) => {
    const meshRef = useRef<THREE.Group>(null!);

    useFrame(() => {
        // Spin faster when hovered
        const speed = hovered ? 2 : 0.5;
        meshRef.current.rotation.x += 0.01 * speed;
        meshRef.current.rotation.y += 0.015 * speed;
    });

    return (
        <group ref={meshRef}>
            <Float speed={hovered ? 5 : 2} rotationIntensity={hovered ? 1 : 0.5} floatIntensity={0.5}>
                <Icosahedron args={[1, 0]}>
                    <meshStandardMaterial color="#98ff98" wireframe />
                </Icosahedron>
                {/* Floating "bits" */}
                <Box args={[0.2, 0.2, 0.2]} position={[1.2, 0, 0]}>
                    <meshStandardMaterial color="#4ade80" />
                </Box>
                <Box args={[0.2, 0.2, 0.2]} position={[-1.2, 0.5, 0]}>
                    <meshStandardMaterial color="#4ade80" />
                </Box>
            </Float>
        </group>
    );
};

const NetworkIcon = ({ hovered }: { hovered: boolean }) => {
    const groupRef = useRef<THREE.Group>(null!);

    useFrame(() => {
        const speed = hovered ? 3 : 1;
        groupRef.current.rotation.y += 0.005 * speed;
    });

    return (
        <group ref={groupRef}>
            <Float speed={hovered ? 4 : 1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Main Hub */}
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[0.6, 16, 16]} />
                    <meshStandardMaterial color="#98ff98" wireframe />
                </mesh>
                {/* Satellites */}
                <mesh position={[1.2, 0, 0]}>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial color="#4ade80" />
                </mesh>
                <mesh position={[-1, 0.8, 0]}>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial color="#4ade80" />
                </mesh>
                <mesh position={[-0.5, -1, 0.5]}>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial color="#4ade80" />
                </mesh>
                {/* Links */}
                <mesh position={[0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.02, 0.02, 1.2]} />
                    <meshBasicMaterial color="#98ff98" opacity={0.5} transparent />
                </mesh>
            </Float>
        </group>
    )
}

const LeadershipIcon = ({ hovered }: { hovered: boolean }) => {
    const meshRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
        const speed = hovered ? 2 : 0.5;
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * speed) * 0.2;
    });

    return (
        <group ref={meshRef}>
            <Float speed={hovered ? 3 : 1} rotationIntensity={0.5} floatIntensity={0.5}>
                <TorusKnot args={[0.6, 0.2, 64, 8]}>
                    <meshStandardMaterial color="#98ff98" emissive="#98ff98" emissiveIntensity={0.2} />
                </TorusKnot>
            </Float>
        </group>
    )
}


interface Skills3DProps {
    category: string;
    hovered: boolean;
}

export default function Skills3D({ category, hovered }: Skills3DProps) {
    let IconComponent;

    if (category.includes('Software')) {
        IconComponent = SoftwareIcon;
    } else if (category.includes('Networking')) {
        IconComponent = NetworkIcon;
    } else {
        IconComponent = LeadershipIcon;
    }

    return (
        <div style={{ width: '100%', height: '150px', marginBottom: '1rem' }}>
            <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#98ff98" />
                <IconComponent hovered={hovered} />
            </Canvas>
        </div>
    );
}
