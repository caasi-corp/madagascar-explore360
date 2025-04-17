
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from '@/components/auth/register/RegisterForm';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Trash2 } from 'lucide-react';

const Register = () => {
  const { deleteAllUsers } = useAuth();

  const handleDeleteAllUsers = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer tous les utilisateurs ? Cette action est irréversible.')) {
      await deleteAllUsers?.();
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 pt-24 mt-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Créer un compte</CardTitle>
          <CardDescription>
            Inscrivez-vous pour accéder à toutes les fonctionnalités
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-sm text-center text-muted-foreground">
            Vous avez déjà un compte ?{" "}
            <Link to="/login" className="text-madagascar-green hover:underline">
              Se connecter
            </Link>
          </p>
          
          <div className="w-full border-t pt-4">
            <Button 
              variant="destructive" 
              className="w-full" 
              onClick={handleDeleteAllUsers}
              size="sm"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Supprimer tous les utilisateurs
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Cette action supprime tous les utilisateurs et permet de recommencer à zéro.
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
