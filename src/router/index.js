import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Dashboard.vue"),
      redirect: (to) => {
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
  ],
});

router.beforeEach((to, from, next) => {
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
