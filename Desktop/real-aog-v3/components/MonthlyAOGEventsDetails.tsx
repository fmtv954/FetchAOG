import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface AOGEvent {
  date: string
  tailNumber: string
  reason: string
  duration: string
  impact: string
}

interface MonthlyAOGEventsDetailsProps {
  isOpen: boolean
  onClose: () => void
  month: string
  events: AOGEvent[]
}

export function MonthlyAOGEventsDetails({ isOpen, onClose, month, events }: MonthlyAOGEventsDetailsProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>AOG Events for {month}</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Tail Number</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Impact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event, index) => (
              <TableRow key={index}>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.tailNumber}</TableCell>
                <TableCell>{event.reason}</TableCell>
                <TableCell>{event.duration}</TableCell>
                <TableCell>
                  <Badge variant="outline">{event.impact}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}

