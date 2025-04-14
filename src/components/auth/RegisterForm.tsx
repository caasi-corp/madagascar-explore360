
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { UserPlus, AlertCircle } from 'lucide-react';
import { RegisterFormData } from '@/types/auth';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    // Effacer le message d'erreur quand l'utilisateur modifie le formulaire
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas");
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      const { user } = await register(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName
      );
      
      if (user) {
        toast.success('Compte créé avec succès !');
        navigate('/user/dashboard');
      } else {
        setErrorMessage("Échec de l'inscription. Veuillez réessayer.");
        toast.error("Échec de l'inscription. Veuillez réessayer.");
      }
    } catch (error: any) {
      console.error("Erreur d'inscription détaillée:", error);
      
      // Afficher un message d'erreur plus spécifique en fonction du code d'erreur
      if (error?.code === 'auth/email-already-in-use' || 
          error?.message?.includes('already exists') || 
          error?.message?.includes('already registered')) {
        setErrorMessage("Cette adresse email est déjà utilisée. Veuillez vous connecter ou utiliser une autre adresse.");
        toast.error("Cette adresse email est déjà utilisée");
      } else if (error?.message?.includes('password')) {
        setErrorMessage("Le mot de passe ne répond pas aux exigences de sécurité (minimum 6 caractères)");
        toast.error("Le mot de passe ne répond pas aux exigences de sécurité");
      } else if (error?.message?.includes('Database error')) {
        setErrorMessage("Erreur de base de données lors de la création du compte. Veuillez réessayer ultérieurement.");
        toast.error("Erreur de base de données");
      } else {
        setErrorMessage(error?.message || "Une erreur s'est produite lors de l'inscription");
        toast.error("Une erreur s'est produite lors de l'inscription");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
              className="border-gray-300 focus:border-madagascar-green focus:ring focus:ring-madagascar-green/20"
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
              className="border-gray-300 focus:border-madagascar-green focus:ring focus:ring-madagascar-green/20"
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
            className="border-gray-300 focus:border-madagascar-green focus:ring focus:ring-madagascar-green/20"
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
            minLength={6}
            className="border-gray-300 focus:border-madagascar-green focus:ring focus:ring-madagascar-green/20"
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
            minLength={6}
            className="border-gray-300 focus:border-madagascar-green focus:ring focus:ring-madagascar-green/20"
          />
        </div>
        
        {errorMessage && (
          <Alert variant="destructive" className="bg-red-50 text-red-600 border-red-200">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}
        
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
          className="w-full bg-madagascar-green hover:bg-madagascar-green/80 transition-colors duration-300 shadow-md" 
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
