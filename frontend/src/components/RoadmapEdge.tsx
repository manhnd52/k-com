type RoadmapEdgeProps = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isActive: boolean;
};

export default function RoadmapEdge({
  startX,
  startY,
  endX,
  endY,
  isActive,
}: RoadmapEdgeProps) {
  const curve = Math.max(25, Math.abs(endY - startY) / 2.5);
  const strokeColor = isActive ? "#0A66C2" : "#CBD5E1";
  const strokeWidth = isActive ? "2.5" : "2";
  const markerEnd = isActive
    ? "url(#roadmap-arrow-active)"
    : "url(#roadmap-arrow)";

  return (
    <path
      d={`M ${startX} ${startY} C ${startX} ${startY + curve}, ${endX} ${endY - curve}, ${endX} ${endY}`}
      fill="none"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeWidth={strokeWidth}
      markerEnd={markerEnd}
      className="transition-all duration-200"
    />
  );
}
