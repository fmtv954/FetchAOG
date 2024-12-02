export function calculateGroundTime(landingTime: string | undefined): number {
  if (!landingTime) return 0;
  const landing = new Date(landingTime);
  const now = new Date();
  return Math.floor((now.getTime() - landing.getTime()) / (1000 * 60)); // Return minutes
}

export function calculateTimeRemaining(lastLandingTime: string | undefined, nextDepartureTime: string | undefined): string {
  if (!lastLandingTime || !nextDepartureTime) return "N/A";
  const landing = new Date(lastLandingTime);
  const departure = new Date(nextDepartureTime);
  const remainingTime = departure.getTime() - new Date().getTime();
  if (remainingTime < 0) return "Departed";
  return formatDuration(Math.floor(remainingTime / (1000 * 60))); // Convert to minutes
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

