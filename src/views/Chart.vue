<template lang="pug">
#show
  m-chart(
    :width="400",
    :height="300",
    chartStyle="barchart",
    :detail="boxs",
    :colors="color",
    :gridScale="5"
    label
  )
  m-chart(
    :width="400",
    :height="300",
    chartStyle="piechart",
    :detail="boxs",
    :doughnutHoleSize="0.5",
    :colors="color",
    textcolor="white",
    label
  )
  m-chart(
    :width="400",
    :height="300",
    chartStyle="linechart",
    :detail="datas",
    :colors="color",
    label,
    :gridScale="50"
  )
</template>
<script>
export default {
  data () {
    return {
      boxs: [
        { name: '雞排', value: 10 },
        { name: '飲料', value: 15 },
        { name: '娛樂', value: 2 },
        { name: '討債', value: 8 }
      ],
      color: ['red', 'blue', 'green', 'black', '#EAE6DA', '#F7F6EE'],
      datas: [
        {
          name: '雞排',
          value: {
            first: 50,
            second: 150,
            third: 170,
            forth: 150,
            fifth: 50
          }
        },
        {
          name: '飲料',
          value: {
            first: 100,
            second: 120,
            third: 200,
            forth: 180,
            fifth: 200
          }
        },
        {
          name: '娛樂',
          value: {
            first: 30,
            second: 80,
            third: 77,
            forth: 80,
            fifth: 370
          }
        }
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
