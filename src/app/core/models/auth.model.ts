export interface AuthSignIn {
  msg: string;
  data: {
    access_token: string;
    token_type: string;
    expires_at: number;
  };
}
