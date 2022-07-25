import { UnauthorizedException } from "@/errors";
import type { ApiResponse, Contact } from "@/types";
import { getToken } from "@/util/storage-service";
import axios from "axios";

interface ContactsPayload {
  id?: number;
  limit?: number;
  offset?: number;
}

export interface ContactsResponse {
  contacts: Contact[];
}

export const fetchContacts = async (
  payload: ContactsPayload
): Promise<ApiResponse<ContactsResponse>> => {
  const token = getToken();

  if (token) {
    payload.limit = payload.id ? 1 : payload.limit;
    payload.offset = payload.id ? 0 : payload.offset;

    return (
      await axios.get(
        `${import.meta.env.VITE_API_URL}/contacts/${payload.id || ""}?limit=${
          payload.limit || ""
        }&offset=${payload.offset || ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    ).data;
  } else throw new UnauthorizedException("No token provided");
};
