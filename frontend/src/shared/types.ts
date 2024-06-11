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

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photos: string[];
};

export type SuccessfullyCreated = {
  success: boolean;
  id: number;
};

interface Photo {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  url: string;
}

interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  active: boolean;
  avatarUrl: string;
}

export interface UserProfile {
  user: User;
  photos: Photo[];
  token: string;
}
