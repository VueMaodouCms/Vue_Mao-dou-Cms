<template lang="pug">
#show
  m-card(:data='cards')
    template(#title)
      h1 全都給我改
    template(#text-0)
      p 只給我改第一個
  m-card(
    titleColor='gray'
    textColor='black'
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
          title: '毛豆家',
          text: '毛豆很好吃，毛豆真的很好吃，所以來使用毛豆的卡片。',
          img: '/images/moudou.jpg',
          titleColor: 'red',
          textColor: 'blue'
        },
        {
          title: '第一頁',
          text: '毛豆很好吃，毛豆真的很好吃，所以來使用毛豆的卡片。',
          img: '/images/moudou.jpg',
          children: [
            {
              title: '第二夜',
              text: '毛豆很好吃。',
              img: '/images/moudou.jpg'
            }
          ]
        }
      ]
    }
  }
}
</script>
