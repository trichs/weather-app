import { WeatherIconProps } from "../../../lib/types";
import { WeatherIcon } from "../WeatherIcon";
import { Cloud, Moon, Sun } from "../primitives";

export function MainlyClear({ className, isNight }: WeatherIconProps) {
  return (
    <WeatherIcon className={className}>
      {isNight ? <Moon x={30} y={-20} /> : <Sun x={30} y={-20} />}
      <Cloud x={-10} y={45} scale={0.7} />
    </WeatherIcon>
  );
}
