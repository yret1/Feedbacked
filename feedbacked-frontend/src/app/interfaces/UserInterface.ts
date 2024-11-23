
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
  ]
  created_at?: Date;
}



interface feedbackInterface {
  title: string;
  description: string;
  image: string;
  status: string;
  created_at: Date;
}

type Key = {
  key: string;
  for: string;
  clientEmail: string;
  created_at: Date;

}
