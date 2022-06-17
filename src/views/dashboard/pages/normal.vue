<template>
  <div class="container">
    <CreateForms
      :form="form"
      type="resetPassword"
    >
      <template v-slot:first>
        <el-form-item label="当前密码" prop="currentPassword" :rules="rules.password">
          <!-- <el-input v-model="form.currentPassword" placeholder="当前密码" type="password" /> -->
          <Input
            ref="currentPassword"
            :data="form.currentPassword"
            placeholder="当前密码"
            type="password"
            @input="setNewData"
          />
        </el-form-item>
      </template>
      <template v-slot:second>
        <el-form-item label="新密码" prop="password" :rules="rules.password">
          <!-- <el-input v-model="form.password" placeholder="新密码" type="password" /> -->
          <Input
            ref="password"
            :data="form.password"
            placeholder="新密码"
            type="password"
            @input="setNewData"
          />
        </el-form-item>
      </template>
    </CreateForms>
  </div>
</template>

<script>
import { validatePassword } from '@/utils/validate'
import CreateForms from '@/components/CreateForms.vue'
import { setNewData } from '@/utils/tools'
import Input from '@/components/Input.vue'

export default {
  components: { CreateForms, Input },
  data() {
    return {
      loading: false,
      form: {
        username: '',
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
    setNewData,
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
