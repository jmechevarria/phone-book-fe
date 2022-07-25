import type { ApiResponse } from "@/types";
import axios from "axios";

interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  token: string;
  user: {
    name: string;
  };
}

export const signup = async (
  payload: SignupPayload
): Promise<ApiResponse<SignupResponse>> => {
  return (await axios.post(`${import.meta.env.VITE_API_URL}/signup`, payload))
    .data;
};
