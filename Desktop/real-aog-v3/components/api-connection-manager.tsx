import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ApiConnectionManagerProps {
  type: 'supplier' | 'customer'
}

const supplierApiTypes = [
  'SAP', 'AMOS', 'Ramco', 'IFS MRO', 'Aviator', 'AeroDocs', 'TRAX', 'Skytrack',
  'Xervon', 'Oracle JD Edwards', 'ProMRO', 'AeroParts', 'DHL Aviation', 'Infor M3', 'SITA Airlog'
]
const customerApiTypes = [
  'AMOS', 'Ramco Aviation', 'IFS MRO', 'AeroDocs', 'TRAX Maintenance', 'FlightDocs',
  'Xervon MRO', 'SkyReserve', 'Aviator', 'ProMRO', 'SITA Airlog', 'Infor M3 for Aviation',
  'AeroParts', 'Smart4Aviation', 'Hexaware MRO'
]

export function ApiConnectionManager({ type }: ApiConnectionManagerProps) {
  const [apiType, setApiType] = useState(type === 'supplier' ? 'SAP' : 'AMOS')
  const apiTypes = type === 'supplier' ? supplierApiTypes : customerApiTypes
  const [apiEndpoint, setApiEndpoint] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [autoSync, setAutoSync] = useState(false)
  const [syncInterval, setSyncInterval] = useState(15)
  const [lastSync, setLastSync] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isConnected && autoSync) {
      timer = setInterval(() => {
        simulateDataSync()
      }, syncInterval * 60 * 1000) // Convert minutes to milliseconds
    }
    return () => clearInterval(timer)
  }, [isConnected, autoSync, syncInterval])

  const handleConnect = () => {
    if (apiEndpoint && apiKey) {
      // Simulate API connection
      setIsConnected(true)
      setError(null)
      simulateDataSync()
    } else {
      setError('Please provide both API Endpoint and API Key')
    }
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setLastSync(null)
    setError(null)
  }

  const simulateDataSync = () => {
    // Simulate data synchronization
    setLastSync(new Date().toLocaleString())
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{type === 'supplier' ? 'Supplier' : 'Customer'} API Connection</CardTitle>
        <CardDescription>
          Connect to {apiType} API for automatic data updates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-type">API Type</Label>
          <Select
            value={apiType}
            onValueChange={(value) => setApiType(value)}
            disabled={isConnected}
          >
            <SelectTrigger id="api-type">
              <SelectValue placeholder="Select API type" />
            </SelectTrigger>
            <SelectContent>
              {apiTypes.map((api) => (
                <SelectItem key={api} value={api}>{api}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="api-endpoint">API Endpoint URL</Label>
          <Input
            id="api-endpoint"
            value={apiEndpoint}
            onChange={(e) => setApiEndpoint(e.target.value)}
            placeholder="https://api.example.com/v1"
            disabled={isConnected}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="api-key">API Key</Label>
          <Input
            id="api-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            disabled={isConnected}
          />
        </div>
        {isConnected ? (
          <>
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-sync"
                checked={autoSync}
                onCheckedChange={setAutoSync}
              />
              <Label htmlFor="auto-sync">Enable Auto Sync</Label>
            </div>
            {autoSync && (
              <div className="space-y-2">
                <Label htmlFor="sync-interval">Sync Interval (minutes)</Label>
                <Input
                  id="sync-interval"
                  type="number"
                  value={syncInterval}
                  onChange={(e) => setSyncInterval(parseInt(e.target.value))}
                  min={1}
                />
              </div>
            )}
            <Button onClick={handleDisconnect} variant="destructive">
              Disconnect API
            </Button>
            {lastSync && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Last synchronized: {lastSync}
                </AlertDescription>
              </Alert>
            )}
          </>
        ) : (
          <Button onClick={handleConnect}>Connect API</Button>
        )}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

