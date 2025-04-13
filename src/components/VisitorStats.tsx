
import React, { useEffect, useState } from 'react';
import { readVisitorDataFromSheet } from '@/lib/api/googleSheetsAPI';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Loader2 } from 'lucide-react';

const VisitorStats = () => {
  const [visitorData, setVisitorData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        setIsLoading(true);
        const data = await readVisitorDataFromSheet();
        setVisitorData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching visitor data:', err);
        setError('Impossible de charger les données de visite.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisitorData();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Statistiques de Visite</CardTitle>
        <CardDescription>
          Données des visites récentes du site North Gasikara Tours
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-madagascar-green" />
            <span className="ml-2">Chargement des données...</span>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">{error}</div>
        ) : visitorData.length === 0 ? (
          <div className="text-center py-4">Aucune donnée de visite disponible.</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Heure</TableHead>
                  <TableHead>Page</TableHead>
                  <TableHead>Détails</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visitorData.map((visit, index) => (
                  <TableRow key={index}>
                    <TableCell>{visit.date || visit[0]}</TableCell>
                    <TableCell>{visit.time || visit[1]}</TableCell>
                    <TableCell>{visit.path || visit[2]}</TableCell>
                    <TableCell>{visit.info || visit[3]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VisitorStats;
