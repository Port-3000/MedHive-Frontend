// src/app/loading.tsx
"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <div className="h-full w-full animate-grid-pulse bg-[linear-gradient(to_right,#06b6d412_1px,transparent_1px),linear-gradient(to_bottom,#06b6d412_1px,transparent_1px)] bg-[size:24px_24px]" />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-cyan-400 rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: 0,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main loader */}
      <div className="relative flex flex-col items-center gap-8">
        <motion.div
          className="relative h-32 w-32"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-pulse" />

          {/* Hexagon pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzA2YjZkNCIgZmlsbC1vcGFjaXR5PSIwLjIiIGQ9Ik0xMiAwbDIgM2gybDIgMy0yIDMtMiAzLTIgM0g4bC0yLTMtMi0zIDItM0g0bDItM3pNMiA4bDIgMy0yIDMgMiAzIDIgMyAyLTNMMTAgOGwtMi0zLTIgM3pNMTQgOGwyLTMgMiAzLTIgMy0yIDMtMi0zIDItM3pNMTQgMTZsMiAzIDIgMy0yIDMtMiAzLTItMy0yLTMyIDN6Ii8+PC9zdmc+')] opacity-30" />

          <motion.div
            className="absolute inset-0 rounded-full border-[3px] border-cyan-500"
            initial={{ clipPath: "polygon(50% 50%, 50% 0%, 50% 0%, 50% 50%)" }}
            animate={{
              clipPath: [
                "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)",
                "polygon(50% 50%, 100% 50%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-cyan-500/20 animate-pulse" />
            <div className="absolute h-8 w-8 rounded-full bg-cyan-500 shadow-[0_0_30px_#06b6d4] animate-ping" />
            {/* Floating dots */}
            <motion.div
              className="absolute h-2 w-2 bg-cyan-400 rounded-full"
              animate={{
                y: [-10, 10, -10],
                x: [-10, 10, -10],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </div>
        </motion.div>

        <motion.div
          className="font-bold text-2xl uppercase tracking-widest w-full text-center"
          animate={{
            opacity: [0.8, 1, 0.8],
            y: [-2, 2, -2],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
          }}
        >
          <div className="relative text-cyan-400 mx-auto w-max">
            <span
              className="animate-glitch absolute inset-0 text-transparent"
              style={{ textShadow: "2px 2px #ec4899" }}
            >
              LOADING
            </span>
            <span
              className="animate-glitch-delay absolute inset-0 text-transparent"
              style={{ textShadow: "-2px -2px #3b82f6" }}
            >
              LOADING
            </span>
            <span className="relative">LOADING</span>
          </div>
          <div className="text-center text-cyan-500 text-sm mt-2 font-mono tracking-normal">
            INITIALIZING SYSTEM...
          </div>
        </motion.div>
      </div>

      {/* Add corner accent lines */}
      <div className="absolute left-0 top-0 h-1 w-16 bg-cyan-500" />
      <div className="absolute right-0 bottom-0 h-1 w-16 bg-cyan-500" />
      <div className="absolute left-0 bottom-0 h-16 w-1 bg-cyan-500" />
      <div className="absolute right-0 top-0 h-16 w-1 bg-cyan-500" />
    </div>
  );
}
