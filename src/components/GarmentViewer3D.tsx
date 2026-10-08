"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface GarmentMeshProps {
  wireframe: boolean;
  materialMode: "obsidian" | "silver" | "acid" | "matte";
  isSimulating: boolean;
}

const GarmentMesh: React.FC<GarmentMeshProps> = ({
  wireframe,
  materialMode,
  isSimulating,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  const materials = {
    obsidian: {
      color: "#0a0a0c",
      roughness: 0.18,
      metalness: 0.85,
      clearcoat: 0.9,
    },
    silver: {
      color: "#e8eaed",
      roughness: 0.12,
      metalness: 0.95,
      clearcoat: 1.0,
    },
    acid: {
      color: "#d4f526",
      roughness: 0.28,
      metalness: 0.45,
      clearcoat: 0.6,
    },
    matte: {
      color: "#1c1b1f",
      roughness: 0.85,
      metalness: 0.05,
      clearcoat: 0.1,
    },
  };

  const activeMat = materials[materialMode];

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (isSimulating) {
        meshRef.current.rotation.y += delta * 0.45;
        const t = state.clock.getElapsedTime();
        meshRef.current.position.y = Math.sin(t * 1.5) * 0.06;
      }
    }
    if (innerRef.current && isSimulating) {
      innerRef.current.rotation.y -= delta * 0.3;
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* Primary Structural Garment Silhouette */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.1, 0.35, 128, 32, 2, 3]} />
        <meshPhysicalMaterial
          color={activeMat.color}
          roughness={activeMat.roughness}
          metalness={activeMat.metalness}
          clearcoat={activeMat.clearcoat}
          clearcoatRoughness={0.1}
          wireframe={wireframe}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Internal Structural Ribbing */}
      <mesh ref={innerRef} scale={0.72}>
        <octahedronGeometry args={[1.2, 2]} />
        <meshStandardMaterial
          color={materialMode === "acid" ? "#111111" : "#E2FF3B"}
          wireframe={true}
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
};

export const GarmentViewer3D: React.FC = () => {
  const [wireframe, setWireframe] = useState(false);
  const [materialMode, setMaterialMode] = useState<"obsidian" | "silver" | "acid" | "matte">("obsidian");
  const [isSimulating, setIsSimulating] = useState(true);

  return (
    <div className="relative w-full bg-[#0A0A0E] border border-white/[0.08] overflow-hidden p-1">
      {/* 3D Canvas Stage */}
      <div className="relative h-[520px] md:h-[620px] w-full bg-gradient-to-b from-[#101014] via-[#09090C] to-[#060608] overflow-hidden">
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 4.2], fov: 45 }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 8, 5]} intensity={1.8} color="#ffffff" />
          <directionalLight position={[-5, -4, -3]} intensity={0.9} color="#4E7BFF" />
          <spotLight position={[0, 6, 2]} intensity={2.2} angle={0.6} penumbra={1} color="#E2FF3B" />

          <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
            <GarmentMesh
              wireframe={wireframe}
              materialMode={materialMode}
              isSimulating={isSimulating}
            />
          </Float>

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={2.5}
            maxDistance={7}
            rotateSpeed={0.8}
          />
        </Canvas>

        {/* Top Header Controls without generic icons */}
        <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          <div className="flex items-center gap-2 bg-[#08080A]/90 backdrop-blur-md px-3 py-1 border border-white/[0.08] text-[10px] font-mono tracking-[0.2em] text-white/70">
            <span className="w-1.5 h-1.5 bg-[#E2FF3B]" />
            <span>MODEL 01 // KINETIC TORSO SCULPTURE</span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto font-mono text-[9px] tracking-[0.2em]">
            <button
              onClick={() => setWireframe(!wireframe)}
              className={`px-3 py-1.5 border transition-all ${
                wireframe
                  ? "bg-[#E2FF3B] text-black border-[#E2FF3B] font-semibold"
                  : "bg-[#08080A]/80 text-white/70 border-white/[0.12] hover:border-white/40"
              }`}
            >
              WIREFRAME: {wireframe ? "[ON]" : "[OFF]"}
            </button>

            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className={`px-3 py-1.5 border transition-all ${
                isSimulating
                  ? "bg-white/[0.1] text-white border-white/20"
                  : "bg-[#08080A]/80 text-white/40 border-white/[0.12]"
              }`}
            >
              SIMULATION: {isSimulating ? "[LIVE]" : "[PAUSED]"}
            </button>
          </div>
        </div>

        {/* Bottom Material Selector Bar with pure editorial typography */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 bg-[#08080A]/90 backdrop-blur-md px-4 py-2.5 border border-white/[0.08]">
          <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.2em]">
            <span className="text-white/40">WEAVE SHEEN:</span>
            {(
              [
                { id: "obsidian", label: "OBSIDIAN" },
                { id: "silver", label: "TITANIUM" },
                { id: "acid", label: "ACID WEAVE" },
                { id: "matte", label: "RAW WOOL" },
              ] as const
            ).map((mat) => (
              <button
                key={mat.id}
                onClick={() => setMaterialMode(mat.id)}
                className={`transition-colors uppercase ${
                  materialMode === mat.id
                    ? "text-[#E2FF3B] font-semibold underline underline-offset-4"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {mat.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[9px] font-mono tracking-[0.2em] text-white/40">
            <span>[ DRAG TO ROTATE ]</span>
            <span>·</span>
            <span>[ SCROLL TO ZOOM ]</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GarmentViewer3D;
