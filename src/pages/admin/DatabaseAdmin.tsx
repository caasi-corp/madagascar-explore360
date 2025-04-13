
import React, { useState, useEffect } from 'react';
import { databaseAPI } from '@/lib/db/databaseAPI';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TableView from '@/components/admin/database/TableView';
import QueryEditor from '@/components/admin/database/QueryEditor';
import DatabaseStats from '@/components/admin/database/DatabaseStats';
import { Loader2, Database, Table2, PlayCircle, Save } from 'lucide-react';
import { resetDB } from '@/lib/store';

const DatabaseAdmin = () => {
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    const loadTables = async () => {
      try {
        setIsLoading(true);
        const tablesList = await databaseAPI.getTables();
        setTables(tablesList);
        
        if (tablesList.length > 0) {
          setSelectedTable(tablesList[0]);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des tables:", error);
        toast.error("Erreur lors du chargement des tables");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTables();
  }, []);

  const handleResetDatabase = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir réinitialiser la base de données ? Toutes les données seront perdues et remplacées par les données initiales.")) {
      try {
        setIsResetting(true);
        await resetDB();
        toast.success("Base de données réinitialisée avec succès");
        window.location.reload();
      } catch (error) {
        console.error("Erreur lors de la réinitialisation de la base de données:", error);
        toast.error("Erreur lors de la réinitialisation de la base de données");
      } finally {
        setIsResetting(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-madagascar-green mb-2" />
          <p>Chargement de la base de données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Administration de la Base de Données</h1>
          <p className="text-muted-foreground">Visualisez et modifiez les données SQLite</p>
        </div>
        <Button 
          variant="destructive" 
          onClick={handleResetDatabase}
          disabled={isResetting}
        >
          {isResetting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Réinitialiser la base de données
        </Button>
      </div>

      <Tabs defaultValue="tables">
        <TabsList className="mb-4">
          <TabsTrigger value="tables" className="flex items-center">
            <Table2 className="mr-2 h-4 w-4" />
            Tables
          </TabsTrigger>
          <TabsTrigger value="query" className="flex items-center">
            <PlayCircle className="mr-2 h-4 w-4" />
            Requêtes SQL
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center">
            <Database className="mr-2 h-4 w-4" /> 
            Statistiques
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tables">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Tables de la base de données</CardTitle>
                  <CardDescription>Visualisez et modifiez les données des tables</CardDescription>
                </div>
                <Select value={selectedTable} onValueChange={setSelectedTable}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Sélectionner une table" />
                  </SelectTrigger>
                  <SelectContent>
                    {tables.map(table => (
                      <SelectItem key={table} value={table}>{table}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {selectedTable && <TableView tableName={selectedTable} />}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="query">
          <QueryEditor />
        </TabsContent>
        
        <TabsContent value="stats">
          <DatabaseStats />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatabaseAdmin;
