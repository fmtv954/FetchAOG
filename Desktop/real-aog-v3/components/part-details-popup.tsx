import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface AOGEvent {
  eventId: string
  aircraftTailNumber: string
  airline: string
  flightNumber: string
  location: string
  startTime: string
  endTime: string | null
  status: "Active" | "Resolved" | "Pending"
  quantityRequired: number
  priority: "High" | "Medium" | "Low"
}

interface PartDetailsPopupProps {
  isOpen: boolean
  onClose: () => void
  partNumber: string
  partDetails: {
    description: string
    manufacturer: string
    category: string
    aogEvents: AOGEvent[]
  }
}

export function PartDetailsPopup({ isOpen, onClose, partNumber, partDetails }: PartDetailsPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Part Details - {partNumber}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Description</p>
              <p className="text-sm">{partDetails.description}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Manufacturer</p>
              <p className="text-sm">{partDetails.manufacturer}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Category</p>
              <p className="text-sm">{partDetails.category}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Related AOG Events</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event ID</TableHead>
                  <TableHead>Aircraft</TableHead>
                  <TableHead>Airline</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Time AOG Declared</TableHead>
                  <TableHead>Qty Required</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Flight Number</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partDetails.aogEvents.map((event) => (
                  <TableRow key={event.eventId}>
                    <TableCell className="font-medium">{event.eventId}</TableCell>
                    <TableCell>{event.aircraftTailNumber}</TableCell>
                    <TableCell>{event.airline}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>{new Date(event.startTime).toLocaleString()}</TableCell>
                    <TableCell>{event.quantityRequired}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          event.priority === "High" 
                            ? "destructive" 
                            : event.priority === "Medium" 
                              ? "warning" 
                              : "secondary"
                        }
                      >
                        {event.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{event.flightNumber}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          event.status === "Active" 
                            ? "destructive" 
                            : event.status === "Pending" 
                              ? "warning" 
                              : "success"
                        }
                      >
                        {event.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

