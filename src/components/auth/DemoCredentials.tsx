
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw, User, UserCog } from 'lucide-react';

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
    <div className="mt-6 p-4 bg-muted/50 rounded-md max-w-md w-full border border-muted">
      <h3 className="font-medium mb-3 text-center">Identifiants de démonstration</h3>
      <p className="text-xs text-center text-muted-foreground mb-4">
        Cliquez sur l'un des accès ci-dessous pour vous connecter automatiquement
      </p>
      
      <div className="space-y-3">
        <Button 
          variant="outline"
          className="w-full justify-start text-left"
          onClick={() => handleCredentialClick('admin@northgascartours.com', 'Admin123!')}
        >
          <UserCog className="mr-2 h-4 w-4" />
          <div className="flex flex-col items-start">
            <span className="font-medium">Accès administrateur</span>
            <span className="text-xs text-muted-foreground">
              admin@northgascartours.com / Admin123!
            </span>
          </div>
        </Button>
        
        <Button 
          variant="outline"
          className="w-full justify-start text-left"
          onClick={() => handleCredentialClick('user@northgascartours.com', 'User123!')}
        >
          <User className="mr-2 h-4 w-4" />
          <div className="flex flex-col items-start">
            <span className="font-medium">Accès utilisateur</span>
            <span className="text-xs text-muted-foreground">
              user@northgascartours.com / User123!
            </span>
          </div>
        </Button>
      </div>
      
      <div className="mt-4 pt-3 border-t border-border">
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
    </div>
  );
};

export default DemoCredentials;
