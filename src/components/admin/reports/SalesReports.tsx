
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface SalesReportProps {
  salesData: {
    name: string;
    tours: number;
    hotels: number;
    vehicles: number;
    flights: number;
  }[];
  bookingsTypeData: {
    name: string;
    value: number;
  }[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const SalesReports: React.FC<SalesReportProps> = ({ salesData, bookingsTypeData }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ventes par service</CardTitle>
          <CardDescription>Analyse des ventes mensuelles par catégorie de service</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salesData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tours" name="Circuits" fill="#1eaedb" />
                <Bar dataKey="hotels" name="Hôtels" fill="#9b87f5" />
                <Bar dataKey="vehicles" name="Véhicules" fill="#00c49f" />
                <Bar dataKey="flights" name="Vols" fill="#ff8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Répartition des revenus</CardTitle>
            <CardDescription>Distribution des revenus par type de service</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bookingsTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {bookingsTypeData.map((entry, index) => (
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

        <Card>
          <CardHeader>
            <CardTitle>Tendance des ventes</CardTitle>
            <CardDescription>Évolution des revenus totaux sur la période</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={salesData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="tours"
                    stackId="1"
                    stroke="#1eaedb"
                    fill="#1eaedb"
                  />
                  <Area
                    type="monotone"
                    dataKey="hotels"
                    stackId="1"
                    stroke="#9b87f5"
                    fill="#9b87f5"
                  />
                  <Area
                    type="monotone"
                    dataKey="vehicles"
                    stackId="1"
                    stroke="#00c49f"
                    fill="#00c49f"
                  />
                  <Area
                    type="monotone"
                    dataKey="flights"
                    stackId="1"
                    stroke="#ff8042"
                    fill="#ff8042"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesReports;
