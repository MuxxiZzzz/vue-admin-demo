<template>
  <el-input
    ref="ipt"
    v-model="value"
    :type="type"
    :placeholder="placeholder"
    @input="input"
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
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      value: '',
    }
  },
  created() {
    this.value = this.$props.data
  },
  mounted() {

  },
  methods: {
    input() {
      this.$emit('input', this.value, this.$props.placeholder)
    }
  }
}
</script>

<style>

</style>
