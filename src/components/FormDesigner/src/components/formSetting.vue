<template>
  <n-layout-sider class="props-wrapper">
    <n-layout-header class="props-toolbar">
      <n-tabs type="line" justify-content="space-around">
        <n-tab name="components_setting"> 组件设置 </n-tab>
        <n-tab name="form_setting"> 表单设置 </n-tab>
      </n-tabs>
    </n-layout-header>
  </n-layout-sider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "formSetting",
  // props: {},
  components: {},
  setup(props, { emit }) {
    return {};
  },
});
</script>

<style lang="less" scoped>
.props-wrapper,
.props-toolbar {
  border-left: 1px solid var(--n-border-color);
}
</style>
