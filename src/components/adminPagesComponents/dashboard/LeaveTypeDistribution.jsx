import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { getLeaveDistribution } from "../../../service";
const COLORS = {
  Sick: "#06b6d4",    // cyan-500
  Annual: "#10b981",  // green-500
  Casual: "#f59e0b",  // amber-500
  Unpaid: "#ef4444",  // red-500
};

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const LeaveTypeDistribution = ({data=null}) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getLeaveDistribution();
        console.log(response.data);
        
        // Map the data to match the chart format
        const mappedData = response.data.map(item => ({
          name: item.leaveType,
          value: item.count,
        }));
        
        setChartData(mappedData);
      } catch (error) {
        console.error('Error fetching leave distribution:', error);
      } finally {
        setLoading(false);
      }
    };
     fetchData();
  }, []);
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
  <div className="w-full p-5 rounded-2xl   shadow-md border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-slate-800 flex items-center gap-2">
           Leave Distribution
        </h3>

        <div
          className="text-sm text-slate-600 italic"
          title="Total leaves taken"
        >
          Total: <span className="font-semibold text-slate-800">{total}</span>
        </div>
      </div>

      <div className="relative w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              formatter={(value, name) => [`${value}`, `${name} leaves`]}
              contentStyle={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                boxShadow: "0 4px 12px rgba(15,23,42,0.06)",
                padding: "8px 10px",
              }}
            />

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={4}
              activeShape={renderActiveShape}
              onMouseEnter={() => setActiveIndex(-1)}
              onMouseLeave={() => setActiveIndex(-1)}
              isAnimationActive={true}
              animationDuration={700}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name] || "#9ca3af"} />
              ))}
            </Pie>

            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{ cursor: "pointer", fontSize: 13 }}
              iconType="circle"
              payload={chartData.map((item) => ({
                id: item.name,
                value: `${item.name} (${item.value})`,
                type: "circle",
                color: COLORS[item.name] || "#9ca3af",
              }))}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label (total) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-sm text-slate-500">Total Leaves</div>
            <div className="text-2xl font-semibold text-slate-800">{total}</div>
          </div>
        </div>
      </div>

      <div className="mt-3 text-xs text-slate-500">
        Tip: Click legend (pointer cursor) — you can wire legend clicks to filter slices if you want.
      </div>
    </div>  )
}

export default LeaveTypeDistribution