import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Rectangle,
} from "recharts";

const AttendanceChart = () => {
  const weeklyData = [
    { day: "Mon", present: 25, absent: 5 },
    { day: "Tue", present: 27, absent: 3 },
    { day: "Wed", present: 26, absent: 4 },
    { day: "Thu", present: 28, absent: 2 },
    { day: "Fri", present: 24, absent: 6 },
    { day: "Sat", present: 29, absent: 1 },
    { day: "Sun", present: 26, absent: 4 },
  ];

  const monthlyData = [
    { week: "Week 1", present: 150, absent: 20 },
    { week: "Week 2", present: 160, absent: 15 },
    { week: "Week 3", present: 155, absent: 18 },
    { week: "Week 4", present: 165, absent: 10 },
  ];

  const [selectedRange, setSelectedRange] = useState("7days");
  const chartData = selectedRange === "7days" ? weeklyData : monthlyData;

  return (
    <div className="p-6   rounded-2xl shadow-lg w-full border border-indigo-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
           Daily Attendance Data
        </h2>

        <select
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
          className="border border-indigo-300 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer transition-all duration-200 hover:shadow-sm"
          >
          <option value="7days">Last 7 Days</option>
          <option value="month">Last Month</option>
        </select> 
      </div>
          <p className="text-gray-500 mb-3">{selectedRange === '7days' ? 'Last 7 working days' : 'Last 30 working days'}</p>

      {/* Chart */}
      <div className="h-64 bg-white rounded-xl shadow-inner p-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barSize={18}>
            <XAxis
              dataKey={selectedRange === "7days" ? "day" : "week"}
              tick={{ fill: "#555", fontSize: 12 }}
              axisLine={{ stroke: "#ddd" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#555", fontSize: 12 }}
              axisLine={{ stroke: "#ddd" }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9fafb",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "13px" }} />
            <Bar
              dataKey="present"
              fill="#4CAF50"
              name="Present"
              radius={[6, 6, 0, 0]}
              activeBar={<Rectangle fill="#4CAF50" stroke="none" />}
            />
            <Bar
              dataKey="absent"
              fill="#EF4444"
              name="Absent"
              radius={[6, 6, 0, 0]}
              activeBar={<Rectangle fill="#EF4444" stroke="none" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer info */}
      <div className="text-xs text-gray-500 mt-3 text-right italic">
        *Data shown based on selected range
      </div>
    </div>
  );
};

export default AttendanceChart;
