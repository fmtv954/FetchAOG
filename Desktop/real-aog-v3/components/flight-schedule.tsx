"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, Cloud, AlertTriangle, Clock } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface FlightSchedule {
  flightNumber: string
  departure: string
  arrival: string
  departureTime: string
  arrivalTime: string
  status: "On Time" | "Delayed" | "Cancelled" | "Boarding" | "Scheduled"
  weatherImpact: "None" | "Minor" | "Moderate" | "Severe"
  weatherDetails?: string
  delayReason?: string
  delayDuration?: string
}

const flightSchedule: FlightSchedule[] = [
  {
    flightNumber: "AA1234",
    departure: "JFK",
    arrival: "LAX",
    departureTime: "15:30",
    arrivalTime: "18:45",
    status: "Scheduled",
    weatherImpact: "None",
  },
  {
    flightNumber: "AA1456",
    departure: "LAX",
    arrival: "ORD",
    departureTime: "19:15",
    arrivalTime: "01:30",
    status: "Delayed",
    weatherImpact: "Moderate",
    weatherDetails: "Thunderstorms at ORD",
    delayReason: "Weather at destination",
    delayDuration: "45 minutes"
  },
  {
    flightNumber: "AA1789",
    departure: "ORD",
    arrival: "MIA",
    departureTime: "02:15",
    arrivalTime: "06:30",
    status: "Scheduled",
    weatherImpact: "Minor",
    weatherDetails: "Light rain at MIA"
  },
  {
    flightNumber: "AA2034",
    departure: "MIA",
    arrival: "DFW",
    departureTime: "07:45",
    arrivalTime: "09:30",
    status: "Cancelled",
    weatherImpact: "Severe",
    weatherDetails: "Hurricane warning at MIA",
    delayReason: "Severe weather conditions"
  }
]

export function FlightSchedule() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Plane className="h-5 w-5" />
            <CardTitle>Today's Flight Schedule (N12345)</CardTitle>
          </div>
          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>All times in local</span>
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Times shown in destination timezone</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Flight</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Arrival</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Weather</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flightSchedule.map((flight) => (
              <TableRow key={flight.flightNumber}>
                <TableCell className="font-medium">{flight.flightNumber}</TableCell>
                <TableCell>{flight.departure} → {flight.arrival}</TableCell>
                <TableCell>{flight.departureTime}</TableCell>
                <TableCell>{flight.arrivalTime}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        flight.status === "On Time" || flight.status === "Scheduled"
                          ? "secondary"
                          : flight.status === "Delayed"
                          ? "warning"
                          : "destructive"
                      }
                    >
                      {flight.status}
                    </Badge>
                    {flight.delayDuration && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{flight.delayDuration}</span>
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{flight.delayReason}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="flex items-center gap-2">
                          {flight.weatherImpact === "None" ? (
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Cloud className="h-3 w-3" />
                              <span>Clear</span>
                            </Badge>
                          ) : (
                            <Badge
                              variant={
                                flight.weatherImpact === "Minor"
                                  ? "secondary"
                                  : flight.weatherImpact === "Moderate"
                                  ? "warning"
                                  : "destructive"
                              }
                              className="flex items-center gap-1"
                            >
                              <AlertTriangle className="h-3 w-3" />
                              <span>{flight.weatherImpact}</span>
                            </Badge>
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{flight.weatherDetails || "No weather impacts expected"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

