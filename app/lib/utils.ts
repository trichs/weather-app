function getMinutesSinceMidnight(time: string): number {
  const match = /(?:T)?(\d{2}):(\d{2})/.exec(time);

  if (!match) {
    throw new Error(`Invalid time value: ${time}`);
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (hours > 23 || minutes > 59) {
    throw new Error(`Invalid time value: ${time}`);
  }

  return hours * 60 + minutes;
}

export function isNightTime(
  timezone: string,
  sunrise: string,
  sunset: string
): boolean {
  const currentTime = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: timezone,
  }).format(new Date());

  const currentMinutes = getMinutesSinceMidnight(currentTime);
  const sunriseMinutes = getMinutesSinceMidnight(sunrise);
  const sunsetMinutes = getMinutesSinceMidnight(sunset);

  return currentMinutes < sunriseMinutes || currentMinutes > sunsetMinutes;
}

export function getCurrentTimeInTimezone(timezone: string): string {
  return new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: timezone,
  });
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  });
}

export function getDayName(dateString: string, index: number): string {
  if (index === 0) return "Today";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", { weekday: "long" });
}