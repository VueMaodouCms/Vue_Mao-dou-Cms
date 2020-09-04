<template lang="pug">
  #app
    router-link(to="/table")
      span table |
    router-link(to="/table2")
      span table2 |
    router-link(to="/pagination")
      span pagination |
    router-link(to="/darkpagination")
      span darkPagination |
    router-link(to="/button")
      span button |
    router-link(to="/chart")
      span chart |
    router-link(to="/grid")
      span grid |
    router-link(to="/avatar")
      span avatar |
    router-link(to="/container")
      span container |
    router-link(to="/row")
      span row |
    router-link(to="/col")
      span col|
    router-link(to="/card")
      span card
    router-view
</template>

<script>

</script>
