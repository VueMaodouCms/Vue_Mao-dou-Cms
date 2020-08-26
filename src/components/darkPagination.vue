<template lang="pug">
//- 元件ID
#darkPagination
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
        font-awesome-icon(:icon="['fas', 'angle-double-left']")
    .btn(@click="previous")
      slot(name="previous")
        font-awesome-icon(:icon="['fas', 'angle-left']")
    .btn(:style="{ cursor: 'default' }", v-if="currentPage > 3") ...
    .btn(
      v-for="page in Math.ceil(this.lists.length / this.numberPerPage)"
      :class="{ active: currentPage === page }"
      @click="selectPage(page)"
      v-if="Math.abs(currentPage - page) < 3"
    ).
      {{ page }}
    .btn(
      :style="{ cursor: 'default' }",
      v-if="currentPage < Math.ceil(this.lists.length / this.numberPerPage) - 2"
    ) ...
    .btn(@click="next")
      slot(name="next")
        font-awesome-icon(:icon="['fas', 'angle-right']")
    .btn(@click="last")
      slot(name="last")
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
//   margin: auto;
//   background: red;
//   width: 60%;
//   border-radius: 30px;
// }
// .btn {
//   box-sizing: border-box;
//   padding: 10px;
//   cursor: pointer;
//   user-select: none;
//   &:active {
//     border: 2px solid #007bff;
//   }
//   &:hover{
//     background-color: rgba(0,0,0,0.1);
//   }
// }
// .active {
//   background-color: #007bff;
//   color: white;
// }
</style>
