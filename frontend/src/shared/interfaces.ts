export interface TokenPayload {
  expiresIn: number;
  accessToken: string;
}

export interface UserAfterLogin {
  id: number;
  firstName: string;
  lastName: string;
  token: TokenPayload;
}
