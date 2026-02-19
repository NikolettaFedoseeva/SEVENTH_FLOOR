import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { HomePage, CatalogPage, ContactsPage } from "@/pages";
import { PropertyDetailPage } from "@/pages/property-detail";
import { LoginPage } from "@/pages/admin"; // We will export this soon
import { useSessionStore } from "@/entities/session";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/catalog",
    name: "Catalog",
    component: CatalogPage,
  },
  {
    path: "/catalog/:id",
    name: "PropertyDetail",
    component: PropertyDetailPage,
  },
  {
    path: "/contacts",
    name: "Contacts",
    component: ContactsPage,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/admin",
    name: "Admin",
    // Lazy load layout to avoid circular dependencies if we move files around
    component: () => import("@/pages/admin/ui/AdminLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "AdminDashboard",
        component: () => import("@/pages/admin/ui/DashboardPage.vue"), // Will create this
      },
      {
        path: "properties/create",
        name: "CreateProperty",
        component: () => import("@/pages/admin/ui/CreatePropertyPage.vue"), // Will create this
      },
      {
        path: "properties/:id/edit",
        name: "EditProperty",
        component: () => import("@/pages/admin/ui/EditPropertyPage.vue"),
      },
    ],
  },
  // Fallback
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach(async (to, from, next) => {
  const session = useSessionStore();
  
  // Check auth state if not already authenticated
  if (!session.isAuth) {
    await session.checkAuth();
  }

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !session.isAuth) {
    next({ name: "Login" });
  } else if (to.name === "Login" && session.isAuth) {
    next({ name: "Admin" });
  } else {
    next();
  }
});

export default router;
