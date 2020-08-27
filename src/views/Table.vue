<template lang="pug">
  m-table(:data="boxs" :title="title" selectable modified)
</template>

<script>
export default {
  data () {
    return {
      boxs: [],
      title: [
        {
          original: 'id',
          replace: '編號',
          sortable: true
        },
        {
          original: 'a',
          replace: 'aaaa',
          sortable: false
        },
        {
          original: 'name',
          replace: '名字',
          sortable: true
        }
      ]
    }
  },
  mounted () {
    for (let i = 1; i <= 5; i++) {
      const rand = Math.random() > 0.5 ? 'male' : 'female'
      this.boxs.push({ name: i, id: Math.random(), gender: rand })
    }
    this.boxs.push({ id: Math.random(), a: 'asd', gender: 'no', name: 6 })
    this.boxs.push({ id: Math.random(), b: 'asasdd', name: 7 })
  }
}
</script>
