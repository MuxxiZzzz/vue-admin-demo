<template>
  <div class="container">
    <!-- <el-form ref="form" :model="form" label-width="80px">
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
    </el-form> -->
    <CreateForms
      :form="form"
      type="createUser"
      @resetData="setData"
    >
      <template v-slot:first>
        <el-form-item label="用户ID" prop="userid" :rules="rules.userid">
          <!-- <el-input v-model="form.userid" placeholder="用户ID" /> -->
          <Input
            ref="userid"
            :data="form.userid"
            placeholder="用户ID"
            @input="setNewData"
          />
        </el-form-item>
      </template>
      <template v-slot:second>
        <el-form-item label="用户名" prop="username" :rules="rules.username">
          <!-- <el-input v-model="form.username" placeholder="用户名" /> -->
          <Input
            ref="username"
            :data="form.username"
            placeholder="用户名"
            @input="setNewData"
          />
        </el-form-item>
      </template>
      <template v-slot:third>
        <el-form-item label="邮箱" prop="useremail" :rules="rules.useremail">
          <!-- <el-input v-model="form.useremail" placeholder="邮箱" /> -->
          <Input
            ref="email"
            :data="form.useremail"
            placeholder="邮箱"
            @input="setNewData"
          />
        </el-form-item>
      </template>
      <template v-slot:fourth>
        <el-form-item label="密码" prop="password" :rules="rules.password">
          <Input
            ref="password"
            :data="form.password"
            type="password"
            placeholder="密码"
            @input="setNewData"
          />
        </el-form-item>
      </template>
      <template v-slot:fifth>
        <el-form-item label="角色" :rules="{required: true, message: '必须选择'}">
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
    </CreateForms>
  </div>
</template>

<script>
import { validateUsername, validateUserid, validateUseremail, validatePassword } from '@/utils/validate'
import CreateForms from '@/components/CreateForms.vue'
import Input from '@/components/Input.vue'
import { setNewData } from '@/utils/tools'

export default {
  components: { CreateForms, Input },
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
    setNewData,
    checkData() {
      if (this.activeName === 'first') {
        this.setData()
      }
    },
    async setData() {
      await this.$store.dispatch('user/getRoles')
      this.form.roles = this.$store.state.user.roles
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
