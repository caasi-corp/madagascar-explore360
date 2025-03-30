
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { LogIn } from 'lucide-react';
import Layout from '@/components/Layout';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock login functionality - replace with actual authentication later
    setTimeout(() => {
      // For demonstration purposes, use email admin@northgascartours.com and password admin to access admin
      if (formData.email === 'admin@northgascartours.com' && formData.password === 'admin') {
        localStorage.setItem('userRole', 'admin');
        toast.success('Welcome back, Admin!');
        navigate('/admin/dashboard');
      } else if (formData.email && formData.password) {
        localStorage.setItem('userRole', 'user');
        toast.success('Login successful!');
        navigate('/user/dashboard');
      } else {
        toast.error('Invalid email or password');
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="name@example.com"
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link 
                    to="/forgot-password"
                    className="text-sm text-madagascar-green hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
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
                  Remember me
                </label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button 
                className="w-full mb-4 bg-madagascar-green hover:bg-madagascar-green/80" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Signing in...
                  </div>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" /> Sign In
                  </>
                )}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-madagascar-green hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
        
        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-muted/50 rounded-md max-w-md w-full">
          <h3 className="font-medium mb-2 text-center">Demo Credentials</h3>
          <p className="text-sm text-muted-foreground mb-1">Admin login:</p>
          <code className="text-xs bg-muted p-1 rounded">
            Email: admin@northgascartours.com | Password: admin
          </code>
          <p className="text-sm text-muted-foreground mt-2 mb-1">User login:</p>
          <code className="text-xs bg-muted p-1 rounded">
            Email: user@example.com | Password: password
          </code>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
