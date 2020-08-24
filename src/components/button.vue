<template lang="pug">
  #btn(@click="click" ref="btn")
    div Button
    transition(enter-active-class="fade-enter-active" leave-active-class="fade-leave-active")
      .ripple(ref="ripple" v-if="this.show")
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    click () {
      this.show = !this.show
      const btnBg = this.$refs.btn.style.background
      if (btnBg === 'black') {
        this.$refs.btn.style.background = 'green'
      } else {
        this.$refs.btn.style.background = 'black'
      }
    }
  }
}
</script>

<style lang="scss">
  .fade-enter-active { animation: go 0.3s; }
  .fade-leave-active { animation: back 0.3s; }

  @keyframes go {
    from {
      height:0px;
      width:0px;
      top:-50px;
      left:-10px;
      background: radial-gradient(circle, #84A295 10%, transparent 10%);
      background: transparent;
    }
    to {
      width: 200px;
      height: 200px;
      top:-50px;
      left:-10px;
      border-radius: 50%;
      background: radial-gradient(circle, #84A295 10%, #84A295 100%);
    }
  }

  @keyframes back {
    from {
      width: 160px;
      height: 50px;
      border-radius: 30px;
      background: pink;
    }
    to {
      height:0px;
      width:0px;
      background: transparent;
    }
  }
  #btn{
    width: 160px;
    height: 50px;
    background: green;
    border-radius: 30px;
    text-align: center;
    line-height: 50px;
    font-size: 24px;
    font-family: 'Noto Sans TC', sans-serif;
    color: white;
    letter-spacing: 2px;
    position: relative;
    overflow: hidden;

    &:hover{
      background: rgb(75, 150, 75);
    }
    .ripple{
      position: absolute;
      width: 160px;
      height: 50px;
      background: pink;
      top:-50px;
      left:-10px;
      // &::after{
      //   content: '';
      // // display: block;
      // position: absolute;
      // top: 0;
      // left: 0;
      // border-radius: 30px;
      // background: pink;
      // width: 100%;
      // height: 100%;
      // }
    }
  }
</style>
