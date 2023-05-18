<template>
  <div class="render-wrapper" @drop="onDrop">
    <VueFlow
      v-model="element"
      :default-viewport="{
        zoom: 1.5,
        x: 1.5,
        y: 1.5,
      }"
      :max-zoom="4"
      :min-zoom="0.2"
      @dragover="onDragOver"
    >
      <ToolBar />
      <MiniMap />
      <Controls />
      <Background />
    </VueFlow>
  </div>
</template>

<script lang="ts">
import "@vue-flow/core/dist/style.css";
import "@vue-flow/minimap/dist/style.css";
import "@vue-flow/controls/dist/style.css";
import "@vue-flow/core/dist/theme-default.css";

import { defineComponent, ref } from "vue";
import { MiniMap } from "@vue-flow/minimap";
import { Controls } from "@vue-flow/controls";
import { Background } from "@vue-flow/background";
// import { useDesignStore } from '@/store/modules/design';
import { VueFlow, isNode, useVueFlow, MarkerType } from "@vue-flow/core";
import { useToolBar } from "./hooks/useToolBar";

import ToolBar from "./components/toolBar.vue";

export default defineComponent({
  name: "VueFlowRender",
  props: {
    data: {
      type: Array,
    },
  },
  components: { VueFlow, Background, MiniMap, Controls, ToolBar },
  setup(props, { emit }) {
    // const { darkTheme } = useDesignStore();
    const element = ref([
      {
        id: "1",
        type: "input",
        label: "开始",
        position: { x: 250, y: 0 },
        class: "light",
      },
      {
        id: "2",
        type: "output",
        label: "Node 2",
        position: { x: 100, y: 100 },
        class: "light",
      },
      {
        id: "3",
        label: "Node 3",
        position: { x: 400, y: 100 },
        class: "light",
      },
      {
        id: "4",
        label: "Node 4",
        position: { x: 150, y: 200 },
        class: "light",
      },
      {
        id: "5",
        type: "output",
        label: "结束",
        position: { x: 300, y: 300 },
        class: "light",
      },
      { id: "e1-2", source: "1", target: "2", animated: true },
      {
        id: "e1-3",
        label: "edge with arrowhead",
        source: "1",
        target: "3",
        markerEnd: MarkerType.ArrowClosed,
      },
      {
        id: "e4-5",
        type: "step",
        label: "step-edge",
        source: "4",
        target: "5",
        style: { stroke: "orange" },
        labelBgStyle: { fill: "orange" },
      },
      {
        id: "e3-4",
        type: "smoothstep",
        label: "smoothstep-edge",
        source: "3",
        target: "4",
      },
    ]);

    // const { onPaneReady, onNodeDragStop, onConnect, addEdges, setTransform, toObject } =
    //   useVueFlow({ defaultViewport: { zoom: 1.5, x: 1.5, y: 1.5 }, maxZoom: 4, minZoom: 0.1 });

    // onPaneReady(({ fitView }) => {
    //   fitView();
    // });

    // onNodeDragStop((e) => console.log('drag stop', e));

    // onConnect((params) => addEdges(params));
    const { onDrop, onDragOver } = useToolBar();

    return { element, onDrop, onDragOver };
  },
});
</script>

<style lang="less" scoped>
.render-wrapper {
  width: 100%;
  height: 100%;
}
</style>
