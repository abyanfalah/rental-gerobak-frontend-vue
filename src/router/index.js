import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Dashboard.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
      meta: {
        authPage: true,
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

// router.beforeEach((to, from, next) => {
//   if (!authStore.isAuthenticated && !to.meta.authPage) {
//     next("/login");
//   }
// });

export default router;
