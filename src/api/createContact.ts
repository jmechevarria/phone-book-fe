import { UnauthorizedException } from "@/errors";
import type { CreateContact } from "@/types";
import { getToken } from "@/util/storage-service";
import axios from "axios";

export const createContact = async (payload: CreateContact): Promise<void> => {
  const token = getToken();

  if (token)
    await axios.post(`${import.meta.env.VITE_API_URL}/contacts`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  else throw new UnauthorizedException("No token provided");
};
