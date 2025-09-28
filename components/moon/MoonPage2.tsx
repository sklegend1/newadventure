"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function MoonSurface() {
  const texture = new THREE.TextureLoader().load("/textures/moon.jpg");

  return (
    <mesh>
      <sphereGeometry args={[50, 64, 64, 20, Math.PI * 2, 0, Math.PI/2 ]} />
      <meshStandardMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

function CameraController() {
  const { camera } = useThree();
  const [theta, setTheta] = useState(0); // زاویه عمودی (حرکت روی سطح)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      setTheta((prev) => prev + (e.deltaY * 1));
    };
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  useFrame(() => {
    const R = 49; // شعاع سطح (کمتر از mesh تا داخل نباشیم)
    const phi = 0; // میشه بعداً با موس کنترل کرد

    const x = R * Math.cos(0) * Math.cos(phi);
    const y = R * Math.sin(0);
    const z = R * Math.cos(0) * Math.sin(phi);
    camera.rotateX(R * Math.cos(theta) * Math.cos(phi))
    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function MoonWalkPage() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} />
        <MoonSurface />
        <CameraController />
      </Canvas>
    </div>
  );
}
