
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PerformanceReports: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance globale</CardTitle>
        <CardDescription>Mesures de performance clés</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-10">
          <p>Fonctionnalité à venir...</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceReports;
