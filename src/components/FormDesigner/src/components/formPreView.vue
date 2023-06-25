<template>
  <n-modal v-model:show="show" :auto-focus="false" aria-modal="true">
    <n-el class="modal-container">
      <div class="header">
        <div class="title"> {{ formProps.title }} </div>
        <n-icon
          :component="CloseOutlined"
          class="cursor-pointer"
          color="var(--close-icon-color)"
          @click="show = false"
        />
      </div>
      <div class="content">
        <div class="content-container">
          <n-card :bordered="false" :content-style="{ padding: '10px' }">
            <GenerateForm :list="list" :form-props="formProps" :edit="true" ref="formRef" />
          </n-card>
        </div>
      </div>
      <div class="footer">
        <n-space justify="end">
          <n-button secondary @click="show = false">关闭</n-button>
          <n-button secondary type="warning" @click="handleDisable(true)"> 禁用编辑 </n-button>
          <n-button secondary type="success" @click="handleDisable(false)"> 取消禁用 </n-button>
          <n-button type="primary" @click="handleSubmit('sbumit')"> 获取数据 </n-button>
        </n-space>
      </div>
    </n-el>
  </n-modal>
</template>

<script lang="ts" setup>
  import { computed, PropType, ref, reactive, nextTick, watchEffect } from 'vue';
  import { FormItems, GenFormProps } from '../types';
  import { http } from '@/utils/http/axios';
  import GenerateForm from './GenerateForm.vue';
  import { CloseOutlined } from '@vicons/antd';

  const formRef = ref<InstanceType<typeof GenerateForm> | null>(null);
  const props = defineProps({
    list: {
      type: Array as PropType<FormItems[]>,
      required: true,
    },
    formProps: {
      type: Object as PropType<Partial<GenFormProps>>,
      required: true,
    },
  });

  const requestData = ref<Recordable>({});

  const show = ref(false);
  const loading = ref(false);

  /**
   * @description 处理请求数据源
   */

  const handleRequest = async () => {
    const { dataList } = props.formProps;
    if (!dataList) return;
    if (dataList.length) {
      for (const item of dataList) {
        const { requestUrl, requestParams, requestMethod, dataField } = item;
        try {
          const data = await http.request({
            url: requestUrl,
            method: requestMethod.toUpperCase(),
            ...(requestMethod === 'Get'
              ? { params: JSON.parse(requestParams) }
              : { data: JSON.parse(requestParams) }),
          });
          requestData.value[dataField] = data;
        } catch (error) {
          requestData.value = {};
          console.error(`Error making request to ${requestUrl}: ${error}`);
        }
      }
    }
    console.log(requestData.value);
  };

  const openModal = () => {
    show.value = true;
    nextTick(() => {
      formRef.value?.manualInit();
    });
  };

  const handleDisable = (val: boolean) => {
    formRef.value?.handleDisable(val);
  };

  const handleSubmit = (val) => {
    formRef.value?.formRef?.validate((errors) => {
      if (!errors) {
        console.info(formRef.value?.formModel);
      } else {
        console.error(errors);
      }
    });
  };

  // 使用 watchEffect 监听 props 参数的变化
  watchEffect(() => {
    // const { dataList } = unref(getFormPorps);
    // if (props.load && dataList?.length) {
    //   handleRequest();
    // }
  });

  defineExpose({ show, loading, openModal });
</script>

<style lang="less" scoped>
  .modal-container {
    width: auto;

    max-height: 90vh;
    box-sizing: border-box;
    background-color: var(--base-color);
    border-radius: var(--border-radius);
    display: flex;

    flex-direction: column;
    .header {
      width: 100%;
      height: 45px;
      box-sizing: border-box;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      font-size: 18px;
      font-weight: 500;
      position: relative;
      z-index: 999;
      box-shadow: 0 3px 2px -2px rgba(0, 0, 0, 0.1);
    }
    .content {
      flex: 1;
      width: 100%;
      padding: 10px 10px 0;
      max-height: calc(90vh - 117px);
      &-container {
        width: 100%;
        max-height: calc(90vh - 127px);
        padding: 0 10px 0 15px;
        overflow-x: hidden;
        overflow-y: scroll;
      }
    }
    .footer {
      width: 100%;
      flex-shrink: 0;
      padding: 12px 24px 12px 10px;
    }
  }
</style>
