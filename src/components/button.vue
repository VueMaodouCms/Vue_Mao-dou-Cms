<template lang="pug">
.container
  #btn(@click="click" ref="btn" :style="{'position':'relative', 'background':'rgb(132, 162, 149)','--bgColor':bgColorVar}")
    div(style="position:absolute; z-index:0;")
      .ripple(ref="ripple" :style="{'--bgColor':this.rippleColor}")
        slot
</template>

<script>
export default {
  data () {
    return {
      show: false,
      bgColorVar: 'rgb(96, 130, 123)',
      rippleColor: 'rgb(132, 162, 149)'
    }
  },
  methods: {
    click () {
      const btnBg = this.$refs.btn.style.background
      // const rippleBg = this.$refs.ripple.style.background
      console.log(btnBg)
      if (this.bgColorVar === 'rgb(96, 130, 123)') {
        // this.$refs.btn.style.background = 'rgb(96, 130, 123)'
        this.rippleColor = 'rgb(132, 162, 149)'
        setTimeout(() => {
          this.$refs.btn.style.background = 'var(--bgColor)'
          this.bgColorVar = 'rgb(132, 162, 149)'
        }, 600)
      } else {
        // this.$refs.btn.style.background = 'rgb(132, 162, 149)'
        this.rippleColor = 'rgb(96, 130, 123)'
        setTimeout(() => {
          this.$refs.btn.style.background = 'var(--bgColor)'
          this.bgColorVar = 'rgb(96, 130, 123)'
        }, 600)
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
  // #btn{
  //   width: 160px;
  //   height: 50px;
  //   background: var(--bgColor);
  //   border-radius: 30px;
  //   text-align: center;
  //   line-height: 50px;
  //   font-size: 24px;
  //   font-family: 'Noto Sans TC', sans-serif;
  //   color: white;
  //   letter-spacing: 2px;
  //   position: relative;
  //   overflow: hidden;
  //   user-select: none;

  //   &:hover{
  //     background: #B7CDC2;
  //   }

  //   .ripple {
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     overflow: hidden;
  //     width: 160px;
  //     height: 50px;

  //     &::after {
  //       content: "";
  //       display: block;
  //       position: absolute;
  //       width: 100%;
  //       height: 100%;
  //       top: 0;
  //       left: 0;
  //       background: radial-gradient(circle, var(--bgColor) 10%, transparent 10%);
  //       background-repeat: no-repeat;
  //       background-position: 50%;
  //       transform: scale(10, 10);
  //       // opacity: 0;
  //       // transition: transform .6s, opacity .7s;
  //       transition: transform .6s;
  //       z-index: -1;
  //     }

  //     &:active::after {
  //       transform: scale(0, 0);
  //       // opacity: 1;
  //       transition: 0s;
  //       z-index: -1;
  //     }
  //   }
  // }
</style>
