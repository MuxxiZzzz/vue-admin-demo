<template>
  <div style="height: 100%">
    <div v-if="status" class="container">
      <UpdateForms
        :form="form"
        type="updateRole"
        @resetData="setDatas"
        @switchPage="status = !status"
      >
        <template v-slot:first>
          <el-form-item label="选择角色" :rules="{required: true, message: '必须选择'}">
            <el-select v-model="form.roleid" placeholder="选择角色" @change="setData(form.roleid)">
              <el-option v-for="(role, index) in form.roles" :key="index" :label="role.displayName" :value="role.id" />
            </el-select>
          </el-form-item>
        </template>
        <template v-slot:second>
          <el-form-item label="角色ID" prop="roleName" :rules="rules.roleid">
            <!-- <el-input v-model="form.roleName" placeholder="角色ID" /> -->
            <Input
              ref="roleName"
              :data="form.roleName"
              placeholder="角色ID"
              @input="setNewData"
            />
          </el-form-item>
        </template>
        <template v-slot:third>
          <el-form-item label="角色名" prop="roleDisplayName" :rules="{required: true, message: '必须填写'}">
            <!-- <el-input v-model="form.roleDisplayName" placeholder="角色名" /> -->
            <Input
              ref="roleDisplayName"
              :data="form.roleDisplayName"
              placeholder="角色名"
              @input="setNewData"
            />
          </el-form-item>
        </template>
        <template v-slot:fourth>
          <el-form-item label="选择权限" prop="permission" :rules="{required: true, message: '必须选择'}">
            <el-select v-model="form.permission" placeholder="选择权限">
              <el-option v-for="(permission, index) in form.permissions" :key="index" :label="permission.displayName" :value="permission.name" />
            </el-select>
          </el-form-item>
        </template>
      </UpdateForms>
    </div>
    <div v-if="!status" class="container2">
      <DeleteForms
        :form="form"
        type="deleteRole"
        @resetData="setDatas"
        @switchPage="status = !status"
      />
    </div>
  </div>
</template>

<script>
import { validateUserid } from '@/utils/validate'
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
        permission: '',
        permissions: [],
        roleDisplayName: '',
        roleid: '',
        roleName: '',
        roles: this.$store.state.user.roles,
        deleteRole: '',
      },
      rules: {
        roleid: [{ required: true, trigger: 'blur', validator: validateUserid }],
      },
    }
  },
  watch: {
    activeName: {
      handler: 'checkData',
      deep: false,
    }
  },
  created() {
  },
  mounted() {

  },
  methods: {
    setNewData,
    checkData() {
      if (this.activeName === 'fourth') {
        this.setDatas()
      }
    },
    async setDatas() {
      await this.$store.dispatch('user/getPermissions')
      await this.$store.dispatch('user/getRoles')
      this.form.permissions = this.$store.state.user.permissions
      this.form.roles = this.$store.state.user.roles
    },
    getRoles() {
      this.$store.dispatch('user/getRoles')
        .then((data) => {
          this.form.roles = data
        })
        .catch(() => {
          this.form.roles = [{
            displayName: '获取错误',
            name: ''
          }]
        })
    },
    switcher() {
      this.status = !this.status
    },
    setData(id) {
      const res = this.form.roles.filter((item) => {
        if (item.id === id) {
          return item
        }
      })
      this.form.roleName = res[0].name
      this.form.roleDisplayName = res[0].displayName
    },
    accountDelete(id) {
      if (id === '') {
        this.$message('请选择要操作的角色')
      } else {
        this.loading = true
        this.$store.dispatch('user/deleteRole', id)
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
