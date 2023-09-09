import { Request } from "express";

export { }

declare global {
  type UserData = {
    phoneNumber: string,
    password: string,
    name: string,
    _id: string,
  }
  type AuthenticatedRequest = Request & {
    user?: UserData
  };
}