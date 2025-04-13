
import React, { useState, useEffect } from 'react';
import { databaseAPI } from '@/lib/db/databaseAPI';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Database, User, Calendar, Car, Map } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';

const DatabaseStats = () => {
  const [stats, setStats] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadStats = async () => {
      try {
        setIsLoading(true);
        const dbStats = await databaseAPI.getDatabaseStats();
        setStats(dbStats);
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadStats();
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex justify-center p-6">
        <Loader2 className="h-6 w-6 animate-spin text-madagascar-green" />
      </div>
    );
  }
  
  // Prepare data for chart
  const chartData = Object.entries(stats).map(([table, count]) => ({
    name: table,
    count
  }));
  
  // Custom colors for each table
  const getTableColor = (tableName: string) => {
    const colors: { [key: string]: string } = {
      users: '#4CAF50',     // Green
      tours: '#2196F3',     // Blue
      vehicles: '#FF9800',  // Orange
      bookings: '#9C27B0',  // Purple
      banners: '#F44336',   // Red
      hotels: '#00BCD4',    // Cyan
      flights: '#FFEB3B',   // Yellow
    };
    
    return colors[tableName] || '#9E9E9E'; // Grey for default
  };
  
  // Get icon for statistic card
  const getTableIcon = (tableName: string) => {
    switch (tableName) {
      case 'users': return <User className="h-8 w-8 text-green-500" />;
      case 'tours': return <Map className="h-8 w-8 text-blue-500" />;
      case 'vehicles': return <Car className="h-8 w-8 text-orange-500" />;
      case 'bookings': return <Calendar className="h-8 w-8 text-purple-500" />;
      default: return <Database className="h-8 w-8 text-gray-500" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(stats).map(([table, count]) => (
          <Card key={table}>
            <CardContent className="flex flex-col items-center justify-center pt-6">
              {getTableIcon(table)}
              <CardTitle className="mt-4 text-2xl font-bold">{count}</CardTitle>
              <CardDescription className="text-center">{table}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Répartition des données</CardTitle>
          <CardDescription>
            Nombre d'enregistrements par table dans la base de données
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                <XAxis 
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={70}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Nombre d'enregistrements">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getTableColor(entry.name)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseStats;
