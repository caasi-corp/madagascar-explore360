
import React from 'react';

const TermsOfService = () => {
  return (
    <div className="container mx-auto py-16 px-4 mt-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Conditions Générales d'Utilisation</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="lead">
            Ce document définit les termes et conditions régissant l'utilisation des services de North Gascar Tours.
            Dernière mise à jour: 1er juin 2023.
          </p>
          
          <h2>1. Acceptation des Conditions</h2>
          <p>
            En accédant à ou en utilisant notre site web et nos services, vous acceptez d'être lié par ces Conditions 
            Générales d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site ou nos services.
          </p>
          
          <h2>2. Description des Services</h2>
          <p>
            North Gascar Tours fournit des services d'organisation de voyages, circuits et excursions à Madagascar, 
            ainsi que des services connexes tels que la réservation d'hôtels, la location de voitures et la réservation de vols.
          </p>
          
          <h2>3. Réservations et Paiements</h2>
          <p>
            3.1. Une réservation est considérée comme confirmée uniquement après réception d'un acompte et confirmation écrite de notre part.<br />
            3.2. Les paiements peuvent être effectués par carte de crédit, virement bancaire ou en espèces selon les modalités spécifiées.<br />
            3.3. Un acompte de 30% est généralement requis pour confirmer une réservation, avec le solde payable 30 jours avant le départ.
          </p>
          
          <h2>4. Modifications et Annulations</h2>
          <p>
            4.1. Modifications par le client: Des frais peuvent s'appliquer pour les modifications demandées par le client.<br />
            4.2. Modifications par North Gascar Tours: Nous nous réservons le droit de modifier les itinéraires en cas de nécessité.<br />
            4.3. Politique d'annulation:<br />
            - Plus de 60 jours avant le départ: remboursement de 90% de l'acompte<br />
            - 30 à 60 jours avant le départ: remboursement de 50% de l'acompte<br />
            - Moins de 30 jours avant le départ: aucun remboursement
          </p>
          
          <h2>5. Responsabilités</h2>
          <p>
            5.1. Responsabilité du client: Vous êtes responsable d'avoir des documents de voyage valides, de respecter les lois locales 
            et de suivre les instructions des guides.<br />
            5.2. Responsabilité de North Gascar Tours: Nous sommes responsables de fournir les services décrits dans votre itinéraire confirmé, 
            mais déclinons toute responsabilité pour les événements indépendants de notre volonté.
          </p>
          
          <h2>6. Assurance Voyage</h2>
          <p>
            Nous recommandons fortement à tous les clients de souscrire une assurance voyage complète couvrant les frais médicaux, 
            l'évacuation, l'annulation et la perte de bagages.
          </p>
          
          <h2>7. Propriété Intellectuelle</h2>
          <p>
            Tout le contenu de notre site web, y compris les textes, graphiques, logos et images, est la propriété de North Gascar Tours 
            et est protégé par les lois sur le droit d'auteur et la propriété intellectuelle.
          </p>
          
          <h2>8. Loi Applicable</h2>
          <p>
            Ces conditions sont régies par les lois de Madagascar. Tout litige sera soumis à la juridiction exclusive des tribunaux d'Antananarivo.
          </p>
          
          <h2>9. Modifications des Conditions</h2>
          <p>
            Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prendront effet dès leur publication sur notre site.
          </p>
          
          <h2>10. Contact</h2>
          <p>
            Si vous avez des questions concernant ces conditions, veuillez nous contacter à:
          </p>
          <address>
            North Gascar Tours<br />
            Email: info@northgascartours.com<br />
            Téléphone: +261 32 050 09 99<br />
            Adresse: Bureau North Gascar Tours, Antananarivo, Madagascar
          </address>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
