"use client";

import { Html, useProgress } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Loader() {
    const { progress } = useProgress();
    return (
      <Html center>
        <div style={{ color: "white", fontSize: "18px" }}>
          Please Wait ... {progress.toFixed(0)}%
        </div>
      </Html>
    );
  }

function MoonSurface() {
  const texture = new THREE.TextureLoader().load("/textures/moon.webp");

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
  const touchStartY = useRef<number | null>(null);

  // برای موبایل
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY.current !== null) {
        const deltaY = e.touches[0].clientY - touchStartY.current;
        setPosZ((prev) => prev + deltaY * 0.005); // سرعت حرکت
        touchStartY.current = e.touches[0].clientY; // آپدیت برای حرکت بعدی
      }
    };

    const handleTouchEnd = () => {
      touchStartY.current = null;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

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
        <Suspense fallback={<Loader />}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={10} />
        <MoonSurface />
        <CameraController />
        </Suspense>
      </Canvas>
      
    </div>
  );
}
