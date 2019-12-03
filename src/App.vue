<template lang='pug'>
  #app
    top-header
    router-view
</template>

<script>
import Header from './components/HeaderTop'

export default {
  components: {
    "top-header": Header
  },
  created() {
    this.loadRecords();
  },
  methods: {
    loadRecords() {
      this.$store.dispatch('LOAD_RECORDS')
    }
  },
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.btn{
  text-decoration: none;
  padding: 10px;
  font-weight: bold;
  text-transform: uppercase;
  color:#fff;
  font-size: 16px;
  background: #6c7ae0;
  border-radius: 4px;
  display: inline-block;
  cursor: pointer;
}
</style>
