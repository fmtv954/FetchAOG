import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface AOGEvent {
  date: string
  location: string
  scheduledFlight: string
  timeToResolve: string
}

interface AOGEventsPopupProps {
  isOpen: boolean
  onClose: () => void
  events: AOGEvent[]
}

export function AOGEventsPopup({ isOpen, onClose, events }: AOGEventsPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>AOG Events Details</DialogTitle>
          <DialogDescription>
            Detailed information about recent AOG events
          </DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Scheduled Flight</TableHead>
              <TableHead>Time to Resolve</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event, index) => (
              <TableRow key={index}>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.scheduledFlight}</TableCell>
                <TableCell>{event.timeToResolve}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}

