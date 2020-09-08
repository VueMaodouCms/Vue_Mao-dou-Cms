<template lang="pug">
  //- #col
  #col(:class="['col-' + cols, 'col-sm-'+ sm, 'col-md-'+ md, 'col-lg-'+ lg, 'col-xl-'+ xl]" )
    slot
</template>

<script>
export default {
  props: {
    cols: {
      default: 12
    },
    sm: [String, Number],
    md: [String, Number],
    lg: [String, Number],
    xl: [String, Number]
  }
}
</script>
