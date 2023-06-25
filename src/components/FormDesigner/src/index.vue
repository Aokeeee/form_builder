<template>
  <n-layout has-sider class="gen-wrapper">
    <formComponents :comlist="comlist" />
    <n-layout>
      <n-layout-header bordered class="form-toolbar">
        <n-text>{{ formProps.title }}</n-text>
        <n-space justify="end" align="center">
          <n-button text type="error" size="small" @click="handleClear" :disabled="!schema.length">
            <template #icon>
              <SvgIcon name="delete" />
            </template>
            清空
          </n-button>
          <n-button text type="info" size="small" @click="handlePreview" :disabled="!schema.length">
            <template #icon>
              <SvgIcon name="eye" />
            </template>
            预览
          </n-button>
          <n-button text type="info" size="small" @click="handleExportJson"> 导出JSON </n-button>
        </n-space>
      </n-layout-header>
      <n-layout-content
        embedded
        class="form-wrapper"
        :content-style="{ padding: '10px' }"
        :native-scrollbar="false"
      >
        <n-card :bordered="false" :content-style="{ padding: '6px' }">
          <n-form v-bind="formProps" :show-feedback="false">
            <Draggable
              class="form-wrapper-list"
              :animation="200"
              item-key="key"
              ghostClass="form-ghost"
              handle=".drag-btn"
              :list="schema"
              :group="{ name: 'people' }"
              @add="handleAdd"
            >
              <template #item="{ element, index }">
                <transition-group name="fade" tag="div">
                  <template v-if="element.component === 'NGrid'">
                    <div
                      class="item-wrapper"
                      :class="{ active: currentData?.key === element.key }"
                      @click="handleItemClick(element)"
                    >
                      <n-grid
                        v-if="element.key"
                        :key="element.key"
                        :cols="element.componentProps.cols"
                        :x-gap="element.componentProps.xGap"
                        :y-gap="element.componentProps.yGap"
                      >
                        <n-gi
                          class="grid-item"
                          v-for="(gi, giIndex) in element.columns"
                          :key="giIndex"
                          :span="gi.span"
                        >
                          <Draggable
                            class="gird-item-gi-list"
                            item-key="key"
                            ghostClass="form-ghost"
                            handle=".drag-btn"
                            :animation="200"
                            :group="{ name: 'people' }"
                            :no-transition-on-drag="true"
                            :list="gi.list"
                            @add="handleGiAdd($event, element, giIndex)"
                          >
                            <template #item="{ element, index }">
                              <transition-group name="fade" tag="div">
                                <div
                                  v-if="element.key && element.component != 'NGrid'"
                                  :key="element.key"
                                  class="item-wrapper"
                                  :class="{
                                    active: currentData?.key === element.key,
                                  }"
                                  @click.stop="handleItemClick(element)"
                                >
                                  <n-form-item
                                    :label="element.label"
                                    :show-require-mark="element.componentProps.required"
                                  >
                                    <n-radio-group
                                      v-if="element.component === 'NRadio'"
                                      v-bind="element.componentProps"
                                      v-model:value="element.componentProps.value"
                                    >
                                      <n-radio
                                        v-for="item in element.componentProps.options"
                                        :key="item.value"
                                        :value="item.value"
                                      >
                                        {{ item.label }}
                                      </n-radio>
                                    </n-radio-group>

                                    <n-checkbox-group
                                      v-else-if="element.component === 'NCheckBox'"
                                      v-bind="element.componentProps"
                                      v-model:value="element.componentProps.value"
                                    >
                                      <n-checkbox
                                        v-for="item in element.componentProps.options"
                                        :key="item.value"
                                        :value="item.value"
                                        :label="item.label"
                                      />
                                    </n-checkbox-group>

                                    <EmployeeSelector
                                      v-bind="element.componentProps"
                                      v-model:value="element.componentProps.value"
                                      v-else-if="element.component === 'EmployeeSelector'"
                                    />
                                    <UpLoad
                                      v-bind="element.componentProps"
                                      :edit="true"
                                      v-else-if="element.component === 'UpLoad'"
                                    />

                                    <n-time-picker
                                      v-bind="element.componentProps"
                                      v-model:formatted-value="
                                        element.componentProps.formattedValue
                                      "
                                      v-else-if="element.component === 'NTimePicker'"
                                    />
                                    <n-date-picker
                                      v-bind="element.componentProps"
                                      v-model:formatted-value="
                                        element.componentProps.formattedValue
                                      "
                                      v-else-if="element.component === 'NDatePicker'"
                                    />

                                    <component
                                      v-else
                                      :is="element.component"
                                      v-bind="element.componentProps"
                                      v-model:value="element.componentProps.value"
                                    />
                                  </n-form-item>
                                  <div class="drag-btn" v-if="currentData?.key === element.key">
                                    <SvgIcon name="drag" />
                                  </div>
                                  <div class="action-bar" v-if="currentData?.key === element.key">
                                    <n-tooltip trigger="hover">
                                      <template #trigger>
                                        <div
                                          class="copy-btn"
                                          @click.stop="handleItemCopy(index, gi.list)"
                                        >
                                          <SvgIcon name="copy" />
                                        </div>
                                      </template>
                                      复制
                                    </n-tooltip>
                                    <n-tooltip trigger="hover">
                                      <template #trigger>
                                        <div
                                          class="delete-btn"
                                          @click.stop="handleItmeDelete(index, gi.list)"
                                        >
                                          <SvgIcon name="delete" />
                                        </div>
                                      </template>
                                      删除
                                    </n-tooltip>
                                  </div>
                                </div>
                              </transition-group>
                            </template>
                          </Draggable>
                        </n-gi>
                      </n-grid>
                      <div class="drag-btn" v-if="currentData?.key === element.key">
                        <SvgIcon name="drag" />
                      </div>

                      <div class="action-bar" v-if="currentData?.key === element.key">
                        <n-tooltip trigger="hover">
                          <template #trigger>
                            <div class="copy-btn" @click.stop="handleItemCopy(index)">
                              <SvgIcon name="copy" />
                            </div>
                          </template>
                          复制
                        </n-tooltip>
                        <n-tooltip trigger="hover">
                          <template #trigger>
                            <div class="delete-btn" @click.stop="handleItmeDelete(index)">
                              <SvgIcon name="delete" />
                            </div>
                          </template>
                          删除
                        </n-tooltip>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div
                      class="item-wrapper"
                      v-if="element.key"
                      :key="element.key"
                      :class="{ active: currentData?.key === element.key }"
                      @click="handleItemClick(element)"
                    >
                      <n-form-item
                        :label="element.label"
                        :show-require-mark="element.componentProps.required"
                      >
                        <n-radio-group
                          v-if="element.component === 'NRadio'"
                          v-bind="element.componentProps"
                          v-model:value="element.componentProps.value"
                        >
                          <n-radio
                            v-for="item in element.componentProps.options"
                            :key="item.value"
                            :value="item.value"
                          >
                            {{ item.label }}
                          </n-radio>
                        </n-radio-group>

                        <n-checkbox-group
                          v-else-if="element.component === 'NCheckBox'"
                          v-bind="element.componentProps"
                          v-model:value="element.componentProps.value"
                        >
                          <n-checkbox
                            v-for="item in element.componentProps.options"
                            :key="item.value"
                            :value="item.value"
                            :label="item.label"
                          />
                        </n-checkbox-group>
                        <UpLoad
                          v-bind="element.componentProps"
                          :edit="true"
                          v-else-if="element.component === 'UpLoad'"
                        />
                        <EmployeeSelector
                          v-bind="element.componentProps"
                          v-model:value="element.componentProps.value"
                          v-else-if="element.component === 'EmployeeSelector'"
                        />
                        <n-time-picker
                          v-bind="element.componentProps"
                          v-model:formatted-value="element.componentProps.formattedValue"
                          v-else-if="element.component === 'NTimePicker'"
                        />
                        <n-date-picker
                          v-bind="element.componentProps"
                          v-model:formatted-value="element.componentProps.formattedValue"
                          v-else-if="element.component === 'NDatePicker'"
                        />

                        <component
                          v-else
                          :is="element.component"
                          v-bind="element.componentProps"
                          v-model:value="element.componentProps.value"
                        />
                      </n-form-item>
                      <div class="drag-btn" v-if="currentData?.key === element.key">
                        <SvgIcon name="drag" />
                      </div>
                      <div class="action-bar" v-if="currentData?.key === element.key">
                        <n-tooltip trigger="hover">
                          <template #trigger>
                            <div class="copy-btn" @click.stop="handleItemCopy(index)">
                              <SvgIcon name="copy" />
                            </div>
                          </template>
                          复制
                        </n-tooltip>
                        <n-tooltip trigger="hover">
                          <template #trigger>
                            <div class="delete-btn" @click.stop="handleItmeDelete(index)">
                              <SvgIcon name="delete" />
                            </div>
                          </template>
                          删除
                        </n-tooltip>
                      </div>
                    </div>
                  </template>
                </transition-group>
              </template>
            </Draggable>
            <div class="form-wrapper-empty" v-if="!schema.length">
              <n-text :depth="3"> 请从左侧列表中选择一个组件, 然后用鼠标拖动组件放置于此处 </n-text>
            </div>
          </n-form>
        </n-card>
      </n-layout-content>
    </n-layout>
    <formSetting v-model:current-data="currentData" :form-props="formProps" />
    <exportForJson ref="jsonModalRef" :list="schema" :form-props="formProps" />
    <formPreView ref="preViewModalRef" :list="schema" :form-props="formProps" use-env="perview" />
  </n-layout>
</template>

<script lang="ts">
  import { defineComponent, computed, ref, Ref } from 'vue';
  import { formItemsData } from './utils/data';
  import { formComponents, formSetting, exportForJson, formPreView } from './components';
  import { SvgIcon } from '@/components/SvgIcon';
  import Draggable from 'vuedraggable/src/vuedraggable';
  import { useFormDesigner } from './hooks/useFormDesigner';
  import { FormItems } from './types';
  import { EmployeeSelector } from '@/components/EmployeeSelector';
  import { UpLoad } from '@/components/UpLoad';
  export default defineComponent({
    name: 'FormDesigner',
    components: {
      UpLoad,
      SvgIcon,
      Draggable,
      formSetting,
      formComponents,
      exportForJson,
      formPreView,
      EmployeeSelector,
    },
    setup(props, { emit }) {
      const {
        schema,
        formProps,
        setFormData,
        handleAdd,
        handleGiAdd,
        currentData,
        handleClear,
        handleItemCopy,
        handleItemClick,
        handleItmeDelete,
      } = useFormDesigner();

      const getComponentProps = (component: FormItems) => {
        const componentProps = computed(() => component.componentProps ?? {});
        return componentProps;
      };
      const jsonModalRef: Ref<typeof exportForJson | null> = ref(null);
      const preViewModalRef: Ref<typeof formPreView | null> = ref(null);

      const handlePreview = () => {
        preViewModalRef.value?.openModal();
      };
      const handleExportJson = () => {
        jsonModalRef.value?.openModal();
      };
      return {
        schema,
        formProps,
        setFormData,
        handleAdd,
        handleGiAdd,
        currentData,
        jsonModalRef,
        preViewModalRef,
        handleClear,
        handlePreview,
        handleItemCopy,
        handleItemClick,
        handleItmeDelete,
        handleExportJson,
        getComponentProps,
        comlist: JSON.parse(JSON.stringify(formItemsData)),
      };
    },
  });
</script>

<style lang="less">
  .gen-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;

    min-width: 1200px;
    .form-ghost {
      background: var(--n-color-target);
      border: 2px solid var(--n-color-target);
      outline-width: 0;
      height: 3px;
      box-sizing: border-box;
      font-size: 0;
      content: '';
      overflow: hidden;
      padding: 0;
      width: 100%;
    }

    .form-toolbar {
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 41.96px;

      .svg-icon {
        margin: 0;
        font-size: 16px;
      }
    }

    .form-wrapper {
      height: calc(100% - 42px);
      .n-scrollbar-container {
        .n-scrollbar-content {
          min-height: 100%;
          display: flex;
          .n-card {
            flex: 1;
            position: relative;
            .n-form {
              height: calc(100% - 2px);
              overflow: hidden;
              .form-wrapper-list {
                width: 100%;
                min-height: 100%;
                .item-wrapper {
                  padding: 5px 60px 5px 25px;
                  box-sizing: border-box;
                  position: relative;
                  border: 1px dashed var(--n-color-target);
                  margin: 2px;
                  .grid-item {
                    border: 1px dashed var(--n-color-target);
                    .gird-item-gi-list {
                      min-height: 46px;
                    }
                  }
                  .drag-btn {
                    width: 20px;
                    height: 20px;
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0.6;
                    display: flex;
                    cursor: pointer;
                    align-items: center;
                    justify-content: center;
                    background-color: var(--n-color-target);
                    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    .svg-icon {
                      font-size: 16px;
                      color: var(--n-color);
                    }
                    &:hover {
                      opacity: 1;
                    }
                  }
                  .action-bar {
                    display: flex;
                    align-items: center;
                    box-sizing: border-box;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    .delete-btn,
                    .copy-btn {
                      width: 20px;
                      height: 20px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      padding: 2px;
                      cursor: pointer;
                      background-color: var(--n-color-target);
                    }
                    &:hover {
                      opacity: 1;
                    }
                    .svg-icon {
                      font-size: 16px;
                      color: var(--n-color);
                    }
                  }
                }
                .active {
                  outline: 1px solid var(--n-color-target);
                  border: 2px solid var(--n-color-target);
                }
              }
              .form-wrapper-empty {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                left: 0;
                top: 0;
                .n-text {
                  margin-bottom: 40px;
                  font-size: 18px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
