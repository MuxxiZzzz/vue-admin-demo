<template>
  <div>
    <el-table
      :data="tenants"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <Tables :data="'id'" />
      <Tables :data="'tenancyName'" />
      <Tables :data="'name'" />
    </el-table>
  </div>
</template>

<script>
import Tables from '@/components/Tables'
export default {
  components: { Tables },
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
