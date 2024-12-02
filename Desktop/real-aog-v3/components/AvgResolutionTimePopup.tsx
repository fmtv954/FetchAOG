import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface AvgResolutionTimePopupProps {
  isOpen: boolean
  onClose: () => void
  data: {
    month: string
    avgTime: number
  }[]
}

export function AvgResolutionTimePopup({ isOpen, onClose, data }: AvgResolutionTimePopupProps) {
  const overallAvg = Math.round(data.reduce((sum, { avgTime }) => sum + avgTime, 0) / data.length)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Average Resolution Time (Last 90 Days)</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Average Resolution Time Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
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
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.month}</TableCell>
                  <TableCell>{Math.floor(item.avgTime / 60)}h {item.avgTime % 60}m</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-bold">Overall Average</TableCell>
                <TableCell className="font-bold">{Math.floor(overallAvg / 60)}h {overallAvg % 60}m</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}

