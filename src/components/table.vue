<template lang="pug">
#table
  table(border='1')
    thead
      slot(name="thead")
        h1 Data
      .search
        input.searchIcon(v-if='searchable' v-model='searchValue' placeholder='點我開始篩選')
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
      tr(v-for="(tr, index) in tableData" :key="index" @click="select(tr,index)")
        td.selectTd(v-if='selectable')
          input.selectIcon(type="checkbox" v-model='tr.select===undefined')
        td(v-for="(td,inx) in tableTh[1]" :key='inx' @click="edit(tr,td,index,inx)")
          slot(:name="td+'-'+index")
            slot(:name='td')
              .td {{tr[td]}}
              input.inputIcon(v-if="index+','+inx===editJudge" v-model ='editValue')
              input.ok(v-if="index+','+inx===editJudge" type='button' value='ok' @click="editOk(tr,td)")
</template>
<script>
export default {
  props: {
    // 資料
    data: Array,
    // 替換的title和是否排序
    title: Array,
    // 額外資料
    extra: Array,
    // 可否被選擇
    selectable: Boolean,
    // 可否被編輯
    editable: Boolean,
    // 可否搜尋
    searchable: Boolean
  },
  data () {
    return {
      tableTitle: [],
      dataToggle: false,
      tableData: [],
      searchData: [],
      selected: [],
      selectAllValue: false,
      editJudge: null,
      editValue: null,
      editToggle: true,
      searchValue: ''
    }
  },
  computed: {
    // 計算標題和替換後標題
    tableTh () {
      const tableThOriginal = []
      const tableThReplace = []
      this.data.map(data => {
        var key = Object.keys(data)
        for (let i = 0; i < key.length; i++) {
          if (!tableThOriginal.includes(key[i])) {
            tableThOriginal.push(key[i])
            tableThReplace.push({ title: key[i] })
          }
        }
      })
      this.extra.map(data => {
        if (data.title) {
          if (data.index) {
            tableThOriginal.splice(data.index, 0, data.title)
            tableThReplace.splice(data.index, 0, { title: data.title })
          } else if (data.index === 0) {
            tableThOriginal.splice(data.index, 0, data.title)
            tableThReplace.splice(data.index, 0, { title: data.title })
          } else {
            tableThOriginal.push(data.title)
            tableThReplace.push({ title: data.title })
          }
        }
      })
      this.getTableData(tableThOriginal)
      this.replaceTitle(tableThReplace, tableThOriginal)
      return [tableThReplace, tableThOriginal]
    }
  },
  methods: {
    // 把資料排序打散重新照KEY順序排列，若可被選擇的話，每筆資料會在這裡加上select = false的屬性，用dataToggle在Mounted時=true之後改成false防止重複排序bug
    getTableData (tableThOriginal) {
      if (this.dataToggle) {
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
        this.searchData = this.tableData
      }
    },
    // 判斷傳進來的Title是否被替換，和是否可以被排序
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
    // 編輯資料
    edit (perData, key, index, inx) {
      window.removeEventListener('click', this.editCancel)
      if (this.editable && this.editToggle) {
        this.editJudge = index + ',' + inx
        this.editValue = perData[key]
      }
      setTimeout(() => {
        window.addEventListener('click', this.editCancel)
      }, 1)
    },
    // 編輯資料OK
    editOk (perData, key) {
      this.editToggle = false
      this.editJudge = null
      perData[key] = this.editValue
      setTimeout(() => {
        window.removeEventListener('click', this.editCancel)
        this.editToggle = true
      }, 1)
    },
    // 編輯資料取消
    editCancel () {
      window.removeEventListener('click', this.editCancel)
      if (this.editToggle) {
        this.editJudge = null
      }
    },
    // 選擇一列資料並整理在selected傳回views
    select (perData) {
      if (this.selectable) {
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
      }
    },
    // 全選或全反選資料並整理在selected傳回views
    selectAll () {
      if (this.selectable) {
        if (this.selectAllValue) {
          this.tableData.map(perData => {
            const find = this.selected.findIndex(select => {
              return select === perData
            })
            perData.select = false
            this.selected.splice(find, 1)
          })
        } else {
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
        }
      }
    },
    // 排序，為了讓文字和undefined也能排序，把排序時的現有tableData全部打散，拆開來排序後取代原先tableData，待優化寫法，目前想不出更好的，容易出BUG的部分
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
  watch: {
    // 監聽搜尋事件
    searchValue () {
      const result = this.searchData.filter(data => {
        const key = this.tableTh[1]
        for (let i = 0; i < key.length; i++) {
          if (data[key[i]] !== undefined) {
            const StringValue = data[key[i]].toString()
            if (StringValue.includes(this.searchValue)) {
              return true
            }
          }
        }
      })
      this.tableData = result
    },
    // 監聽選擇事件
    selected () {
      this.$emit('Selected', this.selected)
      const result = this.tableData.filter(perData => {
        return perData.select === undefined
      })
      if (result.length === this.tableData.length) {
        this.selectAllValue = true
      } else {
        this.selectAllValue = false
      }
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
  .inputIcon{
    width: 50%;
    margin: 0.2rem;
  }
  .ok{
    margin: 0.2rem;
  }
  .search{
    width: 100%;
    text-align: center;
    .searchIcon{
    width: 80%;
    margin: 1rem;
    }
  }

  table{
    transition: 0.3s;
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
      tr:hover{
        background: #84A295;
        transition: 0.3s;
        box-shadow: 1rem 1rem 1rem rgba(0,0,0,0.5) ;
        margin-bottom: 0.5rem;
        margin-right: 0.5rem;
      }
    }
  }
}
</style>
