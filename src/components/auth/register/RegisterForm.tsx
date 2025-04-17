
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';
import { RegisterFormData, RegisterErrors, validateRegisterForm } from '@/utils/validation/registerValidation';
import RegisterFormFields from './RegisterFormFields';
import LoadingButton from '../LoadingButton';

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
    isAdmin: false
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
      console.log("Tentative d'inscription avec:", formData.email, "admin:", formData.isAdmin);
      
      const success = await register(
        formData.email, 
        formData.password, 
        formData.firstName, 
        formData.lastName,
        formData.isAdmin
      );
      
      if (success) {
        toast.success(`Inscription réussie${formData.isAdmin ? ' en tant qu\'administrateur' : ''} !`);
        
        // Rediriger vers la page de connexion après un court délai
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        toast.error("L'inscription a échoué. Veuillez réessayer.");
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('email already in use')) {
          setErrors(prev => ({ 
            ...prev, 
            email: 'Cet email est déjà utilisé. Veuillez vous connecter ou utiliser une autre adresse email.' 
          }));
        } else {
          console.error("Erreur lors de l'inscription:", error);
          toast.error("Une erreur est survenue lors de l'inscription: " + error.message);
        }
      } else {
        console.error("Erreur inconnue lors de l'inscription:", error);
        toast.error("Une erreur inconnue est survenue lors de l'inscription");
      }
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
      
      <LoadingButton 
        type="submit" 
        className="w-full bg-madagascar-green hover:bg-madagascar-green/90"
        isLoading={isLoading}
        loadingText="Inscription en cours..."
      >
        S'inscrire {formData.isAdmin ? 'en tant qu\'administrateur' : ''}
      </LoadingButton>
    </form>
  );
};

export default RegisterForm;
