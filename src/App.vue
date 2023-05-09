<template>
  <NConfigProvider :theme-overrides="themeOverrides">
    <FormDesigner />
  </NConfigProvider>
</template>

<script lang="ts" setup>
import { NConfigProvider } from "naive-ui";
import { FormDesigner } from "@/components/FormDesigner";
const themeOverrides = {
  Tooltip: {
    padding: "2px 4px",
  },
};
</script>

<style scoped lang="less"></style>
