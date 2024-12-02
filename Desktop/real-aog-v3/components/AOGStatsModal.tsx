import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

interface AOGStatsModalProps {
  isOpen: boolean
  onClose: () => void
  airline: string
  stats: {
    monthlyAOGs: { month: string; count: number }[]
    topAOGReasons: { reason: string; count: number }[]
    resolutionTimes: { category: string; time: number }[]
  }
}

// Mock detailed AOG data
const detailedAOGData = [
  {
    id: 1,
    tailNumber: "N12345",
    planeType: "Boeing 737-800",
    avgTime: "3h 45m",
    aogDeclared: "2024-03-15 08:30 AM",
    location: "LAX",
    groundTime: "4h 15m",
    impact: "2 Flights Cancelled",
    status: "Resolved",
    reason: "Engine Failure"
  },
  {
    id: 2,
    tailNumber: "N67890",
    planeType: "Boeing 737-900",
    avgTime: "2h 30m",
    aogDeclared: "2024-03-14 02:15 PM",
    location: "DFW",
    groundTime: "3h 00m",
    impact: "1 Flight Delayed",
    status: "Resolved",
    reason: "Hydraulic System"
  },
  {
    id: 3,
    tailNumber: "N11223",
    planeType: "Boeing 737-800",
    avgTime: "5h 15m",
    aogDeclared: "2024-03-13 11:45 AM",
    location: "ORD",
    groundTime: "6h 30m",
    impact: "3 Flights Cancelled",
    status: "Resolved",
    reason: "Landing Gear"
  }
]

export function AOGStatsModal({ isOpen, onClose, airline, stats }: AOGStatsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{airline} - Detailed AOG Statistics</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly AOG Events</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.monthlyAOGs}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top AOG Reasons</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.topAOGReasons} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="reason" type="category" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Resolution Times by Category</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.resolutionTimes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="time" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detailed AOG Events</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tail #</TableHead>
                    <TableHead>Plane Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>AOG Declared</TableHead>
                    <TableHead>Ground Time</TableHead>
                    <TableHead>Avg. Time</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detailedAOGData.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.tailNumber}</TableCell>
                      <TableCell>{event.planeType}</TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell>{event.aogDeclared}</TableCell>
                      <TableCell>{event.groundTime}</TableCell>
                      <TableCell>{event.avgTime}</TableCell>
                      <TableCell>{event.impact}</TableCell>
                      <TableCell>{event.reason}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{event.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

