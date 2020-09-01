<template lang="pug">
//- 元件ID
#pagination
  //- 傳進來陣列
  #lists
    //- 傳進來陣列裡面的值
    #list(v-for="(pagelist, index) in pagelists", :key="index")
      //- 插槽，jsonName:json 名稱
      slot(name="pagelist", :jsonName="pagelist")
  //- 按鈕群組
  #button-group
    .btn(@click="first")
      slot(name="first")
        .numWrap
          font-awesome-icon(:icon="['fas', 'angle-double-left']")
    .btn(@click="previous")
      slot(name="previous")
        .numWrap
          font-awesome-icon(:icon="['fas', 'angle-left']")
    div(:style="{ cursor: 'default' }", v-if="currentPage > 3")
      .dotWrap(style="color:red;") ...
    .btn(
      v-for="(page, index) in numberOfPage"
      :key="index"
      :class="{ active: currentPage === page }"
      @click="selectPage(page)"
      v-if="Math.abs(currentPage - page) < 3"
    )
      .numWrap {{ page }}
    div(
      :style="{ cursor: 'default' }",
      v-if="currentPage < numberOfPage.length - 2"
    )
      .dotWrap ...
    .btn(@click="next")
      slot(name="next")
        .numWrap
          font-awesome-icon(:icon="['fas', 'angle-right']")
    .btn(@click="last")
      slot(name="last")
        .numWrap
          font-awesome-icon(:icon="['fas', 'angle-double-right']")
</template>

<script>
export default {
  props: {
    // 傳進來的陣列
    lists: Array,
    // 要顯示的數量
    numberPerPage: Number,
    // 是否換頁要移到最上面
    scrollTop: Boolean
  },
  data () {
    return {
      // 現在的頁面
      currentPage: 1
    }
  },
  computed: {
    // 要顯示的值
    pagelists () {
      return this.lists.slice(
        (this.currentPage - 1) * this.numberPerPage,
        this.numberPerPage * this.currentPage
      )
    },
    // 計算出 1 ~ 最後一頁的數字陣列
    numberOfPage () {
      const result = []
      for (
        let i = 1;
        i <= Math.ceil(this.lists.length / this.numberPerPage);
        i++
      ) {
        result.push(i)
      }
      return result
    }
  },
  methods: {
    first () {
      // 現在的頁面不等於第一頁
      if (this.currentPage !== 1) {
        // 把現在的頁面變成第一頁
        this.currentPage = 1
        this.$router.push({
          path: this.$route.path,
          query: { page: this.currentPage }
        })
      }
      if (this.scrollTop) {
        this.scrollToTop()
      }
    },
    previous () {
      // 現在的頁面不等於第一頁
      if (this.currentPage !== 1) {
        this.currentPage -= 1
        this.$router.push({
          path: this.$route.path,
          query: { page: this.currentPage }
        })
      }
      if (this.scrollTop) {
        this.scrollToTop()
      }
    },
    next () {
      if (
        // 現在的頁面不等於最後一頁
        this.currentPage !== Math.ceil(this.lists.length / this.numberPerPage)
      ) {
        this.currentPage++
        this.$router.push({
          path: this.$route.path,
          query: { page: this.currentPage }
        })
      }
      if (this.scrollTop) {
        this.scrollToTop()
      }
    },
    last () {
      if (
        this.currentPage !== Math.ceil(this.lists.length / this.numberPerPage)
      ) {
        // 現在的頁面直接跳到最後一頁
        this.currentPage = Math.ceil(this.lists.length / this.numberPerPage)
        this.$router.push({
          path: this.$route.path,
          query: { page: this.currentPage }
        })
      }
    },
    selectPage (page) {
      // 不讓使用者選擇目前所處的頁面
      if (this.currentPage !== page) {
        this.currentPage = page
        this.$router.push({
          path: this.$route.path,
          query: { page: this.currentPage }
        })
      }
      if (this.scrollTop) {
        this.scrollToTop()
      }
    },
    scrollToTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  },
  mounted () {
    if (this.$route.query) {
      this.$router.push({
        path: this.$route.path,
        query: { page: 1 }
      })
    }
    this.currentPage = parseInt(this.$route.query.page)
    console.log(this.$route.query)
  }
}
</script>

<style lang="scss" scoped>
// #lists {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-wrap: wrap;
// }
// #list {
//   max-width: 100%;
//   flex-basis: 100%;
//   display: flex;
//   justify-content: center;
// }
// #button-group {
//   display: flex;
//   justify-content: center;
// }
// .btn {
//   box-sizing: border-box;
//   // padding: 0 15px;
//   cursor: pointer;
//   user-select: none;
//   // border: 2px solid rgba(0,0,0,0.2);
//   background: #B7CDC2;
//   border-radius: 100%;
//   margin-left: 1%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width:30px;
//   transition: 0.4s;
//   &:active {
//     background:#60827B;
//   }
//   &:hover{
//     background-color: #84A295;
//     transform: scale(1.2);
//   }
// }
// .numWrap{
//   width:auto;
//   height :30px;
//   line-height :30px;
//   font-size: 16px;
//   color:white;

// }
// .active {
//   background-color: #60827B;
//   color: white;
// }
</style>
