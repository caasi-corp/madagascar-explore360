
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RegisterFormData, RegisterErrors } from '@/utils/validation/registerValidation';

interface RegisterFormFieldsProps {
  formData: RegisterFormData;
  errors: RegisterErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<RegisterFormData>>;
}

const RegisterFormFields: React.FC<RegisterFormFieldsProps> = ({ 
  formData, 
  errors, 
  handleChange,
  setFormData 
}) => {
  return (
    <>
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
          id="isAdmin" 
          name="isAdmin"
          checked={formData.isAdmin}
          onCheckedChange={(checked) => 
            setFormData(prev => ({ ...prev, isAdmin: checked === true }))
          }
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="isAdmin"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            S'inscrire en tant qu'administrateur
          </label>
          <p className="text-xs text-muted-foreground">
            Cochez cette case pour créer un compte avec des privilèges d'administrateur
          </p>
        </div>
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
    </>
  );
};

export default RegisterFormFields;
