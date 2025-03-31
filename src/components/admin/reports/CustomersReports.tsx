
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Star } from 'lucide-react';

interface CustomersReportsProps {
  customerActivityData: {
    name: string;
    newUsers: number;
    activeUsers: number;
  }[];
}

const CustomersReports: React.FC<CustomersReportsProps> = ({ customerActivityData }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Activité des utilisateurs</CardTitle>
          <CardDescription>Utilisateurs actifs et nouveaux utilisateurs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={customerActivityData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="activeUsers" name="Utilisateurs actifs" stroke="#1eaedb" strokeWidth={2} />
                <Line type="monotone" dataKey="newUsers" name="Nouveaux utilisateurs" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Statistiques clients</CardTitle>
            <CardDescription>Vue d'ensemble des données clients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Total clients</p>
                  <p className="text-sm text-muted-foreground">Tous clients enregistrés</p>
                </div>
                <div className="font-bold text-xl">1,248</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Clients actifs</p>
                  <p className="text-sm text-muted-foreground">Actifs dans les 30 derniers jours</p>
                </div>
                <div className="font-bold text-xl">684</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Taux de conversion</p>
                  <p className="text-sm text-muted-foreground">Visiteurs vers clients</p>
                </div>
                <div className="font-bold text-xl">24.8%</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Valeur moyenne</p>
                  <p className="text-sm text-muted-foreground">Par client</p>
                </div>
                <div className="font-bold text-xl">485€</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <CustomerSatisfactionCard />
      </div>
    </div>
  );
};

const CustomerSatisfactionCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Satisfaction client</CardTitle>
        <CardDescription>Évaluations et avis clients</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-5xl font-bold">4.8/5</div>
            <p className="text-sm text-muted-foreground mt-2">Évaluation moyenne</p>
            <div className="flex justify-center mt-2 text-yellow-500">
              <Star className="h-6 w-6 fill-yellow-500" />
              <Star className="h-6 w-6 fill-yellow-500" />
              <Star className="h-6 w-6 fill-yellow-500" />
              <Star className="h-6 w-6 fill-yellow-500" />
              <Star className="h-6 w-6 fill-yellow-500 opacity-70" />
            </div>
          </div>
          
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <RatingBar 
                key={rating} 
                rating={rating} 
                percentage={rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1} 
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface RatingBarProps {
  rating: number;
  percentage: number;
}

const RatingBar: React.FC<RatingBarProps> = ({ rating, percentage }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <span className="text-sm mr-2">{rating}</span>
        <Star className="h-4 w-4 fill-yellow-500" />
      </div>
      <div className="w-full mx-4 h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="bg-yellow-500 h-full rounded-full" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm">{percentage}%</span>
    </div>
  );
};

export default CustomersReports;
