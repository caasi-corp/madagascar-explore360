
import React, { KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Plus, X } from 'lucide-react';

interface IncludesExcludesSectionProps {
  includes: string[];
  excludes: string[];
  onAddItem: (field: "includes" | "excludes", value: string) => void;
  onRemoveItem: (field: "includes" | "excludes", index: number) => void;
}

const IncludesExcludesSection: React.FC<IncludesExcludesSectionProps> = ({
  includes,
  excludes,
  onAddItem,
  onRemoveItem
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, field: "includes" | "excludes") => {
    if (e.key === "Enter") {
      const input = e.currentTarget as HTMLInputElement;
      onAddItem(field, input.value);
      input.value = "";
    }
  };

  const handleAddButtonClick = (field: "includes" | "excludes", inputId: string) => {
    const input = document.getElementById(inputId) as HTMLInputElement;
    if (input) {
      onAddItem(field, input.value);
      input.value = "";
    }
  };

  return (
    <>
      <Separator />
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="flex items-center">
            <Plus className="mr-2 h-4 w-4 text-muted-foreground" />
            Inclus
          </Label>
          <div className="space-y-2">
            {includes.map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="flex-1">{item}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onRemoveItem("includes", index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <div className="flex gap-2">
              <Input 
                id="includeItem" 
                placeholder="Ajouter un élément"
                onKeyDown={(e) => handleKeyDown(e, "includes")}
              />
              <Button 
                variant="outline"
                onClick={() => handleAddButtonClick("includes", "includeItem")}
              >
                Ajouter
              </Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="flex items-center">
            <X className="mr-2 h-4 w-4 text-muted-foreground" />
            Non inclus
          </Label>
          <div className="space-y-2">
            {excludes.map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="flex-1">{item}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onRemoveItem("excludes", index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <div className="flex gap-2">
              <Input 
                id="excludeItem" 
                placeholder="Ajouter un élément"
                onKeyDown={(e) => handleKeyDown(e, "excludes")}
              />
              <Button 
                variant="outline"
                onClick={() => handleAddButtonClick("excludes", "excludeItem")}
              >
                Ajouter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IncludesExcludesSection;
