<template>
  <div id="app">
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 100% !important;
  height: 100%;
  font-size: 16px;
  box-sizing: border-box;
  text-align: center;
}
 body {
        position: relative;
        padding: 50px;
        font-size: 24px;
        line-height: 30px;
        background-image: linear-gradient(to right top, #ffcc00 50%, #eee 50%);
        background-size: 100% calc(100% - 100vh + 5px);
        background-repeat: no-repeat;
        // z-index: 1;
      }
      body::after {
    content: "";
    position: fixed;
    top: 5px;
    left: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    z-index: -1;
}
h1 {
    font-size: 32px;
    line-height: 60px;
}

ul {
    margin-top: 30px;
}

p {
    font-size: 24px;
    line-height: 30px;
    margin-top: 30px;
}
</style>
