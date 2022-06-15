<template>
  <div>
    <el-table
      :data="tenants"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        align="center"
        header-align="center"
        prop="id"
        label="ID"
      />
      <el-table-column
        align="center"
        header-align="center"
        prop="tenancyName"
        label="用户ID"
      />
      <el-table-column
        align="center"
        header-align="center"
        prop="name"
        label="租户显示名称"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tenants: [],
    }
  },
  created() {
    this.setData()
  },
  mounted() {
  },
  methods: {
    async setData() {
      await this.$store.dispatch('user/getTenants')
      this.tenants = this.$store.state.user.tenants
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.isActive === false) {
        return 'warning-row'
      } else if (row.isActive === true) {
        return 'success-row'
      }
      return ''
    }
  }
}
</script>

<style lang="scss">
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
