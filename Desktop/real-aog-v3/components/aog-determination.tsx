"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plane, Clock, AlertTriangle, CheckCircle2, History, ArrowRight, MapPin, Wrench } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LastAOGEvents } from "./last-aog-events"
import { TotalAOGEvents } from "./total-aog-events"
import { AvgResolutionTime } from "./avg-resolution-time"
import React from 'react';
import { useAppContext } from '../context/AppContext';

export function AOGDetermination() {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const { setCurrentView, setCurrentData } = useAppContext();
  const groundTime = 135 // 2 hours and 15 minutes in minutes
  const isRealAOG = groundTime >= 240 // 4 hours or more
  const disembarkmentRisk = groundTime >= 180 // 3 hours or more

  const handleDataClick = (dataType: string, data: any) => {
    setCurrentData(data);
    setCurrentView(dataType as 'aogEvents' | 'aircraftData');
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">AOG Determination Results</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total AOG Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold cursor-pointer" onClick={() => handleDataClick('aogEvents', { type: 'total' })}>15</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Resolution Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold cursor-pointer" onClick={() => handleDataClick('aogEvents', { type: 'avgTime' })}>3.2 hours</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Live Plane Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">LAX</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Hangar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Hangar 5</div>
          </CardContent>
        </Card>
      </div>


      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                Boeing 737 (N12345)
              </CardTitle>
              <CardDescription>
                Aircraft Status and Information
              </CardDescription>
            </div>
            <Badge variant={isRealAOG ? "destructive" : "warning"} className="h-6">
              {isRealAOG ? "Real AOG" : "Possible AOG"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Aircraft Type</div>
                <div className="text-2xl">Boeing 737</div>
                <div className="text-sm text-muted-foreground">5 years old</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">MSN Number</div>
                <div className="text-2xl">12345</div>
                <div className="text-sm text-muted-foreground">Manufacturing Serial</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Ground Time</div>
                <div className="text-2xl">2h 15m</div>
                <div className="text-sm text-muted-foreground">Current Duration</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Next Flight</div>
                <div className="text-2xl">3h 30m</div>
                <div className="text-sm text-muted-foreground">Time Remaining</div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>AOG to Airworthy Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>AOG Declared</div>
                    <div className="font-medium">08:30 AM</div>
                  </div>
                  <Progress value={(groundTime / 240) * 100} className="h-2" />
                  <div className="flex items-center justify-between">
                    <div>Current Time</div>
                    <div className="font-medium">10:45 AM</div>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <div>Estimated Airworthy</div>
                    <div>12:30 PM</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>Total Estimated Time</div>
                    <div className="font-medium">4h 00m</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>Disembarkment Risk</div>
                    <Badge variant={disembarkmentRisk ? "destructive" : "secondary"}>
                      {disembarkmentRisk ? "High" : "Low"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>Real AOG Status</div>
                    <Badge variant={isRealAOG ? "destructive" : "secondary"}>
                      {isRealAOG ? "Real AOG" : "Not Real AOG"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-4 w-4" />
                    AOG History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-2 rounded-md">
                          <div className="space-y-1">
                            <div className="text-sm font-medium">Last AOG Event</div>
                            <div className="text-sm text-muted-foreground">15 days ago</div>
                          </div>
                          <Badge>Resolved</Badge>
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Last AOG Events (Last 15 Days)</DialogTitle>
                          <DialogDescription>
                            Detailed information about recent AOG events
                          </DialogDescription>
                        </DialogHeader>
                        <LastAOGEvents />
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-2 rounded-md">
                          <div className="space-y-1">
                            <div className="text-sm font-medium">Total AOG Events</div>
                            <div className="text-sm text-muted-foreground">Last 90 days</div>
                          </div>
                          <Badge variant="secondary">3 Events</Badge>
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Total AOG Events (Last 90 Days)</DialogTitle>
                          <DialogDescription>
                            Overview of all AOG events in the past 90 days
                          </DialogDescription>
                        </DialogHeader>
                        <TotalAOGEvents />
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-2 rounded-md">
                          <div className="space-y-1">
                            <div className="text-sm font-medium">Avg. Resolution Time</div>
                            <div className="text-sm text-muted-foreground">Last 90 days</div>
                          </div>
                          <Badge variant="outline">3h 45m</Badge>
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Average Resolution Time (Last 90 Days)</DialogTitle>
                          <DialogDescription>
                            Detailed breakdown of AOG resolution times
                          </DialogDescription>
                        </DialogHeader>
                        <AvgResolutionTime />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Required Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Contact customer for confirmation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Prepare expedited shipment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Notify passengers of delay</span>
                    </div>
                    {disembarkmentRisk && (
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-bold">Prepare for possible disembarkment</span>
                      </div>
                    )}
                    <Button className="w-full">Mark Actions Complete</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            AOG Location (Placeholder)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">Map Placeholder</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Maintenance Facility Hangar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-sm font-medium">Nearest Facility</div>
                <div className="text-sm text-muted-foreground">LAX Maintenance Hangar</div>
              </div>
              <Badge variant="outline">2.5 miles</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-sm font-medium">Available Technicians</div>
                <div className="text-sm text-muted-foreground">Specialized in Boeing 737</div>
              </div>
              <Badge variant="secondary">3 Technicians</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-sm font-medium">Required Parts in Stock</div>
                <div className="text-sm text-muted-foreground">For current AOG issue</div>
              </div>
              <Badge variant="success">Available</Badge>
            </div>
            <Button className="w-full">Request Maintenance Support</Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="flights">
        <TabsList>
          <TabsTrigger value="flights">Upcoming Flights</TabsTrigger>
          <TabsTrigger value="history">Event History</TabsTrigger>
          <TabsTrigger value="parts">Parts</TabsTrigger>
        </TabsList>
        <TabsContent value="flights">
          <Card>
            <CardContent className="pt-6">
              <Table />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <EventHistory setSelectedEvent={setSelectedEvent} />
        </TabsContent>
        <TabsContent value="parts">
          <PartsInfo />
        </TabsContent>
      </Tabs>

      {selectedEvent && (
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>AOG Event Analytics</DialogTitle>
              <DialogDescription>
                Detailed information about the selected AOG event
              </DialogDescription>
            </DialogHeader>
            <AOGEventAnalytics event={selectedEvent} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function Table() {
  const flights = [
    {
      flightNumber: "AA1234",
      origin: "JFK (New York)",
      destination: "LAX (Los Angeles)",
      departureTime: "2025-05-15 08:00",
      arrivalTime: "2025-05-15 11:30",
      status: "On Time",
    },
    {
      flightNumber: "AA5678",
      origin: "LAX (Los Angeles)",
      destination: "ORD (Chicago)",
      departureTime: "2025-05-15 13:00",
      arrivalTime: "2025-05-15 19:00",
      status: "Delayed",
    },
  ]

  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Flight
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Origin
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Destination
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Departure
            </th>
            <th className="h-12
px-4 text-left align-middle font-medium text-muted-foreground">
              Arrival
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {flights.map((flight) => (
            <tr
              key={flight.flightNumber}
              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
            >
              <td className="p-4 align-middle font-medium">{flight.flightNumber}</td>
              <td className="p-4 align-middle">{flight.origin}</td>
              <td className="p-4 align-middle">{flight.destination}</td>
              <td className="p-4 align-middle">{flight.departureTime}</td>
              <td className="p-4 align-middle">{flight.arrivalTime}</td>
              <td className="p-4 align-middle">
                <Badge
                  variant={flight.status === "On Time" ? "success" : "destructive"}
                >
                  {flight.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function EventHistory({ setSelectedEvent }) {
  const events = [
    {
      id: 1,
      date: "2024-11-10",
      duration: "4h 15m",
      reason: "Hydraulic System Failure",
      impact: "2 Flights Cancelled",
      resolution: "Part Replacement",
    },
    {
      id: 2,
      date: "2024-10-25",
      duration: "6h 30m",
      reason: "Landing Gear Issue",
      impact: "3 Flights Delayed",
      resolution: "Emergency Repair",
    },
  ]

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Date
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Duration
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Reason
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Impact
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Resolution
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <td className="p-4 align-middle">{event.date}</td>
                  <td className="p-4 align-middle">{event.duration}</td>
                  <td className="p-4 align-middle">{event.reason}</td>
                  <td className="p-4 align-middle">{event.impact}</td>
                  <td className="p-4 align-middle">{event.resolution}</td>
                  <td className="p-4 align-middle">
                    <Button variant="outline" size="sm" onClick={() => setSelectedEvent(event)}>
                      View Analytics
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

function PartsInfo() {
  const parts = [
    {
      partNumber: "PN4567",
      description: "Hydraulic Pump",
      category: "Critical",
      stock: "Low",
      lastIncident: "2024-10-15",
    },
    {
      partNumber: "PN8901",
      description: "Fuel Control Unit",
      category: "Critical",
      stock: "Out",
      lastIncident: "2024-11-01",
    },
  ]

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Part Number
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Description
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Category
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Stock
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Last Incident
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {parts.map((part) => (
                <tr
                  key={part.partNumber}
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <td className="p-4 align-middle font-medium">{part.partNumber}</td>
                  <td className="p-4 align-middle">{part.description}</td>
                  <td className="p-4 align-middle">
                    <Badge variant="destructive">{part.category}</Badge>
                  </td>
                  <td className="p-4 align-middle">
                    <Badge variant={part.stock === "Low" ? "warning" : "destructive"}>
                      {part.stock}
                    </Badge>
                  </td>
                  <td className="p-4 align-middle">{part.lastIncident}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

function AOGEventAnalytics({ event }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium">Date</h3>
          <p>{event.date}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium">Duration</h3>
          <p>{event.duration}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium">Reason</h3>
          <p>{event.reason}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium">Impact</h3>
          <p>{event.impact}</p>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium">Resolution</h3>
        <p>{event.resolution}</p>
      </div>
      <div>
        <h3 className="text-sm font-medium">Cost Impact</h3>
        <p>$25,000 (Estimated)</p>
      </div>
      <div>
        <h3 className="text-sm font-medium">Root Cause Analysis</h3>
        <p>Wear and tear on hydraulic components due to extended use without proper maintenance intervals.</p>
      </div>
      <div>
        <h3 className="text-sm font-medium">Preventive Measures</h3>
        <ul className="list-disc pl-5">
          <li>Implement more frequent inspection of hydraulic systems</li>
          <li>Update maintenance schedule to reduce risk of similar failures</li>
          <li>Conduct additional training for maintenance crew on early detection of hydraulic issues</li>
        </ul>
      </div>
    </div>
  )
}

