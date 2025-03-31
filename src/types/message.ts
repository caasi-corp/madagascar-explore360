
export interface MessageType {
  id: string;
  subject: string;
  sender: {
    name: string;
    email: string;
  };
  received: string;
  content: string;
  read: boolean;
  starred: boolean;
  flagged: boolean;
  category: 'inquiry' | 'support' | 'feedback' | 'complaint';
  status: 'pending' | 'in-progress' | 'resolved';
}

export const categoryLabels = {
  'inquiry': 'Demande',
  'support': 'Support',
  'feedback': 'Avis',
  'complaint': 'Plainte',
};

export const categoryColors = {
  'inquiry': 'bg-blue-500',
  'support': 'bg-yellow-500',
  'feedback': 'bg-green-500',
  'complaint': 'bg-red-500',
};

export const statusColors = {
  'pending': 'bg-yellow-500',
  'in-progress': 'bg-blue-500',
  'resolved': 'bg-green-500',
};
