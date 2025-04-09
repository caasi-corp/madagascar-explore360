
import React from 'react';
import { ExternalLink } from 'lucide-react';

export const InstructionsTab: React.FC = () => {
  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Comment configurer l'API Google Tasks</h3>
        
        <ol className="space-y-4 list-decimal pl-5">
          <li>
            <p>Accédez à la <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline inline-flex items-center">
              Console Google Cloud
              <ExternalLink className="ml-1 h-3 w-3" />
            </a></p>
          </li>
          <li>
            <p>Créez un nouveau projet ou sélectionnez un projet existant</p>
          </li>
          <li>
            <p>Activez l'API Google Tasks dans la bibliothèque d'API</p>
          </li>
          <li>
            <p>Créez des identifiants OAuth 2.0 pour une application web</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Configurez l'écran de consentement OAuth</li>
              <li>Ajoutez les URI de redirection autorisés (généralement votre domaine)</li>
              <li>Copiez l'ID client et le secret client générés</li>
            </ul>
          </li>
          <li>
            <p>Créez une clé API restreinte pour l'API Tasks</p>
          </li>
          <li>
            <p>Saisissez ces identifiants dans ce formulaire de configuration</p>
          </li>
        </ol>
        
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md p-3 mt-4">
          <p className="text-sm">Pour plus d'informations, consultez la <a href="https://developers.google.com/tasks/quickstart/js" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline inline-flex items-center">
            documentation officielle de Google Tasks API
            <ExternalLink className="ml-1 h-3 w-3" />
          </a></p>
        </div>
      </div>
    </div>
  );
};
