<template>
  <div class='wrapper'>
    account {{ id }} ---- {{ route.params.id }}
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  props: {
    id: Number
  },
  setup() {
    const route = useRoute()
    onMounted(() => {
      console.log('--/list/:id 动态路由参数 会放到route.params 中----', route.params.id)
    })
    return { route }
  }
}

</script>

<style lang="less" scoped>
.wrapper {
}
</style>