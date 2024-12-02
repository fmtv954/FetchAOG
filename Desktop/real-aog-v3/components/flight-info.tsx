import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MapPin } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

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

export function FlightInfo() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Flight Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Flight Number</TableHead>
                <TableHead>Origin</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Departure Time</TableHead>
                <TableHead>Arrival Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flights.map((flight) => (
                <TableRow key={flight.flightNumber}>
                  <TableCell className="font-medium">{flight.flightNumber}</TableCell>
                  <TableCell>{flight.origin}</TableCell>
                  <TableCell>{flight.destination}</TableCell>
                  <TableCell>{flight.departureTime}</TableCell>
                  <TableCell>{flight.arrivalTime}</TableCell>
                  <TableCell>
                    <Badge
                      variant={flight.status === "On Time" ? "success" : "destructive"}
                    >
                      {flight.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Live Flight Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video rounded-lg border bg-muted/10" />
        </CardContent>
      </Card>
    </div>
  )
}

