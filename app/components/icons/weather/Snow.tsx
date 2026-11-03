import { WeatherIconProps } from "../../../lib/types";
import { WeatherIcon } from "../WeatherIcon";
import { Cloud, Moon, Snowflake } from "../primitives";

export function Snow({ className, isNight }: WeatherIconProps) {
  return (
    <WeatherIcon className={className}>
      {isNight && <Moon x={28} y={-22} />}
      <Cloud x={-18} y={-6} />
      <Snowflake />
    </WeatherIcon>
  );
}
