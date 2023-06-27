<template>
  <div class="login-wrap">
    <div class="login-form">
      <n-form
        size="large"
        label-width="60"
        :rules="formRule"
        :model="formModel"
        label-placement="left"
      >
        <n-form-item> <h1>捷普生产管理系统</h1> </n-form-item>
        <n-form-item path="userName">
          <n-input
            v-model:value="formModel.userName"
            clearable
            placeholder="请输入用户名"
          >
            <template #prefix>
              <SvgIcon
                name="login-user"
                :size="20"
                style="color: var(--n-icon-color)"
              />
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="password">
          <n-input
            type="password"
            v-model:value="formModel.password"
            placeholder="请输入密码"
            show-password-on="click"
            clearable
          >
            <template #prefix>
              <SvgIcon
                name="password"
                :size="20"
                style="color: var(--n-icon-color)"
              />
            </template>
          </n-input>
        </n-form-item>
        <n-form-item>
          <n-checkbox v-model:checked="saveInfo"> 自动登录 </n-checkbox>
        </n-form-item>
        <n-form-item>
          <n-button class="login-btn" type="primary"> 登录 </n-button>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
const saveInfo = ref(true);
const formModel = reactive({
  userName: "",
  password: "",
});

const formRule = {
  userName: {
    required: true,
    message: "请输入用户名",
    trigger: ["input", "blur"],
  },
  password: {
    required: true,
    message: "请输入密码",
    trigger: ["input", "blur"],
  },
};
</script>

<style lang="less" scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: skyblue;
  .login-form {
    width: 500px;
    .login-btn {
      width: 100%;
    }
  }
}
</style>
