<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户ID" prop="userid" :rules="rules.userid">
        <el-input v-model="form.userid" placeholder="用户ID" />
      </el-form-item>
      <el-form-item label="用户名" prop="username" :rules="rules.username">
        <el-input v-model="form.username" placeholder="用户名" />
      </el-form-item>
      <el-form-item label="邮箱" prop="useremail" :rules="rules.useremail">
        <el-input v-model="form.useremail" placeholder="邮箱" />
      </el-form-item>
      <el-form-item label="密码" prop="password" :rules="rules.password">
        <el-input v-model="form.password" type="password" placeholder="密码" />
      </el-form-item>
      <el-form-item label="角色" :rules="{required: true, message: '必须选择'}">
        <el-select v-model="form.role" placeholder="选择角色">
          <el-option v-for="(role, index) in form.roles" :key="index" :label="role.displayName" :value="role.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="启用账户">
        <el-switch v-model="form.activation" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%" :loading="loading" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validateUsername, validateUserid, validateUseremail, validatePassword } from '@/utils/validate'
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
      form: {
        username: '',
        userid: '',
        useremail: '',
        role: '',
        roles: [],
        password: '',
        activation: true,
      },
      rules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        userid: [{ required: true, trigger: 'blur', validator: validateUserid }],
        useremail: [{ required: true, trigger: 'blur', validator: validateUseremail }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
      },
      loading: false,
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
      if (this.activeName === 'first') {
        this.setData()
      }
    },
    async setData() {
      await this.$store.dispatch('user/getRoles')
      this.form.roles = this.$store.state.user.roles
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { username, userid, useremail, activation, password, role } = this.form
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
            },
            'inside')
            .then(() => {
              this.setData()
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
  }
}
</script>

<style lang="scss" scoped>
.container {
    width: 50vw;
    margin: 50px auto;
}
</style>
