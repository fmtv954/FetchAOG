import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function AOGDiscovery() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Current AOG Events</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex items-center justify-between">
              <span>Boeing 737 (N12345)</span>
              <Badge variant="destructive">Critical</Badge>
            </li>
            <li className="flex items-center justify-between">
              <span>Airbus A320 (N67890)</span>
              <Badge variant="warning">Moderate</Badge>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>AOG Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Placeholder for AOG trends chart</p>
          <Button>View Detailed Report</Button>
        </CardContent>
      </Card>
    </div>
  )
}

