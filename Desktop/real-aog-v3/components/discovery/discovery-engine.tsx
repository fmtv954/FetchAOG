"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Brain, AlertTriangle, Database, Workflow } from 'lucide-react'

interface DiscoveryConfig {
  dataSources: {
    name: string
    type: 'API' | 'DATABASE' | 'FILE'
    status: 'ACTIVE' | 'INACTIVE'
    lastSync: string
  }[]
  triggers: {
    name: string
    condition: string
    status: 'ENABLED' | 'DISABLED'
    lastTriggered: string
  }[]
}

export function DiscoveryEngine() {
  const [config, setConfig] = useState<DiscoveryConfig>({
    dataSources: [
      {
        name: 'Maintenance Records API',
        type: 'API',
        status: 'ACTIVE',
        lastSync: new Date().toISOString()
      },
      {
        name: 'Flight Data Database',
        type: 'DATABASE',
        status: 'ACTIVE',
        lastSync: new Date().toISOString()
      }
    ],
    triggers: [
      {
        name: 'High AOG Frequency',
        condition: 'AOG_COUNT > 5 in 24h',
        status: 'ENABLED',
        lastTriggered: new Date().toISOString()
      },
      {
        name: 'Part Shortage Risk',
        condition: 'INVENTORY_LEVEL < 20%',
        status: 'ENABLED',
        lastTriggered: new Date().toISOString()
      }
    ]
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-500" />
            Discovery Engine Configuration
          </CardTitle>
          <CardDescription>
            Configure how the AI discovers and analyzes patterns in your AOG data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sources">
            <TabsList>
              <TabsTrigger value="sources">Data Sources</TabsTrigger>
              <TabsTrigger value="triggers">Discovery Triggers</TabsTrigger>
              <TabsTrigger value="retention">Data Retention</TabsTrigger>
            </TabsList>

            <TabsContent value="sources" className="space-y-4">
              <div className="grid gap-4">
                {config.dataSources.map((source, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Database className="h-4 w-4" />
                            <h4 className="font-medium">{source.name}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Type: {source.type}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant={source.status === 'ACTIVE' ? "success" : "secondary"}>
                            {source.status}
                          </Badge>
                          <Button variant="outline" size="sm">Configure</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button className="w-full">Add Data Source</Button>
              </div>
            </TabsContent>

            <TabsContent value="triggers" className="space-y-4">
              <div className="grid gap-4">
                {config.triggers.map((trigger, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Workflow className="h-4 w-4" />
                            <h4 className="font-medium">{trigger.name}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Condition: {trigger.condition}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={trigger.status === 'ENABLED'}
                              onCheckedChange={() => {
                                const newTriggers = [...config.triggers]
                                newTriggers[index].status = trigger.status === 'ENABLED' ? 'DISABLED' : 'ENABLED'
                                setConfig({ ...config, triggers: newTriggers })
                              }}
                            />
                            <Label>{trigger.status}</Label>
                          </div>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button className="w-full">Add Trigger</Button>
              </div>
            </TabsContent>

            <TabsContent value="retention" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Real-time Data Retention</Label>
                      <div className="flex items-center gap-4 mt-2">
                        <Input type="number" value="120" className="w-24" />
                        <span className="text-muted-foreground">days</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Active data used for immediate analysis and alerts
                      </p>
                    </div>
                    <div>
                      <Label>Discovery Data Retention</Label>
                      <div className="flex items-center gap-4 mt-2">
                        <Input type="number" value="365" className="w-24" />
                        <span className="text-muted-foreground">days</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Historical data used for pattern discovery and trend analysis
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
            Discovery Process
          </CardTitle>
          <CardDescription>
            How the discovery engine processes and analyzes your data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Collection</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Continuous API polling</li>
                    <li>• Database synchronization</li>
                    <li>• Real-time event streaming</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Processing</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Data normalization</li>
                    <li>• Pattern recognition</li>
                    <li>• Anomaly detection</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Trend identification</li>
                    <li>• Correlation analysis</li>
                    <li>• Predictive modeling</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Discovery Methods</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Pattern Recognition</Label>
                  <Select defaultValue="aggressive">
                    <SelectTrigger>
                      <SelectValue placeholder="Select sensitivity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">Conservative</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="aggressive">Aggressive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Analysis Frequency</Label>
                  <Select defaultValue="hourly">
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

