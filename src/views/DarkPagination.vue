<template lang="pug">
  m-darkPagination(:lists="boxs" :numberPerPage="10" scrollTop)
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
    for (let i = 1; i <= 24; i++) {
      this.boxs.push({ name: i, id: Math.random() })
    }
  }
}
</script>
