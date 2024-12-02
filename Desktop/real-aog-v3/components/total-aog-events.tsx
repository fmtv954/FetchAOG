import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const totalAOGEvents = [
  { month: "Sep", events: 1 },
  { month: "Oct", events: 2 },
  { month: "Nov", events: 3 },
]

export function TotalAOGEvents() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AOG Events by Month</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={totalAOGEvents}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="events" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Month</TableHead>
            <TableHead>Number of Events</TableHead>
            <TableHead>Trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {totalAOGEvents.map((month, index) => (
            <TableRow key={index}>
              <TableCell>{month.month}</TableCell>
              <TableCell>{month.events}</TableCell>
              <TableCell>
                <Badge variant={month.events > totalAOGEvents[index - 1]?.events ? "destructive" : "success"}>
                  {month.events > totalAOGEvents[index - 1]?.events ? "Increasing" : "Decreasing"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

