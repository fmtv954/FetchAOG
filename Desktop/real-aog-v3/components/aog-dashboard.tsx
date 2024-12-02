"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Plane } from 'lucide-react'
import { AOGMap } from "./aog-map"
import { AOGTrends } from "./aog-trends"

// This would come from your API
const mockAOGData = {
  recentEvents: 5,
  lastMonthEvents: 4,
  percentageChange: 20,
  criticalParts: ["PN4567", "PN8901"],
  activeAOGs: [
    {
      tailNumber: "N12345",
      location: "LAX",
      duration: "2d 4h",
      status: "Active",
    },
    {
      tailNumber: "N67890",
      location: "JFK",
      duration: "6h",
      status: "Active",
    },
  ],
}

export function AOGDashboard() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="map">Live Map</TabsTrigger>
        <TabsTrigger value="trends">Trends</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active AOG Events
              </CardTitle>
              <Plane className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAOGData.recentEvents}</div>
              <p className="text-xs text-muted-foreground">
                +{mockAOGData.percentageChange}% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Active AOG Events</CardTitle>
              <CardDescription>
                Currently grounded aircraft and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAOGData.activeAOGs.map((aog) => (
                  <div
                    key={aog.tailNumber}
                    className="flex items-center justify-between space-x-4"
                  >
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-sm font-medium leading-none">
                          {aog.tailNumber}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {aog.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-muted-foreground">
                        Duration: {aog.duration}
                      </div>
                      <div
                        className={
                          "text-sm " +
                          (aog.status === "Active"
                            ? "text-red-500"
                            : "text-green-500")
                        }
                      >
                        {aog.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Critical Parts</CardTitle>
              <CardDescription>
                Parts causing frequent AOG events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAOGData.criticalParts.map((part) => (
                  <Alert key={part}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Critical Part</AlertTitle>
                    <AlertDescription>{part}</AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="map">
        <Card>
          <CardHeader>
            <CardTitle>Live Aircraft Map</CardTitle>
            <CardDescription>
              Real-time location of aircraft with AOG events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AOGMap />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="trends">
        <Card>
          <CardHeader>
            <CardTitle>AOG Trends</CardTitle>
            <CardDescription>
              Historical analysis and predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AOGTrends />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

