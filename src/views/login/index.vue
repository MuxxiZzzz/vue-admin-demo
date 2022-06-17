<template>
  <div class="login-container">
    <!-- 登录页面 -->
    <login v-if="!regist" />
  </div>
</template>

<script>
// import regist from './regist.vue'
import login from './login.vue'
export default {
  name: 'Login',
  components: { login },
  data() {
    return {
      regist: false
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
}
</style>
