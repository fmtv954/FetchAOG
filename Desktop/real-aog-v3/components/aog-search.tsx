import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AOGSearch() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AOG Search</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="tailNumber" className="text-sm font-medium">Aircraft Tail Number</label>
            <Input id="tailNumber" placeholder="Enter tail number" />
          </div>
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">Location Part Needed (3-letter Airport code)</label>
            <Input id="location" placeholder="Enter 3-letter airport code" maxLength={3} />
          </div>
          <div className="space-y-2">
            <label htmlFor="flightDate" className="text-sm font-medium">Date of Flight</label>
            <Input id="flightDate" type="date" />
          </div>
          <Button type="submit" className="w-full">Search</Button>
        </form>
      </CardContent>
    </Card>
  )
}

