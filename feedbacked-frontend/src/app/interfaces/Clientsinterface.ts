export interface ClientsInterface {
  name: string;
  email: string;
  phone: string;
  status: string;
  feedbacks: [];
}

export interface FeedbackInterface {
  id: string;
  title: string;
  body: string;
  image: string;
  created_at: Date;
}
