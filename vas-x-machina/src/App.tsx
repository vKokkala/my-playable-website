import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { COLORS } from "./theme/colors";

function Box() {
  const handleClick = (e) => {
    console.log("i was clicked!!");
  };

  return (
    <mesh position={[0, 0, 0]} castShadow onPointerDown={(e) => handleClick(e)}>
      {/* width, height, depth, then segment counts per axis (denser wireframe grid) */}
      <boxGeometry args={[2, 2, 2, 20, 20, 20]} />
      <meshStandardMaterial
        color={COLORS.lightBlue}
        roughness={0.3}
        metalness={0.2}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <Box />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
}

function App() {
  return (
    <Canvas shadows>
      <Scene />
    </Canvas>
  );
}

export default App;
