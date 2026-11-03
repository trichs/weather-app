import { WeatherIconProps } from "../../../lib/types";
import { WeatherIcon } from "../WeatherIcon";
import { Cloud, Moon } from "../primitives";

export function Overcast({ className, isNight }: WeatherIconProps) {
  return (
    <WeatherIcon className={className}>
      {isNight && <Moon x={28} y={-22} />}
      <Cloud x={-18} y={18} scale={1.08} />
      <Cloud x={24} y={52} scale={0.76} />
    </WeatherIcon>
  );
}
