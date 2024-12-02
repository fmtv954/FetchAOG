import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface AOGEvent {
  date: string
  tailNumber: string
  reason: string
  duration: string
  impact: string
}

interface MonthlyEvents {
  month: string
  events: AOGEvent[]
}

interface TotalAOGEventsPopupProps {
  isOpen: boolean
  onClose: () => void
  events: MonthlyEvents[]
}

export function TotalAOGEventsPopup({ isOpen, onClose, events }: TotalAOGEventsPopupProps) {
  const totalEvents = events?.reduce((sum, month) => sum + (month.events?.length || 0), 0) || 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Total AOG Events (Last 90 Days)</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {events && events.length > 0 ? (
            events?.map((monthData) => (
              <Card key={monthData.month}>
                <CardHeader>
                  <CardTitle>{monthData.month} - {monthData.events?.length || 0} Events</CardTitle>
                </CardHeader>
                <CardContent>
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
                      {monthData.events?.map((event, index) => (
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
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No AOG events in the last 90 days.</p>
          )}
        </div>
        <div className="mt-4">
          <p className="font-medium">Total Events: {totalEvents}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

