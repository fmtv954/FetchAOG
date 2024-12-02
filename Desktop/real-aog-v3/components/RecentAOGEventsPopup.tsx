import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface RecentAOGEventsPopupProps {
  isOpen: boolean
  onClose: () => void
  events: {
    date: string
    timeAOGDeclared: string
    reason: string
    duration: string
    impact: string
  }[]
}

export function RecentAOGEventsPopup({ isOpen, onClose, events }: RecentAOGEventsPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Recent AOG Events</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time AOG Declared</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Impact</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event, index) => (
              <TableRow key={index}>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.timeAOGDeclared}</TableCell>
                <TableCell>{event.reason}</TableCell>
                <TableCell>{event.duration}</TableCell>
                <TableCell>{event.impact}</TableCell>
                <TableCell>
                  <Badge variant="outline">Resolved</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}

