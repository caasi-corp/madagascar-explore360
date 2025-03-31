
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  PieChart, 
  Pie,
  Cell, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { TrendingUp, CalendarDays, Car, Building } from 'lucide-react';

interface BookingsReportsProps {
  popularDestinationsData: {
    name: string;
    value: number;
  }[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const BookingsReports: React.FC<BookingsReportsProps> = ({ popularDestinationsData }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Réservations par destination</CardTitle>
          <CardDescription>Les destinations les plus populaires</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={popularDestinationsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {popularDestinationsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Circuits</CardTitle>
            <CardDescription className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
              <span>+15% vs période précédente</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <CalendarDays className="h-10 w-10 text-madagascar-green" />
              <div>
                <div className="text-2xl font-bold">182</div>
                <div className="text-sm text-muted-foreground">Réservations</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Véhicules</CardTitle>
            <CardDescription className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
              <span>+8% vs période précédente</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Car className="h-10 w-10 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">97</div>
                <div className="text-sm text-muted-foreground">Réservations</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Hôtels</CardTitle>
            <CardDescription className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
              <span>+12% vs période précédente</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Building className="h-10 w-10 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">124</div>
                <div className="text-sm text-muted-foreground">Réservations</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingsReports;
