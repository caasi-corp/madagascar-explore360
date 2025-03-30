
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { userAPI } from '@/lib/store';

const UserSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Dans une implémentation réelle, nous récupérerions l'ID de l'utilisateur depuis le localStorage
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
          const user = await userAPI.getById(storedUserId);
          if (user) {
            setUserData(prevData => ({
              ...prevData,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            }));
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur:", error);
        toast.error("Impossible de charger vos informations");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId) {
      toast.error("Veuillez vous reconnecter");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await userAPI.update(userId, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      });
      
      toast.success("Profil mis à jour avec succès");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      toast.error("Échec de la mise à jour du profil");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId) {
      toast.error("Veuillez vous reconnecter");
      return;
    }
    
    if (userData.newPassword !== userData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Ici, on simule la vérification du mot de passe actuel
      // Dans une implémentation réelle, on vérifierait le mot de passe actuel
      await userAPI.update(userId, {
        password: userData.newPassword,
      });
      
      setUserData(prevState => ({
        ...prevState,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
      
      toast.success("Mot de passe modifié avec succès");
    } catch (error) {
      console.error("Erreur lors du changement de mot de passe:", error);
      toast.error("Échec de la modification du mot de passe");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Paramètres du compte</h1>
        
        {/* Informations personnelles */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
            <CardDescription>Mettez à jour vos informations personnelles</CardDescription>
          </CardHeader>
          <form onSubmit={handleProfileUpdate}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="bg-madagascar-green hover:bg-madagascar-green/80"
                disabled={isLoading}
              >
                {isLoading ? 'Mise à jour...' : 'Enregistrer les modifications'}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        {/* Changement de mot de passe */}
        <Card>
          <CardHeader>
            <CardTitle>Changer le mot de passe</CardTitle>
            <CardDescription>Mettez à jour votre mot de passe pour sécuriser votre compte</CardDescription>
          </CardHeader>
          <form onSubmit={handlePasswordChange}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={userData.currentPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={userData.newPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="bg-madagascar-green hover:bg-madagascar-green/80"
                disabled={isLoading}
              >
                {isLoading ? 'Mise à jour...' : 'Changer le mot de passe'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default UserSettings;
