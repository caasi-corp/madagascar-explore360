
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { userAPI } from '@/lib/api/userAPI'; 
import { resetDB } from '@/lib/store';
import LoginForm from '@/components/auth/LoginForm';
import DemoCredentials from '@/components/auth/DemoCredentials';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [isResetting, setIsResetting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isCheckingUsers, setIsCheckingUsers] = useState(true);
  const navigate = useNavigate();
  const { user, login } = useAuth();

  useEffect(() => {
    // If user is already logged in, redirect them
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user/dashboard');
      }
    }
  }, [user, navigate]);
  
  useEffect(() => {
    const checkUsers = async () => {
      try {
        setIsCheckingUsers(true);
        const users = await userAPI.getAll();
        console.log(`Page de connexion: ${users.length} utilisateurs trouvés dans la base`);
        if (users.length === 0) {
          setLoginError("Aucun utilisateur trouvé dans la base de données. Veuillez réinitialiser la base de données.");
        } else {
          setLoginError(null);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification des utilisateurs:", error);
        setLoginError("Erreur de connexion à la base de données. Veuillez réinitialiser la base de données.");
      } finally {
        setIsCheckingUsers(false);
      }
    };
    
    checkUsers();
  }, []);

  const handleDemoLogin = async (email: string, password: string) => {
    try {
      setLoginError(null);
      const user = await login(email, password);
      
      if (user) {
        console.log("Utilisateur authentifié:", user);
        
        if (user.role === 'admin') {
          toast.success('Bienvenue, Admin !');
          navigate('/admin');
        } else {
          toast.success('Connexion réussie !');
          navigate('/user/dashboard');
        }
      } else {
        toast.error("Échec de l'authentification. Vérifiez vos informations.");
        setLoginError("Identifiants invalides ou problème de base de données");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setLoginError("Erreur de connexion. Essayez de réinitialiser la base de données.");
    }
  };

  const handleResetDatabase = async () => {
    try {
      setIsResetting(true);
      setLoginError(null);
      toast.info("Réinitialisation de la base de données en cours...");
      
      await resetDB();
      toast.success("Base de données réinitialisée avec succès. Veuillez vous reconnecter.");
      
      // Reload page to reinitialize database
      window.location.reload();
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
          {isCheckingUsers ? (
            <div className="flex justify-center py-4">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-madagascar-green border-r-transparent"></div>
            </div>
          ) : (
            <LoginForm 
              onDemoLogin={handleDemoLogin} 
              loginError={loginError}
            />
          )}
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
