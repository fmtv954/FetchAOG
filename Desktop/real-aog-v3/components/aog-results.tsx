'use client'

import React, { useState, useEffect } from 'react'
import { History, Plane, MapPin, Wrench, AlertTriangle, ArrowRight, Check, X, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { LastAOGEventPopup } from './LastAOGEventPopup'
import { TotalAOGEventsPopup } from './TotalAOGEventsPopup'
import { RecentAOGEventsPopup } from './RecentAOGEventsPopup'
import { AvgResolutionTimePopup } from './AvgResolutionTimePopup'
import { FlightSchedule } from './flight-schedule'
import { determineAOGStatus, AOGStatus } from '../utils/aogStatusDetermination'
import { AOGTimeline } from './aog-timeline'
import api from '../utils/api'
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { calculateGroundTime, calculateTimeRemaining, formatDuration } from '../utils/timeCalculations'
import { useSearchParams } from 'next/navigation'
import { getSearchById } from '@/utils/searchHistory'

// Utility function to get a random integer between min and max (inclusive)
const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Simulated function to get AOG history data
const getAOGHistoryData = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const lastEvent = {
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    timeAOGDeclared: '08:30 AM',
    duration: '4h 15m',
    reason: 'Hydraulic System Failure',
    impact: '2 Flights Cancelled',
    resolution: 'Part Replacement',
    status: 'Resolved'
  };

  const totalEvents = [
    { month: 'Sep', events: getRandomInt(1, 5) },
    { month: 'Oct', events: getRandomInt(1, 5) },
    { month: 'Nov', events: getRandomInt(1, 5) },
  ];

  const recentEvents = [
    {
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      timeAOGDeclared: '10:15 AM',
      reason: 'Engine Malfunction',
      duration: '6h 30m',
      impact: '3 Flights Cancelled',
      status: 'Resolved'
    },
    {
      date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      timeAOGDeclared: '02:45 PM',
      reason: 'Landing Gear Issue',
      duration: '3h 45m',
      impact: '1 Flight Delayed',
      status: 'Resolved'
    },
  ];

  const avgResolutionTime = [
    { month: 'Sep', avgTime: getRandomInt(180, 300) },
    { month: 'Oct', avgTime: getRandomInt(180, 300) },
    { month: 'Nov', avgTime: getRandomInt(180, 300) },
  ];

  return { lastEvent, totalEvents, recentEvents, avgResolutionTime };
};

// Simulated function to get AOG timeline data
const getAOGTimelineData = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return [
    { title: 'AOG Declared', subtitle: 'Initial Assessment', time: '08:30 AM', timeLabel: 'Start', status: 'Completed', isCompleted: true },
    { title: 'Part Identified', subtitle: 'Hydraulic Pump', time: '09:45 AM', timeLabel: '+1h 15m', status: 'Completed', isCompleted: true },
    { title: 'Part Sourced', subtitle: 'Local Inventory', time: '11:00 AM', timeLabel: '+2h 30m', status: 'In Progress', isCompleted: false },
    { title: 'Repair Started', subtitle: 'Maintenance Team Assigned', time: '12:30 PM', timeLabel: '+4h', status: 'Pending', isCompleted: false },
    { title: 'Estimated B2S Time', subtitle: 'Subject to Change', time: '02:30 PM', timeLabel: '+6h', status: 'Estimated', isCompleted: false },
  ];
};

// This function simulates storing AOG status change history.
// In a production environment, this data would be stored in a database
// and used for LLM analysis to improve AOG predictions and system behavior.
// Simulated function to store AOG status change
const storeAOGStatusChange = (newStatus: AOGStatus, timestamp: Date) => {
  // In a real implementation, this would store the data in a database
  console.log(`Storing AOG status change: ${newStatus} at ${timestamp.toISOString()}`);
  // This logged data would be used for LLM analysis and system improvements
};

const loadHistoricalData = (searchId: string) => {
  const historicalSearch = getSearchById(searchId);
  if (historicalSearch) {
    // Set the search parameters based on historical data
    // You may need to adjust this based on your actual data structure
    return {
      tailNumber: historicalSearch.tailNumber,
      flightDate: historicalSearch.flightDate,
      location: historicalSearch.location,
      partNumber: historicalSearch.partNumber,
    };
  }
  return null;
};

export default function AOGResults() {
  const [isLastAOGEventOpen, setIsLastAOGEventOpen] = useState(false)
  const [isTotalAOGEventsOpen, setIsTotalAOGEventsOpen] = useState(false)
  const [isRecentAOGEventsOpen, setIsRecentAOGEventsOpen] = useState(false)
  const [isAvgResolutionTimeOpen, setIsAvgResolutionTimeOpen] = useState(false)
  const [aogStatus, setAogStatus] = useState<AOGStatus>('Normal on Ground')
  const [isEditingStatus, setIsEditingStatus] = useState(false)
  const [flightData, setFlightData] = useState<any>(null)
  const [weatherData, setWeatherData] = useState<any>(null)
  const [mapImageUrl, setMapImageUrl] = useState<string>('')
  const [lastAOGEvent, setLastAOGEvent] = useState<any>(null)
  const [totalAOGEvents, setTotalAOGEvents] = useState<any[]>([])
  const [recentAOGEvents, setRecentAOGEvents] = useState<any[]>([])
  const [avgResolutionTimeData, setAvgResolutionTimeData] = useState<any>(null)
  const [timelineEvents, setTimelineEvents] = useState<any[]>([])
  const [aircraftInfo, setAircraftInfo] = useState<any>(null)
  const [aogStats, setAogStats] = useState<any>(null)
  const [flightStats, setFlightStats] = useState<any>(null)
  const [error, setError] = useState<string | null>(null); // Added error state

  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const searchId = searchParams.get('id');
        let historicalData = null;
        if (searchId) {
          historicalData = loadHistoricalData(searchId);
        }

        // Use historical data or default values
        const tailNumber = historicalData?.tailNumber || 'AA1234';
        const flightDate = historicalData?.flightDate || new Date().toISOString().split('T')[0];

        // Fetch flight data
        const flightDataResponse = await api.getFlightData(tailNumber, flightDate);
        setFlightData(flightDataResponse[0]);

        // Fetch weather data based on flight's current location
        if (flightDataResponse[0]?.live) {
          const weatherDataResponse = await api.getWeatherData(
            flightDataResponse[0].live.latitude,
            flightDataResponse[0].live.longitude
          );
          setWeatherData(weatherDataResponse);
        }

        // Generate static map image
        if (flightDataResponse[0]?.live) {
          const mapUrl = await api.getMapboxStaticImage(
            flightDataResponse[0].live.latitude,
            flightDataResponse[0].live.longitude,
            10,
            600,
            400
          );
          setMapImageUrl(mapUrl);
        }

        // Fetch AOG history data
        const aogHistoryData = await getAOGHistoryData();
        setLastAOGEvent(aogHistoryData.lastEvent);
        setTotalAOGEvents(aogHistoryData.totalEvents);
        setRecentAOGEvents(aogHistoryData.recentEvents);
        setAvgResolutionTimeData(aogHistoryData.avgResolutionTime);

        // Fetch AOG timeline data
        const timelineData = await getAOGTimelineData();
        setTimelineEvents(timelineData);

        // Set aircraft info
        setAircraftInfo({
          type: 'Boeing 737',
          age: 5,
          msn: '12345',
          registration: tailNumber,
          owner: 'American Airlines',
        });

        // Set AOG stats
        setAogStats({
          totalRealAOG: getRandomInt(10, 20),
          totalWeatherRelatedAOG: getRandomInt(5, 15),
        });

        // Set flight stats
        setFlightStats({
          estFlightHours: getRandomInt(800, 1200),
          estFlightCycles: getRandomInt(300, 500),
        });

        // Determine AOG status
        const groundTime = calculateGroundTime(flightDataResponse[0]?.arrival?.actual);
        const aogStatusData = {
          groundTime,
          isWeatherRelated: weatherDataResponse?.weather[0]?.main === 'Thunderstorm',
          isAtHub: flightDataResponse[0]?.arrival?.iata === 'DFW', // Assuming DFW is a hub
          hasScheduledMaintenance: false, // This would come from a maintenance schedule API
          hasMissedFlight: false, // This would come from a flight schedule comparison
          hasLastMinuteCancellation: false, // This would come from a cancellation API
          isInFlight: flightDataResponse[0]?.flight_status === 'active',
        };
        const determinedStatus = determineAOGStatus(aogStatusData);
        setAogStatus(determinedStatus);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data. Please try again later.'); // Updated error handling
      }
    }

    fetchData();
  }, [searchParams]);

  const handleStatusChange = (newStatus: AOGStatus) => {
    setAogStatus(newStatus);
    setIsEditingStatus(false);
    // Store the status change for future LLM analysis
    storeAOGStatusChange(newStatus, new Date());
    // Here you would typically send an API request to update the status
    console.log(`Status updated to: ${newStatus}`);
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        Error: {error}
      </div>
    );
  }

  if (!flightData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Data as of: {new Date().toLocaleString()}
          {searchParams.get('id') && " (Historical Data)"}
        </p>
      </div>
      {/* Aircraft Information */}
      <Card className="mb-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Plane className="h-5 w-5" />
              <CardTitle>Aircraft Information</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Aircraft Type</p>
              <p className="font-medium">{aircraftInfo?.type || "N/A"}</p>
              <p className="text-sm text-muted-foreground">{aircraftInfo?.age || "N/A"} years old</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">MSN Number</p>
              <p className="font-medium">{aircraftInfo?.msn || "N/A"}</p>
              <p className="text-sm text-muted-foreground">Manufacturing Serial</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Registration</p>
              <p className="font-medium">{aircraftInfo?.registration || "N/A"}</p>
              <p className="text-sm text-muted-foreground">FAA Registry</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Owner</p>
              <p className="font-medium">{aircraftInfo?.owner || "N/A"}</p>
              <p className="text-sm text-muted-foreground">Primary Operator</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Real AOG Events</p>
              <p className="text-3xl font-bold">{aogStats?.totalRealAOG || "N/A"}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Weather-related AOG Events</p>
              <p className="text-3xl font-bold">{aogStats?.totalWeatherRelatedAOG || "N/A"}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Est Flight Hours</p>
              <p className="text-3xl font-bold">{flightStats?.estFlightHours || "N/A"}</p>
              <p className="text-xs text-muted-foreground">Past 120 days</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Est Flight Cycles</p>
              <p className="text-3xl font-bold">{flightStats?.estFlightCycles || "N/A"}</p>
              <p className="text-xs text-muted-foreground">Past 120 days</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Aircraft Status */}
      <Card className="mb-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <CardTitle>Aircraft Status</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Actual Landing Time</p>
                <p className="text-2xl font-bold">{flightData?.arrival?.actual ? new Date(flightData.arrival.actual).toLocaleTimeString() : "N/A"}</p>
                <p className="text-sm text-muted-foreground">Last Touchdown</p>
              </div>
              <div className="p-4 bg-muted/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Next Flight</p>
                <p className="text-2xl font-bold">{calculateTimeRemaining(flightData?.arrival?.actual, flightData?.departure?.scheduled)}</p>
                <p className="text-sm text-muted-foreground">Time Remaining</p>
              </div>
              <div className="p-4 bg-muted/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Ground Time</p>
                <p className="text-2xl font-bold">{formatDuration(calculateGroundTime(flightData?.arrival?.actual))}</p>
                <p className="text-sm text-muted-foreground">Current Duration</p>
              </div>
              <div className="p-4 bg-muted/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Flight Status</p>
                <p className="text-2xl font-bold">{flightData?.flight_status || "N/A"}</p>
                <p className="text-sm text-muted-foreground">Current Status</p>
              </div>
              <div className="p-4 bg-muted/10 rounded-lg md:col-span-4">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      <h3 className="font-semibold">Current Status</h3>
                    </div>
                    {!isEditingStatus && (
                      <Button variant="outline" size="sm" onClick={() => setIsEditingStatus(true)}>
                        Edit Status
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-col items-center justify-center py-4">
                    {isEditingStatus ? (
                      <Select onValueChange={(value) => handleStatusChange(value as AOGStatus)}>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder={aogStatus} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="REAL AOG">REAL AOG</SelectItem>
                          <SelectItem value="Possible AOG">Possible AOG</SelectItem>
                          <SelectItem value="Normal on Ground">Normal on Ground</SelectItem>
                          <SelectItem value="In Flight">In Flight</SelectItem>
                          <SelectItem value="Weather-Related AOG (Hurricane)">Weather-Related AOG (Hurricane)</SelectItem>
                          <SelectItem value="Weather-Related AOG (Tornado)">Weather-Related AOG (Tornado)</SelectItem>
                          <SelectItem value="Weather-Related AOG (Storm)">Weather-Related AOG (Storm)</SelectItem>
                          <SelectItem value="Weather-Related AOG (Hail)">Weather-Related AOG (Hail)</SelectItem>
                          <SelectItem value="Weather-Related AOG (Low Visibility)">Weather-Related AOG (Low Visibility)</SelectItem>
                          <SelectItem value="Not AOG">Not AOG</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge 
                        className={`text-2xl py-3 px-6 ${
                          aogStatus === 'REAL AOG' || aogStatus.startsWith('Weather-Related AOG') 
                            ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" 
                          : aogStatus === 'Possible AOG'
                            ? "bg-yellow-500 text-yellow-950 hover:bg-yellow-500/90"
                          : aogStatus === 'Normal on Ground'
                            ? "bg-green-500 text-green-950 hover:bg-green-500/90"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {aogStatus || "N/A"}
                      </Badge>
                    )}
                  </div>
                  {isEditingStatus && (
                    <div className="flex justify-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setIsEditingStatus(false)}>
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                      <Button size="sm" onClick={() => handleStatusChange(aogStatus)}>
                        <Check className="mr-2 h-4 w-4" />
                        Confirm
                      </Button>
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground text-center">
                    {aogStatus === 'REAL AOG' ? 'Under Investigation' : 
                     aogStatus.startsWith('Weather-Related AOG') ? `Grounded due to ${aogStatus.split('(')[1].slice(0, -1)}` :
                     aogStatus === 'Possible AOG' ? 'Monitoring Situation' : 
                     'Normal Operations'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-4">AOG - Back to Service Timeline</h3>
              <AOGTimeline 
                events={timelineEvents || []}
                progress={45}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AOG Location and Live Aircraft Location */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <CardTitle>AOG Location</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted h-[400px] rounded-lg relative overflow-hidden">
              {mapImageUrl ? (
                <img 
                  src={mapImageUrl}
                  alt="AOG Location Map" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p>No map data available</p>
                </div>
              )}
              <div className="absolute top-2 left-2 bg-background/80 p-2 rounded-md">
                <p className="font-medium">{flightData?.arrival?.airport || "N/A"}</p>
                <p className="text-sm text-muted-foreground">{flightData?.live?.latitude?.toFixed(4) || "N/A"}, {flightData?.live?.longitude?.toFixed(4) || "N/A"}</p>
              </div>
              <div className="absolute bottom-2 right-2 bg-background/80 p-2 rounded-md">
                <Badge>{aogStatus || "N/A"}</Badge>
              </div>
            </div>
            <div className="space-y-2 p-4 bg-muted/10 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{flightData?.arrival?.airport || "N/A"}</p>
                  <p className="text-sm text-muted-foreground">Reported AOG Location</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm text-muted-foreground">Local Time</p>
                  <p className="font-medium">{flightData?.arrival?.actual ? new Date(flightData.arrival.actual).toLocaleTimeString() : "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ground Time</p>
                  <p className="font-medium">{formatDuration(calculateGroundTime(flightData?.arrival?.actual))}</p>
                </div>
              </div>
              <div className="mt-4 border-t pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Terminal/Gate</p>
                    <p className="font-medium">Terminal: {flightData?.arrival?.terminal || "N/A"}, Gate: {flightData?.arrival?.gate || "N/A"}</p>
                    <p className="text-xs text-muted-foreground">Last reported location</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Weather Conditions</p>
                    <p className="font-medium">{weatherData?.weather?.[0]?.description || "N/A"}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">{weatherData?.main?.temp || "N/A"}°C</p>
                      <span className="text-xs text-muted-foreground">|</span>
                      <p className="text-sm text-muted-foreground">Wind: {weatherData?.wind?.speed || "N/A"} m/s, {weatherData?.wind?.deg || "N/A"}°</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Plane className="h-5 w-5" />
              <CardTitle>Live Aircraft Location</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted h-[400px] rounded-lg relative overflow-hidden">
                {mapImageUrl ? (
                  <img 
                    src={mapImageUrl}
                    alt="Live Aircraft Tracking Map" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p>Loading map...</p>
                  </div>
                )}
                {flightData && (
                  <div className="absolute top-2 left-2 bg-background/80 p-2 rounded-md">
                    <p className="font-medium">Flight {flightData.flight?.iata || "N/A"}</p>
                    <p className="text-sm text-muted-foreground">{flightData.departure?.iata || "N/A"} to {flightData.arrival?.iata || "N/A"}</p>
                  </div>
                )}
                {flightData?.live && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Plane className="h-8 w-8 text-primary animate-pulse" style={{ transform: `rotate(${flightData.live.direction || 0}deg)` }} />
                  </div>
                )}
              </div>
              <div className="space-y-2 p-4 bg-muted/10 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Current Flight: {flightData?.flight?.iata || "N/A"}</p>
                    <p className="text-sm text-muted-foreground">En Route: {flightData?.departure?.iata || "N/A"} to {flightData?.arrival?.iata || "N/A"}</p>
                  </div>
                  <Badge variant="outline">{flightData?.flight_status || "N/A"}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Departure</p>
                    <p className="font-medium">{flightData?.departure?.iata || "N/A"} - {flightData?.departure?.actual ? new Date(flightData.departure.actual).toLocaleTimeString() : "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Arrival</p>
                    <p className="font-medium">{flightData?.arrival?.iata || "N/A"} - {flightData?.arrival?.estimated ? new Date(flightData.arrival.estimated).toLocaleTimeString() : "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">Flight Progress</p>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{flightData?.departure?.iata || "N/A"}</span>
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-1/3 h-full bg-primary rounded-full" />
                    </div>
                    <span className="font-medium">{flightData?.arrival?.iata || "N/A"}</span>
                  </div>
                </div>
                <div className="mt-4 border-t pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Position</p>
                      <p className="font-medium">{flightData?.live?.latitude?.toFixed(2) || "N/A"}°, {flightData?.live?.longitude?.toFixed(2) || "N/A"}°</p>
                      <p className="text-xs text-muted-foreground">Altitude: {flightData?.live?.altitude || "N/A"}m, Speed: {flightData?.live?.speed_horizontal || "N/A"}km/h</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Weather Conditions</p>
                      <p className="font-medium">{weatherData?.weather?.[0]?.description || "N/A"}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">{weatherData?.main?.temp || "N/A"}°C</p>
                        <span className="text-xs text-muted-foreground">|</span>
                        <p className="text-sm text-muted-foreground">Wind: {weatherData?.wind?.speed || "N/A"} m/s, {weatherData?.wind?.deg || "N/A"}°</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 border-t pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Departure Terminal/Gate</p>
                      <p className="font-medium">Terminal: {flightData?.departure?.terminal || "N/A"}, Gate: {flightData?.departure?.gate || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Arrival Terminal/Gate</p>
                      <p className="font-medium">Terminal: {flightData?.arrival?.terminal || "N/A"}, Gate: {flightData?.arrival?.gate || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Flight Schedule */}
      <FlightSchedule flightData={flightData} />

      {/* AOG History */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <History className="h-5 w-5" />
            <CardTitle>AOG History</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground">Last AOG Event</p>
            <div className="flex justify-between items-center mt-1 cursor-pointer hover:bg-muted/50 p-2 rounded-md" onClick={() => setIsLastAOGEventOpen(true)}>
              <p>{lastAOGEvent?.date || "N/A"}</p>
              <Badge variant="secondary">{lastAOGEvent?.status || "N/A"}</Badge>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total AOG Events</p>
            <div className="flex justify-between items-center mt-1 cursor-pointer hover:bg-muted/50 p-2 rounded-md" onClick={() => setIsTotalAOGEventsOpen(true)}>
              <p>Last 90 days</p>
              <Badge>{totalAOGEvents?.length || "N/A"} Events</Badge>
            </div>
          </div>
          <div>
            <p className="text-sm text<continuation_point>
muted-foreground">Recent AOG Events</p>
            <ul className="space-y-2 cursor-pointer" onClick={() => setIsRecentAOGEventsOpen(true)}>
              {(recentAOGEvents || []).map((event, index) => (
                <li key={index} className="flex justify-between items-center hover:bg-muted/50 p-2 rounded-md">
                  <span>{event.date || "N/A"} ({event.timeAOGDeclared || "N/A"}): {event.reason || "N/A"}</span>
                  <Badge variant="outline">{event.status || "N/A"}</Badge>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Average Resolution Time</p>
            <div className="flex justify-between items-center mt-1 cursor-pointer hover:bg-muted/50 p-2 rounded-md" onClick={() => setIsAvgResolutionTimeOpen(true)}>
              <p>Last 90 days</p>
              <Badge>{avgResolutionTimeData?.length || "N/A"} Days</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Popups */}
      <LastAOGEventPopup isOpen={isLastAOGEventOpen} onClose={() => setIsLastAOGEventOpen(false)} event={lastAOGEvent} />
      <TotalAOGEventsPopup isOpen={isTotalAOGEventsOpen} onClose={() => setIsTotalAOGEventsOpen(false)} events={totalAOGEvents} />
      <RecentAOGEventsPopup isOpen={isRecentAOGEventsOpen} onClose={() => setIsRecentAOGEventsOpen(false)} events={recentAOGEvents} />
      <AvgResolutionTimePopup isOpen={isAvgResolutionTimeOpen} onClose={() => setIsAvgResolutionTimeOpen(false)} data={avgResolutionTimeData} />
    </div>
  );
}
    </div>
  );
}

