<template>
  <div style="height: 100%">
    <div v-if="status" class="container">
      <!-- <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="选择角色" :rules="{required: true, message: '必须选择'}">
          <el-select v-model="form.roleid" placeholder="选择角色" @change="setData(form.roleid)">
            <el-option v-for="(role, index) in form.roles" :key="index" :label="role.displayName" :value="role.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="角色ID" prop="roleName" :rules="rules.roleid">
          <el-input v-model="form.roleName" placeholder="角色ID" />
        </el-form-item>
        <el-form-item label="角色名" prop="roleDisplayName" :rules="{required: true, message: '必须填写'}">
          <el-input v-model="form.roleDisplayName" placeholder="角色名" />
        </el-form-item>
        <el-form-item label="选择权限" prop="permission" :rules="{required: true, message: '必须选择'}">
          <el-select v-model="form.permission" placeholder="选择权限">
            <el-option v-for="(permission, index) in form.permissions" :key="index" :label="permission.displayName" :value="permission.name" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <div style="display: flex;justify-content: space-between;">
            <el-button type="primary" style="width: 70%" :loading="loading" @click.native="onSubmit">更新信息</el-button>
            <el-button type="primary" style="width: 30%" @click.native="switcher">
              <span class="el-icon-right" />
            </el-button>
          </div>
        </el-form-item>
      </el-form> -->
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
            <el-input v-model="form.roleName" placeholder="角色ID" />
          </el-form-item>
        </template>
        <template v-slot:third>
          <el-form-item label="角色名" prop="roleDisplayName" :rules="{required: true, message: '必须填写'}">
            <el-input v-model="form.roleDisplayName" placeholder="角色名" />
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
      <!-- <el-form ref="form2" :model="form" label-width="auto">
        <el-form-item label="选择角色">
          <el-select v-model="form.deleteRole" placeholder="选择角色" style="width:80%">
            <el-option v-for="(role, index) in form.roles" :key="index" :label="role.displayName" :value="role.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <div>
            <el-button type="primary" size="medium" style="width: 50%" :loading="loading" @click.native="accountDelete(form.deleteRole)">删除角色</el-button>
            <el-button type="primary" size="medium" style="width: 28.5%" @click.native="switcher">
              <span class="el-icon-right" />
            </el-button>
          </div>
        </el-form-item>
      </el-form> -->
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
export default {
  components: { DeleteForms, UpdateForms },
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
    // onSubmit() {
    //   this.$refs.form.validate(valid => {
    //     if (valid) {
    //       const { roleName, roleid, roleDisplayName, permission } = this.form
    //       this.loading = true
    //       this.$store.dispatch(
    //         'user/updateRole',
    //         {
    //           id: roleid,
    //           name: roleName,
    //           displayName: roleDisplayName,
    //           grantedPermissions: [permission]
    //         })
    //         .then(() => {
    //           this.$message({
    //             message: '更改成功',
    //             type: 'success'
    //           })
    //           this.setDatas()
    //           this.loading = false
    //         })
    //         .catch(() => {
    //           this.loading = false
    //         })
    //     } else {
    //       this.$message('请填写好信息')
    //       return false
    //     }
    //   })
    // },
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
