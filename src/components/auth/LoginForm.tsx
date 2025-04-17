
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  // Récupérer l'URL de retour si elle existe
  const from = location.state?.from || (user?.role === 'admin' ? "/admin" : "/user/dashboard");

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ne pas continuer si l'utilisateur est déjà connecté
    if (user) return;
    
    setIsLoading(true);
    setLoginError(null); // Reset any previous error
    
    try {
      console.log("Tentative de connexion avec:", formData.email);
      
      // Faire la tentative de connexion avec Supabase
      const loggedInUser = await login(formData.email, formData.password);
      
      if (loggedInUser) {
        toast.success("Connexion réussie!");
        // Rediriger vers la page précédente ou le tableau de bord
        navigate(from);
      } else {
        setLoginError("Échec de la connexion. Veuillez vérifier vos identifiants.");
        toast.error("Échec de la connexion. Veuillez vérifier vos identifiants.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setLoginError("Échec de la connexion. Veuillez vérifier vos identifiants.");
      toast.error("Échec de la connexion. Veuillez vérifier vos identifiants.");
    } finally {
      setIsLoading(false);
    }
  };

  // Si l'utilisateur est déjà connecté, on peut retourner null ou un loader
  if (user) {
    return (
      <div className="flex justify-center items-center py-4">
        <Loader2 className="h-8 w-8 animate-spin text-madagascar-green" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {loginError && (
        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
          {loginError}
        </div>
      )}
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
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <Button 
            type="button"
            variant="ghost" 
            size="icon"
            onClick={togglePasswordVisibility}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            <span className="sr-only">
              {showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            </span>
          </Button>
        </div>
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
