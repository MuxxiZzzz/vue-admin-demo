<template>
  <div>
    <el-table
      :data="users"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <Tables :data="'id'" />
      <Tables :data="'userName'" />
      <Tables :data="'name'" />
      <Tables :data="'emailAddress'" />
    </el-table>
  </div>
</template>

<script>
import Tables from '@/components/Tables'
export default {
  components: { Tables },
  data() {
    return {
      users: [],
    }
  },
  created() {
    this.setData()
  },
  mounted() {
  },
  methods: {
    status(isActive) {
      console.log(isActive)
    },
    async setData() {
      await this.$store.dispatch('user/getNums')
      this.users = this.$store.state.user.users
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
