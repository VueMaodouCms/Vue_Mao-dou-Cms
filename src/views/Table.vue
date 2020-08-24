<template lang="pug">
  #table
    m-table(:data="boxs")
</template>

<script>
export default {
  data () {
    return {
      boxs: []
    }
  },
  mounted () {
    for (let i = 1; i <= 5; i++) {
      const rand = Math.random() > 0.5 ? 'male' : 'female'
      this.boxs.push({ name: i, id: Math.random(), gender: rand })
    }
    this.boxs.push({ name: 6, id: Math.random(), a: 'asd', gender: 'no' })
    this.boxs.push({ name: 7, id: Math.random(), b: 'asasdd' })
  }
}
</script>
