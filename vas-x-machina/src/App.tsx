import { useMemo } from "react";
import { Color, DoubleSide, Vector3 } from "three";
import { Canvas, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import rippleVertexShader from "./shaders/ripple/vertex.glsl?raw";
import rippleFragmentShader from "./shaders/ripple/fragment.glsl?raw";
import { COLORS } from "./theme/colors";

function RipplePlane() {
  const uniforms = useMemo(
    () => ({
      uPointer: { value: new Vector3() },
      uBaseColor: { value: new Color(COLORS.lightBlue) },
      uPeakColor: { value: new Color(COLORS.amber) },
      uDeepColor: { value: new Color(COLORS.deepIndigo) },
    }),
    [],
  );

  const handleClick = (e: ThreeEvent<PointerEvent>) => {
    uniforms.uPointer.value.copy(e.object.worldToLocal(e.point.clone()));
  };

  return (
    <mesh position={[0, 0, 0]} castShadow onPointerDown={handleClick}>
      <planeGeometry args={[4, 4, 64, 64]} />
      <shaderMaterial
        vertexShader={rippleVertexShader}
        fragmentShader={rippleFragmentShader}
        uniforms={uniforms}
        side={DoubleSide}
        // wireframe
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <RipplePlane />
      <OrbitControls enableZoom={false} />
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
