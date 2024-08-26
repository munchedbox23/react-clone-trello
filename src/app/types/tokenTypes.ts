import { IUserResponse } from "./userTypes";

export interface IRefreshTokenResponse extends Omit<IUserResponse, "user"> {}

export type TTokenError = {
  success: false;
  message: string | null;
};
