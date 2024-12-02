import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const lastAOGEvents = [
  {
    date: "2024-11-10",
    duration: "4h 15m",
    reason: "Hydraulic System Failure",
    impact: "2 Flights Cancelled",
    status: "Resolved",
  },
  {
    date: "2024-11-05",
    duration: "2h 30m",
    reason: "Avionics Issue",
    impact: "1 Flight Delayed",
    status: "Resolved",
  },
  {
    date: "2024-10-28",
    duration: "5h 45m",
    reason: "Engine Malfunction",
    impact: "3 Flights Cancelled",
    status: "Resolved",
  },
]

export function LastAOGEvents() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Impact</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {lastAOGEvents.map((event, index) => (
          <TableRow key={index}>
            <TableCell>{event.date}</TableCell>
            <TableCell>{event.duration}</TableCell>
            <TableCell>{event.reason}</TableCell>
            <TableCell>{event.impact}</TableCell>
            <TableCell>
              <Badge variant="success">{event.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

