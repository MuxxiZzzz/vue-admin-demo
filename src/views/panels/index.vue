<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="用户列表" name="first">
        <PageOne />
      </el-tab-pane>
      <el-tab-pane label="租户列表" name="second">
        <PageTwo />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PageOne from './pages/PageOne.vue'
import PageTwo from './pages/PageTwo.vue'
export default {
  name: 'Dashboard',
  components: { PageOne, PageTwo },
  data() {
    return {
      activeName: 'first'
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
