// src/app/loading.tsx
"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-lg">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-30">
        <div className="h-full w-full animate-grid-pulse bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Main loader */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Cyber circle */}
        <motion.div
          className="relative h-24 w-24"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30" />

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
            <div className="h-8 w-8 rounded-full bg-cyan-500/20 animate-pulse" />
            <div className="absolute h-6 w-6 rounded-full bg-cyan-500 shadow-[0_0_20px_#06b6d4] animate-ping" />
          </div>
        </motion.div>

        <motion.div
          className="font-mono text-sm text-cyan-400"
          animate={{
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          <span className="animate-glitch">
            01001000 01100001 01100011 01101011 01101001 01101110 01100111
          </span>
        </motion.div>
      </div>
    </div>
  );
}
