<template>
  <n-layout-sider bordered class="components-wrapper">
    <n-layout-header class="components-toolbar">
      <n-tabs type="line" animated justify-content="space-around">
        <n-tab name="components">
          <SvgIcon name="components" />
          组件库
        </n-tab>
        <n-tab name="template">
          <SvgIcon name="template" />
          表单模板
        </n-tab>
      </n-tabs>
    </n-layout-header>
    <n-layout
      class="components-content"
      :native-scrollbar="false"
      :content-style="{
        padding: '10px',
      }"
    >
      <n-collapse
        arrow-placement="right"
        :default-expanded-names="[
          'BasicField',
          'ContainerField',
          'AdvancedField',
          'CustomField',
        ]"
      >
        <n-collapse-item
          v-for="(item, index) in formItemsData"
          :key="item.type + '-' + index"
          :title="item.title"
          :name="item.type"
        >
          <Draggable
            :sort="false"
            :list="item.data"
            item-key="icon"
            :group="{ name: 'people', pull: 'clone', put: false }"
            style="
              width: 100%;
              display: grid;
              grid-template-columns: repeat(2, minmax(0px, 1fr));
              gap: 12px;
            "
          >
            <template #item="{ element }">
              <n-button :class="element.icon">
                <template #icon>
                  <SvgIcon :name="element.icon" />
                </template>
                {{ element.label }}
              </n-button>
            </template>
          </Draggable>
        </n-collapse-item>
      </n-collapse>
    </n-layout>
  </n-layout-sider>
</template>

<script lang="ts">
import { FormData } from "../types";
import { SvgIcon } from "@/components/SvgIcon";
import { PropType, defineComponent } from "vue";
import Draggable from "vuedraggable/src/vuedraggable";
import { formItemsData } from "../utils/data";
export default defineComponent({
  name: "formComponents",
  props: {
    comlist: Array as PropType<FormData[]>,
    templist: Array,
  },
  components: { SvgIcon, Draggable },
  setup(props, { emit }) {
    return {
      formItemsData,
    };
  },
});
</script>

<style lang="less" scoped>
.components-content {
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
.components-toolbar {
  .svg-icon {
    font-size: 17px;
    margin-right: 5px;
  }
}
.n-button {
  justify-content: start;
  font-size: 13px;
}
</style>
