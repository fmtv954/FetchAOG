import React from 'react'
import {
Dialog,
DialogContent,
DialogHeader,
DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TrendDetailsPopupProps {
isOpen: boolean
onClose: () => void
trend: any
}

export function TrendDetailsPopup({ isOpen, onClose, trend }: TrendDetailsPopupProps) {
return (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-blue-700 dark:text-blue-300">
          {trend.icon}
          {trend.category}: {trend.trend}
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900">
          <CardHeader>
            <CardTitle className="text-blue-700 dark:text-blue-300">Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">Impact</h3>
                <Badge variant={trend.impact === "High" ? "destructive" : "secondary"}>
                  {trend.impact}
                </Badge>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">Recommendation</h3>
                <p className="text-blue-600 dark:text-blue-400">{trend.recommendation}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900 dark:to-teal-900">
          <CardHeader>
            <CardTitle className="text-green-700 dark:text-green-300">Detailed Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              {Object.entries(trend.details).map(([key, value]) => (
                <React.Fragment key={key}>
                  <dt className="font-medium text-green-700 dark:text-green-300">{key.charAt(0).toUpperCase() + key.slice(1)}</dt>
                  <dd className="text-green-600 dark:text-green-400">
                    {Array.isArray(value) 
                      ? (value as string[]).join(", ")
                      : typeof value === 'number'
                        ? value.toLocaleString()
                        : value as string
                    }
                  </dd>
                </React.Fragment>
              ))}
            </dl>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900">
          <CardHeader>
            <CardTitle className="text-purple-700 dark:text-purple-300">AI Confidence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-purple-600 dark:text-purple-400">Data Points: {trend.details.dataPoints}</span>
              <span className="text-purple-600 dark:text-purple-400">Confidence Level: {trend.details.confidenceLevel}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </DialogContent>
  </Dialog>
)
}

