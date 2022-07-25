import ContactDetailsView from "@/views/ContactDetailsView.vue";
import ContactsView from "@/views/ContactsView.vue";
import LoginView from "@/views/LoginView.vue";
import NewContactView from "@/views/NewContactView.vue";
import SignupView from "@/views/SignupView.vue";

import { createRouter, createWebHistory } from "vue-router";

import { getToken } from "@/util/storage-service";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
      beforeEnter: (to, from) => {
        if (getToken()) return "/contacts";

        return true;
      },
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupView,
    },
    {
      path: "/logout",
      name: "logout",
      redirect: "login",
    },
    {
      path: "/contacts",
      name: "contacts",
      component: ContactsView,
      beforeEnter: (to, from) => {
        if (!getToken()) return "/login";

        return true;
      },
    },
    {
      path: "/contacts/new",
      name: "new-contact",
      component: NewContactView,
      beforeEnter: (to, from) => {
        if (!getToken()) return "/login";

        return true;
      },
    },
    {
      path: "/contacts/details/:id",
      name: "contact-details",
      component: ContactDetailsView,
      beforeEnter: (to, from) => {
        if (!getToken()) return "/login";

        return true;
      },
      props: (route) => ({ id: route.params.id }),
    },
    {
      path: "/:catchAll(.*)", // Unrecognized path automatically matches 404
      redirect: "/login",
    },
  ],
});

export default router;
