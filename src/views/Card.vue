<template lang="pug">
#show.container
  m-card(:data='cardc' stereo :type=2 :width=300 :height=200 )

  m-card(:data='cards' stereo :type=3 :width=500 :height=400
    titleColor='white'
    textColor='white')

  m-card(:data='card')
    template(#text-0)
      p 只給我改第一個
  m-card(
    titleColor='#ffffff'
    textColor='black'
    backgroundColor="#B7CDC2"
  )
    template(#title)
      img(src='/images/moudou.jpg')
    template(#title)
      h1 改了喔
    template(#text)
      h3 毛豆很難吃，毛豆真的很難吃，所以來使用毛豆的卡片。

</template>
<script>
export default {
  data () {
    return {
      cards: [
        {
          title: '第一頁',
          text: '毛豆很好吃，毛豆真的很好吃，所以來使用毛豆的卡片。',
          img: '/images/moudou.jpg',
          children: [
            {
              title: '第二頁',
              text: '毛豆很好吃。',
              img: '/images/moudou.jpg'
            },
            {
              title: '第三頁',
              text: '毛豆很膩。',
              img: '/images/moudou.jpg'
            },
            {
              title: '第四頁',
              text: '毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。毛豆很膩。',
              img: '/images/moudou.jpg'
            },
            {
              title: '第五頁',
              text: '毛豆很膩。',
              img: '/images/moudou.jpg'
            },
            {
              title: '第六頁',
              text: '毛豆很膩。',
              img: '/images/moudou.jpg'
            },
            {
              title: '第七頁',
              text: '毛豆很膩。',
              img: '/images/moudou.jpg'
            }
          ]
        }
      ],
      cardc: [
        {
          title: '第一頁',
          text: '毛豆很好吃，毛豆真的很好吃，所以來使用毛豆的卡片。',
          img: '/images/moudou.jpg',
          children: [
            {
              title: '第二夜',
              text: '毛豆很好吃。',
              img: '/images/moudou.jpg'
            },
            {
              title: '第三夜',
              text: '毛豆很膩。',
              img: '/images/moudou.jpg'
            },
            {
              title: '第四夜',
              text: '毛豆很膩。',
              img: '/images/moudou.jpg'
            },
            {
              title: '第五夜',
              text: '毛豆很膩。',
              img: '/images/moudou.jpg'
            },
            {
              title: '第六夜',
              text: '毛豆很膩。',
              img: '/images/moudou.jpg'
            },
            {
              title: '第七夜',
              text: '毛豆很膩。',
              img: '/images/moudou.jpg'
            }
          ]
        }
      ],
      card: [
        {
          title: '第一頁',
          text: '毛豆很好吃，毛豆真的很好吃，所以來使用毛豆的卡片。',
          img: '/images/moudou.jpg'
        },
        {
          title: '第一頁',
          text: '毛豆很好吃，毛豆真的很好吃，所以來使用毛豆的卡片。',
          img: '/images/moudou.jpg'
        },
        {
          title: '第一頁',
          text: '毛豆很好吃，毛豆真的很好吃，所以來使用毛豆的卡片。',
          img: '/images/moudou.jpg'
        }
      ]
    }
  }
}
</script>
