<template lang="pug">
#card
  .card3
    .img3
    .shadow
    .text3
      h2
        slot
</template>

<script>
export default {
  props: {
    title: String,
    imgSrc: String
  }
}
</script>
