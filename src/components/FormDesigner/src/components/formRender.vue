<template>
  <n-layout>
    <n-layout-header bordered class="form-toolbar">
      <n-space>其他功能</n-space>
      <n-space justify="end" align="center">
        <n-button text type="error" size="small" @click="$emit('handleClear')">
          <template #icon>
            <SvgIcon name="delete" />
          </template>
          清空
        </n-button>
        <n-button text type="info" size="small" @click="handlePreview">
          <template #icon>
            <SvgIcon name="eye" />
          </template>
          预览
        </n-button>
        <n-button text type="info" size="small"> 导出JSON </n-button>
      </n-space>
    </n-layout-header>
    <n-layout-content
      embedded
      class="form-wrapper"
      :content-style="{ padding: '10px' }"
      :native-scrollbar="false"
    >
      <n-card :bordered="false" :content-style="{ padding: '6px' }">
        <n-form label-placement="left" :show-feedback="false">
          <Draggable
            class="form-wrapper-list"
            :animation="200"
            item-key="key"
            ghostClass="ghost"
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
                      :cols="element.componentPorps.cols"
                      :x-gap="element.componentPorps.xGap"
                      :y-gap="element.componentPorps.yGap"
                    >
                      <n-gi
                        class="grid-item"
                        v-for="(gi, giIndex) in element.componentPorps.columns"
                        :key="giIndex"
                        :span="gi.span"
                      >
                        <Draggable
                          class="gird-item-gi-list"
                          item-key="key"
                          ghostClass="ghost"
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
                                v-if="
                                  element.key && element.component != 'NGrid'
                                "
                                :key="element.key"
                                class="item-wrapper"
                                :class="{
                                  active: currentData?.key === element.key,
                                }"
                                @click.stop="handleItemClick(element)"
                              >
                                <n-form-item :label="element.label">
                                  <component :is="element.component" />
                                </n-form-item>
                                <div
                                  class="drag-btn"
                                  v-if="currentData?.key === element.key"
                                >
                                  <SvgIcon name="drag" />
                                </div>
                                <div
                                  class="action-bar"
                                  v-if="currentData?.key === element.key"
                                >
                                  <n-tooltip trigger="hover">
                                    <template #trigger>
                                      <div class="copy-btn">
                                        <SvgIcon name="copy" />
                                      </div>
                                    </template>
                                    复制
                                  </n-tooltip>
                                  <n-tooltip trigger="hover">
                                    <template #trigger>
                                      <div class="delete-btn">
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
                    <div
                      class="drag-btn"
                      v-if="currentData?.key === element.key"
                    >
                      <SvgIcon name="drag" />
                    </div>

                    <div
                      class="action-bar"
                      v-if="currentData?.key === element.key"
                    >
                      <n-tooltip trigger="hover">
                        <template #trigger>
                          <div class="copy-btn">
                            <SvgIcon name="copy" />
                          </div>
                        </template>
                        复制
                      </n-tooltip>
                      <n-tooltip trigger="hover">
                        <template #trigger>
                          <div
                            class="delete-btn"
                            @click.stop="handleItmeDelete(index, true)"
                          >
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
                    <n-form-item :label="element.label">
                      <component :is="element.component" />
                    </n-form-item>
                    <div
                      class="drag-btn"
                      v-if="currentData?.key === element.key"
                    >
                      <SvgIcon name="drag" />
                    </div>
                    <div
                      class="action-bar"
                      v-if="currentData?.key === element.key"
                    >
                      <n-tooltip trigger="hover">
                        <template #trigger>
                          <div class="copy-btn">
                            <SvgIcon name="copy" />
                          </div>
                        </template>
                        复制
                      </n-tooltip>
                      <n-tooltip trigger="hover">
                        <template #trigger>
                          <div
                            class="delete-btn"
                            @click.stop="handleItmeDelete(index)"
                          >
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
        </n-form>

        <!-- <div class="form-wrapper-empty">
          <n-text :depth="3">
            请从左侧列表中选择一个组件, 然后用鼠标拖动组件放置于此处
          </n-text>
        </div> -->
      </n-card>
    </n-layout-content>
  </n-layout>
</template>

<script lang="ts">
import { PropType, defineComponent, reactive, toRefs } from "vue";
import { SvgIcon } from "@/components/SvgIcon";
import Draggable from "vuedraggable/src/vuedraggable";
import { useFormDesigner } from "../hooks/useFormDesigner";
export default defineComponent({
  name: "formRender",
  props: {
    schema: Array as PropType<any[]>,
  },
  emits: ["handleClear", "handleView", "handleExportForJson"],
  components: { SvgIcon, Draggable },
  setup(props, { emit }) {
    const {
      schema,
      handleAdd,
      handleGiAdd,
      currentData,
      handlePreview,
      handleItemClick,
      handleItmeDelete,
    } = useFormDesigner();

    return {
      schema,
      handleAdd,
      handleGiAdd,
      currentData,
      handlePreview,
      handleItemClick,
      handleItmeDelete,
    };
  },
});
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
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

  .n-card {
    min-height: calc(100vh - 64px);
  }
  &-list {
    width: 100%;
    min-height: calc(100vh - 80px);

    .item-wrapper {
      padding: 5px 25px;
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
  &-empty {
    width: 100%;
    height: calc(100vh - 74px);
    display: flex;
    align-items: center;
    justify-content: center;
    .n-text {
      margin-bottom: 40px;
      font-size: 18px;
    }
  }
}
</style>
