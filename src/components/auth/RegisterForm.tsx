
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing again
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
      isValid = false;
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
      isValid = false;
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
      isValid = false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      isValid = false;
    }
    
    if (!formData.terms) {
      newErrors.terms = 'Vous devez accepter les conditions d\'utilisation';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const checkEmailExists = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false
        }
      });
      
      // Si l'API ne renvoie pas d'erreur, cela signifie que l'email existe déjà
      if (!error) {
        return true;
      }
      
      // Si l'erreur est "User not found", l'email n'existe pas encore
      if (error.message.includes('User not found') || error.message.includes('Invalid login credentials')) {
        return false;
      }
      
      // Pour toute autre erreur, on considère que la vérification a échoué
      console.error("Erreur lors de la vérification de l'email:", error);
      return null;
    } catch (error) {
      console.error("Erreur lors de la vérification de l'email:", error);
      return null;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Vérifier si l'email existe déjà
      const emailExists = await checkEmailExists(formData.email);
      
      if (emailExists === true) {
        setErrors(prev => ({ 
          ...prev, 
          email: 'Cet email est déjà utilisé. Veuillez vous connecter ou utiliser une autre adresse email.' 
        }));
        setIsLoading(false);
        return;
      }
      
      if (emailExists === null) {
        toast.error("Impossible de vérifier la disponibilité de l'email. Veuillez réessayer plus tard.");
        setIsLoading(false);
        return;
      }
      
      // Si l'email n'existe pas, procéder à l'inscription
      const user = await register(formData.email, formData.password, formData.firstName, formData.lastName);
      
      if (user) {
        toast.success("Inscription réussie! Bienvenue chez North Gasikara Tours.");
        // Rediriger vers la page de connexion
        navigate('/login');
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      toast.error("Une erreur est survenue lors de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom</Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="John"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? 'border-red-500' : ''}
          />
          {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom</Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? 'border-red-500' : ''}
          />
          {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Adresse email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john.doe@example.com"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? 'border-red-500' : ''}
        />
        {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={errors.confirmPassword ? 'border-red-500' : ''}
        />
        {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
      </div>
      
      <div className="flex items-start space-x-2">
        <Checkbox 
          id="terms" 
          name="terms"
          checked={formData.terms}
          onCheckedChange={(checked) => 
            setFormData(prev => ({ ...prev, terms: checked === true }))
          }
          className={errors.terms ? 'border-red-500' : ''}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            J'accepte les conditions d'utilisation et la politique de confidentialité
          </label>
          {errors.terms && <p className="text-xs text-red-500">{errors.terms}</p>}
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-madagascar-green hover:bg-madagascar-green/90"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Inscription en cours...
          </>
        ) : (
          "S'inscrire"
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
