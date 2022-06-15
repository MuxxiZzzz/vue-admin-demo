<template>
  <div>
    <div v-if="status" class="container">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="选择用户" prop="usernum" :rules="{required: true, message: '必须选择用户编号'}">
          <el-select v-model="form.usernum" placeholder="选择用户" @change="setData(form.usernum)">
            <el-option v-for="(num, index) in form.usernums" :key="index" :label="num.userName" :value="num.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="新用户ID" prop="username" :rules="rules.userid">
          <el-input v-model="form.userid" placeholder="用户ID" />
        </el-form-item>
        <el-form-item label="新用户名" prop="username" :rules="rules.username">
          <el-input v-model="form.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item label="新邮箱" prop="useremail" :rules="rules.useremail">
          <el-input v-model="form.useremail" placeholder="邮箱" />
        </el-form-item>
        <el-form-item label="更改角色" :rules="{required: true, message: '必须选择'}">
          <el-select v-model="form.role" placeholder="选择角色">
            <el-option v-for="(role, index) in form.roles" :key="index" :label="role.displayName" :value="role.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="启用账户">
          <el-switch v-model="form.activation" />
        </el-form-item>
        <el-form-item>
          <div style="display: flex;justify-content: space-between;">
            <el-button type="primary" style="width: 70%" :loading="loading" @click.native="onSubmit">更新信息</el-button>
            <el-button type="primary" style="width: 30%" @click.native="switcher">
              <span class="el-icon-right" />
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="!status" class="container2">
      <el-form ref="form2" :model="form" label-width="auto">
        <el-form-item label="选择用户" prop="usernum" :rules="{required: true, message: '必须选择用户编号'}">
          <el-select v-model="form.deleteUsernum" placeholder="选择用户" size="medium" style="width: 100%">
            <el-option v-for="(num, index) in form.usernums" :key="index" :label="num.userName" :value="num.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" style="width: 70%" :loading="loading" @click.native="accountDelete(form.deleteUsernum)">删除账户</el-button>
          <el-button type="primary" size="medium" style="width: 26.5%" @click.native="switcher">
            <span class="el-icon-right" />
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validateUsername, validateUserid, validateUseremail } from '@/utils/validate'
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
      loading: false,
      status: true,
      form: {
        deleteUsernum: '',
        usernum: '',
        usernums: [],
        username: '',
        userid: '',
        useremail: '',
        role: '',
        roles: [],
        activation: true,
      },
      rules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        userid: [{ required: true, trigger: 'blur', validator: validateUserid }],
        useremail: [{ required: true, trigger: 'blur', validator: validateUseremail }],
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
      if (this.activeName === 'second') {
        this.setDatas()
      }
    },
    async setDatas() {
      await this.$store.dispatch('user/getNums')
      await this.$store.dispatch('user/getRoles')
      this.form.roles = this.$store.state.user.roles
      this.form.usernums = this.$store.state.user.users
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { username, userid, useremail, activation, role, usernum } = this.form
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
    switcher() {
      this.status = !this.status
    },
    setData(id) {
      const res = this.form.usernums.filter((item) => {
        if (item.id === id) {
          return item
        }
      })
      this.form.userid = res[0].userName
      this.form.username = res[0].name
      this.form.useremail = res[0].emailAddress
    },
    accountDelete(id) {
      if (id === '') {
        this.$message('请选择要操作的用户')
      } else {
        this.loading = true
        this.$store.dispatch('user/deleteUser', id)
          .then(() => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.setDatas()
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
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 50vw;
  margin: 50px auto;
}
.container2 {
  width: 50vw;
  margin: 50px auto;
  position: relative;
}
</style>
