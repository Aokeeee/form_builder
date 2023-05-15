<template>
  <n-modal
    preset="dialog"
    size="small"
    :bordered="false"
    v-model:show="show"
    :show-icon="false"
    :mask-closable="false"
    :title="getFormPorps.title"
    style="width: auto"
  >
    <n-scrollbar style="max-height: 500px">
      <n-form
        v-bind="getFormPorps"
        :style="{
          width: getFormPorps.width + 'px',
        }"
      >
        <template v-for="item in getFormList" :key="item.key">
          <n-grid
            v-bind="item.componentProps"
            v-if="item.component === 'NGrid'"
          >
            <n-gi
              v-for="(gi, index) in item.columns"
              :span="gi.span"
              :key="`${item.key}-${index}`"
            >
              <n-form-item
                v-for="formItem in gi.list"
                :key="formItem.key"
                :label="formItem.label"
              >
                <n-radio-group
                  v-if="formItem.component === 'NRadio'"
                  v-bind="formItem.componentProps"
                  v-model:value="formItem.componentProps.value"
                >
                  <n-radio
                    v-for="option in formItem.componentProps.options"
                    :key="option.value"
                    :value="option.value"
                    :disabled="option.disabled"
                    :label="option.label"
                  />
                </n-radio-group>

                <n-checkbox-group
                  v-else-if="formItem.component === 'NCheckBox'"
                  v-bind="formItem.componentProps"
                  v-model:value="formItem.componentProps.value"
                >
                  <n-checkbox
                    v-for="option in formItem.componentProps.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                    :disabled="option.disabled"
                  />
                </n-checkbox-group>

                <component
                  v-else
                  :is="formItem.component"
                  v-bind="formItem.componentProps"
                  v-model:value="formItem.componentProps.value"
                />
              </n-form-item>
            </n-gi>
          </n-grid>
          <n-form-item v-else :span="item.span" :label="item.label">
            <n-radio-group
              v-if="item.component === 'NRadio'"
              v-bind="item.componentProps"
              v-model:value="item.componentProps.value"
            >
              <n-radio
                v-for="option in item.componentProps.options"
                :key="option.value"
                :value="option.value"
                :label="option.label"
                :disabled="option.disabled"
              />
            </n-radio-group>

            <n-checkbox-group
              v-else-if="item.component === 'NCheckBox'"
              v-bind="item.componentProps"
              v-model:value="item.componentProps.value"
            >
              <n-checkbox
                v-for="option in item.componentProps.options"
                :key="option.value"
                :value="option.value"
                :label="option.label"
                :disabled="option.disabled"
              />
            </n-checkbox-group>

            <component
              v-else
              :is="item.component"
              v-bind="item.componentProps"
              v-model:value="item.componentProps.value"
            />
          </n-form-item>
        </template>
      </n-form>
    </n-scrollbar>
  </n-modal>
</template>

<script lang="ts" setup>
import { computed, PropType, ref } from "vue";
import { FormItems, GenFormProps } from "../types";
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

const show = ref(false);
const getFormPorps = computed(() => props.formProps ?? {});
const getFormList = computed(() => props.list ?? {});

const openModal = () => {
  show.value = true;
};

defineExpose({ show, openModal });
</script>

<style lang="less" scoped>
.n-form {
  padding: 10px 15px;
}
</style>
