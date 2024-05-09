import { API } from "./constants";
import { IRefreshTokenResponse, TTokenError } from "../types/tokenTypes";
import { cookies } from "../services/feature/user/auth";

export const checkResponse = <T>(respose: Response): Promise<T> => {
  return respose.ok
    ? respose.json()
    : respose.json().then((err) => Promise.reject(err));
};

export const request = <T>(url: string, options?: RequestInit): Promise<T> => {
  return fetch(url, options).then(checkResponse<T>);
};

export const refreshToken = (): Promise<IRefreshTokenResponse> => {
  return request(`${API.baseUrl}${API.endpoints.refreshToken}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ token: cookies.get("refreshToken") }),
  });
};

export const fetchWithRefresh = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  try {
    const res = await request<T>(url, options);
    return res;
  } catch (err: unknown) {
    if ((err as TTokenError).message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      cookies.set("refreshToken", refreshData.refreshToken);
      cookies.set("accessToken", refreshData.accessToken.split("Bearer ")[1]);
      const headers: Record<string, string> = {
        "Content-type": "application/json",
      };
      headers.authorization = refreshData.accessToken;
      const res = await request<T>(url, options);
      return res;
    } else {
      return Promise.reject(err);
    }
  }
};
