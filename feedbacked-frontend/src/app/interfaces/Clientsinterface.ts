export interface ClientsInterface {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  feedbacks: FeedbackInterface[];
  url: string;
  keys: { key: string; for: string; clientEmail: string; created_at: string }[];
}

export interface FeedbackInterface {
  id: string;
  title: string;
  by: string;
  description: string;
  image?: string;
  status: 'Resolved' | 'Unresolved';
  created_at: Date;
}

export interface IssueInterface {
  id: string;
  title: string;
  by: string;
  description: string;
  image: string;
  status: 'Unresolved' | 'Resolved';
  created_at: string;
  _id: string;
  errors: any[];
  warnings: any[];
  device: {
    browser: string;
    device: string;
    type: 'Mobile' | 'Desktop' | 'Tablet';
  };
}
