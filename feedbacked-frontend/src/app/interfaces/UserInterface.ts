export interface UserInterface {
  username?: string;
  email: string;
  password: string;
  clients: [
    {
      name: string;
      email: string;
      phone: string;
      status: string;
      feedbacks: feedbackInterface[];
      keys: Key[];
    }
  ];
  settings: {
    integrations: integrationInterface[];
    payment: {
      currentPlan: 'Pro' | 'Trial' | 'Cancelled';
      stripePlan: 'Pro' | 'Trial' | 'Cancelled';
      activeUntil: Date | 'Lifetime';
    };
  };
  created_at?: Date;
}

interface feedbackInterface {
  title: string;
  description: string;
  image: string;
  status: string;
  created_at: Date;
}

export interface integrationInterface {
  title: string;
  token: string;
  updated_on: Date;
}

type Key = {
  key: string;
  for: string;
  clientEmail: string;
  created_at: Date;
};
