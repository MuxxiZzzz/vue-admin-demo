<template>
  <div class="createForm">
    <el-form ref="form" :model="form" label-position="right" label-width="80px">
      <slot name="first" />
      <slot name="second" />
      <slot name="third" />
      <slot name="fourth" />
      <slot name="fifth" />
      <slot name="sixth" />
      <el-form-item v-if="switcher">
        <div style="display: flex;justify-content: space-between;">
          <el-button type="primary" size="medium" style="width: 70%" :loading="loading" @click.native="onSubmit">提交</el-button>
          <el-button type="primary" size="medium" style="width: 28%" @click.native="clickSwitcher">
            <span class="el-icon-right" />
          </el-button>
        </div>
      </el-form-item>
      <el-form-item v-if="!switcher">
        <div style="display: flex;justify-content: space-between;">
          <el-button type="primary" size="medium" style="width: 100%" :loading="loading" @click.native="onSubmit">提交</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => { return {} },
    },
    type: {
      type: String,
      default: '',
    },
    switcher: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    clickSwitcher() {
      this.$emit('switchPage')
    },
    onSubmit() {
      if (this.$props.type === 'createUser') { this.regist() }
      if (this.$props.type === 'createRole') { this.createRole() }
      if (this.$props.type === 'createTenant') { this.createTenant() }
      if (this.$props.type === 'resetPassword') { this.resetPassword() }
    },
    resetPassword() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { currentPassword, password } = this.$props.form
          this.loading = true
          this.$store.dispatch(
            'user/resetPassword',
            {
              currentPassword,
              newPassword: password
            })
            .then(() => {
              this.$message({
                message: '更改成功',
                type: 'success'
              })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          this.$message('请填写好信息')
          return false
        }
      })
    },
    createTenant() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { tenantName, activation, AdminEmailAddress } = this.$props.form
          this.loading = true
          this.$store.dispatch(
            'user/creatTenant',
            {
              tenancyName: tenantName,
              name: tenantName,
              isActive: activation,
              AdminEmailAddress
            })
            .then(() => {
              // this.setData()
              this.$emit('resetData')
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          this.$message('请填写好信息')
          return false
        }
      })
    },
    createRole() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { roleid, describeName, permission } = this.$props.form
          this.loading = true
          this.$store.dispatch(
            'user/createRole',
            {
              name: roleid,
              displayName: describeName,
              grantedPermissions: [permission]
            })
            .then(() => {
              this.$message({
                message: '创建成功',
                type: 'success'
              })
              // this.setData()
              this.$emit('resetData')
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          this.$message('请填写好信息')
          return false
        }
      })
    },
    regist() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { username, userid, useremail, activation, password, role } = this.$props.form
          this.loading = true
          this.$store.dispatch(
            'user/regist',
            {
              userName: userid,
              emailAddress: useremail,
              isActive: activation,
              name: username,
              surname: username,
              password: password,
              roleName: [role]
            })
            .then(() => {
              // this.setData()
              this.$emit('resetData')
              this.loading = false
            })
            .catch(() => {
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
.createForm {
  width: 80%;
  margin: 20px auto;
}
</style>
