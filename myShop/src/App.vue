<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header"
import Footer from "./components/Footer"

export default {
  name: 'App',
  components: {Header,Footer},
  mounted(){
    this.$store.dispatch('categoryList')
    
  }
}
</script>

<style lang="less">
@import './resetCss/reset.css' ;
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>