<template>
  <div class="login-container" style="width:60%;margin: 10% auto;">
    <CreateForms
      :form="form"
      type="login"
      :pushlogin="pushLogin"
    >
      <template v-slot:first>
        <div class="title-container">
          <h3 class="title">登录</h3>
        </div>
      </template>
      <template v-slot:second>
        <el-form-item prop="complex" :rules="loginRules.complex">
          <span class="svg-container">
            <div class="el-icon-user-solid" />
          </span>
          <Input
            ref="complex"
            :data="form.complex"
            placeholder="用户名或邮箱"
            @keyup.enter.native="$refs.password.$refs.ipt.focus()"
            @input="setNewData"
          />
        </el-form-item>
      </template>
      <template v-slot:third>
        <el-form-item prop="password" :rules="loginRules.password">
          <span class="svg-container">
            <div class="el-icon-warning" />
          </span>
          <Input
            ref="password"
            :data="form.password"
            :type="passwordType"
            placeholder="密码"
            @keyup.enter.native="enter"
            @input="setNewData"
          />
          <span class="show-pwd" @click="showPwd('passwordType')">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </template>
      <template v-slot:fourth>
        <el-form-item>
          <el-select v-model="form.tenantId" placeholder="选择租户" style="width:117.5%" @change="setTenantID">
            <el-option v-for="(tenant, index) in form.tenants" :key="index" :label="tenant.tenancyName" :value="tenant.id" />
          </el-select>
        </el-form-item>
      </template>
    </CreateForms>
  </div>
</template>

<script>
import { validateUsername, validateUserid, validateUseremail, validatePassword, validateComplex } from '@/utils/validate'
import CreateForms from '@/components/CreateForms.vue'
import Input from '@/components/Input.vue'
import { setNewData } from '@/utils/tools'
export default {
  name: 'Regist',
  components: { CreateForms, Input },
  data() {
    return {
      pushLogin: false,
      form: {
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
  destroy() {
  },
  methods: {
    setNewData,
    enter() {
      this.pushLogin = !this.pushLogin
    },
    setTenantID() {
      this.$store.commit('user/SET_TENANTID', this.form.tenantId)
    },
    async setTenants() {
      await this.$store.dispatch('user/getTenants')
      this.form.tenants = this.$store.state.user.tenants
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
  min-height: 100vh;
  width: 100vw;
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
