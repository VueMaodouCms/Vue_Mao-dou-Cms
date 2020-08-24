<template lang="pug">
  #btn(ref="btn")
    div Button
      .ripple(@click="click" ref="ripple")
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
      if (btnBg === 'red') {
        this.$refs.btn.style.background = 'blue'
      } else {
        this.$refs.btn.style.background = 'red'
      }
    }
  }
}
</script>

<style lang="scss">
  // .fade-enter-active { animation: go 0.3s; }
  // .fade-leave-active { animation: back 0.3s; }

  // @keyframes go {
  //   from {
  //     height:0px;
  //     width:0px;
  //     top:-50px;
  //     left:-10px;
  //     background: radial-gradient(circle, #84A295 10%, transparent 10%);
  //     background: transparent;
  //   }
  //   to {
  //     width: 200px;
  //     height: 200px;
  //     top:-50px;
  //     left:-10px;
  //     border-radius: 50%;
  //     background: radial-gradient(circle, #84A295 10%, #84A295 100%);
  //   }
  // }

  // @keyframes back {
  //   from {
  //     width: 160px;
  //     height: 50px;
  //     border-radius: 30px;
  //     background: pink;
  //   }
  //   to {
  //     height:0px;
  //     width:0px;
  //     background: transparent;
  //   }
  // }
  #btn{
    width: 160px;
    height: 50px;
    background: red;
    border-radius: 30px;
    text-align: center;
    line-height: 50px;
    font-size: 24px;
    font-family: 'Noto Sans TC', sans-serif;
    color: white;
    letter-spacing: 2px;
    position: relative;
    // overflow: hidden;

    &:hover{
      background: #B7CDC2;
    }

    .ripple {
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      width: 160px;
      height: 50px;

      &::after {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: radial-gradient(circle, #60827B 10%, transparent 10%);
        background-repeat: no-repeat;
        background-position: 50%;
        transform: scale(10, 10);
        opacity: 0;
        transition: transform .6s, opacity .7s;
      }

      &:active::after {
        transform: scale(0, 0);
        opacity: 1;
        transition: 0s;
      }
    }
  }
</style>
