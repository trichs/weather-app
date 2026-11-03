import { WeatherIconProps } from "../../../lib/types";
import { WeatherIcon } from "../WeatherIcon";
import { Cloud, Moon, Rain, Thunderbolt } from "../primitives";

export function Thunderstorm({ className, isNight }: WeatherIconProps) {
  return (
    <WeatherIcon className={className}>
      {isNight && <Moon x={28} y={-22} />}
      <Cloud x={-18} y={-6} />
      <Thunderbolt />
      <Rain x={40} />
    </WeatherIcon>
  );
}
