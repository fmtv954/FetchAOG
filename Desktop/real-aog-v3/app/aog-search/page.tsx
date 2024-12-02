import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AOGSearch() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Search for AOG Events</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <label htmlFor="aircraft" className="block text-sm font-medium text-gray-700">Aircraft Type</label>
            <Input type="text" id="aircraft" placeholder="e.g. Boeing 737" />
          </div>
          <div>
            <label htmlFor="msn" className="block text-sm font-medium text-gray-700">MSN Number</label>
            <Input type="text" id="msn" placeholder="e.g. 12345" />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date Range</label>
            <Input type="date" id="date" />
          </div>
          <Button type="submit" className="w-full">Search</Button>
        </form>
      </CardContent>
    </Card>
  )
}

