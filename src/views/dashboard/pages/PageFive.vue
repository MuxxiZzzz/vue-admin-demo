<template>
  <div class="container">
    <div v-if="status">
      <CreateForms
        :form="form"
        type="createTenant"
        :switcher="true"
        @resetData="setData"
        @switchPage="status = !status"
      >
        <template v-slot:first>
          <el-form-item label="租户名" prop="tenantName" :rules="rules.tenantName">
            <!-- <el-input v-model="form.tenantName" placeholder="租户名" /> -->
            <Input
              ref="tenantName"
              :data="form.tenantName"
              placeholder="租户名"
              @input="setNewData"
            />
          </el-form-item>
        </template>
        <template v-slot:second>
          <el-form-item label="邮箱" prop="AdminEmailAddress" :rules="rules.AdminEmailAddress">
            <!-- <el-input v-model="form.AdminEmailAddress" placeholder="AdminEmailAddress" /> -->
            <Input
              ref="AdminEmailAddress"
              :data="form.AdminEmailAddress"
              placeholder="AdminEmailAddress"
              @input="setNewData"
            />
          </el-form-item>
        </template>
        <template v-slot:third>
          <el-form-item label="启用租户">
            <el-switch v-model="form.activation" />
          </el-form-item>
        </template>
      </CreateForms>
    </div>
    <div v-if="!status">
      <DeleteForms
        :form="form"
        type="deleteTenant"
        @resetData="setData"
        @switchPage="status = !status"
      />
    </div>
  </div>
</template>

<script>
import { validateUsername, validateUseremail } from '@/utils/validate'
import CreateForms from '@/components/CreateForms.vue'
import DeleteForms from '@/components/DeleteForms.vue'
import Input from '@/components/Input.vue'
import { setNewData } from '@/utils/tools'

export default {
  components: { CreateForms, DeleteForms, Input },
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
    setNewData,
    checkData() {
      if (this.activeName === 'fifth') {
        this.setData()
      }
    },
    async setData() {
      await this.$store.dispatch('user/getTenants')
      this.form.tenants = this.$store.state.user.tenants
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
