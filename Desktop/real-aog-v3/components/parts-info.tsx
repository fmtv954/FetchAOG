import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

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

export function PartsInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Parts Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Part Number</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock Status</TableHead>
              <TableHead>Last Incident</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parts.map((part) => (
              <TableRow key={part.partNumber}>
                <TableCell className="font-medium">{part.partNumber}</TableCell>
                <TableCell>{part.description}</TableCell>
                <TableCell>
                  <Badge variant="destructive">{part.category}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={part.stock === "Low" ? "warning" : "destructive"}>
                    {part.stock}
                  </Badge>
                </TableCell>
                <TableCell>{part.lastIncident}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

