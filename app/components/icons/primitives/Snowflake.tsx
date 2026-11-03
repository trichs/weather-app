interface SnowflakeProps {
  x?: number;
  y?: number;
}

export function Snowflake({ x = 0, y = 0 }: SnowflakeProps) {
  return (
    <g
      transform={`translate(${x}, ${y})`}
      className="fill-none stroke-sky-400"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="8"
    >
      <path d="M192 285v55M168 299l24 14 24-14M168 326l24-13 24 13" />
      <path d="M148 309l48 28M149 337l-1-28 25-7M197 337l24-15-1-27" />
      <path d="M236 309l-48 28M235 337l1-28-25-7M187 337l-24-15 1-27" />
    </g>
  );
}
