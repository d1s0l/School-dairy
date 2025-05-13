"use client";

interface PercentageCircleProps {
  percentage: number; 
  size?: number; 
  strokeWidth?: number; 
  showDecimal?: boolean; 
}

export const PercentageCircle = ({ 
  percentage,
  size = 180,
  strokeWidth = 12,
  showDecimal = false
}: PercentageCircleProps) => {
  
  const validatedPercentage = Math.min(Math.max(percentage, 0), 100);
  
  
  const gradientId = "blue-gradient";
  const textColor = "text-blue-600"; 

  
  const formatPercentage = (value: number) => {
    return showDecimal ? value.toFixed(1) : Math.round(value);
  };

 
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (validatedPercentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        height={size}
        width={size}
        className="transform -rotate-90"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" /> {/* blue-500 */}
            <stop offset="100%" stopColor="#93c5fd" /> {/* blue-300 */}
          </linearGradient>
        </defs>

       
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
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      
      
      <span className={`absolute font-medium ${textColor}`}
            style={{ fontSize: size * 0.25 }}>
        {formatPercentage(validatedPercentage)}%
      </span>
    </div>
  );
};