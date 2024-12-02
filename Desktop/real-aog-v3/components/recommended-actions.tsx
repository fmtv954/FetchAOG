import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from 'lucide-react'

const actions = [
  "Contact customer to confirm or downgrade AOG request.",
  "Prepare for potential expedited shipment to LAX (Los Angeles).",
  "Monitor flight status for AA5678 for further delays.",
]

export function RecommendedActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {actions.map((action, index) => (
            <div
              key={index}
              className="flex items-start gap-2 rounded-lg bg-green-50 p-4 text-green-900"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600" />
              <span>{action}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

