<template>
  <div class="container">
    <el-form ref="form3" :model="form" label-width="auto">
      <el-form-item label="当前密码" prop="currentPassword" :rules="rules.password">
        <el-input v-model="form.currentPassword" placeholder="当前密码" type="password" />
      </el-form-item>
      <el-form-item label="新密码" prop="password" :rules="rules.password">
        <el-input v-model="form.password" placeholder="新密码" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" style="width: 100%" :loading="loading" @click.native="resetPassword">更改密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validatePassword } from '@/utils/validate'
export default {
  data() {
    return {
      loading: false,
      form: {
        password: '',
        currentPassword: '',
      },
      rules: {
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
      },
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    resetPassword() {
      this.$refs.form3.validate(valid => {
        if (valid) {
          const { currentPassword, password } = this.form
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
              this.setDatas()
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
  }
}
</script>

<style lang="scss">
.container {
    width: 50vw;
    margin: 50px auto;
}
</style>
