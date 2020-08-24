<template lang="pug">
  #app
    router-link(to="/table")
      span table |
    router-link(to="/pagination")
      span pagination |
    router-link(to="/button")
      span button
    router-view
</template>

<script>

</script>
