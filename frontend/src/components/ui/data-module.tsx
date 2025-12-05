"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DataModuleProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
    contentClassName?: string;
    icon?: React.ReactNode;
    action?: React.ReactNode;
}

export function DataModule({
    title,
    children,
    className,
    contentClassName,
    icon,
    action
}: DataModuleProps) {
    return (
        <div className={cn(
            "relative group bg-white/40 backdrop-blur-md border border-zinc-200/50 rounded-lg overflow-hidden",
            className
        )}>
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-400/50 rounded-tl-sm" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-400/50 rounded-tr-sm" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-400/50 rounded-bl-sm" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-400/50 rounded-br-sm" />

            {/* Header */}
            {(title || icon || action) && (
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100/50 bg-zinc-50/30">
                    <div className="flex items-center gap-2">
                        {icon && <span className="text-zinc-400">{icon}</span>}
                        {title && (
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                                {title}
                            </span>
                        )}
                    </div>
                    {action && <div>{action}</div>}
                </div>
            )}

            {/* Content */}
            <div className={cn("p-4 relative flex-1 min-h-0", contentClassName)}>
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />
                <div className="relative z-10 h-full flex flex-col">
                    {children}
                </div>
            </div>

            {/* Hover Effect - Scanline */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000" />
            </div>
        </div>
    );
}
