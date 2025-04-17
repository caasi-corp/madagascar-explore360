
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

const PasswordInput = ({
  id,
  name,
  value,
  onChange,
  placeholder = "••••••••",
  required = true
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <Input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
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
  );
};

export default PasswordInput;
