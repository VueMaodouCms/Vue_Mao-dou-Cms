<template lang="pug">
#table
  table(border='1')
    thead
      p Test
    tbody
      th
        td(v-for="(th, index) in tableTh" :key="index")
          .td {{th}}
        //- td id
        //- td gender
      tr(v-for="(tr, index) in data" :key="index")
        td(v-for="(td,inx) in tableTh" :key='inx')
          .td {{tr[td]}}
</template>

<script>
export default {
  props: {
    data: Array
  },
  data () {
    return {
      // 現在的頁面
    }
  },
  computed: {
    tableTh () {
      const tableTh = Object.keys(this.data[0])
      for (const data of this.data) {
        const key = Object.keys(data)
        for (let i = 0; i < key.length; i++) {
          if (!tableTh.includes(key[i])) {
            tableTh.push(key[i])
          }
        }
      }
      return tableTh
    }
  }
}
</script>
<style lang="scss" scoped>
#table{
  table{
    width: 100%;
    thead{
      text-align: center;
      font-size: 1.5rem;
      margin: 0;
    }
    tbody{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      th{
        width: 100%;
        display: flex;
        justify-content: space-around;
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
