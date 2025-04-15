
import React from 'react';
import { Progress } from "@/components/ui/progress";
import type { LucideIcon } from 'lucide-react';
import { getScoreLabel, getScoreColor } from './utils';

interface BusinessClimateIndicatorProps {
  name: string;
  icon: React.ReactNode;
  value: number;
  description: string;
  format: (val: number) => string;
  isScore: boolean;
  inversed?: boolean;
}

const BusinessClimateIndicator = ({
  name,
  icon,
  value,
  description,
  format,
  isScore,
  inversed = false
}: BusinessClimateIndicatorProps) => {
  const displayScore = inversed ? Math.max(0, 100 - (value * 2)) : value;
            
  const scoreColor = inversed 
    ? (value <= 5 ? "bg-green-500" : 
       value <= 10 ? "bg-green-400" :
       value <= 15 ? "bg-blue-500" :
       value <= 30 ? "bg-yellow-500" : "bg-red-500")
    : getScoreColor(value);

  const scoreLabel = inversed
    ? (value <= 5 ? "Excellent" :
       value <= 10 ? "Très bon" :
       value <= 15 ? "Bon" :
       value <= 30 ? "Moyen" : "À améliorer")
    : getScoreLabel(value);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="bg-primary/10 p-2 rounded-full">
          {icon}
        </div>
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">
            {format(value)}
          </span>
          <span className="text-sm text-muted-foreground">
            {scoreLabel}
          </span>
        </div>
        
        <Progress 
          value={displayScore} 
          className={`h-2 ${scoreColor}`}
        />
      </div>
    </div>
  );
};

export default BusinessClimateIndicator;
