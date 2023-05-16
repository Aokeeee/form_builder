<template>
  <NConfigProvider :theme-overrides="themeOverrides">
    <FormDesigner ref="formBuillder" />

    <n-button
      @click="handleChangeSchemas"
      type="primary"
      style="position: fixed; bottom: 20px; right: 20px; z-index: 99999999"
    >
      click
    </n-button>
  </NConfigProvider>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { NConfigProvider, darkTheme } from "naive-ui";
import { FormDesigner } from "@/components/FormDesigner";
const formBuillder = ref();
const handleChangeSchemas = () => {
  formBuillder.value?.setSchema([
    {
      icon: "date",
      label: "日期选择器",
      component: "NDatePicker",
      key: "47aa0bb48ae6423fbd01b6e134dc35e7",
      field: "date_47aa0bb48ae6423fbd01b6e134dc35e7",
      componentProps: {
        required: false,
        message: "",
        disabled: false,
      },
      columns: null,
    },
  ]);
};
const themeOverrides = {
  Tooltip: {
    padding: "2px 4px",
  },
};
</script>

<style lang="less"></style>
