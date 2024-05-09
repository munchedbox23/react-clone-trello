export interface IUser {
  email: string;
  name: string;
}

export interface IUserLogin extends Omit<IUser, "name"> {
  password: string;
}

export interface IUserRegister extends IUser {
  password: string;
}

export interface IUserAuth {
  success: boolean;
  user: IUser;
}

export interface IUserResponse extends IUserAuth {
  accessToken: string;
  refreshToken: string;
}

export interface IUserLogout {
  success: true;
  message: "Successful logout";
}

export interface IUserResetPassword {
  password: string;
  token: string;
}
