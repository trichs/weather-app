import { createElement, Suspense } from "react";
import { notFound } from "next/navigation";
import {
  locations,
  getLocationBySlug,
  type Location,
} from "../data/locations";
import { getWeatherBackground } from "../lib/weatherBackgrounds";
import { getWeather } from "../actions/actions";
import { getWeatherIcon } from "../lib/weatherIcons";
import { getWeatherDescription } from "../lib/weatherDescriptions";
import {
  getCurrentTimeInTimezone,
  formatDate,
  getDayName,
  isNightTime,
} from "../lib/utils";
import { DaysListItem } from "../components/DaysListItem";

export function generateStaticParams() {
  return locations.map((location) => ({
    slug: location.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function WeatherForecast({ location }: { location: Location }) {
  const weather = await getWeather(location.lat, location.lon);
  const todayForecast = weather.daily[0];
  const icon = getWeatherIcon(weather.current.weatherCode);
  const description = getWeatherDescription(weather.current.weatherCode);
  const isNight = isNightTime(
    weather.current.timezone,
    weather.current.sunrise,
    weather.current.sunset
  );
  const background = getWeatherBackground(weather.current.weatherCode, isNight);

  return (
    <div className={`min-h-screen bg-linear-to-b ${background}`}>
      <div className="max-w-xl mx-auto py-24 px-6">
        <div className="flex flex-col gap-16 py-8">
          <header className="flex flex-col gap-8">
            <section className="flex flex-col">
              <h2 className="text-xl font-semibold">{location.name}</h2>
              <p className="text-base text-muted-foreground">
                {formatDate(todayForecast.date)}{" "}
                {getCurrentTimeInTimezone(weather.current.timezone)}
              </p>
            </section>

            <section className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <span className="text-6xl font-light">
                  {weather.current.temperature}°
                </span>
                <p className="text-base text-muted-foreground">
                  {description}
                </p>
              </div>
              {createElement(icon, {
                className: "size-20 text-muted-foreground/70 stroke-1",
                isNight,
              })}
            </section>
          </header>

          <section>
            <h2 className="text-base font-semibold mb-4">7-Day Forecast</h2>
            <ul className="flex flex-col">
              {weather.daily.map((day, index) => {
                const dayIcon = getWeatherIcon(day.weatherCode);
                return (
                  <DaysListItem
                    key={day.date}
                    day={getDayName(day.date, index)}
                    maxTemp={day.maxTemp}
                    minTemp={day.minTemp}
                    Icon={dayIcon}
                  />
                );
              })}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

function WeatherPlaceholder({ name }: { name?: string }) {
  return (
    <div className="min-h-screen bg-linear-to-b from-sky-600 to-blue-400">
      <div className="max-w-xl mx-auto py-24 px-6">
        <div
          className="flex flex-col gap-16 py-8"
          aria-busy="true"
          role="status"
        >
          <span className="sr-only">Loading weather forecast...</span>
          <header className="flex flex-col gap-8">
            <section className="flex flex-col gap-2">
              {name ? (
                <h2 className="text-xl font-semibold">{name}</h2>
              ) : (
                <div className="h-7 w-32 animate-pulse rounded bg-muted" />
              )}
              <div className="h-5 w-48 animate-pulse rounded bg-muted" />
            </section>
            <section className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <div className="h-16 w-28 animate-pulse rounded bg-muted" />
                <div className="h-6 w-36 animate-pulse rounded bg-muted" />
              </div>
              <div className="size-20 animate-pulse rounded-full bg-muted" />
            </section>
          </header>
          <section>
            <h2 className="text-base font-semibold mb-4">7-Day Forecast</h2>
            <ul className="flex flex-col">
              {Array.from({ length: 7 }, (_, index) => (
                <li
                  key={index}
                  className="flex items-center py-4 gap-4 border-t border-border"
                >
                  <div className="h-5 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-5 w-5 animate-pulse rounded-full bg-muted ml-auto" />
                  <div className="h-5 w-16 animate-pulse rounded bg-muted" />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

async function LocationContent({ params }: PageProps) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  return (
    <Suspense fallback={<WeatherPlaceholder name={location.name} />}>
      <WeatherForecast location={location} />
    </Suspense>
  );
}

export default function LocationPage({ params }: PageProps) {
  return (
    <Suspense fallback={<WeatherPlaceholder />}>
      <LocationContent params={params} />
    </Suspense>
  );
}