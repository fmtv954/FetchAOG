"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { TrendDetailsPopup } from "./trend-details-popup"
import { Plane, BarChart2, MapPin, CloudSnow, Brain, AlertTriangle } from 'lucide-react'

// Expanded trendData array with more detailed dummy data
const trendData = [
{
  id: 1,
  category: "Aircraft Model",
  trend: "Increase in AOG Incidents for Boeing 737 MAX",
  impact: "High",
  recommendation: "Prioritize maintenance for Boeing 737 MAX and review common failure points",
  icon: <Plane className="h-5 w-5 text-blue-500" />,
  details: {
    affectedModels: ["Boeing 737 MAX 8", "Boeing 737 MAX 9"],
    percentageIncrease: 15,
    timeFrame: "Last 6 months",
    commonIssues: ["Engine malfunction", "Sensor failures", "Software glitches"],
    potentialCauses: ["Manufacturing defects", "Inadequate maintenance procedures", "Environmental factors"],
    estimatedCostImpact: "$2.5 million per month",
    recommendedActions: [
      "Increase frequency of software updates",
      "Enhance pilot training programs",
      "Collaborate with Boeing for targeted inspections"
    ],
    dataPoints: 1250,
    confidenceLevel: "95%"
  }
},
{
  id: 2,
  category: "Parts",
  trend: "Part Number PN4567 involved in 30% of AOG incidents",
  impact: "High",
  recommendation: "Reevaluate part quality and increase inventory of PN4567",
  icon: <BarChart2 className="h-5 w-5 text-green-500" />,
  details: {
    partName: "Hydraulic Pump",
    manufacturer: "AeroParts Inc.",
    failureRate: "30% of AOG incidents",
    averageLifespan: "2000 flight hours",
    inventoryStatus: "Critical - Low Stock",
    alternativePartNumbers: ["PN4567A", "PN4568"],
    estimatedReplacementTime: "4 hours",
    supplierLeadTime: "3 weeks",
    costPerUnit: "$12,500",
    annualUsage: 450,
    recommendedStockLevel: 75,
    qualityControlMeasures: [
      "Increased inspection frequency",
      "Supplier audits",
      "In-house testing protocols"
    ],
    dataPoints: 875,
    confidenceLevel: "92%"
  }
},
{
  id: 3,
  category: "Geographical",
  trend: "25% increase in AOG events at LAX",
  impact: "Medium",
  recommendation: "Investigate local maintenance capacity issues at LAX",
  icon: <MapPin className="h-5 w-5 text-red-500" />,
  details: {
    airport: "Los Angeles International Airport (LAX)",
    percentageIncrease: 25,
    timeFrame: "Last quarter",
    affectedAirlines: ["American Airlines", "Delta", "United"],
    commonIssues: ["Ground equipment failures", "Staff shortages", "Weather-related delays"],
    proposedActions: ["Increase maintenance staff", "Upgrade ground equipment", "Improve weather preparedness"],
    averageDelayTime: "3.5 hours",
    estimatedRevenueImpact: "$1.8 million per month",
    localMaintenanceCapacity: "Currently at 85% utilization",
    peakAOGTimes: ["14:00-18:00 local time", "Fridays and Sundays"],
    collaborationOpportunities: [
      "Partner with local technical schools",
      "Implement shared resource program with other airports"
    ],
    dataPoints: 620,
    confidenceLevel: "89%"
  }
},
{
  id: 4,
  category: "Seasonal",
  trend: "18% rise in AOG events during winter months",
  impact: "Medium",
  recommendation: "Prepare for seasonal spikes and allocate resources accordingly",
  icon: <CloudSnow className="h-5 w-5 text-indigo-500" />,
  details: {
    season: "Winter (December-February)",
    percentageIncrease: 18,
    primaryCauses: ["Icing issues", "Cold weather engine starts", "De-icing fluid shortages"],
    mostAffectedRegions: ["Northeast US", "Northern Europe", "Canada"],
    preventiveMeasures: ["Increase de-icing capacity", "Enhance cold weather maintenance procedures", "Stock up on cold weather specific parts"],
    averageTemperatureThreshold: "-5°C (23°F)",
    estimatedAdditionalCosts: "$3.2 million per winter season",
    recommendedStaffingIncrease: "15% during peak winter months",
    criticalInventoryItems: [
      "De-icing fluid",
      "Engine heaters",
      "Hydraulic fluid for low temperatures"
    ],
    trainingPrograms: [
      "Winter operations workshop for ground crew",
      "Pilot refresher on cold weather procedures"
    ],
    dataPoints: 950,
    confidenceLevel: "91%"
  }
},
{
  id: 5,
  category: "Predictive",
  trend: "30% higher AOG risk for aircraft N12345 on JFK to LAX route in summer",
  impact: "High",
  recommendation: "Implement additional inspections for high-risk flights",
  icon: <Brain className="h-5 w-5 text-purple-500" />,
  details: {
    aircraftTailNumber: "N12345",
    aircraftType: "Boeing 787-9",
    route: "JFK to LAX",
    riskIncrease: "30%",
    season: "Summer",
    contributingFactors: ["High temperature operations", "Increased flight frequency", "Historical maintenance patterns"],
    suggestedActions: ["Pre-flight inspections", "Proactive component replacements", "Real-time performance monitoring"],
    predictedFailurePoints: [
      "Air conditioning packs",
      "Hydraulic systems",
      "Avionics cooling"
    ],
    estimatedPreventionSavings: "$450,000 per summer season",
    aiModelUsed: "Deep learning neural network",
    dataSourcesUtilized: [
      "Historical maintenance records",
      "Weather data",
      "Flight telemetry",
      "Manufacturer recommendations"
    ],
    modelAccuracy: "87%",
    updateFrequency: "Daily",
    dataPoints: 1500,
    confidenceLevel: "93%"
  }
},
]

// Updated timeSeriesData array with new metrics
const timeSeriesData = [
{ month: "Jan", aogEvents: 5, maintenanceCosts: 100000, resolutionTime: 36 },
{ month: "Feb", aogEvents: 7, maintenanceCosts: 120000, resolutionTime: 40 },
{ month: "Mar", aogEvents: 3, maintenanceCosts: 90000, resolutionTime: 32 },
{ month: "Apr", aogEvents: 8, maintenanceCosts: 150000, resolutionTime: 44 },
{ month: "May", aogEvents: 6, maintenanceCosts: 110000, resolutionTime: 38 },
{ month: "Jun", aogEvents: 9, maintenanceCosts: 180000, resolutionTime: 48 },
]

export function TrendsAnalysis() {
const [selectedTrend, setSelectedTrend] = useState<string>("aogEvents")
const [selectedTrendDetails, setSelectedTrendDetails] = useState<any>(null)

return (
  <div className="space-y-6">
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
          <AlertTriangle className="h-6 w-6" />
          AI-Powered Trend Analysis
        </CardTitle>
        <CardDescription className="text-blue-600 dark:text-blue-400">
          Insights based on historical and real-time data analyzed by AI and Large Language Models
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-blue-700 dark:text-blue-300">Category</TableHead>
              <TableHead className="text-blue-700 dark:text-blue-300">Trend</TableHead>
              <TableHead className="text-blue-700 dark:text-blue-300">Impact</TableHead>
              <TableHead className="text-blue-700 dark:text-blue-300">Recommendation</TableHead>
              <TableHead className="text-blue-700 dark:text-blue-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trendData.map((trend) => (
              <TableRow key={trend.id} className="hover:bg-blue-100 dark:hover:bg-blue-800">
                <TableCell className="flex items-center gap-2">
                  {trend.icon}
                  {trend.category}
                </TableCell>
                <TableCell>{trend.trend}</TableCell>
                <TableCell>
                  <Badge variant={trend.impact === "High" ? "destructive" : "secondary"}>
                    {trend.impact}
                  </Badge>
                </TableCell>
                <TableCell>{trend.recommendation}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => setSelectedTrendDetails(trend)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <Card className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900 dark:to-teal-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
          <BarChart2 className="h-6 w-6" />
          Trend Visualization
        </CardTitle>
        <CardDescription className="text-green-600 dark:text-green-400">
          Visual representation of key metrics over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select value={selectedTrend} onValueChange={setSelectedTrend}>
            <SelectTrigger className="bg-white dark:bg-gray-800">
              <SelectValue placeholder="Select trend to visualize" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aogEvents">AOG Events</SelectItem>
              <SelectItem value="maintenanceCosts">Maintenance Costs</SelectItem>
              <SelectItem value="resolutionTime">Resolution Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timeSeriesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={selectedTrend}
              stroke="#10B981"
              name={
                selectedTrend === "aogEvents"
                  ? "AOG Events"
                  : selectedTrend === "maintenanceCosts"
                  ? "Maintenance Costs ($)"
                  : "Resolution Time (hours)"
              }
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

    <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
          <Brain className="h-6 w-6" />
          Custom Trend Analysis
        </CardTitle>
        <CardDescription className="text-purple-600 dark:text-purple-400">
          Request specific trend analysis from the AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Input placeholder="Enter your trend analysis query" className="bg-white dark:bg-gray-800" />
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">Analyze</Button>
        </div>
      </CardContent>
    </Card>

    {selectedTrendDetails && (
      <TrendDetailsPopup
        isOpen={!!selectedTrendDetails}
        onClose={() => setSelectedTrendDetails(null)}
        trend={selectedTrendDetails}
      />
    )}
  </div>
)
}

