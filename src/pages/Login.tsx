
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { userAPI } from '@/lib/store';
import LoginForm from '@/components/auth/LoginForm';
import DemoCredentials from '@/components/auth/DemoCredentials';

const Login = () => {
  const [isResetting, setIsResetting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  
  useEffect(() => {
    const checkUsers = async () => {
      try {
        const users = await userAPI.getAll();
        console.log(`Page de connexion: ${users.length} utilisateurs trouvés dans la base`);
        if (users.length === 0) {
          setLoginError("Aucun utilisateur trouvé dans la base de données. Veuillez réinitialiser la base de données.");
        }
      } catch (error) {
        console.error("Erreur lors de la vérification des utilisateurs:", error);
      }
    };
    
    checkUsers();
  }, []);

  const handleDemoLogin = (email: string, password: string) => {
    setFormData({
      email,
      password,
      remember: false
    });
    setLoginError(null);
  };

  const handleResetDatabase = async () => {
    try {
      setIsResetting(true);
      setLoginError(null);
      
      // Reset database through Electron API
      if (window.electronAPI && window.electronAPI.resetDatabase) {
        await window.electronAPI.resetDatabase();
        toast.success("Base de données réinitialisée avec succès. Veuillez vous reconnecter.");
        
        const users = await userAPI.getAll();
        console.log(`Après réinitialisation: ${users.length} utilisateurs dans la base`);
        if (users.length > 0) {
          toast.success(`${users.length} utilisateurs ajoutés avec succès`);
        }
      } else {
        setLoginError("La fonction de réinitialisation n'est pas disponible");
        toast.error("Impossible de réinitialiser la base de données");
      }
    } catch (error) {
      console.error("Erreur lors de la réinitialisation de la base de données:", error);
      setLoginError("Erreur lors de la réinitialisation. Veuillez recharger la page.");
      toast.error("Erreur lors de la réinitialisation de la base de données");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 pt-24 mt-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Bienvenue</CardTitle>
          <CardDescription>
            Connectez-vous à votre compte pour continuer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm 
            onDemoLogin={handleDemoLogin} 
            loginError={loginError}
          />
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-sm text-center text-muted-foreground">
            Vous n'avez pas de compte ?{" "}
            <Link to="/register" className="text-madagascar-green hover:underline">
              S'inscrire
            </Link>
          </p>
        </CardFooter>
      </Card>
      
      <DemoCredentials 
        onDemoLogin={handleDemoLogin}
        onResetDatabase={handleResetDatabase}
        isResetting={isResetting}
      />
    </div>
  );
};

export default Login;
