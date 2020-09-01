<template lang="pug">
  #card
    .card(v-for="(card,index) in sortedData" :key="index" @click='flip(index)')
      .surface.surface-0
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
      .surface(:class="'surface-'+(inx+1)" v-for="(child,inx) in card.children" :key='inx')
        .img
          slot(:name="'img-'+index")
            slot(name="img")
              img(:src="child.img")
        .body
          .title(:style="child.titleColor")
            slot(:name="'title-'+index")
              slot(name="title")
                h1 {{child.title}}
          .text(:style="child.textColor")
            slot(:name="'text-'+index")
              slot(name='text')
                p {{child.text}}

</template>
<script>
export default {
  props: {
    titleColor: String,
    textColor: String,
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
  computed: {
    sortedData () {
      const sortedData = this.data
      sortedData.forEach(perData => {
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
      console.log(sortedData)
      return sortedData
    }
  },
  methods: {
    flip (index) {
      console.log(index)
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
.card{
  width: 400px;
  height: 500px;
  transition: 1s;
  margin: 1rem;
  position: relative;
  display: inline-block;
  transform-style: preserve-3d;
  transform: rotateY(0deg);
  .surface-0{
    transform: rotateY(0deg) translateZ(50px);
  }
  .surface-1{
    transform: rotateY(180deg) translateZ(200px);
  }
  .surface{
    box-shadow: 1rem 1rem 1rem rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    border-radius: 2rem;
    background: #EAE6DA;
    margin: 1rem;
    top :0;
    right :0;
    left :0;
    bottom :0;
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
    transform:scale(1.3,1.3);
  }
  transform: rotateY(180deg);
}

</style>
