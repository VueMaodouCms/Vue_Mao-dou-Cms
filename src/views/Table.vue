<template lang="pug">
#aaa
  m-table(:data="boxs" :title="title" selectable @getSelected='getSelected($event) ')
  p {{selected}}

</template>

<script>
export default {
  data () {
    return {
      selected: [],
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
          sortable: true
        },
        {
          original: 'name',
          replace: '名字',
          sortable: true
        }
      ]
    }
  },
  methods: {
    getSelected (event) {
      this.selected = event
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
