
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface RobotsTabProps {
  robots: string;
  handleRobotsChange: (value: string) => void;
}

const RobotsTab = ({ robots, handleRobotsChange }: RobotsTabProps) => {
  return (
    <div className="pt-4">
      <Card>
        <CardHeader>
          <CardTitle>Fichier robots.txt</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="robots">Contenu du fichier robots.txt</Label>
            <Textarea
              id="robots"
              value={robots}
              onChange={(e) => handleRobotsChange(e.target.value)}
              rows={10}
              className="font-mono"
            />
            <p className="text-sm text-muted-foreground">
              Ce fichier indique aux moteurs de recherche quelles pages ils peuvent ou ne peuvent pas indexer.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RobotsTab;
