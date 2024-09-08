import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import {
  IUserLogin,
  IUserLogout,
  IUserRegister,
  IUserResponse,
  IUserResetPassword,
  IUserAuth,
} from "../model/types/userTypes";
import { request } from "../../../shared/api/requests";
import { API } from "../../../shared/helpers/constants";
import { fetchWithRefresh } from "../../../shared/api/requests";
import { IProfileForm } from "../../../pages/ProfilePage/ProfilePage";

export const cookies = new Cookies();

export const userLogin = createAsyncThunk<IUserResponse, IUserLogin>(
  "user/userLogin",
  async (form) => {
    const response = await request<IUserResponse>(
      `${API.baseUrl}${API.endpoints.login}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    if (response.success) {
      cookies.set("accessToken", response.accessToken.split("Bearer ")[1], {
        path: "/",
      });
      cookies.set("refreshToken", response.refreshToken, {
        path: "/",
      });
      return response as IUserResponse;
    } else {
      throw new Error("user login failed");
    }
  }
);

export const userRegister = createAsyncThunk<IUserResponse, IUserRegister>(
  "user/userRegister",
  async (form) => {
    const response = await request<IUserResponse>(
      `${API.baseUrl}${API.endpoints.register}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );
    if (response.success) {
      cookies.set("accessToken", response.accessToken.split("Bearer ")[1], {
        path: "/",
      });
      cookies.set("refreshToken", response.refreshToken, {
        path: "/",
      });
      return response as IUserResponse;
    } else {
      throw new Error("user register failed");
    }
  }
);

export const userLogout = createAsyncThunk("user/userLogout", async () => {
  const response = await request<IUserLogout>(
    `${API.baseUrl}${API.endpoints.logout}`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ token: cookies.get("refreshToken") }),
    }
  );
  if (response.success) {
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
  }
});

export const forgotPassword = async (data: string) => {
  const response = await request<{
    success: true;
    message: "Reset email sent";
  }>(`${API.baseUrl}${API.endpoints.forgotPassword}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email: data }),
  });

  return response;
};

export const resetPassword = async (form: IUserResetPassword) => {
  const response = await request<{
    success: true;
    message: "Password successfully reset";
  }>(`${API.baseUrl}${API.endpoints.resetPassword}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ password: form.password, token: form.token }),
  });

  if (response.success) {
    return response;
  }
};

export const checkUserAuth = createAsyncThunk<IUserAuth, undefined>(
  "user/getAuthUserData",
  async () => {
    const response = await fetchWithRefresh<IUserAuth>(
      `${API.baseUrl}${API.endpoints.userData}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + cookies.get("accessToken"),
        },
      }
    );
    if (response.success) {
      return response;
    } else {
      throw new Error("User check failed");
    }
  }
);

export const editUser = createAsyncThunk<IUserAuth, IProfileForm>(
  "user/editUserData",
  async (data) => {
    const response = await fetchWithRefresh<IUserAuth>(
      `${API.baseUrl}${API.endpoints.userData}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          authorization: "Bearer " + cookies.get("accessToken"),
        },
        body: JSON.stringify(data),
      }
    );
    if (response.success) {
      return response;
    } else {
      throw new Error("Edit user info failed");
    }
  }
);
