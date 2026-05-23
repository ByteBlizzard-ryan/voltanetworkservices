import React from "react";
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#4f46e5", "#22c55e", "#f59e0b", "#ef4444", "#0bf5b7", "#de44ef"];



export default function JaugeProduits({ data }) {

    return (
        <div style={{ width: "100%", height: 350 }}>
            <ResponsiveContainer>
                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}   // 🔥 trou (donut)
                        outerRadius={100}
                        paddingAngle={3}
                        label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip />
                    <Legend />

                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}