
import { MessageType } from '../types/message';

export const DEMO_MESSAGES: MessageType[] = [
  {
    id: 'm1',
    subject: 'Demande d\'informations sur le circuit Baobabs',
    sender: {
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com'
    },
    received: '2023-09-15T10:30:00',
    content: `Bonjour,

Je voudrais obtenir plus d'informations sur votre circuit "Allée des Baobabs". Est-ce que ce circuit est adapté pour des enfants de 8 et 10 ans ? Quelles sont les activités proposées pendant ce circuit ? Est-il possible d'avoir un guide francophone ?

Merci d'avance pour votre réponse.
Cordialement,

Jean Dupont`,
    read: true,
    starred: false,
    flagged: false,
    category: 'inquiry',
    status: 'pending',
  },
  {
    id: 'm2',
    subject: 'Problème de réservation - Référence B002',
    sender: {
      name: 'Marie Laurent',
      email: 'marie.laurent@example.com'
    },
    received: '2023-09-16T14:15:00',
    content: `Bonjour,

J'ai effectué une réservation pour la location d'un Toyota Land Cruiser (référence B002) pour la période du 10 au 15 septembre, mais je n'ai toujours pas reçu la confirmation par email.
Pouvez-vous vérifier si la réservation a bien été prise en compte ?

Cordialement,
Marie Laurent`,
    read: false,
    starred: true,
    flagged: true,
    category: 'support',
    status: 'in-progress',
  },
  {
    id: 'm3',
    subject: 'Avis sur notre séjour à Madagascar',
    sender: {
      name: 'Paul Martin',
      email: 'paul.martin@example.com'
    },
    received: '2023-09-14T09:45:00',
    content: `Bonjour,

Je tenais à vous remercier pour l'organisation de notre voyage à Madagascar. Le circuit dans le parc national de l'Isalo était magnifique et notre guide, Antoine, était très compétent et sympathique.

Je recommanderai votre agence à mes amis !

Cordialement,
Paul Martin`,
    read: true,
    starred: true,
    flagged: false,
    category: 'feedback',
    status: 'resolved',
  },
  {
    id: 'm4',
    subject: 'Plainte concernant l\'hébergement à Nosy Be',
    sender: {
      name: 'Sophie Petit',
      email: 'sophie.petit@example.com'
    },
    received: '2023-09-17T11:20:00',
    content: `Bonjour,

Je vous écris pour vous faire part de mon mécontentement concernant l'hébergement au Royal Beach Resort & Spa à Nosy Be. La chambre que nous avons reçue ne correspondait pas du tout à celle présentée sur votre site web. Elle était plus petite, sans vue sur l'océan et dans un état général moins bon.

J'espère que vous prendrez en compte cette plainte et que vous proposerez un geste commercial.

Cordialement,
Sophie Petit`,
    read: false,
    starred: false,
    flagged: true,
    category: 'complaint',
    status: 'pending',
  },
];
