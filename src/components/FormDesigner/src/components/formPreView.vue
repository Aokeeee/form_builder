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
        :model="formModel"
        :style="{
          width: getFormPorps.width + 'px',
        }"
        ref="formRef"
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
                :path="formItem.field"
              >
                <n-radio-group
                  v-if="formItem.component === 'NRadio'"
                  v-bind="formItem.componentProps"
                  v-model:value="formModel[formItem.field]"
                >
                  <n-radio
                    v-for="option in formItem.componentProps.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                  />
                </n-radio-group>

                <n-checkbox-group
                  v-else-if="formItem.component === 'NCheckBox'"
                  v-bind="formItem.componentProps"
                  v-model:value="formModel[formItem.field]"
                >
                  <n-checkbox
                    v-for="option in formItem.componentProps.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                  />
                </n-checkbox-group>

                <component
                  v-else
                  :is="formItem.component"
                  v-bind="formItem.componentProps"
                  v-model:value="formModel[formItem.field]"
                />
              </n-form-item>
            </n-gi>
          </n-grid>
          <n-form-item
            v-else
            :span="item.span"
            :label="item.label"
            :path="item.field"
          >
            <n-radio-group
              v-if="item.component === 'NRadio'"
              v-bind="item.componentProps"
              v-model:value="formModel[item.field]"
            >
              <n-radio
                v-for="option in item.componentProps.options"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </n-radio-group>

            <n-checkbox-group
              v-else-if="item.component === 'NCheckBox'"
              v-bind="item.componentProps"
              v-model:value="formModel[item.field]"
            >
              <n-checkbox
                v-for="option in item.componentProps.options"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </n-checkbox-group>

            <component
              v-else
              :is="item.component"
              v-bind="item.componentProps"
              v-model:value="formModel[item.field]"
            />
          </n-form-item>
        </template>
      </n-form>
    </n-scrollbar>
    <template #action>
      <n-space>
        <n-button secondary @click="show = false">关闭</n-button>
        <n-button secondary type="warning" @click="handleDisable(true)">
          禁用编辑
        </n-button>
        <n-button secondary type="success" @click="handleDisable(false)">
          取消禁用
        </n-button>
        <n-button type="primary" @click="handleSubmit">获取数据</n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script lang="ts" setup>
import { computed, PropType, ref, reactive, unref } from "vue";
import { FormItems, GenFormProps } from "../types";
import { genFormComponentTriggerData } from "../utils/helper";

type Recordable<T = any> = Record<string, T>;

const formRef = ref();
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
const formModel = reactive<Recordable>({});
const formRules = reactive<Recordable>({});

const getFormPorps = computed(() => {
  return {
    ...props.formProps,
    rules: {
      ...formRules,
    },
  };
});

const getFormList = computed(() => props.list ?? {});

/**
 * @description 初始化表单默认值和校验规则
 */
const initFormValues = () => {
  const schemas = unref(props.list);
  schemas.forEach((item) => {
    if (item.component != "NGrid") {
      const { value, required, message } = item.componentProps;
      formModel[item.field] = value;
      if (required && required === true) {
        formRules[item.field] = {
          required: required,
          message: message,
          ...genFormComponentTriggerData(item.component, item.componentProps),
        };
      }
    } else {
      const { columns } = item;
      if (columns && columns.length) {
        columns.forEach((parent) => {
          parent.list.forEach((child) => {
            const { value, required, message } = child.componentProps;
            formModel[child.field] = value;
            if (required && required === true) {
              formRules[child.field] = {
                required: required,
                message: message,
                ...genFormComponentTriggerData(
                  child.component,
                  child.componentProps
                ),
              };
            }
          });
        });
      }
    }
  });
  console.log(getFormPorps.value);
};

const handleDisable = (val: boolean) => {
  const schemas = unref(props.list);
  schemas.length &&
    schemas.forEach((item) => {
      if (item.component === "NGrid") {
        if (item.columns && item.columns.length)
          item.columns.forEach((parent) => {
            if (parent.list && parent.list.length) {
              parent.list.forEach((child) => {
                child.componentProps.disabled = val;
              });
            }
          });
      } else {
        item.componentProps.disabled = val;
      }
    });
};

const openModal = () => {
  initFormValues();
  show.value = true;
};

const handleSubmit = (e: Event) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.info(formModel);
    } else {
      console.error(errors);
    }
  });
};

defineExpose({ show, openModal });
</script>

<style lang="less" scoped>
.n-form {
  padding: 0 15px;
}
</style>
