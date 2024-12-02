import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AOGEventsList() {
  const { setCurrentView, setCurrentData } = useAppContext();

  const dummyEvents = [
    { id: 1, aircraft: 'N12345', date: '2023-05-15', duration: '2.5 hours' },
    { id: 2, aircraft: 'N67890', date: '2023-05-18', duration: '4.1 hours' },
    { id: 3, aircraft: 'N54321', date: '2023-05-20', duration: '3.0 hours' },
  ];

  const handleEventClick = (event: any) => {
    setCurrentData(event);
    setCurrentView('aircraftData');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">AOG Events</h2>
      {dummyEvents.map((event) => (
        <Card key={event.id} className="cursor-pointer" onClick={() => handleEventClick(event)}>
          <CardHeader>
            <CardTitle>{event.aircraft}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Date: {event.date}</p>
            <p>Duration: {event.duration}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

