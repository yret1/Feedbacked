export interface ClientsInterface {
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
