import router from "@/router";
import { defineStore } from "pinia";

import { login as apiLogin, signup as apiSignup } from "@/api";
import {
  clearStorage,
  getToken,
  getUser,
  persistToken,
  persistUser,
} from "@/util/storage-service";

interface StoreState {
  token: string | null;
  name: string | null;
}

interface ActionTree {
  login(payload: { email: string; password: string }): Promise<string>;
  signup(payload: {
    name: string;
    email: string;
    password: string;
  }): Promise<string>;
  logout(): void;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const useAuthStore = defineStore<"auth", StoreState, {}, ActionTree>({
  id: "auth",

  state: () => ({
    token: getToken(),
    name: getUser().name,
  }),

  actions: {
    async login(payload) {
      const {
        result: {
          token,
          user: { name },
        },
      } = await apiLogin(payload);

      this.token = token;
      this.name = name;
      persistToken(this.token || "");
      persistUser({
        name: this.name || "",
      });
      return token;
    },

    async signup(payload) {
      const {
        result: {
          token,
          user: { name },
        },
      } = await apiSignup(payload);

      this.token = token;
      this.name = name;
      persistToken(this.token || "");
      persistUser({
        name: this.name || "",
      });
      return token;
    },

    logout() {
      this.token = "";
      this.name = "";
      clearStorage();
      router.push("/login");
    },
  },
});
