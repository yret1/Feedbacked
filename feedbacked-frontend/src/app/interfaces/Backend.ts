//Base type used for calls to backend

export interface idCall {
  userId: string;
}

export interface baseCall {
  userId: string;
  clientEmail: string;
}

//Extended type for creating clients
export interface newClient extends baseCall {
  clientName: string;
  clientUrl: string;
}

//Response client creation

export interface newClientResponse {
  clientId: string;
}
