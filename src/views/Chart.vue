<template lang="pug">
#show
  m-chart(chartName="pie", :detail="pie", label hollow)
  m-chart(chartName="bar", :detail="bar", :feilds="feilds", label stack horizon)
  m-chart(chartName="line", :detail="line", :feilds="feilds", label)
</template>
<script>
export default {
  data () {
    return {
      bar: [
        {
          name: '雞排',
          value: [50, 200, 150, 300, 250]
        },
        {
          name: '珍奶',
          value: [400, 250, 300, 150, 200]
        },
        {
          name: '餅乾',
          value: [200, 300, 100, 400, 200]
        }
      ],
      line: [
        {
          name: '雞排',
          value: [50, 200, 150, 300, 250]
        },
        {
          name: '珍奶',
          value: [400, 250, 300, 150, 200]
        },
        {
          name: '餅乾',
          value: [200, 300, 100, 400, 150]
        }
      ],
      pie: [
        {
          name: '雞排',
          value: 50
        },
        {
          name: '珍奶',
          value: 150
        },
        {
          name: '餅乾',
          value: 100
        }
      ],
      feilds: [
        { label: '我跟', color: '#60827B' },
        { label: '你講', color: '#84A295' },
        { label: '我真', color: '#B7CDC2' },
        { label: '的是', color: '#EFDB96' },
        { label: '帥哥', color: '#EAE6DA' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
#show {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
</style>
