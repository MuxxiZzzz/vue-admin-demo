<template>
  <div class="container">
    <CreateForms
      :form="form"
      type="createRole"
      @resetData="setData"
    >
      <template v-slot:first>
        <el-form-item label="角色ID" prop="roleid" :rules="rules.roleid">
          <!-- <el-input v-model="form.roleid" placeholder="英文ID" /> -->
          <Input
            ref="roleid"
            :data="form.roleid"
            placeholder="英文ID"
            @input="setNewData"
          />
        </el-form-item>
      </template>
      <template v-slot:second>
        <el-form-item label="显示名" prop="describeName" :rules="{required: true, message: '必须填写'}">
          <!-- <el-input v-model="form.describeName" placeholder="中文名" /> -->
          <Input
            ref="describeName"
            :data="form.describeName"
            placeholder="中文名"
            @input="setNewData"
          />
        </el-form-item>
      </template>
      <template v-slot:third>
        <el-form-item label="权限" :rules="{required: true, message: '必须选择'}">
          <el-select v-model="form.permission" placeholder="选择权限">
            <el-option v-for="(permission, index) in form.permissions" :key="index" :label="permission.displayName" :value="permission.name" />
          </el-select>
        </el-form-item>
      </template>
    </CreateForms>
  </div>
</template>

<script>
import { validateUserid } from '@/utils/validate'
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
      loading: false,
      form: {
        roleid: '',
        describeName: '',
        permission: '',
        permissions: [],
      },
      rules: {
        roleid: [{ required: true, trigger: 'blur', validator: validateUserid }]
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
      if (this.activeName === 'third') {
        this.setData()
      }
    },
    async setData() {
      await this.$store.dispatch('user/getPermissions')
      this.form.permissions = this.$store.state.user.permissions
    },
    getPermissions() {
      this.$store.dispatch('user/getPermissions').then((data) => {
        this.form.permissions = data
      }).catch(() => {
        this.form.permissions = [{
          displayName: '获取错误',
          name: ''
        }]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
    width: 50vw;
    margin: 50px auto;
}
</style>
