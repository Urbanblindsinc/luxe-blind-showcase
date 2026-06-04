
import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type HardwareColor = "black" | "bronze" | "gray" | "beige" | "white";
type CassetteShape = "square" | "round";
type ProductId = "roller" | "zebra" | "honeycomb";

const HW_MAT: Record<HardwareColor, { color: string; metalness: number; roughness: number }> = {
  black:  { color: "#1A1A1A", metalness: 0.75, roughness: 0.25 },
  bronze: { color: "#8B6E56", metalness: 0.65, roughness: 0.35 },
  gray:   { color: "#9E9E9E", metalness: 0.55, roughness: 0.35 },
  beige:  { color: "#C0B5A4", metalness: 0.25, roughness: 0.60 },
  white:  { color: "#F0EFEC", metalness: 0.20, roughness: 0.50 },
};

export interface BlindPreview3DProps {
  hardware: HardwareColor;
  cassetteShape: CassetteShape;
  fabricColor: string;
  productType: ProductId;
  blindWidth: number;
  blindHeight: number;
  showFabric: boolean;
  className?: string;
}

function Cassette({ shape, mat, width }: { shape: CassetteShape; mat: typeof HW_MAT[HardwareColor]; width: number }) {
  if (shape === "round") {
    return (
      <group position={[0, 0, 0.04]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.065, 0.065, width, 32, 1, false, 0, Math.PI]} />
          <meshStandardMaterial color={mat.color} metalness={mat.metalness} roughness={mat.roughness} />
        </mesh>
        <mesh position={[-width / 2 - 0.005, 0, 0]}>
          <boxGeometry args={[0.01, 0.11, 0.13]} />
          <meshStandardMaterial color={mat.color} metalness={mat.metalness} roughness={mat.roughness} />
        </mesh>
        <mesh position={[width / 2 + 0.005, 0, 0]}>
          <boxGeometry args={[0.01, 0.11, 0.13]} />
          <meshStandardMaterial color={mat.color} metalness={mat.metalness} roughness={mat.roughness} />
        </mesh>
      </group>
    );
  }
  return (
    <group position={[0, 0, 0.02]}>
      <mesh>
        <boxGeometry args={[width + 0.02, 0.1, 0.13]} />
        <meshStandardMaterial color={mat.color} metalness={mat.metalness} roughness={mat.roughness} />
      </mesh>
      <mesh position={[0, 0.046, 0.055]}>
        <boxGeometry args={[width, 0.007, 0.018]} />
        <meshStandardMaterial color={mat.color} metalness={mat.metalness + 0.1} roughness={Math.max(0.1, mat.roughness - 0.1)} />
      </mesh>
    </group>
  );
}

function FabricPanel({ color, width, height, type }: {
  color: string; width: number; height: number; type: ProductId;
}) {
  const zebraTex = useMemo(() => {
    if (type !== "zebra") return null;
    const c = document.createElement("canvas");
    c.width = 64; c.height = 128;
    const ctx = c.getContext("2d")!;
    const baseColor = new THREE.Color(color);
    const r = Math.round(baseColor.r * 255), g = Math.round(baseColor.g * 255), b = Math.round(baseColor.b * 255);
    for (let i = 0; i < 8; i++) {
      ctx.fillStyle = i % 2 === 0 ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},0.2)`;
      ctx.fillRect(0, i * 16, 64, 16);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, height * 3.5);
    return tex;
  }, [color, type, height]);

  return (
    <mesh position={[0, -height / 2, 0]}>
      <planeGeometry args={[width, height, 1, 1]} />
      <meshStandardMaterial
        color={color}
        roughness={0.85}
        metalness={0}
        map={zebraTex ?? undefined}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}

function BottomRail({ mat, width }: { mat: typeof HW_MAT[HardwareColor]; width: number }) {
  return (
    <mesh position={[0, 0, 0.015]}>
      <boxGeometry args={[width + 0.02, 0.03, 0.06]} />
      <meshStandardMaterial color={mat.color} metalness={mat.metalness} roughness={mat.roughness} />
    </mesh>
  );
}

function WindowFrame({ width, height }: { width: number; height: number }) {
  const tw = 0.055;
  const hw = width + tw * 2;
  return (
    <group position={[0, 0, -0.01]}>
      <mesh position={[0, height / 2 + tw / 2, 0]}>
        <boxGeometry args={[hw, tw, 0.04]} />
        <meshStandardMaterial color="#EDE8DF" roughness={0.7} />
      </mesh>
      <mesh position={[0, -height / 2 - tw / 2, 0]}>
        <boxGeometry args={[hw, tw, 0.04]} />
        <meshStandardMaterial color="#EDE8DF" roughness={0.7} />
      </mesh>
      <mesh position={[-width / 2 - tw / 2, 0, 0]}>
        <boxGeometry args={[tw, height, 0.04]} />
        <meshStandardMaterial color="#EDE8DF" roughness={0.7} />
      </mesh>
      <mesh position={[width / 2 + tw / 2, 0, 0]}>
        <boxGeometry args={[tw, height, 0.04]} />
        <meshStandardMaterial color="#EDE8DF" roughness={0.7} />
      </mesh>
      {/* Sky backdrop */}
      <mesh position={[0, 0, -0.07]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color="#C4D8E8" />
      </mesh>
    </group>
  );
}

function Room() {
  return (
    <group>
      <mesh position={[0, 0, -1.4]}>
        <planeGeometry args={[5, 4]} />
        <meshStandardMaterial color="#181512" roughness={0.95} />
      </mesh>
      <mesh position={[-2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[2.8, 4]} />
        <meshStandardMaterial color="#141210" roughness={0.95} />
      </mesh>
      <mesh position={[0, -1.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5, 2.8]} />
        <meshStandardMaterial color="#0E0C0A" roughness={0.9} metalness={0.04} />
      </mesh>
    </group>
  );
}

function BlindGroup({ hardware, cassetteShape, fabricColor, productType, bw, bh, showFabric }: {
  hardware: HardwareColor; cassetteShape: CassetteShape; fabricColor: string;
  productType: ProductId; bw: number; bh: number; showFabric: boolean;
}) {
  const mat = HW_MAT[hardware] || HW_MAT.white;
  const cassY = showFabric ? bh / 2 + 0.05 : 0;
  const railY = showFabric ? -(bh / 2) : -0.22;
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t * 0.18) * 0.035;
    ref.current.position.y = Math.sin(t * 0.28) * 0.007;
  });

  return (
    <group ref={ref}>
      <WindowFrame width={bw + 0.08} height={bh + (showFabric ? 0.1 : 0.25)} />
      <group position={[0, cassY, 0.02]}>
        <Cassette shape={cassetteShape} mat={mat} width={bw} />
      </group>
      {showFabric && (
        <group position={[0, cassY - 0.05, 0.01]}>
          <FabricPanel color={fabricColor} width={bw} height={bh} type={productType} />
        </group>
      )}
      <group position={[0, railY, 0.02]}>
        <BottomRail mat={mat} width={bw} />
      </group>
    </group>
  );
}

function Scene(props: BlindPreview3DProps & { bw: number; bh: number }) {
  return (
    <>
      <ambientLight intensity={0.4} color="#FFF8F0" />
      <directionalLight position={[-2.5, 3, 2]} intensity={1.8} color="#FFF5E8" castShadow />
      <pointLight position={[0, 0.4, -0.9]} intensity={1.0} color="#B8D4E8" distance={4} />
      <pointLight position={[-1.5, 0.5, 1.5]} intensity={0.55} color="#FFE8C0" distance={4} />
      <Room />
      <BlindGroup
        hardware={props.hardware}
        cassetteShape={props.cassetteShape}
        fabricColor={props.fabricColor}
        productType={props.productType}
        bw={props.bw}
        bh={props.bh}
        showFabric={props.showFabric}
      />
    </>
  );
}

const BlindPreview3D: React.FC<BlindPreview3DProps> = (props) => {
  const bw = Math.min(1.4, Math.max(0.7, (props.blindWidth / props.blindHeight) * 1.1));
  const bh = 1.2;

  return (
    <Canvas
      className={props.className}
      camera={{ position: [0, 0.1, 2.8], fov: 38 }}
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <Scene {...props} bw={bw} bh={bh} />
      </Suspense>
    </Canvas>
  );
};

export default BlindPreview3D;
