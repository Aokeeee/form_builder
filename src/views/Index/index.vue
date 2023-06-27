<template>
  <div class="wrap">
    <div class="header">
      <h1 class="title">生产管理系统</h1>
      <div class="right">
        <n-space :size="6">
          <div class="icon">
            <SvgIcon name="user" :size="22" />
          </div>
          <div class="user">当前用户:杨洋[U001]</div>
          <n-button text>
            <n-text underline class="logout" style="color: #fff">
              退出登录
            </n-text>
          </n-button>
        </n-space>
      </div>
    </div>
    <div class="content">
      <n-scrollbar style="max-height: 100%">
        <div class="tool-wrap">
          <div class="scanCode">
            <n-input
              clearable
              size="large"
              ref="inputRef"
              placeholder="请扫码"
              v-model:value="code"
              @keyup.enter="handleScanCode"
            >
              <template #prefix>
                <SvgIcon name="scanCode" :size="20" style="color: #359be1" />
              </template>
            </n-input>
          </div>
          <div class="data">
            <div class="data-item tray">
              <span class="label">托盘：</span>
              <div class="value" :style="{ color: tray ? '#fff' : '#D4539B' }">
                {{ tray || "请扫托盘" }}
              </div>
            </div>
            <div class="data-item num">
              <span class="label">产品数量：</span>
              <div class="value">{{ productQuantity }}</div>
            </div>
          </div>
          <div class="workshopLine">
            <n-select
              clearable
              size="large"
              ref="selectRef"
              v-model:value="workShopLine"
              :options="workShopLineOption"
              label-field="workShopAndLineName"
              value-field="lineClassCode"
              placeholder="请选择车间线别"
              @update-value="handleSelectUpdateValue"
              :status="selectStatus"
            ></n-select>
          </div>
        </div>
        <div class="record-wrap">
          <div class="title">
            <div class="icon-wrap" style="background-color: #39d4ea">
              <SvgIcon name="record" :size="20" />
            </div>
            <p>扫码记录</p>
            <span> Code scanning record </span>
          </div>
          <div class="table-wrap">
            <n-data-table
              :columns="scanCodeTableColumns"
              :data="scanCodeData"
              :bordered="false"
              size="small"
            />
          </div>
        </div>
        <div class="data-wrap">
          <div class="title" style="color: #4073a0">
            <div class="icon-wrap" style="background-color: #db9c3e">
              <SvgIcon name="data" :size="20" style="color: #fff" />
            </div>
            <p>数据采集</p>
            <span> Data acquisition </span>
          </div>
          <div class="table-wrap">
            <n-data-table
              :columns="dataAcquisitionTableColumns"
              :data="dataAcquisitionData"
              :bordered="false"
              size="small"
            />
          </div>
        </div>
      </n-scrollbar>
    </div>
    <div class="footer">技术支持：江苏荣辉信息科技有限公司</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, ref, onMounted } from "vue";
import { scanCodeTableColumns, dataAcquisitionTableColumns } from "./columns";
import { IndexState } from "./type";
import { InputInst, SelectInst, useMessage } from "naive-ui";
import { renderMessage } from "./message";
import { fetch } from "@/utils";

export default defineComponent({
  name: "Index",
  // props: {},
  components: {},
  setup(props, { emit }) {
    const msg = useMessage();
    const selectStatus = ref();
    const inputRef = ref<InputInst | null>(null);
    const selectRef = ref<SelectInst | null>(null);
    const state = reactive<IndexState>({
      code: "",
      tray: "",
      workShopLine: null,
      scanCodeData: [],
      productQuantity: 0,
      workShopLineOption: [],
      dataAcquisitionData: [],
    });

    const handleSelectUpdateValue = (val, opt) => {
      if (val) {
        selectStatus.value = undefined;
        localStorage.setItem("workshopline", val as string);
      } else {
        localStorage.removeItem("workshopline");
        selectStatus.value = "error";
      }
      state.workShopLine = val;
    };

    const handleScanCode = async () => {
      if (!state.workShopLine) {
        msg.error("请先选择车间线别", {
          render: renderMessage,
        });
      } else {
        console.log(state.workShopLine);
      }
    };

    const getWorkShopLineOption = async () => {
      try {
        const { code, result, message } = await fetch({
          url: "WorkShop/GetWorkShop",
          method: "get",
        });
        if (code === 200) {
          state.workShopLineOption = result;
        } else {
          msg.error(message);
        }
      } catch (error) {
        msg.error("车间线别数据获取失败，请联系管理员");
      }
    };

    const initValue = async () => {
      await getWorkShopLineOption();
      const workshopline = localStorage.getItem("workshopline");
      if (workshopline) {
        state.workShopLine = workshopline;
        inputRef.value?.focus();
      } else {
        state.workShopLine = null;
        selectStatus.value = "error";
        selectRef.value?.focus();
      }
    };

    onMounted(async () => {
      await initValue();
    });

    return {
      inputRef,
      selectRef,
      selectStatus,
      ...toRefs(state),
      scanCodeTableColumns,
      dataAcquisitionTableColumns,
      handleScanCode,
      handleSelectUpdateValue,
    };
  },
});
</script>

<style lang="less" scoped>
.wrap {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  background-image: url("../../assets/img/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  width: 100%;
  min-width: 1200px;
  .header {
    width: 100%;
    overflow: hidden;
    height: 50px;
    padding: 0 10px;
    position: relative;
    color: #fff;
    flex-shrink: 0;
    .title {
      height: 100%;
      line-height: 50px;
      text-align: center;
      letter-spacing: 6px;
    }
    .right {
      display: flex;
      align-items: center;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      padding-right: 10px;
      line-height: 22px;

      .logout {
        line-height: 22px;
      }
    }
  }
  .content {
    width: 100%;
    height: calc(100% - 30px);
    flex: 1;
    overflow: hidden;
    .tool-wrap {
      width: 100%;
      padding: 15px 30px 30px;
      display: flex;
      align-items: center;
      .scanCode {
        width: 28%;
        :deep(.n-input) {
          width: 100%;
          opacity: 0.8;
        }
      }
      .data {
        display: flex;
        flex: 1;
        overflow: hidden;
        padding: 0 20px;
        &-item {
          color: #fff;
          font-size: 20px;
          display: flex;
          align-items: center;
          &:not(:last-child) {
            margin-right: 40px;
          }
          .label {
            flex-shrink: 0;
          }
          .value {
            flex: 1;
          }
        }
      }
      .workshopLine {
        width: 200px;
        flex-shrink: 0;
        :deep(.n-select) {
          width: 100%;
          opacity: 0.8;
        }
      }
    }
    .record-wrap {
      padding: 10px 30px;
    }
    .data-wrap {
      padding: 10px 30px;
    }
    .title {
      width: 100%;
      // height: 30px;
      display: flex;
      align-items: end;
      color: #fff;
      font-size: 18px;
      line-height: 22px;
      margin-bottom: 10px;
      font-weight: bold;
      .icon-wrap {
        width: 25px;
        height: 25px;
        margin-right: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }
      span {
        opacity: 0.6;
        margin-left: 8px;
        line-height: 20px;
      }
    }
    :deep(.n-data-table) {
      .n-data-table-thead th {
        color: #fff;
        background-color: #4073a0;
        border-color: #4073a0;
        font-weight: bold;
      }
    }
  }
  .footer {
    width: 100%;
    text-align: center;
    font-size: 14px;
    padding: 2px 0 6px;
    opacity: 0.8;
    color: #4073a0;
  }
}
</style>
