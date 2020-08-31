<template lang="pug">
#container
  m-table(:data="boxs"
          :title="title"
          :extra='extra'
          :stripes="['#84A295','#B7CDC2']"
          selectable
          editable
          searchable
          @Selected='getSelected($event)'
          )
    template(v-slot:thead)
      h1 你要改的資料標題
    template(#確認)
      .test
        m-button
    template(v-slot:id-4='{data}')
      .mark {{data}}
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
      ],
      extra: [
        {
          title: '確認',
          index: 4
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
    this.boxs.push({ id: Math.random(), name: 7 })
  }
}
</script>
<style>
.mark{
  background: blue;
  color:red
}

</style>
