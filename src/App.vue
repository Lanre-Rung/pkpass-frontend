<template>
  <div id="app">
    <div class="header"
         @click="goToPer">
      <img src="./assets/cat.jpg"
           alt="">
      <p>{{ name }}</p>
    </div>
    <router-view></router-view>
    <!-- <footer>页脚</footer> -->
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data () {
    return {
      name: ''
    }
  },
  mounted () {
    this.name = localStorage.getItem('name')
  },
  methods: {
    goToPer () {
      this.$router.push('/merchant')
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* overflow: hidden; */
}

html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
li {
  list-style-type: none;
}
p,
h3 {
  margin: 0;
}
.header {
  display: flex;
  flex-direction: column-reverse;
}
.header p {
  position: absolute;
  right: 120px;
  top: 40px;
}
.header img {
  position: absolute;
  right: 160px;
  top: 30px;
  height: 50px;
  width: 50px;
}
</style>
