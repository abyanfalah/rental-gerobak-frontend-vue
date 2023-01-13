import capitalize from "capitalize";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: () => {
        return { name: "dashboard" };
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
      meta: {
        isAuthPage: true,
      },
    },
    // {
    //   path: "/register",
    //   name: "register",
    //   component: () => import("../views/Login.vue"),
    //   meta: {
    //     authPage: true,
    //   },
    // },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/Dashboard.vue"),
    },
    {
      path: "/user",
      name: "user",
      component: () => import("../views/User.vue"),
    },
    {
      path: "/user/registration",
      name: "userRegistration",
      component: () => import("../views/UserRegistration.vue"),
      meta: {
        isImportant: true,
      },
    },
    {
      path: "/user/edit",
      name: "userEdit",
      component: () => import("../views/UserEdit.vue"),
      meta: {
        isImportant: true,
      },
    },
    {
      path: "/customer",
      name: "customer",
      component: () => import("../views/Customer.vue"),
    },
    {
      path: "/gerobak",
      name: "gerobak",
      component: () => import("../views/Gerobak.vue"),
    },
    {
      path: "/gerobak/types",
      name: "gerobakType",
      component: () => import("../views/GerobakType.vue"),
    },
    {
      path: "/rent",
      name: "rent",
      component: () => import("../views/Rent.vue"),
    },
    {
      path: "/rent/:id",
      name: "rentDetail",
      component: () => import("../views/RentDetail.vue"),
      props: true,
      alias: "/rent/:id",
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${import.meta.env.VITE_APP_NAME} - ${capitalize.words(
    to.name
  )}`;

  // auth guard router
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated && !to.meta.isAuthPage) {
    next({ name: "login" });
  } else if (authStore.isAuthenticated && to.meta.isAuthPage) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
