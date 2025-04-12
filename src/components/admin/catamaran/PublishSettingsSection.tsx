
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PublishSettingsSectionProps {
  isActive: boolean;
  onStatusChange: (value: string) => void;
}

const PublishSettingsSection: React.FC<PublishSettingsSectionProps> = ({
  isActive,
  onStatusChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Paramètres de publication</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Statut</Label>
          <Select
            value={isActive ? "active" : "inactive"}
            onValueChange={onStatusChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Statut de publication" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Actif</SelectItem>
              <SelectItem value="inactive">Inactif</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default PublishSettingsSection;
