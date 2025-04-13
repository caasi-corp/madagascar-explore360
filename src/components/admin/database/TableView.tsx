
import React, { useState, useEffect } from 'react';
import { databaseAPI } from '@/lib/db/databaseAPI';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Loader2, Edit, Trash2, Plus, Save } from 'lucide-react';
import RecordEditor from './RecordEditor';

interface TableViewProps {
  tableName: string;
}

const TableView: React.FC<TableViewProps> = ({ tableName }) => {
  const [data, setData] = useState<any[]>([]);
  const [schema, setSchema] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingRecord, setEditingRecord] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Load table data when table name changes
  useEffect(() => {
    const loadTableData = async () => {
      try {
        setIsLoading(true);
        
        // Get table schema first
        const schemaData = await databaseAPI.getTableSchema(tableName);
        setSchema(schemaData);
        
        // Then load the actual data
        const tableData = await databaseAPI.getTableData(tableName);
        setData(tableData);
        
      } catch (error) {
        console.error(`Erreur lors du chargement des données de ${tableName}:`, error);
        toast.error(`Erreur lors du chargement des données de ${tableName}`);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTableData();
  }, [tableName]);
  
  const handleEdit = (record: any) => {
    setEditingRecord(record);
    setIsCreating(false);
    setIsDialogOpen(true);
  };
  
  const handleAdd = () => {
    // Create a new empty record with default values based on schema
    const newRecord = schema.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {} as any);
    
    setEditingRecord(newRecord);
    setIsCreating(true);
    setIsDialogOpen(true);
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer cet enregistrement ?`)) {
      try {
        const success = await databaseAPI.deleteRecord(tableName, id);
        
        if (success) {
          toast.success("Enregistrement supprimé avec succès");
          // Refresh data
          const tableData = await databaseAPI.getTableData(tableName);
          setData(tableData);
        } else {
          toast.error("Erreur lors de la suppression de l'enregistrement");
        }
      } catch (error) {
        console.error(`Erreur lors de la suppression:`, error);
        toast.error("Erreur lors de la suppression");
      }
    }
  };
  
  const handleSave = async (updatedRecord: any) => {
    try {
      let success = false;
      
      if (isCreating) {
        // Insert new record
        success = await databaseAPI.insertRecord(tableName, updatedRecord);
        if (success) {
          toast.success("Nouvel enregistrement créé avec succès");
        }
      } else {
        // Update existing record
        success = await databaseAPI.updateRecord(tableName, updatedRecord.id, updatedRecord);
        if (success) {
          toast.success("Enregistrement mis à jour avec succès");
        }
      }
      
      if (success) {
        // Refresh data
        const tableData = await databaseAPI.getTableData(tableName);
        setData(tableData);
        setIsDialogOpen(false);
      } else {
        toast.error("Erreur lors de la sauvegarde");
      }
    } catch (error) {
      console.error(`Erreur lors de la sauvegarde:`, error);
      toast.error("Erreur lors de la sauvegarde");
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center p-6">
        <Loader2 className="h-6 w-6 animate-spin text-madagascar-green" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">{tableName}</h3>
        <Button onClick={handleAdd} className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
          <Plus className="h-4 w-4 mr-2" /> Ajouter
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {schema.map((column) => (
                <TableHead key={column.name}>{column.name}</TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((record, index) => (
                <TableRow key={index}>
                  {schema.map((column) => (
                    <TableCell key={column.name}>
                      {column.type.toLowerCase().includes('text') && String(record[column.name]).length > 30
                        ? `${String(record[column.name]).substring(0, 30)}...`
                        : String(record[column.name])}
                    </TableCell>
                  ))}
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(record)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(record.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={schema.length + 1} className="text-center">
                  Aucune donnée disponible
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isCreating ? `Ajouter un nouvel enregistrement` : `Modifier l'enregistrement`}
            </DialogTitle>
            <DialogDescription>
              {isCreating 
                ? "Créer un nouvel enregistrement dans la table" 
                : "Modifier les informations de cet enregistrement"}
            </DialogDescription>
          </DialogHeader>
          
          {editingRecord && (
            <RecordEditor 
              record={editingRecord} 
              schema={schema} 
              onSave={handleSave} 
              onCancel={() => setIsDialogOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TableView;
