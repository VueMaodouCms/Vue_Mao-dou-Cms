<template lang="pug">
  #table
    table(border='1')
      thead
        p Data
      tbody
        th
          td(v-for="(th, index) in tableTh" :key="index")
            .td {{th}}
        tr(v-for="(tr, index) in data" :key="index")
          td(v-for="(td,inx) in tableTh" :key='inx')
            .td {{tr[td]}}
</template>

<script>
export default {
  props: {
    data: Array,
    title: Array
  },
  data () {
    return {
      tableTitle: [],
      toggle: true
    }
  },
  computed: {
    tableTh () {
      var tableTh = []
      for (const data of this.data) {
        var keyOriginal = Object.keys(data)
        var keyReplace = Object.keys(data)
        if (this.title.length > 0) {
          this.title.map(title => {
            for (let i = 0; i < keyReplace.length; i++) {
              if (keyReplace[i].includes(title.original)) {
                keyReplace[i] = title.replace
              }
            }
          })
        }
        for (let i = 0; i < keyReplace.length; i++) {
          if (!tableThReplace.includes(keyReplace[i])) {
            tableThReplace.push(
              keyReplace[i]
            )
          }
        }
        for (let i = 0; i < keyOriginal.length; i++) {
          if (!tableThOriginal.includes(keyOriginal[i])) {
            tableThOriginal.push(
              keyOriginal[i]
            )
          }
        }
      }
      return [tableThReplace, tableThOriginal]
    }
  },
  methods: {
    sort (index, tableTh, toggle) {
      console.log(toggle)
      this.data.sort(function (a, b) {
        const key = tableTh[1][index]
        if (toggle) {
          return a[key] - b[key]
        } else {
          return b[key] - a[key]
        }
      })
    }
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
#table{
  table{
    width: 100%;
    padding: 0;
    border: 0;
    thead{
      text-align: center;
      font-size: 1.5rem;
    }
    tbody{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding: 0;
      th{
        width: 100%;
        display: flex;
        justify-content: space-around;
        padding: 0;
        td{
          width: 100%;
        }
      }
      tr{
        width: 100%;
        display: flex;
        justify-content: space-around;
        td{
          width: 100%;
        }
      }
    }
  }
}
</style>
