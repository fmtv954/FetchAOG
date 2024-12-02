import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const resolutionTimes = [
  { month: "Sep", avgTime: 240 },
  { month: "Oct", avgTime: 195 },
  { month: "Nov", avgTime: 225 },
]

export function AvgResolutionTime() {
  const overallAvg = Math.round(resolutionTimes.reduce((sum, { avgTime }) => sum + avgTime, 0) / resolutionTimes.length)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Average Resolution Time Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={resolutionTimes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="avgTime" stroke="#8884d8" name="Avg. Resolution Time (minutes)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Month</TableHead>
            <TableHead>Average Resolution Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resolutionTimes.map((month, index) => (
            <TableRow key={index}>
              <TableCell>{month.month}</TableCell>
              <TableCell>{Math.floor(month.avgTime / 60)}h {month.avgTime % 60}m</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell className="font-bold">Overall Average</TableCell>
            <TableCell className="font-bold">{Math.floor(overallAvg / 60)}h {overallAvg % 60}m</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

