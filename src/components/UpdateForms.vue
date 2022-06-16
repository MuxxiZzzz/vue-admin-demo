<template>
  <div class="createForm">
    <el-form ref="form" :model="form" label-position="right" label-width="80px">
      <slot name="first" />
      <slot name="second" />
      <slot name="third" />
      <slot name="fourth" />
      <slot name="fifth" />
      <slot name="sixth" />
      <el-form-item>
        <div style="display: flex;justify-content: space-between;">
          <el-button type="primary" size="medium" style="width: 70%" :loading="loading" @click.native="onSubmit">提交</el-button>
          <el-button type="primary" size="medium" style="width: 28%" @click.native="clickSwitcher">
            <span class="el-icon-right" />
          </el-button>
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
      if (this.$props.type === 'updateUser') { this.updateUser() }
      if (this.$props.type === 'updateRole') { this.updateRole() }
    },
    updateUser() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { username, userid, useremail, activation, role, usernum } = this.$props.form
          this.loading = true
          this.$store.dispatch(
            'user/updateUser',
            {
              id: usernum,
              userName: userid,
              emailAddress: useremail,
              isActive: activation,
              roleNames: [role],
              name: username,
              surname: username
            })
            .then(() => {
              this.$message({
                message: '更改成功',
                type: 'success'
              })
              this.$emit('resetData')
              //   this.setDatas()
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
    updateRole() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { roleName, roleid, roleDisplayName, permission } = this.$props.form
          this.loading = true
          this.$store.dispatch(
            'user/updateRole',
            {
              id: roleid,
              name: roleName,
              displayName: roleDisplayName,
              grantedPermissions: [permission]
            })
            .then(() => {
              this.$message({
                message: '更改成功',
                type: 'success'
              })
              //   this.setDatas()
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
  },
}
</script>

<style lang="scss">
.createForm {
  width: 80%;
  margin: 20px auto;
}
</style>
