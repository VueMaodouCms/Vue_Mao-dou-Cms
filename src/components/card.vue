<template lang="pug">
  #card
    .block(:style='blockStyle' v-for="(card,index) in sortedData" :key="index")
      .card(:style="cardStyle"  @click='flip(card)')
        .surface(v-if='stereo' v-for="(child,inx) in card.children" :key='inx'  :style="child.surface")
          .img
            slot(:name="'childImg-'+inx")
              slot(name="img")
                img(:src="child.img")
          .body
            .title(:style="child.titleColor")
              slot(:name="'childTitle-'+inx")
                slot(name="title")
                  h1 {{child.title}}
            .text(:style="child.textColor")
              slot(:name="'childText-'+inx")
                slot(name='text')
                  p {{child.text}}
        .surface(:style="card.surface")
          .img
            slot(:name="'img-'+index")
              slot(name="img")
                img(:src="card.img")
          .body
            .title(:style="card.titleColor")
              slot(:name="'title-'+index")
                slot(name="title")
                  h1 {{card.title}}
            .text(:style="card.textColor")
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
            transform: `rotateY(0deg) translateZ(${distnce}px)`,
            background: this.backgroundColor
          }
          let i = 0
          perData.children.forEach(child => {
            i++
            child.surface = { transform: `rotateY(${360 / (perData.children.length + 1) * (i)}deg) translateZ(${distnce}px)`, background: this.backgroundColor }
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
            transform: `rotateY(${(360 / level) * card.page}deg)`,
            width: this.width + 'px',
            height: this.height + 'px'
          }
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

.block{
  margin: 1rem;
  overflow: hidden;
  border-radius: 2rem;
  display: inline-block;
  box-shadow: 1rem 1rem 1rem rgba(0,0,0,0.1);
}
.card{
  transition: 1s;
  position: relative;
  display: inline-block;
  transform-style: preserve-3d;

  .surface{
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    border-radius: 2rem;
    .img{
      margin: 0;
      width:100%;
      height:50%;
      overflow: hidden;
      img{
        width:100%;
        height:100%;
        object-fit: cover;
        transition: 1s;
      }
    }
    .body{
      padding: 1.5rem;
    }
  }
}
.card:hover{
  img{
    transform: scale(1.3,1.3);
  }
}

</style>
