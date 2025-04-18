
import { ReactNode } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  color?: "primary" | "secondary" | "accent" | "success" | "warning" | "destructive";
}

export const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  color = "primary",
}: StatCardProps) => {
  const colorClasses = {
    primary: "text-empatica-primary",
    secondary: "text-empatica-secondary",
    accent: "text-empatica-accent",
    success: "text-empatica-success",
    warning: "text-empatica-warning",
    destructive: "text-destructive",
  };

  const trendColors = {
    up: "text-green-600",
    down: "text-red-600",
    neutral: "text-gray-600",
  };

  const trendIcons = {
    up: "↑",
    down: "↓",
    neutral: "→",
  };

  return (
    <Card className="bg-white hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
          {icon && <div className={colorClasses[color]}>{icon}</div>}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</div>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </CardContent>
      {(trend || trendValue) && (
        <CardFooter className="pt-0">
          <div className="flex items-center text-xs">
            {trend && (
              <span className={`font-medium ${trendColors[trend]}`}>
                {trendIcons[trend]} {trendValue}
              </span>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default StatCard;
