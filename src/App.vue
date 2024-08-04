<template>
  <div id="app">
    <router-view></router-view>
  </div>

</template>

<script>

export default {
  name: 'App',
  components: {

  },

}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
li {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
a {
  color: inherit; /* 继承父元素的颜色 */
  text-decoration: none; /* 去除下划线 */
}

a:hover,
a:active,
a:focus {
  color: inherit; /* 保持颜色不变 */
  text-decoration: none; /* 去除悬停时的下划线 */
}
</style>
