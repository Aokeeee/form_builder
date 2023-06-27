import { isNavigationFailure, Router } from "vue-router";

export function createRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
    }
  });
}
