interface ThunderboltProps {
  x?: number;
  y?: number;
}

export function Thunderbolt({ x = 0, y = 0 }: ThunderboltProps) {
  return (
    <path
      d="M204 272 154 342l38 3-10 43 50-70-38-2z"
      className="fill-amber-400"
      transform={`translate(${x}, ${y})`}
    />
  );
}
