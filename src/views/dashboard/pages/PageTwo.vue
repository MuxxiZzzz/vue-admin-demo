<template>
  <div>
    <div v-if="status" class="container">
      <UpdateForms
        :form="form"
        type="updateUser"
        @resetData="setDatas"
        @switchPage="status = !status"
      >
        <template v-slot:first>
          <el-form-item label="选择用户" prop="usernum" :rules="{required: true, message: '必须选择用户编号'}">
            <el-select v-model="form.usernum" placeholder="选择用户" @change="setData(form.usernum)">
              <el-option v-for="(num, index) in form.usernums" :key="index" :label="num.userName" :value="num.id" />
            </el-select>
          </el-form-item>
        </template>
        <template v-slot:second>
          <el-form-item label="新用户ID" prop="username" :rules="rules.userid">
            <!-- <el-input v-model="form.userid" placeholder="用户ID" /> -->
            <Input
              ref="username"
              :data="form.userid"
              placeholder="用户ID"
              @input="setNewData"
            />
          </el-form-item>
        </template>
        <template v-slot:third>
          <el-form-item label="新用户名" prop="username" :rules="rules.username">
            <!-- <el-input v-model="form.username" placeholder="用户名" /> -->
            <Input
              ref="username"
              :data="form.username"
              placeholder="用户名"
              @input="setNewData"
            />
          </el-form-item>
        </template>
        <template v-slot:fourth>
          <el-form-item label="新邮箱" prop="useremail" :rules="rules.useremail">
            <!-- <el-input v-model="form.useremail" placeholder="邮箱" /> -->
            <Input
              ref="email"
              :data="form.useremail"
              placeholder="邮箱"
              @input="setNewData"
            />
          </el-form-item>
        </template>
        <template v-slot:fifth>
          <el-form-item label="更改角色" :rules="{required: true, message: '必须选择'}">
            <el-select v-model="form.role" placeholder="选择角色">
              <el-option v-for="(role, index) in form.roles" :key="index" :label="role.displayName" :value="role.name" />
            </el-select>
          </el-form-item>
        </template>
        <template v-slot:sixth>
          <el-form-item label="启用账户">
            <el-switch v-model="form.activation" />
          </el-form-item>
        </template>
      </UpdateForms>
    </div>
    <div v-if="!status" class="container2">
      <DeleteForms
        :form="form"
        type="deleteUser"
        @resetData="setDatas"
        @switchPage="status = !status"
      />
    </div>
  </div>
</template>

<script>
import { validateUsername, validateUserid, validateUseremail } from '@/utils/validate'
import DeleteForms from '@/components/DeleteForms.vue'
import UpdateForms from '@/components/UpdateForms.vue'
import Input from '@/components/Input.vue'
import { setNewData } from '@/utils/tools'

export default {
  components: { DeleteForms, UpdateForms, Input },
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
    setNewData,
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
