import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane } from 'lucide-react'
import { cn } from "@/lib/utils"

const statusItems = [
  {
    label: "Flight Airborne",
    value: "Yes",
    status: "success",
  },
  {
    label: "Next Flight In",
    value: "3h 30m",
    status: "info",
  },
  {
    label: "Flight Delayed",
    value: "No",
    status: "error",
  },
  {
    label: "Real AOG",
    value: "Possible",
    status: "warning",
  },
]

export function AircraftInfo() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5" />
            Aircraft Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Plane Type</div>
              <div className="font-medium">Boeing 737</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Plane Age</div>
              <div className="font-medium">5 years</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">MSN #</div>
              <div className="font-medium">12345</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-4">
        {statusItems.map((item) => (
          <Card key={item.label}>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">{item.label}</div>
              <div
                className={cn("mt-1 font-medium", {
                  "text-green-600": item.status === "success",
                  "text-blue-600": item.status === "info",
                  "text-red-600": item.status === "error",
                  "text-yellow-600": item.status === "warning",
                })}
              >
                {item.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

