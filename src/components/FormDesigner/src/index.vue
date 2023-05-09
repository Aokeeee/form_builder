<template>
  <n-layout has-sider class="wrapper">
    <formComponents :comlist="comlist" />
    <formRender v-model:schema="schema" @handle-clear="handleClear" />
    <formSetting />
  </n-layout>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { formItemsData } from "./utils/data";
import { formComponents, formRender, formSetting } from "./components";

export default defineComponent({
  name: "FormDesigner",
  components: { formComponents, formRender, formSetting },
  setup(props, { emit }) {
    const state = reactive({
      schema: [],
    });
    const handleClear = () => {
      console.log("e");
    };

    return {
      comlist: formItemsData,
      ...toRefs(state),
      handleClear,
    };
  },
});
</script>

<style scoped lang="less">
.wrapper {
  width: 100%;
  height: 100%;
  min-width: 1200px;
}
</style>
