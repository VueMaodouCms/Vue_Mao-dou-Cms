<template lang="pug">
  #app
    router-link(to="/table")
      span table |
    router-link(to="/pagination")
      span pagination |
    router-link(to="/darkpagination")
      span darkPagination |
    router-link(to="/button")
      span button |
    router-link(to="/chart")
      span chart
    router-view
</template>

<script>

</script>
