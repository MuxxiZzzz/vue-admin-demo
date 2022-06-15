<template>
  <div class="container">
    <div v-if="status">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="租户名" prop="tenantName" :rules="rules.tenantName">
          <el-input v-model="form.tenantName" placeholder="租户名" />
        </el-form-item>
        <el-form-item label="邮箱" prop="AdminEmailAddress" :rules="rules.AdminEmailAddress">
          <el-input v-model="form.AdminEmailAddress" placeholder="AdminEmailAddress" />
        </el-form-item>
        <el-form-item label="启用租户">
          <el-switch v-model="form.activation" />
        </el-form-item>
        <el-form-item>
          <div style="display: flex;justify-content: space-between;">
            <el-button type="primary" style="width: 70%" :loading="loading" @click.native="onSubmit">创建租户</el-button>
            <el-button type="primary" style="width: 30%" @click.native="switcher">
              <span class="el-icon-right" />
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="!status">
      <el-form ref="form2" :model="form" label-width="auto">
        <el-form-item label="选择租户">
          <el-select v-model="form.tenantId" placeholder="选择租户" style="width:80%">
            <el-option v-for="(tenant, index) in form.tenants" :key="index" :label="tenant.tenancyName" :value="tenant.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <div>
            <el-button type="primary" size="medium" style="width: 50%" :loading="loading" @click.native="accountDelete(form.tenantId)">删除账户</el-button>
            <el-button type="primary" size="medium" style="width: 28.5%" @click.native="switcher">
              <span class="el-icon-right" />
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validateUsername, validateUseremail } from '@/utils/validate'

export default {
  props: {
    activeName: {
      type: String,
      default: 'first',
      required: true
    },
  },
  data() {
    return {
      status: true,
      loading: false,
      form: {
        AdminEmailAddress: '',
        tenantName: '',
        tenants: [],
        tenantId: '',
        activation: true,
      },
      rules: {
        tenantName: [{ required: true, trigger: 'blur', validator: validateUsername }],
        AdminEmailAddress: [{ required: true, trigger: 'blur', validator: validateUseremail }],
      },
    }
  },
  watch: {
    activeName: {
      handler: 'checkData',
      deep: false,
      immediate: true,
    }
  },
  created() {
  },
  mounted() {

  },
  methods: {
    checkData() {
      if (this.activeName === 'fifth') {
        this.setData()
      }
    },
    async setData() {
      await this.$store.dispatch('user/getTenants')
      this.form.tenants = this.$store.state.user.tenants
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { tenantName, activation, AdminEmailAddress } = this.form
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
              this.setData()
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
    accountDelete(id) {
      if (id === '') {
        this.$message('请选择要操作的租户')
      } else {
        this.$store.dispatch('user/deleteTenant', id)
          .then(() => {
            this.setData()
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          })
          .catch(() => {
          })
      }
    },
    switcher() {
      this.status = !this.status
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
    width: 50vw;
    margin: 50px auto;
}
</style>
