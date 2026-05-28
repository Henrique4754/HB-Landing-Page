import { useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, PerspectiveCamera } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";

/**
 * Câmera orbital: faz um 360° completo em torno do iPhone conforme o scroll
 * vai de 0→1. Em progress 0 e progress 1 a câmera fica na mesma posição
 * frontal — explodido no começo, montado no fim, tela virada pra câmera.
 *
 * IMPORTANTE: o modelo deste GLB está orientado com a frente (tela) no eixo
 * +X (não +Z). Por isso a posição da câmera usa `cos(angle)` em X e
 * `sin(angle)` em Z — em ângulo 0 a câmera está em +X olhando pra tela.
 *
 * O `camera.lookAt(origin)` por frame mantém a câmera sempre apontada pro
 * centro do aparelho, independente da posição da órbita.
 */
function OrbitingCamera({ progress }: { progress: MotionValue<number> }) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const radius = 0.5;
  const eyeY = 0.06;

  // Arco da órbita ancorado nos ângulos capturados no debug.
  const startAngleRad = (START_ANGLE_DEG * Math.PI) / 180;
  const endAngleRad = (END_ANGLE_DEG * Math.PI) / 180;

  useFrame(() => {
    const angle = startAngleRad + progress.get() * (endAngleRad - startAngleRad);
    camera.position.set(Math.cos(angle) * radius, eyeY, Math.sin(angle) * radius);
    camera.lookAt(target);
  });

  return null;
}

const MODEL_URL = "/models/iphone.glb";

// Pré-carrega o modelo (4MB) assim que esse chunk é importado.
// useDraco=false, useMeshopt=true (GLB foi otimizado com meshopt).
useGLTF.preload(MODEL_URL, false, true);

// Pontos âncora capturados via debug log — ajuste fino do trecho da animação
// e do arco da órbita que o scroll vai dirigir.
const START_ANGLE_DEG = 244.3;
const END_ANGLE_DEG = 357.8;
const START_TIME_S = 43.62;
const END_TIME_S = 45.0;

/**
 * Modelo do iPhone com a animação "iPhone 12 Teardown" (45s) embutida no GLB.
 *
 * Mixer **manual** (não usamos `useAnimations`) porque precisamos cravar o
 * tempo da animação a cada frame baseado no scroll, sem o drei tentar avançar
 * o mixer por conta própria. `action.play()` ativa; nós sobrescrevemos
 * `action.time` direto e forçamos `mixer.update(0)` pra aplicar.
 *
 * O clip do GLB é um CICLO completo (montado→explodido→montado em 45s).
 * Pra ter explodido no topo e montado no fim, tocamos só a SEGUNDA METADE
 * do clip (de explodido em duration/2 até montado em duration):
 *   - progress 0 = aparelho explodido (action.time = duration/2)
 *   - progress 1 = aparelho montado   (action.time = duration)
 *
 * `position={[0,-0.073,0]}` centraliza o modelo na vertical (bbox vai de
 * y=0 na base até y=0.147 no topo).
 */
function Model({ progress }: { progress: MotionValue<number> }) {
  const { scene, animations } = useGLTF(MODEL_URL, false, true);

  const { mixer, clip } = useMemo(() => {
    const m = new THREE.AnimationMixer(scene);
    const c = animations[0];
    const action = m.clipAction(c);
    action.play();
    return { mixer: m, clip: c };
  }, [scene, animations]);

  useFrame(() => {
    const action = mixer.existingAction(clip);
    if (!action) return;
    // Mapeia o scroll pro trecho exato do clip definido pelos pontos âncora.
    action.time = START_TIME_S + progress.get() * (END_TIME_S - START_TIME_S);
    mixer.update(0);
  });

  return <primitive object={scene} position={[0, -0.073, 0]} />;
}

/**
 * Canvas do hero.
 * - Câmera FIXA na frente do aparelho (+X, onde fica a tela do iPhone neste GLB).
 *   O scroll só dirige a animação explodido → montado; sem giro de câmera.
 * - Iluminação: ambiente + 2 direcionais + HDR "city" pra reflexos do metal/vidro.
 * - dpr capado em 1.5 pra economizar fillrate no mobile.
 * - Handler de context-lost: se a GPU resetar o contexto (resize, devtools,
 *   troca de aba), R3F restaura automaticamente em vez de perder o modelo.
 */
export function IphoneCanvas({ progress }: { progress: MotionValue<number> }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false,
      }}
      style={{ background: "transparent" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
        });
      }}
    >
      <PerspectiveCamera makeDefault position={[0.5, 0.06, 0]} fov={32} near={0.01} far={10} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[1.5, 2, 1.5]} intensity={1.4} />
      <directionalLight position={[-1.5, -0.5, -1]} intensity={0.45} />
      <Environment preset="city" />
      <OrbitingCamera progress={progress} />
      <Model progress={progress} />
    </Canvas>
  );
}
