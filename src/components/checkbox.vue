<template lang="pug">
  div
    #checkbox(v-if="!circle")
      input(type="checkbox")
    #checkbox-circle(v-else)
      input(type="checkbox")
</template>

<script>
export default {
  props: {
    circle: { type: Boolean, default: false }
  }
}
</script>
