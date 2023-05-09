<template>
  <n-layout-sider class="props-wrapper">
    <n-layout-header class="props-toolbar">
      <n-tabs type="line" animated justify-content="space-around">
        <n-tab-pane name="components_setting" tab="组件设置">
          {{ $props.currentData }}
        </n-tab-pane>
        <n-tab-pane name="form_setting" tab="表单设置"> Hey Jude </n-tab-pane>
      </n-tabs>
    </n-layout-header>
  </n-layout-sider>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import { FormItems } from "../types";
export default defineComponent({
  name: "formSetting",
  components: {},
  props: {
    currentData: Object as PropType<FormItems>,
  },
  setup() {
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
