<template lang="pug">
div
  #table2(v-if="!isStripe")
    table
      thead
        slot(name="thead")
          h1 Data
        .search
          input.searchIcon(v-if='searchable' v-model='searchValue' placeholder='點我開始篩選')
      tbody(:style="tbodyStyle")
        th(:style="thStyle")
          td.index(v-if='showIndex' @click='indexSortThoggle = !indexSortThoggle,sort(-1,tableTh,indexSortThoggle)')
            slot(name="index")
          td.selectTd(v-if='selectable')
            input.selectIcon(type="checkbox" @click="selectAll" v-model="selectAllValue")
          td(v-for="(th, index) in tableTh[0]" :key="index" )
            .title(v-if="th.sortable" @click='th.sortToggle = !th.sortToggle,sort(index,tableTh,th.sortToggle)')
              span {{th.title}}
              font-awesome-icon.size(:icon="['fas', 'sort']")
            .title(v-else)
              span {{th.title}}
          td.smalltitle
            slot(name="thead")
        tr(v-for="(tr, index) in tableData" :key="index" @click="select(tr,index)"
        :style="trStyle")
          //- td.index(v-if='showIndex') {{tr.index}}
          td.selectTd(v-if='selectable')
            input.selectIcon(type="checkbox" v-model='tr.select===undefined')
          td(v-for="(td,inx) in tableTh[1]" :key='inx' @click="edit(tr,td,index,inx)" :thLabel="tableTh[0][inx].title")
            slot(:name="td+'-'+tr.index" :data='tr[td]')
              slot(:name='td' :data='tr,td')
                .td {{tr[td]}}
                input.inputIcon(v-if="index+','+inx===editJudge" v-model ='editValue' @keyup.enter="editOk(tr,td)")
                input.ok(v-if="index+','+inx===editJudge" type='button' value='ok' @click="editOk(tr,td)")
  #table(v-else)
    table
      thead
        slot(name="thead")
          h1 Data
        .search
          input.searchIcon(v-if='searchable' v-model='searchValue' placeholder='點我開始篩選')
      tbody
        th(:style="thStyle")
          td.index(v-if='showIndex' @click='indexSortThoggle = !indexSortThoggle,sort(-1,tableTh,indexSortThoggle)')
            slot(name="index")
          td.selectTd(v-if='selectable')
            input.selectIcon(type="checkbox" @click="selectAll" v-model="selectAllValue")
          td(v-for="(th, index) in tableTh[0]" :key="index" )
            .title(v-if="th.sortable" @click='th.sortToggle = !th.sortToggle,sort(index,tableTh,th.sortToggle)')
              span {{th.title}}
              font-awesome-icon.size(:icon="['fas', 'sort']")
            .title(v-else)
              span {{th.title}}
          td.smalltitle
            slot(name="thead")
        tr(v-for="(tr, index) in tableData" :key="index" @click="select(tr,index)"
        :style="stripesStyle[index%2]")
          //- td.index(v-if='showIndex') {{tr.index}}
          td.selectTd(v-if='selectable')
            input.selectIcon(type="checkbox" v-model='tr.select===undefined')
          td(v-for="(td,inx) in tableTh[1]" :key='inx' @click="edit(tr,td,index,inx)" :thLabel2="tableTh[0][inx].title")
            slot(:name="td+'-'+tr.index" :data='tr[td]')
              slot(:name='td' :data='tr,td')
                .td {{tr[td]}}
                input.inputIcon(v-if="index+','+inx===editJudge" v-model ='editValue' @keyup.enter="editOk(tr,td)")
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
    searchable: Boolean,
    // 條紋
    trColor: { type: String, default: function () { return '#ffffff' } },
    // 條文th
    thColor: { type: String, default: '#60827B' },
    // tbody顏色
    backgroundColor: { type: String, default: '#B7CDC2' },
    // 顯示Index
    showIndex: Boolean,
    // 版本2
    isStripe: { typeL: Boolean, default: true },
    // 條紋
    stripes: { type: Array, default: function () { return ['#F7F6EE', '#EAE6DA'] } }
  },
  data () {
    return {
      tableTitle: [],
      dataToggle: false,
      indexSortThoggle: false,
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
    },
    trStyle () {
      return (this.trColor.length > 0) ? {
        background: this.trColor
      } : {}
    },
    thStyle () {
      return (this.thColor.length > 0) ? {
        background: this.thColor
      } : {}
    },
    tbodyStyle () {
      return (this.backgroundColor.length > 0) ? {
        background: this.backgroundColor
      } : {}
    },
    stripesStyle () {
      return (this.stripes) ? [
        {
          background: this.stripes[0]
        },
        {
          background: this.stripes[1]
        }
      ] : []
    }
  },
  methods: {
    // 把資料排序打散重新照KEY順序排列，若可被選擇的話，每筆資料會在這裡加上select = false的屬性，用dataToggle在Mounted時=true之後改成false防止重複排序bug
    getTableData (tableThOriginal) {
      if (this.dataToggle) {
        this.dataToggle = false
        // ---重新排序JSON順序
        let j = 0
        this.data.forEach(data => {
          const perData = {}
          j++
          for (let i = 0; i < tableThOriginal.length; i++) {
            perData.index = j
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
      let key = tableTh[1][index]
      if (index === -1) {
        key = 'index'
      }
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
      this.searchData = NewSortData
    }
  },
  watch: {
    // 監聽搜尋事件
    searchValue () {
      const result = this.searchData.filter(data => {
        const key = this.tableTh[1]
        for (let i = 0; i < key.length; i++) {
          if (data[key[i]] !== undefined) {
            const searchValue = this.searchValue.toLowerCase()
            const StringValue = data[key[i]].toString().toLowerCase()
            if (StringValue.includes(searchValue)) {
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

// #table{
//   .sortIcon{
//     float: right;
//   }
//   .selectTd{
//     width: 6rem;
//     text-align: center;
//     justify-content: center;
//   }
//   .index{
//     width: 10rem;
//     text-align: center;
//     justify-content: center;
//   }
//   .inputIcon{
//     width: 50%;
//     margin: 0.2rem;
//   }
//   .ok{
//     margin: 0.2rem;
//   }
//   .search{
//     width: 100%;
//     text-align: center;
//     .searchIcon{
//     width: 80%;
//     margin: 1rem;
//     }
//   }
//   table{
//     transition: 0.3s;
//     width: 100%;
//     padding: 0;
//     border: 0;
//     thead{
//       text-align: center;
//       font-size: 1.5rem;
//     }
//     tbody{
//       display: flex;
//       flex-wrap: wrap;
//       justify-content: space-around;
//       padding: 0;
//       th{
//         width: 100%;
//         display: flex;
//         justify-content: space-around;
//         padding: 0;
//         td{
//           width: 100%;
//         }
//       }
//       tr{
//         width: 100%;
//         display: flex;
//         justify-content: space-around;
//         td{
//           width: 100%;
//           display:flex;
//           justify-content:start;
//           align-items: center;
//           flex-wrap: wrap;;
//           .td{
//             width: 100%;
//           }
//         }
//       }
//       tr:hover{
//         transform: translate(-0.5%,-5%);
//         background: #EFDB96 !important;
//         transition: 0.5s;
//         box-shadow: 0.5rem 0.5rem 0.5rem rgba(0,0,0,0.5) ;
//       }
//     }
//   }
// }
</style>
