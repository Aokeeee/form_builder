<template>
  <n-modal
    preset="dialog"
    size="small"
    :bordered="false"
    v-model:show="show"
    title="生成Json"
    style="width: 700px"
    :show-icon="false"
    :mask-closable="false"
  >
    <div class="json-wrapper">
      <n-scrollbar style="max-height: 500px">
        <JsonViewer boxed copyable :value="jsonData" :expand-depth="5">
          <template #copy="{ copied }">
            <n-button text type="primary">
              {{ copied ? "copied!!" : "copy" }}</n-button
            >
          </template>
        </JsonViewer>
      </n-scrollbar>
    </div>
    <template #action>
      <n-space>
        <n-button secondary @click="show = false">关闭</n-button>
        <n-button type="primary" @click="handleExportForJson"
          >下载文件</n-button
        >
      </n-space>
    </template>
  </n-modal>
</template>

<script lang="ts" setup>
import JsonViewer from "vue-json-viewer";
import { FormItems, GenFormProps } from "../types";
import { PropType, computed, ref } from "vue";

const show = ref(false);

const props = defineProps({
  list: {
    type: Array as PropType<FormItems[]>,
    required: true,
  },
  formProps: {
    type: Object as PropType<GenFormProps>,
    required: true,
  },
});

const jsonData = computed(() => {
  return {
    formConfig: props.formProps,
    formList: props.list,
  };
});

const openModal = () => {
  show.value = true;
};

const handleExportForJson = () => {
  const jsonDataStr = JSON.stringify(jsonData.value, null, 4);
  const blob = new Blob([jsonDataStr], { type: "application/json" });
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = `${jsonData.value.formConfig.title}.json`;
  downloadLink.click();
  URL.revokeObjectURL(downloadLink.href);
};

defineExpose({ show, openModal });
</script>

<style lang="less" scoped>
.json-wrapper {
  width: 100%;
}
</style>
