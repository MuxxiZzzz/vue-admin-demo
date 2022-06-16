<template>
  <div v-if="id === 'admin'" class="dashboard-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="创建用户" name="first">
        <PageOne :active-name="activeName" />
      </el-tab-pane>
      <el-tab-pane label="用户更新/删除" name="second">
        <PageTwo :active-name="activeName" />
      </el-tab-pane>
      <el-tab-pane label="角色创建" name="third">
        <PageThree :active-name="activeName" />
      </el-tab-pane>
      <el-tab-pane label="角色更新/删除" name="fourth">
        <PageFour :active-name="activeName" />
      </el-tab-pane>
      <el-tab-pane label="租户管理" name="fifth">
        <PageFive :active-name="activeName" />
      </el-tab-pane>
      <el-tab-pane label="密码修改" name="sixth">
        <Normal />
      </el-tab-pane>
    </el-tabs>
  </div>
  <div v-else class="second">
    <Normal />
  </div>
</template>

<script>
import PageOne from './pages/PageOne.vue'
import PageTwo from './pages/PageTwo.vue'
import PageThree from './pages/PageThree.vue'
import PageFour from './pages/PageFour.vue'
import PageFive from './pages/PageFive.vue'
import Normal from './pages/Normal'
export default {
  name: 'Dashboard',
  components: { PageOne, PageTwo, PageThree, PageFour, PageFive, Normal },
  data() {
    return {
      activeName: 'first',
      id: this.$store.state.user.name
    }
  },
  computed: {
  },
  created() {
    this.setData()
  },
  methods: {
    async setData() {
      await this.$store.dispatch('user/getPermissions')
      await this.$store.dispatch('user/getRoles')
      await this.$store.dispatch('user/getNums')
    },
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
.second {
  width: 50vw;
  margin: 50px auto;
}
</style>
