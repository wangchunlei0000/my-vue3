<template>
  <div class="wrapper">list ==</div>
</template>

<script>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    onMounted(() => {
      console.log('--/list/:id 动态路由参数 会放到route.params 中----', route.params.id)
    })
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  color: black;
}
</style>
