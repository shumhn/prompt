"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Sparkles, Send, Clock, CheckCircle2, XCircle, Zap, Activity, Plus, X, Lightbulb, Target, Battery, Gauge, BarChart3, ArrowRight, MessageSquare, Info } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { DataModule } from "@/components/ui/data-module";
import { TechBadge } from "@/components/ui/tech-badge";
import { QuantumText } from "@/components/ui/quantum-text";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const seedTasks = [
    {
        id: "task-1",
        name: "E-commerce Product Parser",
        status: "validated",
        score: 94.2,
        progress: 100,
        createdAt: "2025-12-02T10:30:00",
    },
    {
        id: "task-2",
        name: "Customer Support Classifier",
        status: "optimizing",
        score: null,
        progress: 67,
        createdAt: "2025-12-02T14:15:00",
        model: "GPT-4 Turbo"
    },
    {
        id: "task-3",
        name: "Invoice Data Extractor",
        status: "queued",
        score: null,
        progress: 0,
        createdAt: "2025-12-02T16:45:00",
        model: "Claude 3 Opus"
    },
];

// Example template
const exampleTemplate = {
    taskName: "E-commerce Product Extractor",
    systemPrompt: "You are a helpful assistant that extracts structured product data from descriptions.\n\nExtract the following fields:\n- product_name\n- price\n- category\n- features (array)\n\nReturn the data as valid JSON.",
    jsonSchema: `{
  "type": "object",
  "properties": {
    "product_name": { 
      "type": "string" 
    },
    "price": { 
      "type": "number" 
    },
    "category": { 
      "type": "string" 
    },
    "features": { 
      "type": "array",
      "items": { 
        "type": "string" 
      }
    }
  },
  "required": ["product_name", "price", "category", "features"]
}`,
    sampleQueries: [
        "Wireless Bluetooth Headphones - Premium sound quality with active noise cancellation. 30-hour battery life. Comfortable over-ear design. Price: $89.99",
        "Smart LED Light Bulb - WiFi enabled, works with Alexa and Google Home. 16 million colors. Energy efficient. $24.99"
    ],
    groundTruth: `{
  "product_name": "Wireless Bluetooth Headphones",
  "price": 89.99,
  "category": "Electronics",
  "features": ["Active Noise Cancellation", "30h Battery", "Over-ear Design"]
}`,
};

export default function OptimizePage() {
    const router = useRouter();
    const [taskName, setTaskName] = useState("");
    const [systemPrompt, setSystemPrompt] = useState("");
    const [jsonSchema, setJsonSchema] = useState("{\n  \n}");
    const [sampleQueries, setSampleQueries] = useState<string[]>([""]);
    const [groundTruth, setGroundTruth] = useState("{\n  \n}");
    const [model, setModel] = useState("gpt-4");
    const [objective, setObjective] = useState("balanced");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [tasks, setTasks] = useState<any[]>(seedTasks);
    const [schemaError, setSchemaError] = useState<string | null>(null);
    const [groundTruthError, setGroundTruthError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Generate realistic optimization results
        const score = Math.round(88 + Math.random() * 10); // 88-98
        const tokenReductionPercent = Math.round(20 + Math.random() * 15); // 20-35%
        const latencyReductionPercent = Math.round(15 + Math.random() * 15); // 15-30%

        // Create optimized version of the prompt
        const optimizedPrompt = systemPrompt +
            "\n\nOutput Format: Return ONLY valid JSON without markdown formatting or additional text.";

        // Generate sample results if sample queries exist
        const sampleResults = sampleQueries.filter(q => q.trim()).map((query, idx) => {
            const baseTokens = 35 + Math.floor(Math.random() * 15);
            const baseLatency = 700 + Math.floor(Math.random() * 200);

            return {
                query: query,
                originalResponse: {
                    text: `Sample response for: ${query}`,
                    tokens: baseTokens,
                    latency: baseLatency
                },
                optimizedResponse: {
                    text: `Optimized response for: ${query}`,
                    tokens: Math.floor(baseTokens * (1 - tokenReductionPercent / 100)),
                    latency: Math.floor(baseLatency * (1 - latencyReductionPercent / 100))
                }
            };
        });

        const newTask = {
            id: `task-${Date.now()}`,
            name: taskName,
            status: "validated",
            score: score,
            progress: 100,
            createdAt: new Date().toLocaleString(),
            model: model === "gpt-4" ? "GPT-4 Turbo" : model === "claude-3" ? "Claude 3 Opus" : "GPT-3.5 Turbo",
            tokenSavings: tokenReductionPercent,
            latencySavings: latencyReductionPercent,
            originalPrompt: systemPrompt,
            optimizedPrompt: optimizedPrompt,
            systemPrompt: systemPrompt,
            jsonSchema: jsonSchema,
            groundTruth: groundTruth,
            sampleResults: sampleResults,
            metrics: {
                clarity: Math.round(85 + Math.random() * 10),
                specificity: Math.round(82 + Math.random() * 12),
                coherence: Math.round(87 + Math.random() * 10),
                safety: 100,
                engagement: Math.round(80 + Math.random() * 15),
                complexity: Math.round(40 + Math.random() * 20)
            }
        };

        const updatedTasks = [newTask, ...tasks];
        setTasks(updatedTasks);

        // Save to localStorage for persistence across pages
        if (typeof window !== 'undefined') {
            const existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            localStorage.setItem('tasks', JSON.stringify([newTask, ...existingTasks]));
        }

        setIsSubmitting(false);
        router.push(`/task/${newTask.id}`);
    };

    const loadExample = () => {
        setTaskName(exampleTemplate.taskName);
        setSystemPrompt(exampleTemplate.systemPrompt);
        setJsonSchema(exampleTemplate.jsonSchema);
        setSampleQueries(exampleTemplate.sampleQueries);
        setGroundTruth(exampleTemplate.groundTruth);
    };

    const addQuery = () => {
        setSampleQueries([...sampleQueries, ""]);
    };

    const updateQuery = (index: number, value: string) => {
        const newQueries = [...sampleQueries];
        newQueries[index] = value;
        setSampleQueries(newQueries);
    };

    const removeQuery = (index: number) => {
        const newQueries = sampleQueries.filter((_, i) => i !== index);
        setSampleQueries(newQueries);
    };

    useEffect(() => {
        // Load tasks from localStorage on mount
        if (typeof window !== 'undefined') {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            if (storedTasks.length > 0) {
                setTasks(storedTasks);
            }
        }
    }, []);

    return (
        <TooltipProvider delayDuration={200}>
            <div className="min-h-screen relative bg-zinc-50/50">
                <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-zinc-200 pb-6"
                    >
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-primary mb-1 tracking-widest uppercase">
                                <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                                Playground
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 font-mono">
                                NEW OPTIMIZATION
                            </h1>
                            <p className="text-zinc-500 text-xs max-w-xl font-mono mt-1">
                                Configure and launch a new prompt optimization task.
                            </p>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Main Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-8 space-y-6"
                        >
                            <form onSubmit={handleSubmit}>
                                <DataModule
                                    className="bg-white/80 backdrop-blur-sm border-zinc-200/60"
                                    contentClassName="p-6 space-y-8"
                                >

                                    {/* Task Details */}
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between px-6 py-3 border-b border-zinc-100 -mx-6 -mt-6 mb-5">
                                            <div className="flex items-center gap-2.5">
                                                <Target className="w-5 h-5 text-primary" strokeWidth={2.5} />
                                                <h2 className="text-base font-extrabold text-zinc-900 uppercase tracking-wide font-mono">Task Configuration</h2>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={loadExample}
                                                className="h-8 px-3 bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200 font-mono text-[10px] uppercase tracking-wider font-bold hover:border-amber-300 transition-all"
                                            >
                                                <Lightbulb className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                                                Load_Example
                                            </Button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                            <div className="space-y-2 md:col-span-2">
                                                <Label htmlFor="taskName" className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 font-medium">Task Name</Label>
                                                <Input
                                                    id="taskName"
                                                    placeholder="e.g., E-commerce Product Extractor"
                                                    value={taskName}
                                                    onChange={(e) => setTaskName(e.target.value)}
                                                    className="w-full bg-zinc-50 border-zinc-200 focus:border-primary/50 font-mono text-sm h-10"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 font-medium">Model</Label>
                                                <Select value={model} onValueChange={setModel}>
                                                    <SelectTrigger className="w-full bg-zinc-50 border-zinc-200 focus:border-primary/50 font-mono text-sm h-10">
                                                        <SelectValue placeholder="Select Model" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="gpt-4">GPT-4 Turbo</SelectItem>
                                                        <SelectItem value="gpt-3.5">GPT-3.5 Turbo</SelectItem>
                                                        <SelectItem value="claude-3">Claude 3 Opus</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex items-baseline gap-1">
                                                    <Label className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 font-medium">Objective</Label>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button type="button" className="text-zinc-400 hover:text-zinc-600 transition-colors">
                                                                <Info className="w-3.5 h-3.5" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="top" className="max-w-[280px] text-xs leading-relaxed">
                                                            <p><strong>Token Efficiency:</strong> Minimize token usage while maintaining quality.</p>
                                                            <p className="mt-1"><strong>Speed:</strong> Optimize for faster response times.</p>
                                                            <p className="mt-1"><strong>Balanced:</strong> Equal focus on efficiency and speed.</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                                <Select value={objective} onValueChange={setObjective}>
                                                    <SelectTrigger className="w-full bg-zinc-50 border-zinc-200 focus:border-primary/50 font-mono text-sm h-10">
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="token_efficiency">Token Efficiency</SelectItem>
                                                        <SelectItem value="speed">Speed</SelectItem>
                                                        <SelectItem value="balanced">Balanced</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* System Prompt */}
                                    <div className="space-y-4 mt-6">
                                        <div className="flex items-center gap-2.5 px-6 py-3 border-y border-zinc-100 -mx-6 mb-4">
                                            <MessageSquare className="w-5 h-5 text-primary" strokeWidth={2.5} />
                                            <h2 className="text-base font-extrabold text-zinc-900 uppercase tracking-wide font-mono">System Prompt</h2>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-baseline gap-1">
                                                <Label htmlFor="systemPrompt" className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 font-medium">Initial Prompt</Label>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <button type="button" className="text-zinc-400 hover:text-zinc-600 transition-colors">
                                                            <Info className="w-3.5 h-3.5" />
                                                        </button>
                                                    </TooltipTrigger>
                                                    <TooltipContent side="top" className="max-w-[280px] text-xs leading-relaxed">
                                                        <p>Enter the system prompt you want to optimize. Include your current instructions, constraints, and expected behavior.</p>
                                                        <p className="mt-1.5 text-sky-600">Tip: Be specific about the output format you expect.</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                            <Textarea
                                                id="systemPrompt"
                                                placeholder="Enter your current system prompt here..."
                                                value={systemPrompt}
                                                onChange={(e) => setSystemPrompt(e.target.value)}
                                                className="min-h-[150px] font-mono text-xs bg-zinc-50 border-zinc-200 focus:border-primary/50"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Data Configuration */}
                                    <div className="space-y-4 mt-6">
                                        <div className="flex items-center gap-2.5 px-6 py-3 border-y border-zinc-100 -mx-6 mb-4">
                                            <BarChart3 className="w-5 h-5 text-primary" strokeWidth={2.5} />
                                            <h2 className="text-base font-extrabold text-zinc-900 uppercase tracking-wide font-mono">Response Format</h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                            <div className="space-y-2">
                                                <div className="flex items-baseline gap-1">
                                                    <Label className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 font-medium">JSON Schema</Label>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button type="button" className="text-zinc-400 hover:text-zinc-600 transition-colors">
                                                                <Info className="w-3.5 h-3.5" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="top" className="max-w-[280px] text-xs leading-relaxed">
                                                            <p>Define the expected JSON structure for responses. This helps validate and score outputs.</p>
                                                            <p className="mt-1.5 text-sky-600">Include "type", "properties", and "required" fields.</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                                <div className="h-[200px] border border-zinc-200 rounded-md overflow-hidden bg-zinc-50">
                                                    <MonacoEditor
                                                        height="100%"
                                                        language="json"
                                                        theme="vs"
                                                        value={jsonSchema}
                                                        onChange={(value) => setJsonSchema(value || "")}
                                                        options={{
                                                            minimap: { enabled: false },
                                                            fontSize: 12,
                                                            fontWeight: '400',
                                                            lineNumbers: "off",
                                                            scrollBeyondLastLine: false,
                                                            automaticLayout: true,
                                                            padding: { top: 10, bottom: 10 },
                                                            fontFamily: "'SF Mono', 'Monaco', 'Consolas', monospace",
                                                            scrollbar: {
                                                                vertical: 'hidden',
                                                                horizontal: 'hidden',
                                                                handleMouseWheel: true
                                                            },
                                                            overviewRulerLanes: 0,
                                                            hideCursorInOverviewRuler: true,
                                                            overviewRulerBorder: false,
                                                            wordWrap: 'on',
                                                            renderLineHighlight: 'none',
                                                            folding: false,
                                                            glyphMargin: false
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex items-baseline gap-1">
                                                    <Label className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 font-medium">Sample Queries</Label>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button type="button" className="text-zinc-400 hover:text-zinc-600 transition-colors">
                                                                <Info className="w-3.5 h-3.5" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="top" className="max-w-[280px] text-xs leading-relaxed">
                                                            <p>Add example inputs that your prompt will process. These are used to test and validate the optimization.</p>
                                                            <p className="mt-1.5 text-sky-600">More diverse examples improve optimization quality.</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                                <div className="h-[200px] border border-zinc-200 rounded-md bg-zinc-50 flex flex-col">
                                                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                                                        {sampleQueries.map((query, index) => (
                                                            <div key={index} className="flex gap-2">
                                                                <Input
                                                                    value={query}
                                                                    onChange={(e) => updateQuery(index, e.target.value)}
                                                                    placeholder={`Query ${index + 1}`}
                                                                    className="w-full font-mono text-xs bg-white border-zinc-200 focus:border-primary/50 h-10"
                                                                />
                                                                {sampleQueries.length > 1 && (
                                                                    <Button
                                                                        type="button"
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        onClick={() => removeQuery(index)}
                                                                        className="text-zinc-400 hover:text-red-500 hover:bg-red-50 h-10 w-10 shrink-0"
                                                                    >
                                                                        <X className="w-4 h-4" />
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="p-3 pt-0">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={addQuery}
                                                            className="w-full text-xs font-mono border-dashed border-zinc-300 text-zinc-500 hover:text-primary hover:border-primary/50 h-10 bg-white"
                                                        >
                                                            <Plus className="w-3 h-3 mr-2" />
                                                            Add Query
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 flex justify-end">
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 font-mono text-xs uppercase tracking-wider h-10 px-6"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Activity className="w-4 h-4 mr-2 animate-spin" />
                                                    INITIALIZING...
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles className="w-4 h-4 mr-2" />
                                                    START_OPTIMIZATION
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </DataModule>
                            </form>
                        </motion.div>

                        {/* Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-4 space-y-6"
                        >
                            <DataModule className="p-0 bg-white/80 backdrop-blur-sm border-zinc-200/60 overflow-hidden">
                                <div className="p-4 border-b border-zinc-100 bg-zinc-50/50">
                                    <h3 className="text-xs font-bold text-zinc-700 uppercase tracking-wider font-mono flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-zinc-500" />
                                        Recent_Activity
                                    </h3>
                                </div>
                                <div className="divide-y divide-zinc-100">
                                    {tasks.slice(0, 2).map((task) => (
                                        <Link key={task.id} href={`/task/${task.id}`}>
                                            <div className="p-4 hover:bg-zinc-50 transition-all group cursor-pointer">
                                                <div className="flex items-start justify-between mb-2">
                                                    <TechBadge
                                                        variant={
                                                            task.status === "validated" ? "success" :
                                                                task.status === "failed" ? "danger" :
                                                                    task.status === "optimizing" ? "default" : "neutral"
                                                        }
                                                        animate={task.status === "optimizing"}
                                                        className="scale-90 origin-top-left"
                                                    >
                                                        {task.status}
                                                    </TechBadge>
                                                    <span className="text-[10px] text-zinc-400 font-mono">
                                                        {new Date(task.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <h4 className="text-sm font-bold text-zinc-800 mb-1 font-mono group-hover:text-zinc-900 transition-colors truncate">
                                                    {task.name}
                                                </h4>
                                                {task.score && (
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <div className="text-xs font-bold text-emerald-600 font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                                                            SCORE: {task.score}
                                                        </div>
                                                    </div>
                                                )}
                                                {task.status === "optimizing" && (
                                                    <div className="mt-2 w-full bg-zinc-100 h-1 rounded-full overflow-hidden">
                                                        <motion.div
                                                            className="h-full bg-zinc-600"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${task.progress}%` }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <div className="p-3 bg-zinc-50/50 border-t border-zinc-100">
                                    <Link href="/tasks" className="flex items-center justify-center gap-1.5 text-xs font-bold text-zinc-600 hover:text-zinc-900 transition-colors uppercase tracking-wider font-mono py-1.5 hover:bg-zinc-100 rounded-md">
                                        View_All_Tasks
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </DataModule>

                            <DataModule className="p-5 bg-gradient-to-br from-sky-50 to-sky-100/30 border-sky-200/50">
                                <div className="flex items-start gap-3">
                                    <div className="p-2.5 bg-white rounded-lg shadow-sm border border-sky-100">
                                        <Lightbulb className="w-5 h-5 text-sky-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-wider font-mono mb-1.5">
                                            Quick_Tip
                                        </h4>
                                        <p className="text-xs text-zinc-600 leading-relaxed">
                                            Add <span className="font-mono font-bold text-sky-600">3-5 diverse sample queries</span> covering different edge cases. More variety leads to better optimization results and helps the model handle real-world scenarios.
                                        </p>
                                    </div>
                                </div>
                            </DataModule>
                        </motion.div>
                    </div>
                </div >
            </div >
        </TooltipProvider >
    );
}
