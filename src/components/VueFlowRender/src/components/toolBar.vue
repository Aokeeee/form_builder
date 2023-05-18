<template>
  <Panel :position="PanelPosition.TopLeft">
    <n-card
      class="toolbar"
      :bordered="false"
      :content-style="{ padding: '6px' }"
    >
      <n-space align="center">
        <template v-for="item in toolBarData" :key="item.type">
          <n-button
            size="small"
            secondary
            :draggable="true"
            @dragstart="onDragStart($event, item.type)"
          >
            {{ item.label }}
          </n-button>
        </template>
      </n-space>
    </n-card>
  </Panel>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { toolBarData } from "../utils";
import { Panel, PanelPosition } from "@vue-flow/core";

export default defineComponent({
  name: "VueFlowToolBar",
  components: { Panel },
  setup(props, { emit }) {
    function onDragStart(event: DragEvent, nodeType: string) {
      if (event.dataTransfer) {
        event.dataTransfer.setData("application/vueflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
      }
    }
    return { onDragStart, PanelPosition, toolBarData };
  },
});
</script>

<style lang="less" scoped>
.toolbar {
  box-shadow: var(--n-box-shadow);
}
</style>
