"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Copy,
    Check,
    Zap,
    Clock,
    FileText,
    TrendingDown,
    ChevronDown,
    ChevronUp,
    AlertCircle,
} from "lucide-react";

interface QueryResult {
    query: string;
    originalResponse: {
        text: string;
        tokens: number;
        latency: number;
    };
    optimizedResponse: {
        text: string;
        tokens: number;
        latency: number;
    };
}

interface QueryResultsComparisonProps {
    results: QueryResult[];
    className?: string;
}

export default function QueryResultsComparison({
    results,
    className = "",
}: QueryResultsComparisonProps) {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [expandedQueries, setExpandedQueries] = useState<Set<number>>(
        new Set(results.length > 0 ? [0] : [])
    );

    const toggleQuery = (index: number) => {
        const newExpanded = new Set(expandedQueries);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedQueries(newExpanded);
    };

    const expandAll = () => {
        setExpandedQueries(new Set(results.map((_, i) => i)));
    };

    const collapseAll = () => {
        setExpandedQueries(new Set());
    };

    const copyResponse = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    if (!results || results.length === 0) {
        return (
            <div className={`${className}`}>
                <div className="bg-white border border-zinc-200 rounded-xl p-8 text-center shadow-sm">
                    <AlertCircle className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-zinc-900 mb-2">No Sample Query Results</h3>
                    <p className="text-zinc-500 text-sm">
                        Sample query results will appear here once the optimization is complete.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={`${className} space-y-6`}>
            {/* Header with controls */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <h2 className="text-2xl font-bold text-zinc-900">Sample Query Results</h2>
                    <span className="text-sm text-zinc-500">({results.length} queries tested)</span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={expandAll}
                        className="text-xs px-3 py-1.5 bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-600 rounded-md transition-colors shadow-sm"
                    >
                        Expand All
                    </button>
                    <button
                        onClick={collapseAll}
                        className="text-xs px-3 py-1.5 bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-600 rounded-md transition-colors shadow-sm"
                    >
                        Collapse All
                    </button>
                </div>
            </div>

            {/* Query Results */}
            <div className="space-y-4">
                {results.map((result, index) => {
                    const isExpanded = expandedQueries.has(index);
                    const tokenDiff = result.originalResponse.tokens - result.optimizedResponse.tokens;
                    const latencyDiff = result.originalResponse.latency - result.optimizedResponse.latency;
                    const tokenSavings = ((tokenDiff / result.originalResponse.tokens) * 100).toFixed(1);
                    const latencyImprovement = ((latencyDiff / result.originalResponse.latency) * 100).toFixed(1);

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm"
                        >
                            {/* Query Header - Always Visible */}
                            <button
                                onClick={() => toggleQuery(index)}
                                className="w-full px-6 py-4 flex items-center justify-between hover:bg-zinc-50 transition-colors"
                            >
                                <div className="text-left flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-sm font-bold text-primary">Query #{index + 1}</span>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 border border-emerald-100 rounded text-xs text-emerald-600">
                                                <Zap className="w-3 h-3" />
                                                <span className="font-medium">-{tokenSavings}% tokens</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-purple-50 border border-purple-100 rounded text-xs text-purple-600">
                                                <Clock className="w-3 h-3" />
                                                <span className="font-medium">-{latencyImprovement}% latency</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-zinc-500 line-clamp-2 font-mono">
                                        {result.query}
                                    </div>
                                </div>
                                <div className="ml-4">
                                    {isExpanded ? (
                                        <ChevronUp className="w-5 h-5 text-zinc-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-zinc-400" />
                                    )}
                                </div>
                            </button>

                            {/* Expanded Content - Side by Side Comparison */}
                            {isExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="border-t border-zinc-200"
                                >
                                    {/* Query Input */}
                                    <div className="px-6 py-4 bg-zinc-50/50">
                                        <div className="text-xs text-zinc-500 mb-2 font-bold uppercase tracking-wider">
                                            Input Query
                                        </div>
                                        <div className="text-sm text-zinc-700 font-mono bg-white border border-zinc-200 rounded-lg p-4 shadow-sm">
                                            {result.query}
                                        </div>
                                    </div>

                                    {/* Side-by-Side Response Comparison */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-zinc-200">
                                        {/* Original Response */}
                                        <div className="p-6 border-r border-zinc-200 bg-red-50/10">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                                    <span className="text-sm font-bold text-red-600">Original Response</span>
                                                </div>
                                                <button
                                                    onClick={() => copyResponse(result.originalResponse.text, index * 2)}
                                                    className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-1"
                                                >
                                                    {copiedIndex === index * 2 ? (
                                                        <>
                                                            <Check className="w-3 h-3" />
                                                            Copied
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy className="w-3 h-3" />
                                                            Copy
                                                        </>
                                                    )}
                                                </button>
                                            </div>

                                            {/* Metrics */}
                                            <div className="flex items-center gap-4 mb-4 pb-3 border-b border-zinc-100">
                                                <div className="flex items-center gap-1.5 text-xs">
                                                    <Zap className="w-3.5 h-3.5 text-zinc-400" />
                                                    <span className="text-zinc-500">{result.originalResponse.tokens} tokens</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs">
                                                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                                                    <span className="text-zinc-500">{result.originalResponse.latency}ms</span>
                                                </div>
                                            </div>

                                            {/* Response Content */}
                                            <div className="text-xs font-mono text-zinc-600 whitespace-pre-wrap leading-relaxed bg-white border border-zinc-200 rounded-lg p-4 shadow-sm max-h-none overflow-visible">
                                                {result.originalResponse.text}
                                            </div>
                                        </div>

                                        {/* Optimized Response */}
                                        <div className="p-6 bg-emerald-50/10">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                                    <span className="text-sm font-bold text-emerald-600">Optimized Response</span>
                                                </div>
                                                <button
                                                    onClick={() => copyResponse(result.optimizedResponse.text, index * 2 + 1)}
                                                    className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-1"
                                                >
                                                    {copiedIndex === index * 2 + 1 ? (
                                                        <>
                                                            <Check className="w-3 h-3" />
                                                            Copied
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy className="w-3 h-3" />
                                                            Copy
                                                        </>
                                                    )}
                                                </button>
                                            </div>

                                            {/* Metrics with Improvements */}
                                            <div className="flex items-center gap-4 mb-4 pb-3 border-b border-zinc-100">
                                                <div className="flex items-center gap-1.5 text-xs">
                                                    <Zap className="w-3.5 h-3.5 text-emerald-500" />
                                                    <span className="text-emerald-600 font-medium">{result.optimizedResponse.tokens} tokens</span>
                                                    <span className="text-zinc-400">(-{tokenDiff})</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs">
                                                    <Clock className="w-3.5 h-3.5 text-emerald-500" />
                                                    <span className="text-emerald-600 font-medium">{result.optimizedResponse.latency}ms</span>
                                                    <span className="text-zinc-400">(-{latencyDiff}ms)</span>
                                                </div>
                                            </div>

                                            {/* Response Content */}
                                            <div className="text-xs font-mono text-zinc-600 whitespace-pre-wrap leading-relaxed bg-white border border-emerald-100 rounded-lg p-4 shadow-sm max-h-none overflow-visible">
                                                {result.optimizedResponse.text}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Performance Summary */}
                                    <div className="px-6 py-4 bg-linear-to-r from-emerald-50 to-blue-50 border-t border-zinc-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-6">
                                                <div>
                                                    <div className="text-xs text-zinc-500 mb-1">Token Savings</div>
                                                    <div className="flex items-center gap-2">
                                                        <TrendingDown className="w-4 h-4 text-emerald-500" />
                                                        <span className="text-lg font-bold text-emerald-600">{tokenSavings}%</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-zinc-500 mb-1">Latency Improvement</div>
                                                    <div className="flex items-center gap-2">
                                                        <TrendingDown className="w-4 h-4 text-purple-500" />
                                                        <span className="text-lg font-bold text-purple-600">{latencyImprovement}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-zinc-500 mb-1">Overall Impact</div>
                                                <div className="text-sm">
                                                    <span className="text-emerald-600 font-medium">{tokenDiff} fewer tokens</span>
                                                    <span className="text-zinc-400 mx-2">•</span>
                                                    <span className="text-purple-600 font-medium">{latencyDiff}ms faster</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
