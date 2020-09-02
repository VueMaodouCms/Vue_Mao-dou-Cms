<template lang="pug">
#show
  m-card(:data='card'
  )
    template(#text-0)
      p 只給我改第一個
  m-card(
    titleColor='gray'
    textColor='black'
    backgroundColor="#"
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
            }
            // {
            //   title: '第六夜',
            //   text: '毛豆很膩。',
            //   img: '/images/moudou.jpg'
            // }
            // {
            //   title: '第七夜',
            //   text: '毛豆很膩。',
            //   img: '/images/moudou.jpg'
            // }
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
