
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle } from 'lucide-react';

interface CredentialsTabProps {
  apiKey: string;
  setApiKey: (value: string) => void;
  clientId: string;
  setClientId: (value: string) => void;
  clientSecret: string;
  setClientSecret: (value: string) => void;
  isConfigured: boolean;
}

export const CredentialsTab: React.FC<CredentialsTabProps> = ({
  apiKey,
  setApiKey,
  clientId,
  setClientId,
  clientSecret,
  setClientSecret,
  isConfigured
}) => {
  return (
    <div className="space-y-4 mt-4">
      {isConfigured && (
        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-md p-3 mb-4 flex items-center">
          <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
          <span>API configurée et prête à l'emploi</span>
        </div>
      )}
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="apiKey">Clé API</Label>
          <Input
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSyBE1K0Bz4lvVQnA-xQ_YkyT1sixGthOFUk"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="clientId">ID Client OAuth</Label>
          <Input
            id="clientId"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            placeholder="123456789012-abc123def456.apps.googleusercontent.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="clientSecret">Secret Client OAuth</Label>
          <Input
            id="clientSecret"
            type="password"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
            placeholder="GOCSPX-abc123def456"
          />
        </div>
      </div>
    </div>
  );
};
