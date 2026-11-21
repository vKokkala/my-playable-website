import { useMemo, useRef } from "react";
import { Color, DoubleSide, ShaderMaterial, Vector3 } from "three";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import rippleVertexShader from "./shaders/ripple/vertex.glsl?raw";
import rippleFragmentShader from "./shaders/ripple/fragment.glsl?raw";
import { COLORS } from "./theme/colors";

function RipplePlane() {
  const uniforms = useMemo(
    () => ({
      uPointer: { value: new Vector3() },
      uTime: { value: 0 },
      uClickTime: { value: -1000 },
      uBaseColor: { value: new Color(COLORS.lightBlue) },
      uPeakColor: { value: new Color(COLORS.amber) },
      uDeepColor: { value: new Color(COLORS.deepIndigo) },
    }),
    [],
  );

  // R3F shallow-copies each uniform into the material's own uniforms object,
  // so writes must go through the real ShaderMaterial, not the memoized `uniforms`.
  const materialRef = useRef<ShaderMaterial>(null!);

  const handleClick = (e: ThreeEvent<PointerEvent>) => {
    const { uPointer, uClickTime, uTime } = materialRef.current.uniforms;
    uPointer.value.copy(e.point);
    e.object.worldToLocal(uPointer.value);
    uClickTime.value = uTime.value;
  };

  useFrame((state) => {
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh position={[0, 0, 0]} castShadow onPointerDown={handleClick}>
      <planeGeometry args={[10, 10, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
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
