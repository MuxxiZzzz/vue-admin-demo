<template>
  <div class="createForm">
    <el-form ref="form" :model="form" label-position="top" label-width="80px">
      <el-form-item v-if="type === 'deleteTenant'" label="选择租户">
        <el-select v-model="form.tenantId" placeholder="选择租户" style="width:100%">
          <el-option v-for="(tenant, index) in form.tenants" :key="index" :label="tenant.tenancyName" :value="tenant.id" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="type === 'deleteRole'" label="选择角色">
        <el-select v-model="form.deleteRole" placeholder="选择角色" style="width:100%">
          <el-option v-for="(role, index) in form.roles" :key="index" :label="role.displayName" :value="role.id" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="type === 'deleteUser'" label="选择用户">
        <el-select v-model="form.deleteUsernum" placeholder="选择用户" style="width:100%">
          <el-option v-for="(num, index) in form.usernums" :key="index" :label="num.userName" :value="num.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <div style="display: flex;justify-content: space-between;">
          <el-button type="primary" size="medium" style="width: 70%" :loading="loading" @click.native="onSubmit">删除</el-button>
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
      if (this.$props.type === 'deleteUser') { this.deleteUser() }
      if (this.$props.type === 'deleteRole') { this.deleteRole() }
      if (this.$props.type === 'deleteTenant') { this.deleteTenant() }
    },
    deleteUser() {
      if (this.form.deleteUsernum === '') {
        this.$message('请选择要操作的用户')
      } else {
        this.loading = true
        this.$store.dispatch('user/deleteUser', this.form.deleteUsernum)
          .then(() => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            // this.setDatas()
            this.$emit('resetData')
            this.loading = false
          })
          .catch(() => {
            this.$message({
              message: '发生错误',
              type: 'error'
            })
            this.loading = false
          })
      }
    },
    deleteRole() {
      if (this.form.deleteRole === '') {
        this.$message('请选择要操作的角色')
      } else {
        this.loading = true
        this.$store.dispatch('user/deleteRole', this.form.deleteRole)
          .then(() => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            // this.setDatas()
            this.$emit('resetData')
            this.loading = false
          })
          .catch(() => {
            this.$message({
              message: '发生错误',
              type: 'error'
            })
            this.loading = false
          })
      }
    },
    deleteTenant() {
      if (this.form.tenantId === '') {
        this.$message('请选择要操作的租户')
      } else {
        this.loading = true
        this.$store.dispatch('user/deleteTenant', this.form.tenantId)
          .then(() => {
            // this.setData()
            this.$emit('resetData')
            this.loading = false
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          })
          .catch(() => {
            this.$message({
              message: '发生错误',
              type: 'error'
            })
            this.loading = false
          })
      }
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
