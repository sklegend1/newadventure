'use client'
import { LoginForm } from "@/components/login-form";
import MoonPage from "@/components/moon/MoonPage";
import MoonPage2 from "@/components/moon/MoonPage2";
import MoonPage3 from "@/components/moon/MoonPage3";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { type ChartConfig } from "@/components/ui/chart"
import { Html, useProgress } from "@react-three/drei";
import Image from "next/image";
import { Suspense } from "react";
import { Bar, BarChart, XAxis } from "recharts";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

function Loader() {
  
  return (
    
      <div style={{ color: "white", fontSize: "18px" }}>
        Please Wait ... 
      </div>
    
  );
}
export default function Home() {
  
  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ]
  return (
    <div className=" flex  justify-center ">
      <Suspense fallback={<Loader />}>
      {/* <ChartContainer config={chartConfig} className=" w-120  bg-slate-900" >
        <BarChart accessibilityLayer data={chartData}> 
        <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
    <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart> 
      </ChartContainer> */}
      
        <div className="stars w-full"></div>
        <div className=" moonlogo w-1/2 md:w-1/4 mt-40 md:mt-10 aspect-square "/>
        <div className="twinkling w-full"></div> 
       <div className="clouds w-full"></div>
       
        <MoonPage3 />
        </Suspense>
      </div>
      
      
    
  );
}
