<template>
  <div class="container">
    <el-table
      :data="users"
      style="width: 100%"
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
        prop="userName"
        label="用户ID"
      />
      <el-table-column
        align="center"
        header-align="center"
        prop="name"
        label="用户名"
      />
      <el-table-column
        align="center"
        header-align="center"
        prop="emailAddress"
        label="邮箱"
      />
    </el-table>
  </div>
</template>

<script>
export default {
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
