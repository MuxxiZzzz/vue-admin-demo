<template>
  <el-table-column
    align="center"
    header-align="center"
    :prop="data"
    :label="label(data)"
  />
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      default: '',
      required: true
    },
  },
  data() {
    return {

    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    label(data) {
      if (data === 'id') return 'ID'
      if (data === 'userName') return '用户ID'
      if (data === 'emailAddress') return '邮箱'
      if (data === 'name') return '名称'
      if (data === 'tenancyName') return '租户ID'
    }
  }
}
</script>
