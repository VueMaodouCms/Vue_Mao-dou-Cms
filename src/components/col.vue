<template lang="pug">
  #col
  //- #col(:class="{'col-' + cols:true}")
    slot
</template>

<script>
export default {
  props: {
    cols: {
      type: String,
      default: 'auto'
    }
  }
}
</script>
