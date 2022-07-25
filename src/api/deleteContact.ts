import { UnauthorizedException } from "@/errors";
import { getToken } from "@/util/storage-service";
import axios from "axios";

interface DeleteContactsPayload {
  id?: number;
}

export const deleteContacts = async (
  payload: DeleteContactsPayload
): Promise<void> => {
  const token = getToken();

  if (token)
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/contacts/${payload.id || ""}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  else throw new UnauthorizedException("No token provided");
};
