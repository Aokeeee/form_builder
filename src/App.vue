<template>
  <NConfigProvider :theme-overrides="themeOverrides" :locale="zhCN">
    <AppProvider> <router-view /> </AppProvider>
  </NConfigProvider>
</template>

<script lang="ts" setup>
import { NConfigProvider, zhCN } from "naive-ui";
import { appTheme } from "@/setting/theme";
import { lighten } from "@/utils";
import { AppProvider } from "@/components/Application";
const lightenStr = lighten(appTheme, 6);
const themeOverrides = {
  common: {
    primaryColor: appTheme,
    primaryColorHover: lightenStr,
    primaryColorPressed: lightenStr,
    primaryColorSuppl: appTheme,
  },
  LoadingBar: {
    colorLoading: appTheme,
  },
};
</script>

<style lang="less"></style>
