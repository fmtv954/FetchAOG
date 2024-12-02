"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const data = [
  { month: "Jan", events: 4 },
  { month: "Feb", events: 3 },
  { month: "Mar", events: 6 },
  { month: "Apr", events: 4 },
  { month: "May", events: 5 },
  { month: "Jun", events: 7 },
]

export function AOGTrends() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="events"
            stroke="hsl(var(--primary))"
            name="AOG Events"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

