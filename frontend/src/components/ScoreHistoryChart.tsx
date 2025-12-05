"use client";

import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { DataModule } from "@/components/ui/data-module";
import { Activity } from "lucide-react";

const data = Array.from({ length: 50 }, (_, i) => ({
    time: i,
    score: 70 + Math.random() * 10 - 5 + (i / 50) * 5
}));

export default function ScoreHistoryChart() {
    return (
        <DataModule className="h-[300px] bg-white/80 backdrop-blur-sm border-zinc-200/60 flex flex-col">
            <div className="p-4 border-b border-zinc-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider font-mono flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    Score History
                </h3>
            </div>
            <div className="flex-1 p-4 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                        <XAxis
                            dataKey="time"
                            hide
                        />
                        <YAxis
                            domain={['auto', 'auto']}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#a1a1aa', fontSize: 10, fontFamily: 'monospace' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                border: '1px solid #e4e4e7',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                color: '#18181b',
                                fontFamily: 'monospace',
                                fontSize: '12px'
                            }}
                            itemStyle={{ color: '#6366f1' }}
                            cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }}
                            labelStyle={{ display: 'none' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#6366f1"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </DataModule>
    );
}
