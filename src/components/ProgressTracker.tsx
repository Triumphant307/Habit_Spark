type ProgressTrackProps = {
  radius: number;
  stroke: number;
  progress: number;
};

const ProgressTrack: React.FC<ProgressTrackProps> = ({
  radius,
  stroke,
  progress,
}) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg
      width={radius * 2}
      height={radius * 2}
      style={{ display: "block", margin: "0 auto" }}
    >
      <circle
        stroke="#e0e0e0"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#10B981"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset }}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="1.1em"
        fill="var(--text-primary)"
      >
        {progress}%
      </text>
    </svg>
  );
};

export default ProgressTrack;
