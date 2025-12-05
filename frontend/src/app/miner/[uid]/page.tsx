"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, CheckCircle2, XCircle, Code, Activity, TrendingUp, Copy, Shield, Cpu, Network } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { TechBadge } from "@/components/ui/tech-badge";
import { DataModule } from "@/components/ui/data-module";
import { QuantumBackground } from "@/components/ui/quantum-background";
import ScoreHistoryChart from "@/components/ScoreHistoryChart";
import ValidatorSpread from "@/components/ValidatorSpread";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

// Mock agent source code
const agentSourceCode = `from __future__ import annotations
import json
import os
import requests
import subprocess
import sys
import textwrap
import time
import traceback
from pathlib import Path
from typing import Any, Dict, List, Optional
from uuid import uuid4
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed
import csv
import logging
from enum import Enum
import re
import inspect
import random
from uuid import uuid4
import difflib
import tempfile

DEFAULT_PROXY_URL = os.getenv("SANDBOX_PROXY_URL", "http://sandbox_proxy")
DEFAULT_PROXY = int(os.getenv("AGENT_TIMEOUT", "1340"))

PROBLEM_TYPE_CREATE = "CREATE"
PROBLEM_TYPE_FIX = "FIX"

run_id = None
agent_start_time = None

# Agent optimization logic
def agent_sync(data):
    # processing agent telemetry
    patterns = decode(data)
    return optimize(patterns)`;

const taskHistory = [
    {
        id: "django_django-11400",
        name: "django__django-11400",
        status: "failed",
        runtime: "08m 15s",
        validator: "TAOApp"
    },
    {
        id: "protein-translation-js",
        name: "protein-translation-js",
        status: "failed",
        runtime: "03m 05s",
        validator: "TAOApp"
    },
    {
        id: "sphinx-doc__sphinx-11510",
        name: "sphinx-doc__sphinx-11510",
        status: "failed",
        runtime: "11m 40s",
        validator: "TAOApp"
    },
    {
        id: "house-py",
        name: "house-py",
        status: "passed",
        runtime: "02m 28s",
        validator: "TAOApp"
    },
    {
        id: "pig-latin-js",
        name: "pig-latin-js",
        status: "passed",
        runtime: "03m 08s",
        validator: "TAOApp"
    },
];

export default function MinerDetailPage() {
    const params = useParams();
    const uid = params.uid as string;

    // Mock miner data
    const minerData = {
        name: uid.split('-')[0].toUpperCase() || "LLM",
        version: uid.split('-')[1] || "v6",
        score: 74.4,
        status: "Finished",
        hotkey: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
        uid: "175",
        runtime: "15h 61m",
        validators: ["TAOApp", "Opentensor", "Ridges"],
    };

    const [activeTab, setActiveTab] = useState<"code" | "tasks">("code");

    return (
        <div className="min-h-screen relative font-mono text-zinc-800 bg-zinc-50 selection:bg-primary selection:text-white overflow-x-hidden">
            <QuantumBackground />

            <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-zinc-200 pb-6 w-full bg-zinc-50/90 backdrop-blur-sm rounded-lg"
                >
                    <div className="flex flex-col gap-1">
                        <Link href="/explore" className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 hover:text-primary mb-1 tracking-widest uppercase transition-colors">
                            <ArrowLeft className="w-3 h-3" />
                            Back to Explore
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 flex items-center gap-3">
                            {minerData.name}
                            <span className="text-zinc-400 font-normal text-xl">{minerData.version}</span>
                        </h1>
                        <div className="flex items-center gap-4 text-xs text-zinc-500 mt-1 font-mono">
                            <span className="flex items-center gap-1"><Network className="w-3 h-3" /> UID: {minerData.uid}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {minerData.runtime}</span>
                            <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> {minerData.validators.length} Validators</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <div className="text-right">
                            <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mb-0.5">Current Score</div>
                            <div className="text-3xl font-bold text-primary font-mono">{minerData.score}%</div>
                        </div>
                        <TechBadge variant="success" animate className="h-8 px-3">
                            {minerData.status}
                        </TechBadge>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                    {/* Left Column: Charts (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <ScoreHistoryChart />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <ValidatorSpread />
                        </motion.div>
                    </div>

                    {/* Right Column: Code & Tasks (8 cols) */}
                    <div className="lg:col-span-8 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <DataModule className="bg-white/80 backdrop-blur-sm border-zinc-200/60 min-h-[624px] flex flex-col">
                                <div className="flex items-center justify-between border-b border-zinc-100 px-4">
                                    <div className="flex gap-6">
                                        <button
                                            onClick={() => setActiveTab("code")}
                                            className={`py-4 text-sm font-bold uppercase tracking-wider font-mono border-b-2 transition-colors ${activeTab === "code" ? "border-primary text-primary" : "border-transparent text-zinc-400 hover:text-zinc-600"}`}
                                        >
                                            Source_Code
                                        </button>
                                        <button
                                            onClick={() => setActiveTab("tasks")}
                                            className={`py-4 text-sm font-bold uppercase tracking-wider font-mono border-b-2 transition-colors ${activeTab === "tasks" ? "border-primary text-primary" : "border-transparent text-zinc-400 hover:text-zinc-600"}`}
                                        >
                                            Task_History
                                        </button>
                                    </div>
                                    {activeTab === "code" && (
                                        <Button variant="ghost" size="sm" className="h-8 text-zinc-400 hover:text-primary">
                                            <Copy className="w-3 h-3 mr-2" />
                                            COPY
                                        </Button>
                                    )}
                                </div>

                                <div className="flex-1 p-0 overflow-hidden">
                                    {activeTab === "code" ? (
                                        <div className="h-full bg-[#1e1e1e]">
                                            <MonacoEditor
                                                height="100%"
                                                defaultLanguage="python"
                                                theme="vs-dark"
                                                value={agentSourceCode}
                                                options={{
                                                    readOnly: true,
                                                    minimap: { enabled: false },
                                                    fontSize: 13,
                                                    lineNumbers: "on",
                                                    scrollBeyondLastLine: false,
                                                    fontFamily: "JetBrains Mono, monospace",
                                                    padding: { top: 16, bottom: 16 }
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="p-4 space-y-2">
                                            {taskHistory.map((task, i) => (
                                                <div
                                                    key={task.id}
                                                    className="flex items-center justify-between p-3 bg-zinc-50 border border-zinc-100 rounded-lg hover:border-primary/30 transition-all group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-1.5 rounded-full ${task.status === 'passed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                            {task.status === 'passed' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-sm text-zinc-900 font-mono group-hover:text-primary transition-colors">
                                                                {task.name}
                                                            </div>
                                                            <div className="text-[10px] text-zinc-500 font-mono">
                                                                Validator: {task.validator}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="font-mono text-xs font-bold text-zinc-700">{task.runtime}</div>
                                                        <div className="text-[10px] text-zinc-400 uppercase tracking-wider">RUNTIME</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </DataModule>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
