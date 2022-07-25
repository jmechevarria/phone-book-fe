import type { ApiResponse } from "@/types";
import axios from "axios";

interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    name: string;
  };
}

export const login = async (
  payload: LoginPayload
): Promise<ApiResponse<LoginResponse>> => {
  return (await axios.post(`${import.meta.env.VITE_API_URL}/login`, payload))
    .data;
};
