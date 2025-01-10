export interface ResponseAPIRegisterLogin {
  message: string;
  user:    User;
}

export interface User {
  email: string;
  token: string;
}
