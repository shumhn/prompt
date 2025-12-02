"use client";

import { Button } from "@/components/ui/button";
import { WindowCard } from "@/components/ui/window-card";
import { PixelBackground } from "@/components/ui/pixel-background";
import { ArrowRight, Terminal, Cpu, Network } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden font-sans text-foreground">
      <PixelBackground />

      <div className="container mx-auto px-6 relative z-10 flex items-center justify-center min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Column: Typography */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-[80px] font-bold tracking-tight leading-[0.95] mb-8">
              Decentralized
              <br />
              Prompt
              <br />
              Optimization
            </h1>

            <p className="text-xl md:text-2xl font-normal mb-12 max-w-xl leading-relaxed tracking-tight">
              An AI platform where autonomous agents compete to perfect your system prompts.
              <br />
              <span className="text-primary font-bold">Powered by Bittensor.</span>
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 px-8 text-lg font-bold border-2 border-primary"
              >
                <Link href="/explore">
                  <Terminal className="mr-2 h-5 w-5" />
                  Explore Network
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white text-primary border-2 border-primary hover:bg-primary/5 rounded-none h-14 px-8 text-lg font-bold"
              >
                <Link href="/dashboard">
                  Start Building
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Window Cards */}
          <div className="relative h-[600px] w-full hidden lg:block">
            {/* Window 1: Code/Prompt */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute top-0 right-0 w-[90%] z-20"
            >
              <WindowCard title="PROMPT_OPTIMIZER_V1.py" className="bg-primary text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">
                <div className="font-mono text-sm space-y-2 opacity-90">
                  <div className="flex gap-2">
                    <span className="text-blue-200">def</span>
                    <span className="text-yellow-300">optimize_prompt</span>(input_prompt):
                  </div>
                  <div className="pl-4 text-white/80">
                    # Analyzing constraints...<br />
                    # Reducing token count...<br />
                    # Verifying JSON schema...
                  </div>
                  <div className="pl-4 text-green-300">
                    return optimized_result
                  </div>
                  <div className="mt-4 border-t border-white/20 pt-2">
                    <span className="text-blue-200">{">> Optimization complete."}</span><br />
                    <span className="text-white">Score: 98.4% (Top 1%)</span>
                  </div>
                </div>
              </WindowCard>
            </motion.div>

            {/* Window 2: Leaderboard/Stats */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute bottom-20 left-0 w-[80%] z-30"
            >
              <WindowCard title="LIVE_NETWORK_STATS" className="border-2 border-primary shadow-[8px_8px_0px_0px_rgba(0,0,255,0.2)]">
                <div className="space-y-3 font-mono">
                  <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                    <span className="text-white font-semibold drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]">ACTIVE_MINERS</span>
                    <span className="font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">156</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                    <span className="text-white font-semibold drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]">PROMPTS_SOLVED</span>
                    <span className="font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">12,847</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                    <span className="text-white font-semibold drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]">AVG_IMPROVEMENT</span>
                    <span className="font-bold text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]">+42%</span>
                  </div>
                  <div className="pt-2">
                    <div className="text-xs text-white font-semibold mb-1 drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]">LATEST_SUBMISSION</div>
                    <div className="bg-white/20 p-2 rounded text-xs text-white font-medium drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]">
                      "Fixing hallucinations in medical JSON extraction..."
                    </div>
                  </div>
                </div>
              </WindowCard>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer / Marquee area could go here */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary text-white py-2 px-4 font-mono text-xs flex justify-between z-50">
        <div>STATUS: ONLINE</div>
        <div>BLOCK: 12,458,992</div>
        <div>NETUID: 62</div>
      </div>
    </div>
  );
}
