
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { LogIn, User, Lock, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { userAPI } from '@/lib/store';
import { LoginFormData } from "@/types/auth";

interface LoginFormProps {
  onDemoLogin: (email: string, password: string) => void;
  loginError: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ onDemoLogin, loginError }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log("Tentative de connexion avec:", formData.email, formData.password);
      const user = await userAPI.authenticate(formData.email, formData.password);
      
      if (user) {
        console.log("Utilisateur authentifié:", user);
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
        console.log("Échec d'authentification");
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
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        {loginError && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-2 text-sm text-destructive">
            <AlertTriangle size={16} />
            <span>{loginError}</span>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={16} className="text-gray-400" />
            </div>
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
              className="pl-10"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Mot de passe</Label>
            <a 
              href="/forgot-password"
              className="text-sm text-madagascar-green hover:underline"
            >
              Mot de passe oublié ?
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={16} className="text-gray-400" />
            </div>
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className="pl-10"
              required
            />
            <div 
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 
                <EyeOff size={16} className="text-gray-400" /> : 
                <Eye size={16} className="text-gray-400" />
              }
            </div>
          </div>
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
        <Button 
          className="w-full bg-madagascar-green hover:bg-madagascar-green/80" 
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
      </div>
    </form>
  );
};

export default LoginForm;
