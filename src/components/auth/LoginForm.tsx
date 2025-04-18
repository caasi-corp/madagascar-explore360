
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from "lucide-react";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  // Rediriger l'utilisateur s'il est déjà connecté
  useEffect(() => {
    if (user) {
      // Utilisateur déjà connecté, rediriger vers le tableau de bord approprié
      navigate(user.role === 'admin' ? "/admin" : "/user/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ne pas continuer si l'utilisateur est déjà connecté
    if (user) return;
    
    setIsLoading(true);
    
    try {
      const loggedInUser = await login(formData.email, formData.password);
      
      if (loggedInUser) {
        toast.success("Connexion réussie!");
        navigate(loggedInUser.role === 'admin' ? "/admin" : "/user/dashboard");
      } else if (!user) { // Vérifier si l'utilisateur n'est toujours pas connecté
        toast.error("Échec de la connexion. Veuillez vérifier vos identifiants.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      toast.error("Une erreur est survenue lors de la connexion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Adresse email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="votre@email.com"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Mot de passe</Label>
          <Button variant="link" className="p-0 h-auto font-normal text-xs text-muted-foreground" type="button">
            Mot de passe oublié?
          </Button>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="remember" 
          name="remember"
          checked={formData.remember}
          onCheckedChange={(checked) => 
            setFormData(prev => ({ ...prev, remember: checked === true }))
          }
        />
        <label
          htmlFor="remember"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Se souvenir de moi
        </label>
      </div>
      <Button 
        type="submit" 
        className="w-full bg-madagascar-green hover:bg-madagascar-green/90"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
            Connexion en cours...
          </>
        ) : (
          "Se connecter"
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
