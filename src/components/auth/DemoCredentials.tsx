
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from 'lucide-react';

interface DemoCredentialsProps {
  onDemoLogin: (email: string, password: string) => void;
  onResetDatabase: () => void;
  isResetting: boolean;
}

const DemoCredentials: React.FC<DemoCredentialsProps> = ({ 
  onDemoLogin, 
  onResetDatabase, 
  isResetting 
}) => {
  const handleCredentialClick = (email: string, password: string) => {
    onDemoLogin(email, password);
  };

  return (
    <div className="mt-6 p-4 bg-muted/50 rounded-md max-w-md w-full">
      <h3 className="font-medium mb-2 text-center">Identifiants de démonstration</h3>
      <div 
        className="text-sm bg-muted p-2 rounded block mb-2 cursor-pointer hover:bg-muted/70 transition-colors"
        onClick={() => handleCredentialClick('admin@northgascartours.com', 'Admin123!')}
      >
        <p className="text-sm text-muted-foreground mb-1">Connexion administrateur :</p>
        <code className="text-xs block">
          Email: admin@northgascartours.com | Mot de passe: Admin123!
        </code>
      </div>
      <div 
        className="text-sm bg-muted p-2 rounded block mb-4 cursor-pointer hover:bg-muted/70 transition-colors"
        onClick={() => handleCredentialClick('user@northgascartours.com', 'User123!')}
      >
        <p className="text-sm text-muted-foreground mb-1">Connexion utilisateur :</p>
        <code className="text-xs block">
          Email: user@northgascartours.com | Mot de passe: User123!
        </code>
      </div>
      
      <div className="flex justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={onResetDatabase}
          disabled={isResetting}
          className="text-xs"
        >
          {isResetting ? (
            <>
              <RefreshCw className="mr-1 h-3 w-3 animate-spin" /> Réinitialisation...
            </>
          ) : (
            <>
              <RefreshCw className="mr-1 h-3 w-3" /> Réinitialiser la base de données
            </>
          )}
        </Button>
      </div>
      <p className="text-xs text-center mt-2 text-muted-foreground">
        Utilisez ce bouton si vous rencontrez des problèmes de connexion
      </p>
    </div>
  );
};

export default DemoCredentials;
