import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#6366f1", "#f59e0b", "#10b981", "#ef4444"];

const OrderStatusChart = ({ data=[] }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const safeData = Array.isArray(data) ? data : [];
    const total = safeData.reduce((acc, item) => acc + item.value, 0);
    const renderCustomizedLabel = ({ percent }) => {
        return `${(percent * 100).toFixed(0)}%`;
    };
    if (!data || data.length === 0) {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="mb-4 font-semibold">Order Status</h2>
        <div className="h-[300px] flex items-center justify-center text-gray-400">
            No data available
        </div>
        </div>
        );
    console.log(data)
    }
    

  return (
    <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="mb-4 font-semibold">Order Status</h2>

        <div className="relative w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>

                <Pie
                    data={safeData}
                    
                    nameKey="status"
                    cx="50%"   
                    cy="50%"
                    innerRadius={75}
                    outerRadius={105}
                    paddingAngle={2}
                    label={renderCustomizedLabel}
                    labelLine={false}  
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={(_, index) => setActiveIndex(null)}
                >
                    {safeData.map((entry, index) => (
                    <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                        opacity={activeIndex === index ? 1 : 0.9}
                    />
                    ))}
                    
                </Pie>

                <Tooltip />

                <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    iconType="square"
                    wrapperStyle={{ paddingLeft: "30px" }}
                    formatter={(value, entry) =>
                    `${value} (${entry.payload.value})`
                    }
                />

                {/* PERFECT CENTER TEXT */}
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                >
                    <tspan
                    x="32.5%"
                    dy="0"
                    className="text-2xl font-bold fill-gray-800"
                    >
                    {total}
                    </tspan>
                    <tspan
                    x="32.5%"
                    dy="18"
                    className="text-sm fill-gray-400"
                    >
                    Orders
                    </tspan>
                </text>

                </PieChart>
            </ResponsiveContainer>
        </div>
    </div>
  );
};

export default OrderStatusChart;