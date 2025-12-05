"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    Copy,
    Download,
    Share2,
    Sparkles,
    Zap,
    Clock,
    CheckCircle2,
    AlertCircle,
    Terminal,
    Cpu,
    Network,
    Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import PromptComparison from "@/components/PromptComparison";
import SavingsChart from "@/components/SavingsChart";
import QueryResultsComparison from "@/components/QueryResultsComparison";
import TaskDetailSkeleton from "@/components/TaskDetailSkeleton";
import PerformanceAnalytics from "@/components/PerformanceAnalytics";
import EmptyState from "@/components/EmptyState";
import { QuantumBackground } from "@/components/ui/quantum-background";
import { TechBadge } from "@/components/ui/tech-badge";
import { DataModule } from "@/components/ui/data-module";
import { QuantumText } from "@/components/ui/quantum-text";

// Mock Data (reused)
const taskData = {
    id: "1",
    name: "E-commerce Product Extractor",
    status: "validated",
    score: 94.2,
    createdAt: "Dec 2, 2025, 5:35 AM",
    model: "GPT-4o",
    cost: 0.04,
    originalPrompt: `Extract product details from this HTML. I need the name, price, and description.
    
    HTML:
    <div class="product">
      <h1 class="title">Super Widget 3000</h1>
      <span class="price">$19.99</span>
      <p class="desc">The best widget ever made.</p>
    </div>`,
    optimizedPrompt: `Extract the following fields from the provided HTML snippet and return them in strict JSON format:
    
    - "product_name": The text content of the h1 element with class "title".
    - "price": The numeric value from the span with class "price" (remove currency symbol).
    - "description": The text content of the p element with class "desc".
    
    Input HTML:
    <div class="product">
      <h1 class="title">Super Widget 3000</h1>
      <span class="price">$19.99</span>
      <p class="desc">The best widget ever made.</p>
    </div>
    
    Output Format: JSON only, no markdown formatting.`,
    systemPrompt: "You are a helpful assistant.",
    metrics: {
        clarity: 92,
        specificity: 88,
        coherence: 95,
        safety: 100,
        engagement: 85,
        complexity: 45
    },
    sampleResults: [
        {
            query: "Product page for 'Super Widget 3000'",
            originalResponse: {
                text: "Name: Super Widget 3000\nPrice: $19.99\nDescription: The best widget ever made.",
                tokens: 45,
                latency: 850
            },
            optimizedResponse: {
                text: "{\n  \"product_name\": \"Super Widget 3000\",\n  \"price\": 19.99,\n  \"description\": \"The best widget ever made.\"\n}",
                tokens: 32,
                latency: 620
            }
        },
        {
            query: "Product page for 'Mega Gadget X'",
            originalResponse: {
                text: "Name: Mega Gadget X\nPrice: $49.99\nDescription: A revolutionary gadget.",
                tokens: 42,
                latency: 810
            },
            optimizedResponse: {
                text: "{\n  \"product_name\": \"Mega Gadget X\",\n  \"price\": 49.99,\n  \"description\": \"A revolutionary gadget.\"\n}",
                tokens: 30,
                latency: 590
            }
        }
    ]
};



export default function TaskDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    const [active, setActive] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const loadTask = () => {
            setIsLoading(true);
            // Simulate network delay
            setTimeout(() => {
                const stored = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('tasks') || '[]') : [];
                const found = stored.find((t: any) => t.id === id);

                if (found) {
                    setActive(found);
                } else if (id === "1") {
                    setActive(taskData);
                } else {
                    setNotFound(true);
                }
                setIsLoading(false);
            }, 800);
        };

        loadTask();
    }, [id]);

    const copyPrompt = () => {
        if (active?.optimizedPrompt) {
            navigator.clipboard.writeText(active.optimizedPrompt);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const exportResults = () => {
        if (!active) return;
        const data = JSON.stringify(active, null, 2);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `task-${active.id}-results.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (isLoading) {
        return <TaskDetailSkeleton />;
    }

    if (notFound || !active) {
        return (
            <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
                <EmptyState
                    icon={AlertCircle}
                    title="TASK_NOT_FOUND"
                    description="The requested optimization task could not be located in the quantum registry."
                    actionLabel="RETURN_TO_BASE"
                    onAction={() => router.push('/tasks')}
                />
            </div>
        );
    }

    const hasSamples = active.sampleResults && active.sampleResults.length > 0;

    // Calculate metrics
    const avgOriginalTokens = hasSamples
        ? active.sampleResults.reduce((acc: number, curr: any) => acc + curr.originalResponse.tokens, 0) / active.sampleResults.length
        : 0;
    const avgOptimizedTokens = hasSamples
        ? active.sampleResults.reduce((acc: number, curr: any) => acc + curr.optimizedResponse.tokens, 0) / active.sampleResults.length
        : 0;

    const avgOriginalLatency = hasSamples
        ? active.sampleResults.reduce((acc: number, curr: any) => acc + curr.originalResponse.latency, 0) / active.sampleResults.length
        : 0;
    const avgOptimizedLatency = hasSamples
        ? active.sampleResults.reduce((acc: number, curr: any) => acc + curr.optimizedResponse.latency, 0) / active.sampleResults.length
        : 0;

    const tokenSavings = hasSamples ? ((avgOriginalTokens - avgOptimizedTokens) / avgOriginalTokens * 100).toFixed(1) : "0.0";
    const latencyImprovement = hasSamples ? ((avgOriginalLatency - avgOptimizedLatency) / avgOriginalLatency * 100).toFixed(1) : "0.0";

    // Cost calculation (mock)
    const costPerToken = 0.00003; // $30 per 1M tokens
    const costSavingsPerQuery = (avgOriginalTokens - avgOptimizedTokens) * costPerToken;
    const costSavingsPer1000 = costSavingsPerQuery * 1000;

    return (
        <div className="min-h-screen relative font-mono text-zinc-800 bg-zinc-50 selection:bg-primary selection:text-white overflow-x-hidden">
            <QuantumBackground />

            <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
                {/* HUD Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-zinc-200 pb-6 w-full bg-zinc-50/90 backdrop-blur-sm rounded-lg"
                >
                    <div className="flex flex-col gap-2 shrink-0">
                        <Button
                            variant="ghost"
                            className="w-fit pl-0 hover:bg-transparent hover:text-primary text-zinc-400 mb-2"
                            onClick={() => router.push('/tasks')}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            RETURN_TO_LIST
                        </Button>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 flex items-center gap-3">
                            <QuantumText text={active.name} />
                            <TechBadge variant="success" animate>ACTIVE</TechBadge>
                        </h1>
                        <div className="flex items-center gap-4 text-xs text-zinc-500 mt-1">
                            <span className="flex items-center gap-1"><Cpu className="w-3 h-3" /> MODEL: {active.model || "GPT-4o"}</span>
                            <span className="flex items-center gap-1"><Network className="w-3 h-3" /> ID: {active.id}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {active.createdAt}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-4 md:mt-0 shrink-0">
                        <Button
                            variant="outline"
                            onClick={exportResults}
                            className="bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-700 shadow-sm font-mono text-[10px] uppercase tracking-wider"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            EXPORT_DATA
                        </Button>
                        <Button
                            onClick={copyPrompt}
                            className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 font-mono text-[10px] uppercase tracking-wider"
                        >
                            {copied ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                            COPY_OPTIMIZED_PROMPT
                        </Button>
                    </div>
                </motion.div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Left Column: Metrics & Score (3 cols) */}
                    <div className="lg:col-span-3 flex flex-col gap-6 h-full">
                        {/* Primary Score Card */}
                        <DataModule className="bg-white/80 backdrop-blur-sm border-zinc-200/60">
                            <div className="flex flex-col items-center justify-center py-6">
                                <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="64" cy="64" r="60" stroke="#e4e4e7" strokeWidth="8" fill="transparent" />
                                        <motion.circle
                                            cx="64" cy="64" r="60"
                                            stroke="#6366f1"
                                            strokeWidth="8"
                                            fill="transparent"
                                            strokeDasharray={377}
                                            strokeDashoffset={377}
                                            animate={{ strokeDashoffset: 377 - (377 * (active.score || 0)) / 100 }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-3xl font-bold text-zinc-900">{active.score}</span>
                                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest">SCORE</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-1">OPTIMIZATION_LEVEL</h3>
                                    <p className="text-xs text-zinc-500">Algorithm confidence is high</p>
                                </div>
                            </div>
                        </DataModule>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <DataModule className="p-4 flex flex-col items-center justify-center text-center bg-emerald-50/50 border-emerald-100 backdrop-blur-sm">
                                <Zap className="w-5 h-5 text-emerald-500 mb-2" />
                                <div className="text-xl font-bold text-emerald-600">{tokenSavings}%</div>
                                <div className="text-[9px] text-emerald-600/70 uppercase tracking-wider">TOKEN_SAVINGS</div>
                            </DataModule>
                            <DataModule className="p-4 flex flex-col items-center justify-center text-center bg-blue-50/50 border-blue-100 backdrop-blur-sm">
                                <Clock className="w-5 h-5 text-blue-500 mb-2" />
                                <div className="text-xl font-bold text-blue-600">{latencyImprovement}%</div>
                                <div className="text-[9px] text-blue-600/70 uppercase tracking-wider">LATENCY_DROP</div>
                            </DataModule>
                        </div>
                    </div>

                    {/* Right Column: Prompt Comparison (9 cols) */}
                    <div className="lg:col-span-9 space-y-6">
                        <PromptComparison
                            originalPrompt={active.originalPrompt || active.systemPrompt || ""}
                            optimizedPrompt={active.optimizedPrompt || ""}
                        />
                    </div>



                    {/* Bottom Section: Full Width Charts */}
                    <div className="lg:col-span-12 space-y-6">

                        {/* Performance Analytics Dashboard */}
                        {hasSamples && (
                            <PerformanceAnalytics
                                data={{
                                    originalTokens: avgOriginalTokens,
                                    optimizedTokens: avgOptimizedTokens,
                                    originalLatency: avgOriginalLatency,
                                    optimizedLatency: avgOptimizedLatency,
                                    sampleCount: active.sampleResults.length
                                }}
                                samples={active.sampleResults}
                            />
                        )}

                        {/* System Diagnostics - Full Width */}
                        {hasSamples && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <SavingsChart
                                    costPerQuery={costSavingsPerQuery}
                                    tokenSavings={tokenSavings}
                                    latencyImprovement={latencyImprovement}
                                />
                            </motion.div>
                        )}

                        {/* Query Results */}
                        <QueryResultsComparison results={active.sampleResults || []} />
                    </div>
                </div>
            </div>
        </div>
    );
}
