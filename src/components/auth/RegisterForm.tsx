
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const user = await register(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName
      );
      
      if (user) {
        navigate('/user/dashboard');
      }
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      toast.error("Une erreur s'est produite lors de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="Jean"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Nom</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Dupont"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
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
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <p className="text-xs text-muted-foreground">
          En créant un compte, vous acceptez nos{' '}
          <Link to="/terms-of-service" className="text-madagascar-green hover:underline">
            Conditions d'utilisation
          </Link>{' '}
          et notre{' '}
          <Link to="/privacy-policy" className="text-madagascar-green hover:underline">
            Politique de confidentialité
          </Link>.
        </p>
      </div>

      <div className="mt-6">
        <Button 
          className="w-full bg-madagascar-green hover:bg-madagascar-green/80" 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Création du compte...
            </div>
          ) : (
            <>
              <UserPlus className="mr-2 h-4 w-4" /> Créer un compte
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
