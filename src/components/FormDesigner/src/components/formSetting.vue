<template>
  <n-layout-sider class="props-wrapper">
    <n-layout-header class="props-toolbar">
      <n-tabs
        type="line"
        :value="getCurrentData ? 'components_setting' : 'form_setting'"
        justify-content="space-around"
      >
        <n-tab name="components_setting">
          <SvgIcon name="componentsetting" />
          组件设置
        </n-tab>
        <n-tab name="form_setting">
          <SvgIcon name="formsetting" />
          表单设置
        </n-tab>
      </n-tabs>
    </n-layout-header>
    <n-layout
      class="props-wrapper-content"
      :native-scrollbar="false"
      :content-style="{
        padding: '10px',
      }"
    >
      <n-form size="small" label-placement="left" label-width="80px">
        <n-collapse
          arrow-placement="right"
          :default-expanded-names="[
            'BasicProps',
            'AdvancedProps',
            'handleProps',
          ]"
          v-if="getCurrentData"
        >
          <n-collapse-item title="基础属性" name="BasicProps">
            <n-form-item :label-style="{ fontSize: '13px' }" label="唯一标识">
              <n-input v-model:value="getCurrentData.id"></n-input>
            </n-form-item>
            <n-form-item :label-style="{ fontSize: '13px' }" label="标签">
              <n-input v-model:value="getCurrentData.icon"></n-input>
            </n-form-item>
            <n-form-item :label-style="{ fontSize: '13px' }" label="默认值">
              <n-input
                v-model:value="getCurrentData.componentProps.value"
              ></n-input>
            </n-form-item>
          </n-collapse-item>
        </n-collapse>
      </n-form>
    </n-layout>
  </n-layout-sider>
</template>

<script lang="ts">
import { ref, PropType, computed, defineComponent } from "vue";
import { FormItems } from "../types";
import { formItemPorps } from "../utils/data";
import { SvgIcon } from "@/components/SvgIcon";
export default defineComponent({
  name: "formSetting",
  components: { SvgIcon },
  props: {
    currentData: Object as PropType<FormItems>,
  },
  setup(props) {
    const getCurrentData = computed(() => props.currentData ?? undefined);

    return {
      propsList: formItemPorps,
      getCurrentData,
    };
  },
});
</script>

<style lang="less" scoped>
.props-toolbar,
.props-wrapper-content {
  border-left: 1px solid var(--n-border-color);
  .svg-icon {
    font-size: 17px;
    margin-right: 5px;
  }
}
.props-wrapper {
  &-content {
    height: calc(100% - 42px);
    :deep(.n-collapse) {
      .n-collapse-item__header-main {
        justify-content: space-between;

        font-weight: bold !important;
      }
      .n-collapse-item__content-inner {
        padding: 16px 6px 0;
      }
    }
  }
}
</style>
