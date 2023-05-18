import { v4 } from "uuid";
import { ref, watch, nextTick } from "vue";
import { useVueFlow } from "@vue-flow/core";

export function useToolBar() {
  const { findNode, onConnect, addEdges, addNodes, project, vueFlowRef } =
    useVueFlow({});
  function onDragOver(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
  }
  onConnect((params) => addEdges(params));
  function onDrop(event: DragEvent) {
    if (!vueFlowRef.value) return;
    const id = v4().replaceAll("-", "");
    const type = event.dataTransfer?.getData("application/vueflow");
    console.log(type);
    const { left, top } = vueFlowRef.value.getBoundingClientRect();
    const position = project({
      x: event.clientX - left,
      y: event.clientY - top,
    });

    const newNode = {
      id,
      type,
      position,
      label: `${type} node`,
    };
    addNodes([newNode]);

    nextTick(() => {
      const node = findNode(newNode.id);
      if (node) {
        const stop = watch(
          () => node.dimensions,
          (dimensions) => {
            if (dimensions.width > 0 && dimensions.height > 0) {
              node.position = {
                x: node.position.x - node.dimensions.width / 2,
                y: node.position.y - node.dimensions.height / 2,
              };
              stop();
            }
          },
          { deep: true, flush: "post" }
        );
      }
    });
  }
  return {
    onDrop,
    onDragOver,
  };
}
