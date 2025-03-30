
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RevenueChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Revenue</CardTitle>
        <CardDescription>Revenue for the past months</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <div className="h-full flex items-center justify-center bg-muted/20 rounded-md">
          Chart placeholder (recharts would be implemented here)
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
