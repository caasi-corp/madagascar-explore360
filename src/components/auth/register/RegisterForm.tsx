
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from "lucide-react";
import { emailService } from '@/services/auth/emailService';
import { RegisterFormData, RegisterErrors, validateRegisterForm } from '@/utils/validation/registerValidation';
import RegisterFormFields from './RegisterFormFields';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  
  const [errors, setErrors] = useState<RegisterErrors>({
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
    
    if (errors[name as keyof RegisterErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { isValid, errors: validationErrors } = validateRegisterForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const emailExists = await emailService.checkEmailExists(formData.email);
      
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
      
      const success = await register(formData.email, formData.password, formData.firstName, formData.lastName);
      
      if (success) {
        setTimeout(() => {
          navigate('/login');
        }, 1500);
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
      <RegisterFormFields 
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        setFormData={setFormData}
      />
      
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
