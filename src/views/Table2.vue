<template lang="pug">
#container.container.bg-beige
  m-table2(:data="boxs"
          :title="title"
          :extra='extra'
          trColor="#ffffff"
          thColor="#B7CDC2"
          selectable
          editable
          searchable
          isStripe
          @Selected='getSelected($event)'
          )
    template(v-slot:thead)
      h1 table 樣式一
    template(#index) 編
    template(v-slot:name-4='{data}')
      .mark {{data}}
    //- template(#確認)
    //-   .test
    //-     m-button
    template(v-slot:id-7='{data}')
      .mark {{data}}
  p {{selected}}
  br
  m-table2(:data="boxs"
          :title="title"
          :extra='extra'
          :stripes="['#F7F6EE', '#EAE6DA']"
          thColor="#60827B"
          selectable
          editable
          searchable
          @Selected='getSelected2($event)'
          )
    template(v-slot:thead)
      h1 table 樣式二
    template(#index) 編
    template(v-slot:name-4='{data}')
      .mark {{data}}
    //- template(#確認)
    //-   .test
    //-     m-button
    template(v-slot:id-7='{data}')
      .mark {{data}}
  p {{selected2}}

</template>

<script>
export default {
  data () {
    return {
      selected: [],
      selected2: [],
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
    },
    getSelected2 (event) {
      this.selected2 = event
    }
  },
  mounted () {
    for (let i = 1; i <= 5; i++) {
      const rand = Math.random() > 0.5 ? 'male' : 'female'
      this.boxs.push({ name: 'Sam', id: Math.random(), gender: rand })
    }
    this.boxs.push({ id: Math.random(), a: 'asd', gender: 'no', name: 'Jack' })
    this.boxs.push({ id: Math.random(), name: 'Lucy' })
  }
}
</script>
<style>
.mark{
  background: green;
  color:white
}

</style>
