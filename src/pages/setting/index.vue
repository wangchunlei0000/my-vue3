<template>
  <div class="setting-wrapper">
    <section class="left-section">
      <div class="title">有点is</div>
      <div class="link-list">
        <router-link class="link-nav" to="/setting/account/90"> 账号设置 </router-link>
        <router-link class="link-nav" to="/setting/list"> 列表设置 </router-link>
        <router-link class="link-nav" to="/setting/message"> 消息和邮件设置 </router-link>
      </div>
    </section>
    <section class="right-section">
      <router-view />
      <router-view name="test1" />
      <router-view name="test2" />
    </section>
  </div>
</template>

<script>
export default {
  setup() {
    return {
      a: 1,
    }
  },
}
</script>

<style lang="less" scoped>
.setting-wrapper {
  display: flex;
  height: 100%;
  .left-section {
    width: 280px;
    background-color: antiquewhite;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      font-size: 28px;
      margin: 40px 0;
    }
    .link-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      .link-nav {
        text-decoration: none;
        color: black;
        display: block;
        width: 100%;
        margin-bottom: 24px;
      }
    }
  }
}
</style>
