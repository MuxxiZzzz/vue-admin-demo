<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>

      <el-form-item prop="complex">
        <span class="svg-container">
          <div class="el-icon-user-solid" />
        </span>
        <el-input
          ref="complex"
          v-model="loginForm.complex"
          placeholder="用户名或邮箱"
          name="complex"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <div class="el-icon-warning" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd('passwordType')">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-select v-model="loginForm.tenantId" placeholder="选择租户" style="width:117.5%" @change="setTenantID">
          <el-option v-for="(tenant, index) in loginForm.tenants" :key="index" :label="tenant.tenancyName" :value="tenant.id" />
        </el-select>
      </el-form-item>
      <div style="display: flex;justify-content: space-between">
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
        <!-- <el-button :loading="loading" type="primary" style="width:48%;margin-bottom:30px;" @click.native.prevent="$emit('switchPage')">注册</el-button> -->
      </div>
    </el-form>
  </div>
</template>

<script>
import { validateUsername, validateUserid, validateUseremail, validatePassword, validateComplex } from '@/utils/validate'
export default {
  name: 'Regist',
  data() {
    return {
      loginForm: {
        tenants: [],
        tenantId: '',
        username: '',
        userid: '',
        useremail: '',
        password: '123qwe',
        complex: 'admin',
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        userid: [{ required: true, trigger: 'blur', validator: validateUserid }],
        useremail: [{ required: true, trigger: 'blur', validator: validateUseremail }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        complex: [{ required: true, trigger: 'blur', validator: validateComplex }]
      },
      passwordType: 'password',
      loading: false,
      redirect: undefined,
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.setTenants()
  },
  mounted() {
  },
  methods: {
    clickBTN() {
      console.log(typeof (this.$store.state.user.TenantID))
    },
    setTenantID() {
      this.$store.commit('user/SET_TENANTID', this.loginForm.tenantId)
    },
    async setTenants() {
      await this.$store.dispatch('user/getTenants')
      this.loginForm.tenants = this.$store.state.user.tenants
    },
    showPwd(res) {
      if (this[res] === 'password') {
        this[res] = ''
      } else {
        this[res] = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          // console.log('error submit!!')
          this.$message('请填写好信息')
          return false
        }
      })
    },
  },
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

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
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

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
