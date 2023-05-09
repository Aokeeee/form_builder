import App from "./App.vue";
import { createApp } from "vue";
import { setupNaive } from "@/plugins";
import "virtual:svg-icons-register";
import "./style.css";
import { SvgIcon } from "@/components/SvgIcon";

async function bootstrap() {
  const app = createApp(App);

  //注册ui组件
  setupNaive(app);

  app.component("SvgIcon", SvgIcon);

  //挂载app
  app.mount("#app", true);
}
void bootstrap();
