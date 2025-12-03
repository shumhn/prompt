"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { diffWords } from "diff";
import {
    Maximize2,
    Minimize2,
    Copy,
    Check,
    ArrowRight,
    Split,
    FileDiff,
    Terminal,
    Code2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataModule } from "@/components/ui/data-module";
import { TechBadge } from "@/components/ui/tech-badge";

interface PromptComparisonProps {
    originalPrompt: string;
    optimizedPrompt: string;
}

export default function PromptComparison({
    originalPrompt,
    optimizedPrompt,
}: PromptComparisonProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [viewMode, setViewMode] = useState<"split" | "diff">("split");
    const [copiedOriginal, setCopiedOriginal] = useState(false);
    const [copiedOptimized, setCopiedOptimized] = useState(false);

    const handleCopy = (text: string, isOriginal: boolean) => {
        navigator.clipboard.writeText(text);
        if (isOriginal) {
            setCopiedOriginal(true);
            setTimeout(() => setCopiedOriginal(false), 2000);
        } else {
            setCopiedOptimized(true);
            setTimeout(() => setCopiedOptimized(false), 2000);
        }
    };

    const diff = diffWords(originalPrompt, optimizedPrompt);

    return (
        <DataModule
            className={`transition-all duration-500 ease-in-out ${isExpanded ? "fixed inset-4 z-50 h-[calc(100vh-2rem)]" : "h-[450px]"}`}
            title="PROMPT_EVOLUTION_MATRIX"
            icon={<Code2 className="w-4 h-4 text-primary" />}
            action={
                <div className="flex items-center gap-2">
                    <div className="flex bg-zinc-100/50 p-0.5 rounded-md border border-zinc-200/50">
                        <button
                            onClick={() => setViewMode("split")}
                            className={`p-1.5 rounded-sm transition-all ${viewMode === "split" ? "bg-white shadow-sm text-primary" : "text-zinc-400 hover:text-zinc-600"}`}
                            title="Split View"
                        >
                            <Split className="w-3.5 h-3.5" />
                        </button>
                        <button
                            onClick={() => setViewMode("diff")}
                            className={`p-1.5 rounded-sm transition-all ${viewMode === "diff" ? "bg-white shadow-sm text-primary" : "text-zinc-400 hover:text-zinc-600"}`}
                            title="Diff View"
                        >
                            <FileDiff className="w-3.5 h-3.5" />
                        </button>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="h-7 w-7 text-zinc-400 hover:text-primary hover:bg-primary/5"
                    >
                        {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </Button>
                </div>
            }
        >
            <div className="h-full flex flex-col">
                {viewMode === "split" ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full divide-y lg:divide-y-0 lg:divide-x divide-zinc-200/50">
                        {/* Original Prompt */}
                        <div className="flex flex-col h-full bg-zinc-50/30">
                            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-200/50 bg-zinc-100/20">
                                <TechBadge variant="neutral">v1.0 :: ORIGINAL</TechBadge>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleCopy(originalPrompt, true)}
                                    className="h-6 text-[10px] uppercase tracking-wider text-zinc-400 hover:text-primary"
                                >
                                    {copiedOriginal ? (
                                        <span className="flex items-center gap-1 text-emerald-500"><Check className="w-3 h-3" /> COPIED</span>
                                    ) : (
                                        <span className="flex items-center gap-1"><Copy className="w-3 h-3" /> COPY_BUFFER</span>
                                    )}
                                </Button>
                            </div>
                            <div className="flex-1 p-6 overflow-auto font-mono text-sm leading-relaxed text-zinc-600 whitespace-pre-wrap">
                                {originalPrompt}
                            </div>
                        </div>

                        {/* Optimized Prompt */}
                        <div className="flex flex-col h-full bg-primary/[0.02]">
                            <div className="flex items-center justify-between px-4 py-2 border-b border-primary/10 bg-primary/5">
                                <TechBadge variant="default">v2.0 :: OPTIMIZED</TechBadge>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleCopy(optimizedPrompt, false)}
                                    className="h-6 text-[10px] uppercase tracking-wider text-zinc-400 hover:text-primary"
                                >
                                    {copiedOptimized ? (
                                        <span className="flex items-center gap-1 text-emerald-500"><Check className="w-3 h-3" /> COPIED</span>
                                    ) : (
                                        <span className="flex items-center gap-1"><Copy className="w-3 h-3" /> COPY_BUFFER</span>
                                    )}
                                </Button>
                            </div>
                            <div className="flex-1 p-6 overflow-auto font-mono text-sm leading-relaxed text-zinc-800 whitespace-pre-wrap relative">
                                {/* Scanline effect */}
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(99,102,241,0.03)_50%)] bg-[length:100%_4px] pointer-events-none" />
                                {optimizedPrompt}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col bg-zinc-50/30">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-200/50 bg-zinc-100/20">
                            <TechBadge variant="warning">DIFF_ANALYSIS_MODE</TechBadge>
                            <div className="flex gap-4 text-[10px] font-mono">
                                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500/20 border border-red-500/50 rounded-sm"></span> REMOVED</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500/20 border border-emerald-500/50 rounded-sm"></span> ADDED</span>
                            </div>
                        </div>
                        <div className="flex-1 p-6 overflow-auto font-mono text-sm leading-relaxed whitespace-pre-wrap">
                            {diff.map((part, index) => {
                                const color = part.added
                                    ? "bg-emerald-500/10 text-emerald-700 border-b border-emerald-500/20"
                                    : part.removed
                                        ? "bg-red-500/10 text-red-700 decoration-red-500/30 line-through decoration-2"
                                        : "text-zinc-500";
                                return (
                                    <span key={index} className={`${color} px-0.5 py-0.5 rounded-sm transition-colors duration-300`}>
                                        {part.value}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </DataModule>
    );
}
