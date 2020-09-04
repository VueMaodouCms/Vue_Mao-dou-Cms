<template lang="pug">
  //- #col
  #col(:class="'col-' + cols")
    slot
</template>

<script>
export default {
  props: {
    cols: {
      default: 12
    }
  }
}
</script>
