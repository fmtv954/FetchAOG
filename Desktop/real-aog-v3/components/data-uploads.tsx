"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, AlertCircle, Eye } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PartDetailsPopup } from "./part-details-popup"
import { ApiConnectionManager } from "./api-connection-manager"
// import { TrendsAnalysis } from "./trends-analysis" //Removed import

interface FileUploadState {
  file: File | null
  progress: number
  error: string | null
  data: any[] | null
}

export function DataUploads() {
  const [supplierUpload, setSupplierUpload] = useState<FileUploadState>({
    file: null,
    progress: 0,
    error: null,
    data: null,
  })
  const [airlineUpload, setAirlineUpload] = useState<FileUploadState>({
    file: null,
    progress: 0,
    error: null,
    data: null,
  })
  const [selectedPart, setSelectedPart] = useState<string | null>(null)

  const handleFileUpload = async (
    file: File,
    type: "supplier" | "airline",
    setState: React.Dispatch<React.SetStateAction<FileUploadState>>
  ) => {
    if (!file) return

    // Validate file type
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      "text/csv",
    ]
    if (!validTypes.includes(file.type)) {
      setState(prev => ({
        ...prev,
        error: "Invalid file type. Please upload a CSV or Excel file.",
      }))
      return
    }

    // Simulate file upload progress
    setState(prev => ({ ...prev, file, progress: 0, error: null }))
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setState(prev => ({ ...prev, progress: i }))
    }

    // Simulate data processing
    const mockData = type === "supplier" ? [
      {
        id: 1,
        partNumber: "PN4567",
        description: "Hydraulic Pump",
        quantity: 5,
        location: "LAX",
        manufacturer: "AeroParts Inc.",
        price: 1200.00,
        lastOrderDate: "2024-02-15",
        minimumStock: 2,
        category: "Hydraulic System",
      },
      {
        id: 2,
        partNumber: "PN8901",
        description: "Fuel Control Unit",
        quantity: 3,
        location: "JFK",
        manufacturer: "JetComponents Ltd.",
        price: 3500.00,
        lastOrderDate: "2024-01-20",
        minimumStock: 1,
        category: "Fuel System",
      },
    ] : [
      {
        id: 1,
        aircraftTailNumber: "N12345",
        partNumber: "PN4567",
        description: "Hydraulic Pump Replacement",
        maintenanceType: "Unscheduled",
        performedBy: "John Doe",
        date: "2024-03-15",
        flightHours: 3500,
        cyclesCompleted: 2800,
        nextDueDate: "2024-09-15",
        notes: "Replaced due to low pressure issue",
      },
      {
        id: 2,
        aircraftTailNumber: "N67890",
        partNumber: "PN8901",
        description: "Fuel Control Unit Inspection",
        maintenanceType: "Scheduled",
        performedBy: "Jane Smith",
        date: "2024-03-10",
        flightHours: 4200,
        cyclesCompleted: 3100,
        nextDueDate: "2024-06-10",
        notes: "Passed inspection, no issues found",
      },
    ]

    setState(prev => ({
      ...prev,
      progress: 100,
      data: mockData,
    }))
  }

  const dummyInventoryData = [
    { partNumber: "PN4567", quantity: 5, price: 1200.00, location: "LAX", criticalPart: true },
    { partNumber: "PN8901", quantity: 3, price: 3500.00, location: "JFK", criticalPart: true },
    { partNumber: "PN2345", quantity: 10, price: 500.00, location: "ORD", criticalPart: false },
    { partNumber: "PN6789", quantity: 2, price: 8000.00, location: "DFW", criticalPart: true },
    { partNumber: "PN1122", quantity: 15, price: 250.00, location: "SFO", criticalPart: false },
  ]

  const dummyPartsDetails = {
    "PN4567": {
      description: "Hydraulic Pump",
      manufacturer: "AeroParts Inc.",
      category: "Hydraulic System",
      aogEvents: []
    },
    "PN8901": {
      description: "Fuel Control Unit",
      manufacturer: "JetComponents Ltd.",
      category: "Fuel System",
      aogEvents: []
    },
    "PN2345": {
      description: "Landing Gear Strut",
      manufacturer: "LandingTech Corp.",
      category: "Landing Gear",
      aogEvents: []
    },
    "PN6789": {
      description: "Avionics Display Unit",
      manufacturer: "AvionicsPro Systems",
      category: "Avionics",
      aogEvents: []
    },
    "PN1122": {
      description: "Engine Fan Blade",
      manufacturer: "TurboEngine Corp.",
      category: "Engine Components",
      aogEvents: []
    }
  }

  const dummyMaintenanceRecords = [
    {
      id: 1,
      recordNumber: "MR-2024-001",
      aircraftTailNumber: "N12345",
      date: "2024-03-15",
      flightHours: 3500,
      maintenanceType: "Unscheduled",
      description: "Hydraulic Pump Replacement",
      status: "Completed"
    },
    {
      id: 2,
      recordNumber: "MR-2024-002",
      aircraftTailNumber: "N67890",
      date: "2024-03-18",
      flightHours: 4200,
      maintenanceType: "Scheduled",
      description: "Routine Inspection",
      status: "In Progress"
    },
  ]

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="supplier" className="space-y-6">
        <TabsList>
          <TabsTrigger value="supplier">Supplier/Vendor Upload</TabsTrigger>
          <TabsTrigger value="customer">Airline/Operator Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="supplier" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>File Upload</CardTitle>
              <CardDescription>
                Upload CSV or Excel sheets containing inventory data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={e => {
                    const file = e.target.files?.[0]
                    if (file) {
                      handleFileUpload(file, "supplier", setSupplierUpload)
                    }
                  }}
                />
                <Button className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload
                </Button>
              </div>
              {supplierUpload.progress > 0 && supplierUpload.progress < 100 && (
                <Progress value={supplierUpload.progress} className="w-full" />
              )}
              {supplierUpload.error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{supplierUpload.error}</AlertDescription>
                </Alert>
              )}
              {supplierUpload.data && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Part Number</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Manufacturer</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Last Order Date</TableHead>
                      <TableHead>Minimum Stock</TableHead>
                      <TableHead>Category</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {supplierUpload.data.map(item => (
                      <TableRow key={item.id}>
                        <TableCell>{item.partNumber}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell>{item.manufacturer}</TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>{item.lastOrderDate}</TableCell>
                        <TableCell>{item.minimumStock}</TableCell>
                        <TableCell>{item.category}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <ApiConnectionManager type="supplier" />

          <Card>
            <CardHeader>
              <CardTitle>Current Inventory Data</CardTitle>
              <CardDescription>
                Sample inventory data received through API connection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Part Number</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Critical Part</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyInventoryData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.partNumber}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>
                        <Badge variant={item.criticalPart ? "destructive" : "secondary"}>
                          {item.criticalPart ? "Critical" : "Non-critical"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedPart(item.partNumber)}
                          className="flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {selectedPart && (
                <PartDetailsPopup
                  isOpen={!!selectedPart}
                  onClose={() => setSelectedPart(null)}
                  partNumber={selectedPart}
                  partDetails={dummyPartsDetails[selectedPart]}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>


        <TabsContent value="customer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>File Upload</CardTitle>
              <CardDescription>
                Upload CSV or Excel sheets containing maintenance events and flight hours data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={e => {
                    const file = e.target.files?.[0]
                    if (file) {
                      handleFileUpload(file, "airline", setAirlineUpload)
                    }
                  }}
                />
                <Button className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload
                </Button>
              </div>
              {airlineUpload.progress > 0 && airlineUpload.progress < 100 && (
                <Progress value={airlineUpload.progress} className="w-full" />
              )}
              {airlineUpload.error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{airlineUpload.error}</AlertDescription>
                </Alert>
              )}
              {airlineUpload.data && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Aircraft Tail Number</TableHead>
                      <TableHead>Part Number</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Maintenance Type</TableHead>
                      <TableHead>Performed By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Flight Hours</TableHead>
                      <TableHead>Cycles Completed</TableHead>
                      <TableHead>Next Due Date</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {airlineUpload.data.map(item => (
                      <TableRow key={item.id}>
                        <TableCell>{item.aircraftTailNumber}</TableCell>
                        <TableCell>{item.partNumber}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.maintenanceType}</TableCell>
                        <TableCell>{item.performedBy}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.flightHours}</TableCell>
                        <TableCell>{item.cyclesCompleted}</TableCell>
                        <TableCell>{item.nextDueDate}</TableCell>
                        <TableCell>{item.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <ApiConnectionManager type="customer" />

          <Card>
            <CardHeader>
              <CardTitle>Maintenance Records</CardTitle>
              <CardDescription>
                Recent maintenance records with flight hours and maintenance events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Record #</TableHead>
                    <TableHead>Aircraft</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Flight Hours</TableHead>
                    <TableHead>Maintenance Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyMaintenanceRecords.map(record => (
                    <TableRow key={record.id}>
                      <TableCell>{record.recordNumber}</TableCell>
                      <TableCell>{record.aircraftTailNumber}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.flightHours}</TableCell>
                      <TableCell>{record.maintenanceType}</TableCell>
                      <TableCell>{record.description}</TableCell>
                      <TableCell>
                        <Badge variant={record.status === "Completed" ? "success" : "warning"}>
                          {record.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

