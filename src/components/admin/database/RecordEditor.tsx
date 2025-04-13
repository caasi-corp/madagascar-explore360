
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { DialogFooter } from '@/components/ui/dialog';
import { Save, X } from 'lucide-react';

interface SchemaField {
  name: string;
  type: string;
  notnull: number;
  pk: number;
}

interface RecordEditorProps {
  record: any;
  schema: SchemaField[];
  onSave: (updatedRecord: any) => void;
  onCancel: () => void;
}

const RecordEditor: React.FC<RecordEditorProps> = ({ record, schema, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...record });
  
  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  // Determine if a field is a primary key and should be readonly
  const isReadOnly = (field: SchemaField) => {
    return field.pk === 1;
  };
  
  // Render appropriate input based on field type
  const renderField = (field: SchemaField) => {
    const { name, type, notnull } = field;
    const value = formData[name] !== null ? formData[name] : '';
    
    // Handle boolean values (stored as INTEGER in SQLite)
    if (
      (name === 'isActive' || name === 'active' || name === 'featured' || name === 'availability') && 
      (type.toLowerCase() === 'integer' || type.toLowerCase() === 'boolean')
    ) {
      return (
        <div className="flex items-center space-x-2">
          <Switch
            id={name}
            checked={!!value}
            onCheckedChange={(checked) => handleChange(name, checked ? 1 : 0)}
            disabled={isReadOnly(field)}
          />
          <Label htmlFor={name}>Actif</Label>
        </div>
      );
    }
    
    // Handle long text fields
    if (type.toLowerCase() === 'text' && (name === 'description' || name.includes('Description'))) {
      return (
        <Textarea
          id={name}
          value={String(value)}
          onChange={(e) => handleChange(name, e.target.value)}
          placeholder={`Entrez ${name}`}
          disabled={isReadOnly(field)}
          rows={4}
          className="resize-y"
        />
      );
    }
    
    // Handle numeric fields
    if (type.toLowerCase() === 'real' || type.toLowerCase() === 'integer' || type.toLowerCase() === 'numeric') {
      return (
        <Input
          id={name}
          type="number"
          value={value}
          onChange={(e) => handleChange(name, e.target.valueAsNumber || 0)}
          placeholder={`Entrez ${name}`}
          disabled={isReadOnly(field)}
        />
      );
    }
    
    // Default text input for other types
    return (
      <Input
        id={name}
        type="text"
        value={String(value)}
        onChange={(e) => handleChange(name, e.target.value)}
        placeholder={`Entrez ${name}`}
        disabled={isReadOnly(field)}
      />
    );
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
        {schema.map((field) => (
          <div key={field.name} className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={field.name} className="text-right">
              {field.name}
              {field.notnull === 1 && <span className="text-red-500">*</span>}
            </Label>
            <div className="col-span-3">
              {renderField(field)}
            </div>
          </div>
        ))}
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" /> Annuler
        </Button>
        <Button type="submit" className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
          <Save className="h-4 w-4 mr-2" /> Enregistrer
        </Button>
      </DialogFooter>
    </form>
  );
};

export default RecordEditor;
