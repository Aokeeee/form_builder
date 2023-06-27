import App from "./App.vue";
import { createApp } from "vue";
import { setupNaive } from "@/plugins";
import "virtual:svg-icons-register";
import "./style.css";
import { SvgIcon } from "@/components/SvgIcon";
import router, { setupRouter } from "@/router";

async function bootstrap() {
  const app = createApp(App);

  //注册ui组件
  setupNaive(app);

  app.component("SvgIcon", SvgIcon);
  // 挂载路由
  setupRouter(app);

  // 路由准备就绪后挂载APP实例
  await router.isReady();
  //挂载app
  app.mount("#app", true);
}
void bootstrap();
