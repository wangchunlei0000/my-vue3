<template>
  <div class="wrapper">
    message== {{ testProps }} ===
    <div>message value==={{ message }}</div>
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
    const message = ref(0)
    onMounted(() => {
      console.log('--/message 动态路由参数 会放到route.params 中----')
    })
    const changeMessage = () => {
      message.value += 1
    }
    return {
      message,
      changeMessage,
    }
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  color: black;
}
</style>
