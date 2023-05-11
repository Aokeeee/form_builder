<template>
  <n-layout-sider class="props-wrapper" width="320px">
    <n-layout-header class="props-toolbar">
      <n-tabs
        type="line"
        v-model:value="tabsVal"
        justify-content="space-around"
      >
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
      <n-form
        size="small"
        label-placement="left"
        label-width="70"
        :show-feedback="false"
      >
        <n-collapse
          arrow-placement="right"
          :default-expanded-names="[
            'BasicProps',
            'AdvancedProps',
            'handleProps',
          ]"
          v-if="getCurrentData && tabsVal === 'components_setting'"
        >
          <n-collapse-item title="基础属性" name="BasicProps">
            <n-grid :cols="2" x-gap="12" y-gap="12">
              <n-form-item-gi
                :span="2"
                :label-style="{ fontSize: '13px' }"
                label="唯一标识"
              >
                <n-input v-model:value="getCurrentData.id" />
              </n-form-item-gi>
              <n-form-item-gi
                :span="2"
                :label-style="{ fontSize: '13px' }"
                label="标签"
              >
                <n-input v-model:value="getCurrentData.icon" disabled />
              </n-form-item-gi>
              <n-form-item-gi
                :span="2"
                :label-style="{ fontSize: '13px' }"
                label="默认值"
              >
                <n-input v-model:value="getCurrentData.componentProps.value" />
              </n-form-item-gi>
              <n-form-item-gi
                v-if="
                  !['NText', 'NRate', 'NGrid', 'NSlider'].includes(
                    getCurrentData.component
                  )
                "
                :span="2"
                :label-style="{ fontSize: '13px' }"
                label="是否禁用"
              >
                <n-switch
                  v-model:value="getCurrentData.componentProps.disabled"
                />
              </n-form-item-gi>
              <n-form-item-gi
                v-if="
                  ![
                    'NText',
                    'NRate',
                    'NGrid',
                    'NSlider',
                    'NRadio',
                    'NCheckBox',
                  ].includes(getCurrentData.component)
                "
                :span="2"
                :label-style="{ fontSize: '13px' }"
                label="可清除"
                label-width="70px"
              >
                <n-switch
                  v-model:value="getCurrentData.componentProps.clearable"
                />
              </n-form-item-gi>
              <n-form-item-gi
                :span="2"
                v-if="
                  ['NSelect', 'NRadio', 'NCheckBox'].includes(
                    getCurrentData.component
                  )
                "
              >
                <div style="width: 100%" class="select-componet-toolbar">
                  <n-divider style="margin: 0 0 5px 0"> 选项设置 </n-divider>
                  <Draggable
                    item-key="value"
                    :animation="200"
                    ghostClass="ghost"
                    handle=".item-drag-btn"
                    :list="getCurrentData.componentProps.options"
                  >
                    <template #item="{ element, index }">
                      <transition-group
                        name="fade"
                        tag="div"
                        class="select-componet-toolbar-item"
                      >
                        <n-grid :cols="9" x-gap="6" :key="element.value">
                          <n-gi :span="1"><n-checkbox></n-checkbox></n-gi>
                          <n-gi :span="3"> <n-input /></n-gi>
                          <n-gi :span="3"> <n-input /></n-gi>
                          <n-gi :span="1">
                            <n-button strong secondary circle type="error">
                              <template #icon>
                                <SvgIcon name="delete" />
                              </template>
                            </n-button>
                          </n-gi>
                          <n-gi :span="1">
                            <n-button strong secondary circle type="warning">
                              <template #icon>
                                <SvgIcon name="disabled" />
                              </template>
                            </n-button>
                          </n-gi>
                        </n-grid>
                      </transition-group>
                    </template>
                  </Draggable>
                </div>
              </n-form-item-gi>
              <!-- <n-form-item-gi> </n-form-item-gi> -->
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
              <n-form-item-gi
                :span="2"
                :label-style="{ fontSize: '13px' }"
                label="表单标题"
              >
                <n-input v-model:value="getFormPorps.title" />
              </n-form-item-gi>
              <n-form-item-gi
                :span="2"
                :label-style="{ fontSize: '13px' }"
                label="表单大小"
              >
                <n-radio-group
                  v-model:value="getFormPorps.size"
                  name="sizegroup"
                  size="small"
                >
                  <n-radio-button
                    v-for="item in sizeData"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  />
                </n-radio-group>
              </n-form-item-gi>
              <n-form-item-gi
                :span="2"
                :label-style="{ fontSize: '13px' }"
                label="标签位置"
              >
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
              <n-form-item-gi
                :span="2"
                :label-style="{ fontSize: '13px' }"
                label="标签对齐"
              >
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
              <n-form-item-gi
                :span="2"
                :label-style="{ fontSize: '13px' }"
                label="标签宽度"
              >
                <n-input-number
                  v-model:value="(getFormPorps.labelWidth as number)"
                ></n-input-number>
              </n-form-item-gi>
            </n-grid>
          </n-collapse-item>
          <n-collapse-item title="事件属性" name="HandleProps">
            <div class="handle-wrapper">
              <span>onMounted</span>
              <n-button size="small" tertiary round type="primary">
                编写事件
              </n-button>
            </div>
          </n-collapse-item>
        </n-collapse>
      </n-form>
    </n-layout>
  </n-layout-sider>
</template>

<script lang="ts">
import {
  sizeData,
  formItemPorps,
  labelAlignData,
  labelPlacementData,
} from "../utils/data";
import { SvgIcon } from "@/components/SvgIcon";
import { FormItems, GenFormProps } from "../types";
import Draggable from "vuedraggable/src/vuedraggable";
import { ref, PropType, computed, defineComponent, watchEffect } from "vue";

export default defineComponent({
  name: "formSetting",
  components: { SvgIcon, Draggable },
  props: {
    currentData: Object as PropType<FormItems>,
    formPorps: Object as PropType<GenFormProps>,
  },
  setup(props) {
    const tabsVal = ref("components_setting");
    const getFormPorps = computed(() => props.formPorps ?? undefined);
    const getCurrentData = computed(() => props.currentData ?? undefined);

    watchEffect(() => {
      if (
        getCurrentData.value &&
        Object.keys(getCurrentData.value).length > 0
      ) {
        tabsVal.value = "components_setting";
      } else {
        tabsVal.value = "form_setting";
      }
    });

    return {
      tabsVal,
      sizeData,
      getFormPorps,
      getCurrentData,
      labelAlignData,
      labelPlacementData,

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
        .select-componet-toolbar {
          &-item {
            &:not(:last-child) {
              margin-bottom: 6px;
            }
          }
        }
        .n-radio-button {
          padding: 0 8px;
        }
        .n-radio-group .n-radio-button.n-radio-button--checked {
          background: var(--n-button-text-color-active);
          color: var(--n-color);
        }
      }
    }
  }
}
</style>
