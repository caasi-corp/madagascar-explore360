
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { getDB, resetDB } from '@/lib/db/db';
import { initDBX, migrateToDBX, resetDBX } from '@/lib/dbx';
import { 
  Database, 
  Save, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2, 
  AlertCircle,
  HardDrive,
  Server
} from 'lucide-react';

const DatabaseManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [operationStatus, setOperationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const { toast } = useToast();

  // Initialiser la base de données DBX
  const handleInitDBX = async () => {
    setLoading(true);
    setProgress(30);
    setStatusMessage('Initialisation de la nouvelle base de données DBX...');
    
    try {
      const success = await initDBX();
      
      setProgress(100);
      if (success) {
        setOperationStatus('success');
        setStatusMessage('Base de données DBX initialisée avec succès!');
        toast({
          title: "Succès",
          description: "Base de données DBX initialisée avec succès",
        });
      } else {
        setOperationStatus('error');
        setStatusMessage('Erreur lors de l\'initialisation de la base de données DBX');
        toast({
          title: "Erreur",
          description: "Erreur lors de l'initialisation de la base de données DBX",
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error("Erreur:", err);
      setOperationStatus('error');
      setStatusMessage('Erreur lors de l\'initialisation: ' + (err instanceof Error ? err.message : String(err)));
      toast({
        title: "Erreur",
        description: "Erreur lors de l'initialisation de la base de données DBX",
        variant: "destructive"
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 1000);
    }
  };

  // Migrer toutes les données vers DBX
  const handleMigration = async () => {
    setLoading(true);
    setProgress(10);
    setStatusMessage('Connexion à la base de données IndexedDB...');
    
    try {
      // Connexion à la base de données IndexedDB
      const db = await getDB();
      setProgress(30);
      setStatusMessage('Migration des données vers DBX...');
      
      // Exécuter la migration
      const success = await migrateToDBX(db);
      
      setProgress(100);
      if (success) {
        setOperationStatus('success');
        setStatusMessage('Migration des données vers DBX terminée avec succès!');
        toast({
          title: "Succès",
          description: "Les données ont été migrées avec succès vers DBX",
        });
      } else {
        setOperationStatus('error');
        setStatusMessage('Erreur lors de la migration des données vers DBX');
        toast({
          title: "Erreur",
          description: "Erreur lors de la migration des données vers DBX",
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error("Erreur de migration:", err);
      setOperationStatus('error');
      setStatusMessage('Erreur lors de la migration: ' + (err instanceof Error ? err.message : String(err)));
      toast({
        title: "Erreur",
        description: "Erreur lors de la migration des données",
        variant: "destructive"
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 1000);
    }
  };

  // Réinitialiser la base de données IndexedDB
  const handleResetIndexedDB = async () => {
    if (!confirm("Voulez-vous vraiment réinitialiser la base de données IndexedDB ? Toutes les données seront supprimées.")) {
      return;
    }
    
    setLoading(true);
    setProgress(30);
    setStatusMessage('Réinitialisation de la base de données IndexedDB...');
    
    try {
      await resetDB();
      setProgress(100);
      setOperationStatus('success');
      setStatusMessage('Base de données IndexedDB réinitialisée avec succès!');
      toast({
        title: "Succès",
        description: "Base de données IndexedDB réinitialisée avec succès",
      });
    } catch (err) {
      console.error("Erreur lors de la réinitialisation:", err);
      setOperationStatus('error');
      setStatusMessage('Erreur lors de la réinitialisation: ' + (err instanceof Error ? err.message : String(err)));
      toast({
        title: "Erreur",
        description: "Erreur lors de la réinitialisation de la base de données",
        variant: "destructive"
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 1000);
    }
  };

  // Réinitialiser la base de données DBX
  const handleResetDBX = () => {
    if (!confirm("Voulez-vous vraiment réinitialiser la base de données DBX ? Toutes les données seront supprimées.")) {
      return;
    }
    
    setLoading(true);
    setProgress(30);
    setStatusMessage('Réinitialisation de la base de données DBX...');
    
    try {
      const success = resetDBX();
      setProgress(100);
      
      if (success) {
        setOperationStatus('success');
        setStatusMessage('Base de données DBX réinitialisée avec succès!');
        toast({
          title: "Succès",
          description: "Base de données DBX réinitialisée avec succès",
        });
      } else {
        setOperationStatus('error');
        setStatusMessage('Erreur lors de la réinitialisation de la base de données DBX');
        toast({
          title: "Erreur",
          description: "Erreur lors de la réinitialisation de la base de données DBX",
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error("Erreur:", err);
      setOperationStatus('error');
      setStatusMessage('Erreur lors de la réinitialisation: ' + (err instanceof Error ? err.message : String(err)));
      toast({
        title: "Erreur",
        description: "Erreur lors de la réinitialisation de la base de données",
        variant: "destructive"
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 1000);
    }
  };

  const StatusAlert = () => {
    if (operationStatus === 'idle' || !statusMessage) return null;
    
    if (operationStatus === 'success') {
      return (
        <Alert className="mt-4 bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-600">Succès</AlertTitle>
          <AlertDescription className="text-green-700">
            {statusMessage}
          </AlertDescription>
        </Alert>
      );
    }
    
    return (
      <Alert className="mt-4 bg-red-50 border-red-200" variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>
          {statusMessage}
        </AlertDescription>
      </Alert>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Gestion des Bases de Données</h1>

      <Tabs defaultValue="migration" className="w-full">
        <TabsList className="mb-4 grid grid-cols-2">
          <TabsTrigger value="migration">Migration</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="migration">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HardDrive className="mr-2 h-5 w-5" />
                  Base de données IndexedDB
                </CardTitle>
                <CardDescription>
                  Ancienne base de données locale utilisant IndexedDB
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  IndexedDB est une base de données locale qui stocke les données dans le navigateur. 
                  Elle est utilisée pour stocker les données de l'application.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={handleResetIndexedDB} className="w-full" disabled={loading}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Réinitialiser IndexedDB
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="mr-2 h-5 w-5" />
                  Base de données DBX
                </CardTitle>
                <CardDescription>
                  Nouvelle base de données utilisant le système DBX
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  DBX est une solution de stockage locale avancée qui offre de meilleures performances et une meilleure gestion des données.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={handleResetDBX} className="w-full" disabled={loading}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Réinitialiser DBX
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                Migration des données
              </CardTitle>
              <CardDescription>
                Migrer toutes les données d'IndexedDB vers DBX
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Assurez-vous que la base de données IndexedDB est correctement initialisée et contient des données avant de lancer la migration.
                </AlertDescription>
              </Alert>
              
              {loading && (
                <div className="mb-4">
                  <p className="text-sm mb-2">{statusMessage}</p>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
              
              <StatusAlert />
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleInitDBX} className="w-full" disabled={loading}>
                <Database className="mr-2 h-4 w-4" />
                Initialiser DBX
              </Button>
              <Button 
                onClick={handleMigration} 
                className="w-full bg-madagascar-green hover:bg-madagascar-green/80 text-white" 
                disabled={loading}
              >
                <Save className="mr-2 h-4 w-4" />
                Migrer les données vers DBX
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance des bases de données</CardTitle>
              <CardDescription>
                Opérations de maintenance pour assurer la fiabilité des données
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Cette section permet d'effectuer des opérations de maintenance sur les bases de données.
                Vous pouvez réinitialiser les bases de données en cas de problème ou pour repartir de zéro.
              </p>
              
              <Alert className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Attention</AlertTitle>
                <AlertDescription>
                  La réinitialisation d'une base de données supprime définitivement toutes les données qu'elle contient.
                  Assurez-vous de faire une sauvegarde si nécessaire avant de procéder.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="destructive" 
                onClick={handleResetIndexedDB} 
                className="w-full" 
                disabled={loading}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Réinitialiser IndexedDB
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleResetDBX} 
                className="w-full" 
                disabled={loading}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Réinitialiser DBX
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatabaseManagement;
