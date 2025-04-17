
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface DemoCredentialsProps {
  onDemoLogin: (email: string, password: string) => void;
  onResetDatabase: () => void;
  isResetting: boolean;
}

const DemoCredentials: React.FC<DemoCredentialsProps> = ({ onDemoLogin }) => {
  return (
    <Card className="w-full max-w-md mt-4">
      <CardHeader>
        <CardTitle className="text-lg">Comptes de démonstration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm mb-2">Compte administrateur:</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-between"
            onClick={() => onDemoLogin('admin@northgascartours.com', 'Admin123!')}
          >
            <span>admin@northgascartours.com</span>
            <span className="text-muted-foreground">Admin123!</span>
          </Button>
        </div>
        
        <div>
          <p className="text-sm mb-2">Compte utilisateur:</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-between"
            onClick={() => onDemoLogin('user@northgascartours.com', 'User123!')}
          >
            <span>user@northgascartours.com</span>
            <span className="text-muted-foreground">User123!</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoCredentials;
