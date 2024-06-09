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

export interface FormElement {
  value: any;
  valid: boolean;
  touched: boolean;
  minLength?: number;
  maxLength?: number;
  regexCheck?: RegExp;
  shouldValidate?: boolean;
  [key: string]: any;
}

export type LoginPayload = {
  email: string;
  password: string;
};