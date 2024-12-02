'use client'

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { AOGStatsModal } from './AOGStatsModal'

const chartData = [
  { name: 'American Airlines', activeAOGs: 3 },
  { name: 'United Airlines', activeAOGs: 2 },
  { name: 'Delta Air Lines', activeAOGs: 1 },
  { name: 'Southwest Airlines', activeAOGs: 4 },
]

const tableData = [
  {
    airline: 'American Airlines',
    activeAOGs: 3,
    totalFleet: 865,
    commonPart: 'PN4567',
    resolutionTime: '4h 30m',
    fleetUtilization: '92%',
    realAOG: true,
    disembarkmentRisk: 'high',
  },
  {
    airline: 'United Airlines',
    activeAOGs: 2,
    totalFleet: 790,
    commonPart: 'PN8901',
    resolutionTime: '5h 15m',
    fleetUtilization: '89%',
    realAOG: false,
    disembarkmentRisk: 'high',
  },
  {
    airline: 'Delta Air Lines',
    activeAOGs: 1,
    totalFleet: 850,
    commonPart: 'PN2345',
    resolutionTime: '3h 45m',
    fleetUtilization: '94%',
    realAOG: false,
    disembarkmentRisk: 'low',
  },
  {
    airline: 'Southwest Airlines',
    activeAOGs: 4,
    totalFleet: 735,
    commonPart: 'PN6789',
    resolutionTime: '6h 00m',
    fleetUtilization: '87%',
    realAOG: true,
    disembarkmentRisk: 'high',
  },
]

export function AOGDiscovery() {
  const [selectedAirline, setSelectedAirline] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-muted-foreground">Active AOGs: {payload[0].value}</p>
        </div>
      )
    }
    return null
  }

  const handleRowClick = (airline: string) => {
    setSelectedAirline(airline)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedAirline(null)
  }

  // Mock data for the modal
  const mockStats = {
    monthlyAOGs: [
      { month: 'Jan', count: 5 },
      { month: 'Feb', count: 7 },
      { month: 'Mar', count: 3 },
      { month: 'Apr', count: 8 },
      { month: 'May', count: 6 },
    ],
    topAOGReasons: [
      { reason: 'Engine Failure', count: 12 },
      { reason: 'Hydraulic System', count: 8 },
      { reason: 'Landing Gear', count: 6 },
      { reason: 'Avionics', count: 4 },
    ],
    resolutionTimes: [
      { category: '0-2 hours', time: 15 },
      { category: '2-4 hours', time: 25 },
      { category: '4-6 hours', time: 10 },
      { category: '6+ hours', time: 5 },
    ],
  }

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Industry-wide AOG Trends</h2>
        <Tabs defaultValue="aog-trends">
          <TabsList>
            <TabsTrigger value="aog-trends">AOG Trends</TabsTrigger>
            <TabsTrigger value="fleet-utilization">Fleet Utilization</TabsTrigger>
            <TabsTrigger value="real-aog">Real AOG Status</TabsTrigger>
          </TabsList>
          <TabsContent value="aog-trends" className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="activeAOGs" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="fleet-utilization" className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'American Airlines', utilization: 92 },
                { name: 'United Airlines', utilization: 89 },
                { name: 'Delta Air Lines', utilization: 94 },
                { name: 'Southwest Airlines', utilization: 87 },
              ]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[80, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="utilization" fill="#82ca9d" name="Fleet Utilization %" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="real-aog" className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'American Airlines', verified: 85, unverified: 15 },
                { name: 'United Airlines', verified: 78, unverified: 22 },
                { name: 'Delta Air Lines', verified: 92, unverified: 8 },
                { name: 'Southwest Airlines', verified: 82, unverified: 18 },
              ]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="verified" fill="#4ade80" name="Verified AOG %" stackId="a" />
                <Bar dataKey="unverified" fill="#f87171" name="Unverified AOG %" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Discover AOG Events</h2>
        <p className="text-muted-foreground">Search and analyze AOG events across different airlines</p>
        
        <div className="flex gap-4 max-w-xl">
          <Input placeholder="Search airlines..." />
          <Button>Search</Button>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Airline</TableHead>
                <TableHead>Active AOGs</TableHead>
                <TableHead>Total Fleet</TableHead>
                <TableHead>Most Common Part</TableHead>
                <TableHead>Avg. Resolution Time</TableHead>
                <TableHead>Fleet Utilization</TableHead>
                <TableHead>Real AOG Status</TableHead>
                <TableHead>Disembarkment Risk</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row) => (
                <TableRow 
                  key={row.airline} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(row.airline)}
                >
                  <TableCell>{row.airline}</TableCell>
                  <TableCell>
                    <Badge variant={row.activeAOGs > 2 ? "destructive" : "default"}>
                      {row.activeAOGs}
                    </Badge>
                  </TableCell>
                  <TableCell>{row.totalFleet}</TableCell>
                  <TableCell>{row.commonPart}</TableCell>
                  <TableCell>{row.resolutionTime}</TableCell>
                  <TableCell>{row.fleetUtilization}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={row.realAOG ? "destructive" : "secondary"}
                    >
                      {row.realAOG ? 'Real AOG' : 'Not Real AOG'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={row.disembarkmentRisk === 'high' ? "destructive" : "secondary"}
                    >
                      {row.disembarkmentRisk === 'high' ? 'High Risk' : 'Low Risk'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {selectedAirline && (
        <AOGStatsModal
          isOpen={isModalOpen}
          onClose={closeModal}
          airline={selectedAirline}
          stats={mockStats}
        />
      )}
    </div>
  )
}

