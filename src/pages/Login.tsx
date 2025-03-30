
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { LogIn } from 'lucide-react';
import Layout from '@/components/Layout';
import { userAPI } from '@/lib/store';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prevState => ({
      ...prevState,
      remember: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const user = await userAPI.authenticate(formData.email, formData.password);
      
      if (user) {
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userRole', user.role);
        
        if (user.role === 'admin') {
          toast.success('Bienvenue, Admin !');
          navigate('/admin');
        } else {
          toast.success('Connexion réussie !');
          navigate('/user/dashboard');
        }
      } else {
        toast.error('Email ou mot de passe invalide');
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      toast.error('Erreur lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 pt-24 mt-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Bienvenue</CardTitle>
            <CardDescription>
              Connectez-vous à votre compte pour continuer
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="nom@exemple.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link 
                    to="/forgot-password"
                    className="text-sm text-madagascar-green hover:underline"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={formData.remember}
                  onCheckedChange={handleCheckboxChange}
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Se souvenir de moi
                </label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button 
                className="w-full mb-4 bg-madagascar-green hover:bg-madagascar-green/80" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Connexion en cours...
                  </div>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" /> Se connecter
                  </>
                )}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Vous n'avez pas de compte ?{" "}
                <Link to="/register" className="text-madagascar-green hover:underline">
                  S'inscrire
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
        
        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-muted/50 rounded-md max-w-md w-full">
          <h3 className="font-medium mb-2 text-center">Identifiants de démonstration</h3>
          <p className="text-sm text-muted-foreground mb-1">Connexion administrateur :</p>
          <code className="text-xs bg-muted p-1 rounded">
            Email: admin@northgascartours.com | Mot de passe: admin
          </code>
          <p className="text-sm text-muted-foreground mt-2 mb-1">Connexion utilisateur :</p>
          <code className="text-xs bg-muted p-1 rounded">
            Email: user@example.com | Mot de passe: password
          </code>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
