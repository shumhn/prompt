"use client";

import { DataModule } from "@/components/ui/data-module";
import { Users } from "lucide-react";

const validators = [
    { name: "Opentensor", weight: 0.183, color: "bg-zinc-900" },
    { name: "TaoStats", weight: 0.162, color: "bg-zinc-700" },
    { name: "Foundry", weight: 0.145, color: "bg-zinc-500" },
    { name: "Rizzo", weight: 0.127, color: "bg-zinc-400" },
];

export default function ValidatorSpread() {
    return (
        <DataModule className="h-[300px] bg-white/80 backdrop-blur-sm border-zinc-200/60 flex flex-col">
            <div className="p-4 border-b border-zinc-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider font-mono flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Validator Spread
                </h3>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto">
                {validators.map((v, i) => (
                    <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                            <span className="text-zinc-700 font-bold">{v.name}</span>
                            <span className="text-zinc-500">{v.weight.toFixed(3)}</span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${v.color}`}
                                style={{ width: `${v.weight * 100 * 3}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </DataModule>
    );
}
