import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AircraftData() {
  const { currentData } = useAppContext();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Aircraft Data</h2>
      <Card>
        <CardHeader>
          <CardTitle>{currentData.aircraft}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Date of AOG: {currentData.date}</p>
          <p>Duration: {currentData.duration}</p>
          <p>Type: Boeing 737</p>
          <p>Last Maintenance: 2023-05-01</p>
        </CardContent>
      </Card>
    </div>
  );
}

