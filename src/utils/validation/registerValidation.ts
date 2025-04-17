
/**
 * Validation functions for register form
 */
export interface RegisterErrors {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: string;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export const validateRegisterForm = (formData: RegisterFormData): { isValid: boolean; errors: RegisterErrors } => {
  let isValid = true;
  const newErrors: RegisterErrors = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: '',
  };
  
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
  
  return { isValid, errors: newErrors };
};
