import { UnauthorizedException } from "@/errors";
import type { ApiResponse, Contact } from "@/types";
import { cache, retrieve } from "@/util/cache-service";
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
    const url = `${import.meta.env.VITE_API_URL}/contacts/${
      payload.id || ""
    }?limit=${payload.limit || ""}&offset=${payload.offset || ""}`;

    if (payload?.id) {
      const localData = retrieve(url);

      if (localData !== "stale") return localData;
    }

    console.warn("Hitting server");

    payload.limit = payload.id ? 1 : payload.limit;
    payload.offset = payload.id ? 0 : payload.offset;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (payload?.id) {
      cache(url, data);
    }

    return data;
  } else throw new UnauthorizedException("No token provided");
};
