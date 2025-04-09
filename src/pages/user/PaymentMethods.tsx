
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, CreditCard, Edit2, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Mock payment methods
const mockPaymentMethods = [
  {
    id: 'pm_1',
    cardBrand: 'visa',
    lastFour: '4242',
    expiryMonth: '12',
    expiryYear: '2024',
    isDefault: true
  },
  {
    id: 'pm_2',
    cardBrand: 'mastercard',
    lastFour: '5555',
    expiryMonth: '09',
    expiryYear: '2025',
    isDefault: false
  }
];

// Card brand icons (simplified)
const cardBrandIcon = (brand: string) => {
  const brands: Record<string, string> = {
    visa: '💳 Visa',
    mastercard: '💳 Mastercard',
    amex: '💳 Amex',
    default: '💳'
  };
  
  return brands[brand] || brands.default;
};

const PaymentMethods: React.FC = () => {
  const { user } = useAuth();
  const [paymentMethods, setPaymentMethods] = React.useState(mockPaymentMethods);

  const removePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
  };

  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Méthodes de Paiement</h1>
        <p className="text-muted-foreground">
          Gérez vos méthodes de paiement pour faciliter vos réservations
        </p>
      </div>
      
      <div className="grid gap-6">
        {paymentMethods.map((method) => (
          <Card key={method.id} className={method.isDefault ? 'border-northgascar-teal' : ''}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-xl mr-2">{cardBrandIcon(method.cardBrand)}</span>
                  <div>
                    <CardTitle className="text-lg">•••• •••• •••• {method.lastFour}</CardTitle>
                    <CardDescription>Expire {method.expiryMonth}/{method.expiryYear}</CardDescription>
                  </div>
                </div>
                
                {method.isDefault && (
                  <div className="bg-northgascar-teal/10 text-northgascar-teal px-3 py-1 rounded-full text-xs font-medium">
                    Par défaut
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardFooter className="pt-3 flex flex-wrap gap-2">
              {!method.isDefault && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setDefaultPaymentMethod(method.id)}
                >
                  Définir par défaut
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Edit2 className="mr-2 h-4 w-4" />
                Modifier
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-destructive hover:bg-destructive/10"
                onClick={() => removePaymentMethod(method.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </Button>
            </CardFooter>
          </Card>
        ))}
        
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Button variant="outline" className="gap-2">
              <PlusCircle className="h-5 w-5" />
              Ajouter une méthode de paiement
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Separator />
      
      <div>
        <h2 className="text-xl font-bold mb-4">Historique des Transactions</h2>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8 text-muted-foreground">
              <CreditCard className="mx-auto h-12 w-12 mb-4 opacity-30" />
              <p>Aucune transaction récente</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentMethods;
