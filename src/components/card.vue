<template lang="pug">
  #card
    .block(:style='blockStyle' v-for="(card,index) in sortedData" :key="index")
      .card(:class="'card-'+type" :style="cardStyle" @click='flip(card)')
        .surface(v-if='stereo' v-for="(child,inx) in card.children" :key='inx'  :style="child.surface")
          .content(:class="'content-'+type")
            .img(:class="'img-'+type")
              slot(:name="'childImg-'+inx")
                slot(name="img")
                  img(:src="child.img")
            .body(:class="'body-'+type")
              .title(:class="'title-'+type" :style="child.titleColor")
                slot(:name="'childTitle-'+inx")
                  slot(name="title")
                    h1 {{child.title}}
              .text(:class="'text-'+type" :style="child.textColor")
                slot(:name="'childText-'+inx")
                  slot(name='text')
                    p {{child.text}}
        .surface(:style="card.surface")
          .content(:class="'content-'+type")
            .img(:class="'img-'+type")
              slot(:name="'img-'+index")
                slot(name="img")
                  img(:src="card.img")
            .body(:class="'body-'+type")
              .title(:class="'title-'+type" :style="card.titleColor")
                slot(:name="'title-'+index")
                  slot(name="title")
                    h1 {{card.title}}
              .text(:class="'text-'+type" :style="card.textColor")
                slot(:name="'text-'+index")
                  slot(name='text')
                    p {{card.text}}
</template>
<script>
export default {
  props: {
    titleColor: String,
    textColor: String,
    stereo: Boolean,
    type: { type: Number, default: 1 },
    width: { type: Number, default: 400 },
    height: { type: Number, default: 500 },
    backgroundColor: { type: String, default: '#F7F6EE' },
    data: {
      type: Array,
      default: function () {
        return [{
          title: '毛豆之家',
          text: '毛豆很好吃，毛豆真的很好吃，所以來使用毛豆的卡片。',
          img: '/images/moudou.jpg'
        }]
      }
    }
  },
  data () {
    return {
      cardStyle: {},
      blockStyle: {}

    }
  },
  computed: {
    sortedData () {
      const sortedData = this.data
      sortedData.forEach(perData => {
        perData.surface = {
          background: this.backgroundColor
        }
        if (perData.children !== undefined) {
          const distnce = (this.width / 2) * Math.tan([90 * (perData.children.length + 1) - 180] / (perData.children.length + 1) * [Math.PI / 180])
          perData.page = 0
          perData.surface = {
            transform: `rotateY(0deg) translateZ(${distnce + 300}px)`,
            background: this.backgroundColor
          }
          let i = 0
          perData.children.forEach(child => {
            i++
            child.surface = { transform: `rotateY(${360 / (perData.children.length + 1) * (i)}deg) translateZ(${distnce + 300}px)`, background: this.backgroundColor }
            if (child.titleColor !== undefined) {
              child.titleColor = { color: child.titleColor }
            } else {
              if (this.titleColor !== undefined) {
                child.titleColor = { color: this.titleColor }
              } else {
                child.titleColor = { color: '#60827B' }
              }
            }
            if (child.textColor !== undefined) {
              child.textColor = { color: child.textColor }
            } else {
              if (this.textColor !== undefined) {
                child.textColor = { color: this.textColor }
              } else {
                child.textColor = { color: '#60827B' }
              }
            }
          })
        }
        if (perData.titleColor !== undefined) {
          perData.titleColor = { color: perData.titleColor }
        } else {
          if (this.titleColor !== undefined) {
            perData.titleColor = { color: this.titleColor }
          } else {
            perData.titleColor = { color: '#60827B' }
          }
        }
        if (perData.textColor !== undefined) {
          perData.textColor = { color: perData.textColor }
        } else {
          if (this.textColor !== undefined) {
            perData.textColor = { color: this.textColor }
          } else {
            perData.textColor = { color: '#60827B' }
          }
        }
      })
      return sortedData
    }
  },
  methods: {
    flip (card) {
      if (this.stereo) {
        card.page--
        if (card.children !== undefined) {
          const level = card.children.length + 1
          this.cardStyle = {
            transform: `rotateX(0deg) rotateY(${(360 / level) * card.page}deg)`,
            width: this.width + 'px',
            height: this.height + 'px'
          }
          setTimeout(() => {
            this.cardStyle = {
              transform: `rotateX(0deg) rotateY(${(360 / level) * card.page}deg)`,
              width: this.width + 'px',
              height: this.height + 'px'
            }
          }, 300)
        }
      }
    }
  },
  mounted () {
    this.cardStyle = {
      width: this.width + 'px',
      height: this.height + 'px'
    }
    this.blockStyle = {
      width: this.width + 'px',
      height: this.height + 'px'
    }
  }
}
</script>
<style lang="scss" scoped>
// .block{
//   margin: 1rem;
//   overflow: hidden;
//   border-radius: 2rem;
//   display: inline-block;
//   box-shadow: 1rem 1rem 1rem rgba(0,0,0,0.1);
//   transition: 0.3s;
// }
// .card{
//   transition: 0.3s;
//   position: relative;
//   display: inline-block;
//   width: 400px;
//   height: 500px;
//   transform-style: preserve-3d;
//   .surface{
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     overflow: hidden;
//     border-radius: 2rem;
//     .content-1{
//       height: 100%;
//       .img-1{
//         margin: 0;
//         width:100%;
//         height:50%;
//         overflow: hidden;
//         img{
//           width:100%;
//           height:100%;
//           object-fit: cover;
//           transition: 1s;
//         }
//       }
//       .body-1{
//         padding: 1.5rem;
//       }
//     }
//     .content-2{
//       display: flex;
//       height: 100%;
//       .img-2{
//         overflow: hidden;
//         width: 50%;
//         height: 100%;
//         img{
//           width:100%;
//           height:100%;
//           object-fit: cover;
//           transition: 1s;
//         }
//       }
//       .body-2{
//         width: 50%;
//         .title-2{
//           padding-top:1rem;
//           padding-bottom: 1.5rem;
//         }
//         padding: 1.5rem;
//       }
//     }
//     .content-3{
//       display: flex;
//       height: 100%;
//       .img-3{
//         overflow: hidden;
//         width: 100%;
//         height: 100%;
//         img{
//           width:100%;
//           height:100%;
//           object-fit: cover;
//           transition: 1s;
//         }
//       }
//       .body-3{
//         position: absolute;
//         width: 100%;
//         height: 50%;
//         text-align: center;
//         bottom: 0;
//         .title-3{
//           position: absolute;
//           left: 50%;
//           top: 30%;
//           transform: translate(-50%,-50%);
//         }
//         .text-3{
//           padding-bottom: 1.5rem;
//           position: absolute;
//           left: 50%;
//           bottom: 0;
//           transform: translate(-50%,-50%);
//         }

//         padding: 1.5rem;
//       }
//     }
//   }
// }
// .card:hover{
//   img{
//     transform: scale(1.3,1.3);
//   }
// }
// .body-3::before{
//   content: '';
//   width: 100%;
//   height: 0;
//   transition: 0.7s;
//   bottom: -70%;
//   position: absolute;
//   transform: translate(-50%,-50%);
//   background: rgba(0,0,0,1);
//   border-radius:0rem 0rem 2rem 2rem;
//   }
// .card-3:hover{
//   .body-3::before{
//   height: 120%;
//   bottom: -70%;
//   position: absolute;
//   background: rgba(0,0,0,0.2);
//   }
// }

</style>
