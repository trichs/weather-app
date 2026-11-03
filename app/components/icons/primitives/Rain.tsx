interface RainProps {
  x?: number;
  y?: number;
}

export function Rain({ x = 0, y = 0 }: RainProps) {
  return (
    <g
      transform={`translate(${x}, ${y})`}
      className="fill-none stroke-sky-500"
      strokeLinecap="round"
      strokeWidth="12"
    >
      <path d="M125 292l-12 30" />
      <path d="M192 292l-12 30" />
      <path d="M259 292l-12 30" />
    </g>
  );
}
