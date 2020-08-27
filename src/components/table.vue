<template lang="pug">
#table
  table(border='1')
    thead
      h1 Data
    tbody
      th
        td.selectTd(v-if='selectable')
          input.selectIcon(type="checkbox" @click="selectAll" v-model="selectAllValue")
        td(v-for="(th, index) in tableTh[0]" :key="index" )
          .title(v-if="th.sortable" @click='th.sortToggle = !th.sortToggle,sort(index,tableTh,th.sortToggle)')
            span {{th.title}}
            input.sortIcon(type="checkbox" v-model="th.sortToggle")
          .title(v-else)
            span {{th.title}}
      tr(v-for="(tr, index) in tableData" :key="index" @click="select(tr)")
        td.selectTd(v-if='selectable')
          input.selectIcon(type="checkbox" v-model='tr.select===undefined')
        td(v-for="(td,inx) in tableTh[1]" :key='inx' ) {{tr[td]}}
  p {{selected}}
</template>

<script>

export default {
  props: {
    data: Array,
    title: Array,
    selectable: Boolean,
    modified: Boolean
  },
  data () {
    return {
      tableTitle: [],
      dataToggle: false,
      tableData: [],
      selected: [],
      selectAllValue: false
    }
  },
  computed: {
    tableTh () {
      const tableThOriginal = []
      const tableThReplace = []
      for (const data of this.data) {
        var key = Object.keys(data)
        for (let i = 0; i < key.length; i++) {
          if (!tableThOriginal.includes(key[i])) {
            tableThOriginal.push(key[i])
            tableThReplace.push({ title: key[i] })
          }
        }
      }
      this.getTableData(tableThOriginal)
      this.replaceTitle(tableThReplace, tableThOriginal)
      return [tableThReplace, tableThOriginal]
    }
  },
  methods: {
    getTableData (tableThOriginal) {
      if (this.dataToggle) {
        // ---替換title 加上sortable屬性
        this.dataToggle = false
        // ---重新排序JSON順序
        this.data.forEach(data => {
          const perData = {}
          for (let i = 0; i < tableThOriginal.length; i++) {
            perData[tableThOriginal[i]] = data[tableThOriginal[i]]
            // ---判斷是否可選擇，每筆資料多推一個select = false
            if (this.selectable) {
              perData.select = false
            }
          }
          this.tableData.push(perData)
        })
      }
    },
    replaceTitle (tableThReplace, tableThOriginal) {
      this.title.map(title => {
        for (let i = 0; i < tableThReplace.length; i++) {
          if (title.replace !== undefined && title.original !== undefined) {
            if (tableThReplace[i].title === (title.original)) {
              tableThReplace[i].title = title.replace
            }
          }
          if (title.original !== undefined && title.sortable === true) {
            if (tableThOriginal[i] === title.original) {
              tableThReplace[i].sortable = true
              tableThReplace[i].sortToggle = true
            }
          }
        }
      })
    },
    select (perData) {
      const find = this.selected.findIndex(select => {
        return select === perData
      })
      if (find !== -1) {
        perData.select = false
        this.selected.splice(find, 1)
      } else {
        perData.select = undefined
        this.selected.push(perData)
      }
      if (this.selected.length === this.tableData.length) {
        this.selectAllValue = true
      } else {
        this.selectAllValue = false
      }
    },
    selectAll () {
      if (this.selected.length !== this.tableData.length) {
        this.tableData.map(perData => {
          const find = this.selected.findIndex(select => {
            return select === perData
          })
          if (find !== -1) {
            perData.select = false
          } else {
            perData.select = undefined
            this.selected.push(perData)
          }
        })
        this.tableData.forEach(perData => {
          perData.select = undefined
        })
      } else {
        this.selected = []
        this.tableData.forEach(perData => {
          perData.select = false
        })
      }
    },
    sort (index, tableTh, toggle) {
      const key = tableTh[1][index]
      const array = []
      const NewSortData = []
      this.tableData.forEach(data => {
        array.push(data[key])
      })
      toggle ? array.sort() : array.reverse()
      for (let i = 0; i < array.length; i++) {
        const result = this.tableData.find(data => {
          return data[key] === array[i]
        })
        this.tableData.splice(this.tableData.indexOf(result), 1)

        NewSortData.push(result)
      }
      this.tableData = NewSortData
    }
  },
  mounted () {
    this.dataToggle = true
  }
}
</script>
<style lang="scss" scoped>
#table{
  .sortIcon{
    float: right
  }
  .selectTd{
    width: 5%;
  }

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
