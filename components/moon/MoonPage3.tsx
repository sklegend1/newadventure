"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function MoonSurface() {
  const texture = new THREE.TextureLoader().load("/textures/moon.jpg");

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[200, 200, 3, 3]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function CameraController() {
  const { camera } = useThree();
  const [posZ, setPosZ] = useState(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      setPosZ((prev) => prev + e.deltaY * 0.001); // سرعت حرکت
    };
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  useFrame(() => {
    camera.position.set(0, 2, posZ); // ارتفاع دوربین
    camera.lookAt(0, 1.5, posZ + -500); 
    // به سمت جلو و کمی پایین نگاه کنه → افق بالا بره
  });

  return null;
}

export default function MoonPage3() {
  return (
    <div className="h-[60vh] z-50 fixed bottom-0 w-screen overflow-hidden ">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={10} />
        <MoonSurface />
        <CameraController />
      </Canvas>
    </div>
  );
}
