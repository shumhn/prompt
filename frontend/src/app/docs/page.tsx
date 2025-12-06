"use client";

import { motion } from "framer-motion";
import { FileText, Sparkles, Code2, BookOpen, Zap, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-zinc-50/50 flex items-center justify-center relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.5, 0.3, 0.5],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
                {/* Floating icons animation */}
                <div className="relative mb-8">
                    <motion.div
                        className="absolute -top-8 left-1/4 text-primary/40"
                        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Code2 className="w-8 h-8" />
                    </motion.div>
                    <motion.div
                        className="absolute -top-4 right-1/4 text-blue-500/40"
                        animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    >
                        <BookOpen className="w-6 h-6" />
                    </motion.div>
                    <motion.div
                        className="absolute top-2 left-1/3 text-amber-500/40"
                        animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    >
                        <Zap className="w-5 h-5" />
                    </motion.div>
                </div>

                {/* Main icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-xl shadow-primary/10 border border-zinc-200/60 mb-8"
                >
                    <motion.div
                        animate={{
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <FileText className="w-12 h-12 text-primary" />
                    </motion.div>
                </motion.div>

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
                >
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                    <span className="text-xs font-bold font-mono text-primary uppercase tracking-wider">
                        In Development
                    </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-5xl font-bold font-mono text-zinc-900 mb-4 tracking-tight"
                >
                    DOCS_{" "}
                    <span className="text-primary">COMING_SOON</span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-zinc-600 text-lg mb-8 leading-relaxed"
                >
                    We're crafting comprehensive documentation to help you get the most out of{" "}
                    <span className="font-bold text-zinc-900">Reveal Prompt</span>.
                    <br className="hidden md:block" />
                    Stay tuned for guides, API references, and tutorials.
                </motion.p>

                {/* Features preview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
                >
                    {[
                        { icon: BookOpen, label: "Getting Started", desc: "Quick setup guides" },
                        { icon: Code2, label: "API Reference", desc: "Complete documentation" },
                        { icon: Zap, label: "Best Practices", desc: "Optimization tips" },
                    ].map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            className="p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-zinc-200/60 shadow-sm"
                        >
                            <item.icon className="w-6 h-6 text-primary mb-2 mx-auto" />
                            <h3 className="text-sm font-bold font-mono text-zinc-900 mb-1">{item.label}</h3>
                            <p className="text-xs text-zinc-500">{item.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Back button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <Button asChild variant="outline" className="font-mono gap-2">
                        <Link href="/optimize">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Playground
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}
