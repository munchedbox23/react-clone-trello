import { IUserResponse } from "../../entities/user/model/types/userTypes";

export interface IRefreshTokenResponse extends Omit<IUserResponse, "user"> {}

export type TTokenError = {
  success: false;
  message: string | null;
};
