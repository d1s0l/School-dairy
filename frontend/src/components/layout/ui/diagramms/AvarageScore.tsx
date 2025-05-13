"use client";

interface ScoreCircleProps {
  score: number; 
  size?: number; 
  strokeWidth?: number; 
  precision?: number; 
}

export const ScoreCircle = ({ 
  score, 
  size =180, 
  strokeWidth = 12,
  precision = 2
}: ScoreCircleProps) => {
  const validatedScore = Math.min(Math.max(score, 1), 5);
  const percentage = (validatedScore / 5) * 100;
  
  const getGradientColor = () => {
    const hue = Math.floor(120 * (validatedScore - 1) / 4); 
    return `hsl(${hue}, 80%, 50%)`;
  };

  
  const getTextColor = () => {
    const hue = Math.floor(120 * (validatedScore - 1) / 4);
    return `hsl(${hue}, 80%, 40%)`;
  };

  
  const formatScore = (value: number) => {
    if (precision === 0) return Math.round(value);
    if (precision === 1) return value % 1 === 0 ? value : value.toFixed(1);
    const rounded = Math.round(value * 100) / 100;
    return rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(2);
  };

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        height={size}
        width={size}
        className="transform -rotate-90"
      >
        
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#e5e7eb"
          strokeOpacity={0.2}
          strokeWidth={strokeWidth}
        />

       
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={getGradientColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      
      
      <span 
        className="absolute font-medium"
        style={{ 
          color: getTextColor(),
          fontSize: size * 0.3 
        }}
      >
        {formatScore(validatedScore)}
      </span>
    </div>
  );
};