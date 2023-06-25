<template>
  <n-form
    v-bind="getFormPorps"
    :model="formModel"
    :style="{
      width: getFormPorps.width + 'px',
    }"
    ref="formRef"
  >
    <template v-for="item in getFormList" :key="item.key">
      <n-grid v-bind="item.componentProps" v-if="item.component === 'NGrid'">
        <n-gi v-for="(gi, index) in item.columns" :span="gi.span" :key="`${item.key}-${index}`">
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

            <UpLoad
              :edit="edit"
              v-bind="formItem.componentProps"
              v-model:value="formModel[formItem.field]"
              v-else-if="formItem.component === 'UpLoad'"
            />

            <EmployeeSelector
              v-bind="formItem.componentProps"
              v-model:value="formModel[formItem.field]"
              v-else-if="formItem.component === 'EmployeeSelector'"
            />

            <n-date-picker
              v-bind="formItem.componentProps"
              v-model:formatted-value="formItem.componentProps.value"
              v-else-if="formItem.component === 'NDatePicker'"
            />

            <component
              v-else
              :is="formItem.component"
              v-bind="formItem.componentProps"
              v-model:value="formModel[formItem.field]"
            />
          </n-form-item>
        </n-gi>
      </n-grid>
      <n-form-item v-else :span="item.span" :label="item.label" :path="item.field">
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

        <UpLoad
          :edit="edit"
          v-bind="item.componentProps"
          v-model:value="formModel[item.field]"
          v-else-if="item.component === 'UpLoad'"
        />

        <EmployeeSelector
          v-bind="item.componentProps"
          v-model:value="formModel[item.field]"
          v-else-if="item.component === 'EmployeeSelector'"
        />

        <n-date-picker
          v-bind="item.componentProps"
          v-model:formatted-value="item.componentProps.value"
          v-else-if="item.component === 'NDatePicker'"
        />
        <component
          v-else
          :is="item.component"
          v-bind="item.componentProps"
          v-model:value="formModel[item.field]"
        />
      </n-form-item>
    </template>
  </n-form>
</template>

<script lang="ts">
  import { FormItems, GenFormProps } from '../types';
  import { EmployeeSelector } from '@/components/EmployeeSelector';
  import { defineComponent, reactive, computed, ref, unref, watch } from 'vue';
  import { initFormValues } from '../utils/init';
  import { UpLoad } from '@/components/UpLoad';

  export default defineComponent({
    name: 'GenerateForm',
    props: {
      list: {
        type: Array as PropType<FormItems[]>,
        required: true,
      },
      formProps: {
        type: Object as PropType<Partial<GenFormProps>>,
        required: true,
      },
      edit: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['submit'],
    components: { EmployeeSelector, UpLoad },
    setup(props, { emit }) {
      const formRef = ref();
      const formModel = reactive<Recordable>({});
      const formRules = reactive<Recordable>({});
      const getFormList = computed(() => props.list);
      const isUpdateDefaultRef = ref(false);
      const getFormPorps = computed(() => {
        return {
          ...props.formProps,
          rules: {
            ...formRules,
          },
        };
      });

      watch(
        () => getFormList.value,
        (schema) => {
          if (unref(isUpdateDefaultRef)) {
            return;
          }
          if (schema?.length) {
            initFormValues(props.list, formModel, formRules);
            isUpdateDefaultRef.value = true;
          }
        }
      );

      const handleDisable = (val: boolean) => {
        const schemas = unref(props.list);
        schemas.length &&
          schemas.forEach((item) => {
            if (item.component === 'NGrid') {
              if (item.columns && item.columns.length)
                item.columns.forEach((parent) => {
                  if (parent.list && parent.list.length) {
                    parent.list.forEach((child) => {
                      child.componentProps.disabled = val;
                    });
                  }
                });
            } else {
              if (item.component === 'EmployeeSelector') {
                item.componentProps.selectProps.disabled = val;
              } else {
                item.componentProps.disabled = val;
              }
            }
          });
      };
      const manualInit = () => {
        initFormValues(props.list, formModel, formRules);
      };
      return {
        formRef,
        formModel,
        formRules,
        getFormList,
        getFormPorps,
        handleDisable,
        manualInit,
      };
    },
  });
</script>

<style lang="less" scoped></style>
