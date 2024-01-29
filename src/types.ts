import { Request } from 'express';

export interface UserLogin {
  id?: number;
  email: string;
}

export interface User extends UserLogin {
  name: string;
  password: string;
  address: string;
}

export interface UserData {
  id: string;
  name: string;
  address: string;
}

export interface ValidationRequest extends Request {
  userData: UserData;
}
