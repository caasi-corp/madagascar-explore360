
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { userAPI } from '@/lib/store';
import LoginForm from '@/components/auth/LoginForm';
import DemoCredentials from '@/components/auth/DemoCredentials';

const Login = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  
  useEffect(() => {
    const checkUsers = async () => {
      try {
        const users = await userAPI.getAll();
        console.log(`Login page: ${users.length} users found in database`);
        if (users.length === 0) {
          setLoginError("No users found in the database. Please create a user or contact an administrator.");
        }
      } catch (error) {
        console.error("Error checking users:", error);
      }
    };
    
    checkUsers();
  }, []);

  const handleDemoLogin = (email: string, password: string) => {
    setFormData({
      email,
      password,
      remember: false
    });
    setLoginError(null);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 pt-24 mt-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome</CardTitle>
          <CardDescription>
            Login to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm 
            onDemoLogin={handleDemoLogin} 
            loginError={loginError}
          />
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-madagascar-green hover:underline">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
      
      <DemoCredentials 
        onDemoLogin={handleDemoLogin}
        onResetDatabase={() => {}}
        isResetting={false}
      />
    </div>
  );
};

export default Login;
