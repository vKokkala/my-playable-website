import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// A simple 3D box component with proper materials and positioning
function Box() {
  return (
    <mesh position={[0, -1.5, 0]} castShadow>
      {/* Box geometry: width=2, height=1, depth=2 */}
      <boxGeometry args={[2, 1, 2]} />

      {/* Standard material for realistic lighting response */}
      <meshStandardMaterial color="#4a90d9" roughness={0.3} metalness={0.2} />
    </mesh>
  );
}

// Main scene component with all the 3D elements
function Scene() {
  return (
    <>
      {/* Ambient light - provides base illumination from all directions */}
      <ambientLight intensity={0.75} />

      {/* Directional light - simulates a sun, creates shadows and highlights */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        castShadow={true}
      />

      {/* Our box component */}
      <Box />

      {/* Invisible floor that only shows the shadows cast onto it */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
      {/* Orbit controls - lets you rotate and pan around the scene */}
      <OrbitControls
        enableZoom={false}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </>
  );
}

function App() {
  // Canvas is the main R3F container - it fills its parent (#root), which index.css makes fullscreen
  // `shadows` turns on shadow rendering for the whole scene
  return (
    <Canvas shadows>
      <Scene />
    </Canvas>
  );
}

export default App;
