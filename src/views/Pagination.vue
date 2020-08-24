<template lang="pug">
  m-pagination(:lists="boxs" :numberPerPage="5" scrollTop)
    template(v-slot:pagelist="anythingyouwant")
      h1 {{ anythingyouwant }}
</template>
<script>
export default {
  data () {
    return {
      boxs: []
    }
  },
  mounted () {
    for (let i = 1; i <= 50; i++) {
      this.boxs.push({ name: i, id: Math.random() })
    }
  }
}
</script>
