<template>
  <n-layout-sider class="props-wrapper" width="320px">
    <n-layout-header class="props-toolbar">
      <n-tabs type="line" v-model:value="tabsVal" justify-content="space-around">
        <n-tab name="components_setting">
          <SvgIcon name="componentsetting" />
          组件设置
        </n-tab>
        <n-tab name="form_setting">
          <SvgIcon name="formsetting" />
          表单设置
        </n-tab>
      </n-tabs>
    </n-layout-header>
    <n-layout
      class="props-wrapper-content"
      :native-scrollbar="false"
      :content-style="{
        padding: '10px',
      }"
    >
      <n-form size="small" label-placement="left" label-width="70" :show-feedback="false">
        <n-collapse
          arrow-placement="right"
          :default-expanded-names="['BasicProps', 'AdvancedProps', 'handleProps']"
          v-if="getCurrentData && tabsVal === 'components_setting'"
        >
          <n-collapse-item title="基础属性" name="BasicProps">
            <n-grid :cols="2" x-gap="12" y-gap="12">
              <n-form-item-gi :span="2" :label-style="{ fontSize: '13px' }" label="唯一标识">
                <n-input v-model:value="getCurrentData.field" />
              </n-form-item-gi>
              <n-form-item-gi :span="2" :label-style="{ fontSize: '13px' }" label="标签名称">
                <n-input v-model:value="getCurrentData.label" />
              </n-form-item-gi>
              <n-form-item-gi
                :span="2"
                :label-style="{ fontSize: '13px' }"
                label="默认值"
                v-if="!['NGrid', 'UpLoad'].includes(getCurrentData.component)"
              >
                <component
                  v-if="
                    ['NSelect', 'NInput', 'NInputNumber', 'NTimePicker'].includes(
                      getCurrentData.component
                    )
                  "
                  :is="getCurrentData.component"
                  v-bind="getCurrentData.componentProps"
                  v-model:value="getCurrentData.componentProps.value"
                />
                <n-select
                  multiple
                  :show="false"
                  :show-arrow="false"
                  v-model:value="getCurrentData.componentProps.value"
                  v-else-if="getCurrentData.component === 'NCheckBox'"
                />
                <n-date-picker
                  v-else-if="getCurrentData.component === 'NDatePicker'"
                  v-bind="getCurrentData.componentProps"
                  v-model:formatted-value="getCurrentData.componentProps.formattedValue"
                />

                <n-input v-else v-model:value="getCurrentData.componentProps.value" />
              </n-form-item-gi>
              <n-form-item-gi
                :span="2"
                label="占位符"
                v-if="
                  ['NSelect', 'NInput', 'NInputNumber', 'NDataPicker', 'NTimePicker'].includes(
                    getCurrentData.component
                  )
                "
              >
                <n-input v-model:value="getCurrentData.componentProps.placeholder" />
              </n-form-item-gi>
              <n-form-item-gi
                v-if="getCurrentData.component !== 'NGrid'"
                :span="2"
                :label-style="{ fontSize: '13px' }"
                label="必填字段"
              >
                <n-switch v-model:value="getCurrentData.componentProps.required" />
              </n-form-item-gi>
              <n-form-item-gi
                v-if="getCurrentData.component !== 'NGrid'"
                :span="2"
                :label-style="{ fontSize: '13px' }"
                label="校验提示"
              >
                <n-input v-model:value="getCurrentData.componentProps.message" />
              </n-form-item-gi>
              <n-form-item-gi
                :span="2"
                :label-style="{ fontSize: '13px' }"
                label="组件类型"
                v-if="getCurrentData.component === 'NDatePicker'"
              >
                <n-radio-group
                  v-model:value="getCurrentData.componentProps.type"
                  name="datepickergroup"
                  @update-value="handleSwitch"
                >
                  <n-radio-button
                    v-for="song in datePickerType"
                    :key="song.value"
                    :value="song.value"
                    :label="song.label"
                  />
                </n-radio-group>
              </n-form-item-gi>
              <n-form-item-gi
                :span="2"
                :label-style="{ fontSize: '13px' }"
                v-if="getCurrentData.component === 'NGrid'"
              >
                <div style="width: 100%" class="select-component-toolbar">
                  <n-divider style="margin: 0 0 12px 0; font-size: 13px"> 栅格配置 </n-divider>

                  <n-form-item
                    label="栅格间隔"
                    :label-style="{ fontSize: '13px' }"
                    style="margin-bottom: 12px"
                  >
                    <n-input-number
                      :min="0"
                      placeholder="x"
                      v-model:value="getCurrentData.componentProps.xGap"
                    />
                    <n-divider vertical />
                    <n-input-number
                      :min="0"
                      placeholder="y"
                      v-model:value="getCurrentData.componentProps.yGap"
                    />
                  </n-form-item>
                  <n-divider style="margin: 0 0 12px 0; font-size: 13px"> 当前栅格列 </n-divider>
                  <Draggable
                    item-key="value"
                    :animation="200"
                    handle=".select-component-toolbar-item-drag-btn"
                    :list="getCurrentData.columns"
                  >
                    <template #item="{ element, index }">
                      <transition-group name="fade" tag="div" class="select-component-toolbar-item">
                        <n-space :wrap="false" :key="index" align="center">
                          <div class="select-component-toolbar-item-drag-btn">
                            <SvgIcon name="drag2" />
                          </div>
                          <div style="width: 70px; font-size: 13px">
                            <n-ellipsis style="max-width: 70px">
                              栅格宽度{{ index + 1 }}
                            </n-ellipsis>
                          </div>
                          <n-input-number v-model:value="element.span" :min="1" :max="24" />

                          <div class="select-component-toolbar-item-del-btn">
                            <n-button
                              text
                              type="error"
                              :disabled="getCurrentData.columns.length === 1"
                              @click="getCurrentData.columns.splice(index, 1)"
                            >
                              <template #icon>
                                <SvgIcon name="delete" />
                              </template>
                            </n-button>
                          </div>
                        </n-space>
                      </transition-group>
                    </template>
                  </Draggable>
                  <div class="select-component-toolbar-actions">
                    <n-button
                      text
                      type="info"
                      @click="getCurrentData.columns.push({ span: 12, list: [] })"
                    >
                      增加选项
                    </n-button>
                  </div>
                </div>
              </n-form-item-gi>

              <n-form-item-gi
                v-if="['NSelect', 'EmployeeSelector', 'UpLoad'].includes(getCurrentData.component)"
                :span="2"
                label="是否多选"
                :label-style="{ fontSize: '13px' }"
              >
                <n-switch
                  v-if="['NSelect', 'UpLoad'].includes(getCurrentData.component)"
                  v-model:value="getCurrentData.componentProps.multiple"
                  @update-value="getCurrentData.componentProps.value = null"
                />
                <n-switch
                  v-else
                  v-model:value="getCurrentData.componentProps.selectProps.multiple"
                  @update-value="getCurrentData.componentProps.value = null"
                />
              </n-form-item-gi>
              <n-form-item-gi
                v-if="
                  !['NText', 'NRate', 'NGrid', 'NSlider', 'UpLoad'].includes(
                    getCurrentData.component
                  )
                "
                :span="2"
                label="是否禁用"
                :label-style="{ fontSize: '13px' }"
              >
                <n-switch
                  v-if="getCurrentData.component != 'EmployeeSelector'"
                  v-model:value="getCurrentData.componentProps.disabled"
                  :disabled="getCurrentData.component === 'UpLoad'"
                />
                <n-switch
                  v-model:value="getCurrentData.componentProps.selectProps.disabled"
                  v-else
                />
              </n-form-item-gi>
              <n-form-item-gi
                v-if="
                  !['NText', 'NRate', 'NGrid', 'NSlider', 'NRadio', 'NCheckBox', 'UpLoad'].includes(
                    getCurrentData.component
                  )
                "
                :span="2"
                :label-style="{ fontSize: '13px' }"
                label="可清除"
                label-width="70px"
              >
                <n-switch
                  v-model:value="getCurrentData.componentProps.clearable"
                  v-if="getCurrentData.component != 'EmployeeSelector'"
                />
                <n-switch
                  v-model:value="getCurrentData.componentProps.selectProps.clearable"
                  v-else
                />
              </n-form-item-gi>
              <n-form-item-gi
                :span="2"
                v-if="['NSelect', 'NRadio', 'NCheckBox'].includes(getCurrentData.component)"
              >
                <div style="width: 100%" class="select-component-toolbar">
                  <n-divider style="margin: 0 0 8px 0; font-size: 13px"> 选项设置 </n-divider>
                  <n-tabs
                    v-if="getCurrentData.component === 'NSelect'"
                    type="segment"
                    size="small"
                    style="margin-bottom: 12px"
                    v-model:value="selectTabsVal"
                    @update-value="
                      getCurrentData.componentProps.labelField = 'label';
                      getCurrentData.componentProps.valueField = 'value';
                    "
                  >
                    <n-tab name="static"> 静态数据 </n-tab>
                    <n-tab name="distal"> 远端数据 </n-tab>
                  </n-tabs>

                  <div v-if="selectTabsVal === 'static'">
                    <Draggable
                      v-if="selectTabsVal === 'static'"
                      item-key="value"
                      :animation="200"
                      ghostClass="ghost"
                      handle=".select-component-toolbar-item-drag-btn"
                      :list="
                        getCurrentData.components === 'NSelect'
                          ? getCurrentData.componentProps.defaultOptions
                          : getCurrentData.componentProps.options
                      "
                    >
                      <template #item="{ element, index }">
                        <transition-group
                          name="fade"
                          tag="div"
                          class="select-component-toolbar-item"
                        >
                          <template
                            v-if="
                              getCurrentData.component === 'NCheckBox' ||
                              (getCurrentData.component === 'NSelect' &&
                                getCurrentData.componentProps.multiple)
                            "
                            :key="element.value"
                          >
                            <n-checkbox-group v-model:value="getCurrentData.componentProps.value">
                              <n-space :wrap="false">
                                <div class="select-component-toolbar-item-drag-btn">
                                  <SvgIcon name="drag2" />
                                </div>
                                <div class="select-component-toolbar-item-selectcom">
                                  <n-checkbox
                                    size="large"
                                    :value="element.value"
                                    :disabled="element.disabled"
                                  />
                                </div>
                                <n-input size="small" v-model:value="element.label" />
                                <n-input size="small" v-model:value="element.value" />
                                <div class="select-component-toolbar-item-del-btn">
                                  <n-button
                                    text
                                    type="error"
                                    :disabled="getCurrentData.componentProps.options.length === 1"
                                    @click="getCurrentData.componentProps.options.splice(index, 1)"
                                  >
                                    <template #icon>
                                      <SvgIcon name="delete" />
                                    </template>
                                  </n-button>
                                </div>
                              </n-space>
                            </n-checkbox-group>
                          </template>
                          <template v-else>
                            <n-radio-group
                              :key="element.value"
                              v-model:value="getCurrentData.componentProps.value"
                              name="selectitemradiogroup"
                            >
                              <n-space :wrap="false">
                                <div class="select-component-toolbar-item-drag-btn">
                                  <SvgIcon name="drag2" />
                                </div>
                                <div class="select-component-toolbar-item-selectcom">
                                  <n-radio
                                    size="large"
                                    :key="element.value"
                                    v-model:value="element.value"
                                    :disabled="element.disabled"
                                  />
                                </div>
                                <n-input size="small" v-model:value="element.label" />
                                <n-input size="small" v-model:value="element.value" />
                                <div class="select-component-toolbar-item-del-btn">
                                  <n-button
                                    text
                                    type="error"
                                    :disabled="getCurrentData.componentProps.options.length === 1"
                                    @click="getCurrentData.componentProps.options.splice(index, 1)"
                                  >
                                    <template #icon>
                                      <SvgIcon name="delete" />
                                    </template>
                                  </n-button>
                                </div>
                                <div class="select-component-toolbar-item-dis-btn">
                                  <n-button
                                    text
                                    type="warning"
                                    @click="element.disabled = !element.disabled"
                                  >
                                    <template #icon>
                                      <SvgIcon name="disabled" />
                                    </template>
                                  </n-button>
                                </div>
                              </n-space>
                            </n-radio-group>
                          </template>
                        </transition-group>
                      </template>
                    </Draggable>
                    <div class="select-component-toolbar-actions">
                      <n-space>
                        <n-button
                          text
                          type="info"
                          @click="
                            getCurrentData.componentProps.options.push({
                              label: `${getCurrentData.icon}${
                                getCurrentData.componentProps.options.length + 1
                              }`,
                              value: `${getCurrentData.icon}${
                                getCurrentData.componentProps.options.length + 1
                              }`,
                            })
                          "
                        >
                          增加选项
                        </n-button>
                        <n-button
                          text
                          type="info"
                          @click="getCurrentData.componentProps.value = null"
                        >
                          重置选中项
                        </n-button>
                      </n-space>
                    </div>
                  </div>
                  <div v-else>
                    <n-input-group style="margin-bottom: 12px">
                      <n-input-group-label size="small"> 接 口 </n-input-group-label>
                      <n-input v-model:value="getCurrentData.componentProps.customRemoteAddress" />
                    </n-input-group>
                    <n-input-group style="margin-bottom: 12px">
                      <n-input-group-label size="small"> label </n-input-group-label>
                      <n-input v-model:value="getCurrentData.componentProps.labelField" />
                    </n-input-group>
                    <n-input-group>
                      <n-input-group-label size="small"> value </n-input-group-label>
                      <n-input v-model:value="getCurrentData.componentProps.valueField" />
                    </n-input-group>
                  </div>
                </div>
              </n-form-item-gi>
            </n-grid>
          </n-collapse-item>
        </n-collapse>
        <n-collapse
          arrow-placement="right"
          v-if="tabsVal === 'form_setting' && getFormPorps"
          :default-expanded-names="['FormBasicProps', 'HandleProps']"
        >
          <n-collapse-item title="基础属性" name="FormBasicProps">
            <n-grid :cols="2" x-gap="12" y-gap="12">
              <n-form-item-gi :span="2" :label-style="{ fontSize: '13px' }" label="表单标题">
                <n-input v-model:value="getFormPorps.title" />
              </n-form-item-gi>
              <n-form-item-gi :span="2" :label-style="{ fontSize: '13px' }" label="表单宽度">
                <n-input-number v-model:value="getFormPorps.width" max="1200" min="500" />
              </n-form-item-gi>
              <n-form-item-gi :span="2" :label-style="{ fontSize: '13px' }" label="表单大小">
                <n-radio-group v-model:value="getFormPorps.size" name="sizegroup" size="small">
                  <n-radio-button
                    v-for="item in sizeData"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  />
                </n-radio-group>
              </n-form-item-gi>
              <n-form-item-gi :span="2" :label-style="{ fontSize: '13px' }" label="标签位置">
                <n-radio-group
                  v-model:value="getFormPorps.labelPlacement"
                  name="labelplacementgroup"
                  size="small"
                >
                  <n-radio-button
                    v-for="item in labelPlacementData"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  />
                </n-radio-group>
              </n-form-item-gi>
              <n-form-item-gi :span="2" :label-style="{ fontSize: '13px' }" label="标签对齐">
                <n-radio-group
                  v-model:value="getFormPorps.labelAlign"
                  name="labelaligngroup"
                  size="small"
                >
                  <n-radio-button
                    v-for="item in labelAlignData"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  />
                </n-radio-group>
              </n-form-item-gi>
              <n-form-item-gi :span="2" :label-style="{ fontSize: '13px' }" label="标签宽度">
                <n-input-number
                  v-model:value="(getFormPorps.labelWidth as number)"
                ></n-input-number>
              </n-form-item-gi>
            </n-grid>
          </n-collapse-item>
          <n-collapse-item title="事件属性" name="HandleProps">
            <div class="handle-wrapper">
              <span>onMounted</span>
              <n-button size="small" tertiary round type="primary" @click="show = true">
                编写事件
              </n-button>
            </div>
          </n-collapse-item>
        </n-collapse>
      </n-form>
    </n-layout>
    <n-modal
      preset="dialog"
      size="small"
      :bordered="false"
      v-model:show="show"
      :show-icon="false"
      title="onMounted"
      style="width: auto"
      :mask-closable="false"
      :on-after-leave="handleAfterLeave"
    >
      <n-scrollbar style="max-height: 500px">
        <div class="wrap">
          <div class="data-wrap" v-if="getFormPorps">
            <div class="title flex items-center justify-between">
              <n-h6 prefix="bar" align-text> 请求数据源 </n-h6>
              <n-button
                text
                type="primary"
                @click="
                  getFormPorps.dataList.push({
                    requestMethod: 'Get',
                    requestUrl: '',
                    requestParams: null,
                    dataField: '',
                  })
                "
              >
                新增
              </n-button>
            </div>
            <n-form v-if="getFormPorps" :show-label="false" :show-feedback="false">
              <n-form-item
                v-for="(item, index) in getFormPorps.dataList"
                :key="index"
                :path="`request${index + 1}`"
                class="h-32px mb-8px"
              >
                <n-input-group>
                  <n-select
                    :style="{ width: '15%' }"
                    placeholder="请求方式"
                    v-model:value="item.requestMethod"
                    :options="[
                      { label: 'Post', value: 'Post' },
                      { label: 'Get', value: 'Get' },
                    ]"
                  />
                  <n-input
                    clearable
                    :style="{ width: '45%' }"
                    placeholder="请求地址"
                    v-model:value="item.requestUrl"
                  />
                  <Textarea
                    :style="{ width: '20%' }"
                    :textarea-props="{
                      type: 'text',
                      label: '请求参数',
                      placeholder: '请求参数',
                      value: item.requestParams,
                    }"
                    v-model:value="item.requestParams"
                  />
                  <n-input
                    clearable
                    :style="{ width: '15%' }"
                    placeholder="数据源字段"
                    v-model:value="item.dataField"
                  />
                  <n-button
                    :style="{ width: '5%', height: '32px' }"
                    @click="getFormPorps.dataList.splice(1, index)"
                  >
                    <template #icon>
                      <SvgIcon name="delete" />
                    </template>
                  </n-button>
                </n-input-group>
              </n-form-item>
            </n-form>
          </div>
          <div class="change-wrap"></div>
        </div>
      </n-scrollbar>
      <template #action>
        <n-space>
          <n-button secondary @click="show = false">关闭</n-button>
          <n-button type="primary" @click="handleSubmit">保存</n-button>
        </n-space>
      </template>
    </n-modal>
  </n-layout-sider>
</template>

<script lang="ts">
  import { SvgIcon } from '@/components/SvgIcon';
  import { FormItems, GenFormProps, DataList } from '../types';
  import Draggable from 'vuedraggable/src/vuedraggable';
  import Textarea from '@/components/Textarea/index.vue';
  import { ref, PropType, computed, defineComponent, watchEffect, unref } from 'vue';
  import {
    sizeData,
    formItemPorps,
    labelAlignData,
    datePickerType,
    labelPlacementData,
  } from '../utils/data';
  import { isEmpty } from '@/utils/is';
  import { useMessage } from 'naive-ui';

  export default defineComponent({
    name: 'formSetting',
    components: { SvgIcon, Draggable, Textarea },
    props: {
      currentData: Object as PropType<FormItems>,
      formProps: Object as PropType<GenFormProps>,
    },
    emits: ['update:currentData'],
    setup(props, { emit }) {
      const msg = useMessage();
      const tabsVal = ref('components_setting');
      const selectTabsVal = ref('static');
      const getFormPorps = computed(() => props.formProps ?? undefined);
      const getCurrentData = computed(() => props.currentData ?? undefined);
      const count = ref(0);
      const handleAddSelectItem = () => {};
      const handleResetSelectDefaultValue = () => {};
      const handleDeleteSelectItem = (options: any[], index: number) => {};

      watchEffect(() => {
        if (getCurrentData.value && Object.values(getCurrentData.value).length > 0) {
          tabsVal.value = 'components_setting';
        } else {
          tabsVal.value = 'form_setting';
        }
        if (getCurrentData.value?.component !== 'NSelect') {
          selectTabsVal.value = 'static';
        }
      });

      const show = ref(false);

      const handleSubmit = (e: Event) => {
        e.preventDefault();
        if (getFormPorps.value?.dataList.length) {
          const valuesNotNull = getFormPorps.value.dataList.every((obj) =>
            Object.values(obj).every((value) => !isEmpty(value))
          );
          if (!valuesNotNull) {
            msg.error('请填写完整，关闭弹窗将不会保存未填写完整的数据');
          } else {
            show.value = false;
          }
        }
      };

      const handleAfterLeave = () => {
        if (getFormPorps.value?.dataList.length) {
          getFormPorps.value.dataList = getFormPorps.value?.dataList.filter((obj) =>
            Object.values(obj).every((value) => !isEmpty(value))
          );
        }
      };

      const handleSwitch = (val) => {
        if (!getCurrentData.value) return;
        getCurrentData.value.componentProps.formattedValue = null;
        getCurrentData.value.componentProps.valueFormat = 'yyyy-MM-dd HH:mm:ss';
      };

      return {
        show,
        count,
        tabsVal,
        sizeData,
        handleSubmit,
        getFormPorps,
        selectTabsVal,
        getCurrentData,
        labelAlignData,
        datePickerType,
        handleSwitch,
        labelPlacementData,
        handleAfterLeave,
        handleAddSelectItem,
        handleDeleteSelectItem,
        handleResetSelectDefaultValue,
        propsList: formItemPorps,
      };
    },
  });
</script>

<style lang="less" scoped>
  .props-toolbar,
  .props-wrapper-content {
    border-left: 1px solid var(--n-border-color);

    .svg-icon {
      font-size: 17px;
      margin-right: 5px;
    }
  }

  .props-wrapper {
    &-content {
      height: calc(100% - 42px);
      width: 100%;
      overflow: hidden;

      .svg-icon {
        font-size: 16px;
        margin: 0;
      }

      :deep(.n-collapse) {
        .n-collapse-item__header-main {
          justify-content: space-between;
          font-weight: bold !important;
        }

        .n-collapse-item__content-inner {
          padding: 16px 6px 0;

          .handle-wrapper {
            display: flex;
            align-items: center;

            .n-button {
              margin-left: 40px;
            }
          }
          .select-component-toolbar {
            width: 100%;

            &-item {
              &:not(:last-child) {
                margin-bottom: 6px;
              }

              &-selectcom {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: start;
              }

              &-drag-btn,
              &-del-btn,
              &-dis-btn {
                height: 100%;
                display: flex;
                cursor: pointer;
                align-items: center;
                justify-content: start;

                .svg-icon {
                  font-size: 18px;
                }
              }
              &-drag-btn {
                cursor: move;
              }
            }

            &-actions {
              box-sizing: border-box;
              width: 100%;
              padding: 8px;
            }
          }

          .n-radio-button {
            padding: 0 8px;
          }

          // .n-radio-group .n-radio-button.n-radio-button--checked {
          //   background: var(--n-button-text-color-active);
          //   color: var(--n-color);
          // }
        }
      }
    }
  }
  .wrap {
    width: 760px;
    padding-right: 10px;
    .n-form {
      padding: 5px 10px;
      width: 100%;
      height: auto;
    }
    .title {
      padding: 0 15px;
      margin-bottom: 10px;
      h6 {
        font-size: 15px;
        line-height: 15px;
      }
    }
    .label-wrap {
      p {
        color: #5e5e5c;
      }
    }
  }
</style>
