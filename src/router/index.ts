import { App } from "vue";
import { RouteRecordRaw, createWebHashHistory, createRouter } from "vue-router";

const constantRouter: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Root",
    redirect: "/index",
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    name: "Index",
    path: "/index",
    component: () => import("@/views/Index/index.vue"),
  },
];

export const router = createRouter({
  history: createWebHashHistory(""),
  routes: constantRouter,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  // createRouterGuards(router);
}
export default router;
