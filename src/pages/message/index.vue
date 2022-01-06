<template>
  <div class='wrapper'>
    message== {{ testProps }} === 
    <div>
      message value==={{message}}
    </div>
    <div>
      <button @click="changeMessage">change message</button>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
  props: {
    testProps: null,
  },
  setup() {
    let message = ref(0)
    onMounted(() => {
      console.log('--/message 动态路由参数 会放到route.params 中----')
    })
    const changeMessage = () => {
      message.value++
    }
    return {
      message,
      changeMessage
    }
  }
}

</script>

<style lang="less" scoped>
.wrapper {
}
</style>