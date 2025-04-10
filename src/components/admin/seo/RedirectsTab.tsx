
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

interface RedirectType {
  source: string;
  destination: string;
  isPermanent: boolean;
}

interface RedirectsTabProps {
  redirects: RedirectType[];
  newRedirect: RedirectType;
  setNewRedirect: React.Dispatch<React.SetStateAction<RedirectType>>;
  handleAddRedirect: () => void;
  handleRemoveRedirect: (index: number) => void;
}

const RedirectsTab = ({ 
  redirects, 
  newRedirect, 
  setNewRedirect, 
  handleAddRedirect, 
  handleRemoveRedirect 
}: RedirectsTabProps) => {
  return (
    <div className="pt-4">
      <Card>
        <CardHeader>
          <CardTitle>Redirections</CardTitle>
          <CardDescription>
            Configurez les redirections d'URLs pour améliorer l'expérience utilisateur et le SEO
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
              <div className="md:col-span-5 space-y-2">
                <Label htmlFor="redirectSource">URL source</Label>
                <Input
                  id="redirectSource"
                  placeholder="/ancienne-page"
                  value={newRedirect.source}
                  onChange={(e) => setNewRedirect({...newRedirect, source: e.target.value})}
                />
              </div>
              <div className="md:col-span-5 space-y-2">
                <Label htmlFor="redirectDestination">URL destination</Label>
                <Input
                  id="redirectDestination"
                  placeholder="/nouvelle-page"
                  value={newRedirect.destination}
                  onChange={(e) => setNewRedirect({...newRedirect, destination: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 flex items-end">
                <Button className="w-full" onClick={handleAddRedirect}>
                  Ajouter
                </Button>
              </div>
            </div>

            {redirects.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-accent">
                    <tr>
                      <th className="text-left p-2">Source</th>
                      <th className="text-left p-2">Destination</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-right p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {redirects.map((redirect, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-2">{redirect.source}</td>
                        <td className="p-2">{redirect.destination}</td>
                        <td className="p-2">{redirect.isPermanent ? '301 (Permanent)' : '302 (Temporaire)'}</td>
                        <td className="p-2 text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRemoveRedirect(index)}
                          >
                            Supprimer
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-6 border rounded-md">
                <p className="text-muted-foreground">Aucune redirection configurée</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RedirectsTab;
