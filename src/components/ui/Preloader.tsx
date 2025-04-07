import React, { useEffect, useState } from "react";

interface PreloaderProps {
  isLoading: boolean;
  onLoadingComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({
  isLoading,
  onLoadingComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    // Simulate loading with incremental progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = prevProgress + Math.random() * 10;

        if (nextProgress >= 100) {
          clearInterval(interval);

          // Delay the fade out slightly for a smoother transition
          setTimeout(() => {
            setFadeOut(true);

            // Allow fade out animation to complete before calling onLoadingComplete
            setTimeout(() => {
              onLoadingComplete();
            }, 1000); // Duration of the fade out
          }, 300);

          return 100;
        }

        return nextProgress;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isLoading, onLoadingComplete]);

  if (!isLoading && fadeOut) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Package Grid Background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute w-full h-full bg-[linear-gradient(0deg,transparent_24%,#22c55e_25%,#22c55e_26%,transparent_27%,transparent_74%,#22c55e_75%,#22c55e_76%,transparent_77%),linear-gradient(90deg,transparent_24%,#22c55e_25%,#22c55e_26%,transparent_27%,transparent_74%,#22c55e_75%,#22c55e_76%,transparent_77%)] [background-size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,1)_30%,transparent_80%)]"></div>
      </div>

      {/* Center package with floating boxes */}
      <div className="relative">
        {/* Main package box */}
        <div className="w-36 h-36 bg-black border-2 border-emerald-500 relative overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.3)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.2)_0%,transparent_70%)]"></div>

          {/* Inner content */}
          <div className="text-emerald-500 font-mono text-4xl font-bold">
            {Math.round(progress)}%
          </div>

          {/* Package edges/stripes */}
          <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500/30"></div>
          <div className="absolute bottom-0 left-0 w-full h-2 bg-emerald-500/30"></div>
          <div className="absolute left-0 top-0 h-full w-2 bg-emerald-500/30"></div>
          <div className="absolute right-0 top-0 h-full w-2 bg-emerald-500/30"></div>
        </div>

        {/* Floating mini boxes */}
        <div className="absolute -top-8 -left-8 w-10 h-10 border border-emerald-500/60 bg-black animate-[float1_3s_ease-in-out_infinite]"></div>
        <div className="absolute -bottom-10 -right-8 w-8 h-8 border border-emerald-500/40 bg-black animate-[float2_4s_ease-in-out_infinite]"></div>
        <div className="absolute -top-6 -right-12 w-6 h-6 border border-emerald-500/50 bg-black animate-[float3_2.5s_ease-in-out_infinite]"></div>
        <div className="absolute -bottom-12 -left-10 w-12 h-12 border border-emerald-500/30 bg-black animate-[float4_3.5s_ease-in-out_infinite]"></div>

        {/* Package outlines/shadows */}
        <div className="absolute -inset-2 border border-emerald-500/20 animate-pulse"></div>
        <div className="absolute -inset-4 border border-emerald-500/10 animate-[pulse_3s_infinite]"></div>
      </div>

      {/* Progress bar that looks like tape/packaging strip */}
      <div className="w-64 h-3 bg-gray-900 mt-14 relative overflow-hidden border-l-2 border-r-2 border-emerald-500/30">
        <div
          className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 relative"
          style={{ width: `${progress}%` }}
        >
          {/* Tape texture */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(255,255,255,0.1)_50%)] bg-[length:4px_100%]"></div>
        </div>

        {/* Scanning line effect */}
        <div
          className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-emerald-100 to-transparent animate-[moveScan_1.5s_ease-in-out_infinite]"
          style={{ left: `${progress - 8}%` }}
        ></div>
      </div>

      {/* Package themed loading text */}
      <div className="mt-6 text-emerald-500 font-mono text-xs tracking-wider flex items-center">
        <span className="mr-2">PACKAGING CONTENTS</span>
        <span className="animate-[blink_1s_step-end_infinite]">▮</span>
      </div>
    </div>
  );
};

export default Preloader;
