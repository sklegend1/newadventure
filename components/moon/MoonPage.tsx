"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

function MoonModel() {
  const { scene } = useGLTF("/models/moon.glb");
  const ref = useRef<THREE.Group>(null);

  // زاویه ذخیره می‌کنیم
  const [rotation, setRotation] = useState(0);

  // گوش دادن به اسکرول ماوس
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      setRotation((prev) => prev + e.deltaY * 0.001); // سرعت قابل تغییر
    };
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  // اعمال چرخش
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x = rotation;
    }
  });

  return <primitive ref={ref} object={scene} scale={2} />;
}

export default function MoonPage() {
  return (
    <div className="h-[120vw] w-[120vw] overflow-hidden fixed ">
      <Canvas camera={{ position: [0, 0, 9], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <MoonModel />
        {/* OrbitControls غیرفعال چون می‌خوایم فقط با اسکرول بچرخه */}
        <OrbitControls enableZoom={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}
