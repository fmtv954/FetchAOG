export type AOGStatus = 'REAL AOG' | 'Possible AOG' | 'Normal on Ground' | 'Weather-Related AOG' | 'Not AOG';

interface AOGData {
  groundTime: number; // in minutes
  isWeatherRelated: boolean;
  isAtHub: boolean;
  hasScheduledMaintenance: boolean;
  hasMissedFlight: boolean;
  hasLastMinuteCancellation: boolean;
}

export function determineAOGStatus(data: AOGData): AOGStatus {
  const { groundTime, isWeatherRelated, isAtHub, hasScheduledMaintenance, hasMissedFlight, hasLastMinuteCancellation } = data;

  if (isWeatherRelated && groundTime > 60) {
    return 'Weather-Related AOG';
  }

  if (groundTime >= 240 && isAtHub && !hasScheduledMaintenance) {
    return 'REAL AOG';
  }

  if ((hasMissedFlight || hasLastMinuteCancellation) && groundTime >= 60 && groundTime < 240) {
    return 'Possible AOG';
  }

  if (groundTime < 60 || hasScheduledMaintenance) {
    return 'Normal on Ground';
  }

  return 'Not AOG';
}

