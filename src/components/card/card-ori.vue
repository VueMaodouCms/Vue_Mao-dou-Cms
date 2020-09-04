<template lang="pug">
#card
  .card2
    .imgWrap
      .img2
    .text2
      h2
        slot
</template>

<script>
export default {
  props: {
    title: String,
    imgSrc: String,
    imgTop: Boolean,
    imgBottom: Boolean,
    imgLeft: Boolean,
    imgRight: Boolean
  },
  methods: {
  }
}
</script>
