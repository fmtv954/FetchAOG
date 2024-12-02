'use client'

import React, { useState } from 'react'
import { History, Plane, MapPin, Wrench, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LastAOGEventPopup } from './LastAOGEventPopup'
import { TotalAOGEventsPopup } from './TotalAOGEventsPopup'
import { RecentAOGEventsPopup } from './RecentAOGEventsPopup'
import { AvgResolutionTimePopup } from './AvgResolutionTimePopup'

export default function AOGResults() {
  const [isLastAOGEventOpen, setIsLastAOGEventOpen] = useState(false)
  const [isTotalAOGEventsOpen, setIsTotalAOGEventsOpen] = useState(false)
  const [isRecentAOGEventsOpen, setIsRecentAOGEventsOpen] = useState(false)
  const [isAvgResolutionTimeOpen, setIsAvgResolutionTimeOpen] = useState(false)

  const lastAOGEvent = {
    date: "2023-05-01",
    timeAOGDeclared: "08:30 AM",
    duration: "4h 30m",
    reason: "Hydraulic system failure",
    impact: "2 flights cancelled",
    resolution: "Replaced faulty hydraulic pump"
  }

  const totalAOGEvents = [
    {
      month: "Current Month",
      events: [
        // Only showing events within 120 days
        { date: new Date(Date.now() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], tailNumber: "N13579", reason: "Electrical system issue", duration: "2h 30m", impact: "1 flight delayed" },
        { date: new Date(Date.now() - (45 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], tailNumber: "N24680", reason: "Fuel leak", duration: "3h 45m", impact: "1 flight cancelled" }
      ]
    },
    {
      month: "Previous Month",
      events: [
        { date: new Date(Date.now() - (60 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], tailNumber: "N54321", reason: "Landing gear problem", duration: "4h 15m", impact: "2 flights cancelled" }
      ]
    }
  ]

  // Real-time data retention: 120 days
  const recentAOGEvents = [
    { date: "2023-05-15", timeAOGDeclared: "08:30 AM", reason: "Hydraulic system failure", duration: "4h 15m", impact: "2 flights cancelled" },
    { date: "2023-04-02", timeAOGDeclared: "02:15 PM", reason: "Avionics issue", duration: "3h 30m", impact: "1 flight delayed" },
    { date: "2023-03-10", timeAOGDeclared: "11:45 AM", reason: "Engine malfunction", duration: "5h 45m", impact: "3 flights cancelled" },
  ]

  const avgResolutionTimeData = [
    { month: "Mar", avgTime: 240 },
    { month: "Apr", avgTime: 195 },
    { month: "May", avgTime: 225 },
  ]

  return (
    <div className="space-y-4">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total AOG Events</p>
              <p className="text-3xl font-bold">15</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Avg. Resolution Time</p>
              <p className="text-3xl font-bold cursor-pointer hover:text-primary" onClick={() => setIsAvgResolutionTimeOpen(true)}>3.2 hours</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Live Plane Location</p>
              <p className="text-3xl font-bold">LAX</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Aircraft Information */}
      <Card className="mb-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Plane className="h-5 w-5" />
              <CardTitle>Aircraft Information</CardTitle>
            </div>
            <Badge variant="outline">Possible AOG</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Aircraft Type</p>
              <p className="font-medium">Boeing 737</p>
              <p className="text-sm text-muted-foreground">5 years old</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">MSN Number</p>
              <p className="font-medium">12345</p>
              <p className="text-sm text-muted-foreground">Manufacturing Serial</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Registration</p>
              <p className="font-medium">N12345</p>
              <p className="text-sm text-muted-foreground">FAA Registry</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Owner</p>
              <p className="font-medium">American Airlines</p>
              <p className="text-sm text-muted-foreground">Primary Operator</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Aircraft Status */}
      <Card className="mb-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <CardTitle>Aircraft Status</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Ground Time</p>
                <p className="text-2xl font-bold">2h 15m</p>
                <p className="text-sm text-muted-foreground">Current Duration</p>
              </div>
              <div className="p-4 bg-muted/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Next Flight</p>
                <p className="text-2xl font-bold">3h 30m</p>
                <p className="text-sm text-muted-foreground">Time Remaining</p>
              </div>
              <div className="p-4 bg-muted/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Current Status</p>
                <Badge variant="destructive" className="text-lg">REAL AOG</Badge>
                <p className="text-sm text-muted-foreground mt-1">Under Investigation</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-4">AOG to Airworthy Timeline</h3>
              <div className="space-y-4 p-4 bg-muted/10 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">AOG Declared</p>
                    <p className="text-sm text-muted-foreground">Initial Report</p>
                  </div>
                  <p className="font-medium">08:30 AM</p>
                </div>
                <div className="w-full bg-primary h-2 rounded" />
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Current Time</p>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                  </div>
                  <p className="font-medium">10:45 AM</p>
                </div>
                <div className="flex justify-between items-center text-muted-foreground">
                  <div>
                    <p className="font-medium">Estimated Airworthy</p>
                    <p className="text-sm">Target Completion</p>
                  </div>
                  <p className="font-medium">12:30 PM</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-medium">Total Estimated Time</p>
                  <p className="font-medium">4h 00m</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AOG Location */}
      <Card className="mb-4">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <CardTitle>AOG Location (Placeholder)</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-muted h-[200px] rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Map Placeholder</p>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Facility */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Wrench className="h-5 w-5" />
            <CardTitle>Maintenance Facility Hangar</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Nearest Facility</p>
              <p>LAX Maintenance Hangar</p>
            </div>
            <Badge variant="outline">2.5 miles</Badge>
          </div>
        </CardContent>
      </Card>

      {/* AOG History */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <History className="h-5 w-5" />
            <CardTitle>AOG History</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground">Last AOG Event</p>
            <div className="flex justify-between items-center mt-1 cursor-pointer hover:bg-muted/50 p-2 rounded-md" onClick={() => setIsLastAOGEventOpen(true)}>
              <p>15 days ago</p>
              <Badge variant="secondary">Resolved</Badge>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total AOG Events</p>
            <div className="flex justify-between items-center mt-1 cursor-pointer hover:bg-muted/50 p-2 rounded-md" onClick={() => setIsTotalAOGEventsOpen(true)}>
              <p>Last 90 days</p>
              <Badge>3 Events</Badge>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Avg. Resolution Time</p>
            <div 
              className="flex justify-between items-center mt-1 cursor-pointer hover:bg-muted/50 p-2 rounded-md" 
              onClick={() => setIsAvgResolutionTimeOpen(true)}
            >
              <p>Last 90 days</p>
              <Badge variant="outline">3h 45m</Badge>
            </div>
          </div>
          <div>
            <p className="font-semibold mb-2">Recent AOG Events</p>
            <ul className="space-y-2 cursor-pointer" onClick={() => setIsRecentAOGEventsOpen(true)}>
              {recentAOGEvents.map((event, index) => (
                <li key={index} className="flex justify-between items-center hover:bg-muted/50 p-2 rounded-md">
                  <span>{event.date} ({event.timeAOGDeclared}): {event.reason}</span>
                  <Badge variant="outline">Resolved</Badge>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Popups */}
      <LastAOGEventPopup
        isOpen={isLastAOGEventOpen}
        onClose={() => setIsLastAOGEventOpen(false)}
        event={lastAOGEvent}
      />

      <TotalAOGEventsPopup
        isOpen={isTotalAOGEventsOpen}
        onClose={() => setIsTotalAOGEventsOpen(false)}
        events={totalAOGEvents}
      />

      <RecentAOGEventsPopup
        isOpen={isRecentAOGEventsOpen}
        onClose={() => setIsRecentAOGEventsOpen(false)}
        events={recentAOGEvents}
      />

      <AvgResolutionTimePopup
        isOpen={isAvgResolutionTimeOpen}
        onClose={() => setIsAvgResolutionTimeOpen(false)}
        data={avgResolutionTimeData}
      />
    </div>
  )
}

