<template lang="pug">
#app
  #navbar(:class="{ open: active }")
    .listgroup(v-if="active")
      router-link(to="/table2")
        span table
      router-link(to="/pagination")
        span pagination
      router-link(to="/darkpagination")
        span darkPagination
      router-link(to="/button")
        span button
      router-link(to="/chart")
        span chart
      router-link(to="/grid")
        span grid
      router-link(to="/avatar")
        span avatar
      router-link(to="/container")
        span container
      router-link(to="/row")
        span row
      router-link(to="/col")
        span col
      router-link(to="/card")
        span card
    font-awesome-icon.icon(:icon="['fas', 'times']" v-if="active" color="white" @click.stop="active = false")
    font-awesome-icon.icon(:icon="['fas', 'list']" v-else color="white" @click.stop="active = true")
  div(:class="{left:active}")
  router-view(:class="{view:active}")
</template>

<script>
export default {
  data () {
    return {
      active: false
    }
  }
}
</script>

<style lang="scss">
#app {
  padding-left: 50px;
  display: flex;
}
#navbar {
  .listgroup {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #60827b;
  height: 50px;
  width: 50px;
  position: fixed;
  left: 0;
  top: 0;
  transition: 0.5s;
  a {
    padding: 1rem;
    text-decoration: none;
    color: white;
  }
}
.open {
  width: 250px !important;
  height: 100vh !important;
}
.icon{
  cursor: pointer;
  width: 30px !important;
  height: 30px !important;
  position: fixed;
  left: 10px;
  top: 10px;
}
.view{
  flex: 0 0 calc(100vw - 250px);
}
.left{
  flex: 0 0 250px;;
}
</style>
