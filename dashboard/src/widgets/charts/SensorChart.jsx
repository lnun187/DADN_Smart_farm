// components/SensorChart.jsx
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function SensorChart({ title, weeklyAvg, monthlyAvg }) {
  const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const chartData = days.map((day, index) => ({
    name: day,
    "Tuần": weeklyAvg[index] !== null ? parseFloat(weeklyAvg[index].toFixed(2)) : null,
    "Tháng": monthlyAvg[index] !== null ? parseFloat(monthlyAvg[index].toFixed(2)) : null,
  }));

  return (
    <div className="bg-white rounded-2xl shadow p-4 w-full max-w-full h-[300px]">
      <h3 className="text-lg font-semibold mb-2 text-center">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Tuần" stroke="#8884d8" />
          <Line type="monotone" dataKey="Tháng" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
