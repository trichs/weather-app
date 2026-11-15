import { Suspense } from "react";
import { locations } from "./data/locations";
import type { Location } from "./data/locations";
import { getWeather } from "./actions/actions";
import { getWeatherIcon } from "./lib/weatherIcons";
import { getWeatherDescription } from "./lib/weatherDescriptions";
import { isNightTime } from "./lib/utils";
import { LocationCard } from "./components/LocationCard";

async function WeatherLocationCard({ location }: { location: Location }) {
  const weather = await getWeather(location.lat, location.lon);
  const Icon = getWeatherIcon(weather.current.weatherCode);
  const description = getWeatherDescription(weather.current.weatherCode);
  const isNight = isNightTime(
    weather.current.timezone,
    weather.current.sunrise,
    weather.current.sunset
  );

  return (
    <LocationCard
      slug={location.slug}
      name={location.name}
      description={description}
      temperature={weather.current.temperature}
      timezone={weather.current.timezone}
      Icon={Icon}
      isNight={isNight}
    />
  );
}

function LocationCardSkeleton({ name }: { name: string }) {
  return (
    <div
      className="flex justify-between items-center py-6 px-7 border border-border rounded-2xl bg-background"
      aria-busy="true"
      role="status"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-base font-semibold">{name}</h2>
        <div className="h-5 w-36 animate-pulse rounded bg-muted" />
      </div>
      <div className="flex gap-6 items-center">
        <div className="h-10 w-12 animate-pulse rounded bg-muted" />
        <div className="size-12 animate-pulse rounded-full bg-muted" />
      </div>
      <span className="sr-only">Loading weather for {name}...</span>
    </div>
  );
}

export default function Home() {
  return (
    <div className="max-w-xl mx-auto py-24 px-6">
      <ul className="flex flex-col gap-4">
        {locations.map((location) => (
          <li key={location.slug}>
            <Suspense fallback={<LocationCardSkeleton name={location.name} />}>
              <WeatherLocationCard location={location} />
            </Suspense>
          </li>
        ))}
      </ul>
    </div>
  );
}