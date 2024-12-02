'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AOGSearch } from '@/components/aog-search'
import AOGResults from '../components/AOGResults'
import { AOGDiscovery } from '@/components/aog-discovery'
import { AppProvider, useAppContext } from '../context/AppContext'
import { AOGEventsList } from '@/components/AOGEventsList'
import { AircraftData } from '@/components/AircraftData'
import { DataUploads } from '@/components/data-uploads'
import { TrendsAnalysis } from '@/components/trends-analysis' // Import TrendsAnalysis component
import { Search, BarChart2, Compass, Upload, TrendingUp } from 'lucide-react'

function MainContent() {
  const { currentView } = useAppContext();

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">AOG Event Tracker</h2>
      </div>
      {currentView === 'main' && (
        <Tabs defaultValue="search" className="space-y-4">
          <TabsList>
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              AOG Search
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              Results
            </TabsTrigger>
            <TabsTrigger value="discovery" className="flex items-center gap-2">
              <Compass className="h-4 w-4" />
              Discovery
            </TabsTrigger>
            <TabsTrigger value="uploads" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Data Uploads
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              TRENDS
            </TabsTrigger>
          </TabsList>
          <TabsContent value="search" className="space-y-4">
            <AOGSearch />
          </TabsContent>
          <TabsContent value="results" className="space-y-4">
            <AOGResults />
          </TabsContent>
          <TabsContent value="discovery" className="space-y-4">
            <AOGDiscovery />
          </TabsContent>
          <TabsContent value="uploads" className="space-y-4">
            <DataUploads />
          </TabsContent>
          <TabsContent value="trends" className="space-y-4">
            <TrendsAnalysis />
          </TabsContent>
        </Tabs>
      )}
      {currentView === 'aogEvents' && <AOGEventsList />}
      {currentView === 'aircraftData' && <AircraftData />}
    </div>
  )
}

export default function Home() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  )
}

