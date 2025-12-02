"use client";

import { WindowCard } from "@/components/ui/window-card";
import { PixelBackground } from "@/components/ui/pixel-background";
import { motion } from "framer-motion";
import { TrendingUp, Zap, Target, DollarSign, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";

// Mock data
const networkStats = {
    agentsCreated24h: 97,
    topScore: 73.3,
    improvement24h: 8.9,
    dailyPrizePool: 65000,
};

const optimizationQueue: Array<{ id: string; name: string }> = [
    // Empty for now
];

const validationQueue: Array<{ id: string; name: string }> = [
    // Empty for now
];

const topOptimizations = [
    { id: "1", name: "GPT-4 JSON Parser v12", score: 94.2, timestamp: "Dec 2, 2025, 5:35 AM" },
    { id: "2", name: "Claude Structured Output v8", score: 91.8, timestamp: "Dec 2, 2025, 9:21 AM" },
    { id: "3", name: "Gemini Schema Master v5", score: 89.5, timestamp: "Dec 2, 2025, 3:46 AM" },
    { id: "4", name: "Llama JSON Optimizer v3", score: 88.1, timestamp: "Dec 2, 2025, 10:07 AM" },
    { id: "5", name: "Mistral Prompt Pro v19", score: 87.3, timestamp: "Dec 2, 2025, 10:40 AM" },
];

export default function ExplorePage() {
    return (
        <div className="min-h-screen relative font-sans text-foreground pt-20 pb-12">
            <PixelBackground />

            <div className="container relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">
                        NETWORK_EXPLORER
                    </h1>
                    <p className="text-xl font-medium max-w-2xl">
                        Real-time visualization of the decentralized prompt optimization network.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: "PROMPTS_24H", value: networkStats.agentsCreated24h, icon: Zap },
                        { label: "TOP_SCORE", value: `${networkStats.topScore}%`, icon: Target },
                        { label: "IMPROVEMENT", value: `+${networkStats.improvement24h}%`, icon: TrendingUp },
                        { label: "PRIZE_POOL", value: `$${(networkStats.dailyPrizePool / 1000).toFixed(0)}k`, icon: DollarSign },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <WindowCard title={stat.label} className="bg-white text-black border-2 border-primary shadow-[4px_4px_0px_0px_rgba(0,0,255,0.2)]">
                                <div className="flex items-center justify-between">
                                    <span className="text-4xl font-bold tracking-tighter text-primary">{stat.value}</span>
                                    <stat.icon className="h-8 w-8 text-primary/20" />
                                </div>
                            </WindowCard>
                        </motion.div>
                    ))}
                </div>

                {/* Queues Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Optimization Queue */}
                    <WindowCard title="OPTIMIZATION_QUEUE" className="bg-white text-black border-2 border-primary shadow-[8px_8px_0px_0px_rgba(0,0,255,0.2)] h-full">
                        <div className="flex items-center justify-between mb-4 border-b-2 border-primary/10 pb-2">
                            <div className="flex items-center gap-2 font-bold text-primary">
                                <Clock className="h-4 w-4" />
                                <span>PENDING_TASKS ({optimizationQueue.length})</span>
                            </div>
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 font-bold border border-yellow-200">ACTIVE</span>
                        </div>

                        {optimizationQueue.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground font-mono text-xs">
                                [SYSTEM] NO_TASKS_IN_QUEUE
                                <br />
                                WAITING_FOR_SUBMISSIONS...
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {optimizationQueue.map((task: any) => (
                                    <div key={task.id} className="p-2 border border-primary/20 bg-primary/5 font-mono text-xs">
                                        {task.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </WindowCard>

                    {/* Validation Queue */}
                    <WindowCard title="VALIDATION_QUEUE" className="bg-white text-black border-2 border-primary shadow-[8px_8px_0px_0px_rgba(0,0,255,0.2)] h-full">
                        <div className="flex items-center justify-between mb-4 border-b-2 border-primary/10 pb-2">
                            <div className="flex items-center gap-2 font-bold text-primary">
                                <CheckCircle2 className="h-4 w-4" />
                                <span>SCORING_TASKS ({validationQueue.length})</span>
                            </div>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 font-bold border border-green-200">RUNNING</span>
                        </div>

                        {validationQueue.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground font-mono text-xs">
                                [SYSTEM] NO_TASKS_IN_VALIDATION
                                <br />
                                VALIDATORS_IDLE...
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {validationQueue.map((task: any) => (
                                    <div key={task.id} className="p-2 border border-primary/20 bg-primary/5 font-mono text-xs">
                                        {task.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </WindowCard>
                </div>

                {/* Top Optimizations */}
                <WindowCard title="LEADERBOARD_TOP_5" className="bg-white text-black border-2 border-primary shadow-[8px_8px_0px_0px_rgba(0,0,255,0.2)]">
                    <div className="space-y-2">
                        {topOptimizations.map((opt, i) => (
                            <Link
                                key={opt.id}
                                href={`/task/${opt.id}`}
                                className="block group"
                            >
                                <div className="flex items-center justify-between p-3 border border-primary/10 hover:bg-primary hover:text-white transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="font-mono font-bold text-lg w-8">#{i + 1}</div>
                                        <div>
                                            <div className="font-bold font-mono text-sm">{opt.name}</div>
                                            <div className="text-xs opacity-60 font-mono">{opt.timestamp}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold font-mono text-xl">{opt.score}%</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </WindowCard>
            </div>
        </div>
    );
}
