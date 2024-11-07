export interface ClientsInterface {
  name: string;
  email: string;
  phone: string;
  status: string;
  feedbacks: [];
  keys: { key: string; for: string; clientEmail: string; created_at: string }[];
}

export interface FeedbackInterface {
  id: string;
  title: string;
  body: string;
  image: string;
  created_at: Date;
}
