"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Activity, Brain, Users, Award, Zap, ArrowRight, Search, Cpu, DollarSign, BarChart3, Clock } from "lucide-react";
import Link from "next/link";
import { LineChart, Line, ResponsiveContainer, Tooltip, Area, AreaChart, XAxis, YAxis, CartesianGrid } from "recharts";

import { DataModule } from "@/components/ui/data-module";
import { TechBadge } from "@/components/ui/tech-badge";
import { Button } from "@/components/ui/button";

// Mock data for Network Overview (Prompts Optimized & Avg Improvement)
const networkData = [
    { date: "00:00", prompts: 1240, improvement: 8.2 },
    { date: "04:00", prompts: 1560, improvement: 9.1 },
    { date: "08:00", prompts: 2100, improvement: 11.5 },
    { date: "12:00", prompts: 3400, improvement: 14.2 },
    { date: "16:00", prompts: 2800, improvement: 12.8 },
    { date: "20:00", prompts: 1900, improvement: 10.4 },
    { date: "23:59", prompts: 1450, improvement: 9.6 },
];

// Recent Winner Miners with Win/Attempt Ratio
const recentWinners = [
    { name: "thisisit", version: "v4", wins: 842, attempts: 1000, uid: "thisisit-v4", lastWin: "2m ago" },
    { name: "OMG", version: "v12", wins: 756, attempts: 980, uid: "omg-v12", lastWin: "5m ago" },
    { name: "Rudiger", version: "v3", wins: 620, attempts: 900, uid: "rudiger-v3", lastWin: "12m ago" },
    { name: "pop", version: "v8", wins: 580, attempts: 850, uid: "pop-v8", lastWin: "18m ago" },
    { name: "hot", version: "v1", wins: 410, attempts: 800, uid: "hot-v1", lastWin: "25m ago" },
];

const activeRunners = [
    { name: "Roundtable21", type: "screener", version: "v9", status: "Evaluating", cpu: 8.1, ram: 5.9, uptime: "38m 04s" },
    { name: "TAO.com", type: "screener", version: "v14", status: "Evaluating", cpu: 0.5, ram: 4.3, uptime: "12h 03s" },
    { name: "Yuma", type: "validator", version: "v1", status: "Available", cpu: 0.1, ram: 4.9, uptime: "50m ago" },
    { name: "TAOApp", type: "screener", version: "v14", status: "Evaluating", cpu: 3.2, ram: 2.8, uptime: "16m 25s" },
];

const supportedModels = [
    { name: "Llama 3 70B", provider: "Meta", context: "8k", type: "Chat" },
    { name: "Mistral Large", provider: "Mistral", context: "32k", type: "Chat" },
    { name: "Gemma 7B", provider: "Google", context: "8k", type: "Chat" },
    { name: "Claude 3 Haiku", provider: "Anthropic", context: "200k", type: "Chat" },
    { name: "GPT-4o", provider: "OpenAI", context: "128k", type: "Chat" },
];

const recentTasks = [
    { id: "TASK-8921", status: "Evaluating", miner: "thisisit", version: "v4", model: "sky", duration: "50m 35s", connected: "3 hours ago", lastHeartbeat: "38 minutes ago", cpu: 0.2, ram: 6.2, disk: 54.6, docker: 22 },
    { id: "TASK-8920", status: "Evaluating", miner: "TAO.com", version: "v0", model: "0", duration: "52m 44s", connected: "3 hours ago", lastHeartbeat: "37 minutes ago", cpu: 0.3, ram: 5.1, disk: 7.5, docker: 16 },
    { id: "TASK-8919", status: "Evaluating", miner: "Yuma", version: "v1", model: "NineAndThreeQuarters", duration: "46m 44s", connected: "3 hours ago", lastHeartbeat: "38 minutes ago", cpu: 0.6, ram: 6.1, disk: 47, docker: 27 },
    { id: "TASK-8918", status: "Evaluating", miner: "TAOApp", version: "v0", model: "mood", duration: "42m 09s", connected: "3 hours ago", lastHeartbeat: "38 minutes ago", cpu: 1.5, ram: 3.1, disk: 11.7, docker: 31 },
    { id: "TASK-8917", status: "Evaluating", miner: "Opentensor", version: "v1", model: "NineAndThreeQuarters", duration: "47m 17s", connected: "3 hours ago", lastHeartbeat: "37 minutes ago", cpu: 0.1, ram: 4.4, disk: 37.1, docker: 25 },
    { id: "TASK-8916", status: "Evaluating", miner: "Kraken", version: "v11", model: "sky", duration: "49m 13s", connected: "3 hours ago", lastHeartbeat: "38 minutes ago", cpu: 0.4, ram: 12.5, disk: 49, docker: 24 },
];

const validators = [
    { name: "Opentensor Foundation", uid: "5F4..xK2", stake: "4.2M τ", trust: 98, vtrust: 95, validated: 12840, online: true },
    { name: "Taostats", uid: "5D3..mN1", stake: "3.8M τ", trust: 96, vtrust: 92, validated: 11520, online: true },
    { name: "Roundtable21", uid: "5H7..pQ3", stake: "2.1M τ", trust: 94, vtrust: 90, validated: 9830, online: true },
    { name: "Foundry", uid: "5E9..rS4", stake: "1.9M τ", trust: 92, vtrust: 88, validated: 8420, online: true },
    { name: "Datura", uid: "5G2..tU5", stake: "1.5M τ", trust: 90, vtrust: 85, validated: 7150, online: false },
];

export default function ExplorePage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredWinners = recentWinners.filter(miner =>
        miner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        miner.uid.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredRunners = activeRunners.filter(runner =>
        runner.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen relative font-mono text-zinc-800 bg-zinc-50/50 selection:bg-primary selection:text-white overflow-x-hidden">


            <div className="relative z-10 container mx-auto px-6 py-12 max-w-7xl">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
                >
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-primary tracking-widest uppercase">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                            Network / Dashboard
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 flex items-center gap-3">
                            Subnet Explorer
                        </h1>
                        <p className="text-zinc-500 text-sm max-w-xl leading-relaxed">
                            Real-time network performance, revenue metrics, and miner leaderboards.
                        </p>
                    </div>

                    <div className="relative group w-full md:w-auto">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-zinc-400 group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="SEARCH MINER UID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-10 pl-10 pr-4 bg-white/80 backdrop-blur-sm border border-zinc-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-full md:w-64 uppercase shadow-sm placeholder:text-zinc-400"
                        />
                    </div>
                </motion.div>

                {/* Key Metrics Grid - Top Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <DataModule className="p-5 bg-white/60 backdrop-blur-xl border-zinc-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                                    <BarChart3 className="w-3.5 h-3.5" /> Total Optimizations
                                </div>
                                <span className="text-[10px] font-mono text-zinc-400">24H</span>
                            </div>
                            <div className="text-3xl font-bold text-zinc-900 tracking-tight font-mono">1.2M</div>
                            <div className="mt-3 h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[70%] rounded-full" />
                            </div>
                        </DataModule>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <DataModule className="p-5 bg-white/60 backdrop-blur-xl border-zinc-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                                    <Zap className="w-3.5 h-3.5" /> Tasks Per Second
                                </div>
                                <span className="text-[10px] font-mono text-zinc-400">TPS</span>
                            </div>
                            <div className="text-3xl font-bold text-primary tracking-tight font-mono">142</div>
                            <div className="mt-3 h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[84%] rounded-full" />
                            </div>
                        </DataModule>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <DataModule className="p-5 bg-white/60 backdrop-blur-xl border-zinc-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                                    <DollarSign className="w-3.5 h-3.5" /> Revenue Generated
                                </div>
                                <span className="text-[10px] font-mono text-zinc-400">EST</span>
                            </div>
                            <div className="text-3xl font-bold text-emerald-600 tracking-tight font-mono">$65k</div>
                            <div className="mt-3 h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[85%] rounded-full" />
                            </div>
                        </DataModule>
                    </motion.div>
                </div>

                {/* Network Chart - Full Width */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                >
                    <DataModule className="h-[400px] bg-white/60 backdrop-blur-xl border-zinc-200/60 shadow-sm flex flex-col" contentClassName="p-0">
                        <div className="p-6 border-b border-zinc-100/80 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-md">
                                    <Activity className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Network Overview</h3>
                                    <p className="text-[10px] text-zinc-500 font-medium mt-0.5">Real-time performance metrics</p>
                                </div>
                            </div>
                            <div className="flex gap-6 text-[10px] font-bold tracking-wider text-zinc-500">
                                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(99,102,241,0.5)]" /> PROMPTS OPTIMIZED</span>
                                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" /> AVG IMPROVEMENT %</span>
                            </div>
                        </div>
                        <div className="flex-1 p-6 min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={networkData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="promptsGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="improvementGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#34d399" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" strokeOpacity={0.5} />
                                    <XAxis
                                        dataKey="date"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#a1a1aa', fontSize: 10, fontFamily: 'monospace' }}
                                        dy={10}
                                    />
                                    <YAxis
                                        yAxisId="left"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#a1a1aa', fontSize: 10, fontFamily: 'monospace' }}
                                    />
                                    <YAxis
                                        yAxisId="right"
                                        orientation="right"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#a1a1aa', fontSize: 10, fontFamily: 'monospace' }}
                                        tickFormatter={(value) => `${value}%`}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                            border: '1px solid #e4e4e7',
                                            borderRadius: '8px',
                                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                            color: '#18181b',
                                            fontFamily: 'monospace',
                                            fontSize: '12px',
                                            padding: '12px'
                                        }}
                                        cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }}
                                    />
                                    <Area
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey="prompts"
                                        name="Prompts Optimized"
                                        stroke="#6366f1"
                                        strokeWidth={2}
                                        fill="url(#promptsGradient)"
                                        animationDuration={1500}
                                    />
                                    <Area
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="improvement"
                                        name="Avg Improvement %"
                                        stroke="#34d399"
                                        strokeWidth={2}
                                        fill="url(#improvementGradient)"
                                        animationDuration={1500}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </DataModule>
                </motion.div>

                {/* Recent Winner Miners - PROMINENT SECTION */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mb-8"
                >
                    <DataModule className="bg-white/60 backdrop-blur-xl border-zinc-200/60 shadow-sm">
                        <div className="p-6 border-b border-zinc-100/80 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-500/10 rounded-md">
                                    <Award className="w-5 h-5 text-amber-500" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Recent Winner Miners</h3>
                                    <p className="text-[10px] text-zinc-500 font-medium mt-0.5">Top performing miners by win rate</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                    <input
                                        type="text"
                                        placeholder="Search miner uid..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-9 pr-4 py-2 text-xs font-medium bg-white/80 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 w-48 placeholder:text-zinc-400"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-zinc-50/50 border-b border-zinc-100/80 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                            <div className="col-span-1">#</div>
                            <div className="col-span-2">Miner</div>
                            <div className="col-span-2">UID</div>
                            <div className="col-span-1">Version</div>
                            <div className="col-span-2 text-center">Wins</div>
                            <div className="col-span-2 text-center">Attempts</div>
                            <div className="col-span-2 text-right">Win Rate</div>
                        </div>

                        {/* Table Body */}
                        <div className="divide-y divide-zinc-100/80">
                            {filteredWinners.map((miner, index) => (
                                <div key={index} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-white/80 transition-all items-center group">
                                    <div className="col-span-1">
                                        <span className={`text-sm font-bold ${index === 0 ? 'text-amber-500' : index === 1 ? 'text-zinc-400' : index === 2 ? 'text-amber-700' : 'text-zinc-300'}`}>
                                            {index + 1}
                                        </span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="font-bold text-sm text-zinc-800 group-hover:text-primary transition-colors">{miner.name}</span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-xs font-mono text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">{miner.uid}</span>
                                    </div>
                                    <div className="col-span-1">
                                        <TechBadge variant="neutral" className="text-[9px] px-2 h-5">{miner.version}</TechBadge>
                                    </div>
                                    <div className="col-span-2 text-center">
                                        <span className="text-sm font-bold text-emerald-600 font-mono">{miner.wins.toLocaleString()}</span>
                                    </div>
                                    <div className="col-span-2 text-center">
                                        <span className="text-sm font-medium text-zinc-500 font-mono">{miner.attempts.toLocaleString()}</span>
                                    </div>
                                    <div className="col-span-2 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <div className="w-16 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary rounded-full"
                                                    style={{ width: `${(miner.wins / miner.attempts) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-sm font-bold text-primary font-mono">
                                                {((miner.wins / miner.attempts) * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {filteredWinners.length === 0 && (
                                <div className="p-8 text-center text-sm text-zinc-400 font-medium">
                                    No miners found matching "{searchQuery}"
                                </div>
                            )}
                        </div>
                    </DataModule>
                </motion.div>

                {/* What's Running Now - CARD GRID SECTION */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">What's Running Now</h2>
                            <p className="text-sm text-zinc-500 mt-1">
                                <span className="text-emerald-600 font-medium">{recentTasks.filter(t => t.status === 'Evaluating').length} Evaluating</span>
                                {' '}and{' '}
                                <span className="text-zinc-600 font-medium">{recentTasks.length} Active Instances</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 rounded-full border border-green-500/20">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-[10px] font-bold text-green-600 tracking-wide">LIVE</span>
                            </div>
                        </div>
                    </div>

                    {/* Card Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {recentTasks.map((task, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                className="bg-white/80 backdrop-blur-sm border border-zinc-200/60 rounded-xl p-5 hover:shadow-lg hover:border-zinc-300/80 transition-all group"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-lg flex items-center justify-center text-lg font-bold text-zinc-600 uppercase">
                                            {task.miner.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-zinc-900 group-hover:text-primary transition-colors">{task.miner}</h3>
                                            <p className="text-[11px] text-zinc-500">
                                                Running <span className="text-primary font-medium">{task.model}</span> (<span className="font-medium">{task.version}</span>) for {task.duration}
                                            </p>
                                        </div>
                                    </div>
                                    <TechBadge variant="success" className="text-[9px] h-5 px-2">
                                        {task.status}
                                    </TechBadge>
                                </div>

                                {/* Connection Info */}
                                <div className="space-y-1.5 mb-4 text-[11px] text-zinc-500">
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-3 h-3 text-zinc-400" />
                                        <span>Connected: <span className="text-zinc-700 font-medium">{task.connected}</span></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-3 h-3 text-zinc-400" />
                                        <span>Last heartbeat: <span className="text-zinc-700 font-medium">{task.lastHeartbeat}</span></span>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-100">
                                    <div className="flex items-center gap-2">
                                        <Cpu className="w-3.5 h-3.5 text-zinc-400" />
                                        <span className="text-[10px] text-zinc-500">CPU:</span>
                                        <span className="text-xs font-bold text-emerald-600 font-mono">{task.cpu}%</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Activity className="w-3.5 h-3.5 text-zinc-400" />
                                        <span className="text-[10px] text-zinc-500">RAM:</span>
                                        <span className="text-xs font-bold text-blue-600 font-mono">{task.ram}%</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BarChart3 className="w-3.5 h-3.5 text-zinc-400" />
                                        <span className="text-[10px] text-zinc-500">Disk:</span>
                                        <span className="text-xs font-bold text-amber-600 font-mono">{task.disk}%</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Brain className="w-3.5 h-3.5 text-zinc-400" />
                                        <span className="text-[10px] text-zinc-500">Docker:</span>
                                        <span className="text-xs font-bold text-zinc-700 font-mono">{task.docker}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Validators - PROMINENT SECTION */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mb-8"
                >
                    <DataModule className="bg-white/60 backdrop-blur-xl border-zinc-200/60 shadow-sm">
                        <div className="p-6 border-b border-zinc-100/80 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-violet-500/10 rounded-md">
                                    <Users className="w-5 h-5 text-violet-500" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Validators</h3>
                                    <p className="text-[10px] text-zinc-500 font-medium mt-0.5">Top validators by stake</p>
                                </div>
                            </div>
                            <TechBadge variant="neutral" className="text-[9px] h-5 px-2">
                                {validators.length} ACTIVE
                            </TechBadge>
                        </div>

                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-zinc-50/50 border-b border-zinc-100/80 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                            <div className="col-span-1">#</div>
                            <div className="col-span-3">Validator</div>
                            <div className="col-span-2">UID</div>
                            <div className="col-span-2 text-center">Stake</div>
                            <div className="col-span-2 text-center">Trust Score</div>
                            <div className="col-span-2 text-right">Status</div>
                        </div>

                        {/* Table Body */}
                        <div className="divide-y divide-zinc-100/80">
                            {validators.map((validator, index) => (
                                <div key={index} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-white/80 transition-all items-center group">
                                    <div className="col-span-1">
                                        <span className={`text-sm font-bold ${index === 0 ? 'text-amber-500' : index === 1 ? 'text-zinc-400' : index === 2 ? 'text-amber-700' : 'text-zinc-300'}`}>
                                            {index + 1}
                                        </span>
                                    </div>
                                    <div className="col-span-3">
                                        <span className="font-bold text-sm text-zinc-800 group-hover:text-primary transition-colors">{validator.name}</span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-xs font-mono text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">{validator.uid}</span>
                                    </div>
                                    <div className="col-span-2 text-center">
                                        <span className="text-sm font-bold text-violet-600 font-mono">{validator.stake}</span>
                                    </div>
                                    <div className="col-span-2 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-12 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-primary to-violet-500 rounded-full"
                                                    style={{ width: `${validator.trust}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-bold text-zinc-700 font-mono">{validator.trust}%</span>
                                        </div>
                                    </div>
                                    <div className="col-span-2 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <span className={`relative flex h-2 w-2 ${validator.online ? '' : 'opacity-50'}`}>
                                                {validator.online && (
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                )}
                                                <span className={`relative inline-flex rounded-full h-2 w-2 ${validator.online ? 'bg-emerald-500' : 'bg-zinc-400'}`}></span>
                                            </span>
                                            <span className={`text-[10px] font-bold ${validator.online ? 'text-emerald-600' : 'text-zinc-400'}`}>
                                                {validator.online ? 'ONLINE' : 'OFFLINE'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DataModule>
                </motion.div>

                {/* Supported Models - Full Width */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                >
                    <DataModule className="bg-white/60 backdrop-blur-xl border-zinc-200/60 shadow-sm">
                        <div className="p-6 border-b border-zinc-100/80 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 rounded-md">
                                    <Brain className="w-5 h-5 text-blue-500" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Supported Models</h3>
                                    <p className="text-[10px] text-zinc-500 font-medium mt-0.5">Models available for prompt optimization</p>
                                </div>
                            </div>
                        </div>

                        {/* Model Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6">
                            {supportedModels.map((model, i) => (
                                <div key={i} className="p-4 bg-zinc-50/50 rounded-lg border border-zinc-100 hover:border-primary/30 hover:bg-white/80 transition-all group">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-bold text-sm text-zinc-800 group-hover:text-primary transition-colors">{model.name}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[10px]">
                                        <TechBadge variant="neutral" className="text-[9px] px-1.5 h-4">{model.provider}</TechBadge>
                                        <span className="text-zinc-500 font-mono">{model.context}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DataModule>
                </motion.div>
            </div>
        </div>
    );
}
