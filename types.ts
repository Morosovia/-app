export interface Activity {
  id: string;
  time?: string;
  title: string;
  description?: string;
  cost?: string;
  category: 'flight' | 'transport' | 'hotel' | 'sightseeing' | 'food' | 'shopping' | 'note';
  link?: string;
  isImportant?: boolean;
}

export interface DayItinerary {
  dayNumber: number;
  date: string;
  dayOfWeek: string;
  title: string;
  accommodation: {
    name: string;
    details?: string;
  };
  activities: Activity[];
}

export interface Memo {
  id: string;
  content: string;
  createdAt: string;
}

export interface Expense {
  id: string;
  dayNumber: number;
  title: string;
  category: 'transport' | 'food' | 'ticket' | 'sundry' | 'gift' | 'other';
  amount: number;
  currency: 'TWD' | 'JPY';
  paymentMethod: 'credit' | 'cash';
  createdAt: string;
}

