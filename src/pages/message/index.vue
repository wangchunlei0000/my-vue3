<template>
  <div class='wrapper'>
    message== {{ testProps }} === 
  </div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  props: {
    testProps: null,
  },
  setup() {
    onMounted(() => {
      console.log('--/message 动态路由参数 会放到route.params 中----')
    })
  }
}

</script>

<style lang="less" scoped>
.wrapper {
}
</style>