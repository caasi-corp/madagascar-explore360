
import React, { useState } from 'react';
import { databaseAPI } from '@/lib/db/databaseAPI';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlayCircle, Download, Copy } from 'lucide-react';

const QueryEditor = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  
  const handleExecute = async () => {
    if (!query.trim()) {
      toast.error("Veuillez entrer une requête SQL");
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      const startTime = performance.now();
      const result = await databaseAPI.executeQuery(query);
      const endTime = performance.now();
      
      setExecutionTime(endTime - startTime);
      
      if (result.error) {
        setError(result.error);
        toast.error("Erreur lors de l'exécution de la requête");
        setResults(null);
      } else if (result.success !== undefined) {
        // This is a non-SELECT query (INSERT, UPDATE, DELETE, etc)
        toast.success("Requête exécutée avec succès");
        setResults([{ message: "Requête exécutée avec succès" }]);
      } else {
        // This is a SELECT query with results
        setResults(result);
        if (result.length === 0) {
          toast.info("La requête n'a retourné aucun résultat");
        } else {
          toast.success(`${result.length} résultat(s) retourné(s)`);
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'exécution de la requête:", error);
      setError((error as Error).message || "Erreur lors de l'exécution de la requête");
      toast.error("Erreur lors de l'exécution de la requête");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopyResults = () => {
    if (!results) return;
    
    try {
      const json = JSON.stringify(results, null, 2);
      navigator.clipboard.writeText(json);
      toast.success("Résultats copiés dans le presse-papier");
    } catch (error) {
      console.error("Erreur lors de la copie des résultats:", error);
      toast.error("Erreur lors de la copie des résultats");
    }
  };
  
  const handleDownloadResults = () => {
    if (!results) return;
    
    try {
      const json = JSON.stringify(results, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'query-results.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success("Résultats téléchargés");
    } catch (error) {
      console.error("Erreur lors du téléchargement des résultats:", error);
      toast.error("Erreur lors du téléchargement des résultats");
    }
  };
  
  const renderResults = () => {
    if (!results) return null;
    
    // Special case for non-SELECT queries
    if (results.length === 1 && results[0].message) {
      return (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-md text-center">
          {results[0].message}
        </div>
      );
    }
    
    if (results.length === 0) {
      return (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md text-center">
          Aucun résultat trouvé
        </div>
      );
    }
    
    // Get all unique keys from all result objects
    const allKeys = Array.from(
      new Set(results.flatMap(obj => Object.keys(obj)))
    );
    
    return (
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {allKeys.map(key => (
                <TableHead key={key}>{key}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {allKeys.map(key => (
                  <TableCell key={key}>
                    {row[key] !== undefined ? String(row[key]) : 'NULL'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Éditeur SQL</CardTitle>
          <CardDescription>
            Écrivez et exécutez des requêtes SQL personnalisées
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SELECT * FROM users LIMIT 10;"
              className="font-mono min-h-[150px] resize-y"
            />
            
            <div className="flex justify-between items-center">
              <Button
                onClick={handleExecute}
                disabled={isLoading}
                className="bg-madagascar-green hover:bg-madagascar-green/80 text-white"
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                {isLoading ? 'Exécution...' : 'Exécuter la requête'}
              </Button>
              
              {executionTime !== null && (
                <span className="text-sm text-muted-foreground">
                  Temps d'exécution: {executionTime.toFixed(2)} ms
                </span>
              )}
            </div>
            
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
                <p className="font-semibold">Erreur SQL:</p>
                <pre className="mt-2 whitespace-pre-wrap text-sm">{error}</pre>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {results && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Résultats de la requête</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={handleCopyResults}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copier
                </Button>
                <Button size="sm" variant="outline" onClick={handleDownloadResults}>
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
              </div>
            </div>
            <CardDescription>
              {results.length} enregistrement(s) trouvé(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderResults()}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QueryEditor;
