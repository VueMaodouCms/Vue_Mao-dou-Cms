<template lang="pug">
#table
  table(border='1')
    thead
      h1 Data
    tbody
      th
        td(v-for="(th, index) in tableTh" :key="index") {{th}}
      tr(v-for="(tr, index) in data" :key="index")
        td(v-for="(td,inx) in tableTh" :key='inx') {{tr[td]}}
</template>

<script>
export default {
  props: {
    data: Array
  },
  data () {
    return {
    }
  },
  computed: {
    tableTh () {
      const tableTh = []
      for (const data of this.data) {
        var key = Object.keys(data)
        for (let i = 0; i < key.length; i++) {
          if (!tableTh.includes(key[i])) {
            tableTh.push(key[i])
          }
        }
      }
      return tableTh
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
