import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import { Mesh, BufferGeometry, Float32BufferAttribute, LineSegments } from 'three';

const Triangle = React.forwardRef<LineSegments, { position?: [number, number, number] }>((props, ref) => {
  // Define a simple triangle geometry
  const geometry = React.useMemo(() => {
    const geom = new BufferGeometry();
    const vertices = new Float32Array([
      0, 1, 0,
      -1, -1, 0,
      1, -1, 0,
    ]);
    geom.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    geom.setIndex([0, 1, 2, 0]); // close the triangle
    return geom;
  }, []);
  return (
    <group position={props.position}>
      <lineSegments ref={ref} geometry={geometry}>
        <lineBasicMaterial color="black" linewidth={2} />
      </lineSegments>
    </group>
  );
});

const CircleBorder = React.forwardRef<LineSegments, { position?: [number, number, number] }>((props, ref) => {
  // Create a circle geometry using lines
  const geometry = React.useMemo(() => {
    const geom = new BufferGeometry();
    const segments = 64;
    const radius = 1;
    const vertices: number[] = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      vertices.push(Math.cos(theta) * radius, Math.sin(theta) * radius, 0);
    }
    geom.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    return geom;
  }, []);
  return (
    <group position={props.position}>
      <lineSegments ref={ref} geometry={geometry}>
        <lineBasicMaterial color="black" linewidth={2} />
      </lineSegments>
    </group>
  );
});

const FloatingGeometry = () => {
  const boxRef = useRef<Mesh>(null);
  const triangleRef = useRef<LineSegments>(null);
  const circleRef = useRef<LineSegments>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (boxRef.current) {
      boxRef.current.rotation.x = time * 0.3;
      boxRef.current.rotation.z = time * 0.2;
      boxRef.current.position.x = Math.cos(time * 0.5) * 2;
    }
    if (triangleRef.current) {
      triangleRef.current.rotation.z = time * 0.7;
      triangleRef.current.position.y = Math.sin(time * 0.8) * 1.5;
    }
    if (circleRef.current) {
      circleRef.current.rotation.x = time * 0.5;
      circleRef.current.rotation.y = time * 0.5;
      circleRef.current.position.x = Math.sin(time * 0.6) * -2;
    }
  });

  return (
    <>
      <Box ref={boxRef} args={[0.8, 0.8, 0.8]} position={[2, 1, -1]}>
        <meshStandardMaterial color="#8b5cf6" wireframe />
      </Box>
      <Triangle ref={triangleRef} position={[-2, 0, 0]} />
      <CircleBorder ref={circleRef} position={[0, -1.5, 1]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
    </>
  );
};

const Scene3D = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <FloatingGeometry />
      </Canvas>
    </div>
  );
};

export default Scene3D;